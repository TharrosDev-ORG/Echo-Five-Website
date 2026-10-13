"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Short entrance fades for `[data-reveal]` elements, re-armed on every route.
 * The hidden start state is gated behind the `.js` class in globals.css, and
 * anything already in view (or any browser without IntersectionObserver) is
 * shown immediately, so content can never be left invisible.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"),
    );
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    // Safety net: never leave anything hidden if the observer misses it.
    const fallback = window.setTimeout(() => {
      nodes.forEach((n) => {
        if (n.getBoundingClientRect().top < window.innerHeight) n.classList.add("is-in");
      });
    }, 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  return null;
}
