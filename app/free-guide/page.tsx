import { Metadata } from "next";
import LeadMagnet from "@/components/sections/LeadMagnet";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Free BBMP AutoDCR Sanction Checklist & Sample Drawing PDF",
  description:
    "Download the official BBMP & BDA plan approval document checklist and a sample 4-page sanction drawing PDF set from Sri Ranganatha Associates.",
};

export default function FreeGuidePage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-paper-100 border-b border-paper-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold mb-2">
            Downloadable Engineering Guide
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-navy-700 leading-tight">
            BBMP AutoDCR Sanction Checklist & Sample Drawings
          </h1>
          <p className="mt-4 text-ink-700 text-lg max-w-3xl">
            Download the exact document checklist required for BBMP, BDA, and BMRDA building plan approvals in Bengaluru.
          </p>
        </div>
      </section>

      <LeadMagnet />
      <FAQ />
    </>
  );
}
