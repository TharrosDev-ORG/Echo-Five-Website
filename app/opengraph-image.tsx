import { site } from "@/lib/site";
import { hero } from "@/lib/content/home";
import { renderOgCard } from "@/lib/og";

// The site-wide share card. Inner pages with their own heading have their own
// opengraph-image route; the rest (privacy, accessibility) inherit this one.
export const dynamic = "force-static";
export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const { before, mark, second } = hero.headline;
  return renderOgCard({
    eyebrow: "Microsoft 365 change management",
    lines: [`${before} ${mark}`, second],
    mark,
  });
}
