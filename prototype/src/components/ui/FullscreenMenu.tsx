"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

type Item = { label: string; href: string; meta?: string };

const items: Item[] = [
  { label: "Chapter II — Lightning", href: "/collections/chapter-ii-lightning", meta: "Current dispatch" },
  { label: "Catalog", href: "/collections/catalog", meta: "All pieces" },
  { label: "Chapter I — First Storm", href: "/collections/chapter-i-first-storm", meta: "Archive" },
  { label: "Chapter III — Aftermath", href: "/collections/chapter-iii-aftermath", meta: "Incoming" },
  { label: "Story", href: "/#story", meta: "Origin" },
];

const storm = [0.25, 1, 0.5, 1] as const;

/**
 * Side drawer menu.
 *
 * Slides in from the right as a fixed-width panel (full-width on mobile),
 * paired with a tinted backdrop. Replaces the previous full-screen
 * clip-path reveal which felt clunky and oversized. Typography is sized
 * for editorial calm — no display-xl walls of text.
 */
export default function FullscreenMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: storm }}
            onClick={onClose}
            className="fixed inset-0 z-[78] bg-ink/70 backdrop-blur-[2px]"
            aria-hidden
          />

          {/* Drawer */}
          <motion.aside
            key="menu-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: storm }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full sm:w-[440px] md:w-[480px] bg-ink text-paper border-l border-paper/12 flex flex-col"
            aria-label="Menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 md:px-8 h-16 md:h-20 border-b border-paper/10">
              <div className="font-tag text-tag-xs text-paper/55">— Index</div>
              <button
                onClick={onClose}
                data-cursor="Close"
                className="font-tag text-tag-xs text-paper hover:text-paper/80 inline-flex items-center gap-2"
                aria-label="Close menu"
              >
                <span>Close</span>
                <span aria-hidden className="relative inline-block w-3 h-3">
                  <span className="absolute inset-0 m-auto h-px w-full bg-current rotate-45" />
                  <span className="absolute inset-0 m-auto h-px w-full bg-current -rotate-45" />
                </span>
              </button>
            </div>

            {/* Nav list */}
            <nav className="flex-1 overflow-y-auto px-7 md:px-8 py-8 md:py-10">
              <ul className="flex flex-col">
                {items.map((it, i) => (
                  <motion.li
                    key={it.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: storm, delay: 0.12 + i * 0.06 }}
                  >
                    <Link
                      href={it.href}
                      onClick={onClose}
                      data-cursor="Enter"
                      className="group flex items-baseline justify-between gap-4 border-b border-paper/12 py-5 md:py-6 hover:border-paper transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-tag text-tag-xs text-paper/45 w-6">
                          0{i + 1}
                        </span>
                        <span className="font-display text-[24px] md:text-[30px] leading-[1.06] tracking-[-0.025em] group-hover:text-dune transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                          {it.label}
                        </span>
                      </span>
                      <span className="font-tag text-tag-xs text-paper/45 whitespace-nowrap">
                        {it.meta}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer block */}
            <div className="border-t border-paper/10 px-7 md:px-8 py-6 grid grid-cols-2 gap-4 font-tag text-tag-xs text-paper/55">
              <div>
                <div className="text-paper/40">— Contact</div>
                <div className="text-paper/85 mt-1">we@kiikio.com</div>
              </div>
              <div>
                <div className="text-paper/40">— Social</div>
                <div className="text-paper/85 mt-1">Instagram · TikTok</div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
