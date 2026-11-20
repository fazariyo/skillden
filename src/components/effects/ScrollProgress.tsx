"use client";

import { useEffect, useState } from "react";

/** Thin bar at the top of the viewport showing page scroll progress. */
export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setWidth(max > 0 ? ((document.body.scrollTop || el.scrollTop) / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[10000] h-[3px] bg-steel transition-[width] duration-100 ease-out"
      style={{ width: `${width}%` }}
    />
  );
}
