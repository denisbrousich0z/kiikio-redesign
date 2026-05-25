"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Magnetic from "@/components/ui/Magnetic";
import LogoMark from "@/components/ui/LogoMark";
import { easing } from "@/lib/motion";

const DisplacementHero = dynamic(() => import("@/components/ui/DisplacementHero"), {
  ssr: false,
  loading: () => null,
});

const HERO_IMG =
  "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/20260515-180939.jpg";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const [mountWebGL, setMountWebGL] = useState(false);
  const [time, setTime] = useState("");

  // Lazy-mount the WebGL hero AFTER first paint to keep LCP fast.
  useEffect(() => {
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const handle = ric ? ric(() => setMountWebGL(true)) : window.setTimeout(() => setMountWebGL(true), 300);
    return () => {
      if (typeof handle === "number") window.clearTimeout(handle);
    };
  }, []);

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
      {/* Skeleton-first image so the user sees a hero in < 1s before WebGL boots. */}
      <img
        src={HERO_IMG}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />

      {/* WebGL displaced photography — mounted lazily */}
      {mountWebGL && <DisplacementHero src={HERO_IMG} />}

      {/* Hard image vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/5 to-ink/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent pointer-events-none" />

      {/* TOP meta */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute top-24 md:top-28 inset-x-0 px-gutter flex items-start justify-between text-paper/80 z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easing.storm, delay: 0.7 }}
          className="font-tag text-tag-xs"
        >
          <div>— DISPATCH 02</div>
          <div className="text-paper/55">Chapter II / Lightning</div>
          <div className="text-paper/55">{time || "—"}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easing.storm, delay: 0.9 }}
          className="font-tag text-tag-xs text-right hidden md:block"
        >
          <div>EDITION OF 200</div>
          <div className="text-paper/55">Lot 014 — 030</div>
          <div className="text-paper/55">Sand-set / Single source</div>
        </motion.div>
      </motion.div>

      {/* HERO LOGO — the real glitch wordmark, edge-to-edge, parallaxed. */}
      <motion.div
        style={{ y: logoY, scale: logoScale, opacity: fade }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-gutter z-10 pointer-events-none"
      >
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.6, ease: easing.storm, delay: 0.4 }}
          className="origin-left"
        >
          <LogoMark
            variant="white"
            layout="block"
            glitchOnIdle
            alt="Kiikio"
            className="is-hero w-full"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easing.storm, delay: 1.4 }}
          className="mt-4 font-tag text-tag-xs text-paper/60 flex items-center gap-3"
        >
          <span className="w-10 h-px bg-paper/40" />
          After the storm — Chapter II Lightning
        </motion.div>
      </motion.div>

      {/* Bottom block: description + CTA + scroll indicator */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-0 px-gutter pb-10 md:pb-14 z-10"
      >
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easing.storm, delay: 1.0 }}
            className="md:col-span-5 max-w-[42ch] font-body text-paper/80 text-[15px] leading-relaxed"
          >
            Three years ago a single hoodie lay on a workshop table the night a storm
            broke. Chapter II is the dispatch from the second strike — distressed,
            hardware-set, returned intact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easing.storm, delay: 1.2 }}
            className="md:col-span-4 md:col-start-8 flex items-center gap-6 md:justify-end"
          >
            <Magnetic strength={0.4}>
              <Link
                href="/collections/chapter-ii-lightning"
                data-cursor="Enter chapter"
                className="btn-storm"
              >
                Enter Chapter II
                <span aria-hidden>→</span>
              </Link>
            </Magnetic>
            <Link
              href="/#story"
              data-cursor="Read"
              className="font-tag text-tag-xs text-paper/70 hover:text-paper border-b border-paper/35 pb-1"
            >
              Read story
            </Link>
          </motion.div>
        </div>

        {/* Live bottom rail */}
        <div className="mt-10 flex items-center justify-between border-t border-paper/15 pt-4 font-tag text-tag-xs text-paper/55">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-bolt rounded-full animate-pulse" />
            ACTIVE DISPATCH
          </span>
          <span className="hidden md:flex items-center gap-6">
            <span>Free worldwide over $129</span>
            <span>30-day returns</span>
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            Scroll <span aria-hidden>↓</span>
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
