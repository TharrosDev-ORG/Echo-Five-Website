/**
 * Coordinate header shared by every section: mono index + kicker on a
 * keyline, then the display heading. Server component; reveals are
 * driven by ScrollFX via data attributes.
 */
export default function SectionHead({
  index,
  kicker,
  heading,
  headingId,
}: {
  index: string;
  kicker: string;
  heading: string;
  headingId?: string;
}) {
  return (
    <div data-reveal-group>
      <p data-reveal className="t-coord flex items-baseline gap-4 text-ink-muted">
        <span className="text-signal">{index}</span>
        {kicker}
        <span aria-hidden="true" className="h-px flex-1 self-center bg-line" />
      </p>
      <h2 data-reveal id={headingId} className="t-h2 mt-7 max-w-[24ch] text-ink">
        {heading}
      </h2>
    </div>
  );
}
