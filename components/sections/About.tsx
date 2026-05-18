import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  marker: "01",
  label: "About",
  heading: "A practice built for the public sector.",
  body: [
    "Echo-Five is an independent consultancy focused on Microsoft 365 adoption inside government. We work alongside program leads, IT, and operational teams to turn rollouts into the kind of change people actually use — not the kind that gets quietly reverted six months later.",
    "Our work sits at the seam between technology and the people doing the work. Governance, training, communications, and measurement, handled together so adoption holds after the project closes.",
  ],
  stats: [
    { value: "20+", label: "Years in public-sector transformation" },
    { value: "M365", label: "Specialist focus, Teams to Purview" },
    { value: "100%", label: "Engagements delivered end-to-end" },
  ],
};

const MARK = {
  label: "Principal",
  initials: "MA",
  name: "Mark Abdelnour",
  role: "Principal Consultant",
  quote:
    "I've spent twenty years helping public-sector teams use the tools that were already on their desk. Echo-Five exists to do that one job, properly — and end-to-end.",
  meta: [
    "20+ years in public-sector transformation",
    "Microsoft 365 specialist · Teams, SharePoint, Purview",
    "Based in Ottawa, ON",
  ],
};

export function About() {
  return (
    <section
      id="about"
      className="section-y border-t border-[color:var(--color-rule)]"
    >
      <div className="container-tight">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <ScrollReveal>
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[color:var(--color-accent-warm)] text-base">
                  {COPY.marker}
                </span>
                <span className="text-[10px] uppercase tracking-[0.32em] text-[color:var(--color-ink-muted)]">
                  {COPY.label}
                </span>
              </div>
              <h2 className="mt-6 font-serif font-light text-[clamp(2.1rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.015em] max-w-[14ch]">
                {COPY.heading}
              </h2>
            </ScrollReveal>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-6 text-lg md:text-[1.15rem] leading-[1.6] text-[color:var(--color-ink-muted)]">
            {COPY.body.map((p, i) => (
              <ScrollReveal key={i} delay={80 * (i + 1)}>
                <p>{p}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Principal — modest, single-column signature block. No photo by design. */}
        <ScrollReveal delay={240} className="mt-20 md:mt-24">
          <div className="grid gap-8 md:grid-cols-12 md:gap-x-8 border-t border-[color:var(--color-rule)] pt-10 md:pt-12">
            <div className="md:col-span-5">
              <div className="flex items-baseline gap-4">
                <span className="font-serif italic text-[color:var(--color-accent-warm)] text-sm">
                  &mdash;
                </span>
                <span className="text-[10px] uppercase tracking-[0.32em] text-[color:var(--color-ink-muted)]">
                  {MARK.label}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-rule)] font-serif text-[color:var(--color-ink)] text-base tracking-[0.04em]"
                >
                  {MARK.initials}
                </span>
                <div>
                  <div className="font-serif font-light text-[1.5rem] leading-tight tracking-[-0.01em] text-[color:var(--color-ink)]">
                    {MARK.name}
                  </div>
                  <div className="text-sm text-[color:var(--color-ink-muted)]">
                    {MARK.role}
                  </div>
                </div>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-[color:var(--color-ink-muted)]">
                {MARK.meta.map((m) => (
                  <li key={m} className="flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className="text-[color:var(--color-accent-warm)] text-xs"
                    >
                      +
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <blockquote className="md:col-span-6 md:col-start-7 relative font-serif italic font-light text-[1.45rem] md:text-[1.65rem] leading-[1.35] tracking-[-0.005em] text-[color:var(--color-ink)]">
              <span
                aria-hidden="true"
                className="absolute -left-6 -top-2 font-serif not-italic text-[color:var(--color-accent-warm)] text-3xl opacity-70 hidden md:block"
              >
                &ldquo;
              </span>
              {MARK.quote}
            </blockquote>
          </div>
        </ScrollReveal>

        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-rule)] border-y border-[color:var(--color-rule)]">
          {COPY.stats.map((s, i) => (
            <ScrollReveal
              key={s.label}
              delay={80 * i}
              className="bg-[color:var(--color-bg)] px-6 py-10 md:py-14"
            >
              <div className="font-serif font-light text-5xl md:text-[3.75rem] leading-none tracking-[-0.03em] text-[color:var(--color-ink)]">
                {s.value}
              </div>
              <div className="mt-5 max-w-[24ch] text-sm leading-[1.5] text-[color:var(--color-ink-muted)]">
                {s.label}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
