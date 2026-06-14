"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { process as adkar } from "@/lib/content";
import SplitText from "@/components/ui/SplitText";

/**
 * ADKAR centerpiece. The section pins and a horizontal track of the five stages
 * scrubs across as you scroll; each stage lights from dim to full as it reaches
 * centre (scattered → aligned), and a cobalt rail fills with progress. Reduced
 * motion / no-JS get a clean vertical stack with every stage already lit.
 */
export default function Adkar() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const pin = pinRef.current;
    const track = trackRef.current;
    const rail = railRef.current;
    if (!pin || !track || !rail) return;

    const ctx = gsap.context(() => {
      const distance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Rail fills with horizontal progress.
      gsap.fromTo(
        rail,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      // Each stage lights as it crosses centre.
      const stages = track.querySelectorAll<HTMLElement>("[data-stage]");
      stages.forEach((stage) => {
        gsap.fromTo(
          stage,
          { opacity: 0.32 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              containerAnimation: scrollTween,
              start: "left center",
              end: "center center",
              scrub: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="adkar rule-top band-3">
      <div ref={pinRef} className="adkar-pin">
        <div className="u-container adkar-head">
          <div className="mb-6 flex items-center gap-4">
            <span className="index-num">{adkar.index}</span>
            <span className="t-coord">{adkar.kicker}</span>
          </div>
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <SplitText
              as="h2"
              className="t-h2 md:col-span-7"
              text={adkar.heading}
            />
            <p className="t-body md:col-span-5" style={{ color: "var(--color-ink-soft)" }}>
              {adkar.intro}
            </p>
          </div>
        </div>

        <div className="adkar-viewport">
          <div ref={trackRef} className="adkar-track">
            {adkar.stages.map((stage, i) => (
              <article key={i} data-stage className="adkar-stage">
                <div className="adkar-stage-key" aria-hidden="true">
                  {stage.key}
                </div>
                <div className="adkar-stage-meta t-coord">
                  {String(i + 1).padStart(2, "0")} / 05
                </div>
                <h3 className="adkar-stage-name font-display">{stage.name}</h3>
                <p className="t-body" style={{ color: "var(--color-ink-muted)" }}>
                  {stage.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="u-container">
          <div className="adkar-rail" aria-hidden="true">
            <div ref={railRef} data-rail-fill />
          </div>
        </div>
      </div>
    </section>
  );
}
