import { advanta } from "@/lib/content";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { LogoMark } from "@/components/site/Logo";

const { relationship } = advanta;

/** How Echofive uses Advanta365, a route to Echofive itself, and the independence disclaimer. */
export default function Relationship() {
  return (
    <Section id="echofive" labelledBy="relationship-heading">
      <div className="card card-panel grid gap-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-10">
        <LogoMark size={48} />
        <div className="min-w-0">
          <h2 id="relationship-heading" className="text-h3 text-fg">
            {relationship.heading}
          </h2>
          <p className="mt-3 max-w-[62ch] text-fg-2">{relationship.body}</p>
        </div>
        <Button href="/contact" variant="secondary" arrow className="w-full sm:w-auto">
          {relationship.cta}
        </Button>
      </div>
      <p className="mt-6 max-w-[72ch] text-small text-fg-3">{advanta.disclaimer}</p>
    </Section>
  );
}
