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
  /** Section number such as "01", shown before the eyebrow. Decorative. */
  index?: string;
  /**
   * 40px blue stroke above the title, shown below 1024px where the vertical rail
   * is hidden. Pass `false` for nested sub-headings inside a section.
   */
  stroke?: boolean;
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
  index,
  stroke = true,
  className,
}: Props) {
  const centered = align === "center";
  const heading = (
    <div className={cx("max-w-3xl", centered && "mx-auto text-center")}>
      {stroke ? (
        <span
          aria-hidden="true"
          data-rail-stroke
          className={cx("mb-6 block h-px w-10 bg-accent-fill lg:hidden", centered && "mx-auto")}
        />
      ) : null}
      {index || eyebrow ? (
        <div className={cx("mb-3 flex items-baseline gap-3", centered && "justify-center")}>
          {index ? (
            <span aria-hidden="true" className="text-label tabular-nums text-fg-3" data-heading-index>
              {index}
            </span>
          ) : null}
          {eyebrow ? <p className="text-small font-semibold text-accent">{eyebrow}</p> : null}
        </div>
      ) : null}
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
