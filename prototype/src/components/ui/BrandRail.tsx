"use client";

import Link from "next/link";
import CountrySelector from "@/components/ui/CountrySelector";

/**
 * Narrow vertical brand rail (56px) pinned to the left edge of the
 * viewport.
 *
 *   • top:    ® / 02            (dispatch counter)
 *   • middle: rotated KIIKIO    (clean 90° rotation, fixed-size box)
 *   • bottom: country selector  (US / USD ▾, click to change market)
 *
 * Mobile: the rail is hidden — the FullscreenMenu drawer carries
 * everything the rail surfaces.
 */
export default function BrandRail() {
  return (
    <aside
      className="brand-rail font-tag text-tag-xs text-paper/65 hidden md:flex"
      aria-label="Studio rail"
    >
      {/* TOP — dispatch counter */}
      <div
        className="flex flex-col items-center gap-1 leading-none text-paper/55"
        aria-hidden
      >
        <span>®</span>
        <span>02</span>
      </div>

      {/* MIDDLE — rotated wordmark, fixed 28×140 box so it never clips */}
      <Link
        href="/"
        aria-label="Kiikio — home"
        data-cursor="Home"
        className="relative block"
        style={{ width: 28, height: 140 }}
      >
        <span
          className="absolute top-1/2 left-1/2 select-none"
          style={{
            transform: "translate(-50%, -50%) rotate(-90deg)",
            transformOrigin: "center",
            width: 140,
            height: 28,
          }}
        >
          <img
            src="/kiikio-mark-white.png"
            alt="Kiikio"
            draggable={false}
            className="w-full h-full object-contain opacity-85"
          />
        </span>
      </Link>

      {/* BOTTOM — country / currency picker */}
      <CountrySelector />
    </aside>
  );
}
