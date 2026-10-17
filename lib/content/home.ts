/** Home page copy. Sections reuse data from the other content modules. */
import { site } from "@/lib/site";

export const hero = {
  context: "Microsoft\u00A0365 change management for Canadian public sector and enterprise",
  credentials: ["30+ years", "Secret Level II cleared", "Prosci ADKAR certified"],
  /** The highlighted word is wrapped in <Mark> by the component. */
  headline: { before: "Change that", mark: "lands.", second: "Tools that get used." },
  sub: "We help government and enterprise organizations move to Microsoft 365 and actually adopt it. Strategy, communications, training, and technical writing, delivered end to end.",
  cta: { primary: "Start a conversation", secondary: "How we work" },
  scroll: "Scroll",
};

export const proofIntro = {
  index: "Credentials",
  heading: "The credentials a federal rollout asks for.",
};

/** The first-fold line of named clients under the hero actions. */
export const heroClients = {
  label: "Selected clients",
  shorts: ["DND", "SSC", "TBS", "ESDC", "CDIC", "EDC", "TTC"],
  link: "See all",
};

export const homeMeta = {
  title: `${site.name} · Microsoft 365 change management`,
  description: site.description,
};
