"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  index?: number;
  priority?: boolean;
};

export default function ProductCard({ product, index = 0, priority }: Props) {
  const second = product.gallery[1] ?? product.gallery[0] ?? product.hero;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: index * 0.06 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} data-cursor={product.name} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-storm card-storm">
          <img
            src={product.hero}
            alt={product.name}
            loading={priority ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]"
          />
          <img
            src={second}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100"
          />
          {/* deep bottom shade so meta stays legible on any image */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />

          {/* corner meta */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between font-tag text-tag-xs text-paper">
            <span>{product.lot}</span>
            <span className="flex items-center gap-1.5">
              {product.colorways.slice(0, 3).map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-paper/60"
                  style={{ background: c.hex }}
                />
              ))}
            </span>
          </div>

          {/* corner number */}
          <div className="absolute bottom-3 left-3 font-tag text-tag-xs text-paper">
            CH.{product.chapter}
          </div>

          {/* hover quick action */}
          <div className="absolute bottom-3 right-3 font-tag text-tag-xs text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
            View →
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <h3 className="font-display text-[20px] md:text-[22px] tracking-[-0.01em] leading-tight text-paper">
            {product.name}
          </h3>
          <div className="font-tag text-tag-sm text-paper whitespace-nowrap">${product.price}</div>
        </div>
        <div className="font-tag text-tag-xs text-paper/55 mt-1 capitalize">{product.category}</div>
      </Link>
    </motion.div>
  );
}
