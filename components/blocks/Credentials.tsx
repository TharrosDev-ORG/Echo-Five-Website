import { credentials } from "@/lib/content";

export default function Credentials() {
  return (
    <ul className="creds">
      {credentials.items.map((item) => (
        <li key={item.title} data-reveal>
          <span className="t-label">{item.issuer}</span>
          <span className="cred-title">{item.title}</span>
          <span className="cred-detail">{item.detail}</span>
        </li>
      ))}
    </ul>
  );
}
