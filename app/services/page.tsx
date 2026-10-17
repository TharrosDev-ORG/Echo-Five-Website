import { pages } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/components/site/PageHero";
import Closing from "@/components/site/Closing";
import Mark from "@/components/ui/Mark";
import JumpNav from "@/components/services/JumpNav";
import Rollout from "@/components/services/Rollout";
import ServiceSequence from "@/components/services/ServiceSequence";
import Platforms from "@/components/services/Platforms";
import PairAdvanta from "@/components/services/PairAdvanta";

const page = pages.services;

export const metadata = pageMetadata(page.path, page.title, page.description);

/** /services: the six services, where they sit across a rollout, and the toolkit that pairs with them. */
export default function ServicesPage() {
  const [first, second] = page.heading;
  const [word, ...rest] = second.split(", ");
  return (
    <>
      <PageHero
        index={page.index}
        heading={[
          first,
          <>
            {word}, <Mark>{rest.join(", ")}</Mark>
          </>,
        ]}
        lead={page.lead}
      >
        <JumpNav />
      </PageHero>
      <Rollout />
      <ServiceSequence />
      <Platforms />
      <PairAdvanta />
      <Closing />
    </>
  );
}
