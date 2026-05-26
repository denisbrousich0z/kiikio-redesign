"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Kiikio cursor — minimalist crosshair, no circle, no RGB.
 *
 * The cursor is two thin lines crossed at the pointer (precision mark),
 * sized 16x16. When hovering a [data-cursor] target it expands into a
 * compact pill carrying the label. When hovering generic interactive
 * elements (a / button) the crosshair gains a 4px paper dot at its
 * intersection so it reads as "selectable" without resorting to a ring.
 *
 * Hidden on coarse pointers, hidden while focused on text inputs.
 */
export default function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;
    setEnabled(true);

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      }
      if (pillRef.current) {
        pillRef.current.style.transform = `translate3d(${tx + 14}px, ${ty + 14}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      // Hide the crosshair while typing into a text field.
      const isTextField = !!t.closest(
        "input:not([type='checkbox']):not([type='radio']):not([type='button']):not([type='submit']), textarea, [contenteditable='true']"
      );
      if (wrapRef.current) wrapRef.current.dataset.hidden = isTextField ? "1" : "0";

      const hover = t.closest<HTMLElement>("[data-cursor]");
      const isLink = !!t.closest("a, button, [role='button']");
      const cursorLabel = hover?.dataset.cursor || "";

      setLabel(cursorLabel);

      if (wrapRef.current) {
        wrapRef.current.dataset.state = cursorLabel
          ? "labeled"
          : isLink
          ? "hovering"
          : "idle";
      }
    };

    const onLeave = () => {
      if (wrapRef.current) wrapRef.current.dataset.state = "idle";
      setLabel("");
    };

    const onPointerDown = () => {
      if (wrapRef.current) wrapRef.current.dataset.press = "1";
    };
    const onPointerUp = () => {
      if (wrapRef.current) wrapRef.current.dataset.press = "0";
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
        ref={wrapRef}
        data-state="idle"
        data-press="0"
        data-hidden="0"
        className="kk-cursor"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
        aria-hidden
      >
        <span className="kk-cursor__line kk-cursor__line--h" />
        <span className="kk-cursor__line kk-cursor__line--v" />
        <span className="kk-cursor__dot" />
      </div>
      <div
        ref={pillRef}
        className="kk-cursor-label"
        data-visible={label ? "1" : "0"}
        style={{ transform: "translate3d(-100px,-100px,0)" }}
        aria-hidden
      >
        {label}
      </div>
    </>
  );
}
