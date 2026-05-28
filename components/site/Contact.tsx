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
          <div className="flex items-center gap-3 text-ink-deep">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
              <g fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="12" cy="12" r="9" opacity="0.5" />
                <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
              </g>
            </svg>
            <span className="font-mono text-[0.82rem] font-medium tabular-nums">{contact.index}</span>
            <span className="h-px w-5 bg-ink-deep/30" aria-hidden="true" />
            <span className="text-[0.9rem] font-medium text-ink-deep/80">{contact.kicker}</span>
          </div>
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
