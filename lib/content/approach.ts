/**
 * The problem we solve and how we work: why rollouts stall, the Prosci ADKAR
 * model, and how an engagement runs. Used on Home and /approach.
 */

export const why = {
  index: "The problem",
  heading: "Why Microsoft 365 rollouts stall",
  body: "Most Microsoft 365 rollouts are run as IT projects with a training session bolted on at the end. The licences get paid for. The old habits stay. People route around the new tools, shadow systems creep back in, and the productivity that was promised never arrives.",
  pull: "The technology was never the hard part. Getting thousands of people to work differently is.",
  failures: [
    {
      n: "01",
      title: "Go-live is treated as the finish line.",
      body: "Nobody owns the months after launch, which is when habits actually change.",
    },
    {
      n: "02",
      title: "Communications are generic, so people tune them out.",
      body: "One all-staff email cannot tell a finance analyst and a field officer what changes for them.",
    },
    {
      n: "03",
      title: "Training stops before people are proficient.",
      body: "A single session shows where the buttons are. It does not cover the workflow people come back to on a busy Tuesday.",
    },
  ],
  close: "That is the part of a deployment we work on: the people.",
};

/**
 * Exhibit 01: the adoption gap. An illustrative diagram, not data: it shows
 * the shape of the problem described in `why`, and its note says so.
 */
export const adoptionGap = {
  title: "The adoption gap",
  note: "Illustrative. The shape of use after go-live, with and without a plan for the people.",
  axis: ["Announce", "Go-live", "90 days", "6 months", "1 year"],
  yLabel: "Use of the new tools",
  without: "Run as an IT project",
  with: "Run with change management",
  gap: "The adoption gap",
  golive: "Go-live",
  /** Text alternative for the whole figure. */
  alt: "A line chart, illustrative only. Both lines rise toward go-live. After go-live, the line for a rollout run as an IT project falls back and flattens low, while the line for a rollout run with change management keeps rising and holds. The space between them is labelled the adoption gap.",
};

/** The Prosci ADKAR model. Stage names spell the acronym. */
export const adkar = {
  index: "Method",
  heading: "How adoption happens",
  intro:
    "We run every engagement on the Prosci ADKAR model. Each person has to move through five stages in order, and a rollout stalls at whichever stage gets skipped.",
  cta: "See how we work",
  stagesLabel: "The five Prosci ADKAR stages, in order",
  exhibitTitle: "Five stages, in order",
  exhibitNote: "Prosci ADKAR. A rollout stalls at whichever stage gets skipped.",
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

/** How an engagement runs. Built only from the service descriptions. */
export const engagement = {
  index: "Engagement",
  heading: "How an engagement runs",
  intro: "Each engagement is aimed at a specific behaviour we can measure.",
  steps: [
    {
      n: "01",
      title: "Strategy",
      body: "We build the adoption plan before the migration starts: stakeholder mapping, readiness assessments, and a Prosci ADKAR roadmap.",
    },
    {
      n: "02",
      title: "Communications",
      body: "Role-based, targeted communications tell each audience what is changing, when, and what to do about it.",
    },
    {
      n: "03",
      title: "Training",
      body: "Hands-on training, floor walking, and champion networks move teams from aware to proficient.",
    },
    {
      n: "04",
      title: "Reinforcement",
      body: "Job aids, self-serve learning, and change agents embedded across directorates keep adoption holding long after we step away.",
    },
  ],
};

/**
 * /approach only: the jump nav, section labels, and the captions for the
 * page's three exhibits. Built only from the content above and from
 * services.pairWithAdvanta (Advanta365 counts are the published ones).
 */
export const approachPage = {
  contentsLabel: "On this page",
  contents: [
    { n: "01", href: "#problem", label: "Why rollouts stall" },
    { n: "02", href: "#method", label: "The method" },
    { n: "03", href: "#engagement", label: "How an engagement runs" },
    { n: "04", href: "#talk-heading", label: "On the record" },
  ],
  problem: {
    /** `why.heading` split into display lines (non-breaking space kept). */
    headingLines: ["Why Microsoft 365", "rollouts stall"],
    /** `why.pull`, split so the highlighter sits on the second sentence. */
    pullBefore: "The technology was never the hard part.",
    pullMark: "Getting thousands of people to work differently is.",
    failuresLabel: "Where it breaks",
    closeHref: "#method",
  },
  method: {
    /** Shown in the stage display before it starts tracking the reader. */
    complete: "Awareness to reinforcement",
    stage: "Stage",
    of: "of",
    model: "Prosci ADKAR",
  },
  engagement: {
    exhibitTitle: "Four steps, in order",
    exhibitNote: "Illustrative. The order the work runs in, from the plan to the habit.",
    toolkit: {
      label: "Inside our engagements",
      body: "We use Advanta365, our change management and user adoption toolkit, inside our engagements: 59 playbooks, 130 ready-to-use templates, field guides, and training materials.",
      cta: "Explore Advanta365",
      href: "/advanta365",
    },
  },
};
