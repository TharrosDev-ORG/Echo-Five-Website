/**
 * Site-wide constants. Edit the email and URLs here in one place.
 * `email` feeds every "Book a conversation" / contact link on the site.
 */
export const site = {
  name: "Echofive Solutions",
  legalName: "Echofive Solutions Inc.",
  shortName: "Echofive",
  callsign: "ECHO·FIVE",
  url: "https://echo-five.ca",
  email: "Mark.Abdelnour@gmail.com",
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
