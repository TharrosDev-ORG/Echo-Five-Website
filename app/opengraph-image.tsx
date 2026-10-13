import { ImageResponse } from "next/og";
import { hero, ogImage } from "@/lib/content";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SPRUCE = "#0F2B26";
const SPRUCE_2 = "#173832";
const PAPER = "#F6F8F7";
const MUTED = "#B9C7C2";
const CITRON = "#D9F26B";

const BARS = [6, 9, 12, 15, 18];

export default function OgImage() {
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
          background: `radial-gradient(ellipse 60% 70% at 92% 0%, rgba(217,242,107,0.16), transparent 70%), ${SPRUCE}`,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 5,
              width: 64,
              height: 64,
              padding: "0 12px 14px",
              borderRadius: 16,
              background: SPRUCE_2,
              border: "2px solid rgba(246,248,247,0.16)",
            }}
          >
            {BARS.map((h, i) => (
              <div
                key={h}
                style={{
                  width: 6,
                  height: h * 2,
                  borderRadius: 3,
                  background: i === BARS.length - 1 ? CITRON : PAPER,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: PAPER, letterSpacing: -1 }}>
            {site.shortName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, color: PAPER, lineHeight: 1.02, letterSpacing: -3 }}>
            {hero.headline[0]}
          </div>
          <div style={{ fontSize: 88, fontWeight: 700, color: CITRON, lineHeight: 1.02, letterSpacing: -3 }}>
            {hero.headline[1]}
          </div>
          <div style={{ fontSize: 28, color: PAPER, marginTop: 40, maxWidth: 960, lineHeight: 1.35 }}>
            {hero.context}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: MUTED, marginTop: 14 }}>
            {ogImage.credentials.join(" · ")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
