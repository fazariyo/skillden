import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IndustryPage from "@/components/service/IndustryPage";
import { industries } from "@/content/catalogue";
import { industryPages } from "@/content/industry-pages";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

const find = (slug: string) => {
  const industry = industries.find((i) => i.slug === slug);
  const page = industryPages[slug];
  return industry && page ? { industry, page } : null;
};

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const found = find((await params).slug);
  if (!found) return {};
  const { metaTitle: title, metaDescription: description } = found.page;
  return { title, description, openGraph: { title, description }, alternates: { canonical: `/industries/${found.industry.slug}` } };
}

export default async function Page({ params }: PageProps<"/industries/[slug]">) {
  const found = find((await params).slug);
  if (!found) notFound();

  return (
    <>
      <Navbar />
      <IndustryPage industry={found.industry} page={found.page} />
      <Footer />
    </>
  );
}
