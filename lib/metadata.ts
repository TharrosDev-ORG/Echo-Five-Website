import type { Metadata } from "next";
import { site } from "@/lib/site";

/** Per-page metadata: title, description, and a canonical URL for this path. */
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
    },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description },
  };
}
