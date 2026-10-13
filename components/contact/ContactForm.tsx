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
  const successRef = useRef<HTMLHeadingElement>(null);
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
      <div className="card form-card" role="status" aria-live="polite">
        <span className="status-dot" aria-hidden="true" style={{ display: "inline-block" }} />
        <h2 ref={successRef} tabIndex={-1} className="t-h3" style={{ marginTop: "1rem", outline: "none" }}>
          Message sent.
        </h2>
        <p className="t-body" style={{ marginTop: "0.75rem" }}>
          Thank you. Your note has reached Mark directly. You can expect a straight answer, usually
          within one business day.
        </p>
      </div>
    );
  }

  const fieldProps = (name: ContactField) => ({
    id: name,
    name,
    required: true,
    "aria-required": true,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    className: "field",
  });

  const errorFor = (name: ContactField) =>
    errors[name] ? (
      <p id={`${name}-error`} className="field-error">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card form-card form-grid" aria-label="Contact form">
      {/* Honeypot: visually hidden, off the tab order. */}
      <div aria-hidden="true" className="u-sr">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-grid form-grid-2">
        <div>
          <label htmlFor="name" className="field-label">
            Name
          </label>
          <input type="text" autoComplete="name" maxLength={LIMITS.name} {...fieldProps("name")} />
          {errorFor("name")}
        </div>
        <div>
          <label htmlFor="organization" className="field-label">
            Organization <span className="field-optional">(optional)</span>
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.organization}
            className="field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="field-label">
          Work email
        </label>
        <input type="email" autoComplete="email" maxLength={LIMITS.email} {...fieldProps("email")} />
        {errorFor("email")}
      </div>

      <div>
        <label htmlFor="message" className="field-label">
          What are you rolling out?
        </label>
        <textarea rows={6} maxLength={LIMITS.message} style={{ resize: "vertical" }} {...fieldProps("message")} />
        {errorFor("message")}
      </div>

      <div className="form-foot">
        <button type="submit" disabled={status === "submitting"} className="btn btn-primary">
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className="form-status">
          {message}
          {fallback ? (
            <>
              {" "}
              Email <a href={mailtoBook}>{site.email}</a> directly.
            </>
          ) : null}
        </p>
      </div>
    </form>
  );
}
