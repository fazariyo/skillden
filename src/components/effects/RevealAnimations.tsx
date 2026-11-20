"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide GSAP animations, re-run on every route change. Skipped entirely when the visitor
 * prefers reduced motion (globals.css then leaves everything visible).
 * - `.hero-intro` children play in sequence on load.
 * - `.reveal`, `.reveal-left`, `.reveal-right` fade/slide in when scrolled into view.
 * - `.reveal-stagger` reveals its children one after another.
 * - `[data-progress-line]` grows with scroll through its parent (process timeline).
 */
export default function RevealAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".hero-intro").forEach((intro) => {
        gsap.to(intro.children, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.1 });
      });

      gsap.utils.toArray<HTMLElement>(".reveal, .reveal-left, .reveal-right").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal-stagger").forEach((group) => {
        gsap.to(group.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-progress-line]").forEach((line) => {
        const vertical = line.dataset.progressLine === "y";
        gsap.fromTo(
          line,
          { [vertical ? "scaleY" : "scaleX"]: 0 },
          {
            [vertical ? "scaleY" : "scaleX"]: 1,
            ease: "none",
            scrollTrigger: { trigger: line.parentElement, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
          },
        );
      });
    });

    // Images loading in can shift layout; recompute trigger positions once everything is in.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
