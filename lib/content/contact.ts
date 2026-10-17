/**
 * Contact page copy and the contact form's labels and messages. The hero
 * (heading, lead, SEO) lives in `pages.contact`.
 */

export const contact = {
  directLine: "Your message goes straight to the founder.",
  directLineLabel: "Direct line",
  stepsHeading: "What happens next",
  steps: [
    {
      n: "1",
      title: "You send a note",
      body: "Use the form or email us directly. Tell us what you are rolling out.",
    },
    {
      n: "2",
      title: "The founder replies directly",
      body: "Your message goes straight to Mark Abdelnour, the founder.",
    },
    {
      n: "3",
      title: "A first conversation about your rollout",
      body: "Whether you are scoping a migration or trying to rescue an adoption that has stalled, we will tell you plainly whether we can help.",
    },
  ],
  emailHeading: "Prefer email?",
  emailNote: "Write to us directly.",
  credentialsHeading: "Credentials",
  formHeading: "Send a message",
  formIndex: "Form",
};

/** Contact form labels and messages (components/contact/ContactForm). */
export const contactForm = {
  label: "Contact form",
  required: "All fields are required unless marked optional.",
  fields: {
    name: "Name",
    organization: "Organization",
    optional: "(optional)",
    email: "Work email",
    message: "What are you rolling out?",
    messageHint: "A sentence or two is plenty: the platform, the audience, and where things stand.",
  },
  submit: "Send message",
  submitting: "Sending…",
  fixFields: "Please fix the highlighted fields.",
  tooMany: "Too many messages from this connection.",
  failed: "Our form could not send right now.",
  fallbackPrefix: "Email",
  fallbackSuffix: "directly.",
  noscript: "Without JavaScript, sending opens your email app. You can also write to",
  success: {
    heading: "Message sent.",
    body: "Thank you. Your note has reached Mark directly.",
    again: "Send another message",
  },
  mailSubject: "Microsoft 365 adoption: a conversation",
};
