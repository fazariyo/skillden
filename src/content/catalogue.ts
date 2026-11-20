/**
 * Services and industries from the SkillDen website scope.
 * Slugs and URLs follow the scope exactly. One-line summaries are DRAFT copy for the owner to confirm.
 * (Phase 2 moves these into Sanity collections; this file then becomes the seed data.)
 */
import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  Bot,
  Building2,
  Calculator,
  ClipboardList,
  CodeXml,
  FileSpreadsheet,
  Gavel,
  Headset,
  KeyRound,
  Landmark,
  Megaphone,
  PiggyBank,
  Scale,
  TrendingUp,
} from "lucide-react";

export type ServiceTier = "assistant" | "specialist";

export type ServiceSummary = {
  slug: string;
  title: string;
  tier: ServiceTier;
  summary: string;
  icon: LucideIcon;
};

export type IndustrySummary = {
  slug: string;
  title: string;
  /** Top roles shown on industry cards (from the scope). */
  roles: string[];
  icon: LucideIcon;
};

export const services: ServiceSummary[] = [
  {
    slug: "virtual-assistants",
    title: "VA & Admin",
    tier: "assistant",
    summary: "Inbox, diary, documents and day-to-day admin.",
    icon: ClipboardList,
  },
  {
    slug: "bookkeepers",
    title: "Bookkeeping",
    tier: "assistant",
    summary: "Transactions, reconciliations and VAT-ready records.",
    icon: Calculator,
  },
  {
    slug: "sales-assistants",
    title: "Sales & Lead Generation",
    tier: "assistant",
    summary: "Prospecting, follow-ups and booked appointments.",
    icon: TrendingUp,
  },
  {
    slug: "customer-support",
    title: "Customer Support",
    tier: "assistant",
    summary: "Email, chat and phone support in UK hours.",
    icon: Headset,
  },
  {
    slug: "marketing-assistants",
    title: "Digital Marketing & Media",
    tier: "assistant",
    summary: "Social media, content and campaign support.",
    icon: Megaphone,
  },
  {
    slug: "legal-assistants",
    title: "Legal Assistants",
    tier: "assistant",
    summary: "Legal admin, document preparation and case support.",
    icon: Scale,
  },
  {
    slug: "accountants",
    title: "Accountants",
    tier: "specialist",
    summary: "Qualified support for accounts, tax and payroll work.",
    icon: Landmark,
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    tier: "specialist",
    summary: "Workflow automation and AI tools set up for your team.",
    icon: Bot,
  },
  {
    slug: "software-developers",
    title: "Software Developers",
    tier: "specialist",
    summary: "Web and software developers working in your stack.",
    icon: CodeXml,
  },
];

export const industries: IndustrySummary[] = [
  {
    slug: "hospitality",
    title: "Hospitality & Short-Term Lets",
    roles: ["Guest & booking-platform assistant", "Hospitality bookkeeper", "Reservations support"],
    icon: BedDouble,
  },
  {
    slug: "accounting-firms",
    title: "Accounting & Bookkeeping Practices",
    roles: ["Bookkeepers", "Accounts & tax preparers", "Payroll", "Practice admin"],
    icon: FileSpreadsheet,
  },
  {
    slug: "estate-letting-agents",
    title: "Estate & Letting Agents",
    roles: ["Lettings admin", "Tenant communications", "Maintenance coordination", "Listings"],
    icon: KeyRound,
  },
  {
    slug: "law-firms",
    title: "Law Firms & Solicitors",
    roles: ["Paralegal admin", "Legal secretarial", "Document review", "Conveyancing support"],
    icon: Gavel,
  },
  {
    slug: "financial-brokers",
    title: "Financial Brokers",
    roles: ["Admin and case support", "Client communications"],
    icon: PiggyBank,
  },
  {
    slug: "smes",
    title: "Small & Mid-Sized Businesses",
    roles: ["VA & admin", "Sales", "Customer support", "Marketing"],
    icon: Building2,
  },
];

export const serviceHref = (slug: string) => `/services/${slug}`;
export const industryHref = (slug: string) => `/industries/${slug}`;

export const assistants = services.filter((s) => s.tier === "assistant");
export const specialists = services.filter((s) => s.tier === "specialist");
