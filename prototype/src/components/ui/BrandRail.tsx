"use client";

import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";

/**
 * Vertical brand rail — fixed to the left edge.
 *
 * Quiet vertical strip carrying the index card, a rotated wordmark, and
 * the chapter marker. The wordmark is rendered flat (no RGB glitch).
 */
export default function BrandRail() {
  return (
    <div className="brand-rail font-tag text-tag-xs text-paper/65 hidden md:flex">
      <div className="text-paper/70 leading-tight text-center">
        ®<br />
        02
      </div>

      <Link
        href="/"
        aria-label="Kiikio — home"
        data-cursor="Kiikio"
        className="flex-1 flex items-center justify-center w-full overflow-hidden"
      >
        <span
          className="inline-block"
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        >
          <LogoMark
            variant="white"
            layout="inline"
            alt="Kiikio"
            width={140}
            height={28}
            className="opacity-80"
          />
        </span>
      </Link>

      <div className="text-paper/55 leading-tight text-center">
        CH
        <br />
        II
      </div>
    </div>
  );
}
