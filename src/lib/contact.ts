/** Validation + submission for the "Book a call" enquiry form. */

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  interest: string[];
  message: string;
};

export const CONTACT_SUCCESS_KEY = "skillden-contact-success";

const NAME_RE = /^[a-zA-Z\s'-]{2,50}$/;
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const sanitize = (v: unknown) =>
  String(v ?? "")
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();

/** UK number without the country code: 10 digits, or 11 with the leading 0. */
const ukDigits = (phone: string) => phone.replace(/\D/g, "").replace(/^0/, "");

export function validateContact(data: ContactPayload): string[] {
  const errors: string[] = [];
  if (!NAME_RE.test(sanitize(data.name))) errors.push("Please enter your name (letters only).");
  if (!EMAIL_RE.test(sanitize(data.email))) errors.push("Please enter a valid email address.");
  if (ukDigits(data.phone).length !== 10) errors.push("Please enter a UK phone number, e.g. 07700 900123.");
  if (data.interest.length === 0) errors.push("Please choose the role you need.");
  return errors;
}

/** UK date and time, e.g. "11/11/2026, 13:58". */
function ukTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export const newReference = () => `SD-${crypto.randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;

/** The lead as it is sent to the CRM/webhook (server side, app/api/enquiry/route.ts). */
export function leadRecord(data: ContactPayload, reference: string) {
  return {
    Name: sanitize(data.name),
    Email: sanitize(data.email),
    Phone: `+44 ${ukDigits(data.phone)}`,
    "Role needed": data.interest.map(sanitize).join(", "),
    Message: sanitize(data.message).slice(0, 4000),
    Reference: reference,
    "Submitted (UK time)": ukTimestamp(),
  };
}

/** Thrown when the site has no lead destination configured yet; the form then offers email instead. */
export class EnquiriesNotConfiguredError extends Error {}

/** Posts the enquiry to our own API route and returns the reference shown on the thank-you page. */
export async function submitContact(data: ContactPayload & { website?: string }) {
  // Static hosting (GitHub Pages) has no API route: fall back to the pre-filled email.
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT) throw new EnquiriesNotConfiguredError();
  const res = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = (await res.json().catch(() => ({}))) as { reference?: string; error?: string; errors?: string[] };
  if (res.status === 503 && body.error === "not_configured") throw new EnquiriesNotConfiguredError();
  if (!res.ok || !body.reference) throw new Error(body.errors?.join(" ") || `Enquiry submission failed (${res.status})`);
  return { name: data.name.trim(), reference: body.reference };
}

/** A ready-to-send email with the visitor's answers, used when online enquiries aren't connected. */
export function enquiryMailto(to: string, data: ContactPayload) {
  const subject = `Enquiry: ${data.interest.join(", ") || "remote assistant"}`;
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: +44 ${ukDigits(data.phone)}`,
    `Role needed: ${data.interest.join(", ")}`,
    "",
    data.message,
  ].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
