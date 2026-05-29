"use client";

import { motion, useReducedMotion } from "framer-motion";
import RadarHero from "@/components/motif/RadarHero";
import { hero } from "@/lib/content";
import { mailtoBook } from "@/lib/site";

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

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

      <motion.div
        className="u-container w-full pt-32 pb-24"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="t-label text-signal flex flex-wrap items-center gap-x-3 gap-y-1.5 leading-relaxed tracking-[0.16em]"
        >
          <span>{hero.eyebrow}</span>
          <span className="text-muted-on-dark opacity-60">/</span>
          <span className="text-muted-on-dark">{hero.context}</span>
        </motion.p>

        <motion.h1 variants={item} className="t-display mt-8 max-w-[16ch]">
          {hero.headline[0]}
          <br />
          <span className="text-signal">{hero.headline[1]}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="t-lead mt-9 max-w-[46ch] text-muted-on-dark"
        >
          {hero.sub}
        </motion.p>

        <motion.div variants={item} className="mt-11 flex flex-wrap gap-3.5">
          <a href={mailtoBook} className="btn btn-primary">
            Book a conversation
          </a>
          <a href="#proof" className="btn btn-on-dark">
            Watch the SSC adoption story
          </a>
        </motion.div>

        <motion.ul
          variants={item}
          className="mt-16 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line-dark pt-7 font-mono text-[0.76rem] tracking-[0.04em] text-muted-on-dark"
        >
          {hero.trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="text-signal">·</span>
              {t}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
