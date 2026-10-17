import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/cx";

type Props = {
  /** Each entry is one visual line; it rises from behind a clip in turn. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  /** Extra delay before the first line, in ms. */
  delay?: number;
  id?: string;
};

/**
 * A display heading set line by line. Screen readers get the lines joined as
 * one heading; without JS or with reduced motion the text simply shows.
 */
export default function Lines({ lines, as: Tag = "h2", className, delay = 0, id }: Props) {
  return (
    <Tag
      id={id}
      className={cx(className)}
      data-lines=""
      style={delay ? ({ "--d": delay } as React.CSSProperties) : undefined}
    >
      {lines.map((line, i) => (
        <span key={i} className="line" style={{ "--i": i } as React.CSSProperties}>
          <span>{line}</span>
          {i < lines.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
