import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NIGHT = "#0c1628";
const PAPER = "#f9fafc";
const MUTED = "#b7becb";
const ACCENT = "#f77b5a";

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
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: PAPER, fontWeight: 800 }}>
          Echofive
          <span style={{ color: MUTED, fontWeight: 500, marginLeft: 10 }}>Solutions</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, color: PAPER, lineHeight: 1.05, letterSpacing: -2 }}>
            Change that lands.
          </div>
          <div style={{ fontSize: 84, fontWeight: 800, color: PAPER, lineHeight: 1.05, letterSpacing: -2 }}>
            Tools that get used.
          </div>
          <div style={{ width: 96, height: 6, background: ACCENT, marginTop: 36 }} />
          <div style={{ fontSize: 30, color: MUTED, marginTop: 28 }}>
            Microsoft 365 change management for Canadian public sector and enterprise
          </div>
        </div>
      </div>
    ),
    size,
  );
}
