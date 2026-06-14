import { clients } from "@/lib/content";

/**
 * Trust strip: a marquee of client short-names, with three derived counts.
 * Counts are computed from the roster so they never drift from the data.
 */
export default function Trust() {
  const all = clients.groups.flatMap((g) => g.orgs);
  const govCount = clients.groups[0].orgs.length;
  const totalCount = all.length;

  const stats = [
    { value: "20+", label: "Years in practice" },
    { value: `${govCount}`, label: "Federal departments" },
    { value: `${totalCount}+`, label: "Organizations served" },
  ];

  // Duplicate the list so the marquee can loop seamlessly at -50%.
  const ticker = [...all, ...all];

  return (
    <section className="rule-top rule-bottom band-2 overflow-hidden" aria-label="Trusted organizations">
      <div className="u-container grid gap-10 py-12 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
        <div className="flex gap-10" data-reveal-group>
          {stats.map((s) => (
            <div key={s.label} data-reveal>
              <div
                className="font-display"
                style={{ fontWeight: 740, fontSize: "clamp(1.8rem,4vw,2.8rem)", lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                {s.value}
              </div>
              <div className="t-coord mt-2" style={{ letterSpacing: "0.12em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="marquee" style={{ ["--marquee-duration" as string]: "55s" }}>
          <div className="marquee-track">
            {ticker.map((o, i) => (
              <span
                key={`${o.short}-${i}`}
                className="font-mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.9rem",
                  paddingInline: "1.4rem",
                  fontSize: "0.92rem",
                  color: "var(--color-ink-soft)",
                  whiteSpace: "nowrap",
                }}
                aria-hidden={i >= all.length ? "true" : undefined}
              >
                {o.short}
                <span style={{ color: "var(--color-cobalt)" }}>/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
