"use client";

import { motion } from "framer-motion";
import { Award, Building2, Calendar, MapPin, GraduationCap, Users } from "lucide-react";
import { BRAND } from "@/lib/constants";

const MILESTONES = [
  { title: "Founded in Halasru", desc: "Started as a one-person consultancy, BBMP sanctions and residential plans." },
  { title: "BDA empanelment", desc: "Approved valuer for BDA layouts across Bengaluru." },
  { title: "Commercial projects", desc: "Expanded into commercial blueprints — offices, restaurants, hotels." },
  { title: "3D Elevation studio", desc: "In-house 3D rendering team to deliver photoreal elevations." },
  { title: "20 years of service", desc: "Two decades, 1000+ families, one office in Halasru." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-dark opacity-50" aria-hidden="true" />
        <div className="absolute inset-0 bg-blueprint-radial opacity-50" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold mb-3">
            About us
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] max-w-4xl">
            20 years of plans.
            <br />
            <span className="text-amber-400">One family in Halasru.</span>
          </h1>
          <p className="mt-6 text-lg text-paper-200 max-w-2xl">
            Sri Ranganatha Associates is a Bengaluru-based civil engineering consultancy. We work
            with homeowners, builders, and businesses to design, sanction, and deliver buildings
            across Karnataka.
          </p>
        </div>
      </section>

      {/* Founder + Story */}
      <section className="py-20 lg:py-24 bg-paper-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[4/5] max-w-md mx-auto">
                <div className="absolute -inset-3 bg-amber-300/30 rounded-2xl" />
                <div className="absolute inset-0 bg-blueprint rounded-2xl" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/portfolio/elevations/elevation-villa-wood.jpg"
                    alt="Sri Ranganatha Associates - representative project"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-navy-600 text-white rounded-xl shadow-xl px-5 py-3">
                  <div className="text-xs text-paper-200">Est.</div>
                  <div className="font-display text-2xl font-bold">2006</div>
                </div>
                <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl px-5 py-3 border border-paper-300">
                  <div className="text-xs text-ink-500">Founder</div>
                  <div className="font-display text-lg font-bold text-navy-700 uppercase">M Ravikumar</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold mb-3">
                Our story
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-700 leading-tight mb-5">
                Built on referrals.
                <br />
                <span className="text-amber-500">Still is.</span>
              </h2>
              <div className="space-y-4 text-ink-700 text-lg leading-relaxed">
                <p>
                  In 2006, M Ravikumar (the founder) registered Sri Ranganatha Associates as a
                  one-man consultancy above a provision store in Halasru. The first client was a
                  neighbour who wanted a 20×30 home plan. The 3-page working drawing that resulted
                  is still pinned on our office wall.
                </p>
                <p>
                  Twenty years on, we&apos;re still in Halasru, still in the same Cauvery Complex.
                  We&apos;re now a team of engineers, draftsmen, 3D artists, and a sanctioned valuer.
                </p>
                <p>
                  Most of our new businesses come from old clients. That&apos;s the only metric
                  that matters to us.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { v: BRAND.stats.yearsExperience, l: "Years" },
                  { v: `${BRAND.stats.plansSanctioned}+`, l: "Plans" },
                  { v: `${BRAND.stats.happyClients}+`, l: "Families" },
                ].map((m) => (
                  <div key={m.l} className="text-center p-4 bg-white border border-paper-300 rounded-xl">
                    <div className="font-display text-3xl font-bold text-navy-700">{m.v}</div>
                    <div className="text-xs text-ink-500 mt-1">{m.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 bg-paper-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold mb-3">
              Credentials
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-700 leading-tight">
              Registered. Empanelled. Trusted.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "BMRDA", sub: "Approved" },
              { label: "GBA", sub: "Approved" },
              { label: "BDA", sub: "Approved" },
              { label: "Village Panchayat", sub: "Approved" },
              { label: "Valuers", sub: "Approved" },
            ].map((c) => (
              <div
                key={c.label}
                className="bg-white border border-paper-300 rounded-xl p-5 text-center card-lift"
              >
                <Award className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <div className="font-display text-xl font-bold text-navy-700">{c.label}</div>
                <div className="text-xs text-ink-500 mt-1">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-24 bg-paper-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold mb-3">
              Milestones
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-700 leading-tight">
              The journey so far.
            </h2>
          </div>

          <div className="space-y-6">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-paper-300 rounded-xl p-6 card-lift"
              >
                <h3 className="font-display text-xl font-semibold text-navy-700 mb-1">
                  {m.title}
                </h3>
                <p className="text-ink-700">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit us */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold mb-3">
                Visit our office
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Come see the drawings in person.
              </h2>
              <p className="text-paper-200 mb-6">
                Sometimes the easiest way to know us is to walk in. Our office is above the
                Cauvery Complex, right opposite Halasuru Metro station.
              </p>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Sri Ranganatha Associates</div>
                    <div className="text-paper-200 text-sm">
                      {BRAND.address.line1}
                      <br />
                      {BRAND.address.line2}, {BRAND.address.city} – {BRAND.address.pincode}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-paper-200 text-sm">{BRAND.hours}</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-navy-700 shadow-2xl">
              <iframe
                src="https://www.google.com/maps?q=Cauvery+Complex%2C+129%2C+Old+Madras+Rd%2C+near+Ulsoor%2C+Halasuru%2C+Lingayana+Palya%2C+Bengaluru%2C+Karnataka+560008&output=embed"
                width="100%"
                height="320"
                style={{ border: 0, filter: "grayscale(0.2) contrast(1.1)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
