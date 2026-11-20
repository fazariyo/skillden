import type { Metadata } from "next";
import { CalendarDays, Clock, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { FooterBar } from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { Eyebrow, PageHero, SectionTitle } from "@/components/service/parts";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Book a call",
  description: "Book a 20-minute call with SkillDen to discuss the assistant you need. Or send us an enquiry.",
};

/** Book a call / Contact. No closing band on this page (scope). */
export default function BookACallPage() {
  const details = [
    { icon: Mail, text: company.email, href: `mailto:${company.email}` },
    { icon: Phone, text: company.phone },
    { icon: MapPin, text: company.registeredAddress },
    { icon: Clock, text: "We reply within one working day" },
  ];

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white pt-28 md:pt-36">
        <PageHero
          eyebrow="Book a call"
          title={
            <>
              Tell us what&apos;s eating your time. <span className="text-slate">We&apos;ll handle the rest.</span>
            </>
          }
          text="In 20 minutes we'll understand the tasks taking up your day, the tools you use and your budget. If we can help, you'll see a shortlist within 48 hours. If we can't, we'll tell you."
        />

        <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-16 md:px-12 md:pb-24 md:pt-20 lg:grid-cols-[1.4fr_1fr]">
          {/* Booking calendar: PLACEHOLDER until the booking tool is chosen (Calendly / HubSpot, Phase 5) */}
          <section aria-labelledby="calendar-title">
            <Eyebrow>Choose a time</Eyebrow>
            <SectionTitle id="calendar-title">Book your call</SectionTitle>
            <div className="mt-6 flex min-h-[28rem] flex-col items-center justify-center rounded-2xl border border-dashed border-steel/30 bg-mist p-8 text-center">
              <CalendarDays aria-hidden="true" className="h-12 w-12 text-steel" />
              <p className="mt-4 text-lg font-bold text-navy">[Booking calendar]</p>
              <p className="mt-2 max-w-sm text-sm text-slate">
                The calendar goes here once the booking tool is chosen. Until then, send an enquiry or email{" "}
                <a href={`mailto:${company.email}`} className="font-semibold text-steel underline underline-offset-4">
                  {company.email}
                </a>
                .
              </p>
            </div>
          </section>

          <aside aria-labelledby="contact-title" className="space-y-6">
            <div className="rounded-2xl bg-navy p-8 text-white">
              <h2 id="contact-title" className="text-xl font-bold text-white">
                Contact us
              </h2>
              <ul className="mt-6 space-y-4">
                {details.map(({ icon: Icon, text, href }) => (
                  <li key={text} className="flex items-center gap-3 text-white/85">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sky">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    {href ? (
                      <a href={href} className="font-semibold hover:text-sky">
                        {text}
                      </a>
                    ) : (
                      <span className="font-semibold">{text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Enquiry form: the alternative to booking */}
          <section aria-labelledby="enquiry-title" className="lg:col-span-2">
            <Eyebrow>Prefer to write?</Eyebrow>
            <SectionTitle id="enquiry-title">Send an enquiry</SectionTitle>
            <div className="mt-6 rounded-2xl border border-line bg-white p-4 shadow-sm md:p-8">
              <ContactForm id="enquiry-form" />
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
