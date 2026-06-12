import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const mono = Geist_Mono({
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
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0d12",
  colorScheme: "dark",
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
        {children}
      </body>
    </html>
  );
}
