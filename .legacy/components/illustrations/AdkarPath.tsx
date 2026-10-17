import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";

const LETTERS = ["A", "D", "K", "A", "R"];
/** Node centres at 10%, 30%, ... 90% of the width: the centres of five equal columns. */
const X = [56, 168, 280, 392, 504];

type Props = {
  /** Highlight one stage (0 to 4), e.g. the selected tab in the Approach stepper. */
  active?: number;
  /**
   * Letters inside large nodes (default). Pass `false` where the letters are
   * set as type above the path: the path becomes a thin signal line with small
   * ring nodes, like the rail.
   */
  letters?: boolean;
  className?: string;
};

/**
 * Decorative five-step path for the ADKAR stages. Stages up to `active` are
 * drawn in the accent fill; later ones are muted. Render the stage names as
 * text alongside it, since the SVG is hidden from assistive tech. Inside a
 * `Reveal`, the line draws in and the nodes pop when it scrolls into view.
 */
export default function AdkarPath({ active, letters = true, className }: Props) {
  const reached = active ?? LETTERS.length - 1;
  const h = letters ? 112 : 24;
  const cy = h / 2;
  // Hairlines stay 1px at any width. Not on the drawn path: a non-scaling stroke lays its
  // pathLength-based dash out in screen pixels, so once the SVG is scaled up the dash
  // stops short of the line's end.
  const thin = letters ? {} : { vectorEffect: "non-scaling-stroke" as const };

  return (
    <svg
      viewBox={`0 0 560 ${h}`}
      className={cx("block h-auto w-full overflow-visible", className)}
      aria-hidden="true"
      focusable="false"
    >
      <line
        x1={X[0]}
        x2={X[4]}
        y1={cy}
        y2={cy}
        strokeWidth={letters ? 2 : 1}
        className="stroke-edge-strong"
        {...thin}
      />
      <path
        d={`M${X[0]} ${cy} H${X[reached]}`}
        pathLength={1}
        fill="none"
        strokeWidth={letters ? 3 : 1}
        strokeLinecap={letters ? "round" : "butt"}
        className="illo-draw stroke-accent-fill"
      />
      {LETTERS.map((letter, i) => {
        const isActive = active === i;
        const isReached = i <= reached;
        const style = { "--i": i } as CSSProperties;

        if (!letters) {
          return (
            <g key={i} className="illo-pop" style={style}>
              <circle cx={X[i]} cy={cy} r="4.5" strokeWidth="1.5" className="fill-raised stroke-accent-fill" {...thin} />
              <circle cx={X[i]} cy={cy} r="1.75" className="fill-accent-fill" />
            </g>
          );
        }

        return (
          <g key={i} className="illo-pop" style={style}>
            <circle
              cx={X[i]}
              cy={cy}
              r={isActive ? 30 : 26}
              strokeWidth="2.5"
              className={cx(
                "transition-all duration-300",
                isActive ? "fill-accent-fill stroke-accent-fill" : "fill-raised",
                !isActive && (isReached ? "stroke-accent-fill" : "stroke-edge-strong"),
              )}
            />
            <text
              x={X[i]}
              y={cy}
              dy="0.36em"
              textAnchor="middle"
              className={cx(
                "font-display text-[22px] font-semibold",
                isActive ? "fill-on-accent" : isReached ? "fill-fg" : "fill-fg-3",
              )}
            >
              {letter}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
