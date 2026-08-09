import ConstructionJourney from "@/components/sections/ConstructionJourney";
import TrustMarquee from "@/components/sections/TrustMarquee";
import CostCalculator from "@/components/sections/CostCalculator";
import StatsBar from "@/components/sections/StatsBar";
import FounderSection from "@/components/sections/FounderSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CinematicConstructionVideos from "@/components/sections/CinematicConstructionVideos";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import ComparisonTable from "@/components/sections/ComparisonTable";
import LeadMagnet from "@/components/sections/LeadMagnet";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      {/* 1. Showstopper 250-Frame Interactive Construction Journey Hero at the ABSOLUTE FIRST PLACE */}
      <ConstructionJourney />

      {/* 2. Continuous Authority Trust Marquee */}
      <TrustMarquee />

      {/* 3. Interactive Plot Scope & Cost Calculator */}
      <CostCalculator />

      {/* 4. Numerical Proof Bar */}
      <StatsBar />

      {/* 5. Principal Engineer Credibility & Credentials */}
      <FounderSection />

      {/* 6. Comprehensive 12-Card Engineering Services Grid */}
      <ServicesGrid />

      {/* 7. Engineering Video Showcase */}
      <CinematicConstructionVideos />

      {/* 8. Real Project Elevation & Drawing Samples */}
      <PortfolioPreview />

      {/* 9. Engineering Comparison Matrix */}
      <ComparisonTable />

      {/* 10. Free Downloadable Sanction Checklist PDF */}
      <LeadMagnet />

      {/* 11. Accordion FAQ Section */}
      <FAQ />

      {/* 12. Bottom Conversion CTA Banner */}
      <CTABanner />
    </>
  );
}
