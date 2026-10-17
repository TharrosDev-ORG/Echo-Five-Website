import { about, pages } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import FirmStory from "@/components/about/FirmStory";
import CredentialGrid from "@/components/about/CredentialGrid";
import ClientRoster from "@/components/about/ClientRoster";
import ProofPanel from "@/components/about/ProofPanel";

const page = pages.about;
export const metadata = pageMetadata("/about", page.title, page.description);

export default function AboutPage() {
  const last = about.tagline.length - 1;

  return (
    <>
      <PageHero
        // One line per beat of the tagline; the spaces keep the heading's text readable as a sentence.
        title={about.tagline.map((line, i) => (
          <span key={line} className={i === last ? "block text-accent" : "block"}>
            {line}
            {i < last ? " " : null}
          </span>
        ))}
        lead={page.lead}
        visual={<ProofPanel />}
      />
      <FirmStory />
      <CredentialGrid />
      <ClientRoster />
      <CtaBand />
    </>
  );
}
