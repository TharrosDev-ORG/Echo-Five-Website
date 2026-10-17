import type { Metadata } from "next";
import { pages } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/components/site/PageHero";
import Closing from "@/components/site/Closing";
import Mark from "@/components/ui/Mark";
import AboutNav from "@/components/about/AboutNav";
import FirmStory from "@/components/about/FirmStory";
import Founder from "@/components/about/Founder";
import CredentialLedger from "@/components/about/CredentialLedger";
import ClientIndex from "@/components/about/ClientIndex";

const page = pages.about;

export const metadata: Metadata = pageMetadata(page.path, page.title, page.description);

/** The highlighter goes on the last word of the last line: "properly." */
function heading() {
  const lines: React.ReactNode[] = [...page.heading];
  const last = page.heading[page.heading.length - 1];
  const cut = last.lastIndexOf(" ");
  lines[lines.length - 1] = (
    <>
      {last.slice(0, cut)} <Mark>{last.slice(cut + 1)}</Mark>
    </>
  );
  return lines;
}

export default function AboutPage() {
  return (
    <>
      <PageHero index={page.index} heading={heading()} lead={page.lead} aside={<AboutNav />} />
      <FirmStory />
      <Founder />
      <CredentialLedger />
      <ClientIndex />
      <Closing />
    </>
  );
}
