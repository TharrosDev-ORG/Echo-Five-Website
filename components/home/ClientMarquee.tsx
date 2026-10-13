import { clients, ui } from "@/lib/content";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Marquee from "@/components/ui/Marquee";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const names = clients.groups
  .flatMap((group) => group.orgs)
  .map((org) => ({ label: org.short, title: org.name }));

/** Slow-scrolling row of client short names in large type, each led by a small blue node. Full names go to screen readers. */
export default function ClientMarquee() {
  return (
    <Section spacing="sm" bleed labelledBy="clients-heading" className="border-y border-edge">
      <Container className="mb-8">
        <SectionHeading
          id="clients-heading"
          title={clients.marqueeHeading}
          size="h3"
          action={
            <Button href="/about#clients" variant="ghost" size="sm" arrow>
              {clients.fullListLink}
            </Button>
          }
        />
      </Container>
      <Marquee
        label={clients.heading}
        items={names}
        labels={{ pause: ui.marqueePause, play: ui.marqueePlay, toggle: ui.marqueePauseLabel }}
      />
    </Section>
  );
}
