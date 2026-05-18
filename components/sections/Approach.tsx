import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  marker: "03",
  label: "Approach",
  heading: "Four steps from kickoff to sustained adoption.",
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
      body:
        "Reinforcement plans, governance handover, and the playbook your team uses long after we're gone.",
    },
  ],
};

export function Approach() {
  return (
    <section
      id="approach"
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
          <h2 className="mt-6 font-serif font-light text-[clamp(2.1rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.015em] max-w-[20ch]">
            {COPY.heading}
          </h2>
        </ScrollReveal>

        <ol className="mt-16 md:mt-20 grid gap-12 md:gap-8 md:grid-cols-4">
          {COPY.steps.map((s, i) => (
            <ScrollReveal key={s.n} delay={80 * i}>
              <li className="relative border-t border-[color:var(--color-ink)] pt-6 md:pt-7">
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-[3px] w-10 bg-[color:var(--color-accent-warm)]"
                />
                <div className="font-serif italic text-[color:var(--color-accent-warm)] text-sm">
                  {s.n}
                </div>
                <div className="mt-3 font-serif font-light text-[1.65rem] tracking-[-0.01em] text-[color:var(--color-ink)]">
                  {s.name}
                </div>
                <p className="mt-4 text-[color:var(--color-ink-muted)] leading-[1.6]">
                  {s.body}
                </p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
