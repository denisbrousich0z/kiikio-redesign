"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products, type Product } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/ui/Reveal";

const FILTERS: { id: "all" | Product["category"]; label: string }[] = [
  { id: "all", label: "All" },
  { id: "outerwear", label: "Outerwear" },
  { id: "tops", label: "Tops" },
  { id: "denim", label: "Denim" },
  { id: "accessories", label: "Accessories" },
];

export default function EditorialGrid() {
  const [active, setActive] = useState<(typeof FILTERS)[number]["id"]>("all");
  const filtered = useMemo(() => {
    const list = active === "all" ? products : products.filter((p) => p.category === active);
    return list.slice(0, 12);
  }, [active]);

  return (
    <section className="bg-ink text-paper py-chapter">
      <div className="px-gutter">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-12 md:mb-16">
          <Reveal className="md:col-span-7">
            <div className="font-tag text-tag-xs text-paper/50 mb-3">— Dispatch / Catalog</div>
            <h2 className="font-display text-display-md tracking-[-0.022em] leading-[1.02] max-w-[18ch]">
              Pieces returned from the second storm.
            </h2>
          </Reveal>
          <Reveal delay={1} className="md:col-span-4 md:col-start-9 md:text-right">
            <Link
              href="/collections/catalog"
              data-cursor="View all"
              className="btn-storm btn-storm--invert"
            >
              Full catalog
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        {/* Category rail */}
        <div className="mb-10 md:mb-12 flex items-center gap-2 md:gap-3 overflow-x-auto hide-scrollbar -mx-2 md:-mx-1 px-2 md:px-1">
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
                  ? products.length
                  : products.filter((p) => p.category === f.id).length
                )
                  .toString()
                  .padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((p, i) => (
            <ProductCard product={p} key={p.slug} index={i} priority={i < 4} />
          ))}
        </div>

        <div className="mt-14 md:hidden">
          <Link href="/collections/catalog" className="btn-storm btn-storm--invert btn-storm--block">
            Full catalog →
          </Link>
        </div>
      </div>
    </section>
  );
}
