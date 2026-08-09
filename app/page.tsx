import Hero from "@/components/sections/Hero";
import TrustMarquee from "@/components/sections/TrustMarquee";
import StatsBar from "@/components/sections/StatsBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import ProcessSteps from "@/components/sections/ProcessSteps";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import ConstructionJourney from "@/components/sections/ConstructionJourney";
import CinematicConstructionVideos from "@/components/sections/CinematicConstructionVideos";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <ConstructionJourney />
      <CinematicConstructionVideos />
      <StatsBar />
      <ServicesGrid />
      <PortfolioPreview />
      <ProcessSteps />
      <Testimonials />
      <CTABanner />
    </>
  );
}
