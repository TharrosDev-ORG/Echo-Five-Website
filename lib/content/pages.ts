/**
 * Inner-page headers and SEO. Each page agent owns its entry; headings here
 * open the page (and its share card), `title` and `description` feed <head>
 * only. Titles get " · Echofive Solutions" appended, so keep them under about
 * 40 characters; keep descriptions under about 160. Plain spaces, no NBSP.
 */
export const pages = {
  services: {
    path: "/services",
    title: "Microsoft 365 adoption services",
    index: "Services",
    heading: ["Microsoft 365", "adoption, end to end."],
    lead: "Six practice areas with one aim: people working the new way in Microsoft\u00A0365, and still working that way long after we step away.",
    description:
      "Microsoft 365 adoption strategy, communications, training, technical writing, AI coaching, and migration support for government and enterprise.",
  },
  approach: {
    path: "/approach",
    title: "Approach: Prosci ADKAR for Microsoft 365",
    index: "Approach",
    heading: ["We work on the part", "of a rollout that", "decides it: the people."],
    lead: "Most Microsoft 365 rollouts are run as IT projects with a training session added at the end. We work on the people side of the deployment, using the Prosci ADKAR model to move each person from awareness to lasting habit.",
    description:
      "Why Microsoft 365 rollouts stall, and how Echofive runs adoption on the Prosci ADKAR model: strategy, communications, training, and reinforcement.",
  },
  advanta365: {
    path: "/advanta365",
    title: "Advanta365 change management toolkit",
    index: "Our product",
    heading: ["Don’t start from", "a blank page."],
    lead: "Advanta365 is the change management and user adoption toolkit behind real SharePoint Online rollouts. Ready to use as is, or tailor with AI.",
    description:
      "Advanta365 by Echofive: the change management and user adoption toolkit behind real SharePoint Online rollouts. 59 playbooks, 130 templates, and 58 job aids.",
  },
  about: {
    path: "/about",
    title: "About the firm: credentials and clients",
    index: "About",
    heading: ["Thirty years.", "One job.", "Done properly."],
    lead: "Echofive Solutions is a senior change management practice built around one specialty: helping organizations actually adopt Microsoft 365.",
    description:
      "Echofive Solutions: a senior Microsoft 365 change management practice. Credentials, clearance, and more than thirty years of government and enterprise clients.",
  },
  contact: {
    path: "/contact",
    title: "Contact us about a Microsoft 365 rollout",
    index: "Contact",
    heading: ["Tell us what", "you are rolling out."],
    lead: "Whether you are scoping a migration or trying to rescue an adoption that has stalled, we will tell you plainly whether we can help.",
    description:
      "Start a conversation with Echofive Solutions about your Microsoft 365 rollout. Your message goes straight to the founder.",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy statement",
    index: "Privacy",
    heading: ["Privacy"],
    lead: "What this site collects, why, and what we do with it.",
    description:
      "How the Echofive Solutions website handles personal information: no cookies, no tracking scripts, and contact form details used only to reply.",
  },
  accessibility: {
    path: "/accessibility",
    title: "Accessibility statement",
    index: "Accessibility",
    heading: ["Accessibility"],
    lead: "Our commitment, the standard we build to, and how to tell us when something does not work for you.",
    description:
      "The Echofive Solutions accessibility statement: our WCAG 2.1 Level AA target, how we test, and how to tell us when something does not work for you.",
  },
} as const;
