import { hero } from "@/lib/content/home";
import { proof } from "@/lib/content/shared";
import { adoptionGap } from "@/lib/content/approach";
import Lines from "@/components/ui/Lines";
import Mark from "@/components/ui/Mark";
import Button from "@/components/ui/Button";
import Exhibit from "@/components/ui/Exhibit";
import AdoptionGap from "@/components/exhibits/AdoptionGap";

/**
 * Home hero: the firm's line set huge, proof in the first fold, and
 * Exhibit 01 drawing the problem the firm exists to solve.
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="tone-paper relative pt-32 min-[900px]:pt-40">
      <div className="wrap">
        <div className="label flex flex-wrap justify-between gap-x-6 gap-y-1 text-fg-3" data-reveal="fade">
          <p>
            <span className="text-accent">●</span> {hero.context}
          </p>
          <p>{hero.region}</p>
        </div>

        <Lines
          as="h1"
          id="hero-heading"
          className="serif mt-10 text-hero min-[900px]:mt-14"
          lines={[
            <>
              {hero.headline.before} <Mark>{hero.headline.mark}</Mark>
            </>,
            hero.headline.second,
          ]}
        />

        <div className="mt-12 grid gap-10 min-[900px]:mt-16 min-[1200px]:grid-cols-[minmax(0,1fr)_auto] min-[1200px]:items-end">
          <p
            className="max-w-[36rem] text-lead text-fg-2"
            data-reveal=""
            style={{ "--d": 350 } as React.CSSProperties}
          >
            {hero.sub}
          </p>
          <div
            className="flex flex-wrap gap-3"
            data-reveal=""
            style={{ "--d": 450 } as React.CSSProperties}
          >
            <Button href="/contact" size="lg">
              {hero.cta.primary}
            </Button>
            <Button href="/approach" variant="secondary" size="lg">
              {hero.cta.secondary}
            </Button>
          </div>
        </div>

        {/* Proof in the first fold */}
        <ul
          className="mt-16 grid grid-cols-2 border-t border-rule min-[900px]:mt-20 min-[900px]:grid-cols-4"
          aria-label="Credentials at a glance"
        >
          {proof.map((p, i) => (
            <li
              key={p.value}
              className="border-b border-rule py-5 pr-4 min-[900px]:border-b-0 min-[900px]:border-r min-[900px]:px-6 min-[900px]:first:pl-0 min-[900px]:last:border-r-0"
              data-reveal=""
              style={{ "--d": 500 + i * 80 } as React.CSSProperties}
            >
              <p className="text-[0.9375rem] font-medium text-fg">{p.value}</p>
              <p className="mt-1 text-[0.875rem] text-fg-3">{p.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="wrap mt-20 pb-20 min-[900px]:mt-28 min-[900px]:pb-32">
        <Exhibit n="01" title={adoptionGap.title} note={adoptionGap.note}>
          <div className="pt-10">
            <AdoptionGap />
          </div>
        </Exhibit>
      </div>
    </section>
  );
}
