"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, MessageCircle, ShieldCheck, CheckCircle2 } from "lucide-react";
import { BRAND } from "@/lib/constants";

const FRAME_COUNT = 250;

const chapters = [
  {
    label: "01",
    title: "Architectural CAD Drafting",
    text: "Floor plan drawings with exact site measurements, setbacks, room layouts & Vastu compliance.",
  },
  {
    label: "02",
    title: "IS 456 Structural Detailing",
    text: "Engineered footing, column, plinth beam & slab reinforcement schedules for Karnataka soil.",
  },
  {
    label: "03",
    title: "BBMP & BDA Sanction Filing",
    text: "AutoDCR digital CAD conversion, online portal submission, and civic objection resolution.",
  },
];

export default function ConstructionJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const frameUrl = (index: number) =>
      `/construction/video-1/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

    let lastDrawn = 0;
    const draw = (index: number) => {
      const image = imagesRef.current[index] || imagesRef.current[lastDrawn];
      if (!image?.complete || !image.naturalWidth) return;
      lastDrawn = index;
      const ratio = Math.max(
        canvas.width / image.naturalWidth,
        canvas.height / image.naturalHeight
      );
      const width = image.naturalWidth * ratio;
      const height = image.naturalHeight * ratio;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image,
        (canvas.width - width) / 2,
        (canvas.height - height) / 2,
        width,
        height
      );
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      const progress = Math.max(
        0,
        Math.min(
          1,
          (window.scrollY - section.offsetTop) /
            Math.max(1, section.offsetHeight - window.innerHeight)
        )
      );
      draw(Math.round(progress * (FRAME_COUNT - 1)));
    };

    const loadFrame = (index: number) => {
      if (imagesRef.current[index]) return;
      const image = new Image();
      image.decoding = "async";
      image.src = frameUrl(index);
      image.onload = () => draw(index === 0 ? 0 : lastDrawn);
      imagesRef.current[index] = image;
    };

    loadFrame(0);
    for (let index = 1; index < 15; index += 1) loadFrame(index);

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        for (let index = 15; index < FRAME_COUNT; index += 1) loadFrame(index);
        sectionObserver.disconnect();
      },
      { rootMargin: "1200px 0px" }
    );
    sectionObserver.observe(section);

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const progress = Math.max(
          0,
          Math.min(
            1,
            (window.scrollY - section.offsetTop) /
              Math.max(1, section.offsetHeight - window.innerHeight)
          )
        );
        const target = Math.round(progress * (FRAME_COUNT - 1));
        loadFrame(target);
        draw(target);
        setActiveChapter(progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2);
        ticking = false;
      });
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-950 text-white pt-16 lg:pt-20"
      style={{ height: "340vh" }}
      aria-label="Civil engineering workflow animation hero"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Canvas animation background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          aria-hidden="true"
        />

        {/* Gradient dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-950/40" />
        <div className="absolute inset-0 bg-blueprint-dark opacity-30 pointer-events-none" />

        {/* Content container */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-12 py-12">
          <div className="max-w-2xl">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-semibold uppercase tracking-wider mb-6 shadow-lg backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Halasru, Bengaluru · Est. 2006 · 500+ Sanctioned Plans</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-md">
              From site measurement to <span className="text-amber-400">sanctioned plan.</span>
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-base sm:text-lg text-paper-200 leading-relaxed max-w-xl">
              Registered civil engineers & approved valuers in Cauvery Complex, Halasru. We draft architectural CAD drawings, file BBMP AutoDCR sanctions, prepare IS 456 structural details, and issue bank valuation reports.
            </p>

            {/* High-converting CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-amber-400 hover:bg-amber-500 text-navy-950 font-bold rounded-xl shadow-blueprint transition-all"
              >
                Request Plan Review
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-navy-800/90 hover:bg-navy-700 text-white border border-navy-600 font-bold rounded-xl shadow-blueprint backdrop-blur-sm transition-all"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                Estimate Scope (30s)
              </Link>

              <a
                href={BRAND.whatsappPrefilled}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-success-500 hover:bg-success-600 text-white font-bold rounded-xl shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Office
              </a>
            </div>

            {/* Workflow steps chapter accordion */}
            <div className="mt-10 space-y-3.5 border-t border-navy-800/80 pt-6">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.label}
                  className={`border-l-2 pl-4 transition-all duration-500 ${
                    activeChapter === index
                      ? "border-amber-400 opacity-100 bg-navy-900/60 p-3 rounded-r-xl"
                      : "border-white/20 opacity-50"
                  }`}
                >
                  <p className="text-xs font-bold tracking-[0.2em] text-amber-300">
                    {chapter.label} / {chapter.title}
                  </p>
                  <p className="mt-1 text-xs text-paper-200 leading-relaxed">{chapter.text}</p>
                </div>
              ))}
            </div>

            {/* Scroll animation prompt */}
            <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-paper-300">
              <span className="h-px w-10 bg-amber-400" />
              <span>Scroll to watch engineering construction progress</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
