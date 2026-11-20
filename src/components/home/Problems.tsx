import { problems } from "@/content/home";

/** "Sound familiar?": the client's problems, in their words. */
export default function Problems() {
  return (
    <section id="problems" className="section-padding bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-36 lg:self-start">
          <p className="eyebrow">Sound familiar?</p>
          <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
            You&apos;re busy with work someone else could do.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            Most owners we speak to don&apos;t need another app. They need a reliable person who takes tasks off their list and
            keeps them off.
          </p>
        </div>

        <ul className="reveal-stagger divide-y divide-line border-y border-line">
          {problems.map((p) => (
            <li key={p.title} className="group grid gap-2 py-8 sm:grid-cols-[1fr_1.3fr] sm:gap-8">
              <h3 className="text-xl font-bold tracking-tight transition-colors group-hover:text-steel">{p.title}</h3>
              <p className="leading-relaxed text-slate">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
