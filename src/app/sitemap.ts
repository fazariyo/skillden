import type { MetadataRoute } from "next";
import { company } from "@/content/company";
import { industries, industryHref, serviceHref, services } from "@/content/catalogue";

/**
 * Indexable pages only. Campaign (/lp/*) and thank-you pages must never be listed (scope).
 * Add each new main page here as it is built.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...services.map((s) => serviceHref(s.slug)),
    ...industries.map((i) => industryHref(i.slug)),
    "/how-it-works",
    "/pricing",
    "/about",
    "/faq",
    "/careers",
    "/book-a-call",
    "/data-protection",
    "/privacy",
    "/cookies",
    "/terms",
  ];
  return paths.map((path) => ({ url: `${company.siteUrl}${path}` }));
}
