"use client";

import { useEffect, useRef, useState } from "react";

const THUNDER_URL =
  "data:audio/wav;base64,UklGRoQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YWAAAAA="; // tiny silent fallback

/**
 * Lightning easter egg.
 * - Random flash every 30–60s (subtle, no audio by default).
 * - Toggle button in bottom-right enables "storm" mode: faster flashes + audio.
 */
export default function LightningFlash() {
  const ref = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [storm, setStorm] = useState(false);

  useEffect(() => {
    const minDelay = storm ? 6000 : 28000;
    const maxDelay = storm ? 14000 : 60000;

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      timer = setTimeout(() => {
        const el = ref.current;
        if (el) {
          el.classList.remove("is-strike");
          void el.offsetWidth; // restart animation
          el.classList.add("is-strike");
        }
        if (storm && audioRef.current) {
          try {
            audioRef.current.currentTime = 0;
            void audioRef.current.play();
          } catch {
            /* user hasn't interacted yet */
          }
        }
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [storm]);

  return (
    <>
      <div ref={ref} className="lightning-flash" aria-hidden />
      <audio ref={audioRef} src={THUNDER_URL} preload="auto" />
      <button
        type="button"
        onClick={() => setStorm((v) => !v)}
        data-cursor={storm ? "Calm" : "Summon storm"}
        aria-pressed={storm}
        className="fixed bottom-5 right-5 z-[9600] font-tag text-[10px] uppercase tracking-[0.2em] text-paper/70 hover:text-paper border border-paper/30 hover:border-paper px-3 py-2 backdrop-blur-sm bg-ink/40 transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
      >
        <span className="inline-flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${storm ? "bg-bolt animate-pulse" : "bg-paper/50"}`} />
          {storm ? "STORM ACTIVE" : "SUMMON STORM"}
        </span>
      </button>
    </>
  );
}
