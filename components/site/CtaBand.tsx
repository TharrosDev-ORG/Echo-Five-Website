import { ctaBand } from "@/lib/content";
import { site } from "@/lib/site";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Mail } from "@/components/ui/icons";

type Props = {
  heading?: string;
  body?: string;
};

/** The dark closing band at the end of every page except Contact. */
export default function CtaBand({ heading = ctaBand.heading, body = ctaBand.body }: Props) {
  return (
    <section className="surface-dark texture" aria-labelledby="cta-band-heading" data-cta-band="">
      <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center">
        <div className="max-w-2xl">
          <h2 id="cta-band-heading" className="text-h2 text-fg">
            {heading}
          </h2>
          <p className="mt-5 text-lead text-fg-2">{body}</p>
        </div>
        {/* From lg the buttons stack in a shrink-wrapped grid column, so both take the wider one's width. */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:grid lg:justify-self-end">
          <Button href="/contact" size="lg" tone="dark" arrow>
            {ctaBand.primary}
          </Button>
          <Button
            href={`mailto:${site.email}`}
            variant="secondary"
            size="lg"
            tone="dark"
            icon={<Mail size={18} />}
          >
            {ctaBand.emailLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
