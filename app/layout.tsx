import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/fx/Preloader";
import Cursor from "@/components/fx/Cursor";
import ScrollProgress from "@/components/fx/ScrollProgress";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Echofive Solutions · Microsoft 365 change management",
    template: "%s · Echofive Solutions",
  },
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
  ],
  authors: [{ name: site.legalName }],
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Echofive Solutions · Microsoft 365 change management",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_CA",
    type: "website",
  },
  // The OG/Twitter image is generated and wired up automatically by
  // app/opengraph-image.tsx; this just sets the card type and text.
  twitter: {
    card: "summary_large_image",
    title: "Echofive Solutions · Microsoft 365 change management",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f3efe7",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  description: site.description,
  url: site.url,
  email: site.email,
  areaServed: "CA",
  serviceType: "Microsoft 365 change management and adoption consulting",
  knowsAbout: [
    "Microsoft 365 adoption",
    "Prosci ADKAR change management",
    "SharePoint Online",
    "Microsoft Teams",
    "Microsoft Copilot",
    "Technical writing",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Opt into reveal animations only when JS runs, before first paint, so
            no-JS / crawlers keep content visible and there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollProgress />
        <Cursor />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
