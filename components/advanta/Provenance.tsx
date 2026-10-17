import { advanta } from "@/lib/content/advanta";

/** Where the toolkit comes from, in three lines set large. */
export default function Provenance() {
  return (
    <section aria-labelledby="advanta-provenance-heading" className="tone-paper band">
      <div className="wrap">
        <h2 id="advanta-provenance-heading" className="label flex items-center gap-3 text-fg-3">
          <span aria-hidden="true" className="text-accent">
            (06)
          </span>
          <span>{advanta.page.provenanceHeading}</span>
        </h2>

        <ol className="mt-12 border-t border-fg min-[900px]:mt-16">
          {advanta.provenance.map((line, i) => (
            <li
              key={line}
              className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-x-4 border-b border-rule py-8 min-[900px]:grid-cols-[5rem_minmax(0,1fr)] min-[900px]:gap-x-8 min-[900px]:py-10"
              data-reveal=""
              style={{ "--d": i * 120 } as React.CSSProperties}
            >
              <span className="label text-accent" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="serif text-[clamp(2rem,1.2rem+3.4vw,5rem)] leading-[1.02] tracking-[-0.028em] text-fg">
                {line.replace(/-/g, "-\u2060")}.
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
