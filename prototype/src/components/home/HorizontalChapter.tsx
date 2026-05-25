"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";
import { products } from "@/lib/products";

/**
 * Scroll-pinned horizontal showcase.
 *
 * The section becomes a sticky viewport while the user scrolls; the inner
 * track translates horizontally tied to scroll progress. Five "frames":
 *   00  Hero title slab with the wordmark
 *   01–04 Featured pieces from Chapter II (full-bleed editorial panels)
 *
 * Built so it works without scroll-jacking — Lenis already smooths the
 * native scroll, and we use a tall outer container so the inner sticky
 * canvas stays glued to viewport while progressing.
 */
export default function HorizontalChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Inner track moves from 0 to -(panels-1)*100vw across the section.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const featured = products.slice(0, 4);

  return (
    <section
      ref={ref}
      className="relative bg-ink text-paper overflow-clip"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ x }} className="flex h-full w-[500vw] will-change-transform">
          {/* Frame 0 — Title slab */}
          <div className="w-screen h-full shrink-0 relative flex items-center px-gutter">
            <div className="grid grid-cols-12 gap-8 w-full items-end">
              <div className="col-span-12 md:col-span-8">
                <div className="font-tag text-tag-xs text-paper/55 mb-6">— Reel / Chapter II</div>
                <h2 className="font-display text-display-xl leading-[0.88] tracking-[-0.04em]">
                  Lightning,
                  <br />
                  <em className="not-italic text-dune">read across.</em>
                </h2>
                <div className="mt-10 max-w-md">
                  <LogoMark variant="white" layout="block" glitchOnIdle alt="Kiikio" className="opacity-90" />
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 md:col-start-10 self-end font-tag text-tag-xs text-paper/55 leading-relaxed">
                <div>Scroll →</div>
                <div className="text-paper/40 mt-2">04 panels — each piece is a still from the chapter reel.</div>
              </div>
            </div>
            <ProgressDots progress={scrollYProgress} count={5} />
          </div>

          {/* Frames 1..4 — Featured pieces */}
          {featured.map((p, i) => (
            <Frame key={p.slug} product={p} index={i + 1} />
          ))}
        </motion.div>
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
    <div className="w-screen h-full shrink-0 relative">
      <img
        src={product.hero}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/10 to-ink/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/45" />

      <div className="relative h-full px-gutter flex flex-col justify-between py-24 md:py-28">
        <div className="flex items-start justify-between font-tag text-tag-xs text-paper/75">
          <div>
            <div>— Frame {String(index).padStart(2, "0")}</div>
            <div className="text-paper/50">{product.lot}</div>
          </div>
          <div className="text-right">
            <div>CHAPTER {product.chapter}</div>
            <div className="text-paper/50">{product.category.toUpperCase()}</div>
          </div>
        </div>

        <div className="max-w-[28ch]">
          <h3 className="font-display text-[88px] md:text-[140px] leading-[0.85] tracking-[-0.045em]">
            {product.name}
          </h3>
          <p className="mt-6 font-body text-paper/70 text-[15px] leading-relaxed max-w-[44ch]">
            {product.notes[0] ?? product.description.slice(0, 140)}
          </p>
          <div className="mt-8 flex items-center gap-6">
            <Link
              href={`/products/${product.slug}`}
              data-cursor="View piece"
              className="btn-storm"
            >
              View piece — ${product.price}
              <span aria-hidden>→</span>
            </Link>
            <span className="font-tag text-tag-xs text-paper/55">Edition of 200</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressDots({ progress, count }: { progress: MotionValue<number>; count: number }) {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
      {Array.from({ length: count }).map((_, i) => (
        <Dot key={i} progress={progress} index={i} count={count} />
      ))}
    </div>
  );
}

function Dot({
  progress,
  index,
  count,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
}) {
  const step = 1 / (count - 1);
  const opacity = useTransform(progress, [step * (index - 0.6), step * index, step * (index + 0.6)], [0.25, 1, 0.25]);
  return (
    <motion.span
      style={{ opacity }}
      className="block w-2 h-2 rounded-full bg-paper"
    />
  );
}
