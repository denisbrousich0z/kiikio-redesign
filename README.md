# Kiikio — After the Storm

A complete redesign and live prototype for [kiikio.com](https://kiikio.com), reframing the brand from a discount-driven Shopify storefront into a mid-premium dark streetwear house with cinematic, editorial e-commerce.

Built end-to-end as a 7-phase brief: research → art direction → UX strategy → design system → UI → architecture → presentation.

---

## What this repo contains

```
/deliverables           Strategy documents
  01_brand_audit.md      Phase 1: full audit of kiikio.com (brand, UX, UI, tech, competitor map)
  02_creative_direction.md   Phase 2: "After the Storm" art direction (mood, type, color, motion, voice)
/prototype              The working Next.js 14 prototype
  src/app                  Pages: Home, /collections/[handle], /products/[handle]
  src/components           Header, Footer, CartDrawer, Hero, Chapter, EditorialGrid, StoryChapter,
                           LookbookStrip, ProductCard, ProductGallery, ProductInfo, Magnetic, Reveal,
                           Marquee, SmoothScroll (Lenis), CartProvider
  src/lib                  motion presets, products data, chapters data, cn helper
  tailwind.config.ts       Custom design tokens (paper/ink/storm/dune/bolt, type scale, easing, spacing)
/research               Screenshots and research artifacts
```

---

## Quick start

```bash
cd prototype
npm install
npm run dev
# open http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

---

## Why the redesign, in one screen

Kiikio is a real product brand — distressed cotton, hardware-set tees, washed denim, a real founding myth (the lightning hoodie) and real photography. None of that is currently visible on kiikio.com. The site is dressed as a discount-driven dropship store:

- `EXTRA 20% OFF` baked into the **main navigation**
- `SAVE 45%` strikethroughs on every product card
- `83 people viewing this right now` urgency theater
- A bundle popup *inside* the product page hero
- Fake `12/6 Support` and trust-badge wallpapers
- The default purple Shopify `Buy with Shop` CTA

The redesign is **subtractive before it is additive**: remove the discount theater, restore the brand's own assets to the foreground, and rebuild around a single editorial principle.

---

## The creative principle — After the Storm

Kiikio's About page literally opens with:

> *"Three years ago, on a stormy night filled with thunder and lightning, a single hoodie lay on a sewing table…"*

This founding myth becomes the operating principle of the entire brand:

- **Collections** are **Chapters** (I — First Storm, II — Lightning, III — Aftermath)
- **Drops** are **Dispatches**
- Every piece is an **artifact returned from the storm** — which is why distressing, hardware, and washing read as **intention**, not damage
- Editions are honest and small (Edition of 200, Lot 014 — 030)

This positions Kiikio at **mid-premium dark streetwear** — peer set is **Hellstar, Carsicko, Broken Planet, Represent, Eric Emanuel** — not faux-Balenciaga luxury. Honest at the $40–$100 price point. Cinematic without overpromising.

---

## Design system (baked into Tailwind)

| Token | Value | Use |
|---|---|---|
| `paper` | `#F6F4EE` | Default light surface |
| `ink` | `#0B0B0B` | Primary type, dark surface |
| `storm` | `#1C1C1F` | Secondary dark |
| `dune` | `#C8B69A` | Editorial accent (italic display, highlights) |
| `bolt` | `#C8201E` | Signal-only — new chapter dot, never on sale prices |
| `smoke` | `#8A8A8A` | Tertiary metadata |
| `line` | `rgba(11,11,11,0.08)` | Hairlines |

Three typographic voices:

- **Display** — Fraunces (editorial serif, Italic for emphasis)
- **Body** — Inter
- **Tag** — JetBrains Mono (metadata, lot numbers, eyebrows)

Motion:

- Easing `storm` = `cubic-bezier(0.25, 1, 0.5, 1)` (cinematic out)
- Durations 400 → 1600ms, never spring/bounce
- Smooth scroll via Lenis (custom decay easing)
- Magnetic hover on CTAs, viewport-triggered Reveal on sections, looping Marquee for status strips

---

## Screens included in this prototype

| Route | Screen | What's there |
|---|---|---|
| `/` | Home | 100vh cinematic hero, "Three storms. Three chapters." chapter grid, editorial product grid, origin story chapter, lookbook horizontal strip, marquee footer |
| `/collections/chapter-ii-lightning` | PLP / Chapter II | Chapter hero, sticky filter rail (Filter / Chapter / Sort), editorial 3-col grid, sibling chapter recirculation |
| `/collections/chapter-i-first-storm` | PLP / Chapter I | Same template, Archive content |
| `/collections/chapter-iii-aftermath` | PLP / Chapter III | Same template, Incoming |
| `/collections/catalog` | Full catalog | All pieces across chapters |
| `/collections/archive` | Archive | Past chapter pieces |
| `/products/[handle]` | PDP | Thumbnail rail + main image gallery (slideshow + counter), editorial info column, colorway swatches, size grid, custom add-to-bag, accordion (details/shipping/origin), editorial story strip, detail-crop triptych, related grid |
| Global | Header / Footer / Cart drawer | Minimal nav, slide-in cart with free-shipping progress, editorial footer with dispatch signup |

What was removed from kiikio.com:
- `EXTRA 20% OFF` in navigation
- `SAVE 45%` strikethrough pricing
- `83 people viewing` urgency banner
- Bundle popup inside PDP hero
- Trust-badge wallpaper
- Purple Shopify Buy-with-Shop CTA
- Sale-banner imagery used as product photography (replaced with real product gallery images)

---

## Architecture notes

- **Next.js 14 App Router** with TypeScript, fully statically rendered (19 static pages in `next build`).
- **Headless-ready.** Product and chapter data lives in `src/lib/*.ts` today. Swapping to Shopify Storefront API or a custom backend is a single file change per source — every component already consumes the typed `Product` / `Chapter` shape.
- **Framer Motion** for entrance, parallax, and drawer animation. **Lenis** for smooth-scroll. No GSAP needed at this scope.
- **Image strategy:** Pulled directly from Kiikio's own Shopify CDN (real product and campaign photography). In production these would move to Next/Image with the Shopify image loader, but using direct URLs here keeps the prototype's signal honest — every photo is one that Kiikio already owns.
- **Cart:** React Context (`CartProvider`) with a slide-in drawer. Drop-in path to Shopify cart mutations or Stripe is clear.
- **No external UI library.** Every component is built to the design system, which is the point.

---

## Path to production (next steps, not built here)

1. Wire the typed data layer to Shopify Storefront API (or a custom backend) — replace `src/lib/products.ts` and `src/lib/chapters.ts` with fetch helpers.
2. Replace `<img>` with `next/image` and the Shopify image loader for AVIF/WebP and CLS-perfect aspect ratios.
3. Implement search (Algolia, Meilisearch, or Shopify Search API) — header search button is already wired up.
4. Cart mutations → Shopify cart API → real Shopify Checkout (or build the checkout in the same editorial system).
5. Account / order tracking / wishlist.
6. CMS for chapter manifests, studio notes, and the lookbook strip (Sanity or Hygraph fit the editorial cadence).
7. Analytics + A/B (Vercel Analytics, Posthog) — the structure is already grouped around editorial sections, easy to instrument.

---

## Strategy documents

- [`deliverables/01_brand_audit.md`](deliverables/01_brand_audit.md) — Phase 1, brand + UX + UI + technical + competitor audit
- [`deliverables/02_creative_direction.md`](deliverables/02_creative_direction.md) — Phase 2, "After the Storm" art direction system

---

© Kiikio Studios redesign concept, 2026. Designed and built by Devin for Denis.
