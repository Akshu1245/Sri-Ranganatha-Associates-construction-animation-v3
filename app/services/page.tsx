"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Compass, Stamp, Box, Layers, Calculator, FileText, Briefcase, Map, Utensils, Home, Wrench, ArrowRight, Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICES, BRAND } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  Compass, Stamp, Box, Layers, Calculator, FileText, Briefcase, Map, Utensils, Home, Wrench,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-paper-100 overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden="true" />
        <div className="absolute inset-0 bg-blueprint-radial" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold mb-3">
              Our services
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-navy-700 leading-[1.05]">
              Everything you need,
              <br />
              <span className="text-amber-500">under one roof.</span>
            </h1>
            <p className="mt-6 text-lg text-ink-700 max-w-2xl">
              Whether you&apos;re building your first home, sanctioning a layout, or running a
              restaurant — we have a dedicated team for it. {SERVICES.length} services, 1 phone
              number.
            </p>
          </div>
        </div>
      </section>

      {/* Service list — alternate layouts */}
      <section className="py-20 lg:py-28 bg-paper-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] || Compass;
            const isAmber = service.color === "amber";
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  reverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text */}
                <div className={reverse ? "lg:order-2" : ""}>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 ${
                      isAmber
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-navy-50 text-navy-700 border border-navy-100"
                    }`}
                  >
                    <span>0{i + 1}</span>
                    <span>·</span>
                    <span>Service</span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-700 mb-3">
                    {service.title}
                  </h2>
                  <p className="text-ink-700 text-lg leading-relaxed mb-5">
                    {service.longDesc}
                  </p>

                  <ul className="space-y-2.5 mb-7">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-ink-700">
                        <div
                          className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isAmber ? "bg-amber-400 text-white" : "bg-navy-600 text-white"
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/contact?service=${service.id}`}
                      className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg transition-colors ${
                        isAmber
                          ? "bg-amber-400 hover:bg-amber-500 text-navy-900"
                          : "bg-navy-600 hover:bg-navy-700 text-white"
                      }`}
                    >
                      Get a quote
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={`https://wa.me/${BRAND.phoneRaw}?text=Hi%2C%20I%20need%20help%20with%3A%20${encodeURIComponent(
                        service.title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-paper-300 hover:border-navy-600 text-ink-700 hover:text-navy-600 font-semibold rounded-lg transition-colors"
                    >
                      WhatsApp about this
                    </a>
                  </div>
                </div>

                {/* Visual — icon card */}
                <div className={reverse ? "lg:order-1" : ""}>
                  <div
                    className={`relative aspect-square rounded-3xl overflow-hidden ${
                      isAmber
                        ? "bg-gradient-to-br from-amber-100 to-amber-50"
                        : "bg-gradient-to-br from-navy-700 to-navy-900"
                    } flex items-center justify-center`}
                  >
                    {/* Decorative grid */}
                    <div className="absolute inset-0 bg-blueprint opacity-20" aria-hidden="true" />

                    {/* Big icon */}
                    <div
                      className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl flex items-center justify-center ${
                        isAmber ? "bg-amber-400 text-navy-900" : "bg-amber-400 text-navy-900"
                      } shadow-blueprint`}
                    >
                      <Icon className="w-16 h-16 sm:w-20 sm:h-20" strokeWidth={1.5} />
                    </div>

                    {/* Corner number */}
                    <div
                      className={`absolute top-6 left-6 font-display text-7xl font-bold ${
                        isAmber ? "text-amber-400/40" : "text-amber-400/30"
                      }`}
                    >
                      0{i + 1}
                    </div>

                    {/* Bottom-right tag */}
                    <div
                      className={`absolute bottom-6 right-6 px-3 py-1.5 rounded-full text-xs font-semibold ${
                        isAmber
                          ? "bg-white/90 text-navy-700"
                          : "bg-paper-100/90 text-navy-700"
                      }`}
                    >
                      {service.title}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Pricing tease / CTA */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-paper-200 text-lg mb-8 max-w-2xl mx-auto">
            Tell us about your plot or project. We&apos;ll suggest the right combination — and tell you if you don&apos;t need all of them.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-amber-400 hover:bg-amber-500 text-navy-900 font-semibold rounded-lg transition-colors"
            >
              Get a consultation
            </Link>
            <a
              href={BRAND.whatsappPrefilled}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-paper-300/40 hover:border-amber-400 hover:text-amber-400 font-semibold rounded-lg transition-colors"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
