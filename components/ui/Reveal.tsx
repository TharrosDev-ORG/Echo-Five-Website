import type { CSSProperties, ReactNode } from "react";

type Props = {
  as?: "div" | "li" | "section" | "article" | "figure" | "span";
  /** Position in a list; staggers the entrance by 60ms per step (capped at 8). */
  index?: number;
  className?: string;
  id?: string;
  children: ReactNode;
};

/**
 * Fades and lifts its content in when it scrolls into view. Server-component
 * friendly: it only adds `data-reveal`; `RevealObserver` (mounted once in the
 * layout) does the observing. Content is fully visible without JS and under
 * reduced motion. Do not wrap above-the-fold content such as heroes.
 */
export default function Reveal({ as: Tag = "div", index = 0, className, id, children }: Props) {
  const style = index ? ({ "--reveal-index": Math.min(index, 8) } as CSSProperties) : undefined;
  return (
    <Tag data-reveal="" className={className} id={id} style={style}>
      {children}
    </Tag>
  );
}
