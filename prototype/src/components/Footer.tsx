import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";

const SERVICE = [
  { label: "Contact us", href: "#" },
  { label: "Shipping & delivery", href: "#" },
  { label: "Returns & exchanges", href: "#" },
  { label: "Size guide", href: "#" },
  { label: "Care", href: "#" },
];

const ABOUT = [
  { label: "Story", href: "/#story" },
  { label: "Chapter II — Lightning", href: "/collections/chapter-ii-lightning" },
  { label: "Chapter I — First Storm", href: "/collections/chapter-i-first-storm" },
  { label: "Archive", href: "/collections/archive" },
  { label: "Press", href: "#" },
];

const INFORMATION = [
  { label: "Privacy policy", href: "#" },
  { label: "Terms of service", href: "#" },
  { label: "Cookie policy", href: "#" },
  { label: "Imprint", href: "#" },
  { label: "Accessibility", href: "#" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "YouTube", href: "#" },
];

/**
 * Footer — three-column reference structure (SERVICE / ABOUT / INFORMATION)
 * adapted from the official Kiikio site, restyled in the project's
 * paper-on-ink palette and editorial type system.
 */
export default function Footer() {
  return (
    <footer className="bg-ink text-paper border-t border-paper/10">
      <div className="px-gutter pt-20 md:pt-24 pb-10">
        {/* Top: newsletter + columns */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          {/* Newsletter */}
          <div className="md:col-span-4">
            <div className="font-tag text-tag-xs text-paper/55 mb-3">— Newsletter</div>
            <p className="font-body text-paper/70 text-[14.5px] leading-relaxed max-w-[36ch]">
              Subscribe to receive a single quiet dispatch with each new chapter. No noise, no SALE theatre.
            </p>
            <form className="mt-5">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center border-b border-paper/30 focus-within:border-paper transition-colors duration-300">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="your@email"
                  className="bg-transparent flex-1 py-3 font-body text-[14.5px] outline-none placeholder:text-paper/40"
                />
                <button
                  type="submit"
                  data-cursor="Subscribe"
                  className="font-tag text-tag-xs py-3 px-2 hover:text-dune transition-colors"
                >
                  Subscribe →
                </button>
              </div>
            </form>
          </div>

          {/* Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-10">
            <FooterCol title="Service" items={SERVICE} />
            <FooterCol title="About us" items={ABOUT} />
            <FooterCol title="Information" items={INFORMATION} />
          </div>
        </div>

        <div className="hairline-bright my-12 md:my-14" />

        {/* Wordmark + meta */}
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <Link
              href="/"
              aria-label="Kiikio"
              data-cursor="Home"
              className="block max-w-[540px]"
            >
              <LogoMark variant="white" layout="block" alt="Kiikio" className="opacity-90" />
            </Link>
            <div className="mt-4 font-tag text-tag-xs text-paper/45">
              After the storm — Chapter II Lightning
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8 flex flex-col gap-4 md:items-end">
            <div className="font-tag text-tag-xs text-paper/45">— Social</div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-tag text-tag-xs text-paper/85 md:justify-end">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    data-cursor={s.label}
                    className="hover:text-dune transition-colors duration-300"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="font-tag text-tag-xs text-paper/45 mt-3">— Payment</div>
            <PaymentRow />
          </div>
        </div>

        <div className="hairline-bright my-10" />

        {/* Bottom legal row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-tag text-tag-xs text-paper/45">
          <div>© Kiikio Studios 2026 — All chapters reserved.</div>
          <div>Designed in studio. Dispatched worldwide.</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="font-tag text-tag-xs text-paper/45 mb-4">— {title}</div>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            <Link
              href={it.href}
              data-cursor={it.label}
              className="font-body text-[13.5px] text-paper/85 hover:text-dune transition-colors duration-300"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PaymentRow() {
  // Compact hairline glyphs — no logo licensing, just clean type tiles
  // that read instantly as the major rails (Visa / MC / Amex / Apple Pay /
  // Google Pay / PayPal). Stays in the project's monochrome palette.
  const methods = ["VISA", "MC", "AMEX", "PAY", "G PAY", "PP"];
  return (
    <ul className="flex flex-wrap gap-2 md:justify-end">
      {methods.map((m) => (
        <li
          key={m}
          className="font-tag text-[10px] tracking-[0.18em] text-paper/80 border border-paper/25 px-2.5 h-7 flex items-center"
        >
          {m}
        </li>
      ))}
    </ul>
  );
}
