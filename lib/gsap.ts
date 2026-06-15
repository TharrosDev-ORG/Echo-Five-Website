/**
 * Single GSAP entry point. Import gsap from here so every component shares one
 * instance. Reveals run on IntersectionObserver and the progress bar / scrollspy
 * on native scroll, so no ScrollTrigger plugin is needed.
 * Client-side only — never import from a server component.
 */
import gsap from "gsap";

/** Expressive ease shared across the site (matches CSS cubic-bezier(0.16,1,0.3,1)). */
export const EASE = "expo.out";
export const EASE_SOFT = "power3.out";

/** True when the visitor prefers reduced motion (guarded for SSR). */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap };
