export type Chapter = {
  slug: string;
  number: "I" | "II" | "III";
  title: string;
  subtitle: string;
  description: string;
  hero: string;
  status: "live" | "archive" | "incoming";
};

export const chapters: Chapter[] = [
  {
    slug: "chapter-i-first-storm",
    number: "I",
    title: "First Storm",
    subtitle: "Chapter I",
    description:
      "Three years ago a single hoodie lay on a workshop table the night the storm broke. The first chapter is what survived the morning after.",
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/1_80f63832-0c35-4725-b9d1-64695aedf901.jpg",
    status: "archive",
  },
  {
    slug: "chapter-ii-lightning",
    number: "II",
    title: "Lightning",
    subtitle: "Chapter II — current",
    description:
      "Nature's rawest and most instantaneous power. Sudden. Unpredictable. Untamable. Chapter II is the dispatch from the moment it strikes.",
    hero: "/hero-desert.png",
    status: "live",
  },
  {
    slug: "chapter-iii-aftermath",
    number: "III",
    title: "Aftermath",
    subtitle: "Chapter III — incoming",
    description: "What we wear in the quiet hour the morning after.",
    hero: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/2da52ae8e8104ab6e24ed33e579926f6_fb3b8b90-6f2c-4520-b6f7-a716926eaa43.png",
    status: "incoming",
  },
];

export function getChapter(slug: string) {
  return chapters.find((c) => c.slug === slug);
}
