"use client";

import { useState } from "react";
import SectionMark from "@/components/site/SectionMark";
import { proof } from "@/lib/content";
import { site } from "@/lib/site";

export default function Proof() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="proof" className="rule-top pad-block-2xl">
      <div className="u-container">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionMark index={proof.index} kicker={proof.kicker} className="justify-center" />
          <h2 className="t-h2 mt-9 max-w-[20ch] text-balance">{proof.heading}</h2>
          <p className="t-lead mt-8 max-w-[52ch] text-pretty">{proof.sub}</p>
        </div>

        <div className="panel-elev relative mt-16 overflow-hidden">
          <div className="relative aspect-video">
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${site.video.id}?autoplay=1&rel=0`}
                title={proof.heading}
                allow="accelerated-encoding; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 flex flex-col items-center justify-center"
                aria-label={`Play video: ${proof.heading}`}
              >
                <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-line-signal bg-bg/60 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:scale-110">
                  <svg width="22" height="26" viewBox="0 0 22 26" aria-hidden="true">
                    <path d="M0 0L22 13L0 26Z" fill="var(--color-signal)" />
                  </svg>
                </span>
                <span className="relative mt-7 font-mono text-[0.8rem] tracking-[0.08em] text-ink-muted">
                  {proof.cta} · GOC M365 Council
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
