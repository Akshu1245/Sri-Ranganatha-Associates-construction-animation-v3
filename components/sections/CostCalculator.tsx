"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, Check, Info, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function CostCalculator() {
  const [plotType, setPlotType] = useState<"30x40" | "40x60" | "50x80" | "custom">("30x40");
  const [customSqft, setCustomSqft] = useState<number>(1200);
  const [floors, setFloors] = useState<number>(3); // G+2 (3 floors)
  const [needSanction, setNeedSanction] = useState<boolean>(true);
  const [need3D, setNeed3D] = useState<boolean>(true);
  const [needStructure, setNeedStructure] = useState<boolean>(true);
  const [needValuation, setNeedValuation] = useState<boolean>(false);

  const plotArea =
    plotType === "30x40" ? 1200 : plotType === "40x60" ? 2400 : plotType === "50x80" ? 4000 : customSqft;

  // Approximate total built-up area assuming 75% coverage per floor
  const estimatedBuiltupSqft = Math.round(plotArea * 0.75 * floors);

  return (
    <section className="py-20 lg:py-28 bg-paper-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-4 h-4 text-amber-600" />
            Interactive Engineering Estimator
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-navy-700 leading-tight">
            Estimate your building plan & sanction scope in 30 seconds.
          </h2>

          <p className="mt-4 text-ink-700 text-base sm:text-lg">
            Select your plot measurements and floor configuration to view estimated built-up area and required drawing deliverables.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls column */}
          <div className="lg:col-span-7 bg-white border border-paper-300 rounded-3xl p-6 sm:p-8 shadow-blueprint space-y-6">
            {/* Step 1: Plot Size */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-3">
                1. Select Plot Dimension
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "30x40", label: "30 × 40", area: "1,200 sq.ft" },
                  { id: "40x60", label: "40 × 60", area: "2,400 sq.ft" },
                  { id: "50x80", label: "50 × 80", area: "4,000 sq.ft" },
                  { id: "custom", label: "Custom", area: "Enter sq.ft" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlotType(p.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      plotType === p.id
                        ? "border-navy-600 bg-navy-50 ring-2 ring-navy-600/10"
                        : "border-paper-300 hover:border-paper-400 bg-white"
                    }`}
                  >
                    <div className="font-bold text-navy-700 text-sm">{p.label}</div>
                    <div className="text-ink-500 text-xs mt-0.5">{p.area}</div>
                  </button>
                ))}
              </div>

              {plotType === "custom" && (
                <div className="mt-3">
                  <input
                    type="number"
                    value={customSqft}
                    onChange={(e) => setCustomSqft(Math.max(100, Number(e.target.value)))}
                    className="w-full px-4 py-2.5 border border-paper-300 rounded-lg text-sm outline-none focus:border-navy-600"
                    placeholder="Enter total plot area in sq.ft"
                  />
                </div>
              )}
            </div>

            {/* Step 2: Number of Floors */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-700">
                  2. Floor Configuration
                </label>
                <span className="text-xs font-bold text-amber-600">
                  {floors === 1 ? "Ground Only (G)" : `G + ${floors - 1} Floors (${floors} total levels)`}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFloors(f)}
                    className={`py-3 rounded-xl border text-center font-bold text-sm transition-all ${
                      floors === f
                        ? "border-navy-600 bg-navy-600 text-white shadow-sm"
                        : "border-paper-300 hover:border-paper-400 bg-white text-navy-700"
                    }`}
                  >
                    {f === 1 ? "G Only" : `G+${f - 1}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Required Engineering Deliverables */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-3">
                3. Select Required Services
              </label>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {[
                  { state: needSanction, set: setNeedSanction, title: "BBMP / BDA Online Sanction", sub: "AutoDCR approval filing" },
                  { state: need3D, set: setNeed3D, title: "3D Elevation Model", sub: "High-res exterior render" },
                  { state: needStructure, set: setNeedStructure, title: "IS 456 Structure Detailing", sub: "Beam, column & slab schedules" },
                  { state: needValuation, set: setNeedValuation, title: "Bank Valuation / BOQ", sub: "Home loan estimation report" },
                ].map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => item.set(!item.state)}
                    className={`p-3 rounded-xl border flex items-start gap-3 text-left transition-all ${
                      item.state
                        ? "border-amber-400 bg-amber-50/60"
                        : "border-paper-300 hover:border-paper-400 bg-white"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        item.state ? "bg-amber-500 text-navy-950" : "border border-paper-400"
                      }`}
                    >
                      {item.state && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-navy-700">{item.title}</div>
                      <div className="text-[11px] text-ink-500">{item.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-navy-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-navy-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-blueprint-dark opacity-50 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
                Estimated Scope Summary
              </div>

              <div className="p-4 rounded-2xl bg-navy-800/90 border border-navy-700">
                <div className="text-xs text-paper-300 uppercase tracking-wider">Plot Area</div>
                <div className="font-display text-2xl font-bold text-amber-400 mt-0.5">
                  {plotArea.toLocaleString()} <span className="text-sm font-normal text-paper-200">sq.ft</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-navy-800/90 border border-navy-700">
                <div className="text-xs text-paper-300 uppercase tracking-wider">Estimated Built-Up Area</div>
                <div className="font-display text-3xl font-bold text-white mt-0.5">
                  ~{estimatedBuiltupSqft.toLocaleString()} <span className="text-sm font-normal text-paper-200">sq.ft</span>
                </div>
                <div className="text-[11px] text-paper-300 mt-1 flex items-center gap-1">
                  <Info className="w-3 h-3 text-amber-400" />
                  Calculated based on standard BBMP setback & coverage rules.
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-paper-300 mb-2">
                  Included Deliverables:
                </div>
                <ul className="space-y-1.5 text-xs text-paper-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>CAD Floor Plans & Section Drawings</span>
                  </li>
                  {needSanction && (
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>AutoDCR Sanction Drawing Filing Set</span>
                    </li>
                  )}
                  {need3D && (
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>4K 3D Exterior Elevation Views</span>
                    </li>
                  )}
                  {needStructure && (
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>IS 456 Reinforcement Schedules</span>
                    </li>
                  )}
                  {needValuation && (
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>Bank Loan Valuation Report</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="pt-4 border-t border-navy-700 space-y-3">
                <Link
                  href={`/contact?plot=${plotType}&floors=${floors}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-amber-400 hover:bg-amber-500 text-navy-950 font-bold rounded-xl shadow-blueprint transition-colors"
                >
                  Request Official Written Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/919448537346?text=${encodeURIComponent(
                    `Hi, I need a quote for a ${plotType} plot (${floors === 1 ? "Ground Only" : `G+${floors - 1}`}) in Bengaluru.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-success-500 hover:bg-success-600 text-white font-semibold text-xs rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send Scope directly on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
