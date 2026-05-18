import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  label: "Approach",
  heading: "A four-step path from kickoff to sustained adoption.",
  steps: [
    {
      n: "01",
      name: "Discover",
      body:
        "Stakeholder interviews, current-state assessment, and a clear picture of what's working and what isn't.",
    },
    {
      n: "02",
      name: "Design",
      body:
        "Tailored change plan, governance model, and communications cadence — sized to your delivery reality.",
    },
    {
      n: "03",
      name: "Deploy",
      body:
        "Phased rollout with hands-on training, champion enablement, and live measurement of adoption.",
    },
    {
      n: "04",
      name: "Sustain",
      body: "Reinforcement plans, governance handover, and the playbook your team uses long after we're gone.",
    },
  ],
};

export function Approach() {
  return (
    <section id="approach" className="section-y border-t border-[color:var(--color-rule)]">
      <div className="container-tight">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent-warm)]">
            {COPY.label}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.01em] max-w-3xl">
            {COPY.heading}
          </h2>
        </ScrollReveal>

        <ol className="mt-16 grid gap-10 md:grid-cols-4">
          {COPY.steps.map((s, i) => (
            <ScrollReveal key={s.n} delay={80 * i}>
              <li className="border-t border-[color:var(--color-ink)] pt-6">
                <div className="font-serif text-sm text-[color:var(--color-accent-warm)]">{s.n}</div>
                <div className="mt-4 font-serif text-2xl text-[color:var(--color-ink)]">{s.name}</div>
                <p className="mt-4 text-[color:var(--color-ink-muted)] leading-relaxed">{s.body}</p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
