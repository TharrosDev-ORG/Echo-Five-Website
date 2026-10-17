/**
 * Copy shared across pages: navigation, site chrome, clients, credentials,
 * the founder, and the conference talk.
 *
 * Rules (docs/CONTENT.md): no claim without a source, no em dashes, and
 * "Microsoft 365" in visible copy (non-breaking space) so the product
 * name never splits across lines. Metadata uses a plain space.
 */
import { site } from "@/lib/site";

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Approach", href: "/approach" },
  { label: "Advanta365", href: "/advanta365" },
  { label: "About", href: "/about" },
] as const;

export const navCta = { label: "Start a conversation", href: "/contact" } as const;

/** The closing call to action at the end of every page except Contact. */
export const closing = {
  index: "Next step",
  heading: ["Planning a rollout,", "or rescuing one?"],
  body: "Whether you are scoping a migration or trying to rescue an adoption that has stalled, we will tell you plainly whether we can help.",
  primary: "Start a conversation",
  emailLabel: "Or write to",
};

export const footer = {
  statement: "Change that lands. Tools that get used.",
  blurb:
    "Microsoft 365 change management for Canadian public sector and enterprise organizations.",
  columns: {
    firm: "The firm",
    product: "Product",
    contact: "Contact",
  },
  productBlurb:
    "The change management and user adoption toolkit behind real SharePoint Online rollouts.",
  productLink: "Visit advanta365.com",
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Accessibility", href: "/accessibility" },
  ],
  trademarks:
    "Microsoft 365, Teams, SharePoint, Copilot, OneDrive, and Purview are trademarks of Microsoft Corporation. Prosci and ADKAR are trademarks of Prosci Inc. ChatGPT is a trademark of OpenAI.",
  disclaimer:
    "Advanta365 and Echofive are independent and not affiliated with or endorsed by Prosci Inc. or Microsoft Corporation.",
  backToTop: "Back to top",
};

export const ui = {
  homeLabel: "Echofive home",
  menuOpen: "Menu",
  menuClose: "Close",
  menuLabel: "Site menu",
  drawerEmailPrefix: "Or email",
  marqueePause: "Pause",
  marqueePlay: "Play",
  marqueePauseLabel: "Pause the scrolling client names",
  marqueePlayLabel: "Play the scrolling client names",
};

/** The fixed bottom bar on small screens. */
export const mobileCta = { label: "Start a conversation", href: "/contact" };

/* ------------------------------------------------------------------ *
 * Clients. Named with permission of the record: these are the public
 * client list the firm has always published.
 * ------------------------------------------------------------------ */

export const clients = {
  heading: "Clients",
  marqueeHeading: "Trusted across the Government of Canada, Crown corporations, and enterprise",
  fullListLink: "See the full client list",
  intro:
    "More than thirty years of department-wide rollouts across national security, Crown corporations, and the private sector.",
  groups: [
    {
      label: "Government of Canada",
      orgs: [
        { short: "DND", name: "Department of National Defence" },
        { short: "SSC", name: "Shared Services Canada" },
        { short: "TBS", name: "Treasury Board of Canada Secretariat" },
        { short: "ESDC", name: "Employment and Social Development Canada" },
        { short: "PMPRB", name: "Patented Medicine Prices Review Board" },
        { short: "CSC", name: "Correctional Service Canada" },
        { short: "JUS", name: "Department of Justice Canada" },
        { short: "LAC", name: "Library and Archives Canada" },
      ],
    },
    {
      label: "Crown corporations and agencies",
      orgs: [
        { short: "CDIC", name: "Canada Deposit Insurance Corporation" },
        { short: "EDC", name: "Export Development Canada" },
        { short: "CPC", name: "Canada Post Corporation" },
        { short: "Innovapost", name: "Innovapost" },
        { short: "CIRA", name: "Canadian Internet Registration Authority" },
      ],
    },
    {
      label: "Enterprise and non-profit",
      orgs: [
        { short: "Emera", name: "Emera / Nova Scotia Power" },
        { short: "Cameco", name: "Cameco Corporation" },
        { short: "IG", name: "Investors Group" },
        { short: "TechInsights", name: "TechInsights" },
        { short: "Minto", name: "Minto" },
        { short: "TPL", name: "Toronto Public Library" },
        { short: "TTC", name: "Toronto Transit Commission" },
        { short: "CNA", name: "Canadian Nurses Association" },
        { short: "Red Cross", name: "Canadian Red Cross" },
        { short: "NCC", name: "Nature Conservancy of Canada" },
        { short: "CPAWS", name: "Canadian Parks and Wilderness Society" },
      ],
    },
  ],
};

/** Total named clients, computed so the number can never drift from the list. */
export const clientCount = clients.groups.reduce((n, g) => n + g.orgs.length, 0);

/* ------------------------------------------------------------------ *
 * Credentials and the founder
 * ------------------------------------------------------------------ */

export const credentials = {
  heading: "Credentials",
  intro: "The certifications and security clearance behind our work.",
  items: [
    {
      title: "Prosci ADKAR Change Management",
      detail: "Certified 2009 and 2016",
      issuer: "Prosci",
    },
    {
      title: "Microsoft 365 Certified: Fundamentals",
      detail: "Platform certification",
      issuer: "Microsoft",
    },
    {
      title: "Secret Level II Security Clearance",
      detail: "Cleared for federal engagements",
      issuer: "Government of Canada",
    },
    {
      title: "Certified Instructor / Facilitator",
      detail: "Adult learning and facilitation",
      issuer: "Langevin",
    },
    {
      title: "Certified Training Manager / Director",
      detail: "Learning program leadership",
      issuer: "Langevin",
    },
  ],
};

/**
 * Proof set as giant numerals. `mark` is a display-only short form; `value`
 * and `label` carry the claim for screen readers and for the visible caption.
 */
export const proof = [
  { mark: "30+", value: "30+ years in practice", label: "Federal and enterprise rollouts" },
  { mark: "II", value: "Secret Level II", label: "Cleared for federal engagements" },
  { mark: "ADKAR", value: "Prosci ADKAR certified", label: "Certified 2009 and 2016" },
  { mark: "365", value: "Microsoft 365 Certified", label: "Fundamentals" },
];

export const principal = {
  heading: "Founder",
  monogram: "MA",
  name: "Mark Abdelnour",
  role: "Founder and Lead Consultant",
  bio: "Mark founded Echofive and brings more than thirty years of leading change and adoption across the Government of Canada and major enterprises. He is Prosci ADKAR certified, Microsoft 365 certified, and holds Secret Level II clearance. When you write to Echofive, your note reaches him directly.",
  credentials: ["Prosci ADKAR", "Microsoft 365 Certified", "Secret Level II"],
};

/** The conference talk (click-to-load video). */
export const talk = {
  index: "On the record",
  heading: "Building the Plane While Flying It",
  sub: "Shared Services Canada Microsoft 365 user adoption during COVID-19, presented to the Government of Canada M365 Council.",
  venue: "Government of Canada M365 Council",
  cta: "Watch the talk",
  openLabel: "Open on YouTube",
  video: site.video,
};
