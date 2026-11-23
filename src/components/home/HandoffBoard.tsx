"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowRight, Check } from "lucide-react";
import { handoffTasks } from "@/content/home";

const STEP_MS = 1700;
const HOLD_MS = 3200;
const LABEL =
  "Illustration: tasks such as emails, bookkeeping and invoice chasing move from your to-do list to your SkillDen assistant.";

/**
 * Drives the hand-off loop: how many tasks the assistant has taken so far.
 * Plays only while on screen (a `display: none` copy never intersects, so it stays idle);
 * with reduced motion it shows a still, part-way state.
 */
function useHandoff(ref: RefObject<HTMLElement | null>) {
  const total = handoffTasks.length;
  const [done, setDone] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) {
          if (entry.isIntersecting) {
            setDone(3); // still frame, part-way through the hand-off
            io.disconnect();
          }
        } else {
          setVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(() => setDone((d) => (d >= total ? 0 : d + 1)), done >= total ? HOLD_MS : done === 0 ? 900 : STEP_MS);
    return () => window.clearTimeout(t);
  }, [visible, done, total]);

  return { done, total, progress: Math.round((done / total) * 100) };
}

function TimeBack({ progress }: { progress: number }) {
  return (
    <>
      <div className="mb-2 flex items-center justify-between text-xs font-semibold">
        <span className="text-slate">Your week, back in your hands</span>
        <span className="tabular-nums text-navy">{progress}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-mist">
        <div className="h-full rounded-full bg-steel transition-[width] duration-700 ease-out" style={{ width: `${progress}%` }} />
      </div>
    </>
  );
}

/** Desktop/tablet hero illustration: tasks move off "your plate" and onto your assistant's. */
export default function HandoffBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const { done, progress } = useHandoff(ref);
  const pending = handoffTasks.slice(done);
  const handled = handoffTasks.slice(0, done).reverse();

  return (
    <div
      ref={ref}
      role="img"
      aria-label={LABEL}
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
          <TimeBack progress={progress} />
        </div>
      </div>
    </div>
  );
}

/**
 * Phone version: the whole list stays in view, and each task flips in place from "yours" to
 * "done by your assistant", so the full value is visible at a glance without a tall two-panel board.
 */
export function HandoffBoardCompact() {
  const ref = useRef<HTMLDivElement>(null);
  const { done, total, progress } = useHandoff(ref);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={LABEL}
      className="relative w-full select-none rounded-3xl border border-line bg-white p-4 text-left shadow-[0_24px_48px_-28px_rgba(15,27,42,0.35)]"
    >
      <div aria-hidden="true">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-navy">
            <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-500" />
            Your assistant
          </p>
          <p className="text-[0.7rem] font-semibold tabular-nums text-slate">
            {done}/{total} handed off
          </p>
        </div>

        <ul className="space-y-1.5">
          {handoffTasks.map((task, i) => {
            const isDone = i < done;
            const isNext = i === done;
            return (
              <li
                key={task}
                className={`flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors duration-500 ${
                  isDone ? "bg-white text-slate ring-1 ring-line" : isNext ? "bg-mist text-navy ring-1 ring-steel/30" : "bg-mist text-navy"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                    isDone ? "bg-steel text-white" : "border-2 border-line bg-white"
                  }`}
                >
                  {isDone && <Check className="check-pop h-3 w-3" strokeWidth={3} />}
                </span>
                <span className={`min-w-0 flex-1 truncate ${isDone ? "line-through decoration-slate/40" : ""}`}>{task}</span>
                {isDone ? (
                  <span className="task-in shrink-0 text-[0.65rem] font-bold uppercase tracking-wider text-steel">Done</span>
                ) : isNext ? (
                  <ArrowRight className="nudge-x h-4 w-4 shrink-0 text-steel" />
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="mt-4 border-t border-line pt-3">
          <TimeBack progress={progress} />
        </div>
      </div>
    </div>
  );
}
