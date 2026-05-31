import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { chapters, getChapter } from "@/lib/chapters";
import CollectionView from "@/components/collections/CollectionView";

type Props = { params: { handle: string } };

const META: Record<
  string,
  { eyebrow: string; title: string; subtitle: string; description: string }
> = {
  catalog: {
    eyebrow: "— Full catalog",
    title: "Every piece. Every chapter.",
    subtitle: "Read across the chapters.",
    description:
      "The full Kiikio catalog. Filter by category to narrow the view. Pieces with a Live tag are still on the rail. Pieces marked Archive return only by reissue.",
  },
  archive: {
    eyebrow: "— Archive",
    title: "What we left behind.",
    subtitle: "Past chapters, discontinued lots.",
    description:
      "Pieces that closed with their chapter. We mark them as Archive — sold-out, end-of-run, or never to be reissued. Saved here so the record stays honest.",
  },
};

export default function CollectionPage({ params }: Props) {
  const chapter = getChapter(params.handle);
  let title = "",
    subtitle = "",
    description = "",
    eyebrow = "";

  if (chapter) {
    title = chapter.title;
    subtitle = chapter.subtitle;
    description = chapter.description;
    eyebrow = `— Chapter ${chapter.number}`;
  } else if (META[params.handle]) {
    const m = META[params.handle];
    title = m.title;
    subtitle = m.subtitle;
    description = m.description;
    eyebrow = m.eyebrow;
  } else {
    notFound();
  }

  const all =
    params.handle === "archive"
      ? products.filter((p) => p.chapter === "I")
      : params.handle === "catalog"
      ? products
      : products.filter((p) => p.chapter === chapter?.number);

  const list = all.length ? all : products;

  return (
    <CollectionView
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      description={description}
      list={list}
      siblings={chapters}
      currentHandle={params.handle}
    />
  );
}

export function generateStaticParams() {
  return [
    ...chapters.map((c) => ({ handle: c.slug })),
    { handle: "catalog" },
    { handle: "archive" },
  ];
}
