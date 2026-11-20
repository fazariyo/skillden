import { Suspense } from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { company, defaultSeo } from "@/content/company";
import CookieBanner from "@/components/consent/CookieBanner";
import ScrollProgress from "@/components/effects/ScrollProgress";
import RevealAnimations from "@/components/effects/RevealAnimations";
import "./globals.css";

// Manrope everywhere (brand guidelines): Regular 400, Medium 500, SemiBold 600, Bold 700.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: { default: defaultSeo.title, template: "%s | SkillDen" },
  description: defaultSeo.description,
  openGraph: {
    type: "website",
    siteName: "SkillDen",
    locale: "en_GB",
    url: company.siteUrl,
    title: defaultSeo.title,
    description: defaultSeo.description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds the "js" class before React hydrates.
    <html lang="en-GB" className={`scroll-smooth ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll-reveal elements start hidden (globals.css). No JS = content stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[10001] rounded-full bg-navy px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
        <ScrollProgress />
        {/* Reads the pathname; Suspense keeps unknown routes from blocking prerendering. */}
        <Suspense fallback={null}>
          <RevealAnimations />
        </Suspense>
        <CookieBanner />
      </body>
    </html>
  );
}
