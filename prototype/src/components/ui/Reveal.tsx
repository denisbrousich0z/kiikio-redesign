"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

type Props = {
  children: ReactNode;
  delay?: number;
  variants?: Variants;
  className?: string;
  once?: boolean;
};

export default function Reveal({ children, delay = 0, variants = fadeUp, className, once = true }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      custom={delay}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
