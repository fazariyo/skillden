"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type ContactContextValue = {
  contactOpen: boolean;
  menuOpen: boolean;
  /** Service to pre-tick in the "Interested in" field when the panel opens. */
  presetInterest: string | null;
  openContact: (interest?: string | null) => void;
  closeContact: (restoreFocus?: boolean) => void;
  toggleContact: (interest?: string | null) => void;
  setMenuOpen: (open: boolean, restoreFocus?: boolean) => void;
  toggleMenu: () => void;
  menuToggleRef: React.RefObject<HTMLButtonElement | null>;
  contactPanelRef: React.RefObject<HTMLDivElement | null>;
  mobileMenuRef: React.RefObject<HTMLDivElement | null>;
};

const ContactContext = createContext<ContactContextValue | null>(null);

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Owns the open/closed state of the full-screen contact panel and the mobile nav menu,
 * plus the keyboard behaviour around them (Escape to close, focus trap, focus restore).
 */
export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpenState] = useState(false);
  const [presetInterest, setPresetInterest] = useState<string | null>(null);

  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
  const contactPanelRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const setMenuOpen = useCallback((open: boolean, restoreFocus = false) => {
    setMenuOpenState(open);
    if (open) {
      requestAnimationFrame(() => mobileMenuRef.current?.querySelector<HTMLElement>("a, summary, button")?.focus());
    } else if (restoreFocus) {
      menuToggleRef.current?.focus();
    }
  }, []);

  const openContact = useCallback((interest: string | null = null) => {
    const active = document.activeElement;
    if (active instanceof HTMLElement) {
      returnFocusRef.current = active.closest("#mobile-menu") ? menuToggleRef.current : active;
    }
    setPresetInterest(interest);
    setMenuOpenState(false);
    setContactOpen(true);
    requestAnimationFrame(() => contactPanelRef.current?.querySelector<HTMLElement>(".contact-toggle")?.focus());
  }, []);

  const closeContact = useCallback((restoreFocus = false) => {
    setContactOpen(false);
    if (restoreFocus) returnFocusRef.current?.focus();
  }, []);

  const toggleContact = useCallback(
    (interest: string | null = null) => (contactOpen ? closeContact(true) : openContact(interest)),
    [contactOpen, closeContact, openContact],
  );

  const toggleMenu = useCallback(() => {
    if (contactOpen) {
      closeContact();
      menuToggleRef.current?.focus();
    } else {
      setMenuOpen(!menuOpen);
    }
  }, [contactOpen, menuOpen, closeContact, setMenuOpen]);

  // Lock page scroll while either overlay is open.
  useEffect(() => {
    if (!contactOpen && !menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [contactOpen, menuOpen]);

  // Close the mobile menu when the viewport grows to desktop size.
  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setMenuOpenState(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  // Escape closes; Tab is trapped inside the contact panel while it is open.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (contactOpen) {
          e.preventDefault();
          closeContact(true);
        } else if (menuOpen) {
          e.preventDefault();
          setMenuOpen(false, true);
        }
        return;
      }
      const panel = contactPanelRef.current;
      if (e.key !== "Tab" || !contactOpen || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      );
      const first = items[0];
      const last = items.at(-1);
      if (!first || !last) {
        e.preventDefault();
        panel.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [contactOpen, menuOpen, closeContact, setMenuOpen]);

  const value = useMemo(
    () => ({
      contactOpen,
      menuOpen,
      presetInterest,
      openContact,
      closeContact,
      toggleContact,
      setMenuOpen,
      toggleMenu,
      menuToggleRef,
      contactPanelRef,
      mobileMenuRef,
    }),
    [contactOpen, menuOpen, presetInterest, openContact, closeContact, toggleContact, setMenuOpen, toggleMenu],
  );

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used inside <ContactProvider>");
  return ctx;
}
