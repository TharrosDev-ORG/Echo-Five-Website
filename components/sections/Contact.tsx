import { contact } from "@/lib/content";
import { site, mailtoBook } from "@/lib/site";
import SplitText from "@/components/ui/SplitText";
import ContactForm from "@/components/sections/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="pad-block-2xl rule-top band-2">
      <div className="u-container">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <div className="mb-7 flex items-center gap-4" data-reveal="fade">
              <span className="index-num">{contact.index}</span>
              <span className="t-coord">{contact.kicker}</span>
            </div>
            <SplitText as="h2" className="t-h2" text={contact.heading} />
            <p data-reveal className="t-lead measure-wide" style={{ marginTop: "clamp(1.5rem,3vw,2.25rem)" }}>
              {contact.body}
            </p>

            <div data-reveal className="mt-10 flex flex-col gap-3">
              <a href={mailtoBook} className="contact-email font-display" data-cursor>
                {site.email}
              </a>
              <span className="t-coord">{site.region}</span>
            </div>

            <p data-reveal className="t-body mt-8" style={{ color: "var(--color-ink-muted)", maxWidth: "44ch" }}>
              {contact.note}
            </p>
          </div>

          <div className="md:col-span-6" data-reveal="scale">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
