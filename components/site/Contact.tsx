import ContactForm from "./ContactForm";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * The close: the page's one signal-drenched moment. Everything before
 * holds the accent to lines and key words; here it floods the ground.
 */
export default function Contact() {
  return (
    <section id="contact" className="bg-signal text-ink-on-signal" aria-labelledby="contact-heading">
      <div className="u-container pad-block-2xl grid gap-x-16 gap-y-12 lg:grid-cols-[1.1fr_1fr]">
        <div data-reveal-group>
          <p data-reveal className="t-coord flex items-baseline gap-4 opacity-70">
            <span>{contact.index}</span>
            {contact.kicker}
          </p>
          <h2 data-reveal id="contact-heading" className="t-h2 mt-7 max-w-[16ch]">
            {contact.heading}
          </h2>
          <p data-reveal className="t-lead mt-7 max-w-[46ch] !text-ink-on-signal opacity-85">
            {contact.body}
          </p>
          <p data-reveal className="t-body mt-9 max-w-[46ch] border-t border-ink-on-signal/20 pt-6 opacity-75">
            {contact.note}
          </p>
          <p data-reveal className="t-coord mt-10 opacity-70">
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
            <span aria-hidden="true"> · </span>
            {site.region}
          </p>
        </div>

        <div data-reveal="scale">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
