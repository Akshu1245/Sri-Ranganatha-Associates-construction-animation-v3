"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileCheck, MapPin, Compass, Hammer, Shield } from "lucide-react";
import { PROCESS_STEPS, BRAND } from "@/lib/constants";

const WHY_US = [
  {
    icon: FileCheck,
    title: "Zero re-file rate",
    desc: "Our plans are filed right the first time. The BBMP / BDA sanctions come through without back-and-forth.",
  },
  {
    icon: MapPin,
    title: "In-person site visits",
    desc: "We come to your site, walk it with you, understand the constraints — not just a phone-call consultancy.",
  },
  {
    icon: Compass,
    title: "Vastu-correct by default",
    desc: "Every plan is laid out for prosperity — without compromising on modern aesthetics.",
  },
  {
    icon: Hammer,
    title: "On-call support",
    desc: "Your contractor can call us with questions during construction. Free, for the lifetime of the project.",
  },
  {
    icon: Shield,
    title: "Bank-accepted valuation",
    desc: "Reports stamped and signed. Accepted by SBI, HDFC, ICICI, all PSU banks.",
  },
  {
    icon: CheckCircle2,
    title: "Fixed-fee pricing",
    desc: "Quote upfront, pay the same on delivery. No surprise bills.",
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-paper-100 overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold mb-3">
            How we work
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-navy-700 leading-[1.05] max-w-4xl">
            A process built on
            <br />
            <span className="text-amber-500">20 years of field work.</span>
          </h1>
          <p className="mt-6 text-lg text-ink-700 max-w-2xl">
            We don&apos;t outsource your plan. Ravi sir reviews every drawing. The same engineer who
            visits your site also handles the sanction filing. One point of contact, start to finish.
          </p>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-20 bg-paper-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="relative grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-6 items-start"
              >
                <div className="relative">
                  <div className="aspect-square w-20 sm:w-24 rounded-2xl bg-navy-600 text-white flex items-center justify-center shadow-blueprint">
                    <span className="font-display text-3xl sm:text-4xl font-bold">{step.n}</span>
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden sm:block absolute top-full left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-navy-600 to-amber-300" />
                  )}
                </div>
                <div className="pt-1">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-700 mb-2">
                    {step.title}
                  </h2>
                  <p className="text-ink-700 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 lg:py-24 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold mb-3">
              Why us
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              What makes us
              <br />
              <span className="text-amber-400">different.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-navy-800 border border-navy-700 rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-lg bg-amber-400 text-navy-900 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-paper-200 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-paper-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-navy-700 mb-4">
            Start the process today.
          </h2>
          <p className="text-ink-700 text-lg mb-8">
            One call, one site visit, one proposal. We&apos;ll do the rest.
          </p>
          <a
            href={`tel:${BRAND.phone}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg transition-colors"
          >
            Call {BRAND.phone}
          </a>
        </div>
      </section>
    </>
  );
}
