/**
 * Company details shown in the footer, legal pages and schema markup.
 * Values in [square brackets] are PLACEHOLDERS: the owner must supply them before launch.
 * (Phase 2 moves this into the Sanity CMS.)
 */
export const company = {
  name: "SkillDen",
  legalName: "SkillDen Ltd",
  siteUrl: "https://skillden.co.uk",
  email: "info@skillden.co.uk",
  /** Candidate applications go here, never to the sales inbox/CRM (scope). */
  recruitmentEmail: "[recruitment email]",
  phone: "[UK phone number]",
  companyNumber: "[Company number]",
  registeredAddress: "[Registered office address]",
  registration: "Registered in England and Wales",
  /** Leave empty to hide the link until the profile exists. */
  socials: {
    linkedin: "",
  },
};

export const defaultSeo = {
  title: "SkillDen | Industry-trained remote assistants for UK businesses",
  description:
    "Dedicated, managed remote assistants trained for your industry and working UK hours. SkillDen recruits, trains, manages and replaces them. Book a call.",
};
