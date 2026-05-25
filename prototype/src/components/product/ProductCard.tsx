"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product, ProductBadge } from "@/lib/products";

type Props = {
  product: Product;
  index?: number;
  priority?: boolean;
};

export default function ProductCard({ product, index = 0, priority }: Props) {
  const second = product.gallery[1] ?? product.gallery[0] ?? product.hero;
  // Only one studio-tier signal on the corner — keep the photo quiet.
  const headlineBadge = pickHeadlineBadge(product.badges);
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
          {/* subtle bottom shade so meta + chapter mark stay legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />

          {/* Corner meta — top row: edition badge / lot, plus colorways */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            {headlineBadge ? (
              <span className={`kk-badge kk-badge--${headlineBadge.tone}`}>{headlineBadge.label}</span>
            ) : (
              <span className="font-tag text-tag-xs text-paper">{product.lot}</span>
            )}
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

          {/* Bottom row: lot (if a badge stole the top spot) and quick action */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="font-tag text-tag-xs text-paper/85 leading-snug">
              <div>CH.{product.chapter}</div>
              {headlineBadge && <div className="text-paper/65">{product.lot}</div>}
            </div>
            <span className="font-tag text-tag-xs text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] inline-flex items-center gap-2">
              Quick view <span aria-hidden>→</span>
            </span>
          </div>
        </div>

        {/* Type block sits BELOW the photo on clean ground */}
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[20px] md:text-[22px] tracking-[-0.01em] leading-[1.05] text-paper">
            {product.name}
          </h3>
          <PricePair price={product.price} member={product.memberPrice} />
        </div>
        <div className="mt-1 flex items-center justify-between gap-3 font-tag text-tag-xs text-paper/55">
          <span className="capitalize">{product.category}</span>
          <span className="text-paper/45">{product.lot}</span>
        </div>
      </Link>
    </motion.div>
  );
}

function PricePair({ price, member }: { price: number; member?: number }) {
  return (
    <div className="text-right font-tag text-tag-sm text-paper whitespace-nowrap leading-tight">
      <div>${price}</div>
      {member !== undefined && member < price && (
        <div className="text-[10px] text-dune/90 leading-snug">Member ${member}</div>
      )}
    </div>
  );
}

function pickHeadlineBadge(badges?: ProductBadge[]): ProductBadge | undefined {
  if (!badges?.length) return undefined;
  const priority: ProductBadge["tone"][] = ["new", "final", "edition", "studio", "member"];
  for (const tone of priority) {
    const hit = badges.find((b) => b.tone === tone);
    if (hit) return hit;
  }
  return badges[0];
}
