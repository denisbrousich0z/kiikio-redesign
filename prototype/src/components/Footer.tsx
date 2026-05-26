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
 *
 * Payment row uses inline SVG glyphs for each rail (Visa / Mastercard /
 * Amex / Apple Pay / Google Pay / PayPal) rendered in paper white on
 * hairline-bordered tiles — uniform with the rest of the type system.
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

        {/* Wordmark + social/payment column */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className="md:col-span-7">
            <Link
              href="/"
              aria-label="Kiikio"
              data-cursor="Home"
              className="block max-w-[320px]"
            >
              <LogoMark variant="white" layout="block" alt="Kiikio" className="opacity-90" />
            </Link>
            <div className="mt-3 font-tag text-tag-xs text-paper/45 leading-relaxed max-w-[48ch]">
              After the storm — Chapter II Lightning.
              <br />
              Designed in studio. Dispatched worldwide.
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-6 md:items-end">
            <div className="md:text-right">
              <div className="font-tag text-tag-xs text-paper/45 mb-3">— Social</div>
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
            </div>

            <div className="md:text-right">
              <div className="font-tag text-tag-xs text-paper/45 mb-3">— Payment</div>
              <PaymentRow />
            </div>
          </div>
        </div>

        <div className="hairline-bright my-10" />

        {/* Bottom legal row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-tag text-tag-xs text-paper/45">
          <div>© Kiikio Studios 2026 — All chapters reserved.</div>
          <div>Editorial prototype · v0.3</div>
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

function PaymentTile({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li
      aria-label={label}
      title={label}
      className="border border-paper/22 h-8 px-3 inline-flex items-center justify-center text-paper/85"
    >
      {children}
    </li>
  );
}

function PaymentRow() {
  return (
    <ul className="flex flex-wrap gap-2 md:justify-end">
      <PaymentTile label="Visa">
        <VisaGlyph />
      </PaymentTile>
      <PaymentTile label="Mastercard">
        <MastercardGlyph />
      </PaymentTile>
      <PaymentTile label="American Express">
        <AmexGlyph />
      </PaymentTile>
      <PaymentTile label="Apple Pay">
        <ApplePayGlyph />
      </PaymentTile>
      <PaymentTile label="Google Pay">
        <GooglePayGlyph />
      </PaymentTile>
      <PaymentTile label="PayPal">
        <PaypalGlyph />
      </PaymentTile>
    </ul>
  );
}

/* ---------------- Payment glyphs ----------------
 * Monochrome paper-on-ink wordmarks so the row stays in the project
 * palette. Each tile is fixed-height (32px) so the line reads as a
 * single horizontal strip.
 */

function VisaGlyph() {
  return (
    <span className="font-display italic font-bold text-[15px] tracking-[-0.02em] leading-none">
      VISA
    </span>
  );
}

function MastercardGlyph() {
  return (
    <svg
      width="28"
      height="18"
      viewBox="0 0 28 18"
      aria-hidden
      focusable="false"
    >
      <circle cx="10" cy="9" r="6.5" fill="currentColor" opacity="0.95" />
      <circle cx="18" cy="9" r="6.5" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

function AmexGlyph() {
  return (
    <span className="font-tag text-[10px] tracking-[0.18em] leading-none">
      AMEX
    </span>
  );
}

function ApplePayGlyph() {
  return (
    <span className="inline-flex items-center gap-[3px] leading-none">
      <svg
        width="10"
        height="12"
        viewBox="0 0 10 12"
        aria-hidden
        focusable="false"
      >
        <path
          d="M7.6 6.2c0-1.5 1.2-2.2 1.2-2.2-.7-1-1.7-1.1-2.1-1.1-.9-.1-1.7.5-2.2.5s-1.1-.5-1.9-.5c-1 0-1.9.6-2.4 1.5-1 1.8-.3 4.4.7 5.8.5.7 1.1 1.5 1.9 1.5.8 0 1.1-.5 2-.5.9 0 1.2.5 2 .5s1.4-.7 1.9-1.5c.6-.8.9-1.6.9-1.6s-1.9-.7-2-2.4Zm-1.7-4.4c.4-.5.7-1.2.6-1.8-.6 0-1.3.4-1.7.9-.4.4-.7 1.1-.6 1.7.7 0 1.3-.4 1.7-.8Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-tag text-[10px] tracking-[0.16em] leading-none">
        PAY
      </span>
    </span>
  );
}

function GooglePayGlyph() {
  return (
    <span className="inline-flex items-center gap-[3px] leading-none">
      <span className="font-display font-semibold text-[12px] leading-none">
        G
      </span>
      <span className="font-tag text-[10px] tracking-[0.16em] leading-none">
        PAY
      </span>
    </span>
  );
}

function PaypalGlyph() {
  return (
    <span className="font-display italic font-semibold text-[13px] tracking-[-0.02em] leading-none">
      PayPal
    </span>
  );
}
