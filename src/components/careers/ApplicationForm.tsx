"use client";

import Link from "next/link";
import { useState } from "react";
import { careerRoles } from "@/content/pages";
import { company } from "@/content/company";
import { primaryButton } from "@/components/ui/buttonStyles";

/** Where candidate applications go. Must be a recruitment inbox/tracker, never the sales CRM (scope). */
const APPLICATION_ENDPOINT = process.env.NEXT_PUBLIC_APPLICATION_ENDPOINT ?? "";

const input =
  "w-full rounded-2xl border border-navy/10 bg-gray-50 px-5 py-3.5 font-medium text-navy shadow-sm transition-colors focus:border-steel focus:outline-none";
const label = "text-xs font-bold uppercase tracking-widest text-steel";

function Field({ id, text, children }: { id: string; text: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className={label}>
        {text}
      </label>
      {children}
    </div>
  );
}

/**
 * Candidate application form (scope fields). Not connected yet: Phase 5 sends it, with the CV,
 * to secure storage and a separate recruitment inbox.
 */
export default function ApplicationForm() {
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("company_website")) return; // honeypot: bots fill hidden fields
    if (!APPLICATION_ENDPOINT) {
      setMessage(`Online applications open soon. Please email your CV to ${company.recruitmentEmail}.`);
      return;
    }
    // Phase 5: POST to the recruitment inbox / secure CV storage, then go to /careers/thank-you.
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" aria-describedby={message ? "application-message" : undefined}>
      {/* Honeypot (hidden from people, tempting to bots) */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="app-name" text="Full name">
          <input id="app-name" name="name" className={input} required autoComplete="name" />
        </Field>
        <Field id="app-email" text="Email">
          <input id="app-email" name="email" type="email" className={input} required autoComplete="email" />
        </Field>
        <Field id="app-phone" text="Phone">
          <input id="app-phone" name="phone" type="tel" className={input} required autoComplete="tel" placeholder="+92 300 1234567" />
        </Field>
        <Field id="app-city" text="City">
          <input id="app-city" name="city" className={input} required autoComplete="address-level2" />
        </Field>
        <Field id="app-role" text="Role applied for">
          <select id="app-role" name="role" className={input} required defaultValue="">
            <option value="" disabled>
              Select a role
            </option>
            {careerRoles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
        <Field id="app-years" text="Years of experience">
          <input id="app-years" name="years" type="number" min={0} max={50} className={input} required />
        </Field>
      </div>

      <Field id="app-tools" text="Tools you know">
        <input id="app-tools" name="tools" className={input} placeholder="e.g. Xero, HubSpot, Canva" />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="app-linkedin" text="LinkedIn URL">
          <input id="app-linkedin" name="linkedin" type="url" className={input} placeholder="https://linkedin.com/in/..." />
        </Field>
        <Field id="app-video" text="Short video intro link">
          <input id="app-video" name="video" type="url" className={input} placeholder="Loom, YouTube or Google Drive link" />
        </Field>
      </div>

      <Field id="app-cv" text="CV (PDF or Word)">
        <input
          id="app-cv"
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx"
          required
          className={`${input} file:mr-4 file:rounded-full file:border-0 file:bg-steel file:px-4 file:py-2 file:text-sm file:font-bold file:text-white`}
        />
      </Field>

      <label className="flex gap-3 text-sm text-slate">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0 accent-steel" />
        <span>
          I agree that SkillDen can use my details to assess my application, as described in the{" "}
          <Link href="/privacy" className="font-semibold text-steel underline underline-offset-4">
            privacy policy
          </Link>
          .
        </span>
      </label>

      <button type="submit" className={`${primaryButton} w-full py-5 text-sm uppercase tracking-widest md:w-auto`}>
        Submit application
      </button>

      {message && (
        <p id="application-message" role="status" className="rounded-2xl border border-l-4 border-line border-l-steel bg-mist px-5 py-4 font-semibold text-navy">
          {message}
        </p>
      )}
    </form>
  );
}
