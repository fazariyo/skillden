import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { IndustrySummary } from "@/content/catalogue";
import { industries, industryHref, serviceHref } from "@/content/catalogue";
import type { IndustryPageContent } from "@/content/industry-pages";
import ContactButton from "@/components/contact/ContactButton";
import { primaryButton, secondaryButton } from "@/components/ui/buttonStyles";
import { ArrowCard, Chips, Eyebrow, PricingStrip, SectionTitle } from "./parts";

/** Shared template for all /industries/[slug] pages (same design language as the service pages). */
export default function IndustryPage({ industry, page }: { industry: IndustrySummary; page: IndustryPageContent }) {
  const Icon = industry.icon;
  const others = industries.filter((i) => i.slug !== industry.slug).slice(0, 3);

  return (
    <main id="main" className="min-h-screen bg-white pt-28 md:pt-36">
      {/* Hero */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:px-12 md:py-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-steel">{industry.title}</p>
            <h1 className="mb-5 text-4xl font-bold leading-[1.08] tracking-tight text-navy md:text-5xl">{page.heading}</h1>
            <p className="mb-8 max-w-xl text-base text-slate md:text-lg">{page.intro}</p>
            <div className="flex flex-wrap gap-3">
              <ContactButton className={`${primaryButton} px-6 py-3 text-sm`}>Book a call</ContactButton>
              <Link href="/pricing" className={`${secondaryButton} px-6 py-3 text-sm`}>
                See pricing
              </Link>
            </div>
          </div>
          <div className="hidden rounded-3xl border border-line bg-white p-8 shadow-xl shadow-navy/5 lg:block">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-steel text-white">
              <Icon aria-hidden="true" className="h-7 w-7" />
            </span>
            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-slate">Roles we place</p>
            <ul className="mt-3 space-y-2">
              {industry.roles.map((r) => (
                <li key={r} className="flex items-center gap-2 font-semibold text-navy">
                  <span className="h-1.5 w-1.5 rounded-full bg-steel" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:px-12 md:pb-24 md:pt-20">
        {/* Problems we solve */}
        <section aria-labelledby="industry-problems">
          <Eyebrow>Sound familiar?</Eyebrow>
          <SectionTitle id="industry-problems">Problems we solve</SectionTitle>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {page.problems.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-l-4 border-line border-l-steel bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10"
              >
                <h3 className="text-lg font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate md:text-base">{p.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Assistant roles */}
        <section
          aria-labelledby="industry-roles"
          className="mt-16 overflow-hidden rounded-2xl bg-navy px-6 py-8 text-white shadow-xl shadow-navy/10 md:mt-20 md:px-9 md:py-10"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-sky">Assistant roles</p>
          <h2 id="industry-roles" className="mb-8 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Roles we train for this industry
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {page.roles.map((r) => (
              <Link
                key={r.title}
                href={serviceHref(r.service)}
                className="group rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-sky/50 hover:bg-white/[0.07]"
              >
                <div className="mb-4 h-1 w-10 rounded-full bg-sky" />
                <h3 className="text-base font-bold text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/80">{r.tasks}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-sky group-hover:underline">View role →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section aria-labelledby="industry-tools" className="mt-16 md:mt-20">
          <Eyebrow>Tools</Eyebrow>
          <SectionTitle id="industry-tools">Industry tools our assistants know</SectionTitle>
          <Chips items={page.tools} className="mt-6" />
        </section>

        {/* Compliance note */}
        <section
          aria-labelledby="industry-compliance"
          className="mt-16 flex gap-5 rounded-2xl border border-l-4 border-line border-l-steel bg-white px-6 py-7 shadow-[0_12px_32px_rgba(15,27,42,0.08)] md:mt-20 md:px-9"
        >
          <ShieldCheck aria-hidden="true" className="mt-1 h-7 w-7 shrink-0 text-steel" />
          <div>
            <h2 id="industry-compliance" className="text-xl font-bold text-navy">
              {page.compliance.title}
            </h2>
            <p className="mt-2 leading-7 text-slate">
              {page.compliance.text}{" "}
              <Link href="/data-protection" className="font-semibold text-steel underline underline-offset-4">
                How we protect your data
              </Link>
            </p>
          </div>
        </section>

        <PricingStrip className="mt-16 md:mt-20" />

        {/* Other industries */}
        <section aria-labelledby="other-industries" className="mt-16 md:mt-20">
          <Eyebrow>Explore more</Eyebrow>
          <SectionTitle id="other-industries">Other industries we support</SectionTitle>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((i) => (
              <ArrowCard key={i.slug} href={industryHref(i.slug)} title={i.title} text={i.roles.slice(0, 3).join(", ")} icon={i.icon} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
