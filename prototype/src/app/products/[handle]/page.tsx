import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getRelated, products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import Reveal from "@/components/ui/Reveal";

type Props = { params: { handle: string } };

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.handle);
  if (!product) notFound();
  const related = getRelated(product.slug, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 md:pt-28 px-gutter bg-ink text-paper">
        <div className="font-tag text-tag-xs text-paper/55 flex items-center gap-2 mb-8">
          <Link href="/" data-cursor="Home" className="hover:text-paper">Kiikio</Link>
          <span>·</span>
          <Link href="/collections/chapter-ii-lightning" data-cursor="Chapter II" className="hover:text-paper">Chapter {product.chapter}</Link>
          <span>·</span>
          <span className="text-paper/85">{product.name}</span>
        </div>
      </div>

      {/* Gallery + Info */}
      <section className="px-gutter pb-chapter bg-ink text-paper">
        <div className="grid md:grid-cols-12 gap-10 md:gap-14">
          <div className="md:col-span-7">
            <ProductGallery images={product.gallery} alt={product.name} />
          </div>
          <div className="md:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {/* Editorial story strip */}
      <section className="bg-storm text-paper py-chapter border-y border-paper/10">
        <div className="px-gutter grid md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-5">
            <div className="font-tag text-tag-xs text-paper/60 mb-5">— The piece, on record</div>
            <h2 className="font-display text-display-md tracking-[-0.03em] leading-[0.98]">
              &ldquo;{product.notes[0] ?? "Cut, washed, returned to the workshop."}&rdquo;
            </h2>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7 font-body text-paper/70 text-[15.5px] leading-relaxed space-y-4 max-w-[52ch]">
            <p>
              {product.description}
            </p>
            <p>
              {product.name} is part of Chapter {product.chapter}. Cut in limited run, identified by {product.lot}, and shipped with the chapter&apos;s manifest.
              When the chapter closes, the piece passes to the Archive.
            </p>
          </div>
        </div>
      </section>

      {/* Detail crop strip */}
      {product.gallery.length > 2 && (
        <section className="bg-ink overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3">
            {product.gallery.slice(1, 4).map((src, i) => (
              <div key={src + i} className="relative aspect-[3/4] overflow-hidden bg-storm">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      <section className="bg-ink text-paper py-chapter">
        <div className="px-gutter">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-display text-display-md tracking-[-0.03em] leading-[0.98] max-w-[18ch]">
              From the same chapter.
            </h2>
            <Link
              href="/collections/chapter-ii-lightning"
              data-cursor="See chapter"
              className="btn-ghost border-paper/40 text-paper hidden md:inline-flex"
            >
              See Chapter {product.chapter} →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {related.map((p, i) => (
              <ProductCard product={p} key={p.slug} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.slug }));
}
