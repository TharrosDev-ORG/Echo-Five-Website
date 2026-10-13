import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { principal } from "@/lib/content";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

const display = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600"],
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
  themeColor: "#f9fafc",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  description: site.description,
  url: site.url,
  email: site.email,
  areaServed: { "@type": "Country", name: "Canada" },
  founder: {
    "@type": "Person",
    name: principal.name,
    jobTitle: principal.role,
  },
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
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* The talk poster is the only third-party asset. */}
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
