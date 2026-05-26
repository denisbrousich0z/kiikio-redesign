"use client";

import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";

/**
 * Narrow vertical brand rail (56px) pinned to the left edge of the
 * viewport. Same composition as the working polish-03 version that
 * Jack liked:
 *   • top: ® / 02
 *   • middle: rotated KIIKIO wordmark
 *   • bottom: CH II
 *
 * The site's primary navigation lives in the FullscreenMenu drawer
 * which opens via the MENU button in the header; the rail itself is
 * a decorative editorial marker, not a nav list.
 */
export default function BrandRail() {
  return (
    <aside
      className="brand-rail font-tag text-tag-xs text-paper/65 hidden md:flex"
      aria-hidden
    >
      {/* Top corner */}
      <div className="flex flex-col items-center gap-1 leading-none text-paper/55">
        <span>®</span>
        <span>02</span>
      </div>

      {/* Middle — rotated wordmark */}
      <Link
        href="/"
        aria-label="Kiikio — home"
        data-cursor="Home"
        className="block pointer-events-auto"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        <LogoMark
          variant="white"
          layout="vertical"
          alt="Kiikio"
          className="opacity-85"
          width={140}
          height={28}
        />
      </Link>

      {/* Bottom corner */}
      <div className="flex flex-col items-center gap-1 leading-none text-paper/55">
        <span>CH</span>
        <span>II</span>
      </div>
    </aside>
  );
}
