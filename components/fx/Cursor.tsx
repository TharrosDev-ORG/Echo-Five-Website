"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Additive custom cursor (dot + trailing ring) for fine-pointer devices. The
 * ring grows over interactive targets. Uses mix-blend-mode: difference, so it
 * reads on both bone paper and cobalt without color logic. Touch / reduced
 * motion get the native cursor (component renders nothing useful and CSS hides).
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("cursor-ready", "fine-pointer");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    // Stay hidden until the pointer's position is actually known; otherwise the
    // ring sits in the top-left corner and then eases in from (0, 0).
    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      if (!shown) {
        shown = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        document.body.classList.add("cursor-visible");
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const interactiveSel = "a, button, [data-cursor], input, textarea, label";
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest(interactiveSel)) ring.classList.add("is-hover");
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest(interactiveSel)) ring.classList.remove("is-hover");
    };

    // Hide when the pointer leaves the window (relatedTarget is null only then).
    const onWindowOut = (e: PointerEvent) => {
      if (e.relatedTarget) return;
      shown = false;
      document.body.classList.remove("cursor-visible");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("pointerout", onWindowOut, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerout", onWindowOut);
      document.body.classList.remove("cursor-ready", "fine-pointer", "cursor-visible");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
