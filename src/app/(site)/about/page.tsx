import type { Metadata } from "next";
import { Building2, MapPin, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactButton from "@/components/contact/ContactButton";
import { Eyebrow, PageHero, SectionTitle } from "@/components/service/parts";
import { primaryButton } from "@/components/ui/buttonStyles";
import { company } from "@/content/company";
import { values } from "@/content/pages";

export const metadata: Metadata = {
  title: "About",
  description:
    "SkillDen is a UK-managed hiring partner that finds, vets and supports remote assistants for UK businesses.",
};

/** About page. Story, founder and photos are PLACEHOLDERS for the owner (scope: real photos). */
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white pt-28 md:pt-36">
        <PageHero
          eyebrow="About SkillDen"
          title={
            <>
              Good people, <span className="text-slate">without the hiring headache.</span>
            </>
          }
          text="Growing UK businesses need reliable help, but hiring in the UK is slow and expensive, and freelancers rarely stay. SkillDen finds, trains and manages remote assistants for you, and stays responsible for them after they start."
        >
          <ContactButton className={`${primaryButton} px-6 py-3 text-sm`}>Book a call</ContactButton>
        </PageHero>

        <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:px-12 md:pb-24 md:pt-20">
          {/* Story */}
          <section aria-labelledby="story-title" className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Eyebrow>Our story</Eyebrow>
              <SectionTitle id="story-title">Why we started SkillDen</SectionTitle>
              <div className="mt-6 space-y-4 leading-relaxed text-slate md:text-lg">
                <p>
                  [Founder story to be supplied by the owner: who started SkillDen, why, and what they saw UK
                  businesses struggling with.]
                </p>
                <p>
                  Today we help UK businesses hire vetted remote professionals from Pakistan and the wider APAC region,
                  usually within 7–14 days. We source, screen and shortlist candidates, then supervise the team once
                  they start.
                </p>
              </div>
            </div>
            {/* PLACEHOLDER for a real founder/team photo (brand guidelines: real people, not stock). */}
            <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-dashed border-steel/30 bg-mist p-8 text-center text-sm font-semibold text-slate">
              [Founder or team photo]
            </div>
          </section>

          {/* UK company + team */}
          <section aria-label="Company details" className="mt-16 grid gap-4 md:mt-20 md:grid-cols-3">
            {[
              { icon: Building2, title: "UK company", text: `${company.legalName}, ${company.registration}. Company no. ${company.companyNumber}.` },
              { icon: MapPin, title: "UK-managed", text: `Registered office: ${company.registeredAddress}. Account management from the UK.` },
              { icon: Users, title: "Our team in Pakistan", text: "Trained assistants and team leads based in Pakistan. [Team size and city to be confirmed]" },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="reveal rounded-2xl border border-line bg-white p-8 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-steel/10 text-steel">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-navy">{title}</h3>
                <p className="mt-2 leading-relaxed text-slate">{text}</p>
              </article>
            ))}
          </section>

          {/* Mission + values */}
          <section
            aria-labelledby="values-title"
            className="mt-16 overflow-hidden rounded-2xl bg-navy px-6 py-8 text-white shadow-xl shadow-navy/10 md:mt-20 md:px-9 md:py-10"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-sky">Our mission</p>
            <h2 id="values-title" className="max-w-3xl text-2xl font-bold tracking-tight text-white md:text-3xl">
              Help UK businesses find, vet and keep good remote people, quickly.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v) => (
                <article key={v.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-4 h-1 w-10 rounded-full bg-sky" />
                  <h3 className="text-base font-bold text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/80">{v.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
