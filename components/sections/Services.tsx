import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  index: "02",
  heading: "Three engagements. One outcome: adoption that holds.",
  services: [
    {
      title: "Microsoft 365 Adoption",
      body: "Readiness assessments, deployment planning, and governance design for Teams, SharePoint, and the wider M365 stack, sized to how public-sector teams actually work.",
      points: [
        "Readiness & impact assessment",
        "Tenant and governance design",
        "Phased deployment planning",
      ],
    },
    {
      title: "Change Management Strategy",
      body: "Stakeholder engagement, communications, and measurement built on Prosci-aligned frameworks, adapted for the realities of government delivery cycles.",
      points: [
        "Stakeholder mapping",
        "Communications planning",
        "Adoption KPIs and reporting",
      ],
    },
    {
      title: "Training & Enablement",
      body: "Role-based training, champion programs, and sustainment plans that keep momentum long after the rollout team leaves.",
      points: [
        "Role-based curriculum",
        "Champion network design",
        "Sustainment & reinforcement",
      ],
    },
  ],
};

export function Services() {
  return (
    <section id="services" className="section-y border-t border-keyline">
      <div className="container-tight">
        <ScrollReveal>
          <span className="font-display font-bold text-signal text-sm tracking-[0.1em]">
            {COPY.index}
          </span>
          <h2 className="mt-5 font-display font-bold uppercase text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.98] tracking-[-0.02em] max-w-[20ch] text-ink">
            {COPY.heading}
          </h2>
        </ScrollReveal>

        {/* Numbered ledger: full-width rows divided by keylines, not a card grid. */}
        <div className="mt-14 md:mt-20">
          {COPY.services.map((s, i) => (
            <ScrollReveal key={s.title} delay={60 * i}>
              <article className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-5 border-t border-keyline py-9 md:py-12 last:border-b group">
                <div className="md:col-span-2">
                  <span className="font-display font-extrabold text-5xl md:text-6xl leading-none tracking-[-0.03em] text-keyline group-hover:text-signal transition-colors">
                    0{i + 1}
                  </span>
                </div>
                <div className="md:col-span-6">
                  <h3 className="font-display font-bold uppercase text-2xl md:text-[1.85rem] leading-[1.05] tracking-[-0.015em] text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base md:text-lg leading-[1.6] text-ink-muted">
                    {s.body}
                  </p>
                </div>
                <ul className="md:col-span-4 space-y-3 text-sm text-ink md:pt-1">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-baseline gap-3 border-b border-keyline pb-3">
                      <span aria-hidden="true" className="text-signal font-bold">+</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
