import { advanta, pages } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import Button from "@/components/ui/Button";
import ToolkitStack from "@/components/illustrations/ToolkitStack";
import PriceCallout from "@/components/product/PriceCallout";
import ToolkitCounts from "@/components/product/ToolkitCounts";
import ToolkitContents from "@/components/product/ToolkitContents";
import ToolkitPhases from "@/components/product/ToolkitPhases";
import FreeSamples from "@/components/product/FreeSamples";
import FileFormats from "@/components/product/FileFormats";
import Pricing from "@/components/product/Pricing";
import Relationship from "@/components/product/Relationship";

const page = pages.product;
export const metadata = pageMetadata("/product", page.title, page.description);

export default function ProductPage() {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow={advanta.byline}
        title={page.heading}
        lead={page.lead}
        actions={
          <>
            <Button href={advanta.urls.purchase} external size="lg">
              {advanta.cta.purchase}
            </Button>
            <Button href={advanta.urls.samples} external variant="secondary" size="lg">
              {advanta.cta.samples}
            </Button>
          </>
        }
        visual={<ToolkitStack className="mx-auto w-full max-w-72 sm:max-w-sm lg:max-w-md" />}
      >
        <PriceCallout />
      </PageHero>

      <ToolkitCounts />
      <ToolkitContents />
      <ToolkitPhases />
      <FreeSamples />
      <FileFormats />
      <Pricing />
      <Relationship />
      <CtaBand />
    </>
  );
}
