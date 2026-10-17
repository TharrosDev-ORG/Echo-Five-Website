import type { Rich as RichText } from "@/lib/content/legal";

/** Renders a run of legal copy: plain strings, with inline links where the content has them. */
export default function Rich({ text }: { text: RichText }) {
  if (typeof text === "string") return <>{text}</>;
  return (
    <>
      {text.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <a key={i} href={part.href} className="link text-fg">
            {part.text}
          </a>
        ),
      )}
    </>
  );
}
