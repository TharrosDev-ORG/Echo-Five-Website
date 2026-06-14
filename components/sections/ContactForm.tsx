"use client";

import { useState, type FormEvent } from "react";
import { site, mailtoBook } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

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
      <div className="card founder" role="status" aria-live="polite">
        <span className="status-dot" aria-hidden="true" />
        <p className="t-h3" style={{ marginTop: "1rem" }}>
          Message sent.
        </p>
        <p className="t-body" style={{ color: "var(--color-ink-muted)", marginTop: "0.75rem" }}>
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
          <label htmlFor="name" className="t-coord block">
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
            className="field mt-2"
          />
          {errors.name ? (
            <p id="name-error" className="mt-2 font-mono" style={{ fontSize: "0.74rem", color: "var(--color-cobalt)" }}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="organization" className="t-coord block">
            Organization
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            className="field mt-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="t-coord block">
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
          className="field mt-2"
        />
        {errors.email ? (
          <p id="email-error" className="mt-2 font-mono" style={{ fontSize: "0.74rem", color: "var(--color-cobalt)" }}>
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="t-coord block">
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
          className="field mt-2"
          style={{ resize: "vertical" }}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 font-mono" style={{ fontSize: "0.74rem", color: "var(--color-cobalt)" }}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary"
          style={{ opacity: status === "submitting" ? 0.6 : 1 }}
          data-cursor
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>

        <p role="status" aria-live="polite" className="font-mono" style={{ fontSize: "0.78rem" }}>
          {message}
          {fallback ? (
            <>
              {" "}
              Email{" "}
              <a href={mailtoBook} className="underline" style={{ color: "var(--color-cobalt)" }}>
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
