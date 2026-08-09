import Hero from "@/components/sections/Hero";
import TrustMarquee from "@/components/sections/TrustMarquee";
import StatsBar from "@/components/sections/StatsBar";
import FounderSection from "@/components/sections/FounderSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CostCalculator from "@/components/sections/CostCalculator";
import ConstructionJourney from "@/components/sections/ConstructionJourney";
import CinematicConstructionVideos from "@/components/sections/CinematicConstructionVideos";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import ComparisonTable from "@/components/sections/ComparisonTable";
import LeadMagnet from "@/components/sections/LeadMagnet";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <StatsBar />
      <FounderSection />
      <ServicesGrid />
      <CostCalculator />
      <ConstructionJourney />
      <CinematicConstructionVideos />
      <PortfolioPreview />
      <ComparisonTable />
      <LeadMagnet />
      <FAQ />
      <CTABanner />
    </>
  );
}
