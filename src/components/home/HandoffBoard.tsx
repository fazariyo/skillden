"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { handoffTasks } from "@/content/home";

const STEP_MS = 1700;
const HOLD_MS = 3200;

/**
 * Hero illustration of the SkillDen promise: tasks move off "your plate" and onto your assistant's.
 * Plays only while on screen; with reduced motion it shows a still, part-way state.
 */
export default function HandoffBoard() {
  const total = handoffTasks.length;
  const [done, setDone] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) {
          setDone(3); // still frame, part-way through the hand-off
          io.disconnect();
        } else {
          setVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(() => setDone((d) => (d >= total ? 0 : d + 1)), done >= total ? HOLD_MS : done === 0 ? 900 : STEP_MS);
    return () => window.clearTimeout(t);
  }, [visible, done, total]);

  const pending = handoffTasks.slice(done);
  const handled = handoffTasks.slice(0, done).reverse();
  const progress = Math.round((done / total) * 100);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustration: tasks such as emails, bookkeeping and invoice chasing move from your to-do list to your SkillDen assistant."
      className="relative mx-auto w-full max-w-md select-none rounded-3xl border border-line bg-white p-2 text-left shadow-[0_30px_60px_-30px_rgba(15,27,42,0.35)]"
    >
      <div aria-hidden="true">
        {/* Your plate */}
        <div className="rounded-[1.25rem] bg-mist p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate">On your plate</p>
            <p className="text-xs font-semibold tabular-nums text-slate">{pending.length} left</p>
          </div>
          <ul className="min-h-[13.25rem] space-y-2">
            {pending.map((task) => (
              <li key={task} className="flex h-9 items-center gap-3 rounded-xl bg-white px-3 text-sm font-medium text-navy shadow-sm">
                <span className="h-4 w-4 shrink-0 rounded-full border-2 border-line" />
                <span className="truncate">{task}</span>
              </li>
            ))}
            {pending.length === 0 && (
              <li className="task-in flex h-9 items-center px-1 text-sm font-semibold text-steel">Clear. Time for the work only you can do.</li>
            )}
          </ul>
        </div>

        {/* Your assistant */}
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-navy">
              <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-500" />
              Your assistant
            </p>
            <p className="text-xs font-semibold text-slate">Online · UK hours</p>
          </div>
          <ul className="min-h-[13.25rem] space-y-2">
            {handled.map((task) => (
              <li key={task} className="task-in flex h-9 items-center gap-3 rounded-xl border border-line px-3 text-sm font-medium text-slate">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-steel text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="truncate line-through decoration-slate/40">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Time back */}
        <div className="mx-5 mb-4 border-t border-line pt-4">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold">
            <span className="text-slate">Your week, back in your hands</span>
            <span className="tabular-nums text-navy">{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-mist">
            <div className="h-full rounded-full bg-steel transition-[width] duration-700 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
