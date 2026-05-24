"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  duration?: number; // seconds for one full loop
  reverse?: boolean;
  className?: string;
};

export default function Marquee({ children, duration = 38, reverse = false, className }: Props) {
  return (
    <div className={["overflow-hidden", className].filter(Boolean).join(" ")}>
      <motion.div
        className="flex gap-12 whitespace-nowrap will-change-transform"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
