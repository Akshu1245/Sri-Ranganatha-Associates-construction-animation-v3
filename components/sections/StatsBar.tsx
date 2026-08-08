"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Building2, Users, Award, Calendar } from "lucide-react";
import { BRAND } from "@/lib/constants";

const STATS = [
  { icon: Building2, value: BRAND.stats.plansSanctioned, suffix: "+", label: "Plans Sanctioned" },
  { icon: Calendar, value: BRAND.stats.yearsExperience, suffix: "+", label: "Years Experience" },
  { icon: Users, value: BRAND.stats.happyClients, suffix: "+", label: "Happy Clients" },
  { icon: Award, value: BRAND.stats.servicesOffered, suffix: "", label: "Services Offered" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="relative bg-navy-600 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-blueprint-dark opacity-50" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(232,160,32,0.20), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center lg:text-left lg:border-l lg:border-navy-500 lg:pl-8 first:border-l-0 first:pl-0"
              >
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                  <Icon className="w-6 h-6 text-amber-400" />
                  <div className="font-display text-4xl lg:text-5xl font-bold text-white">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                </div>
                <div className="text-paper-200 text-sm tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
