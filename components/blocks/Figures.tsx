import { clients } from "@/lib/content";

/** Headline numbers. Counts are derived from the roster so they never drift. */
export default function Figures() {
  const total = clients.groups.reduce((n, g) => n + g.orgs.length, 0);
  const federal = clients.groups[0].orgs.length;
  const figures = [
    { value: "20+", label: "Years in practice" },
    { value: String(federal), label: "Federal departments" },
    { value: `${total}+`, label: "Organizations served" },
  ];
  return (
    <dl className="figures">
      {figures.map((f) => (
        <div key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
