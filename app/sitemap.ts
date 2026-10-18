import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { pages } from "@/lib/content/pages";
import { privacy, accessibility } from "@/lib/content/legal";

/**
 * Every public page. Inner pages come from lib/content/pages.ts so a new page
 * cannot be missed; /api and the 404 are never listed.
 *
 * `lastModified` is the date the content last changed, not the build time:
 * the legal statements carry their own `updated` date, everything else uses
 * `site.contentUpdated`.
 */
const legal: Record<string, string> = {
  [pages.privacy.path]: privacy.updated.iso,
  [pages.accessibility.path]: accessibility.updated.iso,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: site.url,
    lastModified: site.contentUpdated,
    changeFrequency: "monthly",
    priority: 1,
  } as const;

  const inner = Object.values(pages).map(({ path }) => {
    const updated = legal[path];
    return {
      url: `${site.url}${path}`,
      lastModified: updated ?? site.contentUpdated,
      changeFrequency: updated ? "yearly" : "monthly",
      priority: updated ? 0.3 : path === pages.contact.path ? 0.9 : 0.8,
    } as const;
  });

  return [home, ...inner];
}
