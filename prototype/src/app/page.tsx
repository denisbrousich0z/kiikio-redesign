import Hero from "@/components/home/Hero";
import HorizontalChapter from "@/components/home/HorizontalChapter";
import Chapter from "@/components/home/Chapter";
import EditorialGrid from "@/components/home/EditorialGrid";
import StoryChapter from "@/components/home/StoryChapter";
import AutoMarquee from "@/components/ui/AutoMarquee";

/**
 * Home page composition.
 *
 * The dispatch marquee no longer sits directly under the hero — it appears
 * after the horizontal reel so the page opens on a clean, single statement:
 * hero → scrollable reel → ticker. The "Returned intact" rail uses an SVG
 * bolt glyph instead of an emoji, and the redundant Chapter II marquee
 * plus the Lookbook strip have been removed entirely.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <HorizontalChapter />
      <AutoMarquee
        text="KIIKIO.COM"
        secondary="After the storm  ·  Chapter II  ·  Lightning  ·  Edition of 200  ·  Dispatching now"
        duration={32}
        divider="·"
      />
      <AutoMarquee text="Returned intact" duration={40} reverse size="md" iconDivider="bolt" />
      <Chapter />
      <EditorialGrid />
      <StoryChapter />
    </>
  );
}
