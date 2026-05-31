"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Desktop-only stacked navigation pinned to the top-left of the viewport
 * (just to the right of the 56px BrandRail). Replaces the old MENU
 * button — primary nav is now permanently visible on desktop instead of
 * hidden behind a hamburger.
 *
 * Mobile: hidden; users tap the hamburger in Header to open FullscreenMenu.
 */
const links: Array<{ label: string; href: string }> = [
  { label: "Catalog", href: "/collections/catalog" },
  { label: "Chapter II", href: "/collections/chapter-ii-lightning" },
  { label: "Chapter I", href: "/collections/chapter-i-first-storm" },
  { label: "Story", href: "/#story" },
  { label: "Contact", href: "/#contact" },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="hidden md:flex fixed top-24 left-[80px] z-50 flex-col gap-3.5 pointer-events-auto"
    >
      {links.map((l) => {
        const active =
          l.href !== "/" &&
          !l.href.startsWith("/#") &&
          pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            data-cursor={l.label}
            className={[
              "font-tag text-[13px] leading-none uppercase tracking-[0.18em] transition-colors duration-300",
              active
                ? "text-paper"
                : "text-paper/85 hover:text-paper",
            ].join(" ")}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
