import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";

/** The curve on the panel's 492 x 320 grid, as cubic segments: start, then [c1, c2, end] triples. */
const START = [24, 284];
const SEGMENTS = [
  [36, 281.7, 70.7, 278.7, 96, 270],
  [121.3, 261.3, 149.3, 249, 176, 232],
  [202.7, 215, 229.3, 189.3, 256, 168],
  [282.7, 146.7, 309.3, 121, 336, 104],
  [362.7, 87, 394, 74, 416, 66],
  [438, 58, 459.3, 57.7, 468, 56],
];

/** ADKAR waypoints sitting on the curve. */
const WAYPOINTS = [
  { x: 96, y: 270, letter: "A" },
  { x: 176, y: 232, letter: "D" },
  { x: 256, y: 168, letter: "K" },
  { x: 336, y: 104, letter: "A" },
  { x: 416, y: 66, letter: "R" },
];

const path = (fx: (x: number) => number, fy: (y: number) => number) =>
  `M${fx(START[0])} ${fy(START[1])} ` +
  SEGMENTS.map((s) => `C${s.map((v, i) => +(i % 2 ? fy(v) : fx(v)).toFixed(1)).join(" ")}`).join(" ");

const PANEL_CURVE = path(
  (x) => x,
  (y) => y,
);

/*
 * The bleed curve is the same shape stretched over 1200 x 240: it starts on the
 * bottom-left corner and ends 16 units under the top-right, so it spans the
 * whole container and rises from the facts row beneath it.
 */
const BLEED_W = 1200;
const BLEED_H = 240;
const bx = (x: number) => ((x - 24) * BLEED_W) / 444;
const by = (y: number) => 16 + ((y - 56) * (BLEED_H - 16)) / 228;
const BLEED_CURVE = path(bx, by);

const GRID_Y = [56, 116, 176, 236];

type Props = {
  className?: string;
  /**
   * `panel` (default) is the framed chart with grid lines. `bleed` is the hero
   * line: no grid, a 2px stroke, and 20px waypoint letters. Its height comes from
   * `className`; the line stretches to fill it.
   */
  variant?: "panel" | "bleed";
};

/**
 * Decorative adoption curve rising through the five ADKAR stages. Inside the
 * page hero the line draws in once on load (CSS, skipped under reduced motion).
 * Lines and fills use the surface's accent fill.
 */
export default function AdoptionCurve({ className, variant = "panel" }: Props) {
  if (variant === "bleed") return <Bleed className={className} />;

  return (
    <svg
      viewBox="0 0 492 320"
      className={cx("block h-auto w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="adoption-fill" x1="0" y1="0" x2="0" y2="1" className="text-accent-fill">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g className="text-fg-3" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1">
        {GRID_Y.map((y) => (
          <line key={y} x1="24" x2="468" y1={y} y2={y} strokeDasharray="2 6" />
        ))}
        <line x1="24" x2="468" y1="296" y2="296" strokeOpacity="0.4" />
      </g>

      <path d={`${PANEL_CURVE} L468 296 L24 296 Z`} fill="url(#adoption-fill)" className="illo-fade" />
      <path
        d={PANEL_CURVE}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="illo-draw text-accent-fill"
      />

      {WAYPOINTS.map((p, i) => {
        const last = i === WAYPOINTS.length - 1;
        return (
          <g key={i} className="illo-pop" style={{ "--i": i } as CSSProperties}>
            <line
              x1={p.x}
              x2={p.x}
              y1={p.y + 17}
              y2="296"
              stroke="currentColor"
              strokeOpacity="0.28"
              strokeDasharray="2 4"
              className="text-fg-3"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r="16"
              strokeWidth="2"
              className={last ? "fill-accent-fill stroke-accent-fill" : "fill-raised stroke-accent-fill"}
            />
            <text
              x={p.x}
              y={p.y}
              dy="0.35em"
              textAnchor="middle"
              className={cx("font-display text-[15px] font-semibold", last ? "fill-on-accent" : "fill-fg")}
            >
              {p.letter}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * The line is SVG stretched to the box (`preserveAspectRatio="none"`, with a
 * non-scaling stroke so it stays 2px). A non-scaling stroke lays the
 * pathLength-based draw-in dash out in screen pixels, so keep the box no
 * larger than the 1200 x 240 viewBox in either axis or the dash stops short. The waypoints are HTML placed at the
 * same percentages, so the letters stay a true 20px at every width instead of
 * scaling down with the drawing on phones.
 */
function Bleed({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cx("relative", className)}>
      <svg
        viewBox={`0 0 ${BLEED_W} ${BLEED_H}`}
        preserveAspectRatio="none"
        focusable="false"
        className="absolute inset-0 size-full overflow-visible"
      >
        <path
          d={BLEED_CURVE}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          className="illo-draw text-accent-fill"
        />
      </svg>
      {WAYPOINTS.map((p, i) => {
        const last = i === WAYPOINTS.length - 1;
        return (
          <span
            key={i}
            className={cx(
              "illo-pop absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent-fill font-display text-[20px] leading-none font-semibold",
              last ? "bg-accent-fill text-on-accent" : "bg-raised text-fg",
            )}
            style={
              {
                left: `${((bx(p.x) / BLEED_W) * 100).toFixed(2)}%`,
                top: `${((by(p.y) / BLEED_H) * 100).toFixed(2)}%`,
                "--i": i,
              } as CSSProperties
            }
          >
            {p.letter}
          </span>
        );
      })}
    </div>
  );
}
