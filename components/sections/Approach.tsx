import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  index: "03",
  heading: "Four steps from kickoff to sustained adoption.",
  steps: [
    {
      n: "01",
      name: "Discover",
      body: "Stakeholder interviews, current-state assessment, and a clear picture of what's working and what isn't.",
    },
    {
      n: "02",
      name: "Design",
      body: "Tailored change plan, governance model, and communications cadence, sized to your delivery reality.",
    },
    {
      n: "03",
      name: "Deploy",
      body: "Phased rollout with hands-on training, champion enablement, and live measurement of adoption.",
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
    <section id="approach" className="section-y border-t border-keyline">
      <div className="container-tight">
        <ScrollReveal>
          <div className="flex items-baseline gap-4 md:gap-6">
            <span
              aria-hidden="true"
              className="font-display font-extrabold shrink-0 text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.98] tracking-[-0.02em] text-signal"
            >
              {COPY.index}
            </span>
            <h2 className="font-display font-bold uppercase text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.98] tracking-[-0.02em] max-w-[18ch] text-ink">
              {COPY.heading}
            </h2>
          </div>
        </ScrollReveal>

        <ol className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-px gap-x-px bg-keyline border border-keyline">
          {COPY.steps.map((s, i) => (
            <ScrollReveal key={s.n} delay={70 * i} className="bg-paper">
              <li className="h-full px-6 lg:px-8 py-10 lg:py-12">
                <div className="font-display font-extrabold text-5xl leading-none tracking-[-0.03em] text-signal">
                  {s.n}
                </div>
                <div className="mt-6 font-display font-bold uppercase text-xl tracking-[-0.01em] text-ink">
                  {s.name}
                </div>
                <p className="mt-3 text-base leading-[1.55] text-ink-muted">
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
