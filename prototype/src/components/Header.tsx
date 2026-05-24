"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easing } from "@/lib/motion";

const nav = [
  { label: "Chapter II", href: "/collections/chapter-ii-lightning" },
  { label: "Catalog", href: "/collections/catalog" },
  { label: "Story", href: "/#story" },
  { label: "Archive", href: "/collections/archive" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: easing.storm, delay: 0.3 }}
        className={[
          "fixed top-0 inset-x-0 z-50",
          "transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          scrolled ? "bg-paper/90 backdrop-blur-md border-b border-ink/8" : "bg-transparent",
        ].join(" ")}
      >
        <div className="px-gutter h-16 md:h-20 flex items-center justify-between text-ink">
          {/* Wordmark */}
          <Link href="/" aria-label="Kiikio — home" className="flex items-center gap-3">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
              <path d="M11 1 L4 12 L10 12 L9 21 L18 9 L12 9 L13 1 Z" fill="currentColor" />
            </svg>
            <span className="font-display text-[22px] tracking-tight leading-none">Kiikio</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="font-tag text-[11px] uppercase tracking-[0.18em] hover:opacity-60 transition-opacity"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              className="font-tag text-[11px] uppercase tracking-[0.18em] hidden md:inline-flex hover:opacity-60"
            >
              Search
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="font-tag text-[11px] uppercase tracking-[0.18em] inline-flex items-center gap-2 hover:opacity-60"
            >
              Bag
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-ink text-paper text-[10px] px-1">
                {count}
              </span>
            </button>
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden font-tag text-[11px] uppercase tracking-[0.18em]"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: easing.storm }}
            className="fixed inset-0 z-40 bg-ink text-paper pt-24 px-gutter md:hidden"
          >
            <nav className="flex flex-col gap-7">
              {nav.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: easing.storm, delay: 0.06 * i }}
                >
                  <Link
                    onClick={() => setMenuOpen(false)}
                    href={n.href}
                    className="font-display text-[44px] tracking-tight leading-none"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
