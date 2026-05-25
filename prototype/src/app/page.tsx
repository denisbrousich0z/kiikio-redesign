import Hero from "@/components/home/Hero";
import HorizontalChapter from "@/components/home/HorizontalChapter";
import Chapter from "@/components/home/Chapter";
import EditorialGrid from "@/components/home/EditorialGrid";
import StoryChapter from "@/components/home/StoryChapter";
import LookbookStrip from "@/components/home/LookbookStrip";
import AutoMarquee from "@/components/ui/AutoMarquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AutoMarquee
        text="KIIKIO.COM"
        secondary="After the storm  ·  Chapter II  ·  Lightning  ·  Edition of 200  ·  Dispatching now"
        duration={28}
        divider="·"
      />
      <HorizontalChapter />
      <AutoMarquee text="Returned intact" duration={36} reverse divider="⚡" size="md" />
      <Chapter />
      <EditorialGrid />
      <StoryChapter />
      <AutoMarquee
        text="KIIKIO.COM"
        secondary="Chapter II — Lightning  ·  Edition of 200  ·  Dispatching worldwide"
        duration={32}
        divider="·"
      />
      <LookbookStrip />
    </>
  );
}
