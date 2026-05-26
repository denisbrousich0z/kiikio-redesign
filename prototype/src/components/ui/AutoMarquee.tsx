"use client";

import type { CSSProperties, ReactNode } from "react";

type IconDivider = "bolt";

type Props = {
  /** Text to repeat across the strip. */
  text: string;
  /** Optional second row for stacked marquees. */
  secondary?: string;
  /** Seconds for one full loop. Lower = faster. */
  duration?: number;
  /** Run direction. */
  reverse?: boolean;
  /** Divider rendered between repetitions of the text. */
  divider?: string;
  /** Render an inline SVG between repetitions instead of a text divider. */
  iconDivider?: IconDivider;
  /** Optional extra class for the wrapping section. */
  className?: string;
  /** Visual size. "lg" — display headline, "md" — compact strip. */
  size?: "lg" | "md";
};

/**
 * KIIKIO.COM — autonomous marquee.
 *
 * Runs as a constant CSS animation independent of scroll. Two duplicated
 * tracks make the loop seamless. Supports either a plain text divider
 * (`divider="·"`) or an inline SVG icon (`iconDivider="bolt"`) — never
 * emoji, per brand guideline. Honours prefers-reduced-motion.
 */
export default function AutoMarquee({
  text,
  secondary,
  duration = 32,
  reverse = false,
  divider = "·",
  iconDivider,
  className = "",
  size = "lg",
}: Props) {
  const style: CSSProperties & Record<string, string | number> = {
    "--marquee-duration": `${duration}s`,
    "--marquee-direction": reverse ? "reverse" : "normal",
  };

  // Restrained editorial scale — no oversized type.
  const headlineSize =
    size === "lg"
      ? "text-[clamp(28px,4.4vw,64px)] tracking-[-0.035em] leading-[1.06]"
      : "text-[clamp(18px,2.4vw,36px)] tracking-[-0.025em] leading-[1.1]";

  const secondaryStyle: CSSProperties & Record<string, string | number> = {
    "--marquee-duration": `${duration}s`,
    "--marquee-direction": reverse ? "normal" : "reverse",
  };

  const dividerNode: ReactNode = iconDivider === "bolt" ? <BoltIcon /> : divider;

  const secondaryRow = secondary && (
    <div className="auto-marquee" style={secondaryStyle}>
      <div className="auto-marquee__track auto-marquee__track--mono">
        <Block text={secondary} divider={dividerNode} />
        <Block text={secondary} divider={dividerNode} aria-hidden />
      </div>
    </div>
  );

  return (
    <div className={`relative bg-ink text-paper border-y border-paper/12 ${className}`}>
      <div className={`auto-marquee py-3 md:py-4 font-display ${headlineSize}`} style={style}>
        <div className="auto-marquee__track">
          <Block text={text} divider={dividerNode} />
          <Block text={text} divider={dividerNode} aria-hidden />
        </div>
      </div>
      {secondaryRow && (
        <div className="border-t border-paper/8 py-2.5 md:py-3 font-tag text-[10.5px] tracking-[0.28em] text-paper/55">
          {secondaryRow}
        </div>
      )}
    </div>
  );
}

function Block({
  text,
  divider,
  ...rest
}: {
  text: string;
  divider: ReactNode;
} & { "aria-hidden"?: boolean }) {
  // 8 repetitions per track copy — visually dense like the original.
  const items = Array.from({ length: 8 });
  return (
    <div className="auto-marquee__block" {...rest}>
      {items.map((_, i) => (
        <span key={i} className="auto-marquee__item">
          <span>{text}</span>
          <span className="auto-marquee__divider" aria-hidden>
            {divider}
          </span>
        </span>
      ))}
    </div>
  );
}

function BoltIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="0.72em"
      height="0.72em"
      aria-hidden
      focusable="false"
      className="inline-block align-[-0.08em] text-bolt"
    >
      <path
        d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
