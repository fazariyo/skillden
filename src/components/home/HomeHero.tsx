import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { heroProof, partners } from "@/content/home";
import ContactButton from "@/components/contact/ContactButton";
import AutoCarousel from "@/components/effects/AutoCarousel";
import { primaryButton, secondaryButton } from "@/components/ui/buttonStyles";
import HandoffBoard from "./HandoffBoard";

export default function HomeHero() {
  return (
    <section className="relative w-full max-w-[100vw] overflow-hidden bg-white pt-32 md:pt-40">
      {/* Soft wash behind the board */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-mist lg:block" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-16 md:px-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-24">
        <div className="hero-intro">
          <p className="eyebrow">Remote assistants for UK businesses</p>
          <h1 className="text-[2.6rem] font-bold leading-[1.04] tracking-[-0.035em] text-navy sm:text-6xl lg:text-[4.25rem]">
            You started a business, <span className="text-slate">not an admin department.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
            SkillDen gives you a dedicated assistant who is already trained for your industry. We recruit, train and manage
            them, so the inbox, invoices and follow-ups leave your desk within 7–14 days.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ContactButton className={`${primaryButton} text-base`}>
              Book a free 20-minute call
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ContactButton>
            <Link href="/how-it-works" className={`${secondaryButton} text-base`}>
              See how it works
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate">
            {heroProof.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Check aria-hidden="true" className="h-4 w-4 text-steel" strokeWidth={2.5} />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Too tall for phones; the copy and CTA carry the hero there. */}
        <div className="hero-intro hidden sm:block">
          <HandoffBoard />
        </div>
      </div>

      {/* Client logo slider (kept from the original site at the client's request) */}
      <div className="relative border-y border-line bg-white py-8">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate">Trusted by growing businesses</p>
        <div className="mx-auto max-w-5xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <AutoCarousel id="partner-track" mode="continuous" className="flex w-max items-center gap-4 will-change-transform sm:gap-6">
            {[0, 1, 2].flatMap((copy) =>
              partners.map((p) => (
                <div
                  key={`${copy}-${p.src}`}
                  aria-hidden={copy !== 1 || undefined}
                  className="flex h-16 w-32 shrink-0 items-center justify-center rounded-xl bg-steel px-4 opacity-80 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 md:h-20 md:w-40"
                >
                  <Image
                    src={p.src}
                    alt={copy === 1 ? p.alt : ""}
                    width={160}
                    height={64}
                    className="h-10 w-auto max-w-full object-contain md:h-12"
                  />
                </div>
              )),
            )}
          </AutoCarousel>
        </div>
      </div>
    </section>
  );
}
