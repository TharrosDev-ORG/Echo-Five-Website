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
  // scattered → ordered motif, no echo/sonar imagery.
  const dots: { x: number; y: number; r: number; c: string }[] = [];
  for (let i = 0; i < 90; i++) {
    const gx = i % 15;
    const gy = Math.floor(i / 15);
    const align = (gx / 14) * (gy / 5);
    const jitter = (1 - align) * 26;
    dots.push({
      x: 60 + gx * 78 + (Math.sin(i * 12.9) * jitter),
      y: 70 + gy * 95 + (Math.cos(i * 4.7) * jitter),
      r: 2 + align * 3.5,
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
          <svg width="1200" height="630" viewBox="0 0 1200 630">
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={0.5} />
            ))}
          </svg>
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
