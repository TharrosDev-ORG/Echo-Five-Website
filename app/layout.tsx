import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
