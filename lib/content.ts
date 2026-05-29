/**
 * All page copy and data. Keeping it here makes the marketing surface
 * editable without touching layout components.
 */

export const nav = [
  { label: "Approach", href: "#why" },
  { label: "Method", href: "#process" },
  { label: "Clients", href: "#clients" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: "Microsoft 365 change management",
  context: "Canadian public sector and enterprise",
  headline: ["Change that lands.", "Tools that get used."],
  sub: "We help government and enterprise organizations move to Microsoft 365 and actually adopt it. Strategy, communications, training, and technical writing, delivered end to end.",
  trust: [
    "20+ years",
    "Secret Level II cleared",
    "Prosci ADKAR",
    "Microsoft 365 Certified",
  ],
};

export const why = {
  index: "01",
  kicker: "Why rollouts stall",
  heading: "The software ships. The behaviour change doesn't.",
  body: "Most Microsoft 365 rollouts are run as IT projects with a training session bolted on at the end. The licences get paid for. The old habits stay. People route around the new tools, shadow systems creep back in, and the productivity that was promised never arrives. The technology was never the hard part. Getting thousands of people to work differently is.",
  failures: [
    {
      n: "A",
      title: "Adoption is treated as a launch day, not a programme.",
      body: "Go-live becomes the finish line. Nobody owns the months where habits actually change.",
    },
    {
      n: "B",
      title: "Communications are generic, so people tune them out.",
      body: "One all-staff email cannot tell a finance analyst and a field officer what changes for them.",
    },
    {
      n: "C",
      title: "Training ends before proficiency begins.",
      body: "A single session covers the buttons, not the workflow people return to on a busy Tuesday.",
    },
  ],
  close: "We work the other side of the deployment: the people.",
};

export const services = {
  index: "02",
  kicker: "Where we shine",
  heading: "Adoption, run as a programme.",
  intro:
    "We bridge strategy and execution: the roadmap and the floor walking, the comms plan and the job aid. Every engagement is built to move a measurable behaviour, not to tick a project box.",
  platforms: [
    "SharePoint Online",
    "Microsoft Teams",
    "Microsoft Copilot",
    "OneDrive",
    "Microsoft Purview",
  ],
  items: [
    {
      n: "01",
      title: "Adoption strategy & roadmaps",
      body: "We build the adoption plan before the migration starts: stakeholder mapping, readiness assessments, and a Prosci ADKAR roadmap that ties every activity to a behaviour we can measure.",
      tag: "Prosci ADKAR",
    },
    {
      n: "02",
      title: "Communications that get read",
      body: "Role-based, targeted communications that cut through inbox noise and tell each audience what is changing, when, and what to do about it.",
      tag: "Comms strategy",
    },
    {
      n: "03",
      title: "Training & enablement",
      body: "Hands-on training, floor walking, and champion networks that move teams from aware to proficient across Teams, SharePoint Online, OneDrive, and Copilot.",
      tag: "Enablement",
    },
    {
      n: "04",
      title: "Technical writing & e-learning",
      body: "Job aids, e-learning modules, and self-serve learning portals that turn a complex process into something a busy team can follow on their own.",
      tag: "Technical writing",
    },
    {
      n: "05",
      title: "AI coaching",
      body: "We coach teams to use Copilot and ChatGPT as a thinking companion: faster, clearer, higher-quality deliverables, with human judgment kept firmly in the loop.",
      tag: "Copilot · ChatGPT",
    },
    {
      n: "06",
      title: "Migration & embedded change agents",
      body: "Zero-downtime moves off legacy systems, with change agents embedded across directorates so adoption holds long after we step away.",
      tag: "Migration",
    },
  ],
};

export const process = {
  index: "03",
  kicker: "How adoption happens",
  heading: "Adoption is a sequence, not a switch.",
  intro:
    "We run every engagement on the Prosci ADKAR model. Change lands only when each person moves through five states, in order. Miss one and the rollout stalls right there.",
  stages: [
    {
      key: "A",
      name: "Awareness",
      body: "People understand why the change is happening, in their own terms.",
    },
    {
      key: "D",
      name: "Desire",
      body: "They have a reason to take part, not just a mandate from above.",
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

export const clients = {
  index: "04",
  kicker: "Selected clients",
  heading: "Trusted across government and enterprise.",
  intro:
    "Two decades of department-wide rollouts, from national security to Crown corporations to the private sector.",
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

export const proof = {
  index: "05",
  kicker: "On the record",
  heading: "Building the Plane While Flying It",
  sub: "Shared Services Canada Microsoft 365 user adoption during COVID-19, presented to the Government of Canada M365 Council.",
  cta: "Watch the talk",
};

export const method = {
  index: "06",
  kicker: "How we make it measurable",
  heading: "Adoption you can see, not just hope for.",
  body: "We deliver with Advanta365, a Microsoft 365 adoption and governance platform that gives every programme structure: guided learning pathways, adoption analytics, and governance guardrails in one place. It means our clients watch adoption move week to week, instead of waiting for a survey that arrives too late to act on.",
  cta: "Visit Advanta365",
};

export const credentials = {
  index: "07",
  kicker: "Credentials",
  heading: "Certified, cleared, and accountable.",
  intro:
    "The qualifications our work is built on. Held to the standard a public-sector engagement demands.",
  items: [
    {
      title: "Prosci ADKAR Change Management",
      detail: "Certified 2009 and 2016",
      issuer: "Prosci",
    },
    {
      title: "Microsoft 365 Certified: Fundamentals",
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
  kicker: "The firm",
  heading: ["Twenty years.", "One job.", "Done properly."],
  body: [
    "Echofive Solutions is a senior change management practice built around one specialty: helping organizations actually adopt Microsoft 365.",
    "We bring more than twenty years of moving federal and enterprise teams off legacy systems and onto Teams, SharePoint Online, Copilot, and OneDrive, with the strategy, communications, training, and technical writing that make the change stick. Prosci aligned, Microsoft certified, Secret Level II cleared.",
    "Small enough to stay accountable. Experienced enough to run a department-wide rollout from first roadmap to embedded change agent.",
  ],
};

export const principal = {
  monogram: "MA",
  name: "Mark Abdelnour",
  role: "Founder and Lead Consultant",
  bio: "Mark founded Echofive after twenty years leading Microsoft 365 change and adoption across the Government of Canada and major enterprises. He is Prosci ADKAR certified, Microsoft 365 certified, and holds Secret Level II clearance. When you write to Echofive, your note reaches him directly, not a sales desk.",
  credentials: "Prosci ADKAR · Microsoft 365 Certified · Secret Level II",
};

export const contact = {
  index: "08",
  kicker: "Start a conversation",
  heading: "Tell us what you are rolling out.",
  body: "Whether you are scoping a migration or trying to rescue an adoption that has stalled, we will tell you straight whether we can help. No pitch theatre.",
  cta: "Book a conversation",
  note: "Your message goes straight to Mark Abdelnour, founder. No intake form, no gatekeeping.",
};

export const footer = {
  disclaimer:
    "Microsoft 365, Teams, SharePoint, Copilot, and OneDrive are trademarks of Microsoft Corporation. Echofive Solutions is an independent consultancy and is not affiliated with Microsoft or Prosci.",
};
