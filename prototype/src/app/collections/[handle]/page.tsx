import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { chapters, getChapter } from "@/lib/chapters";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/ui/Reveal";

type Props = { params: { handle: string } };

const META: Record<
  string,
  { eyebrow: string; title: string; subtitle: string; description: string; hero: string }
> = {
  catalog: {
    eyebrow: "— Full catalog",
    title: "Every piece. Every chapter.",
    subtitle: "Read across the chapters.",
    description:
      "The full Kiikio catalog. Filter by chapter, category or colorway. Pieces with a Live tag are still on the rail. Pieces marked Archive return only by reissue.",
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/13_8cee2481-7d79-41b6-8e2e-014fdd62198d.jpg",
  },
  archive: {
    eyebrow: "— Archive",
    title: "What we left behind.",
    subtitle: "Past chapters and discontinued lots.",
    description:
      "Pieces that closed with their chapter. We mark them as Archive — sold-out, end-of-run, or never to be reissued. Saved here so the record stays honest.",
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/10_bc166ddc-d22d-4a0c-88e6-f67b6051dcd4.jpg",
  },
};

export default function CollectionPage({ params }: Props) {
  const chapter = getChapter(params.handle);
  let title = "", subtitle = "", description = "", hero = "", eyebrow = "";

  if (chapter) {
    title = chapter.title;
    subtitle = chapter.subtitle;
    description = chapter.description;
    hero = chapter.hero;
    eyebrow = `— Chapter ${chapter.number}`;
  } else if (META[params.handle]) {
    const m = META[params.handle];
    title = m.title;
    subtitle = m.subtitle;
    description = m.description;
    hero = m.hero;
    eyebrow = m.eyebrow;
  } else {
    notFound();
  }

  const all = params.handle === "archive"
    ? products.filter((p) => p.chapter === "I")
    : params.handle === "catalog"
    ? products
    : products.filter((p) => p.chapter === chapter?.number);

  const list = all.length ? all : products;

  return (
    <>
      {/* Chapter hero */}
      <section className="relative h-[80svh] min-h-[560px] bg-ink text-paper overflow-hidden grain">
        <img src={hero} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/65" />

        <div className="absolute inset-0 px-gutter flex flex-col justify-end pb-16 md:pb-20 z-10">
          <Reveal>
            <div className="font-tag text-tag-xs text-paper/70 mb-5">{eyebrow}</div>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="font-display text-display-xl tracking-[-0.04em] leading-[0.92] max-w-[15ch]">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={2} className="mt-8 grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-5 font-body text-paper/75 text-[15px] leading-relaxed max-w-[44ch]">
              {description}
            </p>
            <div className="md:col-span-5 md:col-start-8 font-tag text-tag-xs text-paper/60 md:text-right">
              {list.length} pieces · {subtitle}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter rail */}
      <section className="sticky top-16 md:top-20 z-30 bg-ink/85 backdrop-blur-md border-b border-paper/10 text-paper">
        <div className="px-gutter h-14 flex items-center justify-between gap-6 overflow-x-auto hide-scrollbar">
          <div className="flex items-center gap-6 font-tag text-tag-xs whitespace-nowrap">
            <span className="text-paper/55">Filter</span>
            {["All", "Tops", "Denim", "Outerwear", "Accessories"].map((f, i) => (
              <button
                key={f}
                data-cursor={f}
                className={[
                  "pb-1 border-b transition-colors",
                  i === 0 ? "border-paper text-paper" : "border-transparent text-paper/55 hover:text-paper",
                ].join(" ")}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6 font-tag text-tag-xs whitespace-nowrap text-paper/60">
            <span>Chapter</span>
            <select className="bg-transparent font-tag text-tag-xs text-paper outline-none cursor-pointer">
              <option className="bg-ink text-paper">All chapters</option>
              <option className="bg-ink text-paper">I — First Storm</option>
              <option className="bg-ink text-paper">II — Lightning</option>
              <option className="bg-ink text-paper">III — Aftermath</option>
            </select>
            <span>Sort</span>
            <select className="bg-transparent font-tag text-tag-xs text-paper outline-none cursor-pointer">
              <option className="bg-ink text-paper">Editorial</option>
              <option className="bg-ink text-paper">Newest</option>
              <option className="bg-ink text-paper">Price ↑</option>
              <option className="bg-ink text-paper">Price ↓</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-ink text-paper py-16 md:py-24">
        <div className="px-gutter">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {list.map((p, i) => (
              <ProductCard product={p} key={p.slug} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Sibling chapter recirculation */}
      <section className="bg-ink text-paper py-chapter">
        <div className="px-gutter">
          <div className="font-tag text-tag-xs text-paper/55 mb-6">— Read sideways</div>
          <h3 className="font-display text-display-md tracking-[-0.03em] leading-[0.98] max-w-[18ch] mb-12">
            Other chapters
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {chapters
              .filter((c) => c.slug !== params.handle)
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
                    <h4 className="font-display text-[28px] md:text-[32px] tracking-[-0.025em] leading-[1.02] text-paper group-hover:text-dune transition-colors duration-500">
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
    </>
  );
}

export function generateStaticParams() {
  return [
    ...chapters.map((c) => ({ handle: c.slug })),
    { handle: "catalog" },
    { handle: "archive" },
  ];
}
