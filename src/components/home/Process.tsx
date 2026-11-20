import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeSteps } from "@/content/home";
import { textLink } from "@/components/ui/buttonStyles";

/** Four-step summary of How it works, with a line that fills as you scroll. */
export default function Process() {
  return (
    <section id="process" className="section-padding bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
              From first call to first task, <span className="text-slate">in about two weeks.</span>
            </h2>
          </div>
          <Link href="/how-it-works" className={textLink}>
            The full process
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
          {/* Track + scroll-driven fill: vertical on mobile, horizontal on desktop */}
          <span aria-hidden="true" className="absolute bottom-4 left-[1.1rem] top-4 w-px bg-line md:bottom-auto md:left-0 md:right-0 md:top-[1.1rem] md:h-px md:w-auto" />
          <span
            aria-hidden="true"
            data-progress-line="y"
            className="absolute bottom-4 left-[1.1rem] top-4 w-px origin-top bg-steel md:hidden"
          />
          <span
            aria-hidden="true"
            data-progress-line="x"
            className="absolute left-0 right-0 top-[1.1rem] hidden h-px origin-left bg-steel md:block"
          />
          {homeSteps.map((step, i) => (
            <li key={step.title} className="reveal relative pl-14 md:pl-0">
              <span className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-sm font-bold text-steel md:relative">
                {i + 1}
              </span>
              <h3 className="text-lg font-bold tracking-tight md:mt-6">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-slate">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
