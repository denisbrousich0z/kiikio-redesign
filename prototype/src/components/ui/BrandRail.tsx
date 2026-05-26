"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Left-aligned editorial navigation rail.
 *
 * Layout adapted from the Hidden Room reference: a small stacked
 * wordmark at the top-left and a vertical list of section links below
 * it. No rotated mark, no glitch effects. Permanently visible on
 * desktop, hidden on mobile (the FullscreenMenu drawer covers that
 * case via the header's MENU button).
 */

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Catalog", href: "/collections/catalog" },
  { label: "Chapter II", href: "/collections/chapter-ii-lightning" },
  { label: "Chapter I", href: "/collections/chapter-i-first-storm" },
  { label: "Story", href: "/#story" },
  { label: "Contact", href: "#contact" },
];

export default function BrandRail() {
  const pathname = usePathname() ?? "/";

  return (
    <aside className="brand-rail hidden md:flex" aria-label="Primary">
      {/* Stacked wordmark — KIIKIO over ® */}
      <Link
        href="/"
        aria-label="Kiikio — home"
        data-cursor="Home"
        className="block"
      >
        <div className="font-display leading-[0.84] tracking-[-0.04em] text-paper text-[34px]">
          KIIKIO
        </div>
        <div className="mt-1 font-tag text-[10px] tracking-[0.24em] text-paper/55">
          ® After the storm
        </div>
      </Link>

      {/* Nav list */}
      <nav className="mt-10">
        <ul className="flex flex-col gap-2.5">
          {NAV.map((item) => {
            const active =
              item.href !== "#contact" &&
              (pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href)));
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  data-cursor={item.label}
                  className={[
                    "inline-flex items-center gap-2 font-tag text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                    active
                      ? "text-paper"
                      : "text-paper/55 hover:text-paper",
                  ].join(" ")}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="inline-block w-2.5 h-px bg-paper"
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom chapter marker pinned to the rail base */}
      <div className="mt-auto font-tag text-[10px] tracking-[0.24em] text-paper/40 leading-tight">
        Dispatch 02 · Ch. II
      </div>
    </aside>
  );
}
