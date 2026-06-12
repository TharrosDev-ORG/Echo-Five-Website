"use client";

import { useState, type FormEvent } from "react";
import { site, mailtoBook } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const fieldBase =
  "w-full bg-bg text-ink placeholder:text-ink-muted border border-ink-on-signal/25 px-4 py-3 font-sans text-[1rem] outline-none transition-colors focus:border-bg focus:ring-2 focus:ring-bg";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [fallback, setFallback] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setFallback(false);
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      organization: String(data.get("organization") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
      company: String(data.get("company") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (res.status === 422 && json.errors) {
        setErrors(json.errors as FieldErrors);
        setStatus("error");
        setMessage("Please check the highlighted fields.");
        return;
      }
      // Mail service unavailable: offer the direct address.
      setStatus("error");
      setFallback(true);
      setMessage("Our form could not send right now.");
    } catch {
      setStatus("error");
      setFallback(true);
      setMessage("Our form could not send right now.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="panel-elev flex flex-col items-start gap-4 p-8"
        role="status"
        aria-live="polite"
      >
        <span className="status-dot" aria-hidden="true" />
        <p className="t-h3 text-ink">Message sent.</p>
        <p className="t-body text-ink-muted">
          Thank you. Your note has reached Mark directly. You can expect a straight answer, usually
          within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot: visually hidden, off the tab order. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block t-coord text-ink-on-signal">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`mt-2 ${fieldBase}`}
          />
          {errors.name ? (
            <p id="name-error" className="mt-2 font-mono text-[0.74rem] text-bg">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="organization" className="block t-coord text-ink-on-signal">
            Organization
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            className={`mt-2 ${fieldBase}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block t-coord text-ink-on-signal">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`mt-2 ${fieldBase}`}
        />
        {errors.email ? (
          <p id="email-error" className="mt-2 font-mono text-[0.74rem] text-bg">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="block t-coord text-ink-on-signal">
          What are you rolling out?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          aria-required="true"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`mt-2 resize-y ${fieldBase}`}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 font-mono text-[0.74rem] text-bg">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn bg-bg text-signal hover:bg-ink-on-signal disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>

        {/* Live status for screen readers + visible error / fallback. */}
        <p
          role="status"
          aria-live="polite"
          className="font-mono text-[0.78rem] text-ink-on-signal"
        >
          {message}
          {fallback ? (
            <>
              {" "}
              Email{" "}
              <a href={mailtoBook} className="underline">
                {site.email}
              </a>{" "}
              directly.
            </>
          ) : null}
        </p>
      </div>
    </form>
  );
}
