import type { CSSProperties } from "react";
import SignalField from "@/components/motif/SignalField";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";

/** Staggered load entrance via CSS (see `.hero-rise` in globals.css). */
const rise = (delay: number) => ({ "--rise-delay": `${delay}s` }) as CSSProperties;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-20"
    >
      {/* Living backdrop: instrument grid + signal field + grain */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <SignalField className="absolute inset-0 h-full w-full opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-transparent to-bg" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="u-container w-full">
        <div className="hero-rise flex flex-wrap items-center gap-x-3 gap-y-1.5" style={rise(0)}>
          <span className="status-dot" aria-hidden="true" />
          <span className="t-coord text-signal">{site.callsign} // CH.00</span>
          <span className="t-coord text-ink-muted">{hero.context}</span>
        </div>

        <p className="hero-rise mt-8 t-coord text-ink-muted" style={rise(0.06)}>
          {hero.eyebrow}
        </p>

        <h1 className="t-display mt-5 max-w-[16ch]">
          <span className="hero-rise block" style={rise(0.12)}>
            {hero.headline[0]}
          </span>
          <span className="hero-rise block text-signal" style={rise(0.2)}>
            {hero.headline[1]}
          </span>
        </h1>

        <p className="hero-rise t-lead mt-9 measure-wide" style={rise(0.3)}>
          {hero.sub}
        </p>

        <div className="hero-rise mt-11 flex flex-wrap items-center gap-4" style={rise(0.4)}>
          <a href="#contact" className="btn btn-primary">
            Book a conversation
          </a>
          <a href="#proof" className="btn btn-ghost">
            Watch the talk
          </a>
        </div>

        <ul
          className="hero-rise mt-14 flex flex-wrap gap-2.5"
          style={rise(0.5)}
          aria-label="Credentials at a glance"
        >
          {hero.trust.map((t) => (
            <li
              key={t}
              className="panel px-3.5 py-2 font-mono text-[0.74rem] tracking-[0.04em] text-ink-soft"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
