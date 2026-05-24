import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

// Single variable family. wght is the default axis; wdth (62–125) gives the
// "expanded" display width applied via font-stretch in globals.css.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "Echo-Five Consulting — Change management for the public sector",
  description:
    "Echo-Five helps government and public-sector organizations adopt Microsoft 365 with change management that lands and tools that get used.",
  metadataBase: new URL("https://echo-five.ca"),
  icons: { icon: "/favicon.svg" },
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
      className={archivo.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: enableJsClass }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
