"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type Item = { label: string; href: string; meta?: string };

const items: Item[] = [
  { label: "Chapter II — Lightning", href: "/collections/chapter-ii-lightning", meta: "Current dispatch" },
  { label: "Catalog", href: "/collections/catalog", meta: "All pieces" },
  { label: "Chapter I — First Storm", href: "/collections/chapter-i-first-storm", meta: "Archive" },
  { label: "Chapter III — Aftermath", href: "/collections/chapter-iii-aftermath", meta: "Incoming" },
  { label: "Story", href: "/#story", meta: "Origin" },
];

const storm = [0.25, 1, 0.5, 1] as const;

export default function FullscreenMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.95, ease: storm }}
          className="fixed inset-0 z-[80] bg-ink text-paper overflow-hidden"
        >
          <div className="absolute inset-0 px-gutter pt-24 md:pt-32 pb-12 flex flex-col">
            {/* top row */}
            <div className="flex items-start justify-between">
              <div className="font-tag text-tag-xs text-paper/55">
                — Index
                <br />
                Choose a chapter
              </div>
              <button
                onClick={onClose}
                data-cursor="Close"
                className="font-tag text-tag-xs text-paper/80 hover:text-paper"
              >
                Close ✕
              </button>
            </div>

            {/* nav */}
            <nav className="mt-12 md:mt-20 flex-1 flex flex-col gap-2 md:gap-3">
              {items.map((it, i) => (
                <motion.div
                  key={it.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: storm, delay: 0.15 + i * 0.07 }}
                  className="group"
                >
                  <Link
                    href={it.href}
                    onClick={onClose}
                    data-cursor="Enter"
                    className="grid grid-cols-12 items-baseline gap-6 border-b border-paper/15 py-4 md:py-6 hover:border-paper transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  >
                    <span className="col-span-1 font-tag text-tag-xs text-paper/50">
                      0{i + 1}
                    </span>
                    <span className="col-span-8 md:col-span-7 font-display text-[44px] md:text-[88px] leading-[0.92] tracking-[-0.035em]">
                      {it.label}
                    </span>
                    <span className="col-span-3 md:col-span-4 font-tag text-tag-xs text-paper/50 text-right md:text-left">
                      {it.meta}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* bottom row */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 font-tag text-tag-xs text-paper/55">
              <div>
                — Dispatch
                <br />
                <span className="text-paper/80">SS26 / Lightning</span>
              </div>
              <div>
                — Shipping
                <br />
                <span className="text-paper/80">Worldwide · 30-day returns</span>
              </div>
              <div>
                — Contact
                <br />
                <span className="text-paper/80">we@kiikio.com</span>
              </div>
              <div>
                — Social
                <br />
                <span className="text-paper/80">Instagram · TikTok</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
