import { pages } from "@/lib/content/pages";
import { accessibility, legalHeadings } from "@/lib/content/legal";
import { pageMetadata } from "@/lib/metadata";
import LegalPage from "@/components/legal/LegalPage";

const page = pages.accessibility;

export const metadata = pageMetadata(page.path, page.title, page.description);

export default function AccessibilityPage() {
  return (
    <LegalPage
      index={page.index}
      heading={legalHeadings.accessibility}
      lead={page.lead}
      doc={accessibility}
    />
  );
}
