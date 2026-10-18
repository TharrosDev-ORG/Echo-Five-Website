import { site } from "@/lib/site";
import { pages } from "@/lib/content/pages";
import { renderOgCard } from "@/lib/og";

const page = pages.about;

export const dynamic = "force-static";
export const alt = `${site.name}: ${page.heading.join(" ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgCard({ eyebrow: page.index, lines: page.heading, mark: "properly." });
}
