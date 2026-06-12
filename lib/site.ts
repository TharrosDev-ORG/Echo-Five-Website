/**
 * Site-wide constants. Edit the contact address and URLs here in one place.
 *
 * `email` is the public, owned-domain address shown on the site and used as the
 * mailto fallback when the contact form cannot reach the mail service. Live form
 * delivery is configured separately via env (see app/api/contact/route.ts):
 * RESEND_API_KEY, CONTACT_TO, CONTACT_FROM.
 */
export const site = {
  name: "Echofive Solutions",
  legalName: "Echofive Solutions Inc.",
  shortName: "Echofive",
  callsign: "ECHO·FIVE",
  url: "https://echo-five.ca",
  email: "mark@echo-five.ca",
  region: "Serving clients across Canada",
  tagline: "Change that lands. Tools that get used.",
  description:
    "Echofive Solutions helps government and enterprise organizations move to Microsoft 365 and actually adopt it: strategy, communications, training, and technical writing, delivered end to end.",
  video: {
    id: "4IycJ3ehz7g",
    url: "https://www.youtube.com/watch?v=4IycJ3ehz7g",
  },
  advantaUrl: "https://www.advanta365.com",
} as const;

export const mailtoBook = `mailto:${site.email}?subject=${encodeURIComponent(
  "Microsoft 365 adoption: a conversation",
)}`;
