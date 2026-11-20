import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Faq from "@/components/home/Faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers on cost, contracts, data security, working hours, replacements and how quickly you can start.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="w-full max-w-[100vw] overflow-x-hidden pt-24 md:pt-32">
        <Faq />
      </main>
      <Footer />
    </>
  );
}
