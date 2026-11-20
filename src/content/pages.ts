/**
 * Content for How it works, Pricing, About, Careers and Book a call (website scope, "Supporting pages").
 * DRAFT copy; [square brackets] = facts the owner must supply. (Phase 2 moves this into Sanity.)
 */
import type { LucideIcon } from "lucide-react";
import { Briefcase, Clock, GraduationCap, HeartHandshake, Laptop, TrendingUp } from "lucide-react";
import { assistants, specialists } from "./catalogue";
import type { FaqItem } from "@/components/home/Faq";

/* ---------------- How it works ---------------- */

export const processSteps = [
  { title: "Discovery call", text: "A 20-minute call to understand the role, your tools, hours and budget." },
  { title: "Shortlist in 48 hours", text: "We send 2–3 vetted candidates with short video introductions." },
  { title: "Interview", text: "You interview your favourites. We arrange the calls around your diary." },
  { title: "Trial week", text: "Your chosen assistant starts with a trial week so you can see the work." },
  { title: "Onboarding", text: "We set up access, train them on your processes and agree check-ins." },
  { title: "Monthly reviews", text: "Your UK account manager reviews progress with you every month." },
];

export const howItWorksDetails = [
  {
    title: "How we vet",
    points: [
      "Skills test for the specific role",
      "Written and spoken English assessment",
      "Background and reference checks",
      "Interview with our UK team",
    ],
  },
  {
    title: "Our training academy",
    points: [
      "Industry training before placement",
      "UK tools, standards and working culture",
      "Data protection and secure working",
      "Ongoing training while placed",
    ],
  },
  {
    title: "Replacement guarantee",
    points: [
      "Not the right fit? Tell your account manager",
      "We shortlist a replacement quickly",
      "Handover managed by SkillDen",
      "[Exact guarantee wording to be confirmed]",
    ],
  },
];

/* ---------------- Pricing ---------------- */

export const pricingIncluded = [
  "Recruitment and vetting",
  "Industry training",
  "Day-to-day management",
  "UK account manager",
  "Replacement guarantee",
  "Payroll, equipment checks and HR",
];

export const pricingTerms = [
  { label: "Minimum term", value: "[Minimum term]" },
  { label: "Notice period", value: "[Notice period]" },
  { label: "Set-up or recruitment fee", value: "None" },
];

/** Prices are placeholders until the owner sets them (scope open question). */
export const assistantPrices = assistants.map((s) => ({
  ...s,
  fullTime: "£[X]",
  partTime: "£[X]",
}));

export const specialistPrices = specialists.map((s) => ({ ...s, price: "From £[X] or on request" }));

export const pricingFaqs: FaqItem[] = [
  { question: "Are there any hidden costs?", answer: "No. The monthly fee covers recruitment, training, management and replacements." },
  { question: "What's the difference between full-time and part-time?", answer: "Full-time is [X] hours a week and part-time is [X] hours a week, both in UK business hours." },
  { question: "Can I change hours later?", answer: "Yes. You can move between part-time and full-time with [notice period] notice." },
  { question: "How do I pay?", answer: "We send one invoice in pounds sterling each month. [Payment terms to be confirmed]" },
];

/* ---------------- About ---------------- */

/** Brand values from the SkillDen Brand Guidelines. */
export const values = [
  { title: "Reliable", text: "We do what we say, on the timeline we promised." },
  { title: "Straightforward", text: "Clear pricing, clear process, no jargon." },
  { title: "Selective", text: "We put forward fewer candidates, and better ones." },
  { title: "Supportive", text: "Our job doesn't end at the hire; we help the placement work." },
];

/* ---------------- Careers ---------------- */

export const careerBenefits: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Work with UK businesses", text: "Long-term, full-time roles with established UK clients.", icon: Briefcase },
  { title: "Paid training academy", text: "Industry training before you start and while you work.", icon: GraduationCap },
  { title: "Career growth", text: "Clear progression into senior and specialist roles.", icon: TrendingUp },
  { title: "Supportive team", text: "A team lead and HR support in Pakistan.", icon: HeartHandshake },
  { title: "Fixed UK hours", text: "Regular hours aligned with UK business days.", icon: Clock },
  { title: "Equipment support", text: "[Equipment or allowance details to be confirmed]", icon: Laptop },
];

export const lookingFor = [
  "Strong written and spoken English",
  "At least [X] years' experience in your field",
  "Reliable internet and a quiet place to work",
  "Experience with the tools your role uses",
  "Care, accuracy and good communication",
];

export const careerRoles = [...assistants, ...specialists].map((s) => s.title);
