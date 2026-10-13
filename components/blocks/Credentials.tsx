import { credentials } from "@/lib/content";

export default function Credentials() {
  return (
    <ul className="ruled rowlist">
      {credentials.items.map((item) => (
        <li key={item.title}>
          <h3 className="t-h3">{item.title}</h3>
          <p className="t-muted">
            {item.detail} ({item.issuer})
          </p>
        </li>
      ))}
    </ul>
  );
}
