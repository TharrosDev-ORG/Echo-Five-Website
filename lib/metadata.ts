import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Per-page metadata: title, description, canonical URL, and the Open Graph and
 * Twitter fields for this path. Paths resolve against `metadataBase` in
 * app/layout.tsx.
 *
 * Share images are not set here. Each route's `opengraph-image.tsx` (or the
 * root one, for routes without their own) is file-based metadata, which Next
 * applies on top of these objects with its alt text, type, and a cache-busting
 * hash; Twitter reuses it.
 */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  const shareTitle = `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
    },
  };
}
