import { cx } from "@/lib/cx";

const LETTERS = ["A", "D", "K", "A", "R"];
/** Node centres at 10%, 30%, ... 90% of the width: the centres of five equal columns. */
const X = [56, 168, 280, 392, 504];

type Props = {
  /** Highlight one stage (0 to 4), e.g. the selected tab in the Approach stepper. */
  active?: number;
  className?: string;
};

/**
 * Decorative five-step path for the ADKAR stages. Stages up to `active` are
 * drawn in the accent; later ones are muted. Render the stage names as text
 * alongside it, since the SVG is hidden from assistive tech.
 */
export default function AdkarPath({ active, className }: Props) {
  const reached = active ?? LETTERS.length - 1;
  return (
    <svg
      viewBox="0 0 560 112"
      className={cx("block h-auto w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <line x1={X[0]} x2={X[4]} y1="56" y2="56" strokeWidth="2" className="stroke-edge-strong" />
      <line
        x1={X[0]}
        x2={X[reached]}
        y1="56"
        y2="56"
        strokeWidth="3"
        strokeLinecap="round"
        className="stroke-accent transition-all duration-300"
      />
      {LETTERS.map((letter, i) => {
        const isActive = active === i;
        const isReached = i <= reached;
        return (
          <g key={i}>
            <circle
              cx={X[i]}
              cy="56"
              r={isActive ? 30 : 26}
              strokeWidth="2.5"
              className={cx(
                "transition-all duration-300",
                isActive ? "fill-accent stroke-accent" : "fill-raised",
                !isActive && (isReached ? "stroke-accent" : "stroke-edge-strong"),
              )}
            />
            <text
              x={X[i]}
              y="56"
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
