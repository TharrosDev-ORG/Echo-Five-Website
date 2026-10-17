"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-reveal], [data-lines], [data-sweep], [data-observe], [data-grow-x], [data-draw]";

/**
 * One IntersectionObserver for every scroll-in effect on the page. It adds
 * `is-in` once an element enters the viewport and then stops watching it.
 * Re-scans on every route change. Marks `<html>` as `reveal-ready` so the
 * no-JS safety net in the layout's inline script stands down.
 */
export default function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) => !el.classList.contains("is-in"),
    );

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      // Threshold 0 so even very tall elements trigger; the margin waits until
      // the element is a little way up the screen.
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
