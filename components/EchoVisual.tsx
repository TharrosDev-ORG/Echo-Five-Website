type Props = {
  className?: string;
  theme?: "light" | "dark";
};

// Abstract "echo / signal" motif on a Swiss grid. A source point (lower-left)
// emits concentric rings that propagate across a ruled field: change, lands,
// spreads. Animation is transform/opacity only; static + visible under
// prefers-reduced-motion.
export function EchoVisual({ className = "", theme = "light" }: Props) {
  const gx = [0, 60, 120, 180, 240, 300, 360];
  const gy = [0, 60, 120, 180, 240, 300, 360];
  const sx = 60;
  const sy = 300;

  const gridColor = theme === "dark" ? "var(--color-paper)" : "var(--color-keyline)";
  const inkColor = theme === "dark" ? "var(--color-paper)" : "var(--color-ink)";

  const rings = [
    { delay: "0s", stroke: inkColor },
    { delay: "0.85s", stroke: "var(--color-signal)" },
    { delay: "1.7s", stroke: inkColor },
    { delay: "2.55s", stroke: "var(--color-signal)" },
  ];

  return (
    <svg
      viewBox="0 0 360 360"
      className={`block w-full h-auto ${className}`}
      role="img"
      aria-label="Concentric signal rings propagating across a measured grid: a single source whose change spreads outward."
    >
      {/* grid field */}
      <g stroke={gridColor} strokeWidth="1">
        {gx.map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="360" />
        ))}
        {gy.map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="360" y2={y} />
        ))}
      </g>

      {/* corner registration ticks (Swiss measure cues) */}
      <g stroke={inkColor} strokeWidth="1.5">
        <path d="M0 12 V0 H12" fill="none" />
        <path d="M348 0 H360 V12" fill="none" />
        <path d="M360 348 V360 H348" fill="none" />
        <path d="M12 360 H0 V348" fill="none" />
      </g>

      {/* propagating rings: each scales from its own center (CSS fill-box) */}
      {rings.map((r, i) => (
        <circle
          key={i}
          cx={sx}
          cy={sy}
          r="44"
          fill="none"
          stroke={r.stroke}
          strokeWidth="2"
          className="echo-ring"
          style={{ animationDelay: r.delay }}
        />
      ))}

      {/* source node */}
      <circle
        cx={sx}
        cy={sy}
        r="7"
        fill="var(--color-signal)"
        className="echo-core"
      />
      <circle cx={sx} cy={sy} r="13" fill="none" stroke={inkColor} strokeWidth="1.5" />
    </svg>
  );
}
