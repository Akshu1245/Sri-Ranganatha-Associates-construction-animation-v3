"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, MessageCircle, ShieldCheck, Layers, Play, Pause } from "lucide-react";
import { BRAND } from "@/lib/constants";

const FRAME_COUNT = 250;

const chapters = [
  {
    label: "01",
    title: "Architectural CAD Drafting",
    text: "Floor plan drawings with exact site measurements, setbacks, room layouts & Vastu compliance.",
    phase: "Phase 1: Blueprint & Setbacks",
  },
  {
    label: "02",
    title: "IS 456 Structural Detailing",
    text: "Engineered footing, column, plinth beam & slab reinforcement schedules for Karnataka soil.",
    phase: "Phase 2: IS 456 Structural Detailing",
  },
  {
    label: "03",
    title: "BBMP & BDA Sanction Filing",
    text: "AutoDCR digital CAD conversion, online portal submission, and civic objection resolution.",
    phase: "Phase 3: Civic Sanction Approval",
  },
];

export default function ConstructionJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [activeChapter, setActiveChapter] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
      const frameIdx = Math.round(progress * (FRAME_COUNT - 1));
      draw(frameIdx);
      setCurrentFrame(frameIdx + 1);
      setProgressPercent(Math.round(progress * 100));
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
    for (let index = 1; index < 20; index += 1) loadFrame(index);

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        for (let index = 20; index < FRAME_COUNT; index += 1) loadFrame(index);
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
        setCurrentFrame(target + 1);
        setProgressPercent(Math.round(progress * 100));
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

  const toggleAutoPlay = () => {
    if (isPlaying) {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      let frame = currentFrame - 1;
      playIntervalRef.current = setInterval(() => {
        frame = (frame + 1) % FRAME_COUNT;
        setCurrentFrame(frame + 1);
        setProgressPercent(Math.round((frame / (FRAME_COUNT - 1)) * 100));
        setActiveChapter(frame < 85 ? 0 : frame < 170 ? 1 : 2);

        // draw on canvas
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext("2d");
          const img = imagesRef.current[frame];
          if (context && img?.complete && img.naturalWidth) {
            const ratio = Math.max(
              canvas.width / img.naturalWidth,
              canvas.height / img.naturalHeight
            );
            const w = img.naturalWidth * ratio;
            const h = img.naturalHeight * ratio;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
          }
        }
      }, 50);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-950 text-white pt-16 lg:pt-20"
      style={{ height: "340vh" }}
      aria-label="Civil engineering workflow animation hero"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Full-contrast canvas animation background (opacity 100%) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity"
          aria-hidden="true"
        />

        {/* Soft, targeted gradient overlay (keeps video visible while maintaining readable text) */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/45 to-navy-950/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/40" />

        {/* Content container */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-12 py-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
            {/* Left Column: Hero Text & Controls */}
            <div className="lg:col-span-7 max-w-2xl">
              {/* Top pill badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider mb-5 shadow-lg backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Halasru, Bengaluru · Est. 2006 · 500+ Sanctioned Plans</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-lg">
                From site measurement to <span className="text-amber-400">sanctioned plan.</span>
              </h1>

              {/* Subheading */}
              <p className="mt-4 text-base sm:text-lg text-paper-100 leading-relaxed max-w-xl drop-shadow-sm font-medium">
                Registered civil engineers & approved valuers in Cauvery Complex, Halasru. Architectural CAD drawings, BBMP AutoDCR online plan sanctions, IS 456 structural details, and bank valuation reports.
              </p>

              {/* High-converting CTAs */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-amber-400 hover:bg-amber-500 text-navy-950 font-bold rounded-xl shadow-blueprint transition-all"
                >
                  Request Plan Review
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/calculator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-navy-900/90 hover:bg-navy-800 text-white border border-navy-600 font-bold rounded-xl shadow-blueprint backdrop-blur-md transition-all"
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
                  WhatsApp
                </a>
              </div>

              {/* Workflow steps accordion */}
              <div className="mt-8 space-y-2.5 border-t border-white/15 pt-5 max-w-xl">
                {chapters.map((chapter, index) => (
                  <div
                    key={chapter.label}
                    className={`border-l-2 pl-3.5 transition-all duration-300 ${
                      activeChapter === index
                        ? "border-amber-400 bg-navy-900/80 p-3 rounded-r-xl shadow-lg border-l-4"
                        : "border-white/20 opacity-60 hover:opacity-80"
                    }`}
                  >
                    <p className="text-xs font-bold tracking-[0.2em] text-amber-300">
                      {chapter.label} / {chapter.title}
                    </p>
                    <p className="mt-0.5 text-xs text-paper-200 leading-relaxed">
                      {chapter.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Live Build Progress Dashboard & Auto-Play Control */}
            <div className="lg:col-span-5 flex flex-col items-end justify-center space-y-4">
              {/* Glassmorphic Live Progress Control Card */}
              <div className="w-full max-w-sm bg-navy-900/85 backdrop-blur-md border border-navy-700/80 rounded-2xl p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <Layers className="w-4 h-4" />
                    <span>3D Build Sequence</span>
                  </div>
                  <button
                    type="button"
                    onClick={toggleAutoPlay}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-500 text-navy-950 font-bold text-xs shadow-sm transition-colors"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" /> Auto-Play 250 Frames
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-paper-200 mb-1.5 font-medium">
                    <span>{chapters[activeChapter].phase}</span>
                    <span className="font-bold text-amber-300">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-navy-950 h-2.5 rounded-full overflow-hidden border border-navy-800">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-150"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-paper-300 border-t border-navy-800/80 pt-3">
                  <span>
                    Frame <strong className="text-white">{currentFrame}</strong> / {FRAME_COUNT}
                  </span>
                  <span className="text-amber-400 font-semibold">250 CAD Sequence</span>
                </div>
              </div>

              {/* Floating feature pills */}
              <div className="hidden lg:flex flex-col gap-2.5 items-end">
                <div className="bg-navy-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-navy-700 text-xs font-semibold text-paper-200 shadow-lg">
                  ⚡ AutoDCR Online Filing Ready
                </div>
                <div className="bg-navy-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-navy-700 text-xs font-semibold text-paper-200 shadow-lg">
                  📐 IS 456 Structural Reinforcement
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
