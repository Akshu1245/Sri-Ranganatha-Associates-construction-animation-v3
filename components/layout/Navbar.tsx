"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { NAV_LINKS, BRAND } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-paper-100/85 backdrop-blur-md border-b border-paper-300 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-navy-600 flex items-center justify-center text-white font-display font-bold text-sm shadow-blueprint group-hover:scale-105 transition-transform">
              SRA
            </div>
            <div className="leading-tight">
              <div className="font-display text-navy-600 text-base sm:text-lg font-semibold tracking-tight">
                Sri Ranganatha
              </div>
              <div className="text-[10px] sm:text-xs text-ink-500 tracking-wider uppercase">
                Associates
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    active ? "text-navy-600" : "text-ink-700 hover:text-navy-600"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-amber-400"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy-600 hover:text-navy-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {BRAND.phone}
            </a>
            <a
              href={BRAND.whatsappPrefilled}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-success-500 hover:bg-success-500/90 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 -mr-2 text-navy-600"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-paper-300 bg-paper-100/98 backdrop-blur-md"
          >
            <nav className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium ${
                      active
                        ? "bg-navy-600 text-white"
                        : "text-ink-700 hover:bg-paper-200"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="grid grid-cols-2 gap-2 pt-3">
                <a
                  href={`tel:${BRAND.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-navy-600 text-navy-600 rounded-lg font-medium"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
                <a
                  href={BRAND.whatsappPrefilled}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-success-500 text-white rounded-lg font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
