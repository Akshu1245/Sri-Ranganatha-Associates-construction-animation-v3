"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section className="relative py-20 lg:py-28 bg-paper-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold mb-3">
            What clients say
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-700 leading-tight">
            1000+ families built
            <br />
            <span className="text-amber-500">with us.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative bg-white rounded-2xl p-6 sm:p-8 border border-paper-300 card-lift"
            >
              <Quote className="absolute top-5 right-5 w-10 h-10 text-paper-300" />

              {/* Stars */}
              <div className="flex gap-1 text-amber-400 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4" fill="currentColor" />
                ))}
              </div>

              <blockquote className="text-ink-900 text-lg leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-navy-600 to-amber-400 text-white flex items-center justify-center font-display font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-navy-700">{t.name}</div>
                  <div className="text-sm text-ink-500">{t.place}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
