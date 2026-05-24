/**
 * Product catalogue for the Kiikio "After the Storm" prototype.
 *
 * Image URLs are real Kiikio Shopify CDN assets pulled from kiikio.com/products/*.json
 * so the prototype shows the actual brand product, not lorem ipsum.
 *
 * Product naming, lot numbers, descriptions and category structure are part of
 * the redesign — the editorial layer the current site lacks.
 */

export type Product = {
  slug: string;
  name: string; // The editorial display name we propose
  legalName: string; // Original product name retained for SKU lookup
  category: "tops" | "denim" | "outerwear" | "footwear" | "accessories";
  chapter: "I" | "II" | "III";
  lot: string;
  price: number;
  colorways: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  notes: string[];
  hero: string;
  gallery: string[];
};

const cdn = (h: string) => `https://cdn.shopify.com/s/files/1/0785/8618/3955/files/${h}`;

export const products: Product[] = [
  {
    slug: "rivet-tee-rust",
    name: "Rivet Tee — Rust",
    legalName: "Vintage Rivet Short Sleeve T-Shirt",
    category: "tops",
    chapter: "II",
    lot: "Lot 014",
    price: 54,
    colorways: [
      { name: "Rust", hex: "#7C2F2A" },
      { name: "Ink", hex: "#0B0B0B" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Washed-cotton tee returned to the workshop and reworked with metal eyelets along the shoulder seam and contrast leather straps to the sleeve. Cut heavy. Worn the day after.",
    notes: ["Washed cotton, 240 gsm", "Hand-set metal eyelets", "Contrast leather strap detail", "Cut and finished in limited run"],
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/70894401d3859f2d819599ab0576190d_87cec98e-cb4c-4e9c-a708-36d9783d5dda.jpg",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/70894401d3859f2d819599ab0576190d_87cec98e-cb4c-4e9c-a708-36d9783d5dda.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/2222.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/0ea09c4aaff7e9ceb53a8bf5914238c2.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/7_b811a4f3-a457-4f3c-b7f2-54d68b5fdcaf.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/33_e48604e1-b919-485a-a923-5f1c017c7f92.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/22_30895c10-add7-4c15-a1b8-4512b818da74.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/1_91e5359f-375a-4ef6-86f4-392abe654c83.jpg",
    ],
  },
  {
    slug: "graffiti-cargo-jeans",
    name: "Graffiti Cargo Jean",
    legalName: "Dark Graffiti Patchwork Cargo Jeans",
    category: "denim",
    chapter: "II",
    lot: "Lot 021",
    price: 88,
    colorways: [{ name: "Storm Blue", hex: "#1F2933" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Patchwork denim with hand-painted graffiti panels, cargo pocketing and a hardware kit — belt and chain included. Weathered the way only a year of wear could do.",
    notes: ["Patchwork denim, 12oz", "Hand-painted graffiti panels", "Cargo pocketing", "Hardware kit: belt + chain"],
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/13_8cee2481-7d79-41b6-8e2e-014fdd62198d.jpg",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/13_8cee2481-7d79-41b6-8e2e-014fdd62198d.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/12_2d4eed8a-7dba-4094-bb6b-53455b42c1b3.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/10_b5d94d57-81ce-4de6-bf62-2df6357703bc.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/11_ce52ce77-f88d-472a-b22e-16d73dddab89.jpg",
    ],
  },
  {
    slug: "cargo-pant-washed",
    name: "Washed Cargo",
    legalName: "Washed Pocket Cargo Pants",
    category: "denim",
    chapter: "II",
    lot: "Lot 019",
    price: 85,
    colorways: [{ name: "Ink", hex: "#0B0B0B" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Heavy-washed cotton cargo with utility pocketing and a low-set belt loop. Designed to take a hardware loadout and stay quiet underneath.",
    notes: ["Heavy-washed cotton", "Utility pocketing front + thigh", "Low-set belt loop", "Includes belt + chain"],
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/15_af46c109-fe98-4016-8597-6c68bb3d222d.jpg",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/15_af46c109-fe98-4016-8597-6c68bb3d222d.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/14_65051387-3cc3-40dc-8676-ca54fcb2adc2.jpg",
    ],
  },
  {
    slug: "raw-hem-short",
    name: "Raw Hem Short",
    legalName: "New Raw Hem Ripped Black Jean Shorts",
    category: "denim",
    chapter: "II",
    lot: "Lot 011",
    price: 83,
    colorways: [{ name: "Ink", hex: "#0B0B0B" }],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Cut by hand from a single bolt and left unhemmed. The fray is the finish. Black denim, mid-rise, deliberately torn at the knee.",
    notes: ["Black 11oz denim", "Hand-cut, raw hem", "Mid-rise, relaxed leg", "Deliberate distressing"],
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/16_b49646a7-29d5-408d-8f1a-2f969fcc1c7f.jpg",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/16_b49646a7-29d5-408d-8f1a-2f969fcc1c7f.jpg",
    ],
  },
  {
    slug: "lightning-tank",
    name: "Lightning Tank — Bolt",
    legalName: "LIGHTNING Series | Street Style Ribbed Tank Top",
    category: "tops",
    chapter: "II",
    lot: "Lot 002",
    price: 40,
    colorways: [{ name: "Ink", hex: "#0B0B0B" }],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Ribbed cotton tank with the inaugural Lightning bolt embroidered to the chest. The mark we started with, returned untouched.",
    notes: ["Heavy-ribbed cotton", "Chest-embroidered Lightning mark", "Cut and finished in original studio"],
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/57d9c83b97f96a303456883d68d301a8_59c604b3-93ad-40e1-b347-8f87ac747d8e.jpg",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/57d9c83b97f96a303456883d68d301a8_59c604b3-93ad-40e1-b347-8f87ac747d8e.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/5_146c47a5-3b44-4c0c-9367-7628598356a0.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/11_56f9879f-805b-498b-849d-d05b55af7509.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/2_7fc656b7-44bb-48e2-a6b3-f20a706bd208.jpg",
    ],
  },
  {
    slug: "lightning-wide-leg-short",
    name: "Lightning Strap Short",
    legalName: "LIGHTNING Series | New Strap Wide-Leg Shorts",
    category: "denim",
    chapter: "II",
    lot: "Lot 007",
    price: 56,
    colorways: [{ name: "Ink", hex: "#0B0B0B" }],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Wide-leg denim short with a tactical strap kit. The Lightning fit, cut for summer.",
    notes: ["12oz denim", "Wide-leg cut", "Tactical strap kit"],
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/c421fcad1ada0558bd28d75019e66bb9.jpg",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/c421fcad1ada0558bd28d75019e66bb9.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/6_fff50f9f-f3c1-41e8-9824-b49935ee7eca.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/7_9d1d49e8-a5d0-4fd8-9338-abb0308f0884.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/2_40fee19b-ba8f-4d01-8bff-9fcfe0b9d68a.jpg",
    ],
  },
  {
    slug: "crocodile-leather-jacket",
    name: "Patchwork Jacket — Crocodile",
    legalName: "Black and Red Crocodile-Patterned Leather Patchwork Jacket",
    category: "outerwear",
    chapter: "II",
    lot: "Lot 028",
    price: 191,
    colorways: [{ name: "Ink/Bolt", hex: "#0B0B0B" }],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Leather patchwork jacket in alternating ink and bolt-red crocodile finish. Heavy. The first piece in the Aftermath chapter.",
    notes: ["Patchwork leather", "Crocodile emboss", "Heavy lined construction"],
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/2da52ae8e8104ab6e24ed33e579926f6_fb3b8b90-6f2c-4520-b6f7-a716926eaa43.png",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/2da52ae8e8104ab6e24ed33e579926f6_fb3b8b90-6f2c-4520-b6f7-a716926eaa43.png",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/img_v3_02q5_80796cf2-f48a-4769-9438-c1cdcafbf8eg.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/O1CN01gcdiUT22sCngQbSqx__4611686018427387815-0-tbbala_jpg_960x960_jpg.jpg",
    ],
  },
  {
    slug: "sherpa-jacket-vintage",
    name: "Sherpa Hooded — Dust",
    legalName: "Vintage Distressed Hooded Jacket",
    category: "outerwear",
    chapter: "I",
    lot: "Lot 003",
    price: 97,
    colorways: [{ name: "Dust", hex: "#C8B69A" }],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Sherpa-lined hooded jacket from the first chapter. Re-released untouched — same cut, same wash.",
    notes: ["Sherpa-lined body", "Hooded construction", "Original Chapter I pattern"],
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/1_80f63832-0c35-4725-b9d1-64695aedf901.jpg",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/1_80f63832-0c35-4725-b9d1-64695aedf901.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/002_227b965e-9aac-4b20-b35d-278b2b9e616c.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/017_756e8e0b-7d88-4083-a6d0-b9991da2706a.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/020_4e79af87-1c93-4541-8575-8145af8ec927.jpg",
    ],
  },
  {
    slug: "destroyed-sweater-coat",
    name: "Plush Sweater Coat",
    legalName: "KIIKIO Destroyed Knitted Sweater Plush Coat",
    category: "outerwear",
    chapter: "II",
    lot: "Lot 024",
    price: 79,
    colorways: [{ name: "Ink", hex: "#0B0B0B" }],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Hand-distressed knit with plush lining. Built for the cold the storm left behind.",
    notes: ["Hand-distressed knit", "Plush interior lining", "Oversize cut"],
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/1_4cccd985-0ece-4fa9-b567-0bf4e75e7d41.jpg",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/1_4cccd985-0ece-4fa9-b567-0bf4e75e7d41.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/15_82bffe1b-cfa2-40ea-b13c-2cd0537d4b90.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/18_53421ab9-2b50-4d8e-8e80-eb9c99739cea.jpg",
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/14_4a35ca35-0f51-4e14-a6b0-b5d25f1ab655.jpg",
    ],
  },
  {
    slug: "racing-jacket-set",
    name: "Racing Jacket Set",
    legalName: "Racing Style Jacket Set",
    category: "outerwear",
    chapter: "II",
    lot: "Lot 030",
    price: 139,
    colorways: [
      { name: "Bolt", hex: "#C8201E" },
      { name: "Ink", hex: "#0B0B0B" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Two-piece racing-cut jacket and pant set. Bolt-red and ink, with full hardware kit. Worn together or split.",
    notes: ["Racing cut jacket + pant", "Hardware kit included", "Available in Bolt or Ink"],
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/Gemini_Generated_Image_7xyps77xyps77xyp_a92ad5ed-d327-4017-b56c-399fbb70f700.png",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/Gemini_Generated_Image_7xyps77xyps77xyp_a92ad5ed-d327-4017-b56c-399fbb70f700.png",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(slug: string, n = 4) {
  return products.filter((p) => p.slug !== slug).slice(0, n);
}
