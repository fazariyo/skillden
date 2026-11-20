/**
 * Service page content, one entry per service slug in catalogue.ts.
 * DRAFT copy for the owner to confirm; [square brackets] = facts the owner must supply.
 * Follows the scope's service template: tasks, tools, vetting, industries served, pricing.
 * (Phase 2 moves this into Sanity.)
 */

export type ServicePageContent = {
  metaTitle: string;
  metaDescription: string;
  /** H1: role name + one-line outcome. */
  heading: string;
  overview: string;
  /** "Sounds familiar?": three problems this role solves, in the client's words. */
  pains: string[];
  tasks: string[];
  tools: string[];
  /** "How we vet and train for this role": 4 short points. */
  vetting: { title: string; description: string }[];
  /** Industry slugs this role serves (catalogue.ts). */
  industries: string[];
  /** Curved hero illustration; omitted = text-only hero. PLACEHOLDER artwork from the old site. */
  heroImage?: string;
};

const englishCheck = { title: "English tested", description: "Written and spoken English checked before shortlisting." };
const trialWeek = { title: "Trial week", description: "Start with a trial week so you can see the work before committing." };

export const servicePages: Record<string, ServicePageContent> = {
  "virtual-assistants": {
    metaTitle: "Virtual assistants and admin support for UK businesses",
    metaDescription:
      "Hire a dedicated virtual assistant who works UK hours. Inbox, diary, documents and admin, managed by SkillDen.",
    heading: "Virtual assistants who keep your week organised",
    overview:
      "A dedicated virtual assistant takes care of your inbox, diary, documents and day-to-day admin, so you can spend your time on the work only you can do. Ideal for UK business owners, directors and busy teams.",
    pains: [
      "Your inbox is the first thing you open and the last thing you close.",
      "Meetings get double-booked and follow-ups slip through the cracks.",
      "You spend more time organising work than doing it.",
    ],
    tasks: [
      "Manage your inbox and reply to routine emails",
      "Organise your diary and book meetings",
      "Prepare documents, letters and presentations",
      "Keep CRM and spreadsheet records up to date",
      "Arrange travel and accommodation",
      "Research suppliers, prospects and topics",
      "Chase invoices, forms and follow-ups",
      "Organise shared drives and files",
    ],
    tools: ["Microsoft 365", "Google Workspace", "Outlook", "Calendly", "Slack", "Trello", "HubSpot"],
    vetting: [
      englishCheck,
      { title: "Admin skills tested", description: "Practical tasks in email, documents and spreadsheets." },
      { title: "Trained on your tools", description: "Set up and trained on your systems before day one." },
      trialWeek,
    ],
    industries: ["smes", "estate-letting-agents", "financial-brokers", "law-firms"],
    heroImage: "/images/services/hero/virtual-assistants.webp",
  },
  bookkeepers: {
    metaTitle: "Remote bookkeepers for UK businesses and practices",
    metaDescription:
      "Hire a dedicated remote bookkeeper trained in Xero, QuickBooks and Sage. Reconciliations, VAT-ready records and payroll support.",
    heading: "Bookkeepers who keep your records accurate and VAT-ready",
    overview:
      "A dedicated bookkeeper handles your day-to-day financial records so your accounts stay accurate and ready for VAT returns and year end. Ideal for UK small businesses and accounting practices that need extra capacity.",
    pains: [
      "Receipts pile up and the books are always a month behind.",
      "VAT deadlines arrive with a scramble, not a plan.",
      "You can't see how the business is doing until your accountant tells you.",
    ],
    tasks: [
      "Record and categorise daily transactions",
      "Complete bank and credit card reconciliations",
      "Process purchase and sales ledgers",
      "Raise invoices and chase late payments",
      "Prepare VAT returns for your review",
      "Support payroll and pension processing",
      "Produce monthly management reports",
      "Tidy up and catch up on backlogged books",
    ],
    tools: ["Xero", "QuickBooks", "Sage", "Dext", "Hubdoc", "Excel"],
    vetting: [
      { title: "Bookkeeping tested", description: "Reconciliation and ledger tasks completed in Xero, QuickBooks or Sage." },
      { title: "UK training", description: "Trained on UK VAT, payroll basics and Making Tax Digital." },
      englishCheck,
      trialWeek,
    ],
    industries: ["accounting-firms", "hospitality", "smes", "estate-letting-agents"],
    heroImage: "/images/services/hero/bookkeepers.webp",
  },
  "sales-assistants": {
    metaTitle: "Sales and lead generation assistants",
    metaDescription:
      "Hire a dedicated sales assistant to find prospects, follow up leads and book meetings into your calendar.",
    heading: "Sales assistants who fill your calendar with qualified calls",
    overview:
      "A dedicated sales and lead generation assistant finds prospects, follows up enquiries and books meetings, so your team spends its time closing. Ideal for UK service businesses, agencies and brokers.",
    pains: [
      "Leads go cold because nobody follows up in time.",
      "You're prospecting at night instead of closing in the day.",
      "The CRM is out of date, so you don't trust your pipeline.",
    ],
    tasks: [
      "Research and build prospect lists",
      "Follow up new enquiries quickly",
      "Qualify leads against your criteria",
      "Book and confirm sales meetings",
      "Run LinkedIn and email outreach",
      "Re-engage past enquiries and lost leads",
      "Keep your CRM accurate and up to date",
      "Report weekly on activity and bookings",
    ],
    tools: ["HubSpot", "Salesforce", "Pipedrive", "LinkedIn Sales Navigator", "Apollo", "Calendly"],
    vetting: [
      { title: "Call and email tested", description: "Role-play calls and written outreach assessed before shortlisting." },
      { title: "Trained on your script", description: "Trained on your offer, script and qualification rules." },
      englishCheck,
      trialWeek,
    ],
    industries: ["smes", "financial-brokers", "estate-letting-agents"],
    heroImage: "/images/services/hero/sales-assistants.webp",
  },
  "customer-support": {
    metaTitle: "Customer support assistants working UK hours",
    metaDescription:
      "Hire a dedicated customer support assistant to answer email, chat and phone enquiries in UK hours.",
    heading: "Customer support assistants who answer in UK hours",
    overview:
      "A dedicated support assistant answers your customers by email, chat and phone during UK hours, using your tone and your processes. Ideal for UK businesses, hospitality operators and online sellers.",
    pains: [
      "Customers wait hours, or days, for a reply.",
      "You answer the same questions again and again.",
      "Support pulls you away from the work that grows the business.",
    ],
    tasks: [
      "Answer email and live chat enquiries",
      "Handle inbound and outbound calls",
      "Process orders, changes and refunds",
      "Log and track issues to resolution",
      "Update help articles and saved replies",
      "Respond to reviews and messages",
      "Escalate complex issues to your team",
      "Report on volumes and response times",
    ],
    tools: ["Zendesk", "Freshdesk", "Intercom", "Gorgias", "Shopify", "Aircall"],
    vetting: [
      { title: "Customer service tested", description: "Written replies and mock calls assessed for tone and accuracy." },
      { title: "Trained on your processes", description: "Learns your products, policies and escalation rules." },
      englishCheck,
      trialWeek,
    ],
    industries: ["hospitality", "smes", "estate-letting-agents"],
    heroImage: "/images/services/hero/customer-support.webp",
  },
  "marketing-assistants": {
    metaTitle: "Digital marketing and media assistants",
    metaDescription:
      "Hire a dedicated marketing assistant for social media, content, email campaigns and design.",
    heading: "Marketing assistants who keep your brand active and consistent",
    overview:
      "A dedicated marketing assistant plans and publishes your social media, writes and designs content, and supports your campaigns. Ideal for UK businesses that need steady marketing without a full in-house team.",
    pains: [
      "Your social channels go quiet whenever you get busy.",
      "Content ideas never make it past the notes app.",
      "Campaigns launch late, or not at all.",
    ],
    tasks: [
      "Plan and schedule social media posts",
      "Create graphics, captions and short videos",
      "Write blogs, newsletters and website copy",
      "Manage email campaigns",
      "Reply to comments and messages",
      "Support paid social and Google Ads campaigns",
      "Update your website content",
      "Report monthly on what's working",
    ],
    tools: ["Canva", "Meta Business Suite", "Mailchimp", "WordPress", "Hootsuite", "Google Analytics"],
    vetting: [
      { title: "Portfolio reviewed", description: "Real work samples checked before you meet any candidate." },
      { title: "Brand trained", description: "Learns your brand voice and style guide before publishing." },
      englishCheck,
      trialWeek,
    ],
    industries: ["smes", "hospitality", "estate-letting-agents"],
    heroImage: "/images/services/hero/marketing-assistants.webp",
  },
  "legal-assistants": {
    metaTitle: "Legal assistants for UK law firms",
    metaDescription:
      "Hire a dedicated legal assistant for legal admin, document preparation, case support and conveyancing admin.",
    heading: "Legal assistants who take the admin off your fee earners",
    overview:
      "A dedicated legal assistant handles legal admin, document preparation and case support under your supervision, so your fee earners spend more time on billable work. Ideal for UK law firms and solicitors.",
    pains: [
      "Fee earners spend billable hours on admin.",
      "Bundles, letters and filing back up before deadlines.",
      "Matter records drift out of date across systems.",
    ],
    tasks: [
      "Prepare and format legal documents",
      "Manage case files and matter records",
      "Draft routine letters for review",
      "Support conveyancing admin and searches",
      "Run first-pass document review",
      "Transcribe dictation",
      "Manage diaries, deadlines and court dates",
      "Handle client onboarding and ID checks",
    ],
    tools: ["Clio", "LEAP", "Actionstep", "Microsoft 365", "DocuSign", "InfoTrack"],
    vetting: [
      { title: "Legal admin tested", description: "Document and case-admin tasks assessed before shortlisting." },
      { title: "Confidentiality first", description: "Confidentiality agreement signed; works only in your systems." },
      englishCheck,
      trialWeek,
    ],
    industries: ["law-firms", "estate-letting-agents"],
  },
  accountants: {
    metaTitle: "Remote accountants for UK practices and businesses",
    metaDescription:
      "Hire a qualified remote accountant for accounts preparation, tax returns, payroll and management reporting.",
    heading: "Qualified accountants who add capacity to your practice",
    overview:
      "A dedicated, qualified accountant prepares accounts, tax workings and management reports for review, adding capacity in busy periods without UK hiring costs. Ideal for UK accounting practices and finance teams.",
    pains: [
      "Busy season means turning work away or working weekends.",
      "Hiring qualified staff in the UK is slow and expensive.",
      "Reviews and returns queue up behind a few overloaded people.",
    ],
    tasks: [
      "Prepare year-end accounts for review",
      "Prepare corporation tax computations",
      "Prepare self-assessment tax returns",
      "Run payroll and pension submissions",
      "Produce management accounts",
      "Review and correct bookkeeping",
      "Prepare VAT returns",
      "Support audit and compliance work",
    ],
    tools: ["Xero", "QuickBooks", "Sage", "IRIS", "TaxCalc", "CCH", "BrightPay"],
    vetting: [
      { title: "Qualification checked", description: "Accounting qualification and experience verified." },
      { title: "Technical test", description: "Accounts and tax tasks assessed before shortlisting." },
      { title: "UK training", description: "Trained on UK tax rules and your review process." },
      trialWeek,
    ],
    industries: ["accounting-firms", "smes"],
  },
  "ai-automation": {
    metaTitle: "AI and automation specialists",
    metaDescription:
      "Hire an AI and automation specialist to automate workflows, connect your tools and set up AI assistants.",
    heading: "AI and automation specialists who remove repetitive work",
    overview:
      "A dedicated specialist finds the repetitive work in your business and automates it: connecting your tools, building workflows and setting up AI tools your team can use safely. Ideal for growing UK businesses.",
    pains: [
      "Your team copies the same data between the same systems every day.",
      "You know AI could help, but nobody has time to set it up.",
      "Manual processes break as soon as volume grows.",
    ],
    tasks: [
      "Map your processes and find quick wins",
      "Build automations between your tools",
      "Set up AI assistants and chatbots",
      "Automate reporting and data entry",
      "Integrate your CRM, forms and email",
      "Write prompts and templates for your team",
      "Document every workflow they build",
      "Maintain and improve automations",
    ],
    tools: ["Zapier", "Make", "n8n", "ChatGPT", "Microsoft Copilot", "Airtable", "Power Automate"],
    vetting: [
      { title: "Build test", description: "Builds a working automation as part of the assessment." },
      { title: "Data-safe by design", description: "Trained on handling client data under UK GDPR." },
      englishCheck,
      trialWeek,
    ],
    industries: ["smes", "accounting-firms", "estate-letting-agents"],
  },
  "software-developers": {
    metaTitle: "Remote software developers",
    metaDescription:
      "Hire a dedicated remote software developer for websites, web apps and integrations, working in your stack.",
    heading: "Software developers who work as part of your team",
    overview:
      "A dedicated developer builds and maintains your websites, web apps and integrations, working in your stack and your processes. Ideal for UK businesses and agencies that need reliable development capacity.",
    pains: [
      "Your product roadmap moves slower than your customers expect.",
      "UK developer salaries stretch your budget too far.",
      "Small fixes and updates wait weeks for someone to pick them up.",
    ],
    tasks: [
      "Build and maintain websites and web apps",
      "Develop new features from your backlog",
      "Fix bugs and improve performance",
      "Build integrations and APIs",
      "Maintain WordPress and Shopify sites",
      "Write tests and documentation",
      "Review code and follow your standards",
      "Join your stand-ups and sprint planning",
    ],
    tools: ["React", "Next.js", "Node.js", "PHP", "Laravel", "WordPress", "Shopify", "GitHub"],
    vetting: [
      { title: "Technical assessment", description: "Coding task and technical interview before shortlisting." },
      { title: "Code review", description: "Previous work and code quality reviewed." },
      englishCheck,
      trialWeek,
    ],
    industries: ["smes"],
  },
};
