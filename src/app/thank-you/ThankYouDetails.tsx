"use client";

import { useSyncExternalStore } from "react";
import { CONTACT_SUCCESS_KEY } from "@/lib/contact";

type Details = { name: string | null; reference: string | null };

const EMPTY = "{}";
const noopSubscribe = () => () => {};

/** Reads the confirmation details as a JSON string (a primitive keeps the snapshot stable). */
function readSnapshot(): string {
  const params = new URLSearchParams(window.location.search);
  if (params.has("name") && params.has("reference")) {
    return JSON.stringify({ name: params.get("name"), reference: params.get("reference") });
  }
  try {
    const raw = sessionStorage.getItem(CONTACT_SUCCESS_KEY);
    if (!raw) return EMPTY;
    const saved: unknown = JSON.parse(raw);
    if (
      saved &&
      typeof saved === "object" &&
      "name" in saved &&
      "reference" in saved &&
      typeof saved.name === "string" &&
      typeof saved.reference === "string"
    ) {
      return JSON.stringify({ name: params.get("name") ?? saved.name, reference: saved.reference });
    }
  } catch (err) {
    console.error("Could not read contact confirmation details:", err);
  }
  return EMPTY;
}

/** Personalised greeting + reference, read from the URL (?name=&reference=) or sessionStorage. */
export default function ThankYouDetails() {
  const snapshot = useSyncExternalStore(noopSubscribe, readSnapshot, () => EMPTY);
  const details: Partial<Details> = JSON.parse(snapshot);

  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
        Thank you, <span className="text-steel">{details.name || "there"}</span>!
      </h1>
      <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-slate md:text-lg">
        Thanks for contacting SkillDen. We&apos;ll be in touch within one working day to arrange your call.
      </p>
      {details.reference && (
        <p className="mt-5 text-sm font-medium text-slate">
          Reference: <span>{details.reference}</span>
        </p>
      )}
    </>
  );
}
