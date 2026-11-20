import type { Metadata } from "next";
import Link from "next/link";
import { ContactProvider } from "@/components/contact/ContactContext";
import ContactPanel from "@/components/contact/ContactPanel";
import ContactButton from "@/components/contact/ContactButton";
import Navbar from "@/components/layout/Navbar";
import { FooterBar } from "@/components/layout/Footer";
import { primaryButton, secondaryButton } from "@/components/ui/buttonStyles";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/** Custom 404 page (scope requirement). */
export default function NotFound() {
  return (
    <ContactProvider>
      <Navbar />
      <main id="main" className="flex min-h-screen items-center bg-mist px-6 pb-20 pt-40">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="mb-4 text-base font-bold uppercase tracking-widest text-steel">Error 404</p>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-navy md:text-6xl">
            We can&apos;t find <span className="text-slate">that page</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg font-medium text-slate">
            The link may be old or the address mistyped. Head back to the home page, or book a call and tell us what
            you need.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/" className={primaryButton}>
              Go to the home page
            </Link>
            <ContactButton className={secondaryButton}>Book a call</ContactButton>
          </div>
        </div>
      </main>
      <div className="bg-navy">
        <FooterBar />
      </div>
      <ContactPanel />
    </ContactProvider>
  );
}
