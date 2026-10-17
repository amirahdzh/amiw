// How Amiw works with freelance clients, shown on pages/work-with-me.vue.
// Change a step, a fact or an answer here.

// The lowest price, for a simple one-page site. While it is empty the page
// says every project is quoted after the first call.
export const startingFrom = "";

// The quiet label at the top of the homepage and of the work page (and the
// "EN" / "ID" tags on the homepage bubbles). The folded answer under "Good to
// know" has the detail.
export const languageCodes = "EN / ID";
export const city = "Jakarta";
export const timezone = "GMT+7";

// When the terms below (the four facts) last changed, "YYYY-MM-DD". Shown
// under them as "Terms as of Oct 2026", so someone holding an older quote can
// see the terms have moved on. Change it whenever you change a fact.
export const termsUpdated = "2026-10-17";

// The four big numbers at the top of the page: the things that reassure a
// client most. `note` is the short line under the number. `question` and
// `reason` open when someone taps "Why?" on it.
export const facts = [
  {
    value: "Free",
    note: "first call, no commitment",
    question: "Why is the first call free?",
    reason:
      "You're probably in the middle of a problem, and I don't want you to spend a penny until you're convinced I'm the right person. If I'm not the right fit, you're free to walk away.",
  },
  {
    value: "50 / 50",
    note: "pay half to start, half at handover",
    question: "Why 50 / 50?",
    reason:
      "Half at the start lets me set aside time for your project and begin right away. The other half is due only when you have the finished work in your hands. That way neither of us carries all the risk.",
  },
  {
    value: "2 rounds",
    note: "of changes are included",
    question: "Why two rounds?",
    reason:
      "The first round catches what you only notice once you see it, and the second polishes. Two rounds keep the project moving and the price fair. Anything beyond that is quoted separately, so the price you agreed stays honest.",
  },
  {
    value: "30 days",
    note: "of free bug fixes after launch",
    question: "Why 30 days?",
    reason:
      "Real visitors find things testing never does. For 30 days after launch I fix any bug from my work for free, so you're not on your own just as the site meets the public. New features or changes aren't bugs. Those are quoted separately.",
  },
];

// Links to the fictional sample documents. Leave a value empty until the file
// exists: its "See a sample" link, and the "Can I see samples?" question, are
// only shown once there is something to open.
export const samples = {
  proposal: "",
  welcome: "",
  invoice: "",
};

export interface DetailRow {
  label: string;
  text: string;
  link?: { label: string; href: string };
}

export interface Step {
  title: string;
  // The one line that is always visible
  description: string;
  // Shown when someone opens "How it works"
  details: DetailRow[];
}

const sampleLink = (label: string, href: string) => (href ? { link: { label, href } } : {});

export const steps: Step[] = [
  {
    title: "Free intro call",
    description: "We talk about what you need. No cost, no commitment.",
    details: [
      {
        label: "What happens",
        text: "I listen first. You tell me what you need, and I ask questions until we both see the problem clearly.",
      },
      { label: "Where", text: "A video call or a WhatsApp call, up to 30 minutes." },
      {
        label: "You get",
        text: "A short written summary of what we agreed, by the next working day, in plain words.",
      },
    ],
  },
  {
    title: "Proposal",
    description: "Scope, price and timeline, in writing.",
    details: [
      {
        label: "What happens",
        text: "I write what I will build, what is not included, the price and the timeline.",
      },
      {
        label: "You get",
        text: "The proposal within 3 working days, through the channel we agree on. It stays valid for 14 days.",
        ...sampleLink("See a sample proposal", samples.proposal),
      },
    ],
  },
  {
    title: "Contract & invoice",
    description: "Terms in writing, and the first invoice.",
    details: [
      {
        label: "What happens",
        text: "You receive the contract and an invoice for the first 50%. Work starts when it is paid.",
      },
      {
        label: "How",
        text: "Sent by email as a PDF, in the currency we agreed in the proposal. Payment is due in 7 days.",
        ...sampleLink("See a sample invoice", samples.invoice),
      },
      {
        label: "If it's late",
        text: "I send a friendly reminder the day after the due date. If a payment is still missing a week later, work pauses and the start date moves with it.",
      },
    ],
  },
  {
    title: "Kickoff",
    description: "A welcome document, an access list, and a call to get on the same page.",
    details: [
      {
        label: "What happens",
        text: "I send the welcome document first. On the call we confirm the goals, who does what, the access I need, and how we will communicate.",
        ...sampleLink("See a sample welcome document", samples.welcome),
      },
      { label: "Where", text: "A video call, 30 to 45 minutes." },
    ],
  },
  {
    title: "Build, with check-ins",
    description: "You see progress along the way, not only at the end.",
    details: [
      {
        label: "Check-ins",
        text: "A short written update once a week, on a fixed day: what is done, what is next, and what I need from you.",
      },
      {
        label: "Calls",
        text: "A short call of 15 to 20 minutes only when it helps, or if you prefer calls.",
      },
      {
        label: "See it live",
        text: "A private preview link, so you can open the work in progress at any time.",
      },
      { label: "Feedback", text: "Send your changes in one batch. Two rounds are included." },
    ],
  },
  {
    title: "Handover",
    description: "Delivery and a walkthrough, so you know how everything works.",
    details: [
      {
        label: "What happens",
        text: "I deliver the work and walk you through it on a 30-minute video call, which I record for you to keep.",
      },
      {
        label: "You get",
        text: "The code and files, short written notes (how to log in, how to edit, where things are), and accounts and hosting moved into your name.",
      },
      {
        label: "Access",
        text: "Passwords are shared through a password manager, never by chat, and you change them afterwards.",
      },
      {
        label: "Final payment",
        text: "The final invoice is due in 7 days. The finished files and accounts are fully transferred when it arrives.",
      },
    ],
  },
];

export interface Faq {
  question: string;
  answer: string;
  links?: { label: string; href: string }[];
}

const sampleLinks = [
  { label: "Sample proposal", href: samples.proposal },
  { label: "Sample welcome document", href: samples.welcome },
  { label: "Sample invoice", href: samples.invoice },
].filter((l) => l.href);

// Folded questions under "Good to know".
export const faq: Faq[] = [
  {
    question: "What does it cost?",
    answer: `${
      startingFrom
        ? `Projects start from ${startingFrom} for a simple one-page site. Everything else is quoted after the first call, based on what the project needs.`
        : "Every project is quoted after the first call."
    } You pay 50% to start and 50% at handover. Larger projects can use milestones.`,
  },
  {
    question: "How do I pay, and in what currency?",
    answer:
      "I invoice in the currency we agree in the proposal, so the price doesn't move with exchange rates. I'm open to the payment method that works for you, such as bank transfer, Wise or PayPal. We can sort it out on the first call.",
  },
  {
    question: "How long does it take?",
    answer:
      "A small site takes 2 to 4 weeks. Larger projects are scoped in the proposal, so you know the timeline before you commit.",
  },
  {
    question: "What if I want more changes?",
    answer:
      "Two rounds of changes are included. A round is one batch of feedback sent together, so I can work through it in one go. Anything beyond that, or outside the agreed scope, is quoted separately.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Bugs from my work are fixed free for 30 days. A bug is something that doesn't work as agreed in the proposal. New features or changes you now want are quoted separately, and so is ongoing maintenance.",
  },
  {
    question: "Who owns the work?",
    answer: "You do. Everything is handed over, and it is yours after the final payment.",
  },
  {
    question: "Can I get a lower price?",
    answer:
      "If you are happy for me to show the finished project in my portfolio, we can talk about a lower price. It is optional, we agree in writing what is shown, and nothing goes up without your approval.",
  },
  // Only when there is a sample to open.
  ...(sampleLinks.length
    ? [
        {
          question: "Can I see samples of your documents?",
          answer: "Yes. These are fictional examples, with no client details.",
          links: sampleLinks,
        },
      ]
    : []),
  {
    question: "What if my plans change, or I go quiet?",
    answer:
      "Tell me and we adjust the plan. If I don't hear from you, I send a nudge after 3 working days and a second message after 7. After 14 days the project pauses, and your slot may move. If it stays paused for about 30 days, I close the project, invoice the work completed so far, and hand over what exists. Changes to the scope are quoted before I start them.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Replies within three working days, your content before the build starts, and the access I list in the welcome document. Projects move at the speed of the replies.",
  },
  {
    question: "What language and hours do we work in?",
    answer:
      "We can work in English or Bahasa Indonesia, whichever you're more comfortable with. I'm based in Jakarta (GMT+7). Wherever you are, we'll find a time for calls that works for both of us.",
  },
  {
    question: "Do you work with European clients? What about my data?",
    answer:
      "Yes. I have experience building GDPR-compliance software, and I build with privacy in mind. When a project involves personal data, I sign a data-processing agreement. I'm not a lawyer, so please check your own legal obligations too.",
  },
];
