"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-navy-600 shadow-2xl ring-1 ring-white/10"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-blueprint-dark opacity-60" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, rgba(232,160,32,0.25), transparent 60%)",
            }}
            aria-hidden="true"
          />

          <div className="relative p-8 sm:p-12 lg:p-16 text-center text-white">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Planning to build in Bengaluru?
            </h2>
            <p className="mt-4 text-paper-200 text-lg max-w-2xl mx-auto">
              Visit our office in Halasru or send us your plot details. We review site measurements, BBMP/BDA bylaws, and structural requirements.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${BRAND.phone}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-amber-400 hover:bg-amber-500 text-navy-900 font-semibold rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call {BRAND.phone}
              </a>
              <a
                href={BRAND.whatsappPrefilled}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-success-500 hover:bg-success-500/90 text-white font-semibold rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-paper-300/40 hover:border-amber-400 hover:text-amber-400 text-white font-semibold rounded-lg transition-colors"
              >
                Send Enquiry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="mt-6 text-xs text-paper-300/70">
              Office open Mon–Sat, 9:00 AM – 6:00 PM · Opposite Halasru Metro Station
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
