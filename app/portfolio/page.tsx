"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Tag, Filter } from "lucide-react";
import { getPortfolio, type PortfolioItem } from "@/lib/admin-store";

const CATEGORIES = ["All", "Residential", "Commercial", "Working Plan", "Brand"];

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [active, setActive] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    setPortfolio(getPortfolio().sort((a, b) => a.order - b.order));
  }, []);

  const filtered = active === "All"
    ? portfolio
    : portfolio.filter((p) => p.category === active);

  const close = () => setLightboxIdx(null);
  const next = () => setLightboxIdx((i) => (i === null ? null : (i + 1) % filtered.length));
  const prev = () => setLightboxIdx((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));

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
  }, [lightboxIdx, filtered.length]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-dark opacity-50" aria-hidden="true" />
        <div className="absolute inset-0 bg-blueprint-radial opacity-60" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold mb-3">
            Selected projects
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Our <span className="text-amber-400">portfolio.</span>
          </h1>
          <p className="mt-6 text-lg text-paper-200 max-w-2xl">
            Every image below is a real project — drawn, sanctioned, and in some cases already built.
            Click any image to see it large.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-16 lg:top-20 z-30 bg-paper-100/95 backdrop-blur-md border-b border-paper-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3 overflow-x-auto">
          <Filter className="w-4 h-4 text-ink-500 flex-shrink-0" />
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                active === c
                  ? "bg-navy-600 text-white"
                  : "bg-paper-200 text-ink-700 hover:bg-paper-300"
              }`}
            >
              {c}
              {c !== "All" && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({portfolio.filter((p) => p.category === c).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12 lg:py-16 bg-paper-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                onClick={() => setLightboxIdx(i)}
                className="group text-left bg-white border border-paper-300 rounded-2xl overflow-hidden card-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-navy-700">
                    {item.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-navy-700 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-700 line-clamp-2 mb-3">{item.description}</p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {item.type}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-ink-500">
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

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
            className="max-w-6xl w-full flex flex-col lg:flex-row gap-6 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIdx].image}
              alt={filtered[lightboxIdx].title}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg flex-shrink-0"
            />
            <div className="text-white lg:max-w-sm">
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">
                {filtered[lightboxIdx].category}
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">
                {filtered[lightboxIdx].title}
              </h3>
              <p className="text-paper-200 text-sm mb-4">
                {filtered[lightboxIdx].description}
              </p>
              <div className="space-y-1.5 text-sm text-paper-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  {filtered[lightboxIdx].location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  {filtered[lightboxIdx].year}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {filtered[lightboxIdx].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs bg-white/10 text-paper-200 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
