"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { contact, contactForm as copy } from "@/lib/content/contact";
import { site, mailtoBook } from "@/lib/site";
import {
  LIMITS,
  normalize,
  validate,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from "@/lib/contact";
import { cx } from "@/lib/cx";
import Arrow from "@/components/ui/Arrow";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: ContactField[] = ["name", "email", "message"];

/** True after hydration, false on the server and without JavaScript. */
const noop = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/**
 * A mailto link with the visitor's note already written, so a failed send
 * never costs them their message. Falls back to the plain address when the
 * note is too long for a mail link.
 */
function mailtoWith(input: ContactInput) {
  const body = [
    input.message,
    "",
    input.name,
    input.organization,
  ]
    .filter((line, i) => i < 2 || line)
    .join("\n");
  const href = `mailto:${site.email}?subject=${encodeURIComponent(copy.mailSubject)}&body=${encodeURIComponent(body)}`;
  return href.length > 1900 ? mailtoBook : href;
}

function ErrorGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="mt-[0.2em] h-4 w-4 flex-none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4.5v4.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8" cy="11.25" r="0.95" fill="currentColor" />
    </svg>
  );
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2.5 flex items-baseline gap-2 text-[0.9375rem] font-medium text-fg">
      {children}
      {optional && <span className="label font-normal text-fg-3">{copy.fields.optional}</span>}
    </label>
  );
}

/**
 * The contact form. Validates on the client with the same rules as the API
 * (lib/contact.ts), moves focus to the first invalid field or to the
 * confirmation, and offers a prefilled email when the mail service is not
 * available. Without JavaScript it falls back to the browser's own
 * validation and opens the visitor's email app.
 */
export default function ContactForm({ className }: { className?: string }) {
  const hydrated = useHydrated();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [fallbackHref, setFallbackHref] = useState<string | null>(null);
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
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const input = normalize(Object.fromEntries(data));

    const clientErrors = validate(input);
    if (Object.keys(clientErrors).length > 0) {
      setFallbackHref(null);
      showErrors(clientErrors);
      return;
    }

    setStatus("submitting");
    setErrors({});
    setFallbackHref(null);
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, company: String(data.get("ef_hp") || "") }),
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
      setFallbackHref(mailtoWith(input));
      setMessage(res.status === 429 ? copy.tooMany : copy.failed);
    } catch {
      setStatus("error");
      setFallbackHref(mailtoWith(input));
      setMessage(copy.failed);
    }
  }

  const card = cx("rounded-[1.25rem] bg-surface p-6 min-[640px]:p-10 min-[1200px]:p-12", className);

  if (status === "success") {
    return (
      <div className={card} role="status" aria-live="polite">
        <span
          aria-hidden="true"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-mark text-mark-ink"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 ref={successRef} tabIndex={-1} className="serif mt-8 text-h2 outline-none">
          {copy.success.heading}
        </h2>
        <p className="mt-5 max-w-[32rem] text-lead text-fg-2">{copy.success.body}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
          className="btn btn-secondary mt-10"
        >
          <span>{copy.success.again}</span>
          <Arrow />
        </button>
      </div>
    );
  }

  const describedBy = (name: ContactField, hint?: string) =>
    [hint, errors[name] ? `${name}-error` : null].filter(Boolean).join(" ") || undefined;

  const fieldProps = (name: ContactField, hint?: string) => ({
    id: name,
    name,
    required: true,
    "aria-required": true,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": describedBy(name, hint),
    className: "field",
  });

  const errorFor = (name: ContactField) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-2.5 flex items-start gap-2 text-small font-medium text-danger">
        <ErrorGlyph />
        <span>{errors[name]}</span>
      </p>
    ) : null;

  const submitting = status === "submitting";

  return (
    <div className={card}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule pb-6">
        <h2 id="form-heading" className="serif text-h3">
          {contact.formHeading}
        </h2>
        <p className="label text-fg-3">{copy.required}</p>
      </div>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        // Without JavaScript the browser validates the fields and sends the
        // note through the visitor's email app. With it, onSubmit takes over.
        action={mailtoBook}
        method="post"
        encType="text/plain"
        noValidate={hydrated}
        aria-labelledby="form-heading"
        aria-busy={submitting || undefined}
        className="mt-8 grid gap-7"
      >
        {/* Honeypot: hidden from people and assistive tech, off the tab order. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          {/* A non-semantic name, so browser autofill never fills it for a real visitor. */}
          <label htmlFor="ef_hp">Leave this field empty</label>
          <input id="ef_hp" name="ef_hp" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-7 min-[640px]:grid-cols-2 min-[640px]:gap-5">
          <div className="min-w-0">
            <Label htmlFor="name">{copy.fields.name}</Label>
            <input type="text" autoComplete="name" maxLength={LIMITS.name} {...fieldProps("name")} />
            {errorFor("name")}
          </div>
          <div className="min-w-0">
            <Label htmlFor="organization" optional>
              {copy.fields.organization}
            </Label>
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
          <Label htmlFor="email">{copy.fields.email}</Label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            maxLength={LIMITS.email}
            {...fieldProps("email")}
          />
          {errorFor("email")}
        </div>

        <div>
          <Label htmlFor="message">{copy.fields.message}</Label>
          <p id="message-hint" className="-mt-1 mb-3 text-small text-fg-3">
            {copy.fields.messageHint}
          </p>
          <textarea rows={7} minLength={10} maxLength={LIMITS.message} {...fieldProps("message", "message-hint")} />
          {errorFor("message")}
        </div>

        <div className="flex flex-col gap-5 border-t border-rule pt-8 min-[640px]:flex-row min-[640px]:items-center min-[640px]:gap-8">
          <button
            type="submit"
            // aria-disabled rather than disabled: disabling the focused button would drop focus to <body>.
            aria-disabled={submitting || undefined}
            className="btn btn-primary btn-lg w-full flex-none aria-disabled:cursor-wait aria-disabled:opacity-80 min-[640px]:w-auto"
          >
            <span>{submitting ? copy.submitting : copy.submit}</span>
            {!submitting && <Arrow />}
          </button>
          <p
            role="status"
            aria-live="polite"
            className={cx("text-small", status === "error" ? "text-fg" : "text-fg-2")}
          >
            {message}
            {fallbackHref ? (
              <>
                {" "}
                {copy.fallbackPrefix}{" "}
                <a href={fallbackHref} className="link font-medium">
                  {site.email}
                </a>{" "}
                {copy.fallbackSuffix}
              </>
            ) : null}
          </p>
        </div>

        <noscript>
          <p className="text-small text-fg-3">
            {copy.noscript}{" "}
            <a href={mailtoBook} className="link">
              {site.email}
            </a>
            .
          </p>
        </noscript>
      </form>
    </div>
  );
}
