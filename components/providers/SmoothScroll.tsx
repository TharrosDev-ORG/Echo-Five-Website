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
 * Drives one rAF loop: Lenis smooth scroll synced to GSAP's ticker, with
 * ScrollTrigger updated from Lenis's scroll event. This keeps WebGL, reveals,
 * and pinning on a single, jank-free clock. Reduced-motion visitors get native
 * scroll (no Lenis) and ScrollTrigger still works off the default scroller.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch reads better than synthetic on mobile.
      syncTouch: false,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.lagSmoothing(0);
    let tickerAdded = false;

    // Hold scroll until the preloader lifts, then hand off: start the rAF loop
    // only now (no scroll loop burns CPU behind the curtain), re-measure, and
    // honour any incoming deep link (e.g. /#contact).
    lenis.stop();
    const start = () => {
      if (!tickerAdded) {
        gsap.ticker.add(raf);
        tickerAdded = true;
      }
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

    // Re-measure once pins/splits settle.
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(() => requestAnimationFrame(refresh));

    // Fonts swap in after first paint (display: swap) and reflow the big
    // headings — refresh so trigger positions don't go stale (the cause of
    // reveals firing late or never).
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      window.removeEventListener("ef:loaded", start);
      window.removeEventListener("hashchange", onHashChange);
      lenis.off("scroll", onScroll);
      if (tickerAdded) gsap.ticker.remove(raf);
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
