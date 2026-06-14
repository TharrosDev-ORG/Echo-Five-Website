/**
 * Single GSAP entry point. Import gsap / ScrollTrigger from here ONLY, so the
 * plugin is registered exactly once and every component shares one instance.
 * Client-side only — never import from a server component.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Expressive ease shared across the site (matches CSS cubic-bezier(0.16,1,0.3,1)). */
export const EASE = "expo.out";
export const EASE_SOFT = "power3.out";

/** True when the visitor prefers reduced motion (guarded for SSR). */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };
