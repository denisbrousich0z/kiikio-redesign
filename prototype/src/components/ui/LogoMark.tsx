"use client";

import { useEffect, useRef } from "react";

type Props = {
  variant?: "white" | "black";
  /** "block" = full responsive image, "inline" = small fixed height inline */
  layout?: "block" | "inline" | "vertical";
  /** if true, occasionally trigger a glitch animation */
  glitchOnIdle?: boolean;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
};

/**
 * The real Kiikio glitch wordmark.
 *
 * Renders three stacked copies of the actual logo PNG. Two of them are
 * displaced + colored (bolt red & dune sand) and clipped into narrow
 * horizontal slices. On hover or random idle pulse, the offsets
 * intensify, producing a CRT-glitch / RGB-split effect that matches
 * the brand's existing logo aesthetic.
 */
export default function LogoMark({
  variant = "white",
  layout = "block",
  glitchOnIdle = false,
  alt = "Kiikio",
  className = "",
  width,
  height,
}: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const src = variant === "white" ? "/kiikio-mark-white.png" : "/kiikio-mark-black.png";

  useEffect(() => {
    if (!glitchOnIdle) return;
    const el = wrapRef.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      const delay = 4000 + Math.random() * 6000;
      t = setTimeout(() => {
        el.classList.remove("logo-pulse");
        void el.offsetWidth;
        el.classList.add("logo-pulse");
        loop();
      }, delay);
    };
    loop();
    return () => clearTimeout(t);
  }, [glitchOnIdle]);

  const layoutCls =
    layout === "block"
      ? "block w-full"
      : layout === "inline"
      ? "inline-block align-middle"
      : "block";

  const sizeStyle =
    width && height
      ? { width: `${width}px`, height: `${height}px` }
      : undefined;

  return (
    <span
      ref={wrapRef}
      className={["logo-mark relative select-none", layoutCls, className].join(" ")}
      style={sizeStyle}
      aria-label={alt}
      role="img"
    >
      <img src={src} alt={alt} className="logo-base w-full h-full object-contain" draggable={false} />
      <span className="logo-layer logo-layer-r" aria-hidden style={{ backgroundImage: `url(${src})` }} />
      <span className="logo-layer logo-layer-b" aria-hidden style={{ backgroundImage: `url(${src})` }} />
      <span className="logo-scan" aria-hidden />
    </span>
  );
}
