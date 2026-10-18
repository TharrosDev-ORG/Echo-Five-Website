import { site } from "@/lib/site";
import { pages } from "@/lib/content/pages";
import { legalHeadings } from "@/lib/content/legal";
import { renderOgCard } from "@/lib/og";

const page = pages.accessibility;
const { lines, last } = legalHeadings.accessibility;
const heading = [...lines, [last.before, last.mark, last.after].filter(Boolean).join(" ")];

export const dynamic = "force-static";
export const alt = `${site.name}: ${heading.join(" ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgCard({ eyebrow: page.index, lines: heading, mark: last.mark });
}
