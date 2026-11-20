"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Props = {
  id?: string;
  className?: string;
  /** "continuous" never pauses; "interactive" pauses on hover and while pressed. */
  mode?: "continuous" | "interactive";
  /** Seconds for one full loop of the original set of items. */
  duration?: number;
  /** The item list rendered three times in a row (required for the seamless loop). */
  children: React.ReactNode;
};

/**
 * Infinite horizontal marquee. Children must be the item set repeated 3x;
 * the track starts offset by one set and scrolls through the next one, then repeats.
 */
export default function AutoCarousel({ id, className, mode = "interactive", duration = 50, children }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    if (items.length < 3 || items.length % 3 !== 0) return;

    const perSet = items.length / 3;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const setWidth = items.slice(0, perSet).reduce((sum, el) => sum + el.offsetWidth, 0) + gap * perSet;
    if (!setWidth) return;

    gsap.set(track, { x: -setWidth });
    const tween = gsap.to(track, { x: -setWidth * 2, duration, ease: "none", repeat: -1 });
    if (mode === "continuous") return () => void tween.kill();

    let pressed = false;
    const press = () => {
      pressed = true;
      tween.timeScale(0);
    };
    const release = () => {
      pressed = false;
      tween.timeScale(1);
    };
    const enter = () => !pressed && tween.timeScale(0);
    const leave = () => !pressed && tween.timeScale(1);

    track.addEventListener("pointerdown", press);
    track.addEventListener("pointerup", release);
    track.addEventListener("pointercancel", release);
    track.addEventListener("pointerleave", release);
    track.addEventListener("mouseenter", enter);
    track.addEventListener("mouseleave", leave);
    return () => {
      tween.kill();
      track.removeEventListener("pointerdown", press);
      track.removeEventListener("pointerup", release);
      track.removeEventListener("pointercancel", release);
      track.removeEventListener("pointerleave", release);
      track.removeEventListener("mouseenter", enter);
      track.removeEventListener("mouseleave", leave);
    };
  }, [mode, duration]);

  return (
    <div ref={trackRef} id={id} className={className}>
      {children}
    </div>
  );
}
