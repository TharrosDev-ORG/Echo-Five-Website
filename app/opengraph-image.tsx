import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, ogImage } from "@/lib/content";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BLACK = "#0A0A0B";
const WHITE = "#FFFFFF";
const BLUE = "#2F5BFF";
const BLUE_L = "#6E8CFF";
const DISPLAY = "Bricolage Grotesque";
const MUTED = "#A1A1AA";

/** The mark at 2x its 32px viewBox: five 6px bars, 4px apart, widths top to bottom. */
const BAR_WIDTHS = [48, 38, 28, 18, 8];

export default async function OgImage() {
  const bricolageBold = await readFile(join(process.cwd(), "app/fonts/BricolageGrotesque-Bold-latin.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: BLACK,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 48 }}>
            {BAR_WIDTHS.map((w) => (
              <div key={w} style={{ width: w, height: 6, borderRadius: 3, background: BLUE }} />
            ))}
          </div>
          <div style={{ display: "flex", fontFamily: DISPLAY, fontSize: 40, fontWeight: 700, color: WHITE, letterSpacing: -1 }}>
            {site.shortName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 88, fontWeight: 700, color: WHITE, lineHeight: 1.02, letterSpacing: -3 }}>
            {hero.headline[0]}
          </div>
          <div style={{ fontFamily: DISPLAY, fontSize: 88, fontWeight: 700, color: BLUE_L, lineHeight: 1.02, letterSpacing: -3 }}>
            {hero.headline[1]}
          </div>
          <div style={{ fontSize: 28, color: WHITE, marginTop: 40, maxWidth: 960, lineHeight: 1.35 }}>
            {hero.context}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: MUTED, marginTop: 14 }}>
            {ogImage.credentials.join(" · ")}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: DISPLAY, data: bricolageBold, weight: 700, style: "normal" }] },
  );
}
