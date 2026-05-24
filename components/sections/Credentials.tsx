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
          {/* flex-wrap with grow so the last row fills the band: a fixed
              grid would leave an empty keyline cell (5 badges never fill
              a 2- or 3-column row). */}
          <ul className="mt-6 flex flex-wrap border-t border-l border-keyline">
            {BADGES.map((b) => (
              <li
                key={b}
                className="flex grow items-center basis-[45%] sm:basis-[30%] lg:basis-0 min-w-[150px] border-r border-b border-keyline bg-paper px-5 py-7 font-display font-bold uppercase text-sm md:text-base tracking-[0.01em] text-ink"
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
