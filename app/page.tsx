import { Hero } from "@/components/home/Hero";
import { LegacyNumbers } from "@/components/home/LegacyNumbers";
import { AboutPull } from "@/components/home/AboutPull";
import { FeaturedProductions } from "@/components/home/FeaturedProductions";
import { ManojShahPull } from "@/components/home/ManojShahPull";
import { FestivalsStrip } from "@/components/home/FestivalsStrip";
import { BlogStub } from "@/components/home/BlogStub";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LegacyNumbers />
      <AboutPull />
      <FeaturedProductions />
      <ManojShahPull />
      <FestivalsStrip />
      <BlogStub />
      <NewsletterSection />
    </>
  );
}
