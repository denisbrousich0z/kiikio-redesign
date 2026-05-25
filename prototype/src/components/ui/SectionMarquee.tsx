"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  text: string;
  /** Speed multiplier of scroll-driven horizontal travel. */
  speed?: number;
  className?: string;
  /** Optional accent star or symbol shown between repetitions. */
  divider?: string;
};

/**
 * Full-bleed scroll-reactive marquee for between-section transitions.
 * The text scrolls horizontally based on page scroll, in opposite directions for stacked rows.
 */
export default function SectionMarquee({ text, speed = 1, className = "", divider = "✺" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], [`-${10 * speed}%`, `${10 * speed}%`]);
  const x2 = useTransform(scrollYProgress, [0, 1], [`${10 * speed}%`, `-${10 * speed}%`]);

  const item = (
    <>
      <span>{text}</span>
      <span className="text-bolt/80 px-6">{divider}</span>
    </>
  );

  return (
    <div ref={ref} className={`relative overflow-hidden border-y border-paper/12 py-7 md:py-10 ${className}`}>
      <motion.div style={{ x: x1 }} className="runner font-display text-[12vw] leading-none tracking-[-0.04em] text-paper">
        <span>{item}{item}{item}{item}{item}{item}</span>
      </motion.div>
      <motion.div
        style={{ x: x2 }}
        className="runner font-tag text-[14px] leading-none tracking-[0.32em] text-paper/55 mt-3"
      >
        <span>
          AFTER THE STORM <span className="px-4">/</span> CHAPTER II — LIGHTNING <span className="px-4">/</span>
          EDITION OF 200 <span className="px-4">/</span> DISPATCHING NOW <span className="px-4">/</span>
          AFTER THE STORM <span className="px-4">/</span> CHAPTER II — LIGHTNING <span className="px-4">/</span>
        </span>
      </motion.div>
    </div>
  );
}
