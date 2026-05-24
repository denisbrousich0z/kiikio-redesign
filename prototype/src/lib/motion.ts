import type { Transition, Variants } from "framer-motion";

export const easing = {
  storm: [0.25, 1, 0.5, 1] as const,
  weathered: [0.6, 0.05, 0.25, 0.95] as const,
} as const;

export const duration = {
  quick: 0.4,
  base: 0.7,
  long: 1.1,
  cinematic: 1.6,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.base,
      ease: easing.storm,
      delay: i * 0.08,
    } satisfies Transition,
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.long, ease: easing.storm } },
};

export const reveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.cinematic, ease: easing.storm },
  },
};

export const charStagger: Variants = {
  hidden: { opacity: 0, y: "60%" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easing.storm, delay: i * 0.04 },
  }),
};
