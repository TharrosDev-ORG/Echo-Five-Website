import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/cx";

type Props = {
  as?: ElementType;
  /** `default` 76rem, `narrow` 48rem for reading-width content. */
  size?: "default" | "narrow";
  className?: string;
  children: ReactNode;
};

/** Centred page column with the site gutter (16px on phones). */
export default function Container({ as: Tag = "div", size = "default", className, children }: Props) {
  return (
    <Tag
      className={cx(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "narrow" ? "max-w-3xl" : "max-w-site",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
