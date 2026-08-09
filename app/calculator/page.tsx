import { Metadata } from "next";
import CostCalculator from "@/components/sections/CostCalculator";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Bengaluru House Construction & Sanction Cost Calculator",
  description:
    "Estimate your built-up area, BBMP/BDA plan sanction requirements, 3D elevation renders, and structural drawing scope in 30 seconds with Sri Ranganatha Associates.",
};

export default function CalculatorPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-paper-100 border-b border-paper-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold mb-2">
            Free Online Estimator
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-navy-700 leading-tight">
            Bengaluru Building Plan & Sanction Calculator
          </h1>
          <p className="mt-4 text-ink-700 text-lg max-w-3xl">
            Select your plot dimensions (30×40, 40×60, 50×80, or Custom) and floor configuration to estimate your built-up area and required drawing deliverables.
          </p>
        </div>
      </section>

      <CostCalculator />
      <FAQ />
    </>
  );
}
