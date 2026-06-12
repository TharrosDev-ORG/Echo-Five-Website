import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0c1018";
const SIGNAL = "#7fd4f2";
const INK = "#f2f4f8";
const MUTED = "#8b95a7";

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
          background: BG,
          padding: 72,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Echo rings */}
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -160,
            width: 640,
            height: 640,
            borderRadius: 9999,
            border: `2px solid ${SIGNAL}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 440,
              height: 440,
              borderRadius: 9999,
              border: `2px solid ${SIGNAL}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 250,
                height: 250,
                borderRadius: 9999,
                border: `2px solid ${SIGNAL}99`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: 9999, background: SIGNAL }} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 12, height: 12, borderRadius: 9999, background: SIGNAL }} />
          <div style={{ fontSize: 26, letterSpacing: 6, color: MUTED }}>ECHO·FIVE</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 84, fontWeight: 700, color: INK, lineHeight: 1.02, letterSpacing: -2 }}>
            Change that lands.
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, color: SIGNAL, lineHeight: 1.02, letterSpacing: -2 }}>
            Tools that get used.
          </div>
          <div style={{ fontSize: 30, color: MUTED, marginTop: 16 }}>
            Microsoft 365 change management · Canadian public sector and enterprise
          </div>
        </div>
      </div>
    ),
    size,
  );
}
