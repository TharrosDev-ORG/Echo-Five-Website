import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NIGHT = "#0c1628";
const PAPER = "#f9fafc";
const MUTED = "#b7becb";
const ACCENT = "#f77b5a";
const LINE = "rgba(249,250,252,0.12)";

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
          background: NIGHT,
          padding: 72,
          fontFamily: "sans-serif",
          backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "#162137",
              color: PAPER,
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            E<span style={{ color: ACCENT }}>5</span>
          </div>
          <div style={{ display: "flex", fontSize: 32, color: PAPER, fontWeight: 800, letterSpacing: -1 }}>
            Echo<span style={{ color: ACCENT }}>five</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 800, color: PAPER, lineHeight: 1.02, letterSpacing: -3 }}>
            Change that lands.
          </div>
          <div style={{ fontSize: 88, fontWeight: 800, color: ACCENT, lineHeight: 1.02, letterSpacing: -3 }}>
            Tools that get used.
          </div>
          <div style={{ fontSize: 28, color: MUTED, marginTop: 28 }}>
            Microsoft 365 change management · Canadian public sector and enterprise
          </div>
        </div>
      </div>
    ),
    size,
  );
}
