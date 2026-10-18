import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";
import { advanta } from "@/lib/content/advanta";
import { principal } from "@/lib/content/shared";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import MobileCta from "@/components/site/MobileCta";
import MotionRoot from "@/components/motion/MotionRoot";

// Self-hosted (OFL) latin variable subsets. Fetching through next/font/google
// fails on Vercel's Turbopack builders.
const newsreader = localFont({
  src: [
    { path: "./fonts/Newsreader-Variable-latin.woff2", style: "normal", weight: "200 800" },
    { path: "./fonts/Newsreader-Italic-Variable-latin.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const sans = localFont({
  src: "./fonts/Geist-Variable-latin.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "400 600",
});

const mono = localFont({
  src: "./fonts/GeistMono-Variable-latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "400 600",
});

const defaultTitle = `${site.name} · Microsoft 365 change management`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Microsoft 365 adoption",
    "change management consultant",
    "Prosci ADKAR",
    "SharePoint Online migration",
    "Microsoft Teams adoption",
    "Copilot training",
    "Government of Canada",
    "technical writing",
    "Advanta365",
    "change management toolkit",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  publisher: site.legalName,
  // The root share card comes from app/opengraph-image.tsx (file-based).
  openGraph: {
    title: defaultTitle,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_CA",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  viewportFit: "cover",
};

/*
 * Structured data, on every page: the firm (Organization) and the site
 * (WebSite), linked by @id. Only facts already stated in lib/site.ts and
 * lib/content: no address, phone, prices, or ratings. Advanta365 appears as the
 * firm's brand; a Product node is left out because Google requires an offer
 * with a price, a review, or a rating, and the site publishes none of those.
 */
const orgId = `${site.url}/#organization`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.name,
      legalName: site.legalName,
      alternateName: site.shortName,
      description: site.description,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/apple-icon.png`,
        width: 180,
        height: 180,
      },
      email: site.email,
      slogan: site.tagline,
      areaServed: { "@type": "Country", name: "Canada" },
      founder: { "@type": "Person", name: principal.name, jobTitle: principal.role },
      knowsAbout: [
        "Microsoft 365 adoption",
        "Prosci ADKAR change management",
        "SharePoint Online",
        "Microsoft Teams",
        "Microsoft Copilot",
        "Technical writing",
      ],
      brand: {
        "@type": "Brand",
        name: advanta.name,
        description: advanta.description,
        url: advanta.urls.home,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      alternateName: site.shortName,
      inLanguage: "en-CA",
      publisher: { "@id": orgId },
    },
  ],
};

// JSON.stringify does not escape "<"; do it so no string can close the tag.
const jsonLdHtml = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

/*
 * Runs before first paint. `js` opts the page in to scroll-in motion; if the
 * app bundle never boots (MotionRoot adds `reveal-ready`), the class is removed
 * again so no content stays hidden.
 */
const jsFlag = `(function(d){d.classList.add("js");setTimeout(function(){if(!d.classList.contains("reveal-ready"))d.classList.remove("js")},2500)})(document.documentElement)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      id="top"
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdHtml }}
        />
      </head>
      <body className="tone-paper">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionRoot />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
