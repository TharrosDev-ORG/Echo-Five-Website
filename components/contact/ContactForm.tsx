"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact, contactForm as copy } from "@/lib/content";
import { site, mailtoBook } from "@/lib/site";
import { LIMITS, normalize, validate, type ContactErrors, type ContactField } from "@/lib/contact";
import { cx } from "@/lib/cx";
import Button from "@/components/ui/Button";
import { Check } from "@/components/ui/icons";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: ContactField[] = ["name", "email", "message"];

type Props = {
  className?: string;
};

export default function ContactForm({ className }: Props) {
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
    setMessage(copy.fixFields);
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
      setMessage(res.status === 429 ? copy.tooMany : copy.failed);
    } catch {
      setStatus("error");
      setFallback(true);
      setMessage(copy.failed);
    }
  }

  const cardClass = cx("card card-panel", className);

  if (status === "success") {
    return (
      <div className={cardClass} role="status" aria-live="polite">
        <span
          aria-hidden="true"
          className="inline-flex size-12 items-center justify-center rounded-full bg-accent-fill text-on-accent"
        >
          <Check size={24} strokeWidth={2.25} />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="mt-2 text-h3 text-fg outline-none">
          {copy.success.heading}
        </h2>
        <p className="text-fg-2">{copy.success.body}</p>
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

  const submitting = status === "submitting";

  return (
    <div className={cardClass}>
      <h2 className="text-h3 text-fg">{contact.formHeading}</h2>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        aria-label={copy.label}
        aria-busy={submitting || undefined}
        className="mt-3 grid gap-5"
      >
        {/* Honeypot: visually hidden, off the tab order. */}
        <div aria-hidden="true" className="sr-only">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="name" className="field-label">
              {copy.fields.name}
            </label>
            <input type="text" autoComplete="name" maxLength={LIMITS.name} {...fieldProps("name")} />
            {errorFor("name")}
          </div>
          <div className="min-w-0">
            <label htmlFor="organization" className="field-label">
              {copy.fields.organization} <span className="field-optional">{copy.fields.optional}</span>
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
            {copy.fields.email}
          </label>
          <input type="email" autoComplete="email" maxLength={LIMITS.email} {...fieldProps("email")} />
          {errorFor("email")}
        </div>

        <div>
          <label htmlFor="message" className="field-label">
            {copy.fields.message}
          </label>
          <textarea rows={6} maxLength={LIMITS.message} {...fieldProps("message")} className="field resize-y" />
          {errorFor("message")}
        </div>

        <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:gap-6">
          <Button type="submit" size="lg" arrow={!submitting} disabled={submitting} className="shrink-0">
            {submitting ? copy.submitting : copy.submit}
          </Button>
          <p role="status" aria-live="polite" className="form-status">
            {message}
            {fallback ? (
              <>
                {" "}
                {copy.fallbackPrefix} <a href={mailtoBook}>{site.email}</a> {copy.fallbackSuffix}
              </>
            ) : null}
          </p>
        </div>
      </form>
    </div>
  );
}
