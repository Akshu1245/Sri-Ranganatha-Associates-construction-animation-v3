"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-20 lg:pt-24 flex items-center overflow-hidden bg-paper-100">
      {/* Background layers */}
      <div className="absolute inset-0 bg-blueprint opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-blueprint-radial"
        aria-hidden="true"
      />

      {/* Animated blueprint SVG lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
        aria-hidden="true"
      >
        {/* Drawing lines that animate on load */}
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
        {/* Dimension marks */}
        {[200, 600].map((y) => (
          <motion.g
            key={y}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            <line x1="0" y1={y} x2="20" y2={y} stroke="#E8A020" strokeWidth="2" />
            <line x1="1180" y1={y} x2="1200" y2={y} stroke="#E8A020" strokeWidth="2" />
          </motion.g>
        ))}
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            {/* Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{BRAND.stats.plansSanctioned}+ Plans Sanctioned in Bengaluru</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-navy-700 leading-[1.05] tracking-tight"
            >
              Your building plan,
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">sanctioned.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute bottom-2 left-0 right-0 h-3 bg-amber-300/60 -z-0 origin-left"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 text-lg sm:text-xl text-ink-700 max-w-2xl leading-relaxed"
            >
              <span className="font-semibold text-navy-600">Civil engineers, architects & approved valuers</span> in Halasru since 2006. From site visit to BBMP/BDA sanction — done. No queues. No hidden costs.
            </motion.p>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-700"
            >
              {["BBMP Online", "BDA / GBA / BMRDA", "Vastu Certified", "Bank Valuation Empanelled"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-success-500" />
                    <span>{item}</span>
                  </div>
                )
              )}
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
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg shadow-blueprint hover:shadow-amber-glow transition-all"
              >
                Get Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border-2 border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white font-semibold rounded-lg transition-colors"
              >
                View Our Work
              </Link>
              <a
                href={`tel:${BRAND.phone}`}
                className="sm:hidden inline-flex items-center justify-center gap-2 px-7 py-4 border border-paper-300 text-ink-700 hover:bg-paper-200 font-semibold rounded-lg"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </motion.div>

            {/* Mini proof */}
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
                <div className="text-ink-500">
                  Rated 4.9/5 by 750+ Bengaluru families
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border-2 border-amber-300/40 rounded-2xl" />
              <div className="absolute -inset-2 bg-blueprint-dark rounded-2xl" />

              {/* Main image card */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/portfolio/elevations/elevation-residential-modern.jpg"
                  alt="Modern residential 3D elevation by Sri Ranganatha Associates"
                  className="w-full h-full object-cover"
                />
                {/* Overlay info */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/0 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-xs uppercase tracking-wider text-amber-300 mb-1">
                    Featured Project
                  </div>
                  <div className="font-display text-2xl font-semibold">
                    Modern Residential Elevation
                  </div>
                  <div className="text-paper-200 text-sm mt-1">
                    G+3 • 30×40 plot • Halasru, Bengaluru
                  </div>
                </div>
              </div>

              {/* Floating badge — top left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 border border-paper-300"
              >
                <div className="text-xs text-ink-500">Sanction Time</div>
                <div className="font-display text-2xl font-bold text-navy-600">
                  6 weeks
                </div>
              </motion.div>

              {/* Floating badge — bottom right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-navy-600 text-white rounded-xl shadow-xl px-4 py-3"
              >
                <div className="text-xs text-paper-200">Approved by</div>
                <div className="font-display text-lg font-bold">
                  BBMP · BDA · GBA
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-ink-500 text-xs"
      >
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="mt-2 w-px h-8 bg-ink-500/40"
        />
      </motion.div>
    </section>
  );
}
