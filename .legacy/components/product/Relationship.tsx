import { advanta } from "@/lib/content";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { LogoMark } from "@/components/site/Logo";

const { relationship } = advanta;

/** How Echofive uses Advanta365, a route to Echofive itself, and the independence disclaimer. */
export default function Relationship() {
  return (
    <Section id="echofive" tone="alt" labelledBy="relationship-heading">
      <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:gap-x-10 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
        <LogoMark size={48} />
        <div className="min-w-0">
          <h2 id="relationship-heading" className="text-h2 text-fg">
            {relationship.heading}
          </h2>
          <p className="mt-4 max-w-[62ch] text-lead text-fg-2">{relationship.body}</p>
        </div>
        <Button href="/contact" variant="secondary" arrow className="w-full sm:w-auto md:col-start-2 md:justify-self-start lg:col-start-3 lg:row-start-1">
          {relationship.cta}
        </Button>
      </div>
      <div className="mt-10 border-t border-edge pt-6">
        <p className="max-w-[72ch] text-small text-fg-3">{advanta.disclaimer}</p>
      </div>
    </Section>
  );
}
