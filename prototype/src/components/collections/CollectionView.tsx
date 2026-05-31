"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { type Product } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/ui/Reveal";

type Chapter = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  hero: string;
};

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  list: Product[];
  siblings: Chapter[];
  currentHandle: string;
};

const FILTERS: { id: "all" | Product["category"]; label: string }[] = [
  { id: "all", label: "All" },
  { id: "outerwear", label: "Outerwear" },
  { id: "tops", label: "Tops" },
  { id: "denim", label: "Denim" },
  { id: "accessories", label: "Accessories" },
];

/**
 * Client-side view of a collection page. Strips the loud chapter-hero
 * (giant title, hero photograph, sticky filter bar) in favour of a
 * quiet editorial header that matches the home grid: eyebrow + tight
 * page title + the same pill filters used on the home grid + product
 * grid. The "Read sideways" sibling block stays so users can jump
 * between chapters.
 */
export default function CollectionView({
  eyebrow,
  title,
  subtitle,
  description,
  list,
  siblings,
  currentHandle,
}: Props) {
  const [active, setActive] = useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    return active === "all" ? list : list.filter((p) => p.category === active);
  }, [active, list]);

  return (
    <>
      {/* Quiet header — no full-bleed hero photo, no oversized headline.
          The inner block is shifted right on desktop so the SideNav stack
          (pinned at left:80px) doesn't collide with the eyebrow / title. */}
      <section className="bg-ink text-paper pt-28 md:pt-36 pb-10 md:pb-14">
        <div className="px-gutter md:pl-[200px]">
          <Reveal>
            <div className="font-tag text-tag-xs text-paper/55 mb-4">
              {eyebrow}
            </div>
          </Reveal>
          <Reveal delay={1} className="grid md:grid-cols-12 gap-8 items-end">
            <h1 className="md:col-span-7 font-display text-[clamp(34px,4.6vw,60px)] leading-[0.98] tracking-[-0.03em] max-w-[18ch]">
              {title}
            </h1>
            <div className="md:col-span-4 md:col-start-9 md:text-right font-tag text-tag-xs text-paper/55 leading-relaxed">
              <div className="text-paper/85">
                {list.length} pieces
              </div>
              <div className="mt-1">{subtitle}</div>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-7 font-body text-paper/70 text-[14.5px] leading-relaxed max-w-[60ch]">
              {description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pill filters — same scale as the home grid */}
      <section className="bg-ink text-paper border-y border-paper/10">
        <div className="px-gutter py-5 md:py-6">
          <div className="flex items-center gap-2 md:gap-3 overflow-x-auto hide-scrollbar -mx-2 md:-mx-1 px-2 md:px-1">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                data-cursor={f.label}
                className={[
                  "font-tag text-tag-xs whitespace-nowrap px-4 h-9 border transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  active === f.id
                    ? "border-paper bg-paper text-ink"
                    : "border-paper/20 text-paper/65 hover:text-paper hover:border-paper/55",
                ].join(" ")}
              >
                {f.label}
                <span className="ml-2 text-[9px] opacity-60">
                  {(f.id === "all"
                    ? list.length
                    : list.filter((p) => p.category === f.id).length
                  )
                    .toString()
                    .padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-ink text-paper py-14 md:py-20">
        <div className="px-gutter">
          {filtered.length === 0 ? (
            <div className="font-tag text-tag-xs text-paper/55 py-20 text-center">
              Nothing in this category for this chapter.
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((p, i) => (
                <ProductCard product={p} key={p.slug} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sibling chapter recirculation */}
      {siblings.length > 0 && (
        <section className="bg-ink text-paper py-chapter border-t border-paper/8">
          <div className="px-gutter">
            <div className="font-tag text-tag-xs text-paper/55 mb-5">
              — Read sideways
            </div>
            <h3 className="font-display text-[clamp(28px,3.4vw,46px)] tracking-[-0.025em] leading-[1.02] max-w-[18ch] mb-10">
              Other chapters
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {siblings
                .filter((c) => c.slug !== currentHandle)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/collections/${c.slug}`}
                    data-cursor={c.title}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-storm card-storm mb-5">
                      <img
                        src={c.hero}
                        alt={c.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]"
                      />
                      <div className="absolute top-4 left-4 font-tag text-tag-xs text-paper/85">
                        Chapter {c.number}
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="font-display text-[24px] md:text-[28px] tracking-[-0.025em] leading-[1.02] text-paper group-hover:text-dune transition-colors duration-500">
                        {c.title}
                      </h4>
                      <span className="font-tag text-tag-xs text-paper/55 whitespace-nowrap">
                        {c.subtitle}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
