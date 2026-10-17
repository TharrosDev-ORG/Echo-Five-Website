"use client";

import { useState } from "react";
import { talk } from "@/lib/content/shared";
import Index from "@/components/ui/Index";
import Arrow from "@/components/ui/Arrow";

/**
 * The conference talk. A click-to-load facade: nothing from YouTube loads
 * until the visitor asks for it, and the player uses youtube-nocookie.
 */
export default function Talk({ n }: { n?: string }) {
  const [playing, setPlaying] = useState(false);
  const { id, url } = talk.video;

  return (
    <section aria-labelledby="talk-heading" className="tone-paper band">
      <div className="wrap">
        <div className="grid gap-12 min-[1200px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[1200px]:items-end">
          <div>
            <Index n={n}>{talk.index}</Index>
            <p className="label mt-8 text-fg-3">{talk.venue}</p>
            <h2 id="talk-heading" className="serif mt-4 text-h2" data-reveal="">
              {talk.heading}
            </h2>
            <p className="mt-6 max-w-[32rem] text-lead text-fg-2" data-reveal="">
              {talk.sub}
            </p>
            <a
              href={url}
              rel="noopener"
              className="mt-8 inline-flex items-center gap-1.5 text-small font-medium text-fg"
            >
              <span className="link">{talk.openLabel}</span>
              <Arrow dir="up-right" />
            </a>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-[0.75rem] bg-ink" data-reveal="">
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                title={talk.heading}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 flex h-full w-full items-end text-left"
                aria-label={`${talk.cta}: ${talk.heading}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale transition duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03] group-hover:opacity-90 group-hover:grayscale-0"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <span className="relative flex w-full items-center justify-between gap-4 p-6 text-white min-[900px]:p-8">
                  <span className="serif text-h4 min-[900px]:text-h3">{talk.cta}</span>
                  <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 min-[900px]:h-20 min-[900px]:w-20">
                    <svg viewBox="0 0 20 20" className="ml-1 h-5 w-5" aria-hidden="true">
                      <path d="M5 3.5v13l11-6.5z" fill="currentColor" />
                    </svg>
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
