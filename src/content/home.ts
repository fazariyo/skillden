/**
 * Home page copy. DRAFT text in the SkillDen voice, based on the website scope; the owner
 * confirms or replaces it. [Square brackets] = facts the owner must supply.
 * (Phase 2 moves this into Sanity.)
 */
import type { LucideIcon } from "lucide-react";
import { Bot, Clock, GraduationCap, RefreshCcw, ShieldCheck, UserRoundCheck } from "lucide-react";

/** Client logos in the hero slider ("Trusted by Leading Organizations"), kept from the original site at the client's request. */
export const partners = [
  { src: "/images/clients/ccs-logo.png", alt: "CCS" },
  { src: "/images/clients/kbcg-logo.webp", alt: "kbc Group" },
  { src: "/images/clients/play_nation.webp", alt: "Play Nation" },
  { src: "/images/clients/npb_realestate.png", alt: "NPB realestate" },
  { src: "/images/clients/scaleignite-logo.png", alt: "Scale ignite AI" },
  { src: "/images/clients/aussie-realestate-logo.webp", alt: "Aussie Real Estate" },
];

/* ---------------- Hero ---------------- */

/** Tasks that move from "your list" to "your assistant" in the hero animation. */
export const handoffTasks = [
  "Reply to 43 unread emails",
  "Reconcile last month in Xero",
  "Chase three overdue invoices",
  "Book Thursday's client calls",
  "Update the CRM after calls",
];

export const heroProof = ["No recruitment fees", "Works UK hours", "Replacement guarantee"];

/* ---------------- The problem ---------------- */

export const problems = [
  {
    title: "Your evenings belong to admin",
    text: "Emails, invoices and follow-ups wait until the day's real work is done, so they eat into your nights and weekends.",
  },
  {
    title: "A UK hire costs too much, too soon",
    text: "Salary, National Insurance, pension, kit and agency fees add up before you know if the person can do the job.",
  },
  {
    title: "Freelancers come and go",
    text: "Every new one needs the same explanation, and nobody stays long enough to learn how your business works.",
  },
  {
    title: "No time to train anyone",
    text: "Teaching someone your systems feels slower than doing the job yourself, so the job stays with you.",
  },
];

/* ---------------- What SkillDen is ---------------- */

export const offer = {
  youGet: [
    "One dedicated assistant who works only for you",
    "Someone already trained in your industry's tools",
    "Cover during UK business hours",
    "A UK account manager you can call",
  ],
  weHandle: [
    "Finding, testing and vetting candidates",
    "Training before day one, and while they work",
    "Payroll, HR and equipment checks",
    "A replacement if it isn't the right fit",
  ],
};

/* ---------------- How it works (home summary) ---------------- */

export const homeSteps = [
  { title: "Tell us what's slowing you down", text: "A 20-minute call about the tasks, your tools and your hours. No obligation." },
  { title: "Meet a shortlist in 48 hours", text: "Two or three vetted candidates with short video introductions. You choose who to interview." },
  { title: "Try them for a week", text: "Your assistant starts with a trial week, so you see real work before you commit." },
  { title: "Get your time back", text: "We onboard them on your processes and check in every month to keep things working." },
];

/* ---------------- Comparison ---------------- */

export const comparison = {
  columns: ["Hiring in the UK", "Freelancers", "SkillDen"],
  rows: [
    { label: "Time to start", values: ["Weeks to months", "Days, if available", "7–14 days"] },
    { label: "Recruitment fees", values: ["Agency fees are common", "Platform fees", "None"] },
    { label: "Trained for your industry", values: ["You train them", "Varies", "Before day one"] },
    { label: "Someone manages them", values: ["You do", "You do", "We do"] },
    { label: "If it doesn't work out", values: ["Start again", "Start again", "We replace them"] },
    { label: "Data protection agreement", values: ["Your HR policy", "Rarely", "Signed as standard"] },
  ],
};

/* ---------------- Why SkillDen ---------------- */

/** "Why SkillDen" tiles (scope: six short icon tiles), written as what the client no longer has to worry about. */
export const whySkillDen: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "No training on your time",
    description: "Our academy trains every assistant on your industry's tools and tasks before they start.",
    icon: GraduationCap,
  },
  {
    title: "One UK contact",
    description: "Your account manager checks in every month and sorts out anything that comes up.",
    icon: UserRoundCheck,
  },
  {
    title: "Your data stays protected",
    description: "Confidentiality agreements, a UK GDPR data processing agreement and secure-working rules as standard.",
    icon: ShieldCheck,
  },
  {
    title: "No risk of a bad hire",
    description: "If your assistant isn't the right fit, we find and train a replacement.",
    icon: RefreshCcw,
  },
  {
    title: "More done per hour",
    description: "Assistants use AI tools to work faster, and only the ones you approve.",
    icon: Bot,
  },
  {
    title: "Online when you are",
    description: "Your assistant works UK business hours, so your team and customers never wait.",
    icon: Clock,
  },
];

/** Hidden until SkillDen has real testimonials (scope). Add entries to show the section. */
export const testimonials: { quote: string; initials: string; name: string; location: string }[] = [];

/** FAQ topics from the scope: cost, contracts, data security, time zones, replacements, start time. */
export const faqs = [
  {
    question: "How much does an assistant cost?",
    answer:
      "Full-time assistants start from £[X] a month, with no recruitment fees. The monthly fee covers recruitment, training, management and replacements.",
  },
  {
    question: "Is there a minimum contract?",
    answer: "Our minimum term is [minimum term], and after that you can stop with [notice period] notice.",
  },
  {
    question: "How do you keep our data secure?",
    answer:
      "Assistants sign confidentiality agreements, work only inside your systems, keep no data on personal devices and use a password manager. We sign a UK GDPR data processing agreement with every client.",
  },
  {
    question: "What hours will my assistant work?",
    answer: "Your assistant works UK business hours, so they're available when your team and customers are.",
  },
  {
    question: "What if the assistant isn't the right fit?",
    answer: "Tell your account manager. We'll find, vet and train a replacement under our replacement guarantee.",
  },
  {
    question: "How quickly can someone start?",
    answer:
      "We usually send a shortlist of two or three vetted candidates within 48 hours, and most assistants start within 7–14 days.",
  },
];
