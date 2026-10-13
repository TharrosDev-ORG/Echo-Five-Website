import { clients } from "@/lib/content";

/** Headline numbers. Counts are derived from the roster so they never drift. */
export default function Stats() {
  const total = clients.groups.reduce((n, g) => n + g.orgs.length, 0);
  const federal = clients.groups[0].orgs.length;
  const stats = [
    { value: "20+", label: "Years in practice" },
    { value: String(federal), label: "Federal departments" },
    { value: `${total}+`, label: "Organizations served" },
  ];
  return (
    <ul className="stats">
      {stats.map((s, i) => (
        <li key={s.label} className="card stat" data-reveal style={{ ["--reveal-i" as string]: i }}>
          <p className="stat-value">{s.value}</p>
          <p className="stat-label">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}
