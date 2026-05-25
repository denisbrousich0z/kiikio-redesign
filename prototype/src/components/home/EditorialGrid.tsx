import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/ui/Reveal";

export default function EditorialGrid() {
  const featured = products.slice(0, 8);
  return (
    <section className="bg-ink text-paper py-chapter">
      <div className="px-gutter">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <Reveal>
            <div className="font-tag text-tag-xs text-paper/50 mb-3">— Dispatch / Catalog</div>
            <h2 className="font-display text-display-md tracking-[-0.03em] leading-[0.98] max-w-[18ch]">
              Pieces returned from the second storm.
            </h2>
          </Reveal>
          <Reveal delay={1} className="hidden md:block">
            <Link href="/collections/catalog" data-cursor="View all" className="btn-ghost text-paper/75 border-paper/40">
              Full catalog →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((p, i) => (
            <ProductCard product={p} key={p.slug} index={i} priority={i < 4} />
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <Link href="/collections/catalog" className="btn-ghost text-paper/75 border-paper/40">
            Full catalog →
          </Link>
        </div>
      </div>
    </section>
  );
}
