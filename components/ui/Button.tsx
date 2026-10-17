import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import Arrow from "@/components/ui/Arrow";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  /** Arrow glyph after the label. `false` hides it. External links default to up-right. */
  arrow?: "right" | "down" | "up-right" | false;
  className?: string;
  /** Opens off-site links in the same tab but marks them for assistive tech. */
  external?: boolean;
};

/**
 * The site's one button shape: a pill whose fill rises on hover. Renders a
 * Next `Link` for internal routes and a plain anchor for mailto and off-site URLs.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow,
  className,
  external,
}: Props) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const isPlain = isExternal || href.startsWith("mailto:") || href.startsWith("#");
  const glyph = arrow === undefined ? (isExternal ? "up-right" : "right") : arrow;
  const classes = cx(
    "btn",
    variant === "primary" ? "btn-primary" : "btn-secondary",
    size === "lg" && "btn-lg",
    size === "sm" && "btn-sm",
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {glyph && <Arrow dir={glyph} />}
    </>
  );

  if (isPlain) {
    return (
      <a href={href} className={classes} {...(isExternal ? { rel: "noopener" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
