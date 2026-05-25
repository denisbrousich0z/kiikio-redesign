"use client";

import type { CSSProperties } from "react";

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
  /** Optional extra class for the wrapping section. */
  className?: string;
  /** Visual size. "lg" — display headline, "md" — compact strip. */
  size?: "lg" | "md";
};

/**
 * KIIKIO.COM — autonomous marquee.
 *
 * Runs as a constant CSS animation independent of scroll, mirroring the
 * original kiikio.com ticker. Renders two duplicated tracks so the loop
 * is seamless. Honors prefers-reduced-motion.
 */
export default function AutoMarquee({
  text,
  secondary,
  duration = 32,
  reverse = false,
  divider = "·",
  className = "",
  size = "lg",
}: Props) {
  const style: CSSProperties & Record<string, string | number> = {
    "--marquee-duration": `${duration}s`,
    "--marquee-direction": reverse ? "reverse" : "normal",
  };

  const headlineSize =
    size === "lg"
      ? "text-[clamp(40px,6.4vw,96px)] tracking-[-0.04em] leading-[1.05]"
      : "text-[clamp(22px,3.4vw,52px)] tracking-[-0.03em] leading-[1.1]";

  const secondaryStyle: CSSProperties & Record<string, string | number> = {
    "--marquee-duration": `${duration}s`,
    "--marquee-direction": reverse ? "normal" : "reverse",
  };
  const secondaryRow = secondary && (
    <div className="auto-marquee" style={secondaryStyle}>
      <div className="auto-marquee__track auto-marquee__track--mono">
        <Block text={secondary} divider={divider} />
        <Block text={secondary} divider={divider} aria-hidden />
      </div>
    </div>
  );

  return (
    <div className={`relative bg-ink text-paper border-y border-paper/12 ${className}`}>
      <div className={`auto-marquee py-4 md:py-5 font-display ${headlineSize}`} style={style}>
        <div className="auto-marquee__track">
          <Block text={text} divider={divider} />
          <Block text={text} divider={divider} aria-hidden />
        </div>
      </div>
      {secondaryRow && (
        <div className="border-t border-paper/8 py-3 md:py-4 font-tag text-[11px] tracking-[0.32em] text-paper/55">
          {secondaryRow}
        </div>
      )}
    </div>
  );
}

function Block({ text, divider, ...rest }: { text: string; divider: string } & { "aria-hidden"?: boolean }) {
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
