"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, EASE } from "@/lib/animation";

/**
 * Page-wide scroll choreography, mounted once. Sections stay server
 * components and opt in with data attributes:
 *
 *   data-reveal           rise-in on enter ("left" / "scale" variants)
 *   data-reveal-group     stagger all direct [data-reveal] children together
 *   data-count="120"      mono counter that counts up on enter
 *
 * Under prefers-reduced-motion everything is simply shown (CSS handles the
 * initial states, see globals.css).
 */
export default function ScrollFX() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Grouped reveals: one trigger, staggered children.
      const groups = gsap.utils.toArray<HTMLElement>("[data-reveal-group]");
      for (const group of groups) {
        const items = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal]"));
        if (items.length === 0) continue;
        gsap.to(items, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          ease: EASE,
          stagger: 0.09,
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        });
      }

      // Solo reveals (not inside a group).
      const solos = gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .filter((el) => !el.closest("[data-reveal-group]"));
      for (const el of solos) {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          ease: EASE,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      }

      // Count-ups.
      const counters = gsap.utils.toArray<HTMLElement>("[data-count]");
      for (const el of counters) {
        const target = parseFloat(el.dataset.count || "0");
        const suffix = el.dataset.countSuffix ?? "";
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(state.v)}${suffix}`;
          },
        });
      }

      return () => {
        /* matchMedia handles cleanup of tweens + triggers */
      };
    });

    // Reduced motion: counters jump straight to their final value.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      for (const el of gsap.utils.toArray<HTMLElement>("[data-count]")) {
        el.textContent = `${el.dataset.count}${el.dataset.countSuffix ?? ""}`;
      }
    });

    // Fonts/images shift layout after hydration; keep trigger positions honest.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}
