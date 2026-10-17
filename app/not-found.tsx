import type { Metadata } from "next";
import { notFoundPage } from "@/lib/content/legal";
import StatusPage from "@/components/legal/StatusPage";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: notFoundPage.title,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const t = notFoundPage;
  return (
    <StatusPage
      code={`Exhibit ${t.code}`}
      caption={t.caption}
      captionNote={t.captionNote}
      heading={t.heading}
      body={t.body}
      moreLabel={t.moreLabel}
      figure={
        <p className="serif tabular text-[clamp(9rem,3rem+26vw,28rem)] leading-[0.86] tracking-[-0.05em] text-fg">
          {t.code}
        </p>
      }
      actions={
        <>
          <Button href="/" size="lg">
            {t.primary}
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            {t.secondary}
          </Button>
        </>
      }
    />
  );
}
