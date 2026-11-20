/**
 * Cookie consent store (UK GDPR / PECR). Nothing non-essential may load until the visitor opts in.
 * Choices live in localStorage; components read them with `useConsent()`.
 */
import { useSyncExternalStore } from "react";

export type ConsentChoices = {
  /** Google Analytics 4 etc. */
  analytics: boolean;
  /** Ad pixels: Google Ads, Meta Pixel, LinkedIn Insight Tag. */
  marketing: boolean;
};

type StoredConsent = ConsentChoices & { version: number; updatedAt: string };

/** Bump when categories change, so everyone is asked again. */
const CONSENT_VERSION = 1;
const STORAGE_KEY = "skillden-consent";
const CHANGE_EVENT = "skillden:consent-change";
const OPEN_EVENT = "skillden:consent-open";

function readRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null): ConsentChoices | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<StoredConsent>;
    if (value.version !== CONSENT_VERSION) return null;
    return { analytics: value.analytics === true, marketing: value.marketing === true };
  } catch {
    return null;
  }
}

export function saveConsent(choices: ConsentChoices) {
  const value: StoredConsent = { ...choices, version: CONSENT_VERSION, updatedAt: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage blocked: the choice still applies for this page view via the event below.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

/** Re-open the cookie banner (footer "Cookie settings" link). */
export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

function subscribe(callback: () => void) {
  const onStorage = (e: StorageEvent) => e.key === STORAGE_KEY && callback();
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

/** Sentinel for server rendering, where consent is unknown. */
const SERVER = "__server__";

/**
 * Returns `undefined` during server render / before hydration, `null` when the visitor
 * hasn't chosen yet, or their choices.
 */
export function useConsent(): ConsentChoices | null | undefined {
  const raw = useSyncExternalStore(subscribe, readRaw, () => SERVER);
  if (raw === SERVER) return undefined;
  return parse(raw);
}

export function onConsentSettingsOpen(callback: () => void) {
  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
}
