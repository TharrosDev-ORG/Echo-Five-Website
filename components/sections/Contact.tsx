"use client";

import { useState, type FormEvent } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  marker: "04",
  label: "Contact",
  heading: "Let's talk about what you're trying to change.",
  body:
    "Send a note and we'll come back within two business days. For sensitive engagements, ask about secure channels.",
  email: "hello@echo-five.ca",
  linkedin: "https://www.linkedin.com",
  linkedinLabel: "echo-five-consulting",
  location: "Ottawa, ON",
};

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="section-y border-t border-[color:var(--color-rule)]"
    >
      <div className="container-tight grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <ScrollReveal>
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-[color:var(--color-accent-warm)] text-base">
                {COPY.marker}
              </span>
              <span className="text-[10px] uppercase tracking-[0.32em] text-[color:var(--color-ink-muted)]">
                {COPY.label}
              </span>
            </div>
            <h2 className="mt-6 font-serif font-light text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.015em] max-w-[14ch]">
              {COPY.heading}
            </h2>
            <p className="mt-6 text-[color:var(--color-ink-muted)] leading-[1.6] max-w-md">
              {COPY.body}
            </p>
            <dl className="mt-10 space-y-4 text-sm">
              <ContactRow label="Email">
                <a
                  className="text-[color:var(--color-ink)] underline-offset-4 hover:underline"
                  href={`mailto:${COPY.email}`}
                >
                  {COPY.email}
                </a>
              </ContactRow>
              <ContactRow label="LinkedIn">
                <a
                  className="text-[color:var(--color-ink)] underline-offset-4 hover:underline"
                  href={COPY.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  {COPY.linkedinLabel}
                </a>
              </ContactRow>
              <ContactRow label="Office">
                <span className="text-[color:var(--color-ink)]">{COPY.location}</span>
              </ContactRow>
            </dl>
          </ScrollReveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ScrollReveal delay={80}>
            {sent ? (
              <div className="border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] p-10 md:p-14 text-center">
                <span
                  aria-hidden="true"
                  className="inline-block font-serif italic text-[color:var(--color-accent-warm)] text-base mb-4"
                >
                  Received
                </span>
                <div className="font-serif font-light text-3xl text-[color:var(--color-ink)]">
                  Thank you.
                </div>
                <p className="mt-3 text-[color:var(--color-ink-muted)] max-w-sm mx-auto leading-[1.6]">
                  Your note is in. We&apos;ll be in touch within two business days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] p-8 md:p-10 space-y-7"
              >
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Organization" name="organization" />
                <FieldArea
                  label="What are you trying to change?"
                  name="message"
                  required
                />
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--color-ink)] px-6 py-3.5 text-sm text-[color:var(--color-bg)] hover:bg-[color:var(--color-accent)] transition-colors"
                >
                  Send message
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
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
    <div className="grid grid-cols-[80px_1fr] items-baseline gap-4">
      <dt className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-ink-muted)]">
        {label}
      </dt>
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
      <span className="block text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-ink-muted)]">
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
      <span className="block text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-ink-muted)]">
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
