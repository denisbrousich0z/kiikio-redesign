"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Kiikio cursor — minimalist, streetwear-aligned.
 *
 * Layered system:
 *   - dot      : tiny 4px paper dot, follows pointer 1:1 (no easing)
 *   - ring     : 28px hairline ring, lerps toward the pointer (or snaps
 *                onto the centre of a [data-cursor] target for "magnetic" feel)
 *   - label    : monospace caption rendered to the right of the ring while
 *                hovering elements that declare data-cursor="..."
 *
 * Hover states are flat (no RGB split, no glitch). The ring grows to a
 * larger circle when over interactive elements, and grows to a labeled
 * pill-circle when over a data-cursor target. Uses mix-blend-difference so
 * the cursor stays legible on any background without needing inversion logic.
 *
 * Hidden on coarse pointers, hidden during text-input focus.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;
    setEnabled(true);

    // Pointer + ring positions
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let raf = 0;
    let snapX: number | null = null;
    let snapY: number | null = null;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx - 2}px, ${ty - 2}px, 0)`;
      }
    };

    const tick = () => {
      // Magnetic snap: if we're over a data-cursor target, lerp the ring
      // toward the target's centre instead of the raw pointer.
      const targetX = snapX ?? tx;
      const targetY = snapY ?? ty;
      // Strong lerp (0.22) for snappy feel without spring overshoot.
      rx += (targetX - rx) * 0.22;
      ry += (targetY - ry) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${rx + 22}px, ${ry + 22}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      // While interacting with form inputs, hide the cursor entirely.
      const isTextField = !!t.closest(
        "input:not([type='checkbox']):not([type='radio']):not([type='button']):not([type='submit']), textarea, [contenteditable='true']"
      );
      if (ringRef.current) ringRef.current.dataset.hidden = isTextField ? "1" : "0";
      if (dotRef.current) dotRef.current.dataset.hidden = isTextField ? "1" : "0";

      const hover = t.closest<HTMLElement>("[data-cursor]");
      const isLink = !!t.closest("a, button, [role='button']");
      const cursorLabel = hover?.dataset.cursor || "";

      setLabel(cursorLabel);

      // Magnetic snap to the centre of buttons and CTAs (only for short labels
      // and small enough targets — we don't want to snap to giant hero images).
      const snapEl = hover && hover.closest<HTMLElement>("a, button, [role='button']");
      if (snapEl) {
        const r = snapEl.getBoundingClientRect();
        if (r.width < 360 && r.height < 220) {
          snapX = r.left + r.width / 2;
          snapY = r.top + r.height / 2;
        } else {
          snapX = null;
          snapY = null;
        }
      } else {
        snapX = null;
        snapY = null;
      }

      if (ringRef.current) {
        ringRef.current.dataset.state = cursorLabel
          ? "labeled"
          : isLink
          ? "hovering"
          : "idle";
      }
    };

    const onLeave = () => {
      snapX = null;
      snapY = null;
      if (ringRef.current) ringRef.current.dataset.state = "idle";
      setLabel("");
    };

    const onPointerDown = () => {
      if (ringRef.current) ringRef.current.dataset.press = "1";
    };
    const onPointerUp = () => {
      if (ringRef.current) ringRef.current.dataset.press = "0";
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onLeave, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onLeave, true);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        data-state="idle"
        data-press="0"
        data-hidden="0"
        className="kk-cursor-ring"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
      <div
        ref={dotRef}
        data-hidden="0"
        className="kk-cursor-dot"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
      <div
        ref={labelRef}
        className="kk-cursor-label"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      >
        <span className="kk-cursor-label__inner">{label}</span>
      </div>
    </>
  );
}
