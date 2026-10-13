import { contact, hero, pages } from "@/lib/content";
import { site, mailtoBook } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { Check } from "@/components/site/icons";
import PageHeader from "@/components/site/PageHeader";
import ContactForm from "@/components/contact/ContactForm";

const page = pages.contact;
export const metadata = pageMetadata("/contact", page.title, page.description);

export default function ContactPage() {
  return (
    <>
      <PageHeader label={page.label} heading={page.heading} lead={page.lead} />

      <section className="section band" aria-label="Send a message">
        <div className="container contact-grid">
          <ContactForm />

          <aside aria-label="Other ways to reach us">
            <div className="card aside-block">
              <p className="t-label" style={{ marginBottom: "0.75rem" }}>
                Prefer email?
              </p>
              <a href={mailtoBook} className="email-link">
                {site.email}
              </a>
              <p className="t-small" style={{ marginTop: "0.75rem" }}>
                {site.region}
              </p>
            </div>

            <div className="card aside-block">
              <p className="t-label" style={{ marginBottom: "0.75rem" }}>
                What happens next
              </p>
              <p className="t-small">{contact.note}</p>
              <p className="t-small" style={{ marginTop: "0.75rem" }}>
                You can expect a straight answer, usually within one business day.
              </p>
            </div>

            <div className="card aside-block">
              <p className="t-label" style={{ marginBottom: "0.5rem" }}>
                Who you are writing to
              </p>
              <ul className="checks">
                {hero.facts.map((f) => (
                  <li key={f.title}>
                    <Check />
                    <span className="t-small">{f.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
