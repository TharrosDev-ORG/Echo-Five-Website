import { pages } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/metadata";
import Hero from "@/components/advanta/Hero";
import Counts from "@/components/advanta/Counts";
import Contents from "@/components/advanta/Contents";
import Phases from "@/components/advanta/Phases";
import Formats from "@/components/advanta/Formats";
import Samples from "@/components/advanta/Samples";
import Provenance from "@/components/advanta/Provenance";
import Purchase from "@/components/advanta/Purchase";
import Relationship from "@/components/advanta/Relationship";
import Closing from "@/components/site/Closing";

const page = pages.advanta365;

export const metadata = pageMetadata(page.path, page.title, page.description);

/** Echofive's page for Advanta365, its product. Every route to buy leads to advanta365.com. */
export default function Advanta365Page() {
  return (
    <>
      <Hero />
      <Counts />
      <Contents />
      <Phases />
      <Formats />
      <Samples />
      <Provenance />
      <Purchase />
      <Relationship />
      <Closing />
    </>
  );
}
