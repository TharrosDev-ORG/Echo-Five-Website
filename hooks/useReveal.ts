"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";

/**
 * Scoped reveal hook. Attach the returned ref to a wrapper; on mount it animates
 * every `[data-reveal]` descendant into place as it enters the viewport, plus
 * any `.split-word` produced by the splitter inside `[data-split]`. Items inside
 * a `[data-reveal-group]` stagger together. All work is wrapped in a
 * gsap.context tied to the scope, so Strict Mode double-mounts and unmounts
 * revert cleanly.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(): RefObject<T | null> {
  const scope = useRef<T>(null);

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    if (prefersReducedMotion()) return; // CSS already shows final state

    const ctx = gsap.context(() => {
      // Grouped reveals stagger as one timeline.
      const groups = Array.from(
        el.querySelectorAll<HTMLElement>("[data-reveal-group]"),
      );
      groups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!items.length) return;
        gsap.to(items, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: EASE,
          stagger: 0.06,
          scrollTrigger: { trigger: group, start: "top 90%", once: true },
        });
      });

      // Standalone reveals.
      const solo = Array.from(
        el.querySelectorAll<HTMLElement>("[data-reveal]"),
      ).filter((node) => !node.closest("[data-reveal-group]"));
      solo.forEach((node) => {
        gsap.to(node, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: EASE,
          scrollTrigger: { trigger: node, start: "top 92%", once: true },
        });
      });

      // Split headlines: masked line rise. fromTo pins the start explicitly so
      // GSAP never has to read a percentage transform out of the matrix.
      const splits = Array.from(el.querySelectorAll<HTMLElement>("[data-split]"));
      splits.forEach((node) => {
        const words = node.querySelectorAll<HTMLElement>(".split-word");
        if (!words.length) return;
        gsap.fromTo(
          words,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: EASE,
            stagger: 0.035,
            scrollTrigger: { trigger: node, start: "top 90%", once: true },
          },
        );
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return scope;
}
