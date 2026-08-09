"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Video } from "lucide-react";

const videos = [
  {
    src: "/construction/videos/video-2.mp4",
    poster: "/portfolio/elevations/elevation-residential-modern.jpg",
    eyebrow: "01 / Architectural CAD Drafting",
    title: "Precision floor plans & Vastu compliance.",
    text: "Site measurements, setback calculations, and room layouts drafted for Bengaluru civic bylaws.",
  },
  {
    src: "/construction/videos/video-3.mp4",
    poster: "/portfolio/elevations/elevation-duplex-luxury.jpg",
    eyebrow: "02 / IS 456 Structural Detailing",
    title: "Reinforcement schedules built for safety.",
    text: "Footing, plinth beam, column, and slab structural drawings engineered to IS 456 standards.",
  },
  {
    src: "/construction/videos/video-4.mp4",
    poster: "/portfolio/elevations/elevation-commercial-plaza.jpg",
    eyebrow: "03 / BBMP & BDA Civic Approvals",
    title: "Sanction drawings ready for AutoDCR.",
    text: "Complete drawing set filing for BBMP, BDA, and BMRDA plan scrutiny and online sanction approval.",
  },
  {
    src: "/construction/videos/video-5.mp4",
    poster: "/portfolio/elevations/elevation-apartment-modern.jpg",
    eyebrow: "04 / 3D Exterior Elevations",
    title: "Visualization before construction.",
    text: "Photorealistic 3D exterior rendering models to visualize materials, lighting, and facade finishes.",
  },
  {
    src: "/construction/videos/video-6.mp4",
    poster: "/portfolio/elevations/elevation-villa-contemporary.jpg",
    eyebrow: "05 / Bank Valuations & Estimates",
    title: "Itemized estimates & bank loan reports.",
    text: "Itemized BOQ quantity estimations and property valuation reports for PSU and private bank home loans.",
  },
];

export default function CinematicConstructionVideos() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingState, setPlayingState] = useState<boolean[]>(videos.map(() => true));

  useEffect(() => {
    // Explicitly configure muted and playsInline for iOS Safari and Android compatibility
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
      video.setAttribute("muted", "true");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          const idx = videoRefs.current.indexOf(video);
          if (entry.isIntersecting) {
            video
              .play()
              .then(() => {
                if (idx !== -1) {
                  setPlayingState((prev) => {
                    const copy = [...prev];
                    copy[idx] = true;
                    return copy;
                  });
                }
              })
              .catch(() => undefined);
          } else {
            video.pause();
            if (idx !== -1) {
              setPlayingState((prev) => {
                const copy = [...prev];
                copy[idx] = false;
                return copy;
              });
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    videoRefs.current.forEach((video) => video && observer.observe(video));
    return () => observer.disconnect();
  }, []);

  const toggleVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
      setPlayingState((prev) => {
        const copy = [...prev];
        copy[index] = true;
        return copy;
      });
    } else {
      video.pause();
      setPlayingState((prev) => {
        const copy = [...prev];
        copy[index] = false;
        return copy;
      });
    }
  };

  return (
    <section className="bg-paper-100 border-t border-paper-300" aria-label="Project engineering video details">
      <div className="bg-navy-950 px-5 py-16 text-center text-white sm:px-8 lg:px-12 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-dark opacity-40 pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Video className="w-4 h-4 text-amber-400" />
            <span>Cinematic Engineering Video Showcase</span>
          </div>
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl text-white">
            Precision in drawing, safety in structure.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-paper-200 text-base sm:text-lg">
            Explore 5 real engineering walkthroughs — architectural CAD drafting, structural reinforcement, BBMP AutoDCR filing, 3D elevations, and bank valuations.
          </p>
        </div>
      </div>

      {videos.map((video, index) => (
        <div
          key={video.src}
          className={`relative overflow-hidden border-b border-paper-300 ${
            index % 2 === 1 ? "bg-navy-900 text-white" : "bg-white text-navy-700"
          }`}
        >
          <div className="mx-auto grid min-h-[65vh] max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
                {video.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {video.title}
              </h3>
              <p
                className={`mt-4 max-w-md text-base sm:text-lg leading-relaxed ${
                  index % 2 === 1 ? "text-paper-200" : "text-ink-700"
                }`}
              >
                {video.text}
              </p>
            </div>

            <div
              className={`relative overflow-hidden rounded-2xl shadow-2xl border border-paper-300/40 group ${
                index % 2 === 1 ? "lg:order-1 border-navy-700" : ""
              }`}
            >
              <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/30 bg-navy-950/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
                Sri Ranganatha Associates
              </div>

              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="aspect-video w-full object-cover cursor-pointer"
                muted
                playsInline
                loop
                preload="metadata"
                poster={video.poster}
                onClick={() => toggleVideo(index)}
              >
                <source src={video.src} type="video/mp4" />
              </video>

              {/* Play / Pause toggle overlay button */}
              <button
                type="button"
                onClick={() => toggleVideo(index)}
                className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-navy-950/80 hover:bg-amber-400 hover:text-navy-950 text-white flex items-center justify-center backdrop-blur shadow-lg transition-colors outline-none"
                aria-label="Toggle video playback"
              >
                {playingState[index] ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
