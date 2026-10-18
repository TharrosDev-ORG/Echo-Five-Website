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
  url: "https://echo-five.ca",
  email: "mark@echo-five.ca",
  region: "Serving clients across Canada",
  tagline: "Change that lands. Tools that get used.",
  /** The home page's meta description, also used by the manifest and JSON-LD. Keep it under about 160 characters. */
  description:
    "Echofive helps government and enterprise organizations adopt Microsoft 365: strategy, communications, training, and technical writing. 30+ years in practice.",
  /**
   * When the site's content last changed (YYYY-MM-DD). Feeds `lastModified` in
   * app/sitemap.ts for every page except the legal statements, which carry
   * their own `updated` date. Bump it when you change page copy.
   */
  contentUpdated: "2026-10-17",
  video: {
    id: "4IycJ3ehz7g",
    url: "https://www.youtube.com/watch?v=4IycJ3ehz7g",
  },
  advantaUrl: "https://www.advanta365.com",
  advantaPurchaseUrl: "https://www.advanta365.com/purchase",
  advantaSamplesUrl: "https://www.advanta365.com/catalog?free=1",
  advantaEmail: "hello@advanta365.com",
} as const;

export const mailtoBook = `mailto:${site.email}?subject=${encodeURIComponent(
  "Microsoft 365 adoption: a conversation",
)}`;
