/**
 * The instrument coordinate that opens each section: a live status dot, a channel
 * number, and a plainly-set label. One constant system; sections vary how they
 * compose around it. The dot is decorative (aria-hidden).
 *
 * `tone="signal"` is used on the amber/signal-drenched close, where ink reads on
 * the bright ground.
 */
export default function SectionMark({
  index,
  kicker,
  tone = "dark",
  className = "",
}: {
  index?: string;
  kicker: string;
  tone?: "dark" | "signal";
  className?: string;
}) {
  const onSignal = tone === "signal";
  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <span
        className="status-dot"
        style={onSignal ? { background: "var(--color-ink-on-signal)" } : undefined}
        aria-hidden="true"
      />
      {index ? (
        <span className={`t-coord ${onSignal ? "text-ink-on-signal" : "text-signal"}`}>
          CH.{index}
        </span>
      ) : null}
      <span className={`t-coord ${onSignal ? "text-ink-on-signal/75" : "text-ink-muted"}`}>
        {kicker}
      </span>
    </div>
  );
}
