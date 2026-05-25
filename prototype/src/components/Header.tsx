"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { easing } from "@/lib/motion";
import { useCart } from "@/components/CartProvider";
import FullscreenMenu from "@/components/ui/FullscreenMenu";

/**
 * Header is now intentionally minimal — the brand wordmark lives in
 * the vertical BrandRail. The header only carries a live clock,
 * dispatch counter, MENU button (which opens the full-screen overlay),
 * and BAG button.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState<string>("");
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getUTCHours().toString().padStart(2, "0");
      const mm = d.getUTCMinutes().toString().padStart(2, "0");
      const ss = d.getUTCSeconds().toString().padStart(2, "0");
      setTime(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: easing.storm, delay: 0.4 }}
        className={[
          "fixed top-0 inset-x-0 z-50 transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pl-rail",
          scrolled ? "bg-ink/65 backdrop-blur-md border-b border-paper/8" : "bg-transparent",
        ].join(" ")}
      >
        <div className="px-gutter h-16 md:h-20 flex items-center justify-between text-paper">
          {/* LEFT: live system info */}
          <div className="hidden md:flex items-center gap-6 font-tag text-tag-xs text-paper/55">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-bolt rounded-full animate-pulse" />
              LIVE / {time || "—"}
            </span>
            <span className="hidden lg:inline">SS26 · CHAPTER II · LIGHTNING</span>
          </div>

          {/* RIGHT: actions */}
          <div className="flex items-center gap-3 md:gap-5 ml-auto">
            <button
              type="button"
              aria-label="Search"
              data-cursor="Search"
              className="hidden md:inline-flex font-tag text-tag-xs text-paper/75 hover:text-paper"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              data-cursor="Open bag"
              className="font-tag text-tag-xs text-paper/85 hover:text-paper inline-flex items-center gap-2"
            >
              Bag
              <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] rounded-full bg-paper text-ink text-[10px] px-1 font-tag">
                {count}
              </span>
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              data-cursor={menuOpen ? "Close" : "Open"}
              className="font-tag text-tag-xs uppercase tracking-[0.18em] inline-flex items-center gap-2 text-paper hover:text-paper/85"
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              <span className="flex flex-col gap-1.5">
                <span className="block w-5 h-px bg-current" />
                <span className="block w-5 h-px bg-current" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
