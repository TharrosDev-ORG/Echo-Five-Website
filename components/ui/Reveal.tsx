import { createElement, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: "up" | "left" | "scale" | "fade";
};

/**
 * Declarative reveal target. Adds the `data-reveal` attribute the useReveal hook
 * reads. The hidden initial state is supplied by CSS (gated behind `.js`), so
 * content is visible without JS and for crawlers.
 *
 * To stagger a set together, wrap them in any element carrying
 * `data-reveal-group` — the hook animates that group's items as one timeline.
 */
export default function Reveal({
  children,
  as = "div",
  className,
  variant = "up",
}: Props) {
  return createElement(
    as,
    {
      className,
      "data-reveal": variant === "up" ? "" : variant,
    },
    children,
  );
}
