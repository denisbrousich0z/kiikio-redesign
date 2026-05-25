"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx - 4}px, ${ty - 4}px, 0)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${tx + 18}px, ${ty + 18}px, 0)`;
      }
    };

    const tick = () => {
      rx += (tx - rx) * 0.15;
      ry += (ty - ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const hover = t.closest<HTMLElement>("[data-cursor]");
      const isLink = !!t.closest("a, button, [role='button']");
      const cursorLabel = hover?.dataset.cursor || "";
      setLabel(cursorLabel);
      if (ringRef.current) {
        ringRef.current.dataset.state = cursorLabel
          ? "labeled"
          : isLink
          ? "hovering"
          : "idle";
      }
    };
    const onLeave = () => {
      if (ringRef.current) ringRef.current.dataset.state = "idle";
      setLabel("");
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onLeave, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
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
        className="fixed top-0 left-0 z-[9700] pointer-events-none w-9 h-9 rounded-full border border-paper/70 mix-blend-difference transition-[width,height,opacity,border-color,background] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] data-[state=hovering]:w-14 data-[state=hovering]:h-14 data-[state=hovering]:border-paper data-[state=labeled]:w-24 data-[state=labeled]:h-24 data-[state=labeled]:bg-paper data-[state=labeled]:border-paper"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9750] pointer-events-none w-2 h-2 rounded-full bg-paper mix-blend-difference"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9760] pointer-events-none font-tag text-[10px] uppercase tracking-[0.2em] text-ink"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      >
        {label}
      </div>
    </>
  );
}
