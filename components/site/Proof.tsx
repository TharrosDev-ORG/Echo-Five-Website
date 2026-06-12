"use client";

import { useState } from "react";
import { proof } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * The talk, behind a click-to-load facade so YouTube ships zero bytes
 * until asked for.
 */
export default function Proof() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="proof" className="pad-block-xl rule-top bg-bg" aria-labelledby="proof-heading">
      <div className="u-container">
        <div data-reveal-group className="max-w-3xl">
          <p data-reveal className="t-coord flex items-baseline gap-4 text-ink-muted">
            <span className="text-signal">{proof.index}</span>
            {proof.kicker}
          </p>
          <h2 data-reveal id="proof-heading" className="t-h2 mt-7 text-ink">
            {proof.heading}
          </h2>
          <p data-reveal className="t-lead mt-6">
            {proof.sub}
          </p>
        </div>

        <div data-reveal className="panel-elev relative mt-12 aspect-video overflow-hidden">
          {loaded ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${site.video.id}?autoplay=1`}
              title={proof.heading}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-5"
              aria-label={`${proof.cta}: ${proof.heading}`}
            >
              <span className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="relative flex h-20 w-20 items-center justify-center rounded-full border border-line-strong bg-bg-deep/80 transition-all duration-500 group-hover:border-signal group-hover:shadow-[0_0_50px_-10px_var(--color-signal)]"
              >
                <span className="ml-1 block h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-signal" />
              </span>
              <span className="t-coord relative text-ink-soft transition-colors group-hover:text-signal">
                {proof.cta}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
