import { site } from "@/lib/site";
import { pages } from "@/lib/content/pages";
import { advanta } from "@/lib/content/advanta";
import { renderOgCard } from "@/lib/og";

const page = pages.advanta365;

export const dynamic = "force-static";
export const alt = `${advanta.name} by ${site.shortName}: ${page.heading.join(" ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The heading never names the product, so the masthead and footer do. */
export default function OgImage() {
  return renderOgCard({
    eyebrow: `${advanta.name} · ${advanta.byline}`,
    lines: page.heading,
    mark: "blank page.",
    footer: advanta.counts.slice(0, 3).map((c) => `${c.value} ${c.label.toLowerCase()}`),
  });
}
