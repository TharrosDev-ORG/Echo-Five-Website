import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Colors are the paper ground (--bg in app/globals.css), matching the
 * viewport themeColor in app/layout.tsx. Icons are the file-based ones in
 * app/ (icon.svg, apple-icon.png), served at these paths.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "browser",
    lang: "en-CA",
    dir: "ltr",
    categories: ["business"],
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180", purpose: "any" },
    ],
  };
}
