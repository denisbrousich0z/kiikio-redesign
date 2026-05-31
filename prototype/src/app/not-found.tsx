import Link from "next/link";

/**
 * Editorial 404 — kept in palette (paper / ink / dune / bolt) and
 * matching the rest of the studio. No noise, just a single piece of
 * direction back into the catalog.
 */
export default function NotFound() {
  return (
    <section className="min-h-screen bg-ink text-paper flex flex-col">
      <div className="flex-1 flex items-center px-gutter py-chapter">
        <div className="grid grid-cols-12 gap-8 w-full items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="font-tag text-tag-xs text-paper/55 mb-6">
              — Off the route / 404
            </div>
            <h1 className="font-display text-[clamp(48px,7vw,108px)] leading-[0.95] tracking-[-0.035em]">
              The trail{" "}
              <em className="not-italic text-dune">stops here.</em>
            </h1>
            <p className="mt-7 font-body text-paper/70 text-[15.5px] leading-relaxed max-w-[52ch]">
              This page is not part of any chapter we&apos;ve dispatched. The
              link may be from an older edition, or the piece has been retired
              to the archive.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                data-cursor="Return to studio"
                className="btn-storm"
              >
                Return to studio
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/collections/catalog"
                data-cursor="Browse catalog"
                className="font-tag text-tag-xs text-paper/75 hover:text-paper underline underline-offset-4 decoration-paper/30 hover:decoration-paper"
              >
                or browse the full catalog
              </Link>
            </div>
          </div>
          <div className="hidden md:block md:col-span-3 md:col-start-10 self-end font-tag text-tag-xs text-paper/55 leading-relaxed text-right">
            <div className="text-paper/85">After the storm</div>
            <div className="mt-1">Chapter II — Lightning</div>
            <div className="mt-1 text-paper/40">Edition of 200</div>
          </div>
        </div>
      </div>
    </section>
  );
}
