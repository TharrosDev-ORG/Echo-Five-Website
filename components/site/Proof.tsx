"use client";

import { useState } from "react";
import EchoSignal from "@/components/motif/EchoSignal";
import SectionMark from "@/components/site/SectionMark";
import { proof } from "@/lib/content";
import { site } from "@/lib/site";

export default function Proof() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="proof" className="section-pad bg-paper-alt">
      <div className="u-container">
        <div className="grid items-end gap-x-12 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionMark index={proof.index} kicker={proof.kicker} />
            <h2 className="t-h2 mt-6 max-w-[20ch] text-balance">{proof.heading}</h2>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="t-body text-muted measure-wide">{proof.sub}</p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden border border-line bg-ink-deep">
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
                className="group absolute inset-0 flex flex-col items-center justify-center text-paper"
                aria-label={`Play video: ${proof.heading}`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-60">
                  <EchoSignal tone="signal" className="h-full w-full" />
                </div>
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-line-dark bg-ink-deep/60 transition-transform duration-500 ease-out group-hover:scale-110">
                  <svg width="22" height="26" viewBox="0 0 22 26" aria-hidden="true">
                    <path d="M0 0L22 13L0 26Z" fill="var(--color-signal)" />
                  </svg>
                </span>
                <span className="relative mt-6 font-mono text-[0.8rem] tracking-[0.08em] text-muted-on-dark">
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
