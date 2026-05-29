import type { CSSProperties } from "react";
import RadarHero from "@/components/motif/RadarHero";
import { hero } from "@/lib/content";
import { mailtoBook } from "@/lib/site";

/** Staggered load entrance via CSS (see `.hero-rise` in globals.css). */
const rise = (delay: number) => ({ "--rise-delay": `${delay}s` }) as CSSProperties;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-ink-deep text-paper"
    >
      {/* Live radar motif */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <RadarHero className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink-deep via-ink-deep/80 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0 -z-10" />

      <div className="u-container w-full pt-32 pb-24">
        <p
          className="hero-rise t-label text-signal flex flex-wrap items-center gap-x-3 gap-y-1.5 leading-relaxed tracking-[0.16em]"
          style={rise(0.05)}
        >
          <span>{hero.eyebrow}</span>
          <span className="text-muted-on-dark opacity-60">/</span>
          <span className="text-muted-on-dark">{hero.context}</span>
        </p>

        <h1 className="hero-rise t-display mt-8 max-w-[16ch]" style={rise(0.14)}>
          {hero.headline[0]}
          <br />
          <span className="text-signal">{hero.headline[1]}</span>
        </h1>

        <p className="hero-rise t-lead mt-9 max-w-[46ch] text-muted-on-dark" style={rise(0.23)}>
          {hero.sub}
        </p>

        <div className="hero-rise mt-11 flex flex-wrap gap-3.5" style={rise(0.32)}>
          <a href={mailtoBook} className="btn btn-primary">
            Book a conversation
          </a>
          <a href="#proof" className="btn btn-on-dark">
            Watch the SSC adoption story
          </a>
        </div>

        <ul
          className="hero-rise mt-16 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line-dark pt-7 font-mono text-[0.76rem] tracking-[0.04em] text-muted-on-dark"
          style={rise(0.41)}
        >
          {hero.trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="text-signal">·</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
