import { ScrollReveal } from "@/components/ScrollReveal";

const BADGES = [
  "Microsoft Partner",
  "Prosci-Aligned",
  "ITIL Foundations",
  "Gov. of Canada Cleared",
  "PMP",
];

export function Credentials() {
  return (
    <section className="border-t border-[color:var(--color-rule)] py-16 md:py-20">
      <div className="container-tight">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.32em] text-[color:var(--color-ink-muted)]">
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[color:var(--color-rule)]"
            />
            <span>Credentials &amp; affiliations</span>
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[color:var(--color-rule)]"
            />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ul className="mt-10 flex flex-wrap items-baseline justify-center gap-x-10 gap-y-4 text-[color:var(--color-ink)]">
            {BADGES.map((b, i) => (
              <li
                key={b}
                className="font-serif font-light text-lg md:text-xl tracking-[0.01em] flex items-baseline gap-3"
              >
                {b}
                {i < BADGES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden md:inline text-[color:var(--color-accent-warm)] text-base"
                  >
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
