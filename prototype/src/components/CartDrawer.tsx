"use client";

import { AnimatePresence, motion } from "framer-motion";
import { easing } from "@/lib/motion";
import { useCart } from "@/components/CartProvider";

export default function CartDrawer() {
  const { open, setOpen, lines, remove, subtotal } = useCart();
  const FREE_SHIP = 129;
  const progress = Math.min(100, (subtotal / FREE_SHIP) * 100);
  const remaining = Math.max(0, FREE_SHIP - subtotal);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easing.storm }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-ink/55 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: easing.storm }}
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-[440px] bg-paper text-ink flex flex-col"
            aria-label="Bag"
          >
            <header className="px-7 pt-7 pb-5 flex items-center justify-between">
              <div className="font-tag text-tag-xs text-ink/60">Your bag — {lines.length} {lines.length === 1 ? "piece" : "pieces"}</div>
              <button
                onClick={() => setOpen(false)}
                className="font-tag text-tag-xs hover:opacity-60"
                aria-label="Close bag"
              >
                Close
              </button>
            </header>

            {/* Free shipping progress */}
            <div className="px-7 pb-5">
              <div className="font-tag text-tag-xs text-ink/55 mb-2 flex justify-between">
                <span>{remaining > 0 ? `${remaining.toFixed(0)} from free shipping` : "Free shipping unlocked"}</span>
                <span>{subtotal > 0 ? `$${subtotal.toFixed(0)}` : ""}</span>
              </div>
              <div className="h-px bg-ink/15 relative">
                <motion.div
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.7, ease: easing.storm }}
                  className="absolute inset-y-0 left-0 bg-ink"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-7 divide-y divide-ink/10">
              {lines.length === 0 && (
                <div className="py-20 text-center">
                  <div className="font-display text-display-sm mb-3">Your bag is quiet.</div>
                  <p className="font-body text-ink/60 text-sm max-w-[28ch] mx-auto">
                    Chapter II is dispatching. Add a piece to begin.
                  </p>
                </div>
              )}
              {lines.map((l) => (
                <div key={`${l.slug}-${l.size}-${l.color}`} className="py-6 flex gap-4">
                  <div className="w-20 h-24 overflow-hidden bg-storm/5 shrink-0">
                    <img src={l.image} alt={l.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="font-display text-[19px] tracking-tight">{l.name}</div>
                    <div className="font-tag text-tag-xs text-ink/55 mt-1">{l.color} · {l.size} · ×{l.qty}</div>
                    <div className="flex-1" />
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => remove(l.slug, l.size, l.color)}
                        className="font-tag text-tag-xs underline-offset-4 hover:underline text-ink/50"
                      >
                        Remove
                      </button>
                      <div className="font-tag text-tag-sm">${(l.price * l.qty).toFixed(0)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="border-t border-ink/10 px-7 py-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <div className="font-tag text-tag-xs text-ink/60">Subtotal</div>
                <div className="font-display text-[28px] tracking-tight">${subtotal.toFixed(0)}</div>
              </div>
              <button
                disabled={lines.length === 0}
                className="btn-storm w-full justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Checkout →
              </button>
              <div className="font-tag text-tag-xs text-ink/50 text-center">
                Shipping calculated at checkout. 30-day returns.
              </div>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
