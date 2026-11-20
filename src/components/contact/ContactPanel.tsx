"use client";

import { Clock, Mail, Phone, X } from "lucide-react";
import { company } from "@/content/company";
import { useContact } from "./ContactContext";
import ContactForm from "./ContactForm";

/** Full-screen "Book a call" panel that slides down from the top. */
export default function ContactPanel() {
  const { contactOpen, closeContact, presetInterest, contactPanelRef } = useContact();

  return (
    <div
      ref={contactPanelRef}
      id="contact-dropdown"
      className={`fixed inset-0 z-[60] h-screen w-full max-w-[100vw] overflow-hidden bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${contactOpen ? "translate-y-0" : "translate-y-[-150%]"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-dialog-title"
      tabIndex={-1}
      aria-hidden={!contactOpen}
      inert={!contactOpen}
    >
      <button
        type="button"
        className="contact-toggle absolute right-4 top-4 z-10 rounded-full p-3 text-navy transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel md:right-8 md:top-8"
        aria-label="Close contact form"
        onClick={() => closeContact(true)}
      >
        <X aria-hidden="true" className="h-6 w-6" />
      </button>

      <div className="container mx-auto h-full w-full min-w-0 max-w-6xl overflow-y-auto px-4 pb-12 pt-24 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] sm:px-6 md:px-12 md:pt-32">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="order-last pt-2 lg:order-first lg:w-1/2 lg:pt-8">
            <h2 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-steel">
              Book a call
            </h2>
            <h3 id="contact-dialog-title" className="mb-8 text-4xl font-bold leading-tight text-navy md:text-6xl">
              Meet your assistant <br /> in 7–14 days<span className="text-steel">.</span>
            </h3>
            <div className="mb-12 space-y-6">
              <div className="flex items-center gap-4 text-slate">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-steel/10 text-steel">
                  <Mail aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="font-bold">{company.email}</span>
              </div>
              <div className="flex items-center gap-4 text-slate">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-steel/10 text-steel">
                  <Phone aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="font-bold">{company.phone}</span>
              </div>
              <div className="flex items-center gap-4 text-slate">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-steel/10 text-steel">
                  <Clock aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="font-bold">We reply within one working day</span>
              </div>
            </div>
          </div>
          <div className="order-first lg:order-last lg:w-1/2">
            <ContactForm presetInterest={contactOpen ? presetInterest : null} />
          </div>
        </div>
      </div>
    </div>
  );
}
