"use client";

import { useEffect, useRef } from "react";

const videos = [
  { src: "/construction/videos/video-2.mp4", eyebrow: "02 / Structure", title: "See what makes the plan strong.", text: "A considered design is supported by structure, detail and engineering discipline." },
  { src: "/construction/videos/video-3.mp4", eyebrow: "03 / Approval", title: "From drawing to direction.", text: "Clear planning helps your project move forward with confidence." },
  { src: "/construction/videos/video-4.mp4", eyebrow: "04 / Design", title: "Form follows your vision.", text: "Materials, proportions and elevation details come together with purpose." },
  { src: "/construction/videos/video-5.mp4", eyebrow: "05 / Site planning", title: "Every part of the site matters.", text: "A complete view of the building, access, landscape and space around it." },
  { src: "/construction/videos/video-6.mp4", eyebrow: "06 / Reality", title: "Your idea, made real.", text: "From the first line to the finished building, we help you move forward." },
];

export default function CinematicConstructionVideos() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      }),
      { threshold: 0.35 },
    );
    videoRefs.current.forEach((video) => video && observer.observe(video));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-paper-100" aria-label="Construction journey details">
      <div className="bg-navy-900 px-5 py-16 text-center text-white sm:px-8 lg:px-12 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">The journey continues</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">Planned with clarity. Built with confidence.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-paper-200">A closer look at the decisions, structure and design thinking behind every project.</p>
      </div>
      {videos.map((video, index) => (
        <div key={video.src} className={`relative overflow-hidden ${index % 2 ? "bg-navy-900 text-white" : "bg-paper-100 text-ink-900"}`}>
          <div className="mx-auto grid min-h-[70vh] max-w-7xl items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
            <div className={index % 2 ? "lg:order-2" : ""}>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500">{video.eyebrow}</p>
              <h3 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{video.title}</h3>
              <p className={`mt-5 max-w-md text-lg leading-relaxed ${index % 2 ? "text-paper-200" : "text-ink-700"}`}>{video.text}</p>
            </div>
            <div className={`relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 ${index % 2 ? "lg:order-1" : ""}`}>
              <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/30 bg-navy-950/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">Sri Ranganatha Associates</div>
              <video ref={(video) => { videoRefs.current[index] = video; }} className="aspect-video w-full object-cover" muted playsInline loop preload="metadata" poster="/portfolio/elevations/elevation-residential-modern.jpg">
                <source src={video.src} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
