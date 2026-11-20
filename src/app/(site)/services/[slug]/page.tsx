import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicePage from "@/components/service/ServicePage";
import { services } from "@/content/catalogue";
import { servicePages } from "@/content/service-pages";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const find = (slug: string) => {
  const service = services.find((s) => s.slug === slug);
  const page = servicePages[slug];
  return service && page ? { service, page } : null;
};

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const found = find((await params).slug);
  if (!found) return {};
  const { metaTitle: title, metaDescription: description } = found.page;
  return { title, description, openGraph: { title, description }, alternates: { canonical: `/services/${found.service.slug}` } };
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const found = find((await params).slug);
  if (!found) notFound();

  return (
    <>
      <Navbar />
      <ServicePage service={found.service} page={found.page} />
      <Footer />
    </>
  );
}
