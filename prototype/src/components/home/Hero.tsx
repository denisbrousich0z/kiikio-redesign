"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Magnetic from "@/components/ui/Magnetic";
import { easing } from "@/lib/motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden bg-ink text-paper grain">
      {/* Photography */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src="https://cdn.shopify.com/s/files/1/0785/8618/3955/files/20260515-180939.jpg"
          alt="Chapter II — Lightning campaign"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
      </motion.div>

      {/* Top meta */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute top-24 md:top-28 inset-x-0 px-gutter flex items-start justify-between text-paper z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easing.storm, delay: 0.6 }}
          className="font-tag text-tag-xs text-paper/70"
        >
          — Chapter II / Lightning
          <br />
          Dispatching now
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easing.storm, delay: 0.8 }}
          className="font-tag text-tag-xs text-paper/70 text-right hidden md:block"
        >
          Edition of 200
          <br />
          Lot 014 — 030
        </motion.div>
      </motion.div>

      {/* Headline */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-0 px-gutter flex flex-col justify-end pb-24 md:pb-28 text-paper z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: easing.storm, delay: 0.4 }}
          className="font-display text-display-xl tracking-[-0.04em] leading-[0.92] max-w-[16ch]"
        >
          After
          <br />
          <em className="not-italic text-dune">the storm.</em>
        </motion.h1>

        <div className="mt-12 grid md:grid-cols-12 gap-8 items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easing.storm, delay: 1.1 }}
            className="md:col-span-5 max-w-[44ch] font-body text-paper/75 text-[15px] leading-relaxed"
          >
            Three years ago a single hoodie lay on a workshop table the night a storm broke.
            Chapter II is the dispatch from the second strike — distressed, hardware-set, returned intact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easing.storm, delay: 1.3 }}
            className="md:col-span-7 flex items-center gap-6 md:justify-end"
          >
            <Magnetic strength={0.35}>
              <Link href="/collections/chapter-ii-lightning" className="btn-storm bg-paper text-ink hover:bg-dune">
                Enter Chapter II
                <span aria-hidden>→</span>
              </Link>
            </Magnetic>
            <Link
              href="/#story"
              className="font-tag text-tag-xs text-paper/75 hover:text-paper border-b border-paper/40 pb-1"
            >
              Read the story
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom marquee strip */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-t border-paper/15 bg-ink/40 backdrop-blur-sm">
        <div className="px-gutter h-10 flex items-center justify-between font-tag text-tag-xs text-paper/70">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-bolt rounded-full" />
            New chapter — live now
          </span>
          <span className="hidden md:flex items-center gap-6">
            <span>SS26 / Lightning</span>
            <span>Free worldwide over $129</span>
            <span>Scroll ↓</span>
          </span>
          <span className="md:hidden">Scroll ↓</span>
        </div>
      </div>
    </section>
  );
}
