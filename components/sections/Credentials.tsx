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
    <section className="border-t border-keyline py-14 md:py-16">
      <div className="container-tight">
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.26em] text-ink-muted">
            Credentials &amp; affiliations
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-keyline border-y border-keyline">
            {BADGES.map((b) => (
              <li
                key={b}
                className="bg-paper px-5 py-7 font-display font-bold uppercase text-sm md:text-base tracking-[0.01em] text-ink"
              >
                {b}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
