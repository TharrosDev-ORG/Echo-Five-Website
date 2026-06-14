"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";

const LOADED_EVENT = "ef:loaded";

/** Fire the "loaded" signal the hero waits on to start its intro. */
function announceLoaded() {
  document.documentElement.dataset.loaded = "true";
  window.dispatchEvent(new Event(LOADED_EVENT));
}

/**
 * Brief intro: a counter races 0 → 100 while the wordmark holds, then the
 * curtain lifts and the hero takes over. Reduced motion skips the curtain and
 * signals "loaded" immediately so nothing is gated behind motion.
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
      announceLoaded();
      setDone(true);
    };

    if (prefersReducedMotion()) {
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

    const counter = { value: 0 };
    const tl = gsap.timeline({ onComplete: finish });

    tl.to(counter, {
      value: 100,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => {
        count.textContent = String(Math.round(counter.value)).padStart(2, "0");
      },
    })
      .to(root.querySelectorAll("[data-pre]"), {
        yPercent: -120,
        opacity: 0,
        duration: 0.7,
        ease: EASE,
        stagger: 0.05,
      })
      .to(
        root,
        {
          yPercent: -100,
          duration: 0.95,
          ease: EASE,
        },
        "-=0.25",
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
      <div data-pre className="preloader-label">
        {site.name}
      </div>
      <div data-pre className="preloader-count">
        <span ref={countRef}>00</span>
        <span aria-hidden="true">%</span>
      </div>
    </div>
  );
}
