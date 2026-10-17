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
  authors: [{ name: site.legalName }],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  alternateName: site.shortName,
  description: site.description,
  url: site.url,
  email: site.email,
  slogan: site.tagline,
  areaServed: { "@type": "Country", name: "Canada" },
  founder: { "@type": "Person", name: principal.name, jobTitle: principal.role },
  serviceType: "Microsoft 365 change management and adoption consulting",
  knowsAbout: [
    "Microsoft 365 adoption",
    "Prosci ADKAR change management",
    "SharePoint Online",
    "Microsoft Teams",
    "Microsoft Copilot",
    "Technical writing",
  ],
  brand: { "@type": "Brand", name: advanta.name, url: advanta.urls.home },
};

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
      className={`${newsreader.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
