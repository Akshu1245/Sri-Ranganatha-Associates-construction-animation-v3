"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass, Stamp, Box, Layers, Calculator, FileText, Briefcase, Map, Utensils, Home, Wrench, ArrowRight, Sparkles, MessageCircle
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICES, BRAND } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  Compass, Stamp, Box, Layers, Calculator, FileText, Briefcase, Map, Utensils, Home, Wrench,
};

// Key featured services that get a "Popular" badge
const POPULAR_IDS = new Set(["online-sanction", "3d-elevations"]);

export default function ServicesGrid() {
  return (
    <section className="relative py-20 lg:py-28 bg-paper-100">
      {/* Subtle blueprint accent lines in background */}
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              What We Do
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-700 leading-tight">
              Civil engineering,
              <br />
              <span className="text-amber-500">end to end.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-6 lg:col-start-7 self-end"
          >
            <p className="text-ink-700 text-lg leading-relaxed">
              From the first plot survey to final civic sanction — every structural, architectural, and valuation requirement handled with precision under one roof in Halasru.
            </p>
          </motion.div>
        </div>

        {/* 12-Item Balanced 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Compass;
            const isAmber = s.color === "amber";
            const isPopular = POPULAR_IDS.has(s.id);

            return (
              <motion.div
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="group relative bg-white/95 backdrop-blur-sm border border-paper-300 hover:border-amber-400/80 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
              >
                {/* Accent top border strip */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 transition-colors duration-300 ${
                    isAmber ? "bg-amber-400 group-hover:bg-amber-500" : "bg-navy-600 group-hover:bg-navy-700"
                  }`}
                />

                <div>
                  {/* Header row with Icon & Popular Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                        isAmber
                          ? "bg-amber-50 text-amber-600 group-hover:bg-amber-400 group-hover:text-navy-950"
                          : "bg-navy-50 text-navy-600 group-hover:bg-navy-600 group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {isPopular && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 shadow-sm">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-navy-700 group-hover:text-navy-900 transition-colors mb-2">
                    {s.title}
                  </h3>

                  {/* Short desc */}
                  <p className="text-ink-700 text-sm leading-relaxed mb-4">
                    {s.shortDesc}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2 mb-6">
                    {s.bullets.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-xs text-ink-600">
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            isAmber ? "bg-amber-400" : "bg-navy-600"
                          }`}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer link */}
                <div className="pt-3 border-t border-paper-200/80">
                  <Link
                    href={`/contact?service=${s.id}`}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider group/link ${
                      isAmber
                        ? "text-amber-600 hover:text-amber-700"
                        : "text-navy-600 hover:text-navy-800"
                    }`}
                  >
                    Get a Quote
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Premium Executive Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 relative bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-navy-700/60 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="absolute inset-0 bg-blueprint-dark opacity-30 pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              Need a custom plan or specialized consultation?
            </h3>
            <p className="text-paper-200 text-sm sm:text-base max-w-xl">
              Talk directly with our registered civil engineers to discuss plot constraints, BBMP/BDA bylaws, or custom 3D requirements.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3.5 flex-shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-navy-950 font-semibold text-sm rounded-xl shadow-blueprint hover:shadow-amber-glow transition-all"
            >
              See All 12 Services
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={BRAND.whatsappPrefilled}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-success-500 hover:bg-success-600 text-white font-semibold text-sm rounded-xl shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Chief Engineer
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
