"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Phone, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

const FAQS = [
  {
    q: "How long does BBMP online plan sanction take in Bengaluru?",
    a: "BBMP online plan sanction via the AutoDCR system typically takes 4 to 6 weeks. This includes architectural plan drafting, AutoDCR drawing conversion, document validation, site verification by civic inspectors, and fee payment.",
  },
  {
    q: "Are your valuation reports accepted by State Bank of India (SBI) & PSU banks?",
    a: "Yes. Issued by approved empanelled valuers, our property valuation certificates and stage-wise construction reports are officially accepted by SBI, Canara Bank, HDFC Bank, ICICI Bank, and major financial institutions.",
  },
  {
    q: "Do you visit the plot site before drawing the building plan?",
    a: "Yes. Site inspection is a fundamental step. Our engineering team visits your plot in Bengaluru to measure actual site boundaries, check road width, inspect adjacent structures, and verify setback requirements before drawing.",
  },
  {
    q: "What is the difference between a Sanction Plan and a Working Plan?",
    a: "A Sanction Plan is formatted specifically to civic bylaws (BBMP/BDA) to get formal building permission. A Working Plan includes detailed room-by-room dimensions, electrical conduit layouts, plumbing points, and joinery schedules for the site contractor.",
  },
  {
    q: "Are your floor plans Vastu-compliant?",
    a: "Yes. By default, our architectural floor plans align room placements — main entrance, kitchen, master bedroom, and pooja space — with traditional Vastu principles without compromising on modern space utilization.",
  },
  {
    q: "Can I add floors (e.g. G+1 to G+3) to an existing building?",
    a: "Yes. We conduct a structural stability assessment of existing columns and footings, prepare load calculations, draft floor addition plans, and submit sanction drawings to BBMP or BDA for expansion approval.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => setOpenIdx(openIdx === idx ? null : idx);

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-paper-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs font-semibold mb-3">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            Frequently Asked Questions
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-navy-700 leading-tight">
            Clear answers to your building & sanction questions.
          </h2>

          <p className="mt-4 text-ink-700 text-base">
            Everything you need to know about building plans, BBMP sanctions, and valuations in Bengaluru.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen ? "border-navy-600 bg-paper-100/80 shadow-sm" : "border-paper-300 bg-white hover:border-paper-400"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 outline-none"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-navy-700">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                      isOpen ? "bg-navy-600 text-white rotate-180" : "bg-paper-200 text-navy-700"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-ink-700 text-sm leading-relaxed border-t border-paper-200/60 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct question help */}
        <div className="mt-12 p-6 rounded-2xl bg-navy-900 text-white text-center sm:flex sm:items-center sm:justify-between sm:text-left gap-6 shadow-xl">
          <div>
            <div className="font-bold text-lg">Have a specific question about your plot?</div>
            <div className="text-paper-200 text-xs mt-1">Speak directly with our civil engineering team in Halasru.</div>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3 flex-shrink-0 justify-center">
            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-navy-950 font-bold text-xs rounded-xl transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Call {BRAND.phone}
            </a>
            <a
              href={BRAND.whatsappPrefilled}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-success-500 hover:bg-success-600 text-white font-bold text-xs rounded-xl transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
