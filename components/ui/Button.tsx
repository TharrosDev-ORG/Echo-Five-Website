import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { ArrowRight, External } from "@/components/ui/icons";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type StyleProps = {
  variant?: Variant;
  /**
   * Ground the button sits on: `light`, `dark` (black), or `blue`. Leave unset
   * to follow the surrounding surface; set it when a button sits on a ground
   * that is not a Section.
   */
  tone?: "light" | "dark" | "blue";
  size?: Size;
  fullWidth?: boolean;
  className?: string;
};

type OwnProps = StyleProps & {
  /** Trailing arrow that nudges on hover. */
  arrow?: boolean;
  /** Leading icon, e.g. `<Mail />`. */
  icon?: ReactNode;
  children: ReactNode;
};

type LinkButtonProps = OwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof OwnProps | "href"> & {
    href: string;
    /** Opens in a new tab with an external-link icon and screen-reader note. */
    external?: boolean;
  };

type NativeButtonProps = OwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof OwnProps> & {
    href?: undefined;
    external?: never;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

/** Class names for a button look, for elements that cannot use <Button>. */
export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: Omit<StyleProps, "tone"> = {}) {
  return cx(
    "btn",
    `btn-${variant}`,
    size !== "md" && `btn-${size}`,
    fullWidth && "w-full",
    className,
  );
}

/**
 * Primary, secondary, or ghost action. Renders a Next `Link` for internal
 * paths, a plain `<a>` for external, mailto, and hash links, and a `<button>`
 * when there is no `href`.
 */
export default function Button({
  variant,
  tone,
  size,
  fullWidth,
  className,
  arrow,
  icon,
  children,
  ...rest
}: ButtonProps) {
  const classes = buttonClasses({ variant, size, fullWidth, className });
  const trailing = arrow ? <ArrowRight size={18} className="btn-arrow" /> : null;

  if (rest.href === undefined) {
    const { href: _href, external: _external, type = "button", ...buttonProps } = rest;
    return (
      <button type={type} className={classes} data-tone={tone} {...buttonProps}>
        {icon}
        <span>{children}</span>
        {trailing}
      </button>
    );
  }

  const { href, external, ...anchorProps } = rest;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        data-tone={tone}
        {...anchorProps}
      >
        {icon}
        <span>
          {children}
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
        {trailing ?? <External size={16} className="btn-arrow" />}
      </a>
    );
  }

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {trailing}
    </>
  );

  // Mailto, tel, hash, and absolute URLs are not client-side routes.
  if (/^(https?:|mailto:|tel:|#)/.test(href)) {
    return (
      <a href={href} className={classes} data-tone={tone} {...anchorProps}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} data-tone={tone} {...anchorProps}>
      {content}
    </Link>
  );
}
