const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

/** Primary (steel blue, pill-shaped) button. Append size/layout classes per use. */
export const primaryButton = `${base} bg-steel text-white shadow-[0_8px_20px_-8px_rgba(31,90,133,0.6)] hover:bg-navy hover:shadow-[0_10px_24px_-10px_rgba(15,27,42,0.7)]`;

/** Secondary (white, outlined, pill-shaped) button. */
export const secondaryButton = `${base} border border-line bg-white text-navy hover:border-navy/40`;

/** Text link with an animated arrow, for low-emphasis actions. */
export const textLink =
  "group inline-flex items-center gap-1.5 font-semibold text-steel transition-colors hover:text-navy";
