import { clients } from "@/lib/content";

const names = clients.groups.flatMap((g) => g.orgs.map((o) => o.short));

/**
 * A slow client ticker, purely atmospheric. The full, accessible roster lives
 * in the Clients section, so this strip is aria-hidden to avoid double reading.
 */
export default function Marquee() {
  const row = [...names, ...names];
  return (
    <div className="marquee relative overflow-hidden border-b border-line bg-paper py-6" aria-hidden="true">
      <div className="marquee-track">
        {row.map((n, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap font-mono text-[0.8rem] tracking-[0.06em] text-muted"
          >
            <span className="mx-7 text-signal-deep">/</span>
            {n}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent" />
    </div>
  );
}
