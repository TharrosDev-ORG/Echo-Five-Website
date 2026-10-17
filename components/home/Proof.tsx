import Link from "next/link";
import { proof, clientCount } from "@/lib/content/shared";
import { proofIntro } from "@/lib/content/home";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Arrow from "@/components/ui/Arrow";

/**
 * Proof set as giant numerals on night: years, clearance, certification,
 * platform. The numeral is decorative; the caption carries the claim.
 */
export default function Proof() {
  return (
    <section aria-labelledby="proof-heading" className="tone-night grain band">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Index n="05">{proofIntro.index}</Index>
            <Lines as="h2" id="proof-heading" className="serif mt-8 text-h2 max-w-[16ch]" lines={[proofIntro.heading]} />
          </div>
          <Link href="/about" className="inline-flex items-center gap-1.5 text-small font-medium text-fg" data-reveal="">
            <span className="link">About the firm</span>
            <Arrow />
          </Link>
        </div>

        <ul className="mt-16 grid border-t border-rule min-[640px]:grid-cols-2 min-[1200px]:mt-24 min-[1200px]:grid-cols-4">
          {proof.map((p, i) => (
            <li
              key={p.value}
              className="flex min-w-0 flex-col justify-between gap-10 border-b border-rule py-10 min-[640px]:odd:border-r min-[640px]:odd:pr-8 min-[640px]:even:pl-8 min-[1200px]:border-b-0 min-[1200px]:border-r min-[1200px]:px-8 min-[1200px]:first:pl-0 min-[1200px]:last:border-r-0"
              data-reveal=""
              style={{ "--d": i * 110 } as React.CSSProperties}
            >
              {/* Fixed-height slot so every numeral shares one baseline. */}
              <div aria-hidden="true" className="flex h-[clamp(4rem,2.8rem+5vw,7.75rem)] items-end">
                <p
                  className={
                    p.mark.length > 3
                      ? "serif text-[clamp(3rem,2rem+2.6vw,4.25rem)] leading-[0.85] tracking-[-0.03em] text-fg"
                      : "serif text-[clamp(4.5rem,3rem+6vw,9rem)] leading-[0.8] tracking-[-0.04em] text-fg"
                  }
                >
                  {p.mark}
                </p>
              </div>
              <div>
                <p className="font-medium text-fg">{p.value}</p>
                <p className="mt-1 text-[0.9375rem] text-fg-3">{p.label}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="label mt-10 text-fg-3" data-reveal="">
          {clientCount} named clients across federal departments, Crown corporations, and enterprise.
        </p>
      </div>
    </section>
  );
}
