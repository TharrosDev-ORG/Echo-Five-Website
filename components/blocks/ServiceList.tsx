import { services } from "@/lib/content";

/** The six services. `columns` gives the compact two-column overview. */
export default function ServiceList({ columns = false }: { columns?: boolean }) {
  return (
    <ul className={columns ? "ruled ruled-2" : "ruled rowlist"}>
      {services.items.map((item) => (
        <li key={item.n}>
          <h3 className="t-h3">{item.title}</h3>
          <p className={columns ? "t-small" : "t-muted"}>{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
