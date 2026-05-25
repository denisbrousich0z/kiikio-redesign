import Hero from "@/components/home/Hero";
import HorizontalChapter from "@/components/home/HorizontalChapter";
import Chapter from "@/components/home/Chapter";
import EditorialGrid from "@/components/home/EditorialGrid";
import StoryChapter from "@/components/home/StoryChapter";
import LookbookStrip from "@/components/home/LookbookStrip";
import SectionMarquee from "@/components/ui/SectionMarquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionMarquee text="After the storm" speed={1.3} />
      <HorizontalChapter />
      <SectionMarquee text="Returned intact" speed={0.8} divider="⚡" />
      <Chapter />
      <EditorialGrid />
      <StoryChapter />
      <SectionMarquee text="Chapter II — Lightning" speed={1.1} divider="✦" />
      <LookbookStrip />
    </>
  );
}
