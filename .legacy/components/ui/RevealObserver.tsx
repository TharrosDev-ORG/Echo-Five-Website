"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Marks `[data-reveal]` elements as revealed when they enter the viewport.
 * Mounted once in the root layout; re-scans after each client navigation.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // `js` is normally set by the inline script in <head>; `reveal-ready` tells
    // that script's failsafe the observer is running, so it keeps content hidden
    // until it scrolls in.
    root.classList.add("js", "reveal-ready");

    const pending = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    const reveal = (el: Element) => el.setAttribute("data-revealed", "");

    if (!("IntersectionObserver" in window)) {
      pending.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
