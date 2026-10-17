/**
 * Services: the six practice areas. Used on Home (summary list) and on
 * /services (full detail). `deliverables` restate only what `body` says.
 */

export type Service = {
  n: string;
  /** Anchor id on /services. */
  slug: string;
  title: string;
  /** One-line summary for lists. */
  short: string;
  body: string;
  tag: string;
  deliverables: string[];
};

export const services = {
  index: "Services",
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
  deliverablesLabel: "What you get",
  items: [
    {
      n: "01",
      slug: "strategy",
      title: "Adoption strategy and roadmaps",
      short: "The adoption plan, built before the migration starts.",
      body: "We build the adoption plan before the migration starts: stakeholder mapping, readiness assessments, and a Prosci ADKAR roadmap that ties every activity to a behaviour we can measure.",
      tag: "Prosci ADKAR",
      deliverables: ["Stakeholder map", "Readiness assessment", "Prosci ADKAR roadmap"],
    },
    {
      n: "02",
      slug: "communications",
      title: "Communications that get read",
      short: "Role-based messages that cut through inbox noise.",
      body: "Role-based, targeted communications that cut through inbox noise and tell each audience what is changing, when, and what to do about it.",
      tag: "Communications",
      deliverables: ["Role-based messages", "Audience by audience timing", "Clear calls to action"],
    },
    {
      n: "03",
      slug: "training",
      title: "Training and enablement",
      short: "From aware to proficient, on the tools people use every day.",
      body: "Hands-on training, floor walking, and champion networks that move teams from aware to proficient across Teams, SharePoint Online, OneDrive, and Copilot.",
      tag: "Enablement",
      deliverables: ["Hands-on training", "Floor walking", "Champion networks"],
    },
    {
      n: "04",
      slug: "technical-writing",
      title: "Technical writing and e-learning",
      short: "Job aids and modules a busy team can follow on its own.",
      body: "Job aids, e-learning modules, and self-serve learning portals that turn a complex process into something a busy team can follow on their own.",
      tag: "Technical writing",
      deliverables: ["Job aids", "E-learning modules", "Self-serve learning portals"],
    },
    {
      n: "05",
      slug: "ai-coaching",
      title: "AI coaching",
      short: "Copilot and ChatGPT, with people still making the calls.",
      body: "We coach teams to use Copilot and ChatGPT to produce clearer, better work faster, with people still making the judgment calls.",
      tag: "Copilot · ChatGPT",
      deliverables: ["Team coaching", "Copilot and ChatGPT practice", "Judgment stays with people"],
    },
    {
      n: "06",
      slug: "migration",
      title: "Migration and embedded change agents",
      short: "Moves off legacy systems that hold after we leave.",
      body: "Zero-downtime moves off legacy systems, with change agents embedded across directorates so adoption holds long after we step away.",
      tag: "Migration",
      deliverables: ["Zero-downtime moves", "Embedded change agents", "Adoption that holds"],
    },
  ] satisfies Service[],
  pairWithAdvanta: {
    heading: "Pair it with Advanta365",
    body: "Advanta365 is our change management and user adoption toolkit: 59 playbooks, 130 ready-to-use templates, field guides, and training materials. We use it inside our engagements, and your team can buy it for its own rollout.",
    cta: "Explore Advanta365",
  },
};
