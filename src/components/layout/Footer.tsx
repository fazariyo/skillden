import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { company } from "@/content/company";
import { companyLinks, legalLinks } from "@/content/navigation";
import { assistants, serviceHref } from "@/content/catalogue";
import { SkillDenMark } from "@/components/brand/Logo";
import ContactButton from "@/components/contact/ContactButton";
import CookieSettingsLink from "@/components/consent/CookieSettingsLink";
import CurrentYear from "./CurrentYear";

/** Bottom strip: logo, copyright + company registration, legal links, cookie settings. */
export function FooterBar() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 border-t border-white/10 px-6 py-6 text-center md:flex-row md:justify-between md:px-12 md:text-left">
      <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
        <span className="flex items-center gap-2">
          <SkillDenMark tone="reversed" className="h-5 w-auto" />
          <span className="text-lg font-bold tracking-tight text-white">SkillDen</span>
        </span>
        <span className="text-xs text-white/60">
          © <CurrentYear /> {company.legalName} · {company.registration} · Company no. {company.companyNumber}
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-white/60">
        {legalLinks.map((link) => (
          <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
            {link.label}
          </Link>
        ))}
        <CookieSettingsLink className="transition-colors hover:text-white" />
      </div>
    </div>
  );
}

/** Full footer: closing call to action, contact details and site links. */
export default function Footer() {
  return (
    <footer id="main-footer" className="w-full max-w-[100vw] overflow-hidden bg-navy text-white">
      {/* Closing call to action */}
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:px-12 md:pb-20 md:pt-28">
        <div className="reveal grid gap-10 border-b border-white/10 pb-16 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-sky">Your next step</p>
            <h2 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white md:text-6xl">
              Get your evenings back. <span className="text-sky">Start with a 20-minute call.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Tell us what&apos;s taking up your time. We&apos;ll tell you honestly whether an assistant can help, and what it
              would cost. No obligation.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <ContactButton className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-navy transition duration-200 hover:-translate-y-0.5 hover:bg-sky">
              Book a free call
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ContactButton>
            <a
              href={`mailto:${company.email}`}
              className="group inline-flex items-center justify-center gap-1.5 font-semibold text-white/80 transition-colors hover:text-white"
            >
              or email {company.email}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2" aria-label="SkillDen home">
              <SkillDenMark tone="reversed" className="h-7 w-auto" />
              <span className="text-xl font-bold tracking-tight text-white">SkillDen</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Dedicated, industry-trained remote assistants for UK businesses. Recruited, trained and managed by us.
            </p>
            <p className="mt-4 text-sm text-white/60">{company.phone}</p>
          </div>
          <FooterLinks title="Roles" links={assistants.map((s) => ({ label: s.title, href: serviceHref(s.slug) }))} />
          <FooterLinks title="Company" links={companyLinks} />
        </div>
      </div>

      <FooterBar />
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-sky">{title}</h3>
      <ul className="space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-white/75 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
