import Image from "next/image";
import Link from "next/link";
import type { ServiceSummary } from "@/content/catalogue";
import { industries, industryHref, serviceHref, services } from "@/content/catalogue";
import type { ServicePageContent } from "@/content/service-pages";
import ContactButton from "@/components/contact/ContactButton";
import { primaryButton } from "@/components/ui/buttonStyles";
import { ArrowCard, Chips, Eyebrow, PricingStrip, SectionTitle } from "./parts";

/** Card photos exist for assistants only (PLACEHOLDER stock photos). */
const cardImage = (s: ServiceSummary) => (s.tier === "assistant" ? `/images/services/cards/${s.slug}.jpg` : undefined);

/** Shared template for all /services/[slug] pages (original site design, SkillDen content). */
export default function ServicePage({ service, page }: { service: ServiceSummary; page: ServicePageContent }) {
  const { title } = service;
  // Tasks are shown two per card: left on white, right on the steel-blue diagonal.
  const taskPairs = Array.from({ length: Math.ceil(page.tasks.length / 2) }, (_, i) => page.tasks.slice(i * 2, i * 2 + 2));
  const servedIndustries = industries.filter((i) => page.industries.includes(i.slug));
  const related = services.filter((s) => s.slug !== service.slug && s.tier === service.tier).slice(0, 3);

  return (
    <main id="main" className="min-h-screen bg-white pt-28 md:pt-36">
      {page.heroImage ? <ImageHero service={service} page={page} /> : <TextHero service={service} page={page} />}

      <div className="mx-auto max-w-6xl px-6 pb-20 md:px-12 md:pb-24">
        {/* Overview */}
        <section
          aria-labelledby="service-overview"
          className={`relative rounded-2xl border border-l-4 border-line border-l-steel bg-white px-6 py-7 shadow-[0_12px_32px_rgba(15,27,42,0.08)] md:grid md:grid-cols-[0.65fr_1.35fr] md:items-start md:gap-12 md:px-9 md:py-9 ${page.heroImage ? "-mt-8 md:-mt-10" : "-mt-10 md:-mt-14"}`}
        >
          <div>
            <Eyebrow>Get to know the role</Eyebrow>
            <SectionTitle id="service-overview">Overview</SectionTitle>
          </div>
          <p className="mt-4 text-base leading-7 text-slate md:mt-0 md:text-lg md:leading-8">{page.overview}</p>
        </section>

        {/* Sounds familiar? */}
        <section aria-labelledby="service-pains" className="mt-16 md:mt-20">
          <Eyebrow>Sounds familiar?</Eyebrow>
          <SectionTitle id="service-pains">If this is your week, this role is for you</SectionTitle>
          <ul className="reveal-stagger mt-8 grid gap-4 md:grid-cols-3">
            {page.pains.map((pain) => (
              <li key={pain} className="rounded-2xl bg-mist p-6 text-lg font-semibold leading-snug text-navy">
                &ldquo;{pain}&rdquo;
              </li>
            ))}
          </ul>
        </section>

        {/* What they do */}
        <section aria-labelledby="service-tasks" className="mt-16 md:mt-20">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between md:mb-9">
            <div>
              <Eyebrow>Role responsibilities</Eyebrow>
              <SectionTitle id="service-tasks">What they do</SectionTitle>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate">Skilled support for the work that keeps your business moving.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {taskPairs.map((pair, i) => (
              <article
                key={i}
                className="group relative grid min-h-44 grid-cols-2 overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10"
              >
                <div aria-hidden="true" className="absolute inset-0 bg-steel [clip-path:polygon(56%_0,100%_0,100%_100%,44%_100%)]" />
                <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
                  <path d="M56 0 44 100" fill="none" stroke="#D5DDE6" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
                </svg>
                {pair.map((task, j) => {
                  const onSteel = j === 1;
                  return (
                    <div key={task} className={`relative flex flex-col justify-center p-4 sm:p-6 ${onSteel ? "pl-[18%]" : "pr-[18%]"}`}>
                      <span className={`mb-3 text-xs font-bold tracking-widest ${onSteel ? "text-white/80" : "text-steel"}`}>
                        {String(i * 2 + j + 1).padStart(2, "0")}
                      </span>
                      <p className={`text-sm font-semibold leading-5 sm:text-base sm:leading-6 ${onSteel ? "text-white" : "text-navy"}`}>
                        {task}
                      </p>
                    </div>
                  );
                })}
              </article>
            ))}
          </div>
        </section>

        {/* Tools and skills */}
        <section aria-labelledby="service-tools" className="mt-16 md:mt-20">
          <Eyebrow>Tools and skills</Eyebrow>
          <SectionTitle id="service-tools">Software they already know</SectionTitle>
          <Chips items={page.tools} className="mt-6" />
        </section>

        {/* How we vet and train */}
        <section
          aria-labelledby="service-vetting"
          className="mt-16 overflow-hidden rounded-2xl bg-navy px-6 py-8 text-white shadow-xl shadow-navy/10 md:mt-20 md:px-9 md:py-10"
        >
          <div className="mb-8 md:mb-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-sky">The SkillDen difference</p>
            <h2 id="service-vetting" className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              How we vet and train for this role
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.vetting.map((b) => (
              <article
                key={b.title}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-sky/50 hover:bg-white/[0.07]"
              >
                <div className="mb-4 h-1 w-10 rounded-full bg-sky" />
                <h3 className="text-base font-bold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/80">{b.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Industries this role serves */}
        {servedIndustries.length > 0 && (
          <section aria-labelledby="service-industries" className="mt-16 md:mt-20">
            <Eyebrow>Industries</Eyebrow>
            <SectionTitle id="service-industries">Industries this role serves</SectionTitle>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {servedIndustries.map((i) => (
                <ArrowCard key={i.slug} href={industryHref(i.slug)} title={i.title} text={i.roles.slice(0, 3).join(", ")} icon={i.icon} />
              ))}
            </div>
          </section>
        )}

        <PricingStrip className="mt-16 md:mt-20" interest={title} />
      </div>

      {/* More ways we can help */}
      <section aria-labelledby="suggested-services-title" className="mx-auto max-w-6xl px-6 pb-20 md:px-12 md:pb-24">
        <Eyebrow>Explore more</Eyebrow>
        <SectionTitle id="suggested-services-title">More ways we can help</SectionTitle>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <ArrowCard key={s.slug} href={serviceHref(s.slug)} title={s.title} text={s.summary} icon={s.icon} image={cardImage(s)} />
          ))}
        </div>
        <Link href="/#services" className="mt-6 inline-block text-sm font-bold text-steel hover:text-navy">
          View all services →
        </Link>
      </section>
    </main>
  );
}

type HeroProps = { service: ServiceSummary; page: ServicePageContent };

function HeroText({ service, page, className = "" }: HeroProps & { className?: string }) {
  return (
    <div className={className}>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-steel">{service.title}</p>
      <h1 className="mb-5 max-w-xl text-4xl font-bold leading-[1.08] tracking-tight text-navy md:text-5xl">{page.heading}</h1>
      <p className="mb-6 max-w-lg text-sm text-slate md:text-base">{service.summary}</p>
      <ContactButton interest={service.title} className={`${primaryButton} px-6 py-3 text-sm`}>
        Book a call
      </ContactButton>
    </div>
  );
}

/** Original design: text on the left, curved illustration filling the right. */
function ImageHero({ service, page }: HeroProps) {
  return (
    <section className="relative pb-10 pt-10 text-navy md:pb-8 md:pt-14">
      <div className="relative flex min-h-[4rem] max-w-3xl items-center lg:ml-10 lg:min-h-[32rem]">
        <HeroText
          service={service}
          page={page}
          className="relative z-10 mx-4 w-full md:mx-auto md:max-w-3xl md:px-6 lg:mx-4 lg:w-1/2 lg:px-0 lg:pr-12"
        />
      </div>
      <div className="relative mt-8 aspect-[1024/507] w-full overflow-hidden lg:absolute lg:inset-0 lg:z-0 lg:mt-0">
        <Image src={page.heroImage!} alt="" fill priority sizes="100vw" className="object-cover object-center" />
      </div>
    </section>
  );
}

/** Roles without an illustration: text plus a "typical tasks" card. */
function TextHero({ service, page }: HeroProps) {
  const Icon = service.icon;
  return (
    <section className="bg-mist">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-24 pt-14 md:px-12 md:pb-28 md:pt-20 lg:grid-cols-[1.4fr_1fr]">
        <HeroText service={service} page={page} />
        <div className="hidden rounded-3xl border border-line bg-white p-8 shadow-xl shadow-navy/5 lg:block">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-steel text-white">
            <Icon aria-hidden="true" className="h-7 w-7" />
          </span>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-slate">Typical tasks</p>
          <ul className="mt-3 space-y-2">
            {page.tasks.slice(0, 4).map((t) => (
              <li key={t} className="flex items-center gap-2 font-semibold text-navy">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-steel" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
