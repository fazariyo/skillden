/**
 * Legal and policy pages. ALL DRAFT PLACEHOLDER TEXT: the scope says the owner or their adviser
 * supplies the final wording. Keyed by URL path segment.
 */
import type { LegalSection } from "@/components/legal/LegalPage";

type LegalDoc = { title: string; description: string; intro: string; sections: LegalSection[]; draft?: boolean };

export const legalDocs: Record<"privacy" | "cookies" | "terms" | "data-protection", LegalDoc> = {
  privacy: {
    title: "Privacy policy",
    description: "How SkillDen collects, uses and protects your personal data.",
    intro:
      "SkillDen Ltd takes your privacy seriously. This policy explains what personal data we collect when you use skillden.co.uk or our services, and how we use it.",
    sections: [
      {
        heading: "What we collect",
        body: "Details you give us when you book a call, send an enquiry or apply for a role, such as your name, email, phone number and company.",
      },
      { heading: "How we use it", body: "To reply to you, provide our services and, with your consent, to measure our website and ads." },
      { heading: "Your rights", body: "You can ask to see, correct or delete your data at any time by emailing info@skillden.co.uk." },
    ],
  },
  cookies: {
    title: "Cookie policy",
    description: "How SkillDen uses cookies on skillden.co.uk.",
    intro:
      "This policy explains how SkillDen uses cookies and similar technologies when you visit skillden.co.uk.",
    sections: [
      { heading: "Essential cookies", body: "Needed for the site to work, such as remembering your cookie choice. These are always on." },
      {
        heading: "Analytics and advertising cookies",
        body: "Used only if you accept them, to understand how the site is used and to measure our ads on Google, Meta and LinkedIn.",
      },
      { heading: "Changing your choice", body: "Use the Cookie settings link at the bottom of any page to change your choice at any time." },
    ],
  },
  terms: {
    title: "Terms of service",
    description: "The terms that apply when you use skillden.co.uk.",
    intro: "By using skillden.co.uk you agree to these terms. Please read them carefully.",
    sections: [
      { heading: "Our services", body: "SkillDen provides dedicated, managed remote assistants under a separate client agreement." },
      { heading: "Using this website", body: "Information on this site is for general guidance and may change without notice." },
      { heading: "Governing law", body: "These terms are governed by the laws of England and Wales." },
    ],
  },
  "data-protection": {
    title: "Data protection & security",
    description: "How SkillDen assistants keep your client and business data secure under UK GDPR.",
    intro:
      "Your assistants work with your business data, so protecting it is part of every placement. This page summarises how we do it; a downloadable summary PDF will follow.",
    sections: [
      {
        heading: "UK GDPR approach",
        body: "SkillDen is a UK company. We act as a data processor for your data and sign a data processing agreement with every client.",
      },
      {
        heading: "Confidentiality agreements",
        body: "Every assistant signs a confidentiality agreement before they get access to any of your systems.",
      },
      {
        heading: "International transfer safeguards",
        body: "Our assistants are based in Pakistan. Transfers are covered by the UK International Data Transfer Agreement (IDTA) or equivalent safeguards. [Owner to confirm mechanism]",
      },
      {
        heading: "Secure-working rules",
        body: "Assistants work only inside your systems, keep no data on personal devices, and use a password manager for every login.",
      },
      {
        heading: "Card data for hospitality",
        body: "Assistants never store card details and follow PCI DSS rules when handling payments in your property management system.",
      },
    ],
  },
};
