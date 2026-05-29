import Reveal from "@/components/site/Reveal";
import EchoSignal from "@/components/motif/EchoSignal";
import SectionMark from "@/components/site/SectionMark";
import EmailActions from "@/components/site/EmailActions";
import { contact } from "@/lib/content";
import { mailtoBook } from "@/lib/site";

export default function Contact() {
  return (
    <section
      id="contact"
      className="pad-block-2xl relative isolate overflow-hidden bg-signal text-ink-deep"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 flex justify-end opacity-[0.18]">
        <div className="h-[150%] w-[110%] -translate-y-[12%] translate-x-[20%]">
          <EchoSignal tone="ink" className="h-full w-full" />
        </div>
      </div>

      <div className="u-container">
        <Reveal>
          <SectionMark index={contact.index} kicker={contact.kicker} tone="signal" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-display mt-10 max-w-[15ch]">{contact.heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-lead mt-10 max-w-[48ch] text-ink-deep/80">{contact.body}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-col gap-8 border-t border-ink-deep/20 pt-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-deep/60">
                Write to the founder
              </p>
              <div className="mt-4">
                <EmailActions />
              </div>
            </div>
            <a
              href={mailtoBook}
              className="btn border border-ink-deep bg-ink-deep text-paper hover:translate-y-[-2px]"
            >
              {contact.cta}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-[42ch] text-[0.92rem] text-ink-deep/70">{contact.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
