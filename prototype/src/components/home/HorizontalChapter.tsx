"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";
import { products } from "@/lib/products";

/**
 * Scroll-pinned horizontal showcase.
 *
 * Each frame splits the viewport into a clean photo column (no overlay text)
 * and an editorial copy column on dark ground. The result: photography is
 * uninterrupted, all typography lives off-image on a quiet surface.
 */
export default function HorizontalChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Inner track: 5 panels total (intro + 4 frames). Travel from 0 to -80%.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const featured = products.filter((p) => p.chapter === "II").slice(0, 4);

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
                <div className="text-paper/40 mt-2">
                  {featured.length} panels — each piece is a still from the chapter reel.
                </div>
              </div>
            </div>
            <ProgressDots progress={scrollYProgress} count={featured.length + 1} />
          </div>

          {/* Frames 1..N — Featured pieces (split layout, no text on photo) */}
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
    <div className="w-screen h-full shrink-0 relative grid grid-cols-12 bg-ink">
      {/* LEFT — clean photography column, no text overlays */}
      <div className="col-span-12 md:col-span-7 relative h-[60svh] md:h-full bg-storm overflow-hidden">
        <img
          src={product.hero}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle bottom shade only — kept narrow so the photo reads clean */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/55 to-transparent pointer-events-none" />
      </div>

      {/* RIGHT — typographic column on quiet ground (text lives here, not on photo) */}
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
          <h3 className="font-display text-[clamp(28px,3.2vw,52px)] leading-[1.02] tracking-[-0.025em] max-w-[14ch]">
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
              View piece — ${product.price}
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
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
      {Array.from({ length: count }).map((_, i) => (
        <Dot key={i} progress={progress} start={i / count} end={(i + 1) / count} />
      ))}
    </div>
  );
}

function Dot({ progress, start, end }: { progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.25, 1]);
  return <motion.span style={{ opacity }} className="w-6 h-px bg-paper" />;
}
