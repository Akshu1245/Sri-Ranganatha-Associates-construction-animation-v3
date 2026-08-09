"use client";

import { motion } from "framer-motion";
import { Check, X, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function ComparisonTable() {
  const COMPARISONS = [
    {
      feature: "Principal Civil Engineer Oversight",
      sra: true,
      draftsman: false,
      onlinePortal: false,
      note: "Er. M Ravikumar reviews all drawing sets",
    },
    {
      feature: "In-Person Site Inspection in Bengaluru",
      sra: true,
      draftsman: "Varies",
      onlinePortal: false,
      note: "Verification of actual boundaries & road width",
    },
    {
      feature: "AutoDCR Civic Sanction Filing (BBMP/BDA)",
      sra: true,
      draftsman: "Limited",
      onlinePortal: false,
      note: "Objection handling through to final approval",
    },
    {
      feature: "IS 456 Structural Reinforcement Drawings",
      sra: true,
      draftsman: false,
      onlinePortal: "Extra Fee",
      note: "Engineered footings, columns & slab schedules",
    },
    {
      feature: "Bank-Empanelled Valuation Certificates",
      sra: true,
      draftsman: false,
      onlinePortal: false,
      note: "Accepted by SBI, Canara Bank, HDFC, ICICI",
    },
    {
      feature: "Vastu Floor Plan Optimization",
      sra: true,
      draftsman: "Basic",
      onlinePortal: "Optional",
      note: "Default room placement alignment",
    },
    {
      feature: "Physical Office for In-Person Review",
      sra: true,
      draftsman: false,
      onlinePortal: false,
      note: "Cauvery Complex, Halasru (Opp. Metro)",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-paper-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            Engineering Comparison
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-navy-700 leading-tight">
            Why Bengaluru site owners choose Sri Ranganatha Associates.
          </h2>

          <p className="mt-4 text-ink-700 text-base">
            Compare our registered civil engineering services against unverified draftsmen and online template portals.
          </p>
        </div>

        {/* Table layout */}
        <div className="overflow-x-auto rounded-3xl border border-paper-300 shadow-blueprint">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-navy-900 text-white">
                <th className="p-5 font-bold text-sm w-1/3">Engineering Deliverable</th>
                <th className="p-5 font-bold text-sm bg-navy-800 text-amber-300 text-center w-1/4 border-l border-r border-navy-700">
                  Sri Ranganatha Associates
                </th>
                <th className="p-5 font-bold text-sm text-center text-paper-300 w-1/5">
                  Freelance Draftsman
                </th>
                <th className="p-5 font-bold text-sm text-center text-paper-300 w-1/5">
                  Generic Online Portal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-200 text-xs sm:text-sm">
              {COMPARISONS.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-paper-100/60"}>
                  <td className="p-4 font-semibold text-navy-700">
                    <div>{row.feature}</div>
                    <div className="text-[11px] font-normal text-ink-500 mt-0.5">{row.note}</div>
                  </td>

                  <td className="p-4 bg-amber-50/60 border-l border-r border-amber-200 text-center font-bold text-navy-900">
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-success-500 text-white mx-auto">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </td>

                  <td className="p-4 text-center text-ink-600">
                    {typeof row.draftsman === "boolean" ? (
                      row.draftsman ? (
                        <Check className="w-4 h-4 text-success-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-red-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs font-medium text-ink-500">{row.draftsman}</span>
                    )}
                  </td>

                  <td className="p-4 text-center text-ink-600">
                    {typeof row.onlinePortal === "boolean" ? (
                      row.onlinePortal ? (
                        <Check className="w-4 h-4 text-success-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-red-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs font-medium text-ink-500">{row.onlinePortal}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
