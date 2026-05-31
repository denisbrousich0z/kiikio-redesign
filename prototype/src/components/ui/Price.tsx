"use client";

import { useEffect, useState } from "react";

/**
 * Currency-aware price display. Reads the active market from
 * localStorage (set by CountrySelector) and re-renders on the
 * `kiikio:market-change` custom event. Prices are stored as USD
 * integers — converted via a small in-house FX table. No live
 * API call is made in this prototype.
 */

type MarketCode =
  | "US"
  | "GB"
  | "DE"
  | "FR"
  | "IT"
  | "ES"
  | "NL"
  | "JP"
  | "CA"
  | "AU"
  | "RU"
  | "UA";

type MarketDef = {
  code: MarketCode;
  currency: string;
  locale: string;
  rate: number;
};

// Approximate, stable FX rates (USD = 1). For a real shop these would
// be refreshed from a back-office service; the prototype just needs to
// show the change is wired through end-to-end.
const MARKETS: Record<MarketCode, MarketDef> = {
  US: { code: "US", currency: "USD", locale: "en-US", rate: 1 },
  GB: { code: "GB", currency: "GBP", locale: "en-GB", rate: 0.79 },
  DE: { code: "DE", currency: "EUR", locale: "de-DE", rate: 0.92 },
  FR: { code: "FR", currency: "EUR", locale: "fr-FR", rate: 0.92 },
  IT: { code: "IT", currency: "EUR", locale: "it-IT", rate: 0.92 },
  ES: { code: "ES", currency: "EUR", locale: "es-ES", rate: 0.92 },
  NL: { code: "NL", currency: "EUR", locale: "nl-NL", rate: 0.92 },
  JP: { code: "JP", currency: "JPY", locale: "ja-JP", rate: 156 },
  CA: { code: "CA", currency: "CAD", locale: "en-CA", rate: 1.37 },
  AU: { code: "AU", currency: "AUD", locale: "en-AU", rate: 1.5 },
  RU: { code: "RU", currency: "RUB", locale: "ru-RU", rate: 92 },
  UA: { code: "UA", currency: "UAH", locale: "uk-UA", rate: 41 },
};

const STORAGE_KEY = "kiikio:market";

function readMarket(): MarketDef {
  if (typeof window === "undefined") return MARKETS.US;
  const code = window.localStorage.getItem(STORAGE_KEY) as MarketCode | null;
  if (code && MARKETS[code]) return MARKETS[code];
  return MARKETS.US;
}

function format(amountUsd: number, m: MarketDef): string {
  const converted = amountUsd * m.rate;
  // For non-JPY/RUB/UAH where decimal points carry weight, keep 0 decimals
  // since the source prices are already integer-USD anchored.
  const maximumFractionDigits = ["JPY"].includes(m.currency) ? 0 : 0;
  try {
    return new Intl.NumberFormat(m.locale, {
      style: "currency",
      currency: m.currency,
      maximumFractionDigits,
      minimumFractionDigits: 0,
    }).format(Math.round(converted));
  } catch {
    // Fallback for environments without Intl support for that locale
    return `${m.currency} ${Math.round(converted)}`;
  }
}

type Props = {
  /** Base price in USD (integer). */
  usd: number;
  /** Extra Tailwind classes. */
  className?: string;
};

export default function Price({ usd, className = "" }: Props) {
  // Render USD on the server / first paint to avoid hydration mismatch,
  // then swap to the stored market after mount.
  const [market, setMarket] = useState<MarketDef>(MARKETS.US);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMarket(readMarket());
    setMounted(true);

    const onChange = () => setMarket(readMarket());
    window.addEventListener("kiikio:market-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("kiikio:market-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const label = mounted ? format(usd, market) : `$${usd}`;

  return <span className={className}>{label}</span>;
}
