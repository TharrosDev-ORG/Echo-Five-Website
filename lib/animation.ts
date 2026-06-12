/**
 * Single GSAP entry point. Import gsap/ScrollTrigger from here only, so the
 * plugin is registered exactly once and every component shares the instance.
 * Client-side only — never import from a server component.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Shared expressive ease — matches the CSS cubic-bezier(0.16, 1, 0.3, 1). */
export const EASE = "expo.out";

export { gsap, ScrollTrigger };
