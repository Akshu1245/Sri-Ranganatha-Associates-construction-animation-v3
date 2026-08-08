"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function WhatsAppFAB() {
  return (
    <motion.a
      href={BRAND.whatsappPrefilled}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      {/* pulse rings */}
      <span className="absolute inset-0 rounded-full bg-success-500 animate-ping opacity-25" />
      <span className="absolute -inset-2 rounded-full bg-success-500/20 animate-pulse" />

      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-success-500 shadow-2xl flex items-center justify-center text-white">
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" />
      </div>

      {/* tooltip */}
      <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-navy-900 text-paper-50 text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
        Chat with us
      </span>
    </motion.a>
  );
}
