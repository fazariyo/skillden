"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { onConsentSettingsOpen, saveConsent, useConsent } from "@/lib/consent";
import { primaryButton, secondaryButton } from "@/components/ui/buttonStyles";

const sm = "px-5 py-2.5 text-sm";
const primarySm = `${primaryButton} ${sm}`;
const secondarySm = `${secondaryButton} ${sm}`;

/**
 * Cookie consent banner. Shown until the visitor chooses; reopened from the footer.
 * "Accept all" and "Reject all" are equally prominent (ICO guidance).
 */
export default function CookieBanner() {
  const consent = useConsent();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const titleId = useId();

  useEffect(
    () =>
      onConsentSettingsOpen(() => {
        setAnalytics(consent?.analytics ?? false);
        setMarketing(consent?.marketing ?? false);
        setShowDetails(true);
        setSettingsOpen(true);
      }),
    [consent],
  );

  const visible = consent === null || settingsOpen; // `undefined` = not hydrated yet
  if (!visible) return null;

  const choose = (choices: { analytics: boolean; marketing: boolean }) => {
    saveConsent(choices);
    setSettingsOpen(false);
    setShowDetails(false);
  };

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed inset-x-3 bottom-3 z-[70] rounded-3xl border border-navy/10 bg-white shadow-2xl shadow-navy/15 md:inset-x-6 md:bottom-6"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-5 sm:px-8 md:py-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-3xl">
            <h2 id={titleId} className="text-base font-semibold text-navy">
              Cookies on skillden.co.uk
            </h2>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate">
              We use essential cookies to make this site work. With your permission, we&apos;d also like to use
              analytics and advertising cookies to understand how the site is used and to measure our ads. Read our{" "}
              <Link href="/cookies" className="font-semibold text-steel underline underline-offset-4">
                cookie policy
              </Link>
              .
            </p>
          </div>
          {!showDetails && (
            <div className="flex flex-wrap gap-3">
              <button type="button" className={primarySm} onClick={() => choose({ analytics: true, marketing: true })}>
                Accept all
              </button>
              <button type="button" className={primarySm} onClick={() => choose({ analytics: false, marketing: false })}>
                Reject all
              </button>
              <button type="button" className={secondarySm} onClick={() => setShowDetails(true)}>
                Manage settings
              </button>
            </div>
          )}
        </div>

        {showDetails && (
          <form
            className="mt-5 border-t border-line pt-5"
            onSubmit={(e) => {
              e.preventDefault();
              choose({ analytics, marketing });
            }}
          >
            <fieldset className="grid gap-4 md:grid-cols-3">
              <legend className="sr-only">Cookie categories</legend>
              <Category
                title="Essential"
                description="Needed for the site to work, such as remembering this choice. Always on."
                checked
                disabled
              />
              <Category
                title="Analytics"
                description="Helps us see which pages are useful (Google Analytics)."
                checked={analytics}
                onChange={setAnalytics}
              />
              <Category
                title="Advertising"
                description="Measures our ads on Google, Meta and LinkedIn."
                checked={marketing}
                onChange={setMarketing}
              />
            </fieldset>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="submit" className={primarySm}>
                Save choices
              </button>
              <button type="button" className={secondarySm} onClick={() => choose({ analytics: true, marketing: true })}>
                Accept all
              </button>
              <button type="button" className={secondarySm} onClick={() => choose({ analytics: false, marketing: false })}>
                Reject all
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Category({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex gap-3 rounded-2xl border border-navy/10 p-4">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-steel"
      />
      <label htmlFor={id} className="text-sm leading-snug">
        <span className="block font-semibold text-navy">{title}</span>
        <span className="mt-1 block text-slate">{description}</span>
      </label>
    </div>
  );
}
