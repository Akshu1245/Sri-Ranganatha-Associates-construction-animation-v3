import Hero from "@/components/sections/Hero";
import TrustMarquee from "@/components/sections/TrustMarquee";
import CostCalculator from "@/components/sections/CostCalculator";
import StatsBar from "@/components/sections/StatsBar";
import FounderSection from "@/components/sections/FounderSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
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
      {/* 1. Showstopper Hero right at the top */}
      <Hero />

      {/* 2. Infinite Trust Marquee */}
      <TrustMarquee />

      {/* 3. Immediate Interactive Estimator right after hero */}
      <CostCalculator />

      {/* 4. Numerical Proof Bar */}
      <StatsBar />

      {/* 5. Principal Engineer Credibility & Credentials */}
      <FounderSection />

      {/* 6. Comprehensive 12-Card Engineering Services Grid */}
      <ServicesGrid />

      {/* 7. Interactive 250-Frame Construction Animation */}
      <ConstructionJourney />

      {/* 8. Engineering Video Showcase */}
      <CinematicConstructionVideos />

      {/* 9. Real Project Elevation & Drawing Samples */}
      <PortfolioPreview />

      {/* 10. Engineering Comparison Matrix */}
      <ComparisonTable />

      {/* 11. Free Downloadable Sanction Checklist PDF */}
      <LeadMagnet />

      {/* 12. Accordion FAQ Section for Local SEO */}
      <FAQ />

      {/* 13. High-Converting Bottom CTA Banner */}
      <CTABanner />
    </>
  );
}
