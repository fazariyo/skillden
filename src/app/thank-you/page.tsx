import Link from "next/link";
import type { Metadata } from "next";
import ThankYouDetails from "./ThankYouDetails";

// Not indexed: conversion page (scope). Conversion tracking fires here in Phase 5.
export const metadata: Metadata = {
  title: "Thank you",
  description: "Thanks for contacting SkillDen.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-mist px-6 py-20">
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-steel/10 blur-3xl" />
      <section className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-steel/10 bg-white px-7 py-12 text-center shadow-[0_24px_80px_rgba(15,33,51,0.12)] md:px-14 md:py-16">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-sky/15 text-steel ring-8 ring-sky/5">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-10 w-10">
            <path d="m6 12.5 4 4 8-9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </svg>
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-steel">Message received</p>
        <ThankYouDetails />
        <Link
          href="/"
          className="mt-9 inline-flex items-center justify-center rounded-full bg-steel px-8 py-4 text-sm font-bold text-white shadow-lg shadow-steel/20 transition hover:-translate-y-0.5 hover:bg-navy focus:outline-none focus:ring-4 focus:ring-sky/40"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}
