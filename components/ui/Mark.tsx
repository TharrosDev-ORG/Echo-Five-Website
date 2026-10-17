import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * The highlighter: the visual mark Echofive shares with Advanta365. Use it on
 * the one or two words in a heading that carry the point. With `sweep`, it
 * draws in when scrolled into view (MotionRoot adds `is-in`).
 */
export default function Mark({
  children,
  sweep = true,
  className,
}: {
  children: ReactNode;
  sweep?: boolean;
  className?: string;
}) {
  return (
    <span className={cx("mark", className)} {...(sweep ? { "data-sweep": "" } : {})}>
      {children}
    </span>
  );
}
