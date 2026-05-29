import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  organization?: string;
  email?: string;
  message?: string;
  /** Honeypot: real users never fill this. */
  company?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success, send nothing.
  if (clean(body.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const organization = clean(body.organization, 160);
  const email = clean(body.email, 200);
  const message = clean(body.message, 4000);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!isEmail(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please add a sentence or two about what you are rolling out.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || site.email;
  const from = process.env.CONTACT_FROM || `Echofive Website <onboarding@resend.dev>`;

  // No mail service configured: tell the client to fall back to mailto.
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, fallback: true, error: "Mail service is not configured." },
      { status: 503 },
    );
  }

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
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, fallback: true, error: "Could not send the message." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, fallback: true, error: "Could not reach the mail service." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
