import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import ContactButton from "@/components/contact/ContactButton";
import { primaryButton, secondaryButton } from "@/components/ui/buttonStyles";

/** Small building blocks shared by the service and industry page templates. */

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow mb-3 ${className}`}>{children}</p>;
}

export function SectionTitle({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-3xl font-bold tracking-[-0.025em] text-navy md:text-4xl">
      {children}
    </h2>
  );
}

export function Chips({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Link card with a photo or icon on the left and an arrow on the right ("More ways we can help"). */
export function ArrowCard({
  href,
  title,
  text,
  icon: Icon,
  image,
}: {
  href: string;
  title: string;
  text: string;
  icon: LucideIcon;
  image?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-28 items-stretch gap-4 overflow-hidden rounded-xl border border-line bg-white transition duration-200 hover:-translate-y-0.5 hover:border-steel/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel focus-visible:ring-offset-2"
    >
      {image ? (
        <Image src={image} alt="" width={224} height={224} className="w-28 shrink-0 self-stretch object-cover" />
      ) : (
        <span className="flex w-20 shrink-0 items-center justify-center bg-mist text-steel">
          <Icon aria-hidden="true" className="h-7 w-7" />
        </span>
      )}
      <span className="flex min-w-0 flex-1 items-center gap-3 py-4 pr-4">
        <span className="min-w-0 flex-1">
          <span className="block font-bold text-navy transition-colors group-hover:text-steel">{title}</span>
          <span className="mt-1 block text-sm leading-5 text-slate">{text}</span>
        </span>
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0 text-steel transition-transform group-hover:translate-x-1">
          <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

/** Hero for simple inner pages (How it works, Pricing, About, Careers, Book a call). */
export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-white">
      <div className="hero-intro mx-auto max-w-6xl px-6 pb-16 pt-6 md:px-12 md:pb-20 md:pt-10">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-[1.06] tracking-[-0.035em] text-navy md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">{text}</p>
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

/** Pricing teaser (scope): "from £X a month" + link to Pricing + Book a call. */
export function PricingStrip({ className = "", interest }: { className?: string; interest?: string }) {
  return (
    <section
      aria-label="Pricing"
      className={`reveal flex flex-col gap-6 rounded-3xl bg-mist px-6 py-9 md:flex-row md:items-center md:justify-between md:px-10 ${className}`}
    >
      <div>
        <Eyebrow>Pricing</Eyebrow>
        <p className="text-2xl font-bold tracking-tight text-navy md:text-3xl">
          Full-time from <span className="text-steel">£[X]</span> a month
        </p>
        <p className="mt-2 text-sm text-slate">One fee covers recruitment, training, management and replacements. No surprise invoices.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <ContactButton interest={interest} className={`${primaryButton} px-6 py-3 text-sm`}>
          Book a call
        </ContactButton>
        <Link href="/pricing" className={`${secondaryButton} px-6 py-3 text-sm`}>
          See pricing
        </Link>
      </div>
    </section>
  );
}
