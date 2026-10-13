import type { Metadata } from "next";
import Link from "next/link";
import { clients, credentials, hero, process as adkar, services, why } from "@/lib/content";
import { ArrowRight } from "@/components/site/icons";
import Section from "@/components/site/Section";
import CtaBand from "@/components/site/CtaBand";
import Failures from "@/components/blocks/Failures";
import ServiceList from "@/components/blocks/ServiceList";
import AdkarList from "@/components/blocks/AdkarList";
import Figures from "@/components/blocks/Figures";
import Credentials from "@/components/blocks/Credentials";
import Talk from "@/components/blocks/Talk";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Home: the pitch and proof, a summary of each topic, then the ask. */
export default function Home() {
  const named = clients.groups.flatMap((g) => g.orgs).slice(0, 10).map((o) => o.short);

  return (
    <>
      <section className="hero on-night" aria-labelledby="hero-heading">
        <div className="container">
          <p className="hero-context">
            {hero.eyebrow} {hero.context}
          </p>
          <h1 id="hero-heading" className="t-display" style={{ maxWidth: "16ch" }}>
            {hero.headline[0]} {hero.headline[1]}
          </h1>
          <p className="t-lead">{hero.sub}</p>
          <div className="actions">
            <Link href="/contact" className="btn btn-primary">
              {hero.cta.primary}
              <ArrowRight />
            </Link>
            <Link href="/approach" className="btn btn-secondary">
              {hero.cta.secondary}
            </Link>
          </div>

          <dl className="facts">
            {hero.facts.map((f) => (
              <div key={f.title}>
                <dt>{f.title}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="clients-line">
            <strong>Clients include</strong> {named.join(", ")} and others.{" "}
            <Link href="/about#clients" className="link">
              Full client list
            </Link>
          </p>
        </div>
      </section>

      <Section id="why" heading={why.heading}>
        <p className="t-lead measure">{why.body}</p>
        <Failures />
      </Section>

      <Section
        id="services"
        heading={services.heading}
        band
        note={
          <Link href="/services" className="link">
            All services
          </Link>
        }
      >
        <p className="t-lead measure">{services.intro}</p>
        <ServiceList columns />
      </Section>

      <Section
        id="process"
        heading={adkar.heading}
        note={
          <Link href="/approach" className="link">
            Our approach
          </Link>
        }
      >
        <p className="t-lead measure">{adkar.intro}</p>
        <AdkarList />
      </Section>

      <Section id="credentials" heading={credentials.heading} band note={credentials.intro}>
        <Figures />
        <Credentials />
      </Section>

      <Section id="talk" heading="Conference talk">
        <Talk />
      </Section>

      <CtaBand />
    </>
  );
}
