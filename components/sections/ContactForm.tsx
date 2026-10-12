"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site, mailtoBook } from "@/lib/site";
import { LIMITS, normalize, validate, type ContactErrors, type ContactField } from "@/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: ContactField[] = ["name", "email", "message"];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [fallback, setFallback] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  const focusNext = useRef<ContactField | null>(null);

  // The form unmounts on success; move focus to the confirmation so keyboard
  // and screen-reader users are not dropped back at the top of the document.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  // Focus the first invalid field after the render that wires up its
  // aria-describedby, so assistive tech announces the error with the field.
  useEffect(() => {
    const field = focusNext.current;
    if (!field) return;
    focusNext.current = null;
    formRef.current?.querySelector<HTMLElement>(`#${field}`)?.focus();
  }, [errors]);

  /** Show field errors and queue focus on the first one that needs fixing. */
  function showErrors(next: ContactErrors) {
    focusNext.current = FIELD_ORDER.find((f) => next[f]) ?? null;
    setErrors(next);
    setStatus("error");
    setMessage("Please fix the highlighted fields.");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const input = normalize(Object.fromEntries(data));

    const clientErrors = validate(input);
    if (Object.keys(clientErrors).length > 0) {
      setFallback(false);
      showErrors(clientErrors);
      return;
    }

    setStatus("submitting");
    setErrors({});
    setFallback(false);
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, company: String(data.get("company") || "") }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (res.status === 422 && json.errors) {
        showErrors(json.errors as ContactErrors);
        return;
      }
      setStatus("error");
      setFallback(true);
      setMessage(
        res.status === 429 ? "Too many messages from this connection." : "Our form could not send right now.",
      );
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
        <p ref={successRef} tabIndex={-1} className="t-h3" style={{ marginTop: "1rem", outline: "none" }}>
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
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
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
            maxLength={LIMITS.name}
            required
            aria-required="true"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="field mt-2"
          />
          {errors.name ? (
            <p id="name-error" className="field-error">
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
            maxLength={LIMITS.organization}
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
          maxLength={LIMITS.email}
          required
          aria-required="true"
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="field mt-2"
        />
        {errors.email ? (
          <p id="email-error" className="field-error">
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
          maxLength={LIMITS.message}
          required
          aria-required="true"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="field mt-2"
          style={{ resize: "vertical" }}
        />
        {errors.message ? (
          <p id="message-error" className="field-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-invert"
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
              <a href={mailtoBook} className="underline" style={{ color: "var(--color-on-cobalt)", fontWeight: 600 }}>
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
