import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { normalize, validate } from "@/lib/contact";

export const runtime = "nodejs";

/** Generous for four text fields; anything bigger is not a real enquiry. */
const MAX_BODY_CHARS = 16 * 1024;

/**
 * Best-effort per-IP throttle. In-memory, so on serverless it is per instance
 * rather than global; it still blunts a single client hammering the form.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

export async function POST(request: Request) {
  // Reject cross-site browser posts. Same-origin requests on any deployment
  // (production or preview) carry an Origin whose host matches Host.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {}
    if (originHost !== host) {
      return json({ ok: false, error: "Forbidden." }, 403);
    }
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return json(
      { ok: false, fallback: true, error: "Too many messages. Please try again later." },
      429,
    );
  }

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_CHARS) {
      return json({ ok: false, error: "Message is too large." }, 413);
    }
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object") throw new Error("not an object");
    raw = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: real users never fill this. Pretend success, send nothing.
  if (typeof raw.company === "string" && raw.company.trim()) {
    return json({ ok: true });
  }

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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry: ${name}${organization ? ` (${organization})` : ""}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error("contact: Resend responded", res.status, await res.text().catch(() => ""));
      return json({ ok: false, fallback: true, error: "Could not send the message." }, 502);
    }
  } catch (err) {
    console.error("contact: could not reach Resend", err);
    return json({ ok: false, fallback: true, error: "Could not reach the mail service." }, 502);
  }

  return json({ ok: true });
}
