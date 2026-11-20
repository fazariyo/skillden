"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { faqs as defaultFaqs } from "@/content/home";

export type FaqItem = { question: string; answer: string };

type Props = {
  items?: FaqItem[];
  eyebrow?: string;
  /** Heading as [first line, muted second line]. */
  title?: [string, string];
  className?: string;
};

/** FAQ accordion with FAQPage schema markup (scope requirement). */
export default function Faq({
  items = defaultFaqs,
  eyebrow = "FAQ",
  title = ["Questions owners", "ask us first"],
  className = "bg-white",
}: Props) {
  // Only one answer open at a time; clicking the open question closes it.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const uid = useId();

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section id="faq" className={`section-padding w-full max-w-[100vw] overflow-x-hidden ${className}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
            {title[0]} <span className="text-slate">{title[1]}</span>
          </h2>
        </div>

        <ul className="reveal-stagger divide-y divide-line border-y border-line">
          {items.map((faq, i) => {
            const open = openIndex === i;
            const answerId = `${uid}-answer-${i}`;
            return (
              <li key={faq.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-lg font-bold text-navy transition-colors group-hover:text-steel">{faq.question}</span>
                    <Plus
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-steel transition-transform duration-300 group-aria-expanded:rotate-45"
                    />
                  </button>
                </h3>
                {/* Grid-rows trick animates height without measuring. */}
                <div
                  id={answerId}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  inert={!open}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 leading-relaxed text-slate">{faq.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
