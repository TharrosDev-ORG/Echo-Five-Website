import { pages } from "@/lib/content/pages";
import { privacy, legalHeadings } from "@/lib/content/legal";
import { pageMetadata } from "@/lib/metadata";
import LegalPage from "@/components/legal/LegalPage";

const page = pages.privacy;

export const metadata = pageMetadata(page.path, page.title, page.description);

export default function PrivacyPage() {
  return (
    <LegalPage index={page.index} heading={legalHeadings.privacy} lead={page.lead} doc={privacy} />
  );
}
