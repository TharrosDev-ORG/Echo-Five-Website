"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** Pull strength (0–1). */
  strength?: number;
};

/**
 * Magnetic wrapper: the child eases toward the pointer while hovered, then
 * springs back on leave. Fine-pointer only; no-op for touch / reduced motion.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.4,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "elastic.out(1, 0.4)" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}
