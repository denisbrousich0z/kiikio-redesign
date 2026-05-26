"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LogoMark from "@/components/ui/LogoMark";
import { easing } from "@/lib/motion";

const HERO_IMG = "/hero-desert.png";

/**
 * Hero — single editorial frame.
 *
 * Composition borrows the calm corner-aligned layout of editorial sites
 * (cf. Hidden Room): centred wordmark on a quiet photograph, italic accent
 * draped across the mark, small typographic meta in each corner, and a
 * single ENTER call-to-action anchored bottom-right. No oversized
 * description column, no live-status rail.
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);

  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        `${d.getUTCHours().toString().padStart(2, "0")}:${d
          .getUTCMinutes()
          .toString()
          .padStart(2, "0")}:${d.getUTCSeconds().toString().padStart(2, "0")} UTC`
      );
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] overflow-hidden bg-ink text-paper"
    >
      {/* Clean photograph */}
      <img
        src={HERO_IMG}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Soft red radial behind the wordmark — atmosphere, not theatre */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(38% 46% at 50% 54%, rgba(255,42,31,0.22) 0%, rgba(255,42,31,0.10) 35%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Vignette gradients keep type legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-ink/65 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent pointer-events-none" />

      {/* TOP-LEFT meta */}
      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: easing.storm, delay: 0.5 }}
        className="absolute top-24 md:top-28 left-0 px-gutter font-tag text-tag-xs text-paper/75 z-10"
      >
        <div className="text-paper">— Dispatch 02</div>
        <div className="text-paper/55">Chapter II / Lightning</div>
        <div className="text-paper/55">{time || "—"}</div>
      </motion.div>

      {/* TOP-RIGHT meta */}
      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: easing.storm, delay: 0.7 }}
        className="absolute top-24 md:top-28 right-0 px-gutter font-tag text-tag-xs text-paper/75 text-right z-10 hidden md:block"
      >
        <div className="text-paper">Face your storm®</div>
        <div className="text-paper/55">/Chapter II</div>
      </motion.div>

      {/* CENTRED WORDMARK + italic accent (cf. Hidden Room / Vivimos overlay) */}
      <motion.div
        style={{ y: logoY, opacity: fade }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-gutter z-10 pointer-events-none flex flex-col items-center"
      >
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.4, ease: easing.storm, delay: 0.3 }}
          className="relative w-[min(72vw,720px)]"
        >
          <LogoMark
            variant="white"
            layout="block"
            alt="Kiikio"
            className="w-full"
          />

          {/* Italic accent draped diagonally across the wordmark */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easing.storm, delay: 1.0 }}
            aria-hidden
            className="absolute left-[6%] right-0 -bottom-3 md:-bottom-5 font-display italic text-bolt text-[clamp(40px,7vw,96px)] tracking-[-0.02em] leading-none select-none"
            style={{ transform: "rotate(-6deg)", transformOrigin: "left center" }}
          >
            after the storm
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easing.storm, delay: 1.3 }}
          className="mt-10 md:mt-12 font-tag text-tag-xs text-paper/65 flex items-center gap-3"
        >
          <span className="w-10 h-px bg-paper/40" />
          Chapter II — Lightning · Edition of 200
        </motion.div>
      </motion.div>

      {/* BOTTOM-LEFT — scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 md:bottom-10 left-0 px-gutter z-10 font-tag text-tag-xs text-paper/55"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-2"
        >
          Scroll <span aria-hidden>↓</span>
        </motion.span>
      </motion.div>

      {/* BOTTOM-RIGHT — ENTER call-to-action */}
      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: easing.storm, delay: 1.4 }}
        className="absolute bottom-8 md:bottom-10 right-0 px-gutter z-10"
      >
        <Link
          href="/collections/chapter-ii-lightning"
          data-cursor="Enter dispatch"
          className="group inline-flex items-baseline gap-3 font-tag text-tag-xs uppercase tracking-[0.24em] text-paper hover:text-dune transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        >
          <span aria-hidden className="inline-block translate-y-[1px]">↪</span>
          <span className="border-b border-paper/40 group-hover:border-dune pb-1">
            Enter
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
