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
    <section className="border-t border-[color:var(--color-rule)] py-16">
      <div className="container-tight">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-ink-muted)] text-center">
            Credentials &amp; affiliations
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-[color:var(--color-ink-muted)]">
            {BADGES.map((b) => (
              <li key={b} className="font-serif tracking-[0.06em]">
                {b}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
