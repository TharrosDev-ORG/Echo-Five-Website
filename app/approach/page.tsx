import { pages } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/components/site/PageHero";
import Talk from "@/components/site/Talk";
import Closing from "@/components/site/Closing";
import Contents from "@/components/approach/Contents";
import Problem from "@/components/approach/Problem";
import Method from "@/components/approach/Method";
import Engagement from "@/components/approach/Engagement";

export const metadata = pageMetadata(pages.approach.path, pages.approach.title, pages.approach.description);

/**
 * /approach: why rollouts stall (Exhibit 01), the Prosci ADKAR method read
 * stage by stage (Exhibit 02), how an engagement runs (Exhibit 03), the
 * conference talk, and the ask.
 */
export default function ApproachPage() {
  const page = pages.approach;
  return (
    <>
      <PageHero index={page.index} heading={page.heading} lead={page.lead} aside={<Contents />} />
      <Problem />
      <Method />
      <Engagement />
      <Talk n="04" />
      <Closing />
    </>
  );
}
