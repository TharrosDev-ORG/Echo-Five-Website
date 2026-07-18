"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { proof } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * "On the record" — a lazy YouTube facade. We render the poster + a play
 * affordance and only mount the iframe on click, so nothing from YouTube loads
 * (or autoplays) until the visitor chooses to watch. The frame swells to full
 * size as it scrolls into view (scrub; static without JS).
 */
export default function Proof() {
  const [playing, setPlaying] = useState(false);
  const scaleRef = useRef<HTMLDivElement>(null);
  const id = site.video.id;
  const poster = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = scaleRef.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { scale: 0.88 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          end: "top 38%",
          scrub: 0.4,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="proof" className="pad-block-xl rule-top">
      <div className="u-container">
        <div className="mb-10 flex items-center gap-4" data-reveal="fade">
          <span className="index-num">{proof.index}</span>
          <span className="t-coord">{proof.kicker}</span>
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h2 className="t-h2" data-reveal style={{ maxWidth: "16ch" }}>
              {proof.heading}
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="t-body" data-reveal style={{ color: "var(--color-ink-soft)" }}>
              {proof.sub}
            </p>
          </div>
        </div>

        <div ref={scaleRef} className="proof-scale section-gap">
          <div className="proof-frame">
          {playing ? (
            <iframe
              className="proof-media"
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={proof.heading}
              allow="accelerated-encoding; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="proof-poster"
              onClick={() => setPlaying(true)}
              aria-label={`${proof.cta}: ${proof.heading}`}
              data-cursor
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={poster} alt="" aria-hidden="true" loading="lazy" />
              <span className="proof-scrim" aria-hidden="true" />
              <span className="proof-play" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                </svg>
              </span>
              <span className="proof-cta t-coord" aria-hidden="true">
                {proof.cta}
              </span>
            </button>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
