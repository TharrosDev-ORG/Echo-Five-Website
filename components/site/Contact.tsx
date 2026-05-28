import Reveal from "@/components/site/Reveal";
import EchoSignal from "@/components/motif/EchoSignal";
import { contact } from "@/lib/content";
import { site, mailtoBook } from "@/lib/site";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-pad relative isolate overflow-hidden bg-signal text-ink-deep"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 flex justify-end opacity-[0.18]">
        <div className="h-[150%] w-[110%] -translate-y-[12%] translate-x-[20%]">
          <EchoSignal tone="ink" className="h-full w-full" />
        </div>
      </div>

      <div className="u-container">
        <Reveal>
          <p className="flex items-center gap-3">
            <span className="font-mono text-[0.9rem] tracking-[0.1em]">{contact.index}</span>
            <span className="t-label">{contact.kicker}</span>
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-display mt-7 max-w-[15ch]">{contact.heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-lead mt-7 max-w-[48ch] text-ink-deep/80">{contact.body}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col gap-8 border-t border-ink-deep/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={mailtoBook}
              className="font-display text-[clamp(1.7rem,4vw,3rem)] leading-none tracking-tight underline-offset-[6px] transition-all hover:underline"
            >
              {site.email}
            </a>
            <a
              href={mailtoBook}
              className="btn border border-ink-deep bg-ink-deep text-paper hover:translate-y-[-2px]"
            >
              {contact.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
