"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { SAMPLE_FILES } from "@/lib/constants";

export default function LeadMagnet() {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const sampleSanctionPDF = SAMPLE_FILES[0]; // sample-sanction-plan.pdf

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      // Trigger actual download of sample PDF
      const link = document.createElement("a");
      link.href = sampleSanctionPDF.file;
      link.download = "BBMP_Sanction_Plan_Sample_SriRanganathaAssociates.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <section className="py-20 lg:py-24 bg-navy-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-dark opacity-60 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 50%, rgba(232,160,32,0.2), transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text & Checklist */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              Free Resource Download
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight">
              Download the BBMP AutoDCR Sanction Checklist & Sample Plan Set
            </h2>

            <p className="text-paper-200 text-base sm:text-lg leading-relaxed max-w-2xl">
              Get the complete document checklist required for BBMP & BDA plan approval in Bengaluru, along with a real 4-page sample sanction drawing set in PDF format.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                "Required khata & tax paid receipts list",
                "Setback calculations for 30×40, 40×60 & 50×80",
                "AutoDCR CAD drawing format specifications",
                "Sample ground, 1st & 2nd floor plan PDF",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-xs text-paper-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              {downloadSuccess ? (
                <div className="p-4 rounded-xl bg-success-500/20 border border-success-500/40 text-success-400 text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success-500" />
                  <span>Your sample PDF download has started! Check your downloads folder.</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-400 hover:bg-amber-500 text-navy-950 font-bold text-base rounded-xl shadow-blueprint transition-all"
                >
                  <Download className="w-5 h-5" />
                  {downloading ? "Preparing Download..." : "Download Free Sample Plan (PDF)"}
                </button>
              )}
            </div>
          </div>

          {/* Visual card */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-navy-900 border border-navy-700 rounded-3xl p-6 shadow-2xl overflow-hidden">
              <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-3">
                Sample Sanction Drawing Preview
              </div>

              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-navy-700 relative mb-4">
                <img
                  src={sampleSanctionPDF.thumbnail}
                  alt="Sample BBMP sanction drawing plan set preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-navy-950/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-amber-400 text-navy-950 flex items-center justify-center shadow-xl">
                    <FileText className="w-7 h-7" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-paper-300">
                <span>{sampleSanctionPDF.title}</span>
                <span className="font-semibold text-amber-400">{sampleSanctionPDF.size}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
