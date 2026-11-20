import type { Metadata } from "next";
import { Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { FooterBar } from "@/components/layout/Footer";
import ApplicationForm from "@/components/careers/ApplicationForm";
import { Eyebrow, PageHero, SectionTitle } from "@/components/service/parts";
import { careerBenefits, careerRoles, lookingFor } from "@/content/pages";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join SkillDen in Pakistan: long-term remote roles with UK businesses, paid training and career growth.",
};

/** Careers page for candidates in Pakistan. Kept separate from client pages: no Book a call band (scope). */
export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white pt-28 md:pt-36">
        <PageHero
          eyebrow="Careers"
          title={
            <>
              Build your career <span className="text-slate">with UK businesses</span>
            </>
          }
          text="SkillDen trains and places professionals in Pakistan with UK companies, in long-term remote roles with fixed UK hours."
        >
          <a href="#apply" className="inline-flex items-center justify-center rounded-full bg-steel px-6 py-3 text-sm font-bold text-white shadow-lg shadow-steel/20 transition-all hover:scale-105 hover:bg-navy">
            Apply now
          </a>
        </PageHero>

        <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:px-12 md:pb-24 md:pt-20">
          {/* Benefits */}
          <section aria-labelledby="benefits-title">
            <Eyebrow>Why join us</Eyebrow>
            <SectionTitle id="benefits-title">What you get</SectionTitle>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {careerBenefits.map(({ title, text, icon: Icon }) => (
                <article key={title} className="reveal rounded-2xl border border-line bg-white p-8 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-steel/10 text-steel">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-navy">{title}</h3>
                  <p className="mt-2 leading-relaxed text-slate">{text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* What we look for + roles */}
          <section
            aria-labelledby="looking-title"
            className="mt-16 grid gap-8 overflow-hidden rounded-2xl bg-navy px-6 py-8 text-white shadow-xl shadow-navy/10 md:mt-20 md:px-9 md:py-10 lg:grid-cols-2"
          >
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-sky">Training academy</p>
              <h2 id="looking-title" className="mb-6 text-2xl font-bold tracking-tight text-white md:text-3xl">
                What we look for
              </h2>
              <ul className="space-y-3">
                {lookingFor.map((item) => (
                  <li key={item} className="flex gap-2.5 text-white/85">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-sky" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Roles we recruit for</h3>
              <ul className="flex flex-wrap gap-2.5">
                {careerRoles.map((r) => (
                  <li key={r} className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Application form */}
          <section id="apply" aria-labelledby="apply-title" className="mt-16 scroll-mt-32 md:mt-20">
            <Eyebrow>Apply</Eyebrow>
            <SectionTitle id="apply-title">Send us your application</SectionTitle>
            <p className="mt-2 max-w-2xl text-slate">It takes about five minutes. We reply to every applicant.</p>
            <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm md:p-10">
              <ApplicationForm />
            </div>
          </section>
        </div>
      </main>
      <div className="bg-navy">
        <FooterBar />
      </div>
    </>
  );
}
