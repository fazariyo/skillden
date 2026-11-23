"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-wide entrance animations, re-run on every route change. Skipped entirely when the visitor
 * prefers reduced motion (globals.css then leaves everything visible).
 * - `.hero-intro` children play in sequence on load.
 * - `.reveal`, `.reveal-left`, `.reveal-right` fade/slide in when scrolled into view.
 * - `.reveal-stagger` reveals its children one after another.
 * - `[data-progress-line]` grows with scroll through its parent (process timeline).
 *
 * Uses the Web Animations API rather than inline styles: it never writes to the `style`
 * attribute, so it can start before React has hydrated a part of the page without causing a
 * hydration mismatch (server-rendered and client attributes stay identical).
 */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function RevealAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animations: Animation[] = [];
    const cleanups: (() => void)[] = [];

    // Animates from the CSS start state (globals.css) to fully visible, and stays there.
    const show = (el: Element, delay = 0, duration = 900) => {
      animations.push(
        el.animate([{ opacity: 1, transform: "none" }], { duration, delay, easing: EASE, fill: "forwards" }),
      );
    };

    document.querySelectorAll(".hero-intro").forEach((intro) => {
      Array.from(intro.children).forEach((child, i) => show(child, 100 + i * 100));
    });

    const onView = (el: Element, rootMargin: string, play: () => void) => {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          play();
          io.disconnect();
        },
        { rootMargin },
      );
      io.observe(el);
      cleanups.push(() => io.disconnect());
    };

    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
      onView(el, "0px 0px -12% 0px", () => show(el));
    });

    document.querySelectorAll(".reveal-stagger").forEach((group) => {
      onView(group, "0px 0px -15% 0px", () =>
        Array.from(group.children).forEach((child, i) => show(child, i * 80, 800)),
      );
    });

    // Scroll-linked line: a paused animation whose progress follows the scroll position.
    document.querySelectorAll<HTMLElement>("[data-progress-line]").forEach((line) => {
      const parent = line.parentElement;
      if (!parent) return;
      const axis = line.dataset.progressLine === "y" ? "scaleY" : "scaleX";
      const anim = line.animate([{ transform: `${axis}(0)` }, { transform: `${axis}(1)` }], {
        duration: 1000,
        fill: "both",
      });
      anim.pause();
      animations.push(anim);

      let frame = 0;
      const update = () => {
        frame = 0;
        const rect = parent.getBoundingClientRect();
        const vh = window.innerHeight;
        // Starts when the parent's top hits 75% of the viewport, ends when its bottom hits 60%.
        const start = rect.top - vh * 0.75;
        const end = rect.bottom - vh * 0.6;
        const progress = Math.min(1, Math.max(0, -start / (end - start || 1)));
        anim.currentTime = progress * 1000;
      };
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanups.push(() => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      animations.forEach((a) => a.cancel());
    };
  }, [pathname]);

  return null;
}
