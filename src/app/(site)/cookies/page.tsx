import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { legalDocs } from "@/content/legal";

const doc = legalDocs["cookies"];

export const metadata: Metadata = { title: doc.title, description: doc.description };

export default function CookiesPage() {
  return <LegalPage title={doc.title} intro={doc.intro} sections={doc.sections} draft={doc.draft} />;
}
