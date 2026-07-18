"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { process as adkar } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The ADKAR sequence — the site's centerpiece scroll moment. On large screens
 * the section pins and the five stages travel horizontally under a filling
 * progress rail, so the visitor physically scrubs through the sequence the
 * model describes. Everywhere else (small screens, no JS, reduced motion) the
 * stages read as a vertical editorial list: the pin is opt-in and additive,
 * and a failure while wiring it simply leaves the list layout in place.
 */
export default function Adkar() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (min-height: 720px)", () => {
      const panels = Array.from(track.querySelectorAll<HTMLElement>(".adkar-panel"));
      const setActive = (idx: number) => {
        panels.forEach((p, i) => p.classList.toggle("is-active", i === idx));
      };

      section.classList.add("is-pinned");
      track.classList.add("is-horizontal");
      setActive(0);

      try {
        const dist = () =>
          Math.max(0, track.scrollWidth - (track.parentElement?.clientWidth ?? 0));

        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "top top",
            end: () => `+=${Math.max(dist(), 1)}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (fillRef.current) {
                fillRef.current.style.transform = `scaleX(${self.progress})`;
              }
              const idx = Math.min(
                panels.length - 1,
                Math.round(self.progress * (panels.length - 1)),
              );
              setActive(idx);
              if (countRef.current) {
                countRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(panels.length).padStart(2, "0")}`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: "x" });
          panels.forEach((p) => p.classList.remove("is-active"));
          section.classList.remove("is-pinned");
          track.classList.remove("is-horizontal");
        };
      } catch {
        // Wiring failed: fall back to the static vertical list.
        section.classList.remove("is-pinned");
        track.classList.remove("is-horizontal");
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="rule-top band-3">
      <div ref={viewportRef} className="adkar-viewport pad-block-xl">
        <div className="u-container">
          <div className="grid gap-8 md:grid-cols-12 md:gap-16">
            <SectionHeading
              className="md:col-span-6"
              index={adkar.index}
              kicker={adkar.kicker}
              heading={adkar.heading}
            />
            <div className="md:col-span-6 md:self-end">
              <p data-reveal className="t-lead measure-wide">
                {adkar.intro}
              </p>
            </div>
          </div>

          <div className="section-gap">
            <div className="adkar-progress" aria-hidden="true">
              <span className="adkar-progress-count" ref={countRef}>
                01 / {String(adkar.stages.length).padStart(2, "0")}
              </span>
              <span className="adkar-progress-rail">
                <span className="adkar-progress-fill" ref={fillRef} />
              </span>
            </div>

            <ol ref={trackRef} className="adkar-track">
              {adkar.stages.map((stage, i) => (
                <li key={i} data-reveal className="adkar-panel">
                  <span className="adkar-key" aria-hidden="true">
                    {stage.key}
                  </span>
                  <div className="flex flex-col gap-3">
                    <span className="adkar-stage-num">
                      {String(i + 1).padStart(2, "0")} / {String(adkar.stages.length).padStart(2, "0")}
                    </span>
                    <h3 className="adkar-stage-name">{stage.name}</h3>
                    <p className="t-body measure" style={{ color: "var(--color-ink-muted)" }}>
                      {stage.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
