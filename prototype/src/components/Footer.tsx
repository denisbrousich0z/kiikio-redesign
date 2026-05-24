import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="px-gutter py-chapter">
        {/* Top: wordmark + tagline */}
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <div className="font-tag text-tag-xs text-paper/60 mb-6">— After the storm</div>
            <h2 className="font-display text-display-lg leading-[0.95] tracking-[-0.03em]">
              Kiikio
              <br />
              <em className="not-italic text-dune">Chapter II — Lightning.</em>
            </h2>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-x-8 gap-y-4 self-end font-tag text-tag-xs text-paper/70">
            <div className="space-y-2">
              <div className="text-paper/40">Shop</div>
              <Link href="/collections/chapter-ii-lightning" className="block hover:text-paper">Chapter II</Link>
              <Link href="/collections/catalog" className="block hover:text-paper">Catalog</Link>
              <Link href="/collections/archive" className="block hover:text-paper">Archive</Link>
            </div>
            <div className="space-y-2">
              <div className="text-paper/40">Studio</div>
              <Link href="/#story" className="block hover:text-paper">Story</Link>
              <Link href="#" className="block hover:text-paper">Dispatch</Link>
              <Link href="#" className="block hover:text-paper">Contact</Link>
            </div>
          </div>
        </div>

        <div className="hairline-bright my-16" />

        {/* Bottom: signup + meta */}
        <div className="grid md:grid-cols-12 gap-10">
          <form className="md:col-span-6">
            <label className="font-tag text-tag-xs text-paper/50 block mb-3">
              Subscribe — chapter dispatch
            </label>
            <div className="flex items-center border-b border-paper/30">
              <input
                type="email"
                placeholder="your@email"
                className="bg-transparent flex-1 py-3 font-body text-base outline-none placeholder:text-paper/40"
              />
              <button className="font-tag text-tag-xs py-3 px-2 hover:text-dune transition-colors">
                Send →
              </button>
            </div>
          </form>

          <div className="md:col-span-6 grid grid-cols-2 gap-6 font-tag text-tag-xs text-paper/60 self-end">
            <div>
              <div className="text-paper/40 mb-2">Worldwide</div>
              Free shipping over $129
              <br />
              30-day returns
            </div>
            <div>
              <div className="text-paper/40 mb-2">Get in touch</div>
              we@kiikio.com
              <br />
              Replied in &lt;24h
            </div>
          </div>
        </div>

        <div className="hairline-bright my-16" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-tag text-tag-xs text-paper/40">
          <div>© Kiikio Studios 2026 — All chapters reserved.</div>
          <div className="flex gap-6">
            <Link href="#">Instagram</Link>
            <Link href="#">TikTok</Link>
            <Link href="#">Pinterest</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
