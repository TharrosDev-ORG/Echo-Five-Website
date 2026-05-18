import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  marker: "02",
  label: "Services",
  heading: "Three engagements. One outcome — adoption that holds.",
  services: [
    {
      title: "Microsoft 365 Adoption",
      body:
        "Readiness assessments, deployment planning, and governance design for Teams, SharePoint, and the wider M365 stack — sized to how public-sector teams actually work.",
      points: [
        "Readiness & impact assessment",
        "Tenant and governance design",
        "Phased deployment planning",
      ],
    },
    {
      title: "Change Management Strategy",
      body:
        "Stakeholder engagement, communications, and measurement built on Prosci-aligned frameworks — adapted for the realities of government delivery cycles.",
      points: [
        "Stakeholder mapping",
        "Communications planning",
        "Adoption KPIs and reporting",
      ],
    },
    {
      title: "Training & Enablement",
      body:
        "Role-based training, champion programs, and sustainment plans that keep momentum long after the rollout team leaves.",
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
    <section
      id="services"
      className="section-y border-t border-[color:var(--color-rule)]"
    >
      <div className="container-tight">
        <ScrollReveal>
          <div className="flex items-baseline gap-4">
            <span className="font-serif text-[color:var(--color-accent-warm)] text-base">
              {COPY.marker}
            </span>
            <span className="text-[10px] uppercase tracking-[0.32em] text-[color:var(--color-ink-muted)]">
              {COPY.label}
            </span>
          </div>
          <h2 className="mt-6 font-serif font-light text-[clamp(2.1rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.015em] max-w-[22ch]">
            {COPY.heading}
          </h2>
        </ScrollReveal>

        <div className="mt-16 md:mt-20 grid gap-px bg-[color:var(--color-rule)] border border-[color:var(--color-rule)] md:grid-cols-3">
          {COPY.services.map((s, i) => (
            <ScrollReveal
              key={s.title}
              delay={80 * i}
              className="bg-[color:var(--color-surface)] p-8 md:p-10 flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-8">
                <span className="font-serif italic text-[color:var(--color-accent-warm)] text-2xl">
                  0{i + 1}
                </span>
                <span className="h-px w-12 bg-[color:var(--color-rule)]" />
              </div>
              <h3 className="font-serif font-light text-[1.6rem] md:text-[1.75rem] leading-[1.15] tracking-[-0.01em] text-[color:var(--color-ink)]">
                {s.title}
              </h3>
              <p className="mt-5 text-[color:var(--color-ink-muted)] leading-[1.6]">
                {s.body}
              </p>
              <ul className="mt-8 space-y-3 text-sm text-[color:var(--color-ink)]">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 items-baseline">
                    <span
                      aria-hidden="true"
                      className="font-serif italic text-[color:var(--color-accent-warm)] text-xs"
                    >
                      +
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
