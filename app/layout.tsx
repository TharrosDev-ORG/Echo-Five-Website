import type { Metadata } from "next";
import { Public_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  title: "Echo-Five Consulting — Change management for the public sector",
  description:
    "Echo-Five helps government and public-sector organizations adopt Microsoft 365 with change management that lands and tools that get used.",
  metadataBase: new URL("https://echo-five.ca"),
  openGraph: {
    title: "Echo-Five Consulting",
    description: "Change management for the public sector.",
    url: "https://echo-five.ca",
    siteName: "Echo-Five",
    type: "website",
  },
};

const enableJsClass = `document.documentElement.classList.add('js-on');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: enableJsClass }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
