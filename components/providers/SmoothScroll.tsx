"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type ScrollToTarget = string | number | HTMLElement;
type LenisContextValue = {
  scrollTo: (target: ScrollToTarget, options?: { offset?: number }) => void;
  stop: () => void;
  start: () => void;
};

const LenisContext = createContext<LenisContextValue>({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(LenisContext);

/**
 * Lenis smooth scroll on the GSAP ticker (one rAF loop). Reveals and the
 * progress bar run on IntersectionObserver / native scroll, so they don't
 * depend on this — Lenis is purely the smoothing layer. Reduced-motion visitors
 * get native scroll (no Lenis).
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch reads better than synthetic on mobile.
      syncTouch: false,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger's scrub effects in step with the smoothed scroll, and
    // re-measure once everything above the fold has settled (fonts + preloader).
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    // Hold scroll until the preloader lifts, then hand off + honour any incoming
    // deep link (e.g. /#contact). The rAF loop runs from mount so Lenis is never
    // left half-initialised.
    lenis.stop();
    const start = () => {
      lenis.start();
      ScrollTrigger.refresh();
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        requestAnimationFrame(() => lenis.scrollTo(hash, { offset: -72 }));
      }
    };
    const loadedAlready = document.documentElement.dataset.loaded === "true";
    if (loadedAlready) start();
    else window.addEventListener("ef:loaded", start, { once: true });

    // Same-page hash navigation after load.
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) lenis.scrollTo(hash, { offset: -72 });
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("ef:loaded", start);
      window.removeEventListener("hashchange", onHashChange);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo: LenisContextValue["scrollTo"] = (target, options) => {
    const offset = options?.offset ?? -72;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.25 });
      return;
    }
    // Reduced-motion / pre-ready fallback.
    const el =
      typeof target === "string" ? document.querySelector(target) : null;
    if (el instanceof HTMLElement) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  const stop = () => {
    const lenis = lenisRef.current;
    if (lenis) lenis.stop();
    else document.documentElement.style.overflow = "hidden";
  };
  const start = () => {
    const lenis = lenisRef.current;
    if (lenis) lenis.start();
    else document.documentElement.style.overflow = "";
  };

  return (
    <LenisContext.Provider value={{ scrollTo, stop, start }}>
      {children}
    </LenisContext.Provider>
  );
}
