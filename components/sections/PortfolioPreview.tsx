"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getPortfolio, type PortfolioItem } from "@/lib/admin-store";

export default function PortfolioPreview() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    setItems(
      getPortfolio()
        .filter((p) => p.image !== "/portfolio/flyer-brand.jpg")
        .sort((a, b) => a.order - b.order)
        .slice(0, 6)
    );
  }, []);

  const PREVIEW_ITEMS = items;

  const close = () => setLightboxIdx(null);
  const next = () => setLightboxIdx((i) => (i === null ? null : (i + 1) % PREVIEW_ITEMS.length));
  const prev = () => setLightboxIdx((i) => (i === null ? null : (i - 1 + PREVIEW_ITEMS.length) % PREVIEW_ITEMS.length));

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIdx]);

  return (
    <section className="relative py-20 lg:py-28 bg-navy-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-dark opacity-50" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold mb-3">
              Selected work
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              3D elevations
              <br />
              <span className="text-amber-400">that get sanctioned.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-6 lg:col-start-7 self-end"
          >
            <p className="text-paper-200 text-lg leading-relaxed">
              What your neighbours will see. What you&apos;ll live with. {PREVIEW_ITEMS.length}+
              {" "}projects and counting — from 30×40 homes to 4-floor apartment blocks.
            </p>
          </motion.div>
        </div>

        {/* Masonry-ish grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {PREVIEW_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              onClick={() => setLightboxIdx(i)}
              className={`group relative overflow-hidden rounded-xl bg-navy-800 ${
                i === 0 ? "md:row-span-2 md:aspect-[3/4]" : "aspect-[4/3]"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/0 to-transparent" />
              <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-left">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-300 mb-1">
                  {item.category}
                </div>
                <div className="font-display text-sm sm:text-lg font-semibold leading-snug">
                  {item.title}
                </div>
                <div className="hidden sm:flex items-center gap-1 text-xs text-paper-200 mt-1">
                  {item.year}
                </div>
              </div>
              {/* Hover ring */}
              <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-amber-400 ring-inset rounded-xl transition-all" />
            </motion.button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-navy-900 font-semibold rounded-lg transition-colors"
          >
            See all projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="lightbox-overlay" onClick={close}>
          <button
            onClick={close}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div
            className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={PREVIEW_ITEMS[lightboxIdx].image}
              alt={PREVIEW_ITEMS[lightboxIdx].title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <div className="font-display text-xl font-semibold">
                {PREVIEW_ITEMS[lightboxIdx].title}
              </div>
              <div className="text-paper-200 text-sm mt-1">
                {PREVIEW_ITEMS[lightboxIdx].year}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
