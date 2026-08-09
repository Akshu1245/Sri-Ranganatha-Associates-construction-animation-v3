"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, ShieldCheck, MapPin, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function FounderSection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-b border-paper-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative max-w-md mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/30 to-navy-600/30 rounded-3xl blur-lg" />
              <div className="relative bg-navy-900 text-white rounded-3xl p-8 shadow-2xl overflow-hidden border border-navy-700">
                <div className="absolute inset-0 bg-blueprint-dark opacity-40 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-amber-400 text-navy-950 font-display font-bold text-3xl flex items-center justify-center shadow-lg mb-6">
                    MR
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider mb-2">
                    Principal Civil Engineer
                  </div>

                  <h3 className="font-display text-3xl font-bold text-white">
                    Er. M Ravikumar
                  </h3>
                  <p className="text-paper-200 text-sm mt-1">
                    B.E. (Civil) · Registered Engineer & Empanelled Valuer
                  </p>

                  <div className="mt-6 pt-6 border-t border-navy-700/80 space-y-3 text-xs text-paper-200">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>20+ Years Active Field Experience in Bengaluru</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Approved Valuer for Major PSU Banks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Office: Cauvery Complex, Halasru</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs font-semibold mb-4">
              <span>Direct Engineering Leadership</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-700 leading-tight">
              Personal oversight on every plan, sanction, & structural drawing.
            </h2>

            <p className="mt-5 text-ink-700 text-lg leading-relaxed">
              At Sri Ranganatha Associates, your project isn&apos;t passed down to junior freelancers. Founder and Principal Engineer **M Ravikumar** personally reviews site measurements, setback compliance, and AutoDCR drawing files.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { title: "BBMP & BDA Compliant", desc: "Drawings drafted to strict local civic bylaws and road width norms." },
                { title: "Direct Office Access", desc: "Walk in to our Halasru office opposite Metro Station to meet in person." },
                { title: "IS 456 Structural Detailing", desc: "Reinforcement schedules engineered specifically for Karnataka soil & seismic zone." },
                { title: "Bank Empanelled Valuations", desc: "Valuation certificates stamped and accepted by SBI, Canara Bank, and HDFC." },
              ].map((item) => (
                <div key={item.title} className="p-4 bg-paper-100 border border-paper-300 rounded-xl">
                  <div className="flex items-center gap-2 text-navy-700 font-semibold text-base mb-1">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-ink-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${BRAND.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-navy-600 hover:bg-navy-700 text-white font-semibold text-sm rounded-xl shadow-blueprint transition-colors"
              >
                <Phone className="w-4 h-4" />
                Speak with Principal Engineer
              </a>
              <a
                href={BRAND.whatsappPrefilled}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-success-500 hover:bg-success-600 text-white font-semibold text-sm rounded-xl shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Office Direct
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
