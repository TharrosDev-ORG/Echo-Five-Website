"use client";

import { type ReactNode } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

type Props = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

/** Anchor to the top of the page that rides the smooth scroller when present. */
export default function ToTop({ children, className, ...rest }: Props) {
  const { scrollTo } = useSmoothScroll();
  return (
    <a
      href="#top"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        scrollTo(0);
      }}
      data-cursor
      {...rest}
    >
      {children}
    </a>
  );
}
