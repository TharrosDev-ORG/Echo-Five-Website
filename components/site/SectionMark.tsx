type Props = {
  index: string;
  kicker: string;
  /** light = on paper, dark = on ink, signal = on the amber close. */
  tone?: "light" | "dark" | "signal";
};

const tones = {
  light: { glyph: "var(--color-signal)", index: "text-signal-deep", rule: "bg-line-strong", label: "text-muted" },
  dark: { glyph: "var(--color-signal)", index: "text-signal", rule: "bg-line-dark", label: "text-muted-on-dark" },
  signal: { glyph: "var(--color-ink-deep)", index: "text-ink-deep", rule: "bg-ink-deep/30", label: "text-ink-deep/80" },
} as const;

/**
 * The section coordinate: a small echo glyph, the channel number, and a
 * plainly-set label. One deliberate brand system, not a tracked-uppercase
 * kicker repeated as scaffolding.
 */
export default function SectionMark({ index, kicker, tone = "light" }: Props) {
  const t = tones[tone];
  return (
    <div className="flex items-center gap-3">
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <g fill="none" stroke={t.glyph}>
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="12" cy="12" r="9" opacity="0.5" />
          <circle cx="12" cy="12" r="1.4" fill={t.glyph} stroke="none" />
        </g>
      </svg>
      <span className={`font-mono text-[0.82rem] font-medium tabular-nums ${t.index}`}>
        {index}
      </span>
      <span className={`h-px w-5 ${t.rule}`} aria-hidden="true" />
      <span className={`text-[0.9rem] font-medium ${t.label}`}>{kicker}</span>
    </div>
  );
}
