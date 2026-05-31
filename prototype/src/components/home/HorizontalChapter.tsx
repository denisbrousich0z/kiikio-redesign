"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/products";
import Price from "@/components/ui/Price";

/**
 * Scroll-pinned horizontal showcase.
 *
 * The section opens with a quiet header (normal vertical scroll), then
 * pins for the duration of the horizontal track. The horizontal track
 * itself contains only product frames — no oversized title slab — so
 * each scroll tick lands on a complete piece instead of revealing an
 * empty intro panel.
 *
 * Each frame splits the viewport into a clean photo column (no overlay
 * text) and an editorial copy column on dark ground.
 */
export default function HorizontalChapter() {
  const featured = products.filter((p) => p.chapter === "II").slice(0, 4);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // N frames at 100vw each → total track width 400vw.
  // Slide from first to last: translateX 0 → -((N-1)/N) × 100% = -75% for 4 frames.
  const N = featured.length;
  const endPct = -(((N - 1) / N) * 100);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${endPct}%`]);

  return (
    <section className="relative bg-ink text-paper">
      {/* Quiet header above the pinned track — compact, adaptive,
          stays out of the way of the actual reel. */}
      <div className="px-gutter pt-20 md:pt-24 pb-6 md:pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="font-tag text-tag-xs text-paper/55 mb-2.5">— Reel · Chapter II</div>
            <h2 className="font-display text-[clamp(22px,2.6vw,38px)] leading-[1.05] tracking-[-0.02em] max-w-[22ch]">
              Lightning,{" "}
              <em className="not-italic text-dune">read across.</em>
            </h2>
          </div>
          <div className="font-tag text-tag-xs text-paper/55 leading-relaxed md:text-right">
            <span className="text-paper/85">Scroll →</span>
            <span className="hidden md:inline text-paper/40"> · {N} frames</span>
          </div>
        </div>
      </div>

      {/* Pinned horizontal track */}
      <div ref={ref} className="relative overflow-clip" style={{ height: `${N * 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div style={{ x }} className="flex h-full will-change-transform">
            {featured.map((p, i) => (
              <Frame key={p.slug} product={p} index={i + 1} />
            ))}
          </motion.div>
          <ProgressDots progress={scrollYProgress} count={N} />
        </div>
      </div>
    </section>
  );
}

function Frame({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  return (
    <div className="min-w-full h-full shrink-0 relative grid grid-cols-12 bg-ink">
      {/* LEFT — clean photography column, no text overlays */}
      <div className="col-span-12 md:col-span-7 relative h-[60svh] md:h-full bg-storm overflow-hidden">
        <img
          src={product.hero}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Narrow bottom shade only — keeps the photo reading clean */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/55 to-transparent pointer-events-none" />
      </div>

      {/* RIGHT — typographic column on quiet ground */}
      <div className="col-span-12 md:col-span-5 relative flex flex-col justify-between px-gutter py-12 md:py-16 bg-ink">
        <div className="flex items-start justify-between font-tag text-tag-xs text-paper/65">
          <div className="leading-relaxed">
            <div className="text-paper/85">— Frame {String(index).padStart(2, "0")}</div>
            <div>{product.lot}</div>
          </div>
          <div className="text-right leading-relaxed">
            <div className="text-paper/85">Chapter {product.chapter}</div>
            <div>{product.category.toUpperCase()}</div>
          </div>
        </div>

        <div className="mt-auto">
          <h3 className="font-display text-[clamp(26px,2.8vw,44px)] leading-[1.02] tracking-[-0.025em] max-w-[14ch]">
            {product.name}
          </h3>
          <p className="mt-5 font-body text-paper/70 text-[14.5px] leading-relaxed max-w-[34ch]">
            {product.notes[0] ?? product.description.slice(0, 140)}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href={`/products/${product.slug}`}
              data-cursor="View piece"
              className="btn-storm"
            >
              View piece — <Price usd={product.price} />
              <span aria-hidden>→</span>
            </Link>
            <span className="font-tag text-tag-xs text-paper/55">
              {product.badges?.[0]?.label ?? "Edition of 200"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressDots({ progress, count }: { progress: MotionValue<number>; count: number }) {
  // Tiny visual rail at the bottom indicating which frame is in view.
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-px w-10 bg-paper/15 relative overflow-hidden">
          <motion.div
            style={{ width: i === 0 ? width : "0%" }}
            className="h-full bg-paper/75 absolute left-0 top-0"
          />
        </div>
      ))}
    </div>
  );
}
