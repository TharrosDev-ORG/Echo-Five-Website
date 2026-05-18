import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  label: "Services",
  heading: "Three engagements. One outcome — adoption that holds.",
  services: [
    {
      title: "Microsoft 365 Adoption",
      body:
        "Readiness assessments, deployment planning, and governance design for Teams, SharePoint, and the wider M365 stack. Rolled out in a way that fits how public-sector teams actually work.",
      points: [
        "Readiness & impact assessment",
        "Tenant and governance design",
        "Phased deployment planning",
      ],
    },
    {
      title: "Change Management Strategy",
      body:
        "Stakeholder engagement, communications, and measurement built around Prosci-aligned change frameworks — adapted for the realities of government delivery cycles.",
      points: ["Stakeholder mapping", "Communications planning", "Adoption KPIs and reporting"],
    },
    {
      title: "Training & Enablement",
      body:
        "Role-based training, champions programs, and sustainment plans that keep momentum after the rollout team leaves.",
      points: ["Role-based curriculum", "Champion network design", "Sustainment & reinforcement"],
    },
  ],
};

export function Services() {
  return (
    <section id="services" className="section-y border-t border-[color:var(--color-rule)]">
      <div className="container-tight">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent-warm)]">
            {COPY.label}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.01em] max-w-3xl">
            {COPY.heading}
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-px bg-[color:var(--color-rule)] border border-[color:var(--color-rule)] md:grid-cols-3">
          {COPY.services.map((s, i) => (
            <ScrollReveal
              key={s.title}
              delay={80 * i}
              className="bg-[color:var(--color-surface)] p-8 md:p-10 flex flex-col"
            >
              <div className="font-serif text-sm text-[color:var(--color-accent-warm)] mb-6">
                0{i + 1}
              </div>
              <h3 className="font-serif text-2xl leading-snug text-[color:var(--color-ink)]">
                {s.title}
              </h3>
              <p className="mt-4 text-[color:var(--color-ink-muted)] leading-relaxed">{s.body}</p>
              <ul className="mt-6 space-y-2 text-sm text-[color:var(--color-ink-muted)]">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-px w-4 bg-[color:var(--color-accent-warm)]" />
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
