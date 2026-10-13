import { methodPoints } from "@/lib/content";
import { Check } from "@/components/site/icons";

export default function MethodPoints() {
  return (
    <ul className="checks">
      {methodPoints.map((p) => (
        <li key={p} data-reveal>
          <Check />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}
