import { contact, hero, pages } from "@/lib/content";
import { site, mailtoBook } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/site/PageHeader";
import ContactForm from "@/components/contact/ContactForm";

const page = pages.contact;
export const metadata = pageMetadata("/contact", page.title, page.description);

export default function ContactPage() {
  return (
    <>
      <PageHeader heading={page.heading} lead={page.lead} />

      <section className="section band" aria-label="Send a message">
        <div className="container contact-grid">
          <ContactForm />

          <aside className="aside" aria-label="Other ways to reach us">
            <div>
              <h2>Email</h2>
              <a href={mailtoBook} className="email-link link">
                {site.email}
              </a>
              <p className="t-small" style={{ marginTop: "var(--s-2)" }}>
                {site.region}
              </p>
            </div>
            <div>
              <h2>What happens next</h2>
              <p className="t-small">
                {contact.note} You can expect a straight answer, usually within one business day.
              </p>
            </div>
            <div>
              <h2>Credentials</h2>
              <ul className="bullets t-small">
                {hero.facts.map((f) => (
                  <li key={f.title}>{f.title}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
