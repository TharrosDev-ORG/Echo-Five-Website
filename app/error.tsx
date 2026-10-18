"use client";

import { useEffect } from "react";
import { errorPage } from "@/lib/content/legal";
import { site } from "@/lib/site";
import StatusPage from "@/components/legal/StatusPage";
import Button from "@/components/ui/Button";
import Arrow from "@/components/ui/Arrow";

type Props = {
  error: Error & { digest?: string };
  /** Clears the error and re-renders the segment. */
  reset: () => void;
  /** Re-fetches and re-renders the segment (Next 16.2+); preferred when present. */
  retry?: () => void;
};

/** The error boundary for every page: the same exhibit treatment as the 404. */
export default function ErrorPage({ error, reset, retry }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // The boundary replaces the page in place, often under a link that no
  // longer exists. Move focus to the heading so keyboard and screen reader
  // users land on the explanation instead of the top of the document.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("status-heading")?.focus({ preventScroll: true });
  }, []);

  const t = errorPage;
  return (
    <StatusPage
      code={t.code}
      caption={t.caption}
      captionNote={t.captionNote}
      heading={t.heading}
      body={t.body}
      figure={<DroppedBars />}
      actions={
        <>
          <button type="button" onClick={() => (retry ?? reset)()} className="btn btn-primary btn-lg">
            <span>{t.primary}</span>
            <Arrow />
          </button>
          <Button href="/" variant="secondary" size="lg">
            {t.secondary}
          </Button>
        </>
      }
      footnote={
        <div className="space-y-2">
          <p className="text-small text-fg-3">
            {t.emailLabel}{" "}
            <a href={`mailto:${site.email}`} className="link text-fg">
              {site.email}
            </a>
          </p>
          {error.digest && (
            <p className="label text-fg-3">
              {t.refLabel} <span className="text-fg">{error.digest}</span>
            </p>
          )}
        </div>
      }
    />
  );
}

/** The five rising bars, drawn large, with the last one gone to an outline. */
function DroppedBars() {
  const bars = [
    { x: 10, y: 150 },
    { x: 57.5, y: 120 },
    { x: 105, y: 90 },
    { x: 152.5, y: 60 },
  ];
  return (
    <svg viewBox="0 25 240 190" className="w-[clamp(9rem,4rem+20vw,22rem)]">
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y={b.y} width="30" height={210 - b.y} rx="8" className="fill-fg" />
      ))}
      <rect
        x="201"
        y="31"
        width="28"
        height="178"
        rx="7"
        fill="none"
        className="stroke-accent"
        strokeWidth="2"
        strokeDasharray="7 7"
      />
    </svg>
  );
}
