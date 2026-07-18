"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** CSS animation duration for one loop, e.g. "70s". */
  duration?: string;
};

/**
 * Marquee wrapper that leans into scroll velocity: fast scrolling skews the
 * track, which settles straight as the scroll settles. The loop itself is the
 * plain CSS marquee animation (runs without JS); the skew is additive.
 */
export default function SkewMarquee({ children, className, duration = "60s" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const skewTo = gsap.quickTo(wrap, "skewX", { duration: 0.5, ease: "power3.out" });
    let lastY = window.scrollY;
    let raf = 0;
    let settle = 0;
    const onScroll = () => {
      // Debounced settle: straighten only once scrolling actually pauses,
      // instead of fighting the live skew on a fixed interval.
      window.clearTimeout(settle);
      settle = window.setTimeout(() => skewTo(0), 140);
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const v = y - lastY;
        lastY = y;
        skewTo(gsap.utils.clamp(-6, 6, v * 0.12));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(settle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <div className="marquee" style={{ ["--marquee-duration" as string]: duration }}>
        <div className="marquee-track">{children}</div>
      </div>
    </div>
  );
}
