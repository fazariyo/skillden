"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { services } from "@/content/catalogue";
import { company } from "@/content/company";
import {
  CONTACT_SUCCESS_KEY,
  EnquiriesNotConfiguredError,
  enquiryMailto,
  submitContact,
  validateContact,
} from "@/lib/contact";
import { primaryButton } from "@/components/ui/buttonStyles";

const contactInterestOptions = services.map((s) => s.title);

type Feedback = { tone: "error" | "info"; text: string; mailto?: string };

const inputClass =
  "w-full bg-gray-50 border border-navy/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-steel transition-colors text-navy font-medium shadow-sm";
const labelClass = "text-xs font-bold uppercase tracking-widest text-steel";

type Props = {
  id?: string;
  /** Service to pre-select (set when opened from a service page's "Book a call" button). */
  presetInterest?: string | null;
};

export default function ContactForm({ id = "contact-form", presetInterest }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [interestOpen, setInterestOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  // Pre-tick the service the visitor came from (adjusting state during render when the prop changes).
  // Normalise undefined → null, otherwise `undefined !== null` would re-render forever.
  const preset = presetInterest ?? null;
  const [appliedPreset, setAppliedPreset] = useState<string | null>(null);
  if (preset !== appliedPreset) {
    setAppliedPreset(preset);
    if (preset && contactInterestOptions.includes(preset) && !interests.includes(preset)) {
      setInterests([...interests, preset]);
    }
  }

  // Close the interest dropdown when clicking outside the form.
  useEffect(() => {
    if (!interestOpen) return;
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Node && !formRef.current?.contains(e.target)) setInterestOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [interestOpen]);

  const toggleInterest = (value: string, checked: boolean) =>
    setInterests((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      interest: fd.getAll("interest").map(String),
      message: String(fd.get("message") ?? ""),
    };

    const errors = validateContact(data);
    if (errors.length) {
      setFeedback({ tone: "error", text: errors.join(" ") });
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitContact({ ...data, website: String(fd.get("website") ?? "") });
      let target = "/thank-you";
      try {
        sessionStorage.setItem(CONTACT_SUCCESS_KEY, JSON.stringify(result));
      } catch (err) {
        console.error("Could not save contact confirmation details in session storage:", err);
        target += `?${new URLSearchParams(result).toString()}`;
      }
      router.push(target);
    } catch (err) {
      setSubmitting(false);
      if (err instanceof EnquiriesNotConfiguredError) {
        // No CRM connected yet: hand the visitor a ready-to-send email so the enquiry isn't lost.
        setFeedback({
          tone: "info",
          text: "Your answers are ready to send by email. We reply within one working day.",
          mailto: enquiryMailto(company.email, data),
        });
        return;
      }
      console.error("Submission error:", err);
      setFeedback({
        tone: "error",
        text: err instanceof Error && !err.message.startsWith("Enquiry submission failed") ? err.message : "Your enquiry didn't send. Check your connection and try again.",
      });
    }
  }

  return (
    <form ref={formRef} id={id} className="relative space-y-6 bg-white p-2" onSubmit={onSubmit}>
      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input type="text" id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelClass} htmlFor={`${id}-name`}>
            Your name
          </label>
          <input type="text" id={`${id}-name`} name="name" placeholder="Jane Smith" className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className={labelClass} htmlFor={`${id}-email`}>
            Work email
          </label>
          <input
            type="email"
            id={`${id}-email`}
            name="email"
            placeholder="jane@company.co.uk"
            className={inputClass}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelClass} htmlFor={`${id}-phone`}>
          Phone
        </label>
        <div className="flex items-center overflow-hidden rounded-2xl border border-navy/10 bg-gray-50 shadow-sm focus-within:border-steel">
          <div className="flex items-center gap-2 border-r border-navy/10 bg-white/60 px-4 py-4 text-sm font-medium text-navy">
            <span aria-label="United Kingdom" title="United Kingdom">
              🇬🇧
            </span>
            <span>+44</span>
          </div>
          <input
            type="tel"
            id={`${id}-phone`}
            name="phone"
            placeholder="07700 900123"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={11}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
            className="w-full bg-transparent px-4 py-4 text-navy placeholder:text-navy/50 focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelClass} htmlFor={`${id}-interest-toggle`}>
          Role needed
        </label>
        <div className="relative">
          <button
            type="button"
            id={`${id}-interest-toggle`}
            className="interest-toggle flex w-full items-center justify-between rounded-2xl border border-navy/10 bg-gray-50 px-6 py-4 text-left font-medium text-navy shadow-sm transition-colors hover:border-steel focus:outline-none focus:border-steel"
            aria-expanded={interestOpen}
            aria-controls={`${id}-interest-options`}
            onClick={() => setInterestOpen((o) => !o)}
          >
            <span className={interests.length ? "" : "text-navy/50"}>
              {interests.length ? interests.join(", ") : "Select an option"}
            </span>
            <svg
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-steel transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m19 9-7 7-7-7" />
            </svg>
          </button>
          <div
            id={`${id}-interest-options`}
            className={`absolute left-0 right-0 top-full z-20 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-navy/10 bg-white p-2 shadow-xl ${interestOpen ? "" : "hidden"}`}
          >
            {contactInterestOptions.map((option, i) => (
              <label
                key={option}
                htmlFor={`${id}-interest-${i}`}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-navy transition-colors hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  id={`${id}-interest-${i}`}
                  name="interest"
                  value={option}
                  checked={interests.includes(option)}
                  onChange={(e) => toggleInterest(option, e.target.checked)}
                  className="h-4 w-4 accent-steel"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelClass} htmlFor={`${id}-message`}>
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          placeholder="Tell us about the work you need help with"
          className={inputClass}
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`${primaryButton} w-full py-4 text-base`}
      >
        {submitting ? "Sending..." : "Send enquiry"}
      </button>

      {feedback && (
        <div
          role={feedback.tone === "error" ? "alert" : "status"}
          className={`flex flex-col gap-4 rounded-2xl border-l-4 px-5 py-4 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between ${
            feedback.tone === "error" ? "border-red-600 bg-red-50 text-red-800" : "border-steel bg-mist text-navy"
          }`}
        >
          <span>{feedback.text}</span>
          {feedback.mailto && (
            <a href={feedback.mailto} className={`${primaryButton} shrink-0 px-5 py-2.5 text-sm`}>
              Open email
            </a>
          )}
        </div>
      )}
    </form>
  );
}
