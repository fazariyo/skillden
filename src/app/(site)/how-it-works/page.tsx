import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactButton from "@/components/contact/ContactButton";
import { Eyebrow, PageHero, PricingStrip, SectionTitle } from "@/components/service/parts";
import { primaryButton, secondaryButton } from "@/components/ui/buttonStyles";
import { howItWorksDetails, processSteps } from "@/content/pages";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From discovery call to a shortlist in 48 hours, a trial week and monthly account reviews. How hiring a SkillDen assistant works.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white pt-28 md:pt-36">
        <PageHero
          eyebrow="How it works"
          title={
            <>
              Help that starts in two weeks, <span className="text-slate">not two months.</span>
            </>
          }
          text="Hiring is usually slow, risky and eats your time. We take all three off your hands: one call with us, vetted candidates within 48 hours, and a trial week so you see real work before you commit."
        >
          <ContactButton className={`${primaryButton} px-6 py-3 text-sm`}>Book a call</ContactButton>
          <Link href="/pricing" className={`${secondaryButton} px-6 py-3 text-sm`}>
            See pricing
          </Link>
        </PageHero>

        <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:px-12 md:pb-24 md:pt-20">
          {/* Steps */}
          <section aria-labelledby="steps-title">
            <Eyebrow>Our process</Eyebrow>
            <SectionTitle id="steps-title">Six steps. You only do three of them.</SectionTitle>
            <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="reveal group relative overflow-hidden rounded-2xl border border-line bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-steel/30 hover:shadow-xl hover:shadow-steel/5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-steel/10 text-lg font-bold text-steel transition-colors group-hover:bg-steel group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-navy">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Vetting, training, guarantee */}
          <section
            aria-labelledby="details-title"
            className="mt-16 overflow-hidden rounded-2xl bg-navy px-6 py-8 text-white shadow-xl shadow-navy/10 md:mt-20 md:px-9 md:py-10"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-sky">The SkillDen difference</p>
            <h2 id="details-title" className="mb-8 text-2xl font-bold tracking-tight text-white md:text-3xl">
              Why you won&apos;t end up with the wrong person
            </h2>
            <div className="grid gap-4 lg:grid-cols-3">
              {howItWorksDetails.map((block) => (
                <article key={block.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="mb-4 h-1 w-10 rounded-full bg-sky" />
                  <h3 className="text-lg font-bold text-white">{block.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {block.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-sm leading-6 text-white/80">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <PricingStrip className="mt-16 md:mt-20" />
        </div>
      </main>
      <Footer />
    </>
  );
}
