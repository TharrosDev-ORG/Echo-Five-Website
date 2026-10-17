import type { Metadata } from "next";
import { pages } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/components/site/PageHero";
import Mark from "@/components/ui/Mark";
import ContactForm from "@/components/contact/ContactForm";
import ContactAside from "@/components/contact/ContactAside";
import DirectLine from "@/components/contact/DirectLine";

const page = pages.contact;

export const metadata: Metadata = pageMetadata(page.path, page.title, page.description);

/** The highlighter goes on the last two words: "rolling out." */
function heading() {
  const lines: React.ReactNode[] = [...page.heading];
  const last = page.heading[page.heading.length - 1];
  const words = last.split(" ");
  const keep = words.slice(0, -2).join(" ");
  lines[lines.length - 1] = (
    <>
      {keep} <Mark>{words.slice(-2).join(" ")}</Mark>
    </>
  );
  return lines;
}

/** Contact is the ask itself, so it ends on the form rather than <Closing />. */
export default function ContactPage() {
  return (
    <>
      <PageHero index={page.index} heading={heading()} lead={page.lead} aside={<DirectLine />} />

      <section className="tone-mist band-tight">
        <div className="wrap">
          <div className="grid-12 gap-y-20">
            <div className="col-span-12 min-[1200px]:col-span-7">
              <ContactForm />
            </div>
            <div className="col-span-12 min-[1200px]:col-span-4 min-[1200px]:col-start-9 min-[1200px]:pt-4">
              <ContactAside />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
