import type { ReactNode } from "react";

type Props = {
  label: string;
  heading: string;
  /** Heading level; sections under a page h1 use h2. */
  as?: "h2" | "h3";
  id?: string;
  lead?: string;
  /** Right-hand column (lead text, a link). Switches to the split layout. */
  side?: ReactNode;
};

/** Consistent section opener: accent-ruled label, heading, then context. */
export default function Intro({ label, heading, as: H = "h2", id, lead, side }: Props) {
  return (
    <div className={`intro${side ? " intro--split" : ""}`} data-reveal>
      <div className="intro-head">
        <p className="t-label label-row">{label}</p>
        <H id={id} className="t-h2" style={{ maxWidth: "20ch" }}>
          {heading}
        </H>
        {lead ? <p className="t-lead measure">{lead}</p> : null}
      </div>
      {side ? <div className="intro-side">{side}</div> : null}
    </div>
  );
}
