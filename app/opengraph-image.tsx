import { ImageResponse } from "next/og";

export const alt = "Echofive Solutions — Microsoft 365 change management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#18140f";
const PAPER = "#f7f3ec";
const AMBER = "#f2a83c";
const MUTED = "#b7ad9c";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: PAPER,
          padding: 72,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Echo rings */}
        {[520, 360, 220].map((d) => (
          <div
            key={d}
            style={{
              position: "absolute",
              top: 315 - d / 2,
              left: 980 - d / 2,
              width: d,
              height: d,
              borderRadius: d,
              border: `1px solid ${AMBER}`,
              opacity: 0.28,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: 305,
            left: 970,
            width: 20,
            height: 20,
            borderRadius: 20,
            background: AMBER,
          }}
        />

        <div style={{ display: "flex", letterSpacing: 6, fontSize: 26, color: MUTED }}>
          ECHO · FIVE
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 82, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            Change that lands.
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: AMBER,
            }}
          >
            Tools that get used.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: MUTED }}>
          Microsoft 365 change management · Canadian public sector and enterprise
        </div>
      </div>
    ),
    { ...size },
  );
}
