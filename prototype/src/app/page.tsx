import Hero from "@/components/home/Hero";
import Chapter from "@/components/home/Chapter";
import EditorialGrid from "@/components/home/EditorialGrid";
import StoryChapter from "@/components/home/StoryChapter";
import LookbookStrip from "@/components/home/LookbookStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Chapter />
      <EditorialGrid />
      <StoryChapter />
      <LookbookStrip />
    </>
  );
}
