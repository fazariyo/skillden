import { whySkillDen } from "@/content/home";

/** Six reassurances: what the client no longer has to worry about. */
export default function WhySkillDen() {
  return (
    <section id="why" className="section-padding bg-mist">
      <div className="mx-auto max-w-6xl">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Why SkillDen</p>
          <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
            Less to manage. <span className="text-slate">Less to worry about.</span>
          </h2>
        </div>

        <ul className="reveal-stagger mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {whySkillDen.map(({ title, description, icon: Icon }) => (
            <li key={title} className="group">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-steel shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
