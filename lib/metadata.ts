import type { Metadata } from "next";
import { site } from "@/lib/site";

/** Per-page metadata: title, description, and a canonical URL for this path. */
// Per-page openGraph and twitter objects replace the root ones wholesale, so
// each page names the shared share card (app/opengraph-image.tsx) itself.
const shareImage = { url: "/opengraph-image", width: 1200, height: 630 };

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "en_CA",
      type: "website",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images: [shareImage],
    },
  };
}
