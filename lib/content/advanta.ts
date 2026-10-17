/**
 * Advanta365, a product of Echofive. Facts are taken from advanta365.com and
 * its source (2026-10-17): counts from TOOLKIT, phases from content/phases.ts,
 * free samples from the templates marked free.
 *
 * Rules: Advanta365 is a document toolkit. Never describe it as a platform that
 * tracks, monitors, or enforces anything. Never publish the price on this site. Prosci
 * describes the practitioner, never the product.
 */
import { site } from "@/lib/site";

export const advanta = {
  name: "Advanta365",
  byline: "A product of Echofive",
  tagline: "Don’t start from a blank prompt.",
  description:
    "The change management and user adoption toolkit behind real SharePoint Online rollouts.",
  promise: "Ready to use as is, or tailor with AI.",
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
  contentsHeading: "What’s inside",
  contents: [
    {
      title: "59 playbooks",
      body: "Covering all eleven phases of a rollout, from defining the change to making it stick.",
    },
    {
      title: "130 ready-to-use templates",
      body: "Emails, plans, checklists, worksheets, and workshop kits.",
    },
    {
      title: "4 field guides",
      body: "For change practitioners and IM partners.",
    },
    {
      title: "Training for three audiences",
      body: "End users, Site Owners, and IM Representatives, with facilitator guides, learning guides, and 58 job aids.",
    },
    {
      title: "A complete worked example",
      body: "A full change management strategy for a 10,000-person organization.",
    },
    {
      title: "Copilot-ready guides",
      body: "Readiness, rollout, and impact assessment for Microsoft 365 Copilot.",
    },
  ],
  formatsHeading: "Files in four formats",
  formats: ["DOCX", "PPTX", "XLSX", "PDF"],
  phasesHeading: "Eleven phases, in rollout order",
  phasesIntro:
    "The toolkit follows a rollout from start to finish, so you can find what you need by the phase you are on.",
  phases: [
    "Define the change",
    "Assess the impact",
    "Set the strategy",
    "Engage leaders",
    "Plan communications",
    "Design the platform",
    "Plan the training",
    "Build the training",
    "Deliver training",
    "Go live and support",
    "Make it stick",
  ],
  freeSamplesHeading: "Try it first: six free samples",
  freeSamplesIntro: "One finished template from each of six phases. Open them before you buy.",
  freeSamples: [
    { title: "Change Management Strategy", format: "DOCX", phase: "Set the strategy" },
    {
      title: "Executive Sponsor Kickoff Deck",
      format: "PPTX",
      phase: "Engage leaders",
      detail: "16 slides",
    },
    { title: "Master Communications Plan", format: "XLSX", phase: "Plan communications" },
    { title: "SharePoint Governance Framework", format: "DOCX", phase: "Design the platform" },
    {
      // The word joiner (U+2060) keeps "End-User" from breaking at the hyphen.
      title: "SharePoint End-⁠User Training Deck",
      format: "PPTX",
      phase: "Build the training",
      detail: "A 60-minute instructor-led session",
    },
    { title: "Go/No-Go Decision Checklist", format: "XLSX", phase: "Go live and support" },
  ] as { title: string; format: string; phase: string; detail?: string }[],
  purchase: {
    heading: "One purchase. The whole toolkit.",
    note: "Includes every playbook, template, field guide, and job aid.",
    includes: [
      "59 playbooks covering all eleven phases",
      "130 ready-to-use templates",
      "4 field guides for change practitioners and IM partners",
      "Training for three audiences, with 58 job aids",
      "A complete worked example for a 10,000-person organization",
      "Copilot-ready guides for Microsoft 365 Copilot",
      "DOCX, PPTX, XLSX, and PDF formats",
    ],
  },
  cta: {
    purchase: "Get the toolkit",
    samples: "See the free samples",
    explore: "Explore Advanta365",
    visit: "Visit advanta365.com",
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
    index: "Our product",
    heading: ["The toolkit behind", "real rollouts."],
    body: "Advanta365 is the change management and user adoption toolkit behind real SharePoint Online rollouts. It is what we built, delivered, revised, and delivered again with real clients. Ready to use as is, or tailor with AI.",
  },
  relationship: {
    heading: "Echofive uses Advanta365 inside our engagements",
    body: "If you want help running your rollout, start a conversation with us. We will tell you plainly whether we can help.",
    cta: "Start a conversation",
  },
  disclaimer:
    "Advanta365 and Echofive are independent and not affiliated with or endorsed by Prosci Inc. or Microsoft Corporation.",
  /** Section copy for the /advanta365 page. Facts only from the fields above. */
  page: {
    heroAside: "Sold at advanta365.com",
    deskLabel: "Untitled",
    countsIndex: "In the box",
    countsHeading: "A rollout’s worth of documents, ready to use.",
    countNotes: [
      "Covering all eleven phases of a rollout",
      "Emails, plans, checklists, worksheets, and workshop kits",
      "For change practitioners and IM partners",
      "For End users, Site Owners, and IM Representatives",
    ],
    contentsIndex: "Contents",
    contentsLead:
      "Playbooks, templates, field guides, and training from real SharePoint Online rollouts. Use them as they are, or tailor them with AI.",
    phasesIndex: "Rollout order",
    phasesExhibitTitle: "From defining the change to making it stick",
    phasesExhibitNote:
      "Illustrative. Phases marked Sample include one of the six free templates.",
    phasesListLabel: "The eleven phases of a rollout, in order",
    sampleTag: "Sample",
    sampleTagSr: "free sample available",
    formatsIndex: "Formats",
    formatsLead:
      "Open and edit them in the Microsoft\u00a0365 apps your teams already use.",
    formatKinds: { DOCX: "Documents", PPTX: "Slide decks", XLSX: "Workbooks", PDF: "Portable documents" } as Record<string, string>,
    formatSamplesLabel: "Free samples",
    samplesIndex: "Free samples",
    sampleLinkLabel: "Free sample",
    sampleLinkSr: "on advanta365.com",
    sampleMeta: { format: "Format", phase: "Phase", detail: "Detail" },
    provenanceHeading: "Where it comes from",
    purchaseIndex: "The toolkit",
    purchaseAside: "Sold at advanta365.com",
    relationshipIndex: "Echofive",
    relationshipLine: "Echofive uses Advanta365 inside our engagements.",
    relationshipLink: "See our approach",
  },
};
