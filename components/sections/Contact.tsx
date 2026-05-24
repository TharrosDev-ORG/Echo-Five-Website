"use client";

import { useState, type FormEvent } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  index: "04",
  heading: "Let's talk about what you're trying to change.",
  body: "Send a note and Mark will come back within two business days. Engagements are run end-to-end by the principal: you're writing to the person who'll do the work. For sensitive matters, ask about secure channels.",
  email: "hello@echo-five.ca",
  linkedin: "https://www.linkedin.com/in/mark-abdelnour-235b6a4/",
  linkedinLabel: "Mark Abdelnour",
  location: "Ottawa, ON",
};

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-y border-t border-keyline">
      <div className="container-tight grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
        <div className="md:col-span-5">
          <ScrollReveal>
            <span className="font-display font-bold text-signal text-sm tracking-[0.1em]">
              {COPY.index}
            </span>
            <h2 className="mt-5 font-display font-bold uppercase text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[0.98] tracking-[-0.02em] max-w-[14ch] text-ink">
              {COPY.heading}
            </h2>
            <p className="mt-6 text-base md:text-lg leading-[1.6] text-ink-muted max-w-md">
              {COPY.body}
            </p>
            <dl className="mt-10 border-t border-keyline">
              <ContactRow label="Email">
                <a className="text-ink hover:text-signal-deep underline-offset-4 hover:underline transition-colors" href={`mailto:${COPY.email}`}>
                  {COPY.email}
                </a>
              </ContactRow>
              <ContactRow label="LinkedIn">
                <a className="text-ink hover:text-signal-deep underline-offset-4 hover:underline transition-colors" href={COPY.linkedin} target="_blank" rel="noreferrer">
                  {COPY.linkedinLabel}
                </a>
              </ContactRow>
              <ContactRow label="Office">
                <span className="text-ink">{COPY.location}</span>
              </ContactRow>
            </dl>
          </ScrollReveal>
        </div>

        <div className="md:col-span-7">
          <ScrollReveal delay={80}>
            {status === "sent" ? (
              <div className="border border-ink bg-surface p-10 md:p-14" role="status">
                <span className="font-display font-bold uppercase text-signal text-xs tracking-[0.18em]">
                  Received
                </span>
                <div className="mt-3 font-display font-bold uppercase text-3xl tracking-[-0.02em] text-ink">
                  Thank you.
                </div>
                <p className="mt-3 max-w-sm text-ink-muted leading-[1.6]">
                  Your note is in. We'll be in touch within two business days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="border border-keyline bg-surface p-7 md:p-10"
              >
                {/* honeypot — visually hidden, off the tab order */}
                <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
                  <label>
                    Company
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="space-y-7">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Organization" name="organization" />
                  <FieldArea label="What are you trying to change?" name="message" required />
                </div>

                {status === "error" && (
                  <p className="mt-6 border-l-0 bg-[color-mix(in_oklch,var(--color-signal)_10%,transparent)] px-4 py-3 text-sm text-signal-deep" role="alert">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group mt-8 inline-flex min-h-[44px] items-center gap-3 bg-ink px-7 py-3 text-sm font-medium uppercase tracking-[0.06em] text-paper hover:bg-signal disabled:opacity-60 disabled:hover:bg-ink transition-colors"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                  {status !== "sending" && (
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  )}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[88px_1fr] items-baseline gap-4 border-b border-keyline py-4 text-sm">
      <dt className="text-[11px] uppercase tracking-[0.2em] text-ink-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.2em] text-ink-muted">
        {label}
        {required && <span className="text-signal-deep"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 block w-full border-b border-keyline bg-transparent py-2.5 text-ink focus:border-ink transition-colors"
      />
    </label>
  );
}

function FieldArea({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.2em] text-ink-muted">
        {label}
        {required && <span className="text-signal-deep"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={4}
        className="mt-2 block w-full resize-none border-b border-keyline bg-transparent py-2.5 text-ink focus:border-ink transition-colors"
      />
    </label>
  );
}
