import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceSummary } from "@/content/catalogue";
import { assistants, serviceHref, specialists } from "@/content/catalogue";

/** "Who you can hand work to": every role as a quiet, scannable row. */
export default function Roles() {
  return (
    <section id="services" className="section-padding scroll-mt-24 bg-mist">
      <div className="mx-auto max-w-6xl">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Roles</p>
          <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
            Hand off the work that&apos;s holding you back.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            Pick the role that matches the tasks piling up. Each assistant is trained on the tools that role uses before they
            meet you.
          </p>
        </div>

        <RoleGroup title="Assistants" note="Day-to-day support, full-time or part-time" items={assistants} />
        <RoleGroup title="Specialists" note="Skilled roles for bigger projects" items={specialists} />
      </div>
    </section>
  );
}

function RoleGroup({ title, note, items }: { title: string; note: string; items: ServiceSummary[] }) {
  return (
    <div className="mt-14">
      <div className="reveal mb-4 flex items-baseline justify-between gap-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-navy">{title}</h3>
        <p className="hidden text-sm text-slate sm:block">{note}</p>
      </div>
      <ul className="reveal-stagger grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ slug, title: name, summary, icon: Icon }) => (
          <li key={slug}>
            <Link
              href={serviceHref(slug)}
              className="group flex h-full items-start gap-4 rounded-2xl border border-transparent bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-line hover:shadow-[0_16px_32px_-20px_rgba(15,27,42,0.35)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-steel transition-colors duration-300 group-hover:bg-steel group-hover:text-white">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2 text-lg font-bold text-navy">
                  {name}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-slate transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-steel"
                  />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-slate">{summary}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
