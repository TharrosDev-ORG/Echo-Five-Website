import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Section index label, e.g. "(02) Services". Mono, sentence case, set above
 * section headings. The number is decorative and hidden from screen readers.
 */
export default function Index({
  n,
  children,
  className,
}: {
  n?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cx("label flex items-center gap-3 text-fg-3", className)}>
      {n && (
        <span aria-hidden="true" className="text-accent">
          ({n})
        </span>
      )}
      <span>{children}</span>
    </p>
  );
}
