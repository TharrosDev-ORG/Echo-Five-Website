import type { Metadata } from "next";
import Link from "next/link";
import { clients, hero, process as adkar, services, why, credentials } from "@/lib/content";
import { ArrowRight, FactIcons } from "@/components/site/icons";
import Intro from "@/components/blocks/Intro";
import ServiceGrid from "@/components/blocks/ServiceGrid";
import AdkarSteps from "@/components/blocks/AdkarSteps";
import Failures from "@/components/blocks/Failures";
import Stats from "@/components/blocks/Stats";
import Credentials from "@/components/blocks/Credentials";
import Talk from "@/components/blocks/Talk";
import CtaBand from "@/components/site/CtaBand";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Home: the pitch, the proof, and the ask, in that order. Each section is a
 * summary with a route to the page that holds the detail.
 */
export default function Home() {
  const trusted = clients.groups.flatMap((g) => g.orgs).slice(0, 10);

  return (
    <>
      <section className="hero on-night" aria-labelledby="hero-heading">
        <div className="container">
          <p className="hero-eyebrow">
            <span className="status-dot" aria-hidden="true" />
            <strong>{hero.eyebrow}</strong>
            <span aria-hidden="true">·</span>
            <span>{hero.context}</span>
          </p>
          <h1 id="hero-heading" className="t-display">
            <span className="block">{hero.headline[0]}</span>
            <span className="block accent">{hero.headline[1]}</span>
          </h1>

          <div className="hero-grid">
            <div>
              <p className="t-lead" style={{ maxWidth: "54ch" }}>
                {hero.sub}
              </p>
              <div className="hero-actions">
                <Link href="/contact" className="btn btn-primary">
                  {hero.cta.primary}
                  <ArrowRight />
                </Link>
                <Link href="/approach" className="btn btn-secondary">
                  {hero.cta.secondary}
                </Link>
              </div>
            </div>

            <div className="facts">
              <p className="facts-head t-label">At a glance</p>
              <ul className="facts-list">
                {hero.facts.map((f, i) => {
                  const Icon = FactIcons[i];
                  return (
                    <li key={f.title}>
                      <span className="facts-icon">{Icon ? <Icon /> : null}</span>
                      <span>
                        <span className="facts-title" style={{ display: "block" }}>
                          {f.title}
                        </span>
                        <span className="facts-detail">{f.detail}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="trusted">
            <p className="t-label">Selected clients, two decades</p>
            <ul className="trusted-list" aria-label="Selected clients">
              {trusted.map((org) => (
                <li key={org.short} title={org.name}>
                  {org.short}
                </li>
              ))}
            </ul>
            <Link href="/about#clients" className="link">
              All clients
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="why-heading">
        <div className="container">
          <Intro
            id="why-heading"
            label={why.kicker}
            heading={why.heading}
            side={<p className="t-body measure">{why.body}</p>}
          />
          <Failures />
        </div>
      </section>

      <section className="section band" aria-labelledby="services-heading">
        <div className="container">
          <Intro
            id="services-heading"
            label={services.kicker}
            heading={services.heading}
            side={
              <>
                <p className="t-body measure">{services.intro}</p>
                <Link href="/services" className="link">
                  Explore our services
                  <ArrowRight size={14} />
                </Link>
              </>
            }
          />
          <ServiceGrid />
        </div>
      </section>

      <section className="section" aria-labelledby="process-heading">
        <div className="container">
          <Intro
            id="process-heading"
            label={adkar.kicker}
            heading={adkar.heading}
            side={
              <>
                <p className="t-body measure">{adkar.intro}</p>
                <Link href="/approach" className="link">
                  How we run an engagement
                  <ArrowRight size={14} />
                </Link>
              </>
            }
          />
          <AdkarSteps />
        </div>
      </section>

      <section className="section band" aria-labelledby="proof-heading">
        <div className="container">
          <Intro
            id="proof-heading"
            label={credentials.kicker}
            heading={credentials.heading}
            side={<p className="t-body measure">{credentials.intro}</p>}
          />
          <Stats />
          <div style={{ marginTop: "clamp(2.5rem, 4vw, 3.5rem)" }}>
            <Credentials />
          </div>
        </div>
      </section>

      <section className="section" aria-label="Conference talk">
        <div className="container">
          <Talk />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
