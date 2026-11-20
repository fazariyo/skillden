import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Faq from "@/components/home/Faq";
import ContactButton from "@/components/contact/ContactButton";
import { Eyebrow, PageHero, SectionTitle } from "@/components/service/parts";
import { primaryButton } from "@/components/ui/buttonStyles";
import { serviceHref } from "@/content/catalogue";
import { assistantPrices, pricingFaqs, pricingIncluded, pricingTerms, specialistPrices } from "@/content/pages";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One monthly fee per assistant, full-time or part-time. Recruitment, training, management and replacements included.",
};

/** Pricing page. All figures are PLACEHOLDERS until the owner sets prices (scope open question). */
export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white pt-28 md:pt-36">
        <PageHero
          eyebrow="Pricing"
          title={
            <>
              One monthly fee. <span className="text-slate">No recruitment fees.</span>
            </>
          }
          text="No agency fees, no payroll admin and no surprise costs. You pay a fixed monthly fee per assistant, and recruitment, training, management and replacements are included."
        >
          <ContactButton className={`${primaryButton} px-6 py-3 text-sm`}>Book a call</ContactButton>
        </PageHero>

        <div className="mx-auto max-w-6xl px-6 pb-8 pt-16 md:px-12 md:pt-20">
          {/* Assistant price cards */}
          <section aria-labelledby="assistants-pricing">
            <Eyebrow>Assistants</Eyebrow>
            <SectionTitle id="assistants-pricing">Monthly price per assistant</SectionTitle>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assistantPrices.map(({ slug, title, summary, icon: Icon, fullTime, partTime }) => (
                <article
                  key={slug}
                  className="reveal group flex flex-col rounded-2xl border border-line bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-steel/30 hover:shadow-xl hover:shadow-steel/5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-steel/10 text-steel transition-colors group-hover:bg-steel group-hover:text-white">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{summary}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-6">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-widest text-slate">Full-time</dt>
                      <dd className="mt-1 text-2xl font-bold text-navy">
                        {fullTime}
                        <span className="text-sm font-medium text-slate">/mo</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-widest text-slate">Part-time</dt>
                      <dd className="mt-1 text-2xl font-bold text-navy">
                        {partTime}
                        <span className="text-sm font-medium text-slate">/mo</span>
                      </dd>
                    </div>
                  </dl>
                  <Link href={serviceHref(slug)} className="mt-6 text-sm font-bold text-steel hover:text-navy">
                    About this role →
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Specialists */}
          <section aria-labelledby="specialists-pricing" className="mt-16 md:mt-20">
            <Eyebrow>Specialists</Eyebrow>
            <SectionTitle id="specialists-pricing">Specialist roles</SectionTitle>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {specialistPrices.map(({ slug, title, icon: Icon, price }) => (
                <Link
                  key={slug}
                  href={serviceHref(slug)}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-6 transition-all hover:border-steel/30 hover:shadow-lg hover:shadow-steel/5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-steel/10 text-steel">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-bold text-navy group-hover:text-steel">{title}</span>
                    <span className="text-sm text-slate">{price}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* What's included + terms */}
          <section
            aria-labelledby="included-title"
            className="mt-16 grid gap-8 overflow-hidden rounded-2xl bg-navy px-6 py-8 text-white shadow-xl shadow-navy/10 md:mt-20 md:px-9 md:py-10 lg:grid-cols-[1.3fr_1fr]"
          >
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-sky">Every plan includes</p>
              <h2 id="included-title" className="mb-6 text-2xl font-bold tracking-tight text-white md:text-3xl">
                What&apos;s included
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {pricingIncluded.map((item) => (
                  <li key={item} className="flex gap-2.5 text-white/85">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-sky" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <dl className="space-y-3 rounded-xl border border-white/10 bg-white/[0.04] p-6">
              {pricingTerms.map((t) => (
                <div key={t.label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <dt className="text-sm text-white/70">{t.label}</dt>
                  <dd className="font-bold text-white">{t.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <Faq items={pricingFaqs} eyebrow="Pricing FAQ" title={["Pricing questions,", "answered"]} />
      </main>
      <Footer />
    </>
  );
}
