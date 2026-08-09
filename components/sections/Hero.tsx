"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-20 lg:pt-24 flex items-center overflow-hidden bg-paper-100">
      {/* Background layers */}
      <div className="absolute inset-0 bg-blueprint opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 bg-blueprint-radial" aria-hidden="true" />

      {/* Blueprint grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
        aria-hidden="true"
      >
        <motion.line
          x1="0"
          y1="200"
          x2="1200"
          y2="200"
          stroke="#1B3A6B"
          strokeWidth="1"
          strokeDasharray="1200"
          initial={{ strokeDashoffset: 1200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.8, delay: 0.2 }}
        />
        <motion.line
          x1="0"
          y1="600"
          x2="1200"
          y2="600"
          stroke="#1B3A6B"
          strokeWidth="1"
          strokeDasharray="1200"
          initial={{ strokeDashoffset: 1200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.8, delay: 0.5 }}
        />
        <motion.line
          x1="300"
          y1="0"
          x2="300"
          y2="800"
          stroke="#1B3A6B"
          strokeWidth="1"
          strokeDasharray="800"
          initial={{ strokeDashoffset: 800 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.8, delay: 0.7 }}
        />
        <motion.line
          x1="900"
          y1="0"
          x2="900"
          y2="800"
          stroke="#1B3A6B"
          strokeWidth="1"
          strokeDasharray="800"
          initial={{ strokeDashoffset: 800 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.8, delay: 0.9 }}
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            {/* Top pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs font-semibold mb-6"
            >
              <span>Halasru, Bengaluru · Est. 2006 · 500+ Sanctioned Plans</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-navy-700 leading-[1.1] tracking-tight"
            >
              Building Plans,
              <br />
              <span className="text-amber-500">BBMP & BDA Sanctions,</span>
              <br />
              3D Elevations & Valuations
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 text-lg text-ink-700 max-w-2xl leading-relaxed"
            >
              Registered civil engineers and approved valuers based in Cauvery Complex, Halasru. We prepare architectural CAD drawings, file BBMP online plan sanctions, draw IS 456 structural reinforcement schedules, and issue property valuation reports.
            </motion.p>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink-700"
            >
              {[
                "BBMP AutoDCR Filing",
                "BDA & BMRDA Approvals",
                "Vastu Floor Plans",
                "Bank Valuation Reports",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-success-500" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg shadow-blueprint transition-all"
              >
                Request Plan Review
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border-2 border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white font-semibold rounded-lg transition-colors"
              >
                View Project Drawings
              </Link>
              <a
                href={`tel:${BRAND.phone}`}
                className="sm:hidden inline-flex items-center justify-center gap-2 px-7 py-4 border border-paper-300 text-ink-700 hover:bg-paper-200 font-semibold rounded-lg"
              >
                <Phone className="w-4 h-4" />
                Call Office
              </a>
            </motion.div>

            {/* Proof bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 flex items-center gap-4 text-sm"
            >
              <div className="flex -space-x-2">
                {["#1B3A6B", "#E8A020", "#163057", "#D08A12"].map((c, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-paper-100"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                  ★★★★★
                </div>
                <div className="text-ink-600 text-xs sm:text-sm">
                  1000+ building plans & valuations completed across Bengaluru
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-amber-300/40 rounded-2xl" />
              <div className="absolute -inset-2 bg-blueprint-dark rounded-2xl" />

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/portfolio/elevations/elevation-residential-modern.jpg"
                  alt="3D Elevation render for G+3 residential building in Halasru Bengaluru"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/0 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-xs uppercase tracking-wider text-amber-300 mb-1">
                    Sample Project
                  </div>
                  <div className="font-display text-2xl font-semibold">
                    G+3 Residential Elevation
                  </div>
                  <div className="text-paper-200 text-sm mt-1">
                    30×40 Plot · Halasru, Bengaluru
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 border border-paper-300">
                <div className="text-xs text-ink-500">Average Sanction</div>
                <div className="font-display text-xl font-bold text-navy-700">
                  4 – 6 Weeks
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-navy-600 text-white rounded-xl shadow-xl px-4 py-3">
                <div className="text-xs text-paper-200">Filing Authority</div>
                <div className="font-display text-base font-bold">
                  BBMP · BDA · BMRDA
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
