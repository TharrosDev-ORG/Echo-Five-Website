/**
 * All page copy and data. Keeping it here makes the marketing surface
 * editable without touching layout components.
 *
 * Rules (see docs/CONTENT.md): no claim appears here without a source, no em
 * dashes, and summaries only restate what is said in full elsewhere.
 * Visible copy writes "Microsoft 365" with a non-breaking space so the
 * product name never splits across lines; metadata descriptions use a plain space.
 */
import type { IconName } from "@/components/ui/icons";
import { site } from "@/lib/site";

/* ------------------------------------------------------------------ *
 * Navigation and site chrome
 * ------------------------------------------------------------------ */

/** Primary navigation. Contact is reached through `navCta`. */
export const nav = [
  { label: "Services", href: "/services" },
  { label: "Approach", href: "/approach" },
  { label: "Advanta365", href: "/product" },
  { label: "About", href: "/about" },
] as const;

export const navCta = { label: "Start a conversation", href: "/contact" } as const;

/** Closing band at the end of every page except Contact. */
export const ctaBand = {
  heading: "Tell us what you are rolling out.",
  body: "Whether you are scoping a migration or trying to rescue an adoption that has stalled, we will tell you plainly whether we can help.",
  primary: "Start a conversation",
  emailLabel: `Email ${site.email}`,
};

/** The fixed bottom bar on small screens. */
export const mobileCta = {
  label: "Start a conversation",
  href: "/contact",
};

export const footer = {
  blurb:
    "Microsoft\u00A0365 change management for Canadian public sector and enterprise organizations.",
  pagesHeading: "Pages",
  contactHeading: "Contact",
  productHeading: "Advanta365",
  productBlurb:
    "The change management and user adoption toolkit behind real SharePoint Online rollouts.",
  productLink: "Visit advanta365.com",
  /** Shown in the footer ahead of `advanta.disclaimer`, which covers independence. */
  trademarks:
    "Microsoft 365, Teams, SharePoint, Copilot, OneDrive, and Purview are trademarks of Microsoft Corporation. Prosci and ADKAR are trademarks of Prosci Inc. ChatGPT is a trademark of OpenAI.",
};

/** Small interface labels shared by site chrome. */
export const ui = {
  homeLabel: "Home",
  drawerEmailPrefix: "Or email",
  marqueePause: "Pause",
  marqueePlay: "Play",
  marqueePauseLabel: "Pause scrolling names",
};

/** Text drawn into the social share image (app/opengraph-image.tsx). */
export const ogImage = {
  credentials: ["30+ years", "Prosci ADKAR certified", "Secret Level II cleared"],
};

/* ------------------------------------------------------------------ *
 * Home
 * ------------------------------------------------------------------ */

export const hero = {
  /** Small context line above the headline. */
  context: "Microsoft\u00A0365 change management for Canadian public sector and enterprise organizations",
  headline: ["Change that lands.", "Tools that get used."],
  sub: "We help government and enterprise organizations move to Microsoft\u00A0365 and actually adopt it. Strategy, communications, training, and technical writing, delivered end to end.",
  cta: {
    primary: "Start a conversation",
    secondary: "How we work",
  },
  /** Credentials at a glance. Every line restates a claim made elsewhere on the site. */
  facts: [
    { title: "30+ years in practice", detail: "Federal and enterprise rollouts" },
    { title: "Secret Level II clearance", detail: "Cleared for federal engagements" },
    { title: "Prosci ADKAR certified", detail: "Certified 2009 and 2016" },
    { title: "Microsoft\u00A0365 Certified", detail: "Fundamentals" },
  ],
};

/** The proof strip under the home hero: four short credentials. */
export const proofStrip: { value: string; label: string; icon: IconName }[] = [
  { value: "30+ years", label: "Federal and enterprise rollouts", icon: "certificate" },
  { value: "Secret Level II", label: "Cleared for federal engagements", icon: "shield" },
  { value: "Prosci ADKAR", label: "Certified 2009 and 2016", icon: "certificate" },
  { value: "Microsoft\u00A0365", label: "Certified: Fundamentals", icon: "certificate" },
];

export const why = {
  heading: "Why Microsoft\u00A0365 rollouts stall",
  body: "Most Microsoft\u00A0365 rollouts are run as IT projects with a training session bolted on at the end. The licences get paid for. The old habits stay. People route around the new tools, shadow systems creep back in, and the productivity that was promised never arrives. The technology was never the hard part. Getting thousands of people to work differently is.",
  failures: [
    {
      n: "1",
      title: "Go-live is treated as the finish line.",
      body: "Nobody owns the months after launch, which is when habits actually change.",
    },
    {
      n: "2",
      title: "Communications are generic, so people tune them out.",
      body: "One all-staff email cannot tell a finance analyst and a field officer what changes for them.",
    },
    {
      n: "3",
      title: "Training stops before people are proficient.",
      body: "A single session shows where the buttons are. It does not cover the workflow people come back to on a busy Tuesday.",
    },
  ],
  close: "That is the part of a deployment we work on: the people.",
};

type ServiceItem = {
  n: string;
  /** Anchor id on /services, used by the jump links. */
  slug: string;
  icon: IconName;
  title: string;
  body: string;
  tag: string;
};

export const services: {
  heading: string;
  intro: string;
  cta: string;
  platformsLabel: string;
  platforms: string[];
  jumpLabel: string;
  items: ServiceItem[];
  pairWithAdvanta: { heading: string; body: string; cta: string };
} = {
  heading: "What we do",
  intro:
    "We cover both the strategy and the hands-on work: the roadmap and the floor walking, the communications plan and the job aids. Each engagement is aimed at a specific behaviour we can measure.",
  cta: "Explore our services",
  platformsLabel: "Platforms we work in",
  platforms: [
    "SharePoint Online",
    "Microsoft Teams",
    "Microsoft Copilot",
    "OneDrive",
    "Microsoft Purview",
  ],
  jumpLabel: "Jump to a service",
  items: [
    {
      n: "01",
      slug: "strategy",
      icon: "compass",
      title: "Adoption strategy & roadmaps",
      body: "We build the adoption plan before the migration starts: stakeholder mapping, readiness assessments, and a Prosci ADKAR roadmap that ties every activity to a behaviour we can measure.",
      tag: "Prosci ADKAR",
    },
    {
      n: "02",
      slug: "communications",
      icon: "megaphone",
      title: "Communications that get read",
      body: "Role-based, targeted communications that cut through inbox noise and tell each audience what is changing, when, and what to do about it.",
      tag: "Comms strategy",
    },
    {
      n: "03",
      slug: "training",
      icon: "users",
      title: "Training & enablement",
      body: "Hands-on training, floor walking, and champion networks that move teams from aware to proficient across Teams, SharePoint Online, OneDrive, and Copilot.",
      tag: "Enablement",
    },
    {
      n: "04",
      slug: "technical-writing",
      icon: "pen",
      title: "Technical writing & e-learning",
      body: "Job aids, e-learning modules, and self-serve learning portals that turn a complex process into something a busy team can follow on their own.",
      tag: "Technical writing",
    },
    {
      n: "05",
      slug: "ai-coaching",
      icon: "sparkle",
      title: "AI coaching",
      body: "We coach teams to use Copilot and ChatGPT to produce clearer, better work faster, with people still making the judgment calls.",
      tag: "Copilot · ChatGPT",
    },
    {
      n: "06",
      slug: "migration",
      icon: "migrate",
      title: "Migration & embedded change agents",
      body: "Zero-downtime moves off legacy systems, with change agents embedded across directorates so adoption holds long after we step away.",
      tag: "Migration",
    },
  ],
  pairWithAdvanta: {
    heading: "Pair it with Advanta365",
    body: "Advanta365 is our change management and user adoption toolkit: 59 playbooks, 130 ready-to-use templates, field guides, and training materials. We use it inside our engagements, and your team can buy it for its own rollout.",
    cta: "Explore Advanta365",
  },
};

/** The Prosci ADKAR model. Stage names spell the acronym. */
export const process = {
  heading: "How adoption happens",
  intro:
    "We run every engagement on the Prosci ADKAR model. Each person has to move through five stages in order, and a rollout stalls at whichever stage gets skipped.",
  cta: "See how we work",
  /** Accessible label for the stage list or tablist. */
  stagesLabel: "The five Prosci ADKAR stages, in order",
  stages: [
    {
      key: "A",
      name: "Awareness",
      body: "People understand why the change is happening, in their own terms.",
    },
    {
      key: "D",
      name: "Desire",
      body: "They have their own reason to take part, beyond a mandate from above.",
    },
    {
      key: "K",
      name: "Knowledge",
      body: "They know how to work the new way, step by step.",
    },
    {
      key: "A",
      name: "Ability",
      body: "They can do it under real conditions, on a busy day.",
    },
    {
      key: "R",
      name: "Reinforcement",
      body: "The new way sticks, and the old habits do not creep back.",
    },
  ],
};

/**
 * "How an engagement runs" on /approach. Built only from the service
 * descriptions above: strategy, communications, training, reinforcement.
 */
export const engagement = {
  heading: "How an engagement runs",
  intro:
    "Each engagement is aimed at a specific behaviour we can measure.",
  steps: [
    {
      n: "1",
      title: "Strategy",
      body: "We build the adoption plan before the migration starts: stakeholder mapping, readiness assessments, and a Prosci ADKAR roadmap.",
    },
    {
      n: "2",
      title: "Communications",
      body: "Role-based, targeted communications tell each audience what is changing, when, and what to do about it.",
    },
    {
      n: "3",
      title: "Training",
      body: "Hands-on training, floor walking, and champion networks move teams from aware to proficient.",
    },
    {
      n: "4",
      title: "Reinforcement",
      body: "Job aids, self-serve learning, and change agents embedded across directorates keep adoption holding long after we step away.",
    },
  ],
};

export const clients = {
  heading: "Clients",
  /** Heading above the home page client marquee. */
  marqueeHeading: "Trusted by teams across government and enterprise",
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
      label: "Crown corporations & agencies",
      orgs: [
        { short: "CDIC", name: "Canada Deposit Insurance Corporation" },
        { short: "EDC", name: "Export Development Canada" },
        { short: "CPC", name: "Canada Post Corporation" },
        { short: "Innovapost", name: "Innovapost" },
        { short: "CIRA", name: "Canadian Internet Registration Authority" },
      ],
    },
    {
      label: "Enterprise & non-profit",
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

/** The conference talk (click-to-load video on Home and Approach). */
export const talk = {
  sectionHeading: "Conference talk",
  heading: "Building the Plane While Flying It",
  sub: "Shared Services Canada Microsoft\u00A0365 user adoption during COVID-19, presented to the Government of Canada M365 Council.",
  cta: "Watch the talk",
  openLabel: "Open on YouTube",
};

/* ------------------------------------------------------------------ *
 * Advanta365 (facts sourced from advanta365.com, 2026-10-13)
 * ------------------------------------------------------------------ */

export const advanta = {
  name: "Advanta365",
  byline: "A product of Echofive",
  description:
    "The change management and user adoption toolkit behind real SharePoint Online rollouts.",
  /** Who built it. Three short lines. */
  provenance: [
    "Built by a Prosci-certified practitioner",
    "Field-tested over 30+ years",
    "Refined across decades of real rollouts",
  ],
  counts: [
    { value: "59", label: "Playbooks" },
    { value: "130", label: "Ready-to-use templates" },
    { value: "4", label: "Field guides" },
    { value: "58", label: "Job aids" },
  ],
  contentsHeading: "What's inside",
  contents: [
    {
      icon: "book",
      title: "59 playbooks",
      body: "Covering all seven phases, from Make the case to Sustain.",
    },
    {
      icon: "template",
      title: "130 ready-to-use templates",
      body: "Emails, plans, checklists, worksheets, and workshop kits.",
    },
    {
      icon: "map",
      title: "4 field guides",
      body: "For change practitioners and IM partners.",
    },
    {
      icon: "users",
      title: "Training for three audiences",
      body: "End users, Site Owners, and IM Representatives, with facilitator guides, learning guides, and 58 job aids.",
    },
    {
      icon: "clipboard",
      title: "A complete worked example",
      body: "A full change management strategy for a 10,000-person organization.",
    },
    {
      icon: "sparkle",
      title: "Copilot-ready guides",
      body: "Readiness, rollout, and impact assessment for Microsoft\u00A0365 Copilot.",
    },
  ] satisfies { icon: IconName; title: string; body: string }[],
  formatsHeading: "Files in four formats",
  formats: ["DOCX", "PPTX", "XLSX", "PDF"],
  phasesHeading: "Seven phases, start to finish",
  phasesIntro: "The playbooks cover all seven phases of a rollout.",
  phases: ["Make the case", "Plan", "Design", "Prepare", "Communicate", "Execute", "Sustain"],
  freeSamplesHeading: "Try it first: six free samples",
  freeSamples: [
    { title: "Executive Sponsor Kickoff Deck", format: "PPTX", detail: "16 slides" },
    { title: "Change Management Strategy", format: "DOCX" },
    { title: "SharePoint Governance Framework", format: "DOCX" },
    {
      // The word joiner (U+2060) keeps "End-User" from breaking at the hyphen.
      title: "SharePoint End-\u2060User Training Deck",
      format: "PPTX",
      detail: "A 60-minute instructor-led session",
    },
    { title: "Master Communications Plan", format: "XLSX" },
    { title: "Go/No-Go Decision Checklist", format: "XLSX" },
  ] as { title: string; format: string; detail?: string }[],
  price: {
    heading: "One purchase. The whole toolkit.",
    amount: "$1,499.99",
    currency: "CAD",
    note: "Includes every playbook, template, field guide, and job aid.",
    includes: [
      "59 playbooks covering all seven phases",
      "130 ready-to-use templates",
      "4 field guides for change practitioners and IM partners",
      "Training for three audiences, with 58 job aids",
      "A complete worked example for a 10,000-person organization",
      "Copilot-ready guides for Microsoft\u00A0365 Copilot",
      "DOCX, PPTX, XLSX, and PDF formats",
    ],
  },
  cta: {
    purchase: "Get the toolkit",
    samples: "See the free samples",
    samplesShort: "See free samples",
    explore: "Explore Advanta365",
    contact: `Questions? Email ${site.advantaEmail}`,
  },
  urls: {
    home: site.advantaUrl,
    purchase: site.advantaPurchaseUrl,
    samples: site.advantaSamplesUrl,
    email: site.advantaEmail,
  },
  /** The home page band that introduces the toolkit. */
  band: {
    heading: "The toolkit behind real rollouts",
    body: "Advanta365 is the change management and user adoption toolkit behind real SharePoint Online rollouts. Ready to use as is, or tailor with AI.",
  },
  relationship: {
    heading: "Echofive uses Advanta365 inside our engagements",
    body: "If you want help running your rollout, start a conversation with us. We will tell you plainly whether we can help.",
    cta: "Start a conversation",
  },
  disclaimer:
    "Advanta365 and Echofive are independent and not affiliated with or endorsed by Prosci Inc. or Microsoft Corporation.",
};

/* ------------------------------------------------------------------ *
 * About
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
      title: "Microsoft\u00A0365 Certified: Fundamentals",
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
      detail: "Learning programme leadership",
      issuer: "Langevin",
    },
  ],
};

export const about = {
  heading: "The firm",
  tagline: ["Thirty years.", "One job.", "Done properly."],
  body: [
    "Echofive Solutions is a senior change management practice built around one specialty: helping organizations actually adopt Microsoft\u00A0365.",
    "We bring more than thirty years of moving federal and enterprise teams off legacy systems. Today that means Teams, SharePoint Online, Copilot, and OneDrive, with the strategy, communications, training, and technical writing that make the change stick. Prosci aligned, Microsoft certified, Secret Level II cleared.",
    "The firm is small enough to stay accountable and experienced enough to run a department-wide rollout, from the first roadmap to embedded change agents.",
  ],
};

export const principal = {
  heading: "Founder",
  monogram: "MA",
  name: "Mark Abdelnour",
  role: "Founder and Lead Consultant",
  bio: "Mark founded Echofive and brings more than thirty years of leading change and adoption across the Government of Canada and major enterprises. He is Prosci ADKAR certified, Microsoft\u00A0365 certified, and holds Secret Level II clearance. When you write to Echofive, your note reaches him directly.",
  credentials: ["Prosci ADKAR", "Microsoft\u00A0365 Certified", "Secret Level II"],
};

/* ------------------------------------------------------------------ *
 * Contact
 * ------------------------------------------------------------------ */

export const contact = {
  directLine: "Your message goes straight to the founder.",
  stepsHeading: "What happens next",
  steps: [
    {
      n: "1",
      title: "You send a note",
      body: "Use the form or email us directly. Tell us what you are rolling out.",
    },
    {
      n: "2",
      title: "The founder replies directly",
      body: "Your message goes straight to Mark Abdelnour, the founder.",
    },
    {
      n: "3",
      title: "A first conversation about your rollout",
      body: "Whether you are scoping a migration or trying to rescue an adoption that has stalled, we will tell you plainly whether we can help.",
    },
  ],
  emailHeading: "Prefer email?",
  credentialsHeading: "Credentials",
  formHeading: "Send a message",
};

/** Contact form labels and messages (components/contact/ContactForm). */
export const contactForm = {
  label: "Contact form",
  fields: {
    name: "Name",
    organization: "Organization",
    optional: "(optional)",
    email: "Work email",
    message: "What are you rolling out?",
  },
  submit: "Send message",
  submitting: "Sending…",
  fixFields: "Please fix the highlighted fields.",
  tooMany: "Too many messages from this connection.",
  failed: "Our form could not send right now.",
  fallbackPrefix: "Email",
  fallbackSuffix: "directly.",
  success: {
    heading: "Message sent.",
    body: "Thank you. Your note has reached Mark directly.",
  },
};

/* ------------------------------------------------------------------ *
 * Error pages
 * ------------------------------------------------------------------ */

export const notFound = {
  eyebrow: "Error 404: page not found",
  heading: "This page does not exist.",
  body: "It may have moved when the site was reorganized. Everything is a click away from the home page.",
  primary: "Back to home",
  secondary: "Contact us",
};

export const errorPage = {
  eyebrow: "Something went wrong",
  heading: "We hit an unexpected snag.",
  body: "Please try again. If it keeps happening, reach us directly and we will sort it out.",
  primary: "Try again",
  secondary: `Email ${site.shortName}`,
};

/* ------------------------------------------------------------------ *
 * Inner-page headers and SEO descriptions
 * ------------------------------------------------------------------ */

export const pages = {
  home: {
    description: site.description,
  },
  services: {
    title: "Services",
    heading: "Microsoft\u00A0365 adoption services",
    lead: "We cover both the strategy and the hands-on work: the roadmap and the floor walking, the communications plan and the job aids. Each engagement is aimed at a specific behaviour we can measure.",
    description:
      "Microsoft 365 adoption strategy, communications, training, technical writing, AI coaching, and migration support for government and enterprise.",
  },
  approach: {
    title: "Approach",
    heading: "How we work",
    lead: "Most Microsoft\u00A0365 rollouts are run as IT projects with a training session added at the end. We work on the people side of the deployment, using the Prosci ADKAR model to move each person from awareness to lasting habit.",
    description:
      "Why Microsoft 365 rollouts stall, and how Echofive runs adoption on the Prosci ADKAR model: strategy, communications, training, and reinforcement.",
  },
  product: {
    title: "Advanta365",
    heading: "Advanta365",
    lead: "The change management and user adoption toolkit behind real SharePoint Online rollouts. Ready to use as is, or tailor with AI.",
    description:
      "Advanta365 is the change management and user adoption toolkit behind real SharePoint Online rollouts: 59 playbooks, 130 templates, 4 field guides, and training with 58 job aids. $1,499.99 CAD, one purchase.",
  },
  about: {
    title: "About",
    heading: "Thirty years. One job. Done properly.",
    lead: "Echofive Solutions is a senior change management practice built around one specialty: helping organizations actually adopt Microsoft\u00A0365.",
    description:
      "Echofive Solutions: a senior Microsoft 365 change management practice. Credentials, clearance, and more than thirty years of government and enterprise clients.",
  },
  contact: {
    title: "Contact",
    heading: "Tell us what you are rolling out.",
    lead: "Whether you are scoping a migration or trying to rescue an adoption that has stalled, we will tell you plainly whether we can help.",
    description:
      "Start a conversation with Echofive Solutions about your Microsoft 365 rollout. Your message goes straight to the founder.",
  },
};
