import { leadRecord, newReference, validateContact, type ContactPayload } from "@/lib/contact";

/**
 * Receives "Book a call" enquiries, validates them again on the server and forwards them to
 * LEAD_WEBHOOK_URL (server-only env var: a Zapier/Make hook, HubSpot form endpoint, SheetDB, etc.).
 * The payload is `{ data: [record] }` (SheetDB-compatible). Leads are never sent anywhere else.
 */
export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ errors: ["Invalid request."] }, { status: 400 });
  }

  // Honeypot: real people never see or fill the "website" field. Pretend success so bots move on.
  if (raw.website) return Response.json({ reference: newReference() });

  const data: ContactPayload = {
    name: String(raw.name ?? ""),
    email: String(raw.email ?? ""),
    phone: String(raw.phone ?? ""),
    interest: Array.isArray(raw.interest) ? raw.interest.map(String).slice(0, 12) : [],
    message: String(raw.message ?? ""),
  };
  const errors = validateContact(data);
  if (errors.length) return Response.json({ errors }, { status: 422 });

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return Response.json({ error: "not_configured" }, { status: 503 });

  const reference = newReference();
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [leadRecord(data, reference)] }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}: ${await res.text()}`);
  } catch (err) {
    console.error("Enquiry forwarding failed:", err);
    return Response.json({ errors: ["We couldn't send your enquiry just now. Please try again."] }, { status: 502 });
  }

  return Response.json({ reference });
}
