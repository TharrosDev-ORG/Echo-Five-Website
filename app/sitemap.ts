import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.8 },
  { path: "/approach", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
