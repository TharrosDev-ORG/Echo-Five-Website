import { ScrollReveal } from "@/components/ScrollReveal";
import { EchoVisual } from "@/components/EchoVisual";

const COPY = {
  headline: ["Change that", "lands.", "Tools that", "get used."],
  sub: "Echo-Five helps government teams adopt Microsoft 365 with strategies that move people, not just systems. Twenty years of public-sector experience, distilled into engagements that ship.",
  primaryCta: { label: "Get in touch", href: "#contact" },
  secondaryCta: { label: "See how we work", href: "#approach" },
  facts: [
    { k: "Focus", v: "M365 adoption" },
    { k: "Sector", v: "Government" },
    { k: "Method", v: "Prosci-aligned" },
    { k: "Based", v: "Ottawa, ON" },
  ],
};

export function Hero() {
  return (
    <section id="top" className="relative min-h-svh bg-ink flex flex-col overflow-hidden">
      {/* EchoVisual — right-side decorative motif */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[clamp(380px,50vmin,600px)] h-[clamp(380px,50vmin,600px)] opacity-[0.13] pointer-events-none"
        aria-hidden="true"
      >
        <EchoVisual theme="dark" />
      </div>

      {/* Headline + body + CTAs — flex-1 pushes fact strip to bottom */}
      <div className="container-tight flex-1 flex flex-col justify-center pt-28 pb-14">
        <ScrollReveal>
          <h1 className="font-display font-extrabold uppercase text-[clamp(3rem,9.5vw,7.5rem)] leading-[0.88] tracking-[-0.025em] text-paper">
            <span className="block">{COPY.headline[0]}</span>
            <span className="block text-signal">{COPY.headline[1]}</span>
            <span className="block">{COPY.headline[2]}</span>
            <span className="block text-signal">{COPY.headline[3]}</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={110}>
          <p className="mt-10 max-w-lg text-lg md:text-xl leading-[1.6] text-paper/65">
            {COPY.sub}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={COPY.primaryCta.href}
              className="group inline-flex min-h-[44px] items-center gap-3 bg-paper px-7 py-3 text-sm font-medium uppercase tracking-[0.06em] text-ink hover:bg-signal hover:text-paper transition-colors"
            >
              {COPY.primaryCta.label}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={COPY.secondaryCta.href}
              className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium uppercase tracking-[0.06em] text-paper/60 hover:text-paper transition-colors"
            >
              {COPY.secondaryCta.label}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Fact strip pinned to bottom of hero */}
      <div className="border-t border-paper/10">
        <div className="container-tight">
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-paper/10">
            {COPY.facts.map((item) => (
              <div key={item.k} className="px-5 py-6 md:px-6 md:py-7">
                <dt className="text-[11px] uppercase tracking-[0.22em] text-paper/40">
                  {item.k}
                </dt>
                <dd className="mt-2 font-display font-bold text-base md:text-lg tracking-[-0.01em] text-paper">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
