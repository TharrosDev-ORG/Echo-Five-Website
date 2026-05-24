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
    <section id="top" className="relative pt-28 md:pt-36 overflow-hidden">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-10 items-center pb-16 md:pb-24 pt-10 md:pt-16">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <h1 className="font-display font-extrabold uppercase text-[clamp(2.75rem,8vw,6rem)] leading-[0.94] tracking-[-0.02em] text-ink">
                <span className="block">{COPY.headline[0]}</span>
                <span className="block text-signal">{COPY.headline[1]}</span>
                <span className="block">{COPY.headline[2]}</span>
                <span className="block">{COPY.headline[3]}</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <p className="mt-9 max-w-xl text-lg md:text-xl leading-[1.55] text-ink-muted">
                {COPY.sub}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a
                  href={COPY.primaryCta.href}
                  className="group inline-flex min-h-[44px] items-center gap-3 bg-ink px-7 py-3 text-sm font-medium uppercase tracking-[0.06em] text-paper hover:bg-signal transition-colors"
                >
                  {COPY.primaryCta.label}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href={COPY.secondaryCta.href}
                  className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium uppercase tracking-[0.06em] text-ink hover:text-signal-deep transition-colors"
                >
                  {COPY.secondaryCta.label}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 mt-14 lg:mt-0">
            <ScrollReveal delay={160}>
              <div className="mx-auto w-full max-w-[340px] lg:max-w-none lg:ml-auto lg:mr-0 lg:w-[88%]">
                <EchoVisual />
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={260}>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-keyline border-y border-keyline">
            {COPY.facts.map((item) => (
              <div key={item.k} className="bg-paper px-1 py-7 md:py-8 md:px-6">
                <dt className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                  {item.k}
                </dt>
                <dd className="mt-2 font-display font-bold text-lg md:text-xl tracking-[-0.01em] text-ink">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div>
    </section>
  );
}
