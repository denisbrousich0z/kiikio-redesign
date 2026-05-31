"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easing } from "@/lib/motion";

/**
 * Country / currency picker pinned at the bottom of the BrandRail.
 * Default is US / USD; clicking the trigger opens a popover with the
 * full list of supported markets. Selection persists in localStorage
 * (`kiikio:market`) so other components (price formatting, shipping
 * copy, etc.) can react to it.
 *
 * The list is curated — covers the studio's primary dispatch regions —
 * and uses ISO-3166 country codes alongside ISO-4217 currency codes.
 */
type Market = { code: string; country: string; currency: string };

const MARKETS: Market[] = [
  { code: "US", country: "United States", currency: "USD" },
  { code: "GB", country: "United Kingdom", currency: "GBP" },
  { code: "DE", country: "Germany", currency: "EUR" },
  { code: "FR", country: "France", currency: "EUR" },
  { code: "IT", country: "Italy", currency: "EUR" },
  { code: "ES", country: "Spain", currency: "EUR" },
  { code: "NL", country: "Netherlands", currency: "EUR" },
  { code: "JP", country: "Japan", currency: "JPY" },
  { code: "CA", country: "Canada", currency: "CAD" },
  { code: "AU", country: "Australia", currency: "AUD" },
  { code: "RU", country: "Russia", currency: "RUB" },
  { code: "UA", country: "Ukraine", currency: "UAH" },
];

const STORAGE_KEY = "kiikio:market";

export default function CountrySelector() {
  const [open, setOpen] = useState(false);
  const [market, setMarket] = useState<Market>(MARKETS[0]);
  const ref = useRef<HTMLDivElement>(null);

  // Hydrate selection from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    const found = MARKETS.find((m) => m.code === stored);
    if (found) setMarket(found);
  }, []);

  // Close on outside-click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (m: Market) => {
    setMarket(m);
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, m.code);
      // Dispatch a custom event so other components (price displays, etc.)
      // can react without prop-drilling.
      window.dispatchEvent(
        new CustomEvent("kiikio:market-change", { detail: m })
      );
    } catch {
      /* swallow */
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-cursor="Region"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="font-tag text-[9px] tracking-[0.18em] uppercase text-paper/65 hover:text-paper flex flex-col items-center gap-1 leading-none"
      >
        <span>{market.code}</span>
        <span className="text-paper/45">{market.currency}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: easing.storm }}
            role="listbox"
            aria-label="Choose region"
            className="absolute bottom-full left-full mb-3 -ml-2 w-[220px] max-h-[260px] overflow-auto bg-storm border border-paper/15 backdrop-blur-md shadow-xl shadow-ink/40 hide-scrollbar"
          >
            <div className="px-3 py-2 font-tag text-tag-xs text-paper/45 uppercase tracking-[0.18em] border-b border-paper/10">
              Ship to
            </div>
            <ul>
              {MARKETS.map((m) => {
                const active = m.code === market.code;
                return (
                  <li key={m.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => choose(m)}
                      className={[
                        "w-full flex items-center justify-between px-3 py-2 font-tag text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 text-left",
                        active
                          ? "bg-paper/5 text-paper"
                          : "text-paper/70 hover:bg-paper/5 hover:text-paper",
                      ].join(" ")}
                    >
                      <span>
                        <span className="text-paper/45 mr-2">{m.code}</span>
                        {m.country}
                      </span>
                      <span className="text-paper/55">{m.currency}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
