/**
 * About page copy. The hero (heading, lead, SEO) lives in `pages.about`;
 * clients, credentials, proof, and the founder live in `shared.ts`.
 *
 * Every line here restates the firm's published facts. No new claims.
 * "Microsoft 365" uses a non-breaking space in visible copy.
 */

/** Jump links under the hero. Anchors match the section ids on the page. */
export const aboutNav = [
  { n: "01", label: "The firm", href: "#firm" },
  { n: "02", label: "Founder", href: "#founder" },
  { n: "03", label: "Credentials", href: "#credentials" },
  { n: "04", label: "Clients", href: "#clients" },
] as const;

export const aboutNavLabel = "On this page";

/**
 * The firm story. The hero lead already carries the first paragraph
 * ("a senior change management practice built around one specialty"),
 * so the spread continues from the second.
 */
export const firm = {
  index: "The firm",
  heading: ["A small, senior practice", "with one specialty."],
  body: [
    "We bring more than thirty years of moving federal and enterprise teams off legacy systems. Today that means Teams, SharePoint Online, Copilot, and OneDrive, with the strategy, communications, training, and technical writing that make the change stick. Prosci aligned, Microsoft certified, Secret Level II cleared.",
    "The firm is small enough to stay accountable and experienced enough to run a department-wide rollout, from the first roadmap to embedded change agents.",
  ],
  /** A fact sheet restating the paragraphs above, for scanning. */
  factsLabel: "The firm at a glance",
  facts: [
    { term: "Specialty", detail: "Microsoft 365 adoption" },
    { term: "Platforms", detail: "Teams, SharePoint Online, Copilot, OneDrive" },
    { term: "Disciplines", detail: "Strategy, communications, training, technical writing" },
    { term: "Standing", detail: "Prosci aligned, Microsoft certified, Secret Level II cleared" },
    { term: "Scope", detail: "From the first roadmap to embedded change agents" },
    { term: "Practice", detail: "More than thirty years, federal and enterprise" },
  ],
};

export const founder = {
  index: "Founder",
  /** Caption under the typographic portrait. */
  contactLink: "Write to the firm",
  credentialsLabel: "Credentials held",
};

export const credentialsSection = {
  index: "Credentials",
  heading: ["Certified, cleared,", "and on the record."],
  /** Column headers for the ledger. */
  columns: { title: "Credential", issuer: "Issued by", detail: "Detail" },
  /** Which `proof` entries to set as giant numerals (by `mark`). */
  numerals: ["30+", "II"],
};

export const clientsSection = {
  index: "Clients",
  heading: "The client list, in full.",
  countLabel: "named clients",
  countNote: "Across federal departments, Crown corporations, and enterprise.",
  groupSuffix: "clients",
};
