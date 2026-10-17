import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand hexes (the OG renderer cannot read CSS variables). See DESIGN.md.
const PAPER = "#FFFFFF";
const INK = "#0B0D12";
const FG_3 = "#5B6173";
const BLUE = "#2348F5";
const MARK = "#86C1FF";

const CREDENTIALS = ["30+ years", "Prosci ADKAR certified", "Secret Level II cleared"];

/** The five-bar mark from components/ui/Logo, at 3x its 24px viewBox. */
const BARS = [
  { x: 1, y: 15 },
  { x: 5.75, y: 12 },
  { x: 10.5, y: 9 },
  { x: 15.25, y: 6 },
  { x: 20, y: 3 },
];

const font = (file: string) => readFile(join(process.cwd(), "app/fonts/og", file));

export default async function OgImage() {
  const [newsreader, geistSemi, geistMono] = await Promise.all([
    font("Newsreader-Regular.ttf"),
    font("Geist-SemiBold.ttf"),
    font("GeistMono-Regular.ttf"),
  ]);

  const S = 3;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px 60px",
          background: PAPER,
          color: INK,
        }}
      >
        {/* Masthead */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex", position: "relative", width: 24 * S, height: 24 * S }}>
              {BARS.map((b, i) => (
                <div
                  key={b.x}
                  style={{
                    position: "absolute",
                    left: b.x * S,
                    top: b.y * S,
                    width: 3 * S,
                    height: (21 - b.y) * S,
                    borderRadius: S,
                    background: i === BARS.length - 1 ? BLUE : INK,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Geist",
                fontWeight: 600,
                fontSize: 50,
                letterSpacing: -1.4,
              }}
            >
              {site.shortName}
            </div>
          </div>
          <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 22, color: FG_3 }}>
            {"Microsoft\u00a0365 change management"}
          </div>
        </div>

        {/* The line */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Newsreader",
            fontSize: 118,
            lineHeight: 1,
            letterSpacing: -4,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span>Change that</span>
            <div style={{ display: "flex", position: "relative", marginLeft: 30 }}>
              <div
                style={{
                  position: "absolute",
                  left: -6,
                  right: -8,
                  top: 30,
                  height: 84,
                  background: MARK,
                }}
              />
              <span>lands.</span>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 6 }}>Tools that get used.</div>
        </div>

        {/* Credentials */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${INK}`,
            paddingTop: 22,
            fontFamily: "Geist Mono",
            fontSize: 21,
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            {CREDENTIALS.map((c, i) => (
              <div key={c} style={{ display: "flex", gap: 14 }}>
                {i > 0 && <span style={{ color: FG_3 }}>·</span>}
                <span>{c}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexShrink: 0, color: BLUE }}>{new URL(site.url).host}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: newsreader, weight: 400, style: "normal" },
        { name: "Geist", data: geistSemi, weight: 600, style: "normal" },
        { name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
      ],
    },
  );
}
