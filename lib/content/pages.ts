/**
 * Inner-page headers and SEO. Each page agent owns its entry; headings here
 * open the page, descriptions feed <meta> (plain spaces, no NBSP).
 */
export const pages = {
  services: {
    path: "/services",
    title: "Services",
    index: "Services",
    heading: ["Microsoft 365", "adoption, end to end."],
    lead: "Six practice areas with one aim: people working the new way in Microsoft\u00A0365, and still working that way long after we step away.",
    description:
      "Microsoft 365 adoption strategy, communications, training, technical writing, AI coaching, and migration support for government and enterprise.",
  },
  approach: {
    path: "/approach",
    title: "Approach",
    index: "Approach",
    heading: ["We work on the part", "of a rollout that", "decides it: the people."],
    lead: "Most Microsoft 365 rollouts are run as IT projects with a training session added at the end. We work on the people side of the deployment, using the Prosci ADKAR model to move each person from awareness to lasting habit.",
    description:
      "Why Microsoft 365 rollouts stall, and how Echofive runs adoption on the Prosci ADKAR model: strategy, communications, training, and reinforcement.",
  },
  advanta365: {
    path: "/advanta365",
    title: "Advanta365",
    index: "Our product",
    heading: ["Don’t start from", "a blank page."],
    lead: "Advanta365 is the change management and user adoption toolkit behind real SharePoint Online rollouts. Ready to use as is, or tailor with AI.",
    description:
      "Advanta365, a product of Echofive: the change management and user adoption toolkit behind real SharePoint Online rollouts. 59 playbooks, 130 templates, 4 field guides, and training with 58 job aids.",
  },
  about: {
    path: "/about",
    title: "About",
    index: "About",
    heading: ["Thirty years.", "One job.", "Done properly."],
    lead: "Echofive Solutions is a senior change management practice built around one specialty: helping organizations actually adopt Microsoft 365.",
    description:
      "Echofive Solutions: a senior Microsoft 365 change management practice. Credentials, clearance, and more than thirty years of government and enterprise clients.",
  },
  contact: {
    path: "/contact",
    title: "Contact",
    index: "Contact",
    heading: ["Tell us what", "you are rolling out."],
    lead: "Whether you are scoping a migration or trying to rescue an adoption that has stalled, we will tell you plainly whether we can help.",
    description:
      "Start a conversation with Echofive Solutions about your Microsoft 365 rollout. Your message goes straight to the founder.",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy",
    index: "Privacy",
    heading: ["Privacy"],
    lead: "What this site collects, why, and what we do with it.",
    description: "How the Echofive Solutions website handles personal information.",
  },
  accessibility: {
    path: "/accessibility",
    title: "Accessibility",
    index: "Accessibility",
    heading: ["Accessibility"],
    lead: "Our commitment, the standard we build to, and how to tell us when something does not work for you.",
    description: "The accessibility statement for the Echofive Solutions website.",
  },
} as const;
