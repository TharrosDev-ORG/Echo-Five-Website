/**
 * Copy for the privacy and accessibility statements, the 404, and the error
 * page.
 *
 * Every statement here describes what the code actually does (see
 * app/api/contact/route.ts, components/site/Talk.tsx, app/layout.tsx and
 * scripts/check-ui.mjs). If that behaviour changes, change this file and the
 * `updated` date with it. No em dashes; "Microsoft 365" uses a non-breaking
 * space in visible copy.
 */
import { site } from "@/lib/site";

/** A run of text: plain, or a link. */
export type Inline = string | { text: string; href: string };
export type Rich = string | readonly Inline[];

export type LegalBlock =
  | { kind: "p"; text: Rich }
  | { kind: "list"; items: readonly ListItem[] };

/** A list item: plain copy, or copy led by a short term set in the heading colour. */
export type ListItem = Rich | { term: string; text: Rich };

export type LegalSection = {
  id: string;
  title: string;
  blocks: readonly LegalBlock[];
};

export type LegalDoc = {
  updated: { iso: string; label: string };
  glance: {
    title: string;
    note: string;
    rows: readonly { term: string; value: string }[];
  };
  sections: readonly LegalSection[];
};

const mail = { text: site.email, href: `mailto:${site.email}` };

export const legalUi = {
  updatedLabel: "Last updated",
  tocLabel: "On this page",
  tocHeading: "On this page",
};

/* ------------------------------------------------------------------ *
 * Privacy
 * ------------------------------------------------------------------ */

export const privacy: LegalDoc = {
  updated: { iso: "2026-10-17", label: "October 17, 2026" },
  glance: {
    title: "At a glance",
    note: "A summary. The sections below give the detail.",
    rows: [
      { term: "Cookies", value: "None. This site does not set any." },
      {
        term: "Tracking",
        value: "None. No advertising, tracking, or visit-measuring scripts.",
      },
      {
        term: "Contact form",
        value: "Your name, organization, email, and message, sent to our inbox. Used only to reply.",
      },
      {
        term: "Your IP address",
        value: "Held briefly in memory to stop repeated form submissions. Not stored by the site.",
      },
      { term: "Video", value: "The player loads from YouTube only after you press play." },
      { term: "Questions", value: site.email },
    ],
  },
  sections: [
    {
      id: "browsing",
      title: "When you browse",
      blocks: [
        {
          kind: "p",
          text: `${site.legalName} (“Echofive”, “we”) runs this website. You can read every page without telling us who you are.`,
        },
        {
          kind: "list",
          items: [
            "The site sets no cookies.",
            "There are no advertising, tracking, or visit-measuring scripts, and no social media widgets.",
            "Our fonts are served from this site, not from a font service.",
            "We do not build profiles of visitors or follow you across other sites.",
          ],
        },
      ],
    },
    {
      id: "contact-form",
      title: "When you write to us",
      blocks: [
        {
          kind: "p",
          text: "The contact form asks for your name, your organization (optional), your email address, and a message. When you send it, those four things are delivered to Echofive’s inbox as an email, through an email delivery service called Resend. Your email address is set as the reply address so we can answer you.",
        },
        {
          kind: "p",
          text: "We use what you send only to reply to you and to carry on that conversation. We do not add you to a mailing list. Your message stays in our inbox as ordinary business correspondence.",
        },
        {
          kind: "p",
          text: [
            "If the mail service cannot be reached, the page offers to open a message in your own email program instead, addressed to ",
            mail,
            ". In that case your message travels through your own email provider, like any other email.",
          ],
        },
        {
          kind: "p",
          text: "The form also contains a hidden field that people never see or fill in. It exists to catch automated spam and holds nothing about you.",
        },
      ],
    },
    {
      id: "ip-addresses",
      title: "IP addresses and server logs",
      blocks: [
        {
          kind: "p",
          text: "To stop one computer from flooding the form, the site counts submissions per IP address over a ten-minute window. That count is kept only in the server’s working memory and is cleared as the window passes or the server restarts. The site does not write your IP address to a file or a database.",
        },
        {
          kind: "p",
          text: "The site is hosted by Vercel. Like any web host, Vercel keeps standard server logs of requests, which can include your IP address, browser type, the page requested, and the time. Vercel handles those logs under its own privacy policy.",
        },
      ],
    },
    {
      id: "video",
      title: "The video",
      blocks: [
        {
          kind: "p",
          text: "Our conference talk is hosted on YouTube. The player does not load until you press play. When you do, it loads from youtube-nocookie.com, YouTube’s privacy-enhanced mode, and from then on YouTube’s own privacy policy applies to what happens in the player.",
        },
        {
          kind: "p",
          text: "The preview picture for the talk is served from this site, so nothing is requested from YouTube until you press play.",
        },
        {
          kind: "p",
          text: "The “Open on YouTube” link takes you to youtube.com, which is outside this site.",
        },
      ],
    },
    {
      id: "service-providers",
      title: "Who else handles it",
      blocks: [
        {
          kind: "p",
          text: "Two service providers handle information on our behalf: Vercel, which hosts the site, and Resend, which delivers contact form messages to our inbox. Both may process data outside Canada, including in the United States, where it can be subject to the laws of that country.",
        },
        {
          kind: "p",
          text: "We do not sell personal information, and we do not share it with anyone else for their own use.",
        },
      ],
    },
    {
      id: "other-sites",
      title: "Links to other sites",
      blocks: [
        {
          kind: "p",
          text: "Some links lead to other sites, such as advanta365.com and YouTube. Those sites have their own privacy practices, which this statement does not cover.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights in Canada",
      blocks: [
        {
          kind: "p",
          text: "Echofive is a Canadian business. The federal Personal Information Protection and Electronic Documents Act (PIPEDA) sets out how private-sector organizations collect, use, and disclose personal information in the course of commercial activity.",
        },
        {
          kind: "p",
          text: [
            "You can ask us what personal information we hold about you, and ask us to correct it or delete it. Write to ",
            mail,
            ". If you are not satisfied with our answer, you can contact the Office of the Privacy Commissioner of Canada.",
          ],
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this statement",
      blocks: [
        {
          kind: "p",
          text: "If the site starts handling information differently, we will update this page and the date at the top.",
        },
      ],
    },
    {
      id: "contact",
      title: "Questions",
      blocks: [
        {
          kind: "p",
          text: ["For any question about privacy on this site, write to ", mail, "."],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Accessibility
 * ------------------------------------------------------------------ */

export const accessibility: LegalDoc = {
  updated: { iso: "2026-10-17", label: "October 17, 2026" },
  glance: {
    title: "At a glance",
    note: "A summary. The sections below give the detail.",
    rows: [
      { term: "Standard", value: "WCAG 2.1 Level AA, as our target for every page." },
      {
        term: "Built in",
        value: "Keyboard access, visible focus, AA contrast, reduced motion, works without JavaScript.",
      },
      { term: "Known limit", value: "The YouTube player, once you load it, is YouTube’s." },
      { term: "Report a barrier", value: site.email },
    ],
  },
  sections: [
    {
      id: "commitment",
      title: "Our commitment",
      blocks: [
        {
          kind: "p",
          text: "Much of our work is for public-sector organizations, where accessibility is a requirement, not a preference. We hold our own site to the same standard. Everyone who needs to read about our work should be able to, whatever device, settings, or assistive technology they use.",
        },
      ],
    },
    {
      id: "standard",
      title: "The standard we build to",
      blocks: [
        {
          kind: "p",
          text: "Our target is the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA, published by the World Wide Web Consortium. It is a widely used international standard for web accessibility.",
        },
        {
          kind: "p",
          text: "We treat Level AA as the floor, not the finish line. Where we know of a gap, we list it below rather than claim full conformance.",
        },
      ],
    },
    {
      id: "built-in",
      title: "What we built in",
      blocks: [
        {
          kind: "list",
          items: [
            { term: "Keyboard access.", text: "Every link, button, and form field can be reached and used with a keyboard, in a logical order. A “Skip to content” link is the first thing on every page." },
            { term: "Visible focus.", text: "The element you are on is always outlined, so you can see where you are." },
            { term: "Contrast.", text: "Text and interface colours are chosen and checked to meet AA contrast ratios on every background the site uses." },
            { term: "Reduced motion.", text: "If your device is set to reduce motion, the site’s animations are switched off and everything is simply shown. Moving content, such as the scrolling client names, can also be paused." },
            { term: "Works without JavaScript.", text: "Every page can be read in full with JavaScript turned off. Animation is layered on top, so turning scripts off hides nothing." },
            { term: "Structure for screen readers.", text: "Pages use landmarks (header, navigation, main content, footer), one main heading, headings in order, labelled form fields, and text alternatives for meaningful images and diagrams." },
            { term: "Readable text.", text: "Body text is set at a comfortable size and line length, and layouts adapt to small screens and browser zoom." },
          ],
        },
      ],
    },
    {
      id: "how-we-check",
      title: "How we check",
      blocks: [
        {
          kind: "p",
          text: "During development, we run every page through automated checks: the axe-core tests for WCAG 2.1 A and AA rules, a check that each page has exactly one main heading, a check for sideways scrolling at widths from 360 to 1440 pixels, and a check that content stays visible without JavaScript.",
        },
        {
          kind: "p",
          text: "Automated tools find only part of what matters. That is why a note from someone using the site is worth more to us than any test result.",
        },
      ],
    },
    {
      id: "known-limitations",
      title: "Known limitations",
      blocks: [
        {
          kind: "list",
          items: [
            { term: "The YouTube player.", text: "Our conference talk plays in YouTube’s own player, which loads only when you press play. Once it has loaded, its controls, keyboard behaviour, and captions are provided by YouTube, and we cannot change them." },
            { term: "Other sites.", text: "Links to other sites, including advanta365.com, lead to pages this statement does not cover." },
          ],
        },
        {
          kind: "p",
          text: [
            "If you need the talk, or anything else on this site, in another format, write to ",
            mail,
            " and we will work out a way to get it to you.",
          ],
        },
      ],
    },
    {
      id: "report",
      title: "Report a barrier",
      blocks: [
        {
          kind: "p",
          text: [
            "If something on this site does not work for you, please tell us at ",
            mail,
            ". It helps to include the page address, what you were trying to do, and the browser or assistive technology you were using, but send whatever you have.",
          ],
        },
        {
          kind: "p",
          text: "We read every report, aim to reply promptly, and will tell you what we are going to do about it.",
        },
      ],
    },
    {
      id: "statement",
      title: "About this statement",
      blocks: [
        {
          kind: "p",
          text: "We review this statement when the site changes. The date at the top shows when it was last updated.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Page openings (the h1 lines; titles, leads and SEO live in pages.ts)
 * ------------------------------------------------------------------ */

export type LegalHeading = {
  /** Lines before the last one. */
  lines: readonly string[];
  /** The last line, with the highlighted word(s) in `mark`. */
  last: { before?: string; mark: string; after?: string };
};

export const legalHeadings: Record<"privacy" | "accessibility", LegalHeading> = {
  privacy: { lines: ["Privacy, in"], last: { mark: "plain", after: "language." } },
  accessibility: { lines: ["Accessibility is"], last: { before: "part of the", mark: "work." } },
};

/* ------------------------------------------------------------------ *
 * 404 and error
 * ------------------------------------------------------------------ */

export const notFoundPage = {
  title: "Page not found",
  code: "404",
  caption: "Page not found",
  captionNote: "Nothing at this address",
  heading: { before: "We could not", mark: "find", after: "that page." },
  body: "The address may be mistyped, or the page may have moved when we rebuilt the site. Everything we publish is one click away from here.",
  primary: "Back to the home page",
  secondary: "Start a conversation",
  moreLabel: "Or go straight to",
};

export const errorPage = {
  code: "Error",
  caption: "Something went wrong",
  captionNote: "On our side, not yours",
  heading: { before: "This page did not", mark: "load", after: "properly." },
  body: "Something failed while we were putting the page together. Trying again usually fixes it. If it keeps happening, please tell us.",
  primary: "Try again",
  secondary: "Back to the home page",
  emailLabel: "Or write to",
  refLabel: "Reference",
};
