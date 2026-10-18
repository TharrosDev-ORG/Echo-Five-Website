import { credentials, proof } from "@/lib/content/shared";
import { credentialsSection as copy } from "@/lib/content/about";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";

/**
 * Credentials on night: two giant numerals for the claims that carry the
 * most weight (years, clearance), then the full ledger of certifications
 * with issuer and detail, ruled like a register.
 */
export default function CredentialLedger() {
  const numerals = proof.filter((p) => copy.numerals.includes(p.mark));

  return (
    <section id="credentials" aria-labelledby="credentials-heading" className="tone-night grain band">
      <div className="wrap">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 min-[1200px]:col-span-6">
            <Index n="03">{copy.index}</Index>
            <Lines as="h2" id="credentials-heading" className="serif mt-8 text-h2" lines={copy.heading} />
          </div>
          <div className="col-span-12 min-[1200px]:col-span-5 min-[1200px]:col-start-8 min-[1200px]:pt-14">
            <p className="measure text-lead text-fg-2" data-reveal="">
              {credentials.intro}
            </p>
          </div>
        </div>

        <ul className="mt-16 grid border-t border-rule min-[640px]:grid-cols-2 min-[900px]:mt-24">
          {numerals.map((p, i) => (
            <li
              key={p.value}
              className="flex flex-col justify-between gap-8 border-b border-rule py-10 min-[640px]:odd:border-r min-[640px]:odd:pr-8 min-[640px]:even:pl-8 min-[900px]:flex-row min-[900px]:items-end"
              data-reveal=""
              style={{ "--d": i * 110 } as React.CSSProperties}
            >
              <p
                aria-hidden="true"
                className="serif text-[clamp(6rem,3.5rem+10vw,13.5rem)] leading-[0.8] tracking-[-0.045em] text-fg"
              >
                {p.mark}
              </p>
              <div className="min-[900px]:max-w-[15rem] min-[900px]:pb-2 min-[900px]:text-right">
                <p className="font-medium text-fg">{p.value}</p>
                <p className="mt-1 text-[0.9375rem] text-fg-3">{p.label}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-20 min-[900px]:mt-28">
          <div
            aria-hidden="true"
            className="label hidden grid-cols-[4rem_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-8 border-b border-fg pb-3 text-fg-3 min-[900px]:grid"
          >
            <span>No.</span>
            <span>{copy.columns.title}</span>
            <span>{copy.columns.issuer}</span>
            <span>{copy.columns.detail}</span>
          </div>
          <ol className="border-t border-fg min-[900px]:border-t-0">
            {credentials.items.map((c, i) => (
              <li
                key={c.title}
                className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 border-b border-rule py-7 min-[900px]:grid-cols-[4rem_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] min-[900px]:items-baseline min-[900px]:gap-x-8 min-[900px]:py-9"
                data-reveal=""
                style={{ "--d": i * 70 } as React.CSSProperties}
              >
                <span aria-hidden="true" className="label row-span-3 pt-[0.35em] text-accent min-[900px]:row-span-1 min-[900px]:pt-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="serif text-h4 text-fg min-[900px]:text-[1.75rem] min-[900px]:leading-[1.15]">
                  {c.title}
                </h3>
                <p className="mt-3 text-fg min-[900px]:mt-0">
                  <span className="sr-only">{copy.columns.issuer}: </span>
                  {c.issuer}
                </p>
                <p className="mt-1 text-fg-3 min-[900px]:mt-0">
                  <span className="sr-only">{copy.columns.detail}: </span>
                  {c.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
