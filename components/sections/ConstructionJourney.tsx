"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/constants";

const FRAME_COUNT = 250;

const steps = [
  { label: "01", title: "Architectural Drafting" },
  { label: "02", title: "IS 456 Structure" },
  { label: "03", title: "BBMP & BDA Sanction" },
];

export default function ConstructionJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [activeStep, setActiveStep] = useState(0);

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

      // Perfectly frame the top of the building so roof is NEVER cut off by navbar:
      const y = height > canvas.height ? (canvas.height - height) * 0.12 : (canvas.height - height) / 2;
      const x = (canvas.width - width) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, x, y, width, height);
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
    for (let index = 1; index < 25; index += 1) loadFrame(index);

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        for (let index = 25; index < FRAME_COUNT; index += 1) loadFrame(index);
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
        setActiveStep(progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2);
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
      className="relative bg-navy-950 text-white"
      style={{ height: "240vh" }}
      aria-label="Civil engineering construction animation"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden pt-20 lg:pt-24">
        {/* Full 100% crisp video canvas with roof top offset framing */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover opacity-100"
          aria-hidden="true"
        />

        {/* Minimal soft vignette on the left text area only */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/30 pointer-events-none" />

        {/* Sleek minimal content overlay */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 sm:px-8 lg:px-12">
          <div className="max-w-xl">
            {/* Minimal top pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Halasru, Bengaluru · Est. 2006</span>
            </div>

            {/* Clean, high-impact headline */}
            <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-md">
              From site measurement to <span className="text-amber-400">sanctioned plan.</span>
            </h1>

            {/* Minimal one-line tagline */}
            <p className="mt-3.5 text-base sm:text-lg text-paper-200 font-medium">
              Registered Civil Engineers & Approved Valuers. Architectural CAD · BBMP/BDA Sanction · IS 456 Details.
            </p>

            {/* Dual CTAs */}
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-navy-950 font-bold text-sm rounded-xl shadow-blueprint transition-all"
              >
                Request Plan Review
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={BRAND.whatsappPrefilled}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-success-500 hover:bg-success-600 text-white font-bold text-sm rounded-xl shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            {/* Minimal progress steps indicator */}
            <div className="mt-8 flex items-center gap-4 text-xs">
              {steps.map((step, idx) => (
                <div
                  key={step.label}
                  className={`flex items-center gap-1.5 transition-all ${
                    activeStep === idx ? "text-amber-400 font-bold opacity-100" : "text-paper-300 opacity-50"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>
                    {step.label} {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal bottom scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-[10px] uppercase tracking-[0.25em] text-paper-300 opacity-70 pointer-events-none">
          <span>Scroll to play 3D construction</span>
        </div>
      </div>
    </section>
  );
}
