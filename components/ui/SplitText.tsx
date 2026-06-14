"use client";

import { useEffect, useRef, createElement, type ElementType } from "react";
import { splitWords, splitChars } from "@/lib/splitText";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** "words" (default, masked rise) or "chars" (per-letter cascade). */
  mode?: "words" | "chars";
};

/**
 * Renders text server-side as plain content (crawlable, no-JS safe), then on
 * mount splits it into animatable spans. The parent section's useReveal hook
 * picks up the `.split-word` / `.split-char` nodes inside `[data-split]`.
 */
export default function SplitText({
  text,
  as = "span",
  className,
  mode = "words",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const result = mode === "chars" ? splitChars(el) : splitWords(el);
    return () => result.revert();
  }, [text, mode]);

  return createElement(
    as,
    {
      ref,
      className,
      "data-split": "",
      "aria-label": text,
    },
    text,
  );
}
