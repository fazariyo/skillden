import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries, industryHref } from "@/content/catalogue";

/** Industries SkillDen trains for, each linking to its pain-led industry page. */
export default function Industries() {
  return (
    <section id="industries" className="section-padding bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="reveal">
          <p className="eyebrow">Industries</p>
          <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
            Trained for the way <span className="text-slate">your sector works.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            A lettings agency and a law firm have very different days. Your assistant learns the tools, terms and rules of
            yours before they start.
          </p>
        </div>

        <ul className="reveal-stagger divide-y divide-line border-y border-line">
          {industries.map(({ slug, title, roles, icon: Icon }) => (
            <li key={slug}>
              <Link href={industryHref(slug)} className="group flex items-center gap-5 py-5">
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-steel" />
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-bold text-navy transition-colors group-hover:text-steel">{title}</span>
                  <span className="mt-0.5 block truncate text-sm text-slate">{roles.join(" · ")}</span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 -translate-x-2 text-steel opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
