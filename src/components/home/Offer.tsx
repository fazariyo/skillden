import { Check, Minus } from "lucide-react";
import { offer } from "@/content/home";

/** What SkillDen is, in plain English: what the client gets vs. what SkillDen takes care of. */
export default function Offer() {
  return (
    <section id="what-we-do" className="section-padding bg-mist">
      <div className="mx-auto max-w-6xl">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">What SkillDen does</p>
          <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
            The help of a full-time hire, <span className="text-slate">without the hiring.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            SkillDen is a UK-managed hiring partner. We place vetted, industry-trained assistants from our team in Pakistan
            with UK businesses, and we stay responsible for them after they start. You pay one monthly fee.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <div className="reveal-left rounded-3xl bg-white p-8 md:p-10">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-steel">You get</h3>
            <ul className="mt-6 space-y-4">
              {offer.youGet.map((item) => (
                <li key={item} className="flex gap-3 text-lg font-medium text-navy">
                  <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-steel" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal-right rounded-3xl bg-navy p-8 text-white md:p-10">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-sky">We take off your hands</h3>
            <ul className="mt-6 space-y-4">
              {offer.weHandle.map((item) => (
                <li key={item} className="flex gap-3 text-lg font-medium text-white/90">
                  <Minus aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-sky" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
