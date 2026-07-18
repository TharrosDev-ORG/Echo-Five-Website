"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
};

/**
 * Scroll-scrubbed statement: words sit faint and flood to full ink as the
 * paragraph crosses the viewport, tied to scroll position (scrub, not a
 * one-shot). The faint start state is applied by GSAP only *after* the
 * ScrollTrigger exists, so a failure anywhere leaves the text fully visible —
 * same invariant as the rest of the reveal system.
 */
export default function TextScrub({ text, as: Tag = "p", className }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    // Split into plain word spans (no masks — opacity only).
    const original = el.innerHTML;
    el.innerHTML = "";
    const words: HTMLElement[] = [];
    for (const token of text.split(/(\s+)/)) {
      if (token.trim() === "") {
        el.appendChild(document.createTextNode(token));
        continue;
      }
      const span = document.createElement("span");
      span.className = "scrub-word";
      span.setAttribute("aria-hidden", "true");
      span.textContent = token;
      el.appendChild(span);
      words.push(span);
    }

    const tween = gsap.fromTo(
      words,
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.06,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: "top 32%",
          scrub: 0.4,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      el.innerHTML = original;
    };
  }, [text]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text}
    </Tag>
  );
}
