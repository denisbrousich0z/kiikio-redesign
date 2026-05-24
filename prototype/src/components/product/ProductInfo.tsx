"use client";

import { useState } from "react";
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
  const { add } = useCart();

  function onAdd() {
    if (!size) {
      setSize(product.sizes[1] ?? product.sizes[0]);
    }
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      size: size ?? product.sizes[1] ?? product.sizes[0],
      color,
      image: product.hero,
      qty: 1,
    });
  }

  return (
    <div className="flex flex-col gap-7 md:gap-9 md:sticky md:top-28 md:self-start">
      <div>
        <div className="font-tag text-tag-xs text-ink/55 mb-3">
          Chapter {product.chapter} · {product.lot} · Edition of 200
        </div>
        <h1 className="font-display text-display-md tracking-[-0.03em] leading-[1.02] max-w-[18ch]">
          {product.name}
        </h1>
        <div className="mt-4 font-tag text-tag-sm">${product.price}</div>
      </div>

      <p className="font-body text-ink/75 text-[15.5px] leading-relaxed max-w-[48ch]">
        {product.description}
      </p>

      {/* Colorways */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-tag text-tag-xs text-ink/55">Colorway</span>
          <span className="font-tag text-tag-xs">{color}</span>
        </div>
        <div className="flex items-center gap-3">
          {product.colorways.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.name)}
              aria-label={c.name}
              className={[
                "relative w-9 h-9 rounded-full transition-transform",
                color === c.name ? "scale-100 ring-1 ring-ink ring-offset-2 ring-offset-paper" : "scale-90 opacity-70 hover:opacity-100",
              ].join(" ")}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-tag text-tag-xs text-ink/55">Size</span>
          <button className="font-tag text-tag-xs underline-offset-4 hover:underline text-ink/55">
            Size guide
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={[
                "h-12 font-tag text-tag-sm border transition-colors",
                size === s
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 bg-transparent text-ink hover:border-ink/55",
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
          <button onClick={onAdd} className="btn-storm w-full justify-between">
            Add to bag — ${product.price}
            <span aria-hidden>→</span>
          </button>
        </Magnetic>
        <div className="font-tag text-tag-xs text-ink/55 text-center">
          Worldwide shipping — free over $129 · 30-day returns
        </div>
      </div>

      {/* Accordion */}
      <div className="divide-y divide-ink/10 border-y border-ink/10">
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
                className="w-full py-5 flex items-center justify-between font-tag text-tag-sm text-left"
              >
                <span>{row.label}</span>
                <span aria-hidden className="text-ink/55">{open ? "—" : "+"}</span>
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
                    <div className="pb-6 font-body text-ink/75 text-[14.5px] leading-relaxed space-y-3">
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
  );
}
