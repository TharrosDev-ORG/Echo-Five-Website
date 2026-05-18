type LogoProps = {
  className?: string;
  monochrome?: boolean;
};

export function Logo({ className = "", monochrome = false }: LogoProps) {
  const stroke = monochrome ? "currentColor" : "var(--color-accent)";
  return (
    <a href="#top" aria-label="Echo-Five home" className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        width="28"
        height="28"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M20 22a4 4 0 1 0 0-8" />
        <path d="M20 26a8 8 0 1 0 0-16" />
        <path d="M20 30a12 12 0 1 0 0-24" />
        <path d="M20 34a16 16 0 1 0 0-32" />
        <circle cx="20" cy="18" r="1.25" fill={stroke} stroke="none" />
      </svg>
      <span
        className="font-serif text-[1.05rem] tracking-[0.18em] uppercase"
        style={{ color: monochrome ? "currentColor" : "var(--color-ink)" }}
      >
        Echo<span className="mx-1 opacity-60">·</span>Five
      </span>
    </a>
  );
}
