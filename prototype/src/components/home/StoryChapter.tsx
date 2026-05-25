"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

export default function StoryChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.4, 1, 1, 0.6]);

  return (
    <section id="story" ref={ref} className="bg-ink text-paper py-chapter relative overflow-hidden">
      <div className="px-gutter relative grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5 md:col-start-1 relative">
          <motion.div
            style={{ y }}
            className="relative aspect-[3/4] overflow-hidden grain bg-storm"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0785/8618/3955/files/img_v3_02q5_80796cf2-f48a-4769-9438-c1cdcafbf8eg.jpg"
              alt="Behind the chapters — Kiikio workshop"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </motion.div>
          <div className="absolute -bottom-6 -right-6 font-display text-[160px] md:text-[220px] leading-[0.8] text-bolt/15 select-none pointer-events-none">
            II
          </div>
        </div>

        <motion.div style={{ opacity }} className="md:col-span-6 md:col-start-7 self-center">
          <Reveal>
            <div className="font-tag text-tag-xs text-paper/60 mb-6">— Origin / The Lightning hour</div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="font-display text-display-lg tracking-[-0.03em] leading-[0.96]">
              "Three years ago, on a stormy night,<br />
              <em className="not-italic text-dune">a single hoodie lay on a sewing table.</em>"
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-10 space-y-5 max-w-[52ch] font-body text-paper/70 text-[15.5px] leading-relaxed">
              <p>
                No one thought it would matter. The morning after the storm the hoodie was still there — heavier,
                weathered, untouched and yet altered. The first chapter was the recognition that the storm was the design.
              </p>
              <p>
                Kiikio reads the weather. Each chapter is the answer to a question the previous one couldn't finish.
                Lightning came second. Aftermath is coming.
              </p>
            </div>
          </Reveal>
          <Reveal delay={3} className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/collections/chapter-ii-lightning"
              data-cursor="Read chapter II"
              className="btn-storm"
            >
              Read Chapter II
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="#"
              data-cursor="Full studio note"
              className="font-tag text-tag-xs text-paper/65 border-b border-paper/40 pb-1 hover:text-paper transition-colors duration-300"
            >
              Full studio note
            </Link>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
