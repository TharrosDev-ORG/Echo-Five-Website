import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import ContactForm from "@/components/site/ContactForm";
import { contact } from "@/lib/content";

export default function Contact() {
  return (
    <section
      id="contact"
      className="pad-block-2xl relative isolate overflow-hidden bg-signal text-ink-on-signal"
    >
      {/* Faint echo rings, in ink, drifting off the right edge. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex justify-end opacity-[0.14]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 600 600" className="h-[150%] w-auto -translate-y-[10%] translate-x-[25%]">
          <g fill="none" stroke="var(--color-ink-on-signal)" strokeWidth="1.5">
            {[60, 130, 200, 270, 340].map((r) => (
              <circle key={r} cx="300" cy="300" r={r} />
            ))}
            <circle cx="300" cy="300" r="10" fill="var(--color-ink-on-signal)" stroke="none" />
          </g>
        </svg>
      </div>

      <div className="u-container grid gap-x-16 gap-y-14 lg:grid-cols-2 lg:items-start">
        <div>
          <Reveal>
            <SectionMark index={contact.index} kicker={contact.kicker} tone="signal" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-display mt-9 max-w-[14ch]">{contact.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-lead mt-8 max-w-[46ch] text-ink-on-signal/85">{contact.body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-[42ch] border-t border-ink-on-signal/20 pt-8 text-[0.95rem] text-ink-on-signal/75">
              {contact.note}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-2">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
