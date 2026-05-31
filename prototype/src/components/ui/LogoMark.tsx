"use client";

type Props = {
  variant?: "white" | "black";
  /** "block" = full responsive image, "inline" = small fixed height inline, "vertical" = rotated for rails */
  layout?: "block" | "inline" | "vertical";
  /** Legacy prop, retained for API compatibility. No longer triggers RGB glitch. */
  glitchOnIdle?: boolean;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
};

/**
 * Kiikio wordmark — clean, single-layer PNG.
 *
 * The previous RGB-split / CRT-glitch treatment has been removed at the
 * client's request. The mark now renders as a flat, calm image — its
 * weight is in the typography, not in the effect.
 */
export default function LogoMark({
  variant = "white",
  layout = "block",
  alt = "Kiikio",
  className = "",
  width,
  height,
}: Props) {
  const src = variant === "white" ? "/kiikio-mark-white.png" : "/kiikio-mark-black.png";

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
      className={["logo-mark logo-mark--flat relative select-none", layoutCls, className].join(" ")}
      style={sizeStyle}
      aria-label={alt}
      role="img"
    >
      <img
        src={src}
        alt={alt}
        className="logo-base w-full h-full object-contain"
        draggable={false}
      />
    </span>
  );
}
