import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { hero } from "@/lib/content/home";

/**
 * The share card behind every opengraph-image route: masthead, a Newsreader
 * statement with the highlighter on one phrase, and a mono footer line.
 * Route files keep their own literal `alt`, `size`, `contentType` and
 * `dynamic` exports; this module only draws.
 */
export const ogSize = { width: 1200, height: 630 };

// Brand hexes (the OG renderer cannot read CSS variables). See DESIGN.md.
const PAPER = "#FFFFFF";
const INK = "#0B0D12";
const FG_3 = "#5B6173";
const BLUE = "#2348F5";
const MARK = "#86C1FF";

/** The five-bar mark from components/ui/Logo, drawn at 3x its 24px viewBox. */
const BARS = [
  { x: 1, y: 15 },
  { x: 5.75, y: 12 },
  { x: 10.5, y: 9 },
  { x: 15.25, y: 6 },
  { x: 20, y: 3 },
];

const font = (file: string) => readFile(join(process.cwd(), "app/fonts/og", file));

export type OgCard = {
  /** Mono label at the top right. */
  eyebrow: string;
  /** The statement, one entry per line. */
  lines: readonly string[];
  /** A phrase within one of the lines; it gets the highlighter. */
  mark?: string;
  /** Mono items on the footer rule. Defaults to the hero credentials. */
  footer?: readonly string[];
};

/**
 * Size the statement to the card: 118px for the home line, smaller when a
 * line runs long or there are three lines. Newsreader averages about 0.42em
 * per character, and the text column is 1040px wide.
 */
function statementSize(lines: readonly string[]) {
  const longest = Math.max(...lines.map((l) => l.length));
  const byWidth = Math.floor(1000 / (0.42 * longest));
  const byHeight = lines.length > 2 ? 92 : 118;
  return Math.min(byWidth, byHeight);
}

/** One statement line; if it contains `mark`, that phrase sits on the highlighter. */
function Line({ text, mark, size }: { text: string; mark?: string; size: number }) {
  const at = mark ? text.indexOf(mark) : -1;
  if (!mark || at < 0) return <div style={{ display: "flex" }}>{text}</div>;
  const before = text.slice(0, at).trimEnd();
  const after = text.slice(at + mark.length).trimStart();
  // Satori drops spaces at span edges, so word gaps are margins (about one space).
  const gap = size * 0.25;
  return (
    <div style={{ display: "flex", alignItems: "baseline" }}>
      {before && <span>{before}</span>}
      <div style={{ display: "flex", position: "relative", marginLeft: before ? gap : 0 }}>
        <div
          style={{
            position: "absolute",
            left: -size * 0.05,
            right: -size * 0.07,
            top: size * 0.25,
            height: size * 0.71,
            background: MARK,
          }}
        />
        <span>{mark}</span>
      </div>
      {after && <span style={{ marginLeft: gap }}>{after}</span>}
    </div>
  );
}

export async function renderOgCard({ eyebrow, lines, mark, footer = hero.credentials }: OgCard) {
  const [newsreader, geistSemi, geistMono] = await Promise.all([
    font("Newsreader-Regular.ttf"),
    font("Geist-SemiBold.ttf"),
    font("GeistMono-Regular.ttf"),
  ]);

  const S = 3;
  const size = statementSize(lines);
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
            {eyebrow}
          </div>
        </div>

        {/* The statement */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Newsreader",
            fontSize: size,
            lineHeight: 1,
            letterSpacing: -size / 30,
            gap: 6,
          }}
        >
          {lines.map((line) => (
            <Line key={line} text={line} mark={mark} size={size} />
          ))}
        </div>

        {/* Footer rule */}
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
            {footer.map((c, i) => (
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
      ...ogSize,
      fonts: [
        { name: "Newsreader", data: newsreader, weight: 400, style: "normal" },
        { name: "Geist", data: geistSemi, weight: 600, style: "normal" },
        { name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
      ],
    },
  );
}
