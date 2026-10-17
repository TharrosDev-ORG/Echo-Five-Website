import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type Props = {
  /** Two-digit exhibit number, e.g. "01". Numbers run in reading order across the site. */
  n: string;
  title: string;
  /** One line under the figure: what it shows and, for diagrams, that it is illustrative. */
  note?: string;
  children: ReactNode;
  className?: string;
  /** Hide the top caption row (when the surrounding section already titles the figure). */
  bare?: boolean;
};

/**
 * The house figure: a numbered exhibit, the way a briefing makes an argument
 * visible. Children are the drawing (usually an SVG with `data-draw` strokes);
 * the figure gets `data-observe` so MotionRoot plays it once on view.
 */
export default function Exhibit({ n, title, note, children, className, bare }: Props) {
  return (
    <figure className={cx("relative", className)} data-observe="">
      {!bare && (
        <div className="label mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-fg pt-3">
          <span>
            <span className="text-accent">Exhibit {n}</span>
            <span className="text-fg-3"> · </span>
            <span className="text-fg">{title}</span>
          </span>
        </div>
      )}
      {children}
      {note && <figcaption className="label mt-4 text-fg-3">{note}</figcaption>}
    </figure>
  );
}
