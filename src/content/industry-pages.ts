/**
 * Industry page content, one entry per industry slug in catalogue.ts.
 * DRAFT copy for the owner to confirm. Follows the scope's industry template:
 * pain-led hero, problems we solve, assistant roles, tools, compliance note.
 * (Phase 2 moves this into Sanity.)
 */

export type IndustryPageContent = {
  metaTitle: string;
  metaDescription: string;
  /** H1 naming the industry's pain. */
  heading: string;
  intro: string;
  problems: { title: string; description: string }[];
  /** Role cards; `service` links to the matching service page. */
  roles: { title: string; tasks: string; service: string }[];
  tools: string[];
  compliance: { title: string; text: string };
};

export const industryPages: Record<string, IndustryPageContent> = {
  hospitality: {
    metaTitle: "Remote assistants for hospitality and short-term lets",
    metaDescription:
      "Guest messaging, booking platforms and bookkeeping handled by trained remote assistants working UK hours.",
    heading: "Booking platforms, guest messages and bookkeeping, handled",
    intro:
      "Trained assistants for hotels, aparthotels and holiday-let operators. They manage your booking platforms, answer guests and keep your books up to date.",
    problems: [
      { title: "Guest messages at all hours", description: "Enquiries and check-in questions arrive faster than you can answer them." },
      { title: "Too many platforms", description: "Airbnb, Booking.com and your own site all need updating and checking." },
      { title: "Reviews go unanswered", description: "Replying to every review takes time you don't have." },
      { title: "Books fall behind", description: "Payouts, fees and cleaning costs pile up before you reconcile them." },
    ],
    roles: [
      { title: "Guest & booking-platform assistant", tasks: "Guest messaging, calendars, listings and reviews", service: "customer-support" },
      { title: "Hospitality bookkeeper", tasks: "Platform payouts, reconciliations and VAT-ready records", service: "bookkeepers" },
      { title: "Reservations support", tasks: "Bookings, changes, cancellations and upsells", service: "virtual-assistants" },
    ],
    tools: ["Airbnb", "Booking.com", "Guesty", "Hostaway", "Lodgify", "Xero", "QuickBooks"],
    compliance: {
      title: "Card data handled safely",
      text: "Assistants never store card details. They work inside your property management system, follow PCI DSS rules for payments, and use your secure tools only.",
    },
  },
  "accounting-firms": {
    metaTitle: "Remote bookkeepers and accountants for accounting practices",
    metaDescription:
      "Add capacity to your practice with trained remote bookkeepers, accounts and tax preparers, payroll and practice admin.",
    heading: "More capacity for your practice, without more hires",
    intro:
      "Trained bookkeepers, accounts preparers and practice administrators who work in your software and your review process, so your team can take on more clients.",
    problems: [
      { title: "Busy-season backlogs", description: "Year ends and January deadlines stack up faster than your team can clear them." },
      { title: "Hard to hire locally", description: "Good bookkeepers and juniors are expensive and slow to recruit." },
      { title: "Partners doing admin", description: "Chasing records and client onboarding eats into billable time." },
      { title: "Payroll pressure", description: "Monthly payroll runs leave little room for advisory work." },
    ],
    roles: [
      { title: "Bookkeepers", tasks: "Reconciliations, ledgers and VAT returns for review", service: "bookkeepers" },
      { title: "Accounts & tax preparers", tasks: "Year-end accounts and tax computations", service: "accountants" },
      { title: "Payroll", tasks: "Payroll runs, RTI and pension submissions", service: "accountants" },
      { title: "Practice admin", tasks: "Client onboarding, chasing records and diaries", service: "virtual-assistants" },
    ],
    tools: ["Xero", "QuickBooks", "Sage", "IRIS", "TaxCalc", "Dext", "BrightPay", "Karbon"],
    compliance: {
      title: "Client data stays in your systems",
      text: "Assistants work only inside your practice software, sign confidentiality agreements and follow your AML and data protection procedures.",
    },
  },
  "estate-letting-agents": {
    metaTitle: "Remote assistants for estate and letting agents",
    metaDescription:
      "Lettings admin, tenant communications, maintenance coordination and listings handled by trained remote assistants.",
    heading: "Lettings admin and tenant messages, off your desk",
    intro:
      "Trained assistants for UK estate and letting agents. They handle lettings paperwork, keep tenants and landlords updated, and coordinate maintenance.",
    problems: [
      { title: "Admin slows every let", description: "Referencing, tenancy paperwork and compliance checks take hours per property." },
      { title: "Tenants want quick replies", description: "Calls and emails pile up while your team is out on viewings." },
      { title: "Maintenance chasing", description: "Coordinating contractors, landlords and tenants never stops." },
      { title: "Listings to update", description: "Portals and your website need keeping current." },
    ],
    roles: [
      { title: "Lettings admin", tasks: "Referencing, tenancy agreements and compliance checks", service: "virtual-assistants" },
      { title: "Tenant communications", tasks: "Calls, emails and updates for tenants and landlords", service: "customer-support" },
      { title: "Maintenance coordination", tasks: "Logging jobs, booking contractors and follow-ups", service: "virtual-assistants" },
      { title: "Listings", tasks: "Portal listings, descriptions and photos", service: "marketing-assistants" },
    ],
    tools: ["Reapit", "Alto", "Street.co.uk", "Rightmove", "Zoopla", "Fixflo", "Goodlord"],
    compliance: {
      title: "Tenant data protected",
      text: "Assistants work inside your property software, never download tenant documents to personal devices, and follow your UK GDPR procedures.",
    },
  },
  "law-firms": {
    metaTitle: "Remote legal assistants for law firms and solicitors",
    metaDescription:
      "Paralegal admin, legal secretarial, document review and conveyancing support from trained remote legal assistants.",
    heading: "Legal admin handled, so fee earners can bill",
    intro:
      "Trained legal assistants who handle admin, document preparation and conveyancing support under your supervision.",
    problems: [
      { title: "Fee earners doing admin", description: "Solicitors spend non-billable hours on formatting, filing and chasing." },
      { title: "Conveyancing paperwork", description: "Searches, forms and client updates slow every file." },
      { title: "Dictation backlogs", description: "Typing and correspondence wait days to be done." },
      { title: "Onboarding checks", description: "ID and AML checks hold up new matters." },
    ],
    roles: [
      { title: "Paralegal admin", tasks: "Case files, bundles and matter records", service: "legal-assistants" },
      { title: "Legal secretarial", tasks: "Dictation, correspondence and diaries", service: "legal-assistants" },
      { title: "Document review", tasks: "First-pass review and summaries for your lawyers", service: "legal-assistants" },
      { title: "Conveyancing support", tasks: "Searches, forms and client updates", service: "legal-assistants" },
    ],
    tools: ["Clio", "LEAP", "Actionstep", "InfoTrack", "Microsoft 365", "DocuSign"],
    compliance: {
      title: "Built around SRA rules",
      text: "Assistants work under your supervision, inside your case management system, and never give legal advice. Confidentiality agreements are signed before any access.",
    },
  },
  "financial-brokers": {
    metaTitle: "Remote assistants for mortgage and financial brokers",
    metaDescription:
      "Admin and case support plus client communications for UK mortgage, protection and insurance brokers.",
    heading: "Case admin and client updates, handled",
    intro:
      "Trained assistants for UK brokers. They package cases, chase documents and keep clients updated so advisers can focus on advice.",
    problems: [
      { title: "Case packaging takes hours", description: "Collecting and checking documents slows every application." },
      { title: "Constant chasing", description: "Lenders, clients and solicitors all need following up." },
      { title: "Clients want updates", description: "Calls asking for progress interrupt advice time." },
      { title: "CRM falls behind", description: "Notes and stages don't get updated." },
    ],
    roles: [
      { title: "Admin and case support", tasks: "Document collection, case packaging and lender chasing", service: "virtual-assistants" },
      { title: "Client communications", tasks: "Progress updates, reminders and appointment booking", service: "customer-support" },
    ],
    tools: ["Mortgage Brain", "Acre", "Twenty7tec", "Iress", "Microsoft 365"],
    compliance: {
      title: "FCA-aware ways of working",
      text: "Assistants handle admin only and never give advice. They work inside your CRM and follow your data protection and record-keeping procedures.",
    },
  },
  smes: {
    metaTitle: "Remote assistants for small and mid-sized UK businesses",
    metaDescription:
      "VA and admin, sales, customer support and marketing assistants for growing UK businesses, managed by SkillDen.",
    heading: "The support a growing business needs, without UK hiring costs",
    intro:
      "Dedicated assistants for small and mid-sized UK businesses: admin, sales, customer support and marketing, trained and managed by SkillDen.",
    problems: [
      { title: "Owners doing everything", description: "Admin and inbox work crowds out the jobs only you can do." },
      { title: "Leads go cold", description: "Enquiries wait too long for a reply." },
      { title: "Customers waiting", description: "Support emails and calls build up during busy weeks." },
      { title: "Marketing stops", description: "Posting and newsletters slip when the team is busy." },
    ],
    roles: [
      { title: "VA & admin", tasks: "Inbox, diary, documents and day-to-day admin", service: "virtual-assistants" },
      { title: "Sales", tasks: "Lead follow-up, prospecting and booked meetings", service: "sales-assistants" },
      { title: "Customer support", tasks: "Email, chat and phone support in UK hours", service: "customer-support" },
      { title: "Marketing", tasks: "Social media, content and email campaigns", service: "marketing-assistants" },
    ],
    tools: ["Microsoft 365", "Google Workspace", "HubSpot", "Xero", "Canva", "Shopify", "Slack"],
    compliance: {
      title: "Your data stays in your systems",
      text: "Assistants work inside your accounts, use a password manager, keep no data on personal devices and sign confidentiality agreements.",
    },
  },
};
