"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { assistants, industries, industryHref, serviceHref, specialists } from "@/content/catalogue";
import { primaryLinks } from "@/content/navigation";
import { useContact } from "@/components/contact/ContactContext";
import ContactButton from "@/components/contact/ContactButton";
import { primaryButton } from "@/components/ui/buttonStyles";
import { SkillDenMark } from "@/components/brand/Logo";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel";

type MenuItem = { href: string; title: string; summary?: string; icon: LucideIcon };

const serviceItems = (list: typeof assistants): MenuItem[] =>
  list.map((s) => ({ href: serviceHref(s.slug), title: s.title, summary: s.summary, icon: s.icon }));
const industryItems: MenuItem[] = industries.map((i) => ({
  href: industryHref(i.slug),
  title: i.title,
  summary: i.roles.slice(0, 3).join(", "),
  icon: i.icon,
}));

export default function Navbar() {
  const { menuOpen, contactOpen, setMenuOpen, toggleMenu, menuToggleRef, mobileMenuRef } = useContact();
  const [scrolled, setScrolled] = useState(false);
  const overlayOpen = menuOpen || contactOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false, true);

  return (
    <nav
      id="navbar"
      aria-label="Main navigation"
      className={`fixed left-0 top-0 z-50 w-full max-w-[100vw] py-4 transition-all duration-300 md:py-6 ${scrolled ? "py-2" : ""}`}
    >
      <div className="container relative z-50 mx-auto mt-2 flex min-w-0 max-w-6xl items-center justify-between rounded-full border border-navy/10 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl md:mt-4 md:px-8 md:py-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 md:gap-3" aria-label="SkillDen home">
          <SkillDenMark className="h-8 w-auto md:h-10" />
          <span className="text-xl font-bold tracking-tight text-navy md:text-2xl">SkillDen</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 text-base font-medium tracking-wide text-navy lg:flex xl:gap-8 xl:text-lg">
          <Link
            href="/#services"
            className="services-menu-trigger flex items-center gap-1 font-semibold transition-colors hover:text-steel"
            aria-controls="services-mega-menu"
          >
            <span className="nav-underline">Services</span>
            <ChevronDown aria-hidden="true" className="h-4 w-4" />
          </Link>
          {/* No industries overview page in the scope: this trigger only opens its menu. */}
          <button
            type="button"
            className="industries-menu-trigger flex items-center gap-1 font-semibold transition-colors hover:text-steel"
            aria-controls="industries-mega-menu"
          >
            <span className="nav-underline">Industries</span>
            <ChevronDown aria-hidden="true" className="h-4 w-4" />
          </button>
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="font-semibold transition-colors hover:text-steel">
              <span className="nav-underline">{link.label}</span>
            </Link>
          ))}
          <ContactButton swapLabel className={`${primaryButton} relative z-50 min-w-[140px] px-6 py-2.5 text-sm`}>
            Book a call
          </ContactButton>
        </div>

        {/* Mobile controls: Book a call stays visible */}
        <div className="flex items-center gap-2 lg:hidden">
          <ContactButton swapLabel className={`${primaryButton} px-3 py-2 text-[11px] sm:px-4 sm:py-2.5 sm:text-xs`}>
            Book a call
          </ContactButton>
          <button
            ref={menuToggleRef}
            id="menu-toggle"
            type="button"
            className={`rounded-full p-2.5 text-navy transition-colors hover:bg-steel/10 ${focusRing}`}
            aria-label={contactOpen ? "Close contact form" : menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-menu contact-dropdown"
            aria-expanded={overlayOpen}
            onClick={toggleMenu}
          >
            {overlayOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Desktop mega menus (opened via CSS :has() hover/focus, see globals.css) */}
      <MegaMenu id="services-mega-menu" label="Services">
        <MenuGroup title="Assistants" items={serviceItems(assistants)} />
        <MenuGroup title="Specialists" items={serviceItems(specialists)} className="mt-4" />
        <Link
          href="/#services"
          className="mt-4 inline-flex items-center gap-1.5 px-3 text-sm font-semibold text-steel hover:text-navy"
        >
          View all services <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </MegaMenu>
      <MegaMenu id="industries-mega-menu" label="Industries">
        <MenuGroup items={industryItems} />
      </MegaMenu>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col items-stretch gap-2 overflow-y-auto bg-white/95 px-6 pb-12 pt-32 text-base font-semibold text-navy backdrop-blur-xl transition-all duration-300 lg:hidden ${
          menuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-[-10px] opacity-0"
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <MobileGroup label="Services">
          <p className="px-2 pb-1 pt-2 text-xs font-bold uppercase tracking-widest text-slate">Assistants</p>
          <MobileCards items={serviceItems(assistants)} onNavigate={closeMenu} />
          <p className="px-2 pb-1 pt-4 text-xs font-bold uppercase tracking-widest text-slate">Specialists</p>
          <MobileCards items={serviceItems(specialists)} onNavigate={closeMenu} />
        </MobileGroup>
        <MobileGroup label="Industries">
          <MobileCards items={industryItems} onNavigate={closeMenu} />
        </MobileGroup>
        {primaryLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className={`mobile-link rounded-xl px-4 py-4 text-lg font-bold transition-colors hover:bg-steel/5 hover:text-steel ${focusRing}`}
          >
            <span className="nav-underline">{link.label}</span>
          </Link>
        ))}
        <ContactButton swapLabel className={`${primaryButton} mt-4 w-full px-10 py-4`}>
          Book a call
        </ContactButton>
      </div>
    </nav>
  );
}

function MegaMenu({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div
      id={id}
      className="mega-menu invisible pointer-events-none absolute left-0 right-0 top-[calc(100%-1rem)] z-[60] opacity-0 transition-all duration-200"
      role="region"
      aria-label={label}
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-12">
        <div className="rounded-3xl border border-navy/10 bg-white p-4 shadow-2xl shadow-navy/10 md:p-5">{children}</div>
      </div>
    </div>
  );
}

function MenuGroup({ title, items, className = "" }: { title?: string; items: MenuItem[]; className?: string }) {
  return (
    <div className={className}>
      {title && <p className="mb-2 px-3 text-xs font-bold uppercase tracking-widest text-slate">{title}</p>}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ href, title: name, summary, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`group flex min-w-0 items-center gap-3 rounded-2xl border border-transparent p-3 transition-colors hover:border-steel/15 hover:bg-steel/[0.04] focus-visible:border-steel/30 ${focusRing}`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-steel/10 text-steel transition-colors group-hover:bg-steel group-hover:text-white">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold leading-5 text-navy transition-colors group-hover:text-steel">{name}</span>
              {summary && <span className="mt-1 block text-xs font-normal leading-5 text-slate">{summary}</span>}
            </span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-slate transition-transform group-hover:translate-x-1 group-hover:text-steel"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group w-full border-b border-navy/10">
      <summary
        className={`flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-4 text-lg font-bold transition-colors hover:bg-steel/5 ${focusRing} [&::-webkit-details-marker]:hidden`}
      >
        <span className="nav-underline">{label}</span>
        <ChevronDown aria-hidden="true" className="h-5 w-5 text-steel transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="px-2 pb-4">{children}</div>
    </details>
  );
}

function MobileCards({ items, onNavigate }: { items: MenuItem[]; onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">
      {items.map(({ href, title, summary, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={onNavigate}
          className={`mobile-link group flex min-w-0 items-center gap-3 rounded-xl border border-navy/10 bg-white p-3 text-sm font-medium text-slate transition-colors hover:border-steel/30 hover:bg-steel/[0.04] hover:text-steel ${focusRing}`}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-steel/10 text-steel">
            <Icon aria-hidden="true" className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold text-navy">{title}</span>
            {summary && <span className="mt-0.5 block text-xs font-normal leading-4 text-slate">{summary}</span>}
          </span>
        </Link>
      ))}
    </div>
  );
}
