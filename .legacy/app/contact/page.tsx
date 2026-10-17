import { contact, hero, pages } from "@/lib/content";
import { site, mailtoBook } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/ui/Section";
import { Mail } from "@/components/ui/icons";
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
    <Section
      containerClassName="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-16"
    >
      <header className="min-w-0 lg:col-start-1">
        <span aria-hidden="true" data-rail-stroke className="mb-6 block h-px w-10 bg-accent-fill lg:hidden" />
        <h1 className="max-w-[16ch] text-h1 text-fg">{page.heading}</h1>
        <p className="mt-6 max-w-[60ch] text-lead text-fg-2">{page.lead}</p>
        <p className="mt-6 flex items-start gap-3 text-small font-medium text-fg">
          <span aria-hidden="true" className="mt-[0.45em] size-2 shrink-0 rounded-full bg-accent-fill" />
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
              <li key={step.n} className="relative flex gap-5 pb-9 last:pb-0">
                {/* The short signal line: one blue hairline joining the three step markers. */}
                {i < contact.steps.length - 1 ? (
                  <span aria-hidden="true" className="absolute top-10 bottom-0 left-5 w-px bg-accent-fill" />
                ) : null}
                <span
                  aria-hidden="true"
                  className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-accent-fill bg-white font-display font-semibold text-accent tabular-nums"
                >
                  {step.n}
                </span>
                <div className="min-w-0 pt-1.5">
                  <h3 className="text-body font-semibold text-fg">{step.title}</h3>
                  <p className="mt-1.5 max-w-[52ch] text-small text-fg-2">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="grid gap-10 border-t border-edge pt-10 sm:grid-cols-2 sm:gap-8">
          <section aria-labelledby="email-heading" className="min-w-0">
            <h2 id="email-heading" className="text-h3 text-fg">
              {contact.emailHeading}
            </h2>
            <a
              href={mailtoBook}
              className="link mt-3 inline-flex min-h-11 items-center gap-2 text-lead [overflow-wrap:anywhere]"
            >
              <Mail size={20} className="shrink-0" />
              {site.email}
            </a>
            <p className="mt-1 text-small text-fg-3">{site.region}</p>
          </section>

          <section aria-labelledby="credentials-heading" className="min-w-0">
            <h2 id="credentials-heading" className="text-h3 text-fg">
              {contact.credentialsHeading}
            </h2>
            <ul className="mt-4">
              {hero.facts.map((fact) => (
                <li key={fact.title} className="border-t border-edge py-3 text-small last:border-b">
                  <span className="block font-medium text-fg">{fact.title}</span>
                  <span className="block text-fg-3">{fact.detail}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Section>
  );
}
