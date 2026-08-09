"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone, MessageCircle, Calculator, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/constants";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(my, [0, 1], ["0%", "100%"]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(280px circle at ${gx} ${gy}, rgba(232,160,32,0.35), transparent 70%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

function MagneticButton({
  children,
  className,
  href,
  external,
}: {
  children: React.ReactNode;
  className: string;
  href: string;
  external?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionLink = motion(Link);
  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ x: sx, y: sy }}
        className={className}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <MotionLink
      href={href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </MotionLink>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-24 lg:pt-28 flex items-center overflow-hidden bg-paper-100">
      {/* Background layers */}
      <div className="absolute inset-0 bg-blueprint opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-blueprint-radial pointer-events-none" aria-hidden="true" />

      {/* Blueprint grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
        aria-hidden="true"
      >
        <motion.line
          x1="0"
          y1="200"
          x2="1200"
          y2="200"
          stroke="#1B3A6B"
          strokeWidth="1"
          strokeDasharray="1200"
          initial={{ strokeDashoffset: 1200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.8, delay: 0.2 }}
        />
        <motion.line
          x1="0"
          y1="600"
          x2="1200"
          y2="600"
          stroke="#1B3A6B"
          strokeWidth="1"
          strokeDasharray="1200"
          initial={{ strokeDashoffset: 1200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.8, delay: 0.5 }}
        />
        <motion.line
          x1="300"
          y1="0"
          x2="300"
          y2="800"
          stroke="#1B3A6B"
          strokeWidth="1"
          strokeDasharray="800"
          initial={{ strokeDashoffset: 800 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.8, delay: 0.7 }}
        />
        <motion.line
          x1="900"
          y1="0"
          x2="900"
          y2="800"
          stroke="#1B3A6B"
          strokeWidth="1"
          strokeDasharray="800"
          initial={{ strokeDashoffset: 800 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.8, delay: 0.9 }}
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left content column */}
          <div className="lg:col-span-7">
            {/* Top pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs font-semibold mb-6 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Halasru, Bengaluru · Est. 2006 · 500+ Sanctioned Building Plans</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-navy-700 leading-[1.08] tracking-tight"
            >
              Building Plans,
              <br />
              <span className="text-amber-500">BBMP & BDA Sanctions,</span>
              <br />
              3D Elevations & Valuations
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 text-lg text-ink-700 max-w-2xl leading-relaxed"
            >
              Registered civil engineers and approved valuers based in Cauvery Complex, Halasru. We draft architectural CAD drawings, file BBMP AutoDCR plan sanctions, prepare IS 456 structural schedules, and issue property valuation reports.
            </motion.p>

            {/* Trust checkmarks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink-700"
            >
              {[
                "BBMP AutoDCR Filing",
                "BDA & BMRDA Approvals",
                "Vastu Floor Plans",
                "Bank Valuation Reports",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-success-500" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>

            {/* High-converting CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-9 flex flex-col sm:flex-row gap-3.5"
            >
              <MagneticButton
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-navy-600 hover:bg-navy-700 text-white font-bold rounded-xl shadow-blueprint hover:shadow-amber-glow transition-all"
              >
                Request Plan Review
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>

              <MagneticButton
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-amber-400 hover:bg-amber-500 text-navy-950 font-bold rounded-xl shadow-blueprint transition-colors"
              >
                <Calculator className="w-4 h-4 text-navy-950" />
                Estimate Scope (30s)
              </MagneticButton>

              <MagneticButton
                href={BRAND.whatsappPrefilled}
                external
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-success-500 hover:bg-success-600 text-white font-bold rounded-xl shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Office
              </MagneticButton>
            </motion.div>

            {/* Proof bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 flex items-center gap-4 text-sm"
            >
              <div className="flex -space-x-2">
                {["#1B3A6B", "#E8A020", "#163057", "#D08A12"].map((c, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-paper-100"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  ★★★★★ <span className="text-navy-700 text-xs font-semibold ml-1">4.9 / 5 Rating</span>
                </div>
                <div className="text-ink-600 text-xs sm:text-sm">
                  1000+ building plans & valuations completed across Bengaluru
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right interactive visual column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <TiltCard>
              <div className="relative">
                <div className="absolute -inset-4 border-2 border-amber-300/40 rounded-2xl" />
                <div className="absolute -inset-2 bg-blueprint-dark rounded-2xl" />

                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/portfolio/elevations/elevation-residential-modern.jpg"
                    alt="3D Elevation render for G+3 residential building in Halasru Bengaluru"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/0 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-xs uppercase tracking-wider text-amber-300 mb-1 font-semibold">
                      Featured Deliverable
                    </div>
                    <div className="font-display text-2xl font-semibold">
                      G+3 Residential Elevation
                    </div>
                    <div className="text-paper-200 text-sm mt-1">
                      30×40 Plot · Halasru, Bengaluru
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 1.1 },
                    x: { duration: 0.5, delay: 1.1 },
                    y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
                  }}
                  className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 border border-paper-300"
                >
                  <div className="text-xs text-ink-500">Average Sanction</div>
                  <div className="font-display text-xl font-bold text-navy-700">
                    4 – 6 Weeks
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 1.3 },
                    x: { duration: 0.5, delay: 1.3 },
                    y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 },
                  }}
                  className="absolute -bottom-4 -right-4 bg-navy-600 text-white rounded-xl shadow-xl px-4 py-3"
                >
                  <div className="text-xs text-paper-200">Filing Authority</div>
                  <div className="font-display text-base font-bold">
                    BBMP · BDA · BMRDA
                  </div>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-ink-500 text-xs pointer-events-none"
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="mt-1.5 w-px h-7 bg-ink-500/40"
        />
      </motion.div>
    </section>
  );
}
