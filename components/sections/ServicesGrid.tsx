"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass, Stamp, Box, Layers, Calculator, FileText, Briefcase, Map, Utensils, ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICES, BRAND } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  Compass, Stamp, Box, Layers, Calculator, FileText, Briefcase, Map, Utensils,
};

export default function ServicesGrid() {
  return (
    <section className="relative py-20 lg:py-28 bg-paper-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold mb-3">
              What we do
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-700 leading-tight">
              Civil works,
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
              From the first line on a blank sheet to the day you hand over the keys, we&apos;re with you.
              Building plans, sanction, structure, valuation, on-site supervision — all under one roof in Halasru.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Compass;
            const isAmber = s.color === "amber";
            return (
              <motion.div
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group relative bg-white border border-paper-300 rounded-2xl p-6 card-lift overflow-hidden"
              >
                {/* Accent strip */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    isAmber ? "bg-amber-400" : "bg-navy-600"
                  }`}
                />

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    isAmber
                      ? "bg-amber-50 text-amber-600"
                      : "bg-navy-50 text-navy-600"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-navy-700 mb-2">
                  {s.title}
                </h3>

                {/* Short desc */}
                <p className="text-ink-700 text-sm leading-relaxed mb-4">
                  {s.shortDesc}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 mb-5">
                  {s.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-ink-500">
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          isAmber ? "bg-amber-400" : "bg-navy-600"
                        }`}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link
                  href={`/contact?service=${s.id}`}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold group/link ${
                    isAmber
                      ? "text-amber-600 hover:text-amber-700"
                      : "text-navy-600 hover:text-navy-700"
                  }`}
                >
                  Get a quote
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg transition-colors"
          >
            See all services in detail
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={BRAND.whatsappPrefilled}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy-600 hover:text-amber-600 font-semibold inline-flex items-center gap-2"
          >
            Or WhatsApp us your requirement →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
