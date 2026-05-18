import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  label: "About",
  heading: "A practice built for the public sector.",
  body: [
    "Echo-Five is an independent consultancy focused on Microsoft 365 adoption inside government. We work alongside program leads, IT, and operational teams to turn rollouts into the kind of change people actually use — not the kind that gets quietly reverted six months later.",
    "Our work sits at the seam between technology and the people doing the work. Governance, training, communications, and measurement — handled together so adoption holds after the project closes.",
  ],
  stats: [
    { value: "20+", label: "years in public-sector transformation" },
    { value: "M365", label: "specialist focus" },
    { value: "End-to-end", label: "change managed" },
  ],
};

export function About() {
  return (
    <section id="about" className="section-y border-t border-[color:var(--color-rule)]">
      <div className="container-tight grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent-warm)]">
              {COPY.label}
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.01em]">
              {COPY.heading}
            </h2>
          </ScrollReveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
          {COPY.body.map((p, i) => (
            <ScrollReveal key={i} delay={80 * i}>
              <p>{p}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="container-tight mt-20 grid grid-cols-1 md:grid-cols-3 border-t border-[color:var(--color-rule)]">
        {COPY.stats.map((s, i) => (
          <ScrollReveal
            key={s.label}
            delay={80 * i}
            className="px-6 py-10 border-b md:border-b-0 md:border-r last:border-r-0 border-[color:var(--color-rule)]"
          >
            <div className="font-serif text-4xl md:text-5xl tracking-[-0.02em] text-[color:var(--color-ink)]">
              {s.value}
            </div>
            <div className="mt-3 text-sm uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
              {s.label}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
