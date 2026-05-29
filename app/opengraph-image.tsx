import { ImageResponse } from "next/og";

export const alt = "Echofive Solutions — Microsoft 365 change management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0a0d12";
const INK = "#eef1f4";
const SIGNAL = "#3fe08a";
const MUTED = "#7c8794";

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
          background: BG,
          color: INK,
          padding: 72,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Echo rings off the right edge */}
        {[520, 360, 220].map((d) => (
          <div
            key={d}
            style={{
              position: "absolute",
              top: 315 - d / 2,
              left: 1000 - d / 2,
              width: d,
              height: d,
              borderRadius: d,
              border: `1px solid ${SIGNAL}`,
              opacity: 0.3,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: 305,
            left: 990,
            width: 20,
            height: 20,
            borderRadius: 20,
            background: SIGNAL,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14, letterSpacing: 6, fontSize: 26, color: MUTED }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: SIGNAL }} />
          ECHO · FIVE
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.0, letterSpacing: -3 }}>
            Change that lands.
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: -3,
              color: SIGNAL,
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
