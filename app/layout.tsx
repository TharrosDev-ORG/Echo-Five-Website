import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { advanta, principal } from "@/lib/content";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import MobileCtaBar from "@/components/site/MobileCtaBar";
import RevealObserver from "@/components/ui/RevealObserver";

const display = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  weight: ["500", "600", "700"],
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["400", "500", "600"],
});

const defaultTitle = `${site.name} · Microsoft 365 change management`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s · ${site.name}`,
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
    "Advanta365",
    "change management toolkit",
  ],
  authors: [{ name: site.legalName }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: defaultTitle,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_CA",
    type: "website",
  },
  // The OG/Twitter image comes from app/opengraph-image.tsx.
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f8f7",
  colorScheme: "light",
  // Lets the mobile CTA bar pad itself clear of the home indicator.
  viewportFit: "cover",
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
  makesOffer: {
    "@type": "Offer",
    // "$1,499.99" -> "1499.99", so the structured data follows the displayed price.
    price: advanta.price.amount.replace(/[^0-9.]/g, ""),
    priceCurrency: advanta.price.currency,
    url: advanta.urls.purchase,
    itemOffered: {
      "@type": "Product",
      name: advanta.name,
      description: advanta.description,
      url: advanta.urls.home,
    },
  },
};

/*
 * Runs before first paint. `js` opts the page in to reveal animations; if the
 * app bundle never boots (RevealObserver adds `reveal-ready`), the class is
 * removed again so no content stays hidden.
 */
const jsFlag = `(function(d){d.classList.add("js");setTimeout(function(){if(!d.classList.contains("reveal-ready"))d.classList.remove("js")},3000)})(document.documentElement)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
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
        <RevealObserver />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
