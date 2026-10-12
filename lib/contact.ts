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

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Trim, cap length, and (for single-line fields) collapse line breaks. */
export function clean(v: unknown, max: number, multiline = false): string {
  if (typeof v !== "string") return "";
  const s = multiline ? v : v.replace(/[\r\n]+/g, " ");
  return s.trim().slice(0, max);
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
