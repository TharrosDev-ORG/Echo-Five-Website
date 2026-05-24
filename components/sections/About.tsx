import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  index: "01",
  heading: "A practice built for the public sector.",
  body: [
    "Echo-Five is an independent consultancy focused on Microsoft 365 adoption inside government. We work alongside program leads, IT, and operational teams to turn rollouts into the kind of change people actually use, not the kind that gets quietly reverted six months later.",
    "Our work sits at the seam between technology and the people doing the work. Governance, training, communications, and measurement, handled together so adoption holds after the project closes.",
  ],
  stats: [
    { value: "20+", label: "Years in public-sector transformation" },
    { value: "M365", label: "Specialist focus, Teams to Purview" },
    { value: "100%", label: "Engagements delivered end-to-end" },
  ],
};

const MARK = {
  initials: "MA",
  name: "Mark Abdelnour",
  role: "Principal Consultant",
  quote:
    "I've spent twenty years helping public-sector teams use the tools that were already on their desk. Echo-Five exists to do that one job, properly, and end-to-end.",
  meta: [
    "20+ years in public-sector transformation",
    "Microsoft 365 specialist: Teams, SharePoint, Purview",
    "Based in Ottawa, ON",
  ],
};

export function About() {
  return (
    <section id="about" className="section-y border-t border-keyline">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-10">
          <div className="md:col-span-5">
            <ScrollReveal>
              <span className="font-display font-bold text-signal text-sm tracking-[0.1em]">
                {COPY.index}
              </span>
              <h2 className="mt-5 font-display font-bold uppercase text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.98] tracking-[-0.02em] max-w-[13ch] text-ink">
                {COPY.heading}
              </h2>
            </ScrollReveal>
          </div>
          <div className="md:col-span-7 space-y-6 text-lg md:text-xl leading-[1.6] text-ink-muted">
            {COPY.body.map((p, i) => (
              <ScrollReveal key={i} delay={80 * (i + 1)}>
                <p>{p}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Principal: typographic signature block, no photo by design. */}
        <ScrollReveal delay={120} className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-8 border-t-2 border-ink pt-10 md:pt-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="inline-flex h-14 w-14 items-center justify-center border border-ink font-display font-bold text-ink text-lg"
                >
                  {MARK.initials}
                </span>
                <div>
                  <div className="font-display font-bold uppercase text-xl tracking-[-0.01em] text-ink leading-none">
                    {MARK.name}
                  </div>
                  <div className="mt-1.5 text-sm uppercase tracking-[0.14em] text-ink-muted">
                    {MARK.role}
                  </div>
                </div>
              </div>
              <ul className="mt-7 space-y-2.5 text-sm text-ink-muted">
                {MARK.meta.map((m) => (
                  <li key={m} className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="text-signal font-bold">+</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <blockquote className="md:col-span-7 font-display font-bold text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.2] tracking-[-0.015em] text-ink">
              <span aria-hidden="true" className="text-signal">“</span>
              {MARK.quote}
              <span aria-hidden="true" className="text-signal">”</span>
            </blockquote>
          </div>
        </ScrollReveal>

        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-px bg-keyline border-y border-keyline">
          {COPY.stats.map((s, i) => (
            <ScrollReveal
              key={s.label}
              delay={70 * i}
              className="bg-paper px-6 py-10 md:py-14"
            >
              <div className="font-display font-extrabold text-6xl md:text-7xl leading-none tracking-[-0.03em] text-ink">
                {s.value}
              </div>
              <div className="mt-5 max-w-[22ch] text-sm leading-[1.5] text-ink-muted">
                {s.label}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
