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
          <span className="font-display font-bold text-signal text-sm tracking-[0.1em]">
            {COPY.index}
          </span>
          <h2 className="mt-5 font-display font-bold uppercase text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.98] tracking-[-0.02em] max-w-[18ch] text-ink">
            {COPY.heading}
          </h2>
        </ScrollReveal>

        <ol className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-px sm:bg-keyline sm:border-y sm:border-keyline">
          {COPY.steps.map((s, i) => (
            <ScrollReveal key={s.n} delay={70 * i} className="sm:bg-paper">
              <li className="relative h-full sm:px-6 lg:px-7 sm:py-9 border-t-2 border-ink sm:border-t-0 pt-6 sm:pt-9">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-[3px] w-12 bg-signal sm:hidden"
                />
                <div className="font-display font-extrabold text-4xl leading-none tracking-[-0.03em] text-signal">
                  {s.n}
                </div>
                <div className="mt-4 font-display font-bold uppercase text-xl tracking-[-0.01em] text-ink">
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
