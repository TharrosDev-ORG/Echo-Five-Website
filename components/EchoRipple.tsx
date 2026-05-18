type Props = {
  className?: string;
  size?: number;
};

const RINGS = [
  { delay: "0s", stroke: "var(--color-accent)" },
  { delay: "0.6s", stroke: "var(--color-accent-warm)" },
  { delay: "1.2s", stroke: "var(--color-accent)" },
];

export function EchoRipple({ className = "", size = 440 }: Props) {
  return (
    <div
      className={`pointer-events-none select-none echo-ripple ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 240 240"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {RINGS.map((r, i) => (
          <circle
            key={i}
            cx="120"
            cy="120"
            r="40"
            fill="none"
            stroke={r.stroke}
            strokeWidth="2.5"
            className="echo-ring"
            style={{ animationDelay: r.delay }}
          />
        ))}
        <circle
          cx="120"
          cy="120"
          r="7"
          fill="var(--color-accent)"
          className="echo-core"
        />
      </svg>
    </div>
  );
}
