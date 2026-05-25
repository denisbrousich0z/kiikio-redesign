"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

type Props = {
  /** Text broken across lines. Each entry = one line. */
  lines: string[];
  className?: string;
  /** ranges from 0..1 mapped to skew/translate. */
  skewMax?: number;
  trailingChar?: ReactNode;
};

const stormEase = [0.25, 1, 0.5, 1] as const;

/**
 * Huge kinetic headline that:
 * - Drops in per-letter on mount (storm easing).
 * - Skews/blurs/translates on scroll (drives feeling of weight).
 */
export default function KineticHeadline({ lines, className = "", skewMax = 6, trailingChar }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const skew = useTransform(scrollYProgress, [0, 0.5, 1], [skewMax, 0, -skewMax]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, 4]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div
      ref={ref}
      style={{ skewY: skew, filter }}
      className={`font-display tracking-[-0.05em] leading-[0.82] ${className}`}
    >
      {lines.map((line, li) => (
        <div key={li} className="block overflow-hidden">
          <span className="inline-flex flex-wrap">
            {Array.from(line).map((ch, ci) => (
              <motion.span
                key={`${li}-${ci}`}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 1.1,
                  ease: stormEase,
                  delay: 0.04 * ci + 0.15 * li,
                }}
                className="kinetic-letter"
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
            {li === lines.length - 1 && trailingChar ? (
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1, ease: stormEase, delay: 0.6 }}
                className="kinetic-letter"
              >
                {trailingChar}
              </motion.span>
            ) : null}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
