type LogoProps = {
  className?: string;
  monochrome?: boolean;
  inverted?: boolean;
};

// Grid-derived echo mark: a source square emitting two quarter-arc signals.
// `inverted` swaps ink elements to paper for use on dark backgrounds.
export function Logo({ className = "", monochrome = false, inverted = false }: LogoProps) {
  const ink = monochrome ? "currentColor" : inverted ? "var(--color-paper)" : "var(--color-ink)";
  const signal = monochrome ? "currentColor" : "var(--color-signal)";
  return (
    <a
      href="#top"
      aria-label="Echo-Five home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        width="26"
        height="26"
        fill="none"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="26" height="26" stroke={ink} strokeWidth="1.5" />
        <path d="M9 23a6 6 0 0 1 6-6" stroke={ink} strokeWidth="1.75" />
        <path d="M9 23a11 11 0 0 1 11-11" stroke={signal} strokeWidth="1.75" />
        <circle cx="9" cy="23" r="2.25" fill={signal} />
      </svg>
      <span
        className="font-display font-bold text-[0.95rem] tracking-[0.04em] uppercase leading-none"
        style={{ color: ink }}
      >
        Echo<span style={{ color: signal }}>·</span>Five
      </span>
    </a>
  );
}
