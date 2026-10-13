import { contact, hero, pages } from "@/lib/content";
import { site, mailtoBook } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import { Check, Mail } from "@/components/ui/icons";
import ContactForm from "@/components/contact/ContactForm";

const page = pages.contact;
export const metadata = pageMetadata("/contact", page.title, page.description);

/**
 * Two columns from lg: the introduction and supporting detail on the left, the
 * form pinned on the right. On phones the form follows the introduction so it
 * is reached before the detail.
 */
export default function ContactPage() {
  return (
    <div className="surface-light">
      <Container className="grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-16 lg:py-24">
        <header className="min-w-0 lg:col-start-1">
          <h1 className="max-w-[20ch] text-h1 text-fg">{page.heading}</h1>
          <p className="mt-6 max-w-[60ch] text-lead text-fg-2">{page.lead}</p>
          <p className="mt-6 flex items-start gap-2.5 text-small font-medium text-fg">
            <Check size={20} className="mt-0.5 shrink-0 text-accent" />
            {contact.directLine}
          </p>
        </header>

        <ContactForm className="min-w-0 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start" />

        <div className="grid min-w-0 gap-12 lg:col-start-1">
          <section aria-labelledby="next-steps-heading">
            <h2 id="next-steps-heading" className="text-h3 text-fg">
              {contact.stepsHeading}
            </h2>
            <ol className="mt-6">
              {contact.steps.map((step, i) => (
                <li key={step.n} className="relative flex gap-4 pb-8 last:pb-0">
                  {i < contact.steps.length - 1 ? (
                    <span aria-hidden="true" className="absolute top-12 bottom-2 left-5 w-px bg-edge-strong" />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/12 font-display font-semibold text-accent"
                  >
                    {step.n}
                  </span>
                  <div className="min-w-0 pt-1.5">
                    <h3 className="text-body font-semibold text-fg">{step.title}</h3>
                    <p className="mt-1.5 text-small text-fg-2">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="grid gap-10 border-t border-edge pt-10 sm:grid-cols-2 sm:gap-8">
            <section aria-labelledby="email-heading">
              <h2 id="email-heading" className="text-h3 text-fg">
                {contact.emailHeading}
              </h2>
              <a href={mailtoBook} className="link mt-3 inline-flex min-h-11 items-center gap-2 text-lead">
                <Mail size={20} className="shrink-0" />
                {site.email}
              </a>
              <p className="mt-1 text-small text-fg-3">{site.region}</p>
            </section>

            <section aria-labelledby="credentials-heading">
              <h2 id="credentials-heading" className="text-h3 text-fg">
                {contact.credentialsHeading}
              </h2>
              <ul className="mt-4 grid gap-3">
                {hero.facts.map((fact) => (
                  <li key={fact.title} className="flex gap-2.5 text-small">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                    <span>
                      <span className="block font-medium text-fg">{fact.title}</span>
                      <span className="block text-fg-3">{fact.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
