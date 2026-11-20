import { Fragment } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export type LegalSection = { heading: string; body: string };

type Props = {
  title: string;
  intro: string;
  sections: LegalSection[];
  /** Show the "draft text" notice (legal wording must come from the owner or their adviser). */
  draft?: boolean;
};

/** Simple text page (original site's legal page design) used by the legal and policy pages. */
export default function LegalPage({ title, intro, sections, draft = true }: Props) {
  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-4xl px-6 pb-24 pt-40 md:pt-48">
        <h1 className="mb-8 text-4xl font-bold text-navy">{title}</h1>
        {draft && (
          <p className="mb-8 rounded-2xl border border-l-4 border-line border-l-steel bg-mist px-5 py-4 text-sm font-semibold text-navy">
            Draft placeholder: the final wording will be supplied by SkillDen or its legal adviser.
          </p>
        )}
        <div className="space-y-4 leading-relaxed text-slate">
          <p>{intro}</p>
          {sections.map((s) => (
            <Fragment key={s.heading}>
              <h2 className="mt-8 text-2xl font-bold text-navy">{s.heading}</h2>
              <p>{s.body}</p>
            </Fragment>
          ))}
        </div>
        <Link href="/" className="mt-12 inline-block font-bold text-steel hover:underline">
          ← Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
