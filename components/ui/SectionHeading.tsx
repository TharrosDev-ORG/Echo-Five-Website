import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type Props = {
  title: ReactNode;
  lead?: ReactNode;
  /** Short context line above the title. Use sparingly. */
  eyebrow?: ReactNode;
  /** Heading element. Defaults to h2; pages own their single h1. */
  as?: "h1" | "h2" | "h3";
  /** Visual size, independent of the element. Defaults to match `as`. */
  size?: "h1" | "h2" | "h3";
  id?: string;
  align?: "start" | "center";
  /** A link or button placed beside the heading on wide screens (e.g. "All services"). */
  action?: ReactNode;
  className?: string;
};

const sizeClass = { h1: "text-h1", h2: "text-h2", h3: "text-h3" };

/** Section title with an optional lead paragraph. Colors follow the surrounding surface. */
export default function SectionHeading({
  title,
  lead,
  eyebrow,
  as: Tag = "h2",
  size,
  id,
  align = "start",
  action,
  className,
}: Props) {
  const centered = align === "center";
  const heading = (
    <div className={cx("max-w-3xl", centered && "mx-auto text-center")}>
      {eyebrow ? <p className="mb-3 text-small font-semibold text-accent">{eyebrow}</p> : null}
      <Tag id={id} className={cx(sizeClass[size ?? Tag], "text-fg")}>
        {title}
      </Tag>
      {lead ? <p className="mt-4 text-lead text-fg-2">{lead}</p> : null}
    </div>
  );

  if (!action) return <div className={className}>{heading}</div>;

  return (
    <div
      className={cx(
        "flex flex-col gap-5",
        centered ? "items-center" : "md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      {heading}
      <div className="shrink-0">{action}</div>
    </div>
  );
}
