import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  eyebrow: "Change management · Microsoft 365 · Public Sector",
  headline: "Change that lands.\nTools that get used.",
  sub:
    "Echo-Five helps government teams adopt Microsoft 365 with strategies that move people, not just systems. Twenty years of public-sector experience, distilled into engagements that ship.",
  primaryCta: { label: "Get in touch", href: "#contact" },
  secondaryCta: { label: "See how we work", href: "#approach" },
};

export function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-44 section-y">
      <div className="container-tight">
        <ScrollReveal>
          <p className="text-xs md:text-sm uppercase tracking-[0.28em] text-[color:var(--color-accent-warm)] mb-6">
            {COPY.eyebrow}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h1 className="font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.04] tracking-[-0.01em] text-[color:var(--color-ink)] whitespace-pre-line max-w-4xl">
            {COPY.headline}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-[color:var(--color-ink-muted)]">
            {COPY.sub}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={COPY.primaryCta.href}
              className="inline-flex items-center rounded-full bg-[color:var(--color-ink)] px-6 py-3 text-sm text-[color:var(--color-bg)] hover:bg-[color:var(--color-accent)] transition-colors"
            >
              {COPY.primaryCta.label}
            </a>
            <a
              href={COPY.secondaryCta.href}
              className="inline-flex items-center text-sm text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] transition-colors"
            >
              {COPY.secondaryCta.label} →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
