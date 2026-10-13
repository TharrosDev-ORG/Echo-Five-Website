import { talk } from "@/lib/content";
import { site } from "@/lib/site";
import Talk from "@/components/site/Talk";
import Reveal from "@/components/ui/Reveal";
import Section, { type Tone } from "@/components/ui/Section";
import { External } from "@/components/ui/icons";

/**
 * The conference talk band, shared by Home and Approach: a text rail with the
 * heading and caption beside the click-to-load video from lg, stacked below.
 */
export default function TalkSection({ tone = "light" }: { tone?: Tone }) {
  return (
    <Section id="talk" tone={tone} labelledBy="talk-heading">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-x-16">
        <div className="lg:col-span-4">
          <h2 id="talk-heading" className="text-h2 text-fg">
            {talk.sectionHeading}
          </h2>
          <p className="mt-5 font-display text-h3 text-fg">{talk.heading}</p>
          <p className="mt-3 text-fg-2">{talk.sub}</p>
          <p className="mt-4">
            <a
              href={site.video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex min-h-11 items-center gap-1.5"
            >
              {talk.openLabel}
              <External size={14} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
        <Reveal className="min-w-0 lg:col-span-8">
          <Talk />
        </Reveal>
      </div>
    </Section>
  );
}
