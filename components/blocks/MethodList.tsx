import { methodPoints } from "@/lib/content";

export default function MethodList() {
  return (
    <ul className="bullets">
      {methodPoints.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}
