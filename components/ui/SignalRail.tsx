/**
 * The signal rail: a 1px blue line in the left gutter with a node at the
 * section heading. Rendered as a direct child of a full-width, positioned
 * element (Section, PageHero) so consecutive rails align into one column.
 * Hidden below 1024px, where each heading carries a short stroke instead.
 */
export default function SignalRail() {
  return (
    <span aria-hidden="true" data-rail className="signal-rail">
      <span className="signal-rail-line" />
      <span className="signal-rail-node" />
    </span>
  );
}
