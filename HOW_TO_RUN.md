# How to run — Kiikio "After the Storm" prototype

## TL;DR

1. Install **Node.js 18+** if you don't already have it: https://nodejs.org/
2. Open this folder.
3. Run the launcher for your OS:
   - **macOS**: double-click `START.command` (or run `bash START.sh` in Terminal)
   - **Linux**: run `bash START.sh` in a terminal
   - **Windows**: double-click `START.cmd`
4. Wait ~1–2 minutes the first time while `npm install` runs.
5. Open **http://localhost:3000** in your browser.
6. Press **Ctrl+C** in the terminal window to stop.

## Manual path (any OS)

```bash
cd prototype
npm install     # only first time, ~1-2 min
npm run dev     # then open http://localhost:3000
```

To make a production build instead of the dev server:

```bash
cd prototype
npm run build
npm start       # serves the production build on http://localhost:3000
```

## What to look at

| URL | Screen |
|---|---|
| http://localhost:3000 | Home — cinematic hero, chapter grid, editorial grid, origin story, lookbook |
| http://localhost:3000/collections/chapter-ii-lightning | PLP — Chapter II "Lightning" |
| http://localhost:3000/collections/chapter-i-first-storm | PLP — Chapter I "First Storm" (archive) |
| http://localhost:3000/collections/chapter-iii-aftermath | PLP — Chapter III "Aftermath" (incoming) |
| http://localhost:3000/collections/catalog | Full catalog |
| http://localhost:3000/collections/archive | Archive |
| http://localhost:3000/products/rivet-tee-rust | PDP — Rivet Tee Rust |
| http://localhost:3000/products/raw-hem-short | PDP — Raw Hem Short |

Click any product on the home/PLP page to open its PDP. Click "Add to bag" on a PDP to open the cart drawer.

## What's in this folder

```
README.md                 Project overview, strategy summary, design system spec
HOW_TO_RUN.md             This file
START.command / .sh /.cmd Launchers per OS

deliverables/
  01_brand_audit.md       Phase 1 — full audit of current kiikio.com
  02_creative_direction.md Phase 2 — "After the Storm" art direction

prototype/                The Next.js 14 prototype
  src/app                 Pages (Home, /collections/[handle], /products/[handle])
  src/components          Header, Footer, CartDrawer, Hero, Chapter, EditorialGrid,
                          StoryChapter, LookbookStrip, ProductCard, ProductGallery,
                          ProductInfo, Magnetic, Reveal, Marquee, SmoothScroll, CartProvider
  src/lib                 motion presets, products data, chapters data
  tailwind.config.ts      Custom design tokens

research/screenshots      Reference screenshots of the original kiikio.com
```

## Common issues

**"command not found: node"** — Node.js isn't installed. Get it from https://nodejs.org/ (LTS version is fine, must be 18 or newer).

**"port 3000 is already in use"** — Something else is on port 3000. Either stop that, or run on a different port:
```bash
cd prototype
PORT=3001 npm run dev   # macOS/Linux
set PORT=3001 && npm run dev   # Windows cmd
```

**Permission denied on macOS double-click** — Right-click `START.command` → Open → Open. Or in Terminal: `chmod +x START.command && ./START.command`.

**Images don't load** — They're served live from Kiikio's own Shopify CDN. If you're offline, photos will be blank but the layout still works.

## Stack

Next.js 14 App Router · React 18 · TypeScript · Tailwind 3.4 · Framer Motion 11 · Lenis 1.1

No backend, no API keys, no database — everything runs locally from the data in `prototype/src/lib/`.
