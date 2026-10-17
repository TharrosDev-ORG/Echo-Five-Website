import Link from "next/link";
import { hero, heroClients } from "@/lib/content/home";
import { clients, clientCount } from "@/lib/content/shared";
import { adoptionGap } from "@/lib/content/approach";
import Lines from "@/components/ui/Lines";
import Mark from "@/components/ui/Mark";
import Button from "@/components/ui/Button";
import Exhibit from "@/components/ui/Exhibit";
import AdoptionGap from "@/components/exhibits/AdoptionGap";
import Arrow from "@/components/ui/Arrow";

const orgName = new Map(clients.groups.flatMap((g) => g.orgs.map((o) => [o.short, o.name])));

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
            <span aria-hidden="true" className="text-accent">●</span> {hero.context}
          </p>
          <p>{hero.credentials.join(" · ")}</p>
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

        {/* Named clients in the first fold */}
        <div
          className="mt-16 flex flex-col gap-5 border-t border-rule pt-6 min-[900px]:mt-20 min-[900px]:flex-row min-[900px]:items-baseline min-[900px]:justify-between"
          data-reveal=""
          style={{ "--d": 550 } as React.CSSProperties}
        >
          <p className="label flex-none text-fg-3">{heroClients.label}</p>
          <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 min-[1200px]:gap-x-9" aria-label={heroClients.label}>
            {heroClients.shorts.map((short) => (
              <li key={short}>
                <abbr
                  title={orgName.get(short)}
                  className="serif text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] leading-none tracking-[-0.01em] text-fg no-underline"
                >
                  {short}
                </abbr>
              </li>
            ))}
          </ul>
          <Link href="/about#clients" className="inline-flex flex-none items-center gap-1.5 text-small font-medium text-fg">
            <span className="link">
              {heroClients.link} {clientCount}
            </span>
            <Arrow />
          </Link>
        </div>
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
