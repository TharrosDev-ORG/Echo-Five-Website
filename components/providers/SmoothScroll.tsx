"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type ScrollToTarget = string | number | HTMLElement;
type LenisContextValue = {
  scrollTo: (target: ScrollToTarget, options?: { offset?: number }) => void;
  ready: boolean;
};

const LenisContext = createContext<LenisContextValue>({
  scrollTo: () => {},
  ready: false,
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
  const [ready, setReady] = useState(false);

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
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Hold scroll until the preloader lifts, then hand off.
    lenis.stop();
    const start = () => lenis.start();
    const loadedAlready = document.documentElement.dataset.loaded === "true";
    if (loadedAlready) start();
    else window.addEventListener("ef:loaded", start, { once: true });

    // Re-measure once pins/splits settle.
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(() => requestAnimationFrame(refresh));

    setReady(true);

    return () => {
      window.removeEventListener("ef:loaded", start);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      setReady(false);
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

  return (
    <LenisContext.Provider value={{ scrollTo, ready }}>
      {children}
    </LenisContext.Provider>
  );
}
