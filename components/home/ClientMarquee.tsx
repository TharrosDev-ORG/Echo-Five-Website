"use client";

import Link from "next/link";
import { useState } from "react";
import { clients, ui } from "@/lib/content/shared";
import Arrow from "@/components/ui/Arrow";

const orgs = clients.groups.flatMap((g) => g.orgs);

/**
 * A slow band of client names. Pauses on hover and with its own button
 * (WCAG 2.2.2); stops entirely under reduced motion. Names are listed once
 * for assistive tech; the duplicate track is hidden from it.
 */
export default function ClientMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section aria-labelledby="clients-heading" className="tone-paper border-y border-rule py-14 min-[900px]:py-20">
      <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 id="clients-heading" className="max-w-[34ch] text-h4 text-fg">
          {clients.marqueeHeading}
        </h2>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? ui.marqueePlayLabel : ui.marqueePauseLabel}
            className="label inline-flex min-h-11 items-center gap-2 text-fg-2 hover:text-fg motion-reduce:hidden"
          >
            <span aria-hidden="true" className="inline-flex h-3 w-3 items-center justify-center gap-[3px]">
              {paused ? (
                <svg viewBox="0 0 10 10" className="h-2.5 w-2.5"><path d="M2 1l7 4-7 4z" fill="currentColor" /></svg>
              ) : (
                <>
                  <span className="h-2.5 w-[3px] bg-current" />
                  <span className="h-2.5 w-[3px] bg-current" />
                </>
              )}
            </span>
            {paused ? ui.marqueePlay : ui.marqueePause}
          </button>
          <Link href="/about#clients" className="inline-flex items-center gap-1.5 text-small font-medium text-fg">
            <span className="link">{clients.fullListLink}</span>
            <Arrow />
          </Link>
        </div>
      </div>

      <div className="marquee" data-paused={paused ? "true" : "false"}>
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee-track" aria-hidden={copy === 1 ? true : undefined}>
            {orgs.map((o) => (
              <li key={o.short} className="flex flex-none items-baseline gap-3 whitespace-nowrap">
                <abbr
                  title={o.name}
                  className="serif text-[clamp(2.25rem,1.6rem+2.6vw,4rem)] leading-none tracking-[-0.02em] text-fg no-underline"
                >
                  {o.short}
                </abbr>
                {o.short !== o.name && (
                  <span className="label hidden max-w-[16ch] whitespace-normal text-fg-3 min-[900px]:inline">
                    {o.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
