"use client";

import { useState, type FormEvent } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  label: "Contact",
  heading: "Let's talk about what you're trying to change.",
  body:
    "Send a note and we'll come back within two business days. For sensitive engagements, ask about secure channels.",
  email: "hello@echo-five.ca",
  linkedin: "https://www.linkedin.com",
};

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="section-y border-t border-[color:var(--color-rule)]">
      <div className="container-tight grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent-warm)]">
              {COPY.label}
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.01em]">
              {COPY.heading}
            </h2>
            <p className="mt-6 text-[color:var(--color-ink-muted)] leading-relaxed max-w-md">
              {COPY.body}
            </p>
            <div className="mt-10 space-y-3 text-sm">
              <div>
                <span className="text-[color:var(--color-ink-muted)]">Email · </span>
                <a
                  className="text-[color:var(--color-ink)] underline-offset-4 hover:underline"
                  href={`mailto:${COPY.email}`}
                >
                  {COPY.email}
                </a>
              </div>
              <div>
                <span className="text-[color:var(--color-ink-muted)]">LinkedIn · </span>
                <a
                  className="text-[color:var(--color-ink)] underline-offset-4 hover:underline"
                  href={COPY.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  echo-five-consulting
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ScrollReveal delay={80}>
            {sent ? (
              <div className="border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] p-10 text-center">
                <div className="font-serif text-2xl text-[color:var(--color-ink)]">Thank you.</div>
                <p className="mt-3 text-[color:var(--color-ink-muted)]">
                  Your note is in. We'll be in touch within two business days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] p-8 md:p-10 space-y-6"
              >
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Organization" name="organization" />
                <FieldArea label="What are you trying to change?" name="message" required />
                <button
                  type="submit"
                  className="inline-flex items-center rounded-full bg-[color:var(--color-ink)] px-6 py-3 text-sm text-[color:var(--color-bg)] hover:bg-[color:var(--color-accent)] transition-colors"
                >
                  Send message
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
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
      <span className="block text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 block w-full border-b border-[color:var(--color-rule)] bg-transparent py-2 text-[color:var(--color-ink)] outline-none focus:border-[color:var(--color-ink)] transition-colors"
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
      <span className="block text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={4}
        className="mt-2 block w-full border-b border-[color:var(--color-rule)] bg-transparent py-2 text-[color:var(--color-ink)] outline-none focus:border-[color:var(--color-ink)] transition-colors resize-none"
      />
    </label>
  );
}
