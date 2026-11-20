"use client";

import { useContact } from "./ContactContext";

type Props = {
  className?: string;
  /** Pre-select this service in the contact form. */
  interest?: string;
  /** Show "Close" instead of the children while the contact panel is open (navbar buttons). */
  swapLabel?: boolean;
  children: React.ReactNode;
  "aria-label"?: string;
};

/** Any button that opens (or closes) the contact panel. */
export default function ContactButton({ className, interest, swapLabel, children, ...rest }: Props) {
  const { contactOpen, toggleContact } = useContact();

  return (
    <button
      type="button"
      className={`contact-toggle ${className ?? ""}`}
      aria-controls="contact-dropdown"
      aria-expanded={contactOpen}
      onClick={(e) => {
        e.preventDefault();
        toggleContact(interest ?? null);
      }}
      {...rest}
    >
      {swapLabel ? <span className="contact-btn-text">{contactOpen ? "Close" : children}</span> : children}
    </button>
  );
}
