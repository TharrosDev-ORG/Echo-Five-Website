import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy for the prerendered pages.
 *
 * Pages are static, so there is no per-request nonce. script-src needs
 * 'unsafe-inline' because the App Router inlines its own bootstrap and RSC
 * payload scripts (`self.__next_f.push(...)`), whose contents differ per page
 * and per build, so they cannot be hashed. (A hash next to 'unsafe-inline'
 * would make browsers ignore 'unsafe-inline', so the pre-paint script in
 * app/layout.tsx is covered by it too.) The rest of the policy still does real
 * work: no third-party script, connect, image or frame origins, no plugins, no
 * <base> hijacking, no posting forms off-site, no framing of this site.
 *
 * - style-src 'unsafe-inline': React renders `style` attributes (motion delays).
 * - img-src data: the paper-grain texture in globals.css is an SVG data URI.
 * - frame-src: the click-to-load talk player (components/site/Talk.tsx). Its
 *   poster is self-hosted, so no YouTube image host is needed.
 * - form-action mailto: the contact form's no-JavaScript fallback posts to a
 *   mailto: link.
 * - Dev only: 'unsafe-eval' (React's dev tooling) and ws: (HMR).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "frame-src https://www.youtube-nocookie.com",
  "media-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
  // Not in dev: `next dev` serves plain http on localhost.
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

/** The API only ever returns JSON; it never needs to load or frame anything. */
const apiCsp = "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    // The Advanta365 page moved from /product when the site was rebuilt.
    return [{ source: "/product", destination: "/advanta365", permanent: true }];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=(), payment=(), usb=(), browsing-topics=()",
          },
        ],
      },
      {
        // Later entries win for the same key.
        source: "/api/:path*",
        headers: [
          { key: "Content-Security-Policy", value: apiCsp },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
