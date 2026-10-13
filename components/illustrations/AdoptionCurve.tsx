import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";

const CURVE =
  "M24 284 C36 281.7 70.7 278.7 96 270 C121.3 261.3 149.3 249 176 232 C202.7 215 229.3 189.3 256 168 C282.7 146.7 309.3 121 336 104 C362.7 87 394 74 416 66 C438 58 459.3 57.7 468 56";

/** ADKAR waypoints sitting on the curve. */
const WAYPOINTS = [
  { x: 96, y: 270, letter: "A" },
  { x: 176, y: 232, letter: "D" },
  { x: 256, y: 168, letter: "K" },
  { x: 336, y: 104, letter: "A" },
  { x: 416, y: 66, letter: "R" },
];

const GRID_Y = [56, 116, 176, 236];

/**
 * Decorative adoption curve rising through the five ADKAR stages. The line
 * draws in once on load (CSS, skipped under reduced motion). Colors follow the
 * surface: citron on dark grounds, moss on light.
 */
export default function AdoptionCurve({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 492 320"
      className={cx("block h-auto w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="adoption-fill" x1="0" y1="0" x2="0" y2="1" className="text-accent">
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

      <path d={`${CURVE} L468 296 L24 296 Z`} fill="url(#adoption-fill)" className="illo-fade" />
      <path
        d={CURVE}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="illo-draw text-accent"
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
              className={last ? "fill-accent stroke-accent" : "fill-raised stroke-accent"}
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
