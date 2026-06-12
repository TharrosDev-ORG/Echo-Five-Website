"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE } from "@/lib/animation";
import { contact } from "@/lib/content";

/**
 * Slim persistent ask. Slides in once the hero is passed, retreats when
 * the contact section arrives (the real CTA takes over). Stays hidden
 * under reduced motion — nav and contact already carry the action.
 */
export default function StickyCTA() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(el, { yPercent: 130 });
      let shown = false;

      const update = () => {
        const pastHero = window.scrollY > window.innerHeight * 0.9;
        const contactEl = document.getElementById("contact");
        const contactNear = contactEl
          ? contactEl.getBoundingClientRect().top < window.innerHeight * 0.85
          : false;
        const next = pastHero && !contactNear;
        if (next !== shown) {
          shown = next;
          gsap.to(el, { yPercent: next ? 0 : 130, duration: 0.6, ease: EASE, overwrite: true });
        }
      };

      update();
      window.addEventListener("scroll", update, { passive: true });
      return () => window.removeEventListener("scroll", update);
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
      style={{ transform: "translateY(130%)" }}
    >
      <a
        href="#contact"
        className="btn btn-primary pointer-events-auto shadow-[0_18px_50px_-18px_var(--color-signal)]"
      >
        {contact.cta}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
