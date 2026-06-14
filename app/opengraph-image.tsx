import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f3efe7";
const INK = "#15110c";
const COBALT = "#2540ff";
const MUTED = "#6b6358";

export default function OgImage() {
  // A light field of dots that "aligns" toward the lower right — the
  // scattered → ordered motif, no echo/sonar imagery. Rendered as divs so
  // Satori (next/og) draws it reliably.
  const dots: { x: number; y: number; s: number; c: string }[] = [];
  for (let i = 0; i < 84; i++) {
    const gx = i % 14;
    const gy = Math.floor(i / 14);
    const align = (gx / 13) * (gy / 5);
    const jitter = (1 - align) * 24;
    dots.push({
      x: 56 + gx * 82 + Math.sin(i * 12.9) * jitter,
      y: 64 + gy * 104 + Math.cos(i * 4.7) * jitter,
      s: 4 + align * 7,
      c: align > 0.55 ? COBALT : MUTED,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: 72,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          {dots.map((d, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: d.x,
                top: d.y,
                width: d.s,
                height: d.s,
                borderRadius: d.s,
                background: d.c,
                opacity: 0.5,
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: COBALT }} />
          <div style={{ fontSize: 26, letterSpacing: 4, color: MUTED, fontWeight: 600 }}>
            ECHOFIVE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6, position: "relative" }}>
          <div style={{ fontSize: 92, fontWeight: 800, color: INK, lineHeight: 1.0, letterSpacing: -3 }}>
            Change that lands.
          </div>
          <div style={{ fontSize: 92, fontWeight: 800, color: COBALT, lineHeight: 1.0, letterSpacing: -3 }}>
            Tools that get used.
          </div>
          <div style={{ fontSize: 28, color: MUTED, marginTop: 22 }}>
            Microsoft 365 change management · Canadian public sector and enterprise
          </div>
        </div>
      </div>
    ),
    size,
  );
}
