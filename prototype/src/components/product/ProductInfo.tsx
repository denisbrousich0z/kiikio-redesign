"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import Magnetic from "@/components/ui/Magnetic";
import { easing } from "@/lib/motion";

type Props = { product: Product };

export default function ProductInfo({ product }: Props) {
  const [color, setColor] = useState(product.colorways[0].name);
  const [size, setSize] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");
  const [stickyVisible, setStickyVisible] = useState(false);
  const { add, setOpen } = useCart();

  function onAdd() {
    const finalSize = size ?? product.sizes[1] ?? product.sizes[0];
    if (!size) setSize(finalSize);
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      size: finalSize,
      color,
      image: product.hero,
      qty: 1,
    });
    setOpen(true);
  }

  // Sticky bar appears once the user has scrolled past the inline CTA so the
  // add-to-bag is always reachable without breaking the editorial layout.
  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hasMember = product.memberPrice !== undefined && product.memberPrice < product.price;

  return (
    <>
      <div className="flex flex-col gap-7 md:gap-9 md:sticky md:top-28 md:self-start text-paper">
        <div>
          <div className="font-tag text-tag-xs text-paper/55 mb-3">
            Chapter {product.chapter} · {product.lot}
          </div>
          <h1 className="font-display text-display-md tracking-[-0.025em] leading-[1.02] max-w-[18ch]">
            {product.name}
          </h1>

          {/* Badges */}
          {product.badges && product.badges.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {product.badges.map((b) => (
                <span key={b.label} className={`kk-badge kk-badge--${b.tone}`}>
                  {b.label}
                </span>
              ))}
            </div>
          )}

          {/* Price block */}
          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-display text-[28px] md:text-[32px] tracking-[-0.02em]">
              ${product.price}
            </span>
            {hasMember && (
              <span className="font-tag text-tag-sm text-dune">
                Member ${product.memberPrice}
              </span>
            )}
          </div>
        </div>

        <p className="font-body text-paper/75 text-[15.5px] leading-relaxed max-w-[48ch]">
          {product.description}
        </p>

        {/* Colorways */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-tag text-tag-xs text-paper/55">Colorway</span>
            <span className="font-tag text-tag-xs text-paper">{color}</span>
          </div>
          <div className="flex items-center gap-3">
            {product.colorways.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                data-cursor={c.name}
                className={[
                  "relative w-9 h-9 rounded-full transition-transform",
                  color === c.name
                    ? "scale-100 ring-1 ring-paper ring-offset-2 ring-offset-ink"
                    : "scale-90 opacity-70 hover:opacity-100",
                ].join(" ")}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-tag text-tag-xs text-paper/55">Size</span>
            <button className="font-tag text-tag-xs underline-offset-4 hover:underline text-paper/55">
              Size guide
            </button>
          </div>
          <div className={`grid gap-2 ${product.sizes.length <= 2 ? "grid-cols-2" : "grid-cols-5"}`}>
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                data-cursor={s}
                className={[
                  "h-12 font-tag text-tag-sm border transition-colors",
                  size === s
                    ? "border-paper bg-paper text-ink"
                    : "border-paper/20 bg-transparent text-paper hover:border-paper/60",
                ].join(" ")}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Add to bag */}
        <div className="flex flex-col gap-3 pt-2">
          <Magnetic strength={0.18}>
            <button
              onClick={onAdd}
              data-cursor="Add to bag"
              className="btn-storm btn-storm--lg btn-storm--block justify-between"
            >
              Add to bag — ${product.price}
              <span aria-hidden>→</span>
            </button>
          </Magnetic>
          <div className="font-tag text-tag-xs text-paper/55 text-center">
            Worldwide shipping — free over $129 · 30-day returns
          </div>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-paper/10 border-y border-paper/10">
          {[
            { id: "details", label: "Details & materials", body: product.notes.map((n) => <li key={n}>{n}</li>) },
            {
              id: "shipping",
              label: "Shipping & returns",
              body: (
                <>
                  <p>Worldwide express shipping, free over $129. Most orders ship in 24h from our Sheridan studio.</p>
                  <p>30-day returns on unworn pieces with original tags. Returns are accepted from US, UK, EU, AU, CA.</p>
                </>
              ),
            },
            {
              id: "origin",
              label: "Origin",
              body: (
                <p>
                  Designed and cut in our studio. Patterns weathered by hand and finished in limited Chapter runs.
                  Each piece carries the chapter and lot number it shipped in.
                </p>
              ),
            },
          ].map((row) => {
            const open = openAccordion === row.id;
            return (
              <div key={row.id}>
                <button
                  onClick={() => setOpenAccordion(open ? null : row.id)}
                  data-cursor={open ? "Close" : "Open"}
                  className="w-full py-5 flex items-center justify-between font-tag text-tag-sm text-left text-paper"
                >
                  <span>{row.label}</span>
                  <span aria-hidden className="text-paper/55">{open ? "—" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: easing.storm }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 font-body text-paper/70 text-[14.5px] leading-relaxed space-y-3">
                        {Array.isArray(row.body) ? <ul className="list-disc pl-5 space-y-1">{row.body}</ul> : row.body}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky add-to-bag bar (mobile + desktop) */}
      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.45, ease: easing.storm }}
            className="fixed bottom-0 inset-x-0 z-40 bg-ink/85 backdrop-blur-md border-t border-paper/10"
          >
            <div className="px-gutter py-3 flex items-center gap-4 md:gap-6">
              <img
                src={product.hero}
                alt=""
                className="hidden sm:block w-12 h-14 object-cover bg-storm"
              />
              <div className="flex-1 min-w-0">
                <div className="font-display text-[16px] md:text-[18px] tracking-[-0.01em] text-paper truncate">
                  {product.name}
                </div>
                <div className="font-tag text-tag-xs text-paper/55 truncate">
                  {product.lot} · ${product.price}
                  {hasMember && <span className="text-dune"> · Member ${product.memberPrice}</span>}
                </div>
              </div>
              <button
                onClick={onAdd}
                data-cursor="Add to bag"
                className="btn-storm btn-storm--sm shrink-0"
              >
                Add to bag
                <span aria-hidden>→</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
