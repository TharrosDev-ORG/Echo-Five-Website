import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { normalize, validate } from "@/lib/contact";

export const runtime = "nodejs";

/** Generous for four text fields; anything bigger is not a real enquiry. */
const MAX_BODY_BYTES = 16 * 1024;

/**
 * Best-effort per-IP throttle. In-memory, so on serverless it is per instance
 * rather than global; it still blunts a single client hammering the form.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_TRACKED = 5000;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.delete(key); // re-insert so Map order stays oldest-first
  hits.set(key, recent);
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 1000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
    // Still too big (many distinct clients in one window): drop the oldest.
    for (const k of hits.keys()) {
      if (hits.size <= MAX_TRACKED) break;
      hits.delete(k);
    }
  }
  return false;
}

/**
 * The client address to throttle on. Only headers the platform sets are
 * trusted: on Vercel, `x-real-ip` (what `@vercel/functions`' ipAddress() reads)
 * and `x-forwarded-for` are overwritten by the edge, so a client cannot choose
 * its own key. Elsewhere, the left-most `x-forwarded-for` entry is whatever the
 * client sent, so use the right-most one, which the nearest proxy appended.
 */
function clientKey(headers: Headers): string {
  const forwarded = (headers.get("x-forwarded-for") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const ip = process.env.VERCEL
    ? headers.get("x-real-ip") || headers.get("x-vercel-forwarded-for") || forwarded[0]
    : forwarded.at(-1) || headers.get("x-real-ip");
  // An address is short; cap whatever arrived so keys stay small.
  return (ip || "unknown").trim().slice(0, 64);
}

const json = (body: unknown, status = 200, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

/** Only same-origin browser posts. Non-browser clients send neither header. */
function crossSite(headers: Headers): boolean {
  const site = headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return true;

  const origin = headers.get("origin");
  const host = headers.get("host");
  if (!origin) return false;
  if (!host) return true;
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

/** Read at most `max` bytes of the body; null when it is larger. */
async function readBody(request: Request, max: number): Promise<string | null> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > max) return null;
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  // fatal: reject malformed UTF-8 instead of silently substituting U+FFFD.
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

/** Anything but POST: a plain 405 that names the one method this route takes. */
const methodNotAllowed = () => json({ ok: false, error: "Method not allowed." }, 405, { Allow: "POST" });
export { methodNotAllowed as GET, methodNotAllowed as PUT, methodNotAllowed as PATCH, methodNotAllowed as DELETE };
export const OPTIONS = () => new Response(null, { status: 204, headers: { Allow: "POST, OPTIONS" } });

export async function POST(request: Request) {
  try {
    return await handle(request);
  } catch (err) {
    // Never echo internals to the client.
    console.error("contact: unexpected error", err);
    return json({ ok: false, fallback: true, error: "Could not send the message." }, 500);
  }
}

async function handle(request: Request) {
  // Reject cross-site browser posts. Same-origin requests on any deployment
  // (production or preview) carry an Origin whose host matches Host.
  if (crossSite(request.headers)) {
    return json({ ok: false, error: "Forbidden." }, 403);
  }

  // JSON only. This also keeps plain HTML forms on other sites (which can only
  // send urlencoded, multipart or text/plain) from reaching the handler.
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.split(";")[0].trim().toLowerCase() !== "application/json") {
    return json({ ok: false, error: "Unsupported content type." }, 415);
  }

  if (rateLimited(clientKey(request.headers))) {
    return json(
      { ok: false, fallback: true, error: "Too many messages. Please try again later." },
      429,
      { "Retry-After": String(WINDOW_MS / 1000) },
    );
  }

  let raw: Record<string, unknown>;
  try {
    const text = await readBody(request, MAX_BODY_BYTES);
    if (text === null) {
      return json({ ok: false, error: "Message is too large." }, 413);
    }
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("not an object");
    }
    raw = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: real users never fill this. Pretend success, send nothing.
  if (typeof raw.company === "string" && raw.company.trim()) {
    return json({ ok: true });
  }

  // normalize() strips control and bidi characters and folds line breaks out
  // of every single-line field, so name, organization and email are safe to
  // place in the subject and reply-to; validate() allows only a plain address.
  const input = normalize(raw);
  const errors = validate(input);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 422);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || site.email;
  const from = process.env.CONTACT_FROM || `Echofive Website <onboarding@resend.dev>`;

  // No mail service configured: tell the client to fall back to mailto.
  if (!apiKey) {
    return json({ ok: false, fallback: true, error: "Mail service is not configured." }, 503);
  }

  const { name, organization, email, message } = input;
  const text = [
    `New enquiry from the Echofive website`,
    ``,
    `Name:         ${name}`,
    `Organization: ${organization || "(not given)"}`,
    `Email:        ${email}`,
    ``,
    `What they are rolling out:`,
    message,
  ].join("\n");
  const subject = `Website enquiry: ${name}${organization ? ` (${organization})` : ""}`.slice(0, 200);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      // Server log only (never sent to the client), capped in size.
      const detail = await res.text().catch(() => "");
      console.error("contact: Resend responded", res.status, detail.slice(0, 500));
      return json({ ok: false, fallback: true, error: "Could not send the message." }, 502);
    }
  } catch (err) {
    console.error("contact: could not reach Resend", err instanceof Error ? err.name : "unknown");
    return json({ ok: false, fallback: true, error: "Could not reach the mail service." }, 502);
  }

  return json({ ok: true });
}
