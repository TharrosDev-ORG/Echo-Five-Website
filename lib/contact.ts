/**
 * Contact form rules, shared by the client form (instant feedback) and the API
 * route (the authority). Keeping one copy means the two can never disagree.
 */

export type ContactField = "name" | "email" | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactInput = {
  name: string;
  organization: string;
  email: string;
  message: string;
};

export const LIMITS = {
  name: 120,
  organization: 160,
  email: 200,
  message: 4000,
} as const;

/**
 * A deliberately plain address: one local part, one dotted domain, nothing a
 * mail library could read as a display name, a second recipient or a header
 * (no spaces, quotes, angle brackets, commas, semicolons or parentheses).
 */
const EMAIL = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;
const isEmail = (v: string) => v.length <= LIMITS.email && EMAIL.test(v);

/*
 * Characters that never belong in a form value:
 * - C0/C1 control characters and DEL (tab and line feed are handled separately)
 * - bidirectional overrides and isolates, which can make a subject line or a
 *   name read differently from what it contains
 * - zero-width space, word joiner, invisible operators and the BOM
 */
const INVISIBLE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g;
/** Every way to start a new line, including the ones mail tooling may honour. */
const LINE_BREAKS = /\r\n?|[\n\u0085\u2028\u2029]/g;

/** Drop a high surrogate left dangling by a length cut. */
const trimSurrogate = (s: string) => (/[\uD800-\uDBFF]$/.test(s) ? s.slice(0, -1) : s);

/**
 * Normalize, strip invisible characters, cap length. Single-line fields have
 * every line break and tab folded to one space, so nothing typed into them can
 * start a new line in an email header or subject.
 */
export function clean(v: unknown, max: number, multiline = false): string {
  if (typeof v !== "string") return "";
  let s = v.normalize("NFC").replace(INVISIBLE, "");
  s = multiline
    ? s.replace(LINE_BREAKS, "\n").replace(/\n{3,}/g, "\n\n")
    : s.replace(LINE_BREAKS, " ").replace(/[\t ]+/g, " ");
  return trimSurrogate(s.trim().slice(0, max)).trim();
}

export function normalize(raw: Record<string, unknown>): ContactInput {
  return {
    name: clean(raw.name, LIMITS.name),
    organization: clean(raw.organization, LIMITS.organization),
    email: clean(raw.email, LIMITS.email),
    message: clean(raw.message, LIMITS.message, true),
  };
}

export function validate(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (input.name.length < 2) errors.name = "Please enter your name.";
  if (!isEmail(input.email)) errors.email = "Please enter a valid email address.";
  if (input.message.length < 10) {
    errors.message = "Please add a sentence or two about what you are rolling out.";
  }
  return errors;
}
