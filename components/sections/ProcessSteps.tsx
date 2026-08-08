"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessSteps() {
  return (
    <section className="relative py-20 lg:py-28 bg-paper-100 overflow-hidden">
      {/* Ticker / blueprint grid background */}
      <div className="absolute inset-0 bg-blueprint opacity-40" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold mb-3">
            How it works
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-700 leading-tight">
            From plot to possession,
            <br />
            <span className="text-amber-500">in 5 steps.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative bg-white border border-paper-300 rounded-2xl p-6 text-center"
              >
                {/* Step number bubble */}
                <div className="relative mx-auto -mt-12 mb-4 w-20 h-20 rounded-full bg-navy-600 text-white flex items-center justify-center shadow-blueprint border-4 border-paper-100">
                  <span className="font-display text-2xl font-bold">{step.n}</span>
                </div>

                <h3 className="font-display text-lg font-semibold text-navy-700 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-700 leading-relaxed">{step.desc}</p>

                {/* Mobile connector */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="lg:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 w-px h-6 bg-amber-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-navy-600 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center gap-6"
        >
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-amber-400 text-navy-900 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="font-display text-xl font-semibold mb-1">
              Average BBMP sanction time: 4–6 weeks
            </div>
            <div className="text-paper-200 text-sm">
              Industry average is 12+ weeks. Our track record gets it done in 6, because we file
              correctly the first time.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
