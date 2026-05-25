"use client";

import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";

/**
 * Vertical brand rail — fixed to the left edge.
 *
 * - Top: ® index card (live dispatch number)
 * - Middle: KIIKIO® wordmark rotated -90deg so it reads bottom-to-top.
 *   Hover triggers RGB-slice glitch. Idle pulse fires every 4–10s.
 * - Bottom: chapter marker
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
            glitchOnIdle
            alt="Kiikio"
            width={170}
            height={36}
            className="opacity-90"
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
