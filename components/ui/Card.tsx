import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { ArrowRight, External } from "@/components/ui/icons";

type Props = {
  /** Makes the whole card a single link. Hover darkens the border; the card does not lift. */
  href?: string;
  /** Open `href` in a new tab (adds an external icon and screen-reader note). */
  external?: boolean;
  /** `panel` has roomier padding on wide screens. */
  variant?: "default" | "panel";
  /** Small icon shown in a tinted tile at the top, e.g. `<Icon name="compass" />`. */
  icon?: ReactNode;
  /** Row above the title, e.g. a `<Badge>`. */
  meta?: ReactNode;
  title?: ReactNode;
  /** Element for `title`. Match the page outline (usually h3). */
  titleAs?: "h2" | "h3" | "h4" | "p";
  /** Link label shown at the foot of the card with an arrow (use with `href`). */
  cta?: ReactNode;
  className?: string;
  children?: ReactNode;
};

/**
 * Surface for grouped content: 1px edge, 8px radius, no shadow. Raised white on
 * light grounds, black-2 on dark ones, blue-d on blue. Body text uses `text-fg-2`.
 */
export default function Card({
  href,
  external,
  variant = "default",
  icon,
  meta,
  title,
  titleAs: Title = "h3",
  cta,
  className,
  children,
}: Props) {
  const classes = cx("card", variant === "panel" && "card-panel", className);

  const body = (
    <>
      {icon ? (
        <span className="mb-2 inline-flex size-11 items-center justify-center rounded-control bg-accent/12 text-accent">
          {icon}
        </span>
      ) : null}
      {meta ? <div className="flex flex-wrap items-center gap-2">{meta}</div> : null}
      {title ? <Title className="text-h3 text-fg">{title}</Title> : null}
      {children ? <div className="flex flex-col gap-3 text-fg-2">{children}</div> : null}
      {cta ? (
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-semibold text-accent">
          {cta}
          {external ? <External size={16} /> : <ArrowRight size={18} className="btn-arrow" />}
        </span>
      ) : null}
      {href && external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </>
  );

  if (!href) return <div className={classes}>{body}</div>;

  if (external || /^(https?:|mailto:)/.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {body}
    </Link>
  );
}
