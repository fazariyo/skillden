/**
 * SkillDen logo.
 *
 * TEMPORARY ARTWORK: the mark below is redrawn from the Brand Guidelines PDF and the wordmark is
 * live Manrope Bold text next to it (Navbar, Footer). The guidelines say the logo must come from the
 * outlined kit artwork (01-logo/skillden-logo-horizontal-primary.svg / -reversed.svg): when the kit
 * arrives, swap this mark and the wordmark text for the official SVGs.
 */

type Tone = "primary" | "reversed";

const palette: Record<Tone, { chevron: string; gem: string; text: string }> = {
  primary: { chevron: "#0F1B2A", gem: "#1F5A85", text: "#0F1B2A" }, // on White / Mist
  reversed: { chevron: "#FFFFFF", gem: "#8DB3D6", text: "#FFFFFF" }, // on Navy
};

/** The mark: a rising chevron over a gem (diamond). */
export function SkillDenMark({
  tone = "primary",
  className,
  title,
}: {
  tone?: Tone;
  className?: string;
  title?: string;
}) {
  const c = palette[tone];
  return (
    <svg
      viewBox="0 0 100 92"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <polygon points="50,0 100,50 86,64 50,28 14,64 0,50" fill={c.chevron} />
      <polygon points="50,40 76,66 50,92 24,66" fill={c.gem} />
    </svg>
  );
}
