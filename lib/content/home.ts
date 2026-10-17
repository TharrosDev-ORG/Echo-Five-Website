/** Home page copy. Sections reuse data from the other content modules. */
import { site } from "@/lib/site";

export const hero = {
  context: "Microsoft 365 change management",
  region: "For Canadian public sector and enterprise",
  /** The highlighted word is wrapped in <Mark> by the component. */
  headline: { before: "Change that", mark: "lands.", second: "Tools that get used." },
  sub: "We help government and enterprise organizations move to Microsoft 365 and actually adopt it. Strategy, communications, training, and technical writing, delivered end to end.",
  cta: { primary: "Start a conversation", secondary: "How we work" },
  scroll: "Scroll",
};

export const proofIntro = {
  index: "Credentials",
  heading: "Thirty years. One job. Done properly.",
};

export const homeMeta = {
  title: `${site.name} · Microsoft 365 change management`,
  description: site.description,
};
