"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 250;

const chapters = [
  { label: "01", title: "The plan begins", text: "Every strong project starts with a clear, considered plan." },
  { label: "02", title: "Structure with purpose", text: "From foundations to form, every detail is engineered to work." },
  { label: "03", title: "Designed for life", text: "Your vision takes shape as a building made for the way you live." },
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
      const ratio = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const width = image.naturalWidth * ratio;
      const height = image.naturalHeight * ratio;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      const progress = Math.max(0, Math.min(1, (window.scrollY - section.offsetTop) / Math.max(1, section.offsetHeight - window.innerHeight)));
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
    // Keep the first paint light. The complete sequence is requested only when
    // the cinematic section approaches the viewport.
    for (let index = 1; index < 12; index += 1) loadFrame(index);

    const sectionObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      for (let index = 12; index < FRAME_COUNT; index += 1) loadFrame(index);
      sectionObserver.disconnect();
    }, { rootMargin: "1200px 0px" });
    sectionObserver.observe(section);

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const progress = Math.max(0, Math.min(1, (window.scrollY - section.offsetTop) / Math.max(1, section.offsetHeight - window.innerHeight)));
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
    <section ref={sectionRef} className="relative bg-navy-900 text-white" style={{ height: "360vh" }} aria-label="From plan to completed building">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/30 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-12">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">From plan to possession</p>
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-6xl">Every landmark begins as a line on paper.</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper-200 sm:text-lg">Watch a carefully planned vision become a complete, buildable home.</p>
            <div className="mt-10 space-y-5">
              {chapters.map((chapter, index) => (
                <div key={chapter.label} className={`border-l-2 pl-4 transition-all duration-500 ${activeChapter === index ? "border-amber-300 opacity-100" : "border-white/20 opacity-45"}`}>
                  <p className="text-xs font-semibold tracking-[0.2em] text-amber-300">{chapter.label} / {chapter.title}</p>
                  <p className="mt-1 text-sm text-paper-200">{chapter.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-paper-300"><span className="h-px w-10 bg-amber-300" /> Scroll to build</div>
          </div>
        </div>
      </div>
    </section>
  );
}
