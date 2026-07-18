"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";

const LOADED_EVENT = "ef:loaded";
const WORD = "Echofive";

/** Fire the "loaded" signal the hero waits on to start its intro. */
function announceLoaded() {
  document.documentElement.dataset.loaded = "true";
  window.dispatchEvent(new Event(LOADED_EVENT));
}

/**
 * Intro: the wordmark rises letter by letter while a counter races 0 → 100,
 * then the letters exit upward and the paper curtain lifts with a cobalt flash
 * chasing it. Reduced motion skips the curtain and signals "loaded" immediately
 * so nothing is gated behind motion.
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.documentElement.style.overflow = "";
      try {
        sessionStorage.setItem("ef:intro", "1");
      } catch {}
      announceLoaded();
      setDone(true);
    };

    // The intro plays once per session: returning within the same tab goes
    // straight to the page.
    let seen = false;
    try {
      seen = sessionStorage.getItem("ef:intro") === "1";
    } catch {}
    if (seen || prefersReducedMotion()) {
      finish();
      return;
    }

    const root = rootRef.current;
    const count = countRef.current;
    if (!root || !count) {
      finish();
      return;
    }

    // Lock scroll during the intro.
    document.documentElement.style.overflow = "hidden";

    // Safety net: if the GSAP ticker stalls (e.g. the tab is backgrounded during
    // load and rAF pauses), never leave the curtain blocking the page.
    const safety = window.setTimeout(finish, 6000);

    const chars = root.querySelectorAll<HTMLElement>(".pre-char > span");
    const flash = root.querySelector<HTMLElement>(".preloader-flash");
    const counter = { value: 0 };
    const tl = gsap.timeline({ onComplete: finish });

    // Own the start state explicitly (the CSS transform is only a pre-paint
    // guard; GSAP percent transforms need to be set by GSAP, and `y: 0`
    // clears the pixel offset parsed from the stylesheet transform).
    gsap.set(chars, { y: 0, yPercent: 110 });

    tl.to(chars, {
      yPercent: 0,
      duration: 0.8,
      ease: EASE,
      stagger: 0.045,
    })
      .to(
        counter,
        {
          value: 100,
          duration: 0.95,
          ease: "power2.inOut",
          onUpdate: () => {
            count.textContent = String(Math.round(counter.value)).padStart(2, "0");
          },
        },
        "<+0.1",
      )
      .to(chars, {
        yPercent: -120,
        duration: 0.55,
        ease: "power3.in",
        stagger: 0.025,
      })
      .to(
        root.querySelectorAll("[data-pre]"),
        {
          yPercent: -120,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
          stagger: 0.05,
        },
        "<",
      )
      .to(
        flash,
        { yPercent: -100, duration: 0.8, ease: EASE },
        "-=0.2",
      )
      .to(
        root,
        { yPercent: -100, duration: 0.85, ease: EASE },
        "<+0.08",
      );

    return () => {
      window.clearTimeout(safety);
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="preloader" data-done={done} aria-hidden="true">
      <div className="preloader-flash" />
      <div className="preloader-word">
        {/* Letters start below their masks (translateY 110%) and rise in. */}
        {WORD.split("").map((ch, i) => (
          <span key={i} className="pre-char">
            <span style={i >= WORD.length - 4 ? { color: "var(--color-cobalt)" } : undefined}>
              {ch}
            </span>
          </span>
        ))}
      </div>
      <div className="preloader-inner">
        <div data-pre className="preloader-label">
          {site.tagline}
        </div>
        <div data-pre className="preloader-count">
          <span ref={countRef}>00</span>
        </div>
      </div>
    </div>
  );
}
