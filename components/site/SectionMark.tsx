type Props = {
  index: string;
  kicker: string;
  tone?: "light" | "dark";
};

/**
 * The section coordinate: a small echo glyph, the channel number, and a
 * plainly-set label. One deliberate brand system, not a tracked-uppercase
 * kicker repeated as scaffolding.
 */
export default function SectionMark({ index, kicker, tone = "light" }: Props) {
  const onDark = tone === "dark";
  return (
    <div className="flex items-center gap-3">
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <g fill="none" stroke="var(--color-signal)">
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="12" cy="12" r="9" opacity="0.5" />
          <circle cx="12" cy="12" r="1.4" fill="var(--color-signal)" stroke="none" />
        </g>
      </svg>
      <span
        className={`font-mono text-[0.82rem] font-medium tabular-nums ${
          onDark ? "text-signal" : "text-signal-deep"
        }`}
      >
        {index}
      </span>
      <span className={`h-px w-5 ${onDark ? "bg-line-dark" : "bg-line-strong"}`} aria-hidden="true" />
      <span
        className={`text-[0.9rem] font-medium ${
          onDark ? "text-muted-on-dark" : "text-muted"
        }`}
      >
        {kicker}
      </span>
    </div>
  );
}
