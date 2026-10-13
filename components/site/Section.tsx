import type { ReactNode } from "react";

type Props = {
  id?: string;
  heading: string;
  /** Short supporting line under the heading in the side column. */
  note?: ReactNode;
  band?: boolean;
  children: ReactNode;
};

/**
 * Document layout: the section heading sits in a side column and the content
 * in the main column on wide screens; they stack on narrow ones.
 */
export default function Section({ id, heading, note, band, children }: Props) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} className={`section${band ? " band" : ""}`} aria-labelledby={headingId}>
      <div className="container doc">
        <div className="doc-head">
          <h2 id={headingId} className="t-h2">
            {heading}
          </h2>
          {note ? <div className="t-small">{note}</div> : null}
        </div>
        <div className="doc-body">{children}</div>
      </div>
    </section>
  );
}
