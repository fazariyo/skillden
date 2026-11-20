import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeHero from "@/components/home/HomeHero";
import Problems from "@/components/home/Problems";
import Offer from "@/components/home/Offer";
import Process from "@/components/home/Process";
import Roles from "@/components/home/Roles";
import Comparison from "@/components/home/Comparison";
import WhySkillDen from "@/components/home/WhySkillDen";
import Industries from "@/components/home/Industries";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import { testimonials } from "@/content/home";

/**
 * Home page, ordered as a client's decision path: recognise the problem → understand SkillDen →
 * see how it works and what roles exist → compare → reassurance → questions → book a call (footer).
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="w-full max-w-[100vw] overflow-x-hidden">
        <HomeHero />
        <Problems />
        <Offer />
        <Process />
        <Roles />
        <Comparison />
        <WhySkillDen />
        <Industries />
        {/* Hidden until SkillDen has real testimonials (scope). */}
        {testimonials.length > 0 && <Testimonials />}
        <Faq className="bg-mist" />
      </main>
      <Footer />
    </>
  );
}
