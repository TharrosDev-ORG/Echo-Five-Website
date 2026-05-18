import { ScrollReveal } from "@/components/ScrollReveal";
import { EchoRipple } from "@/components/EchoRipple";

const COPY = {
  eyebrow: "Change Management · Microsoft 365 · Public Sector",
  headline: "Change that lands.\nTools that get used.",
  sub:
    "Echo-Five helps government teams adopt Microsoft 365 with strategies that move people, not just systems. Twenty years of public-sector experience, distilled into engagements that ship.",
  primaryCta: { label: "Get in touch", href: "#contact" },
  secondaryCta: { label: "See how we work", href: "#approach" },
};

export function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-40 section-y overflow-hidden">
      <div className="container-tight">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-8 lg:col-span-7">
            <ScrollReveal>
              <p className="text-[11px] md:text-xs uppercase tracking-[0.32em] text-[color:var(--color-accent-warm)] mb-7">
                {COPY.eyebrow}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h1 className="font-serif font-light text-[clamp(2.5rem,7vw,5.25rem)] leading-[1.02] tracking-[-0.02em] text-[color:var(--color-ink)] whitespace-pre-line max-w-[18ch]">
                {COPY.headline}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="mt-10 max-w-xl text-lg md:text-[1.2rem] leading-[1.55] text-[color:var(--color-ink-muted)]">
                {COPY.sub}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <div className="mt-12 flex flex-wrap items-center gap-5">
                <a
                  href={COPY.primaryCta.href}
                  className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--color-ink)] px-6 py-3.5 text-sm text-[color:var(--color-bg)] hover:bg-[color:var(--color-accent)] transition-colors"
                >
                  {COPY.primaryCta.label}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <a
                  href={COPY.secondaryCta.href}
                  className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] transition-colors"
                >
                  {COPY.secondaryCta.label}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="hidden md:flex md:col-span-4 lg:col-span-5 items-center justify-end">
            <ScrollReveal delay={120} className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-full border border-[color:var(--color-rule)] opacity-50"
              />
              <EchoRipple size={320} className="relative" />
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={320}>
          <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--color-rule)] border-y border-[color:var(--color-rule)]">
            {[
              { k: "Focus", v: "M365 adoption" },
              { k: "Sector", v: "Government" },
              { k: "Method", v: "Prosci-aligned" },
              { k: "Based", v: "Ottawa, ON" },
            ].map((item) => (
              <div
                key={item.k}
                className="bg-[color:var(--color-bg)] px-5 py-6"
              >
                <div className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-ink-muted)]">
                  {item.k}
                </div>
                <div className="mt-2 font-serif text-base md:text-lg text-[color:var(--color-ink)]">
                  {item.v}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
