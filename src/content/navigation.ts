/** Site navigation and footer link groups (from the scope's sitemap). */

export const BOOK_A_CALL_HREF = "/book-a-call";

/** Top-level header links after the Services and Industries dropdowns. */
export const primaryLinks = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

/** Case studies stay out of navigation until the first one is published (scope requirement). */
export const SHOW_CASE_STUDIES = false;

export const companyLinks = [
  { label: "About", href: "/about" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  ...(SHOW_CASE_STUDIES ? [{ label: "Case studies", href: "/case-studies" }] : []),
  { label: "FAQ", href: "/faq" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: BOOK_A_CALL_HREF },
];

export const legalLinks = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Cookie policy", href: "/cookies" },
  { label: "Terms of service", href: "/terms" },
  { label: "Data protection & security", href: "/data-protection" },
];
