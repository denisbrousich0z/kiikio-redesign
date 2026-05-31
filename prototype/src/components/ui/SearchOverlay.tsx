"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/products";
import { chapters } from "@/lib/chapters";
import Price from "@/components/ui/Price";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * Editorial search overlay. Opens when the SEARCH button in Header is
 * clicked. Live-filters products by name, category, chapter, lot or
 * description. Esc and backdrop click close it. Locks body scroll.
 */
export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Autofocus the input when opening
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    } else {
      setQuery("");
    }
  }, [open]);

  const trimmed = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!trimmed) return products.slice(0, 6);
    return products
      .filter((p) => {
        const hay = [
          p.name,
          p.legalName,
          p.category,
          `chapter ${p.chapter}`,
          p.lot,
          p.description,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(trimmed);
      })
      .slice(0, 12);
  }, [trimmed]);

  const chapterMatches = useMemo(() => {
    if (!trimmed) return chapters.slice(0, 2);
    return chapters.filter((c) =>
      `chapter ${c.number} ${c.title} ${c.subtitle}`
        .toLowerCase()
        .includes(trimmed),
    );
  }, [trimmed]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search the studio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[120]"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="absolute inset-0 bg-ink/85 backdrop-blur-md"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
            className="relative h-full overflow-y-auto"
          >
            <div className="px-gutter pt-28 md:pt-32 pb-20 max-w-[1240px] mx-auto">
              {/* Eyebrow + close */}
              <div className="flex items-center justify-between mb-7">
                <div className="font-tag text-tag-xs text-paper/55">
                  — Search the studio
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  data-cursor="Close"
                  className="font-tag text-tag-xs text-paper/75 hover:text-paper inline-flex items-center gap-2"
                >
                  Close <span aria-hidden>×</span>
                </button>
              </div>

              {/* Input */}
              <div className="relative border-b border-paper/25 pb-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pieces, chapters, lot numbers…"
                  className="w-full bg-transparent text-paper font-display text-[clamp(24px,3vw,42px)] tracking-[-0.025em] placeholder:text-paper/30 outline-none"
                />
                <span className="absolute right-0 top-1/2 -translate-y-1/2 font-tag text-tag-xs text-paper/45">
                  {trimmed ? `${results.length} matches` : "Esc to close"}
                </span>
              </div>

              {/* Chapter results (collapsed when query is empty) */}
              {chapterMatches.length > 0 && (
                <div className="mt-10">
                  <div className="font-tag text-tag-xs text-paper/55 mb-4">
                    Chapters
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {chapterMatches.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/collections/${c.slug}`}
                        onClick={onClose}
                        data-cursor={c.title}
                        className="group flex items-baseline justify-between gap-4 border-b border-paper/10 py-3 hover:border-paper/40 transition-colors"
                      >
                        <span className="font-display text-[22px] md:text-[26px] tracking-[-0.02em] text-paper group-hover:text-dune transition-colors">
                          Chapter {c.number} — {c.title}
                        </span>
                        <span className="font-tag text-tag-xs text-paper/55">
                          {c.subtitle}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Pieces */}
              <div className="mt-12">
                <div className="font-tag text-tag-xs text-paper/55 mb-4">
                  {trimmed ? "Pieces" : "Featured pieces"}
                </div>
                {results.length === 0 ? (
                  <div className="font-tag text-tag-xs text-paper/55 py-12 text-center border border-dashed border-paper/15">
                    Nothing matched. Try a chapter number, a lot
                    (e.g. <em className="not-italic text-paper/85">Lot 014</em>),
                    or a category like <em className="not-italic text-paper/85">denim</em>.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                    {results.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        onClick={onClose}
                        data-cursor={p.name}
                        className="group block"
                      >
                        <div className="relative aspect-[3/4] overflow-hidden bg-storm card-storm mb-3">
                          <img
                            src={p.hero}
                            alt={p.name}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                          />
                          <div className="absolute top-2 left-2 font-tag text-[9.5px] tracking-[0.22em] uppercase text-paper/85">
                            CH.{p.chapter}
                          </div>
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-display text-[16px] md:text-[17px] tracking-[-0.01em] text-paper group-hover:text-dune transition-colors line-clamp-1">
                            {p.name}
                          </h4>
                          <Price
                            usd={p.price}
                            className="font-tag text-tag-xs text-paper/75 whitespace-nowrap"
                          />
                        </div>
                        <div className="mt-0.5 font-tag text-[10px] uppercase tracking-[0.18em] text-paper/45">
                          {p.category} · {p.lot}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
