import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { BRAND, SERVICES, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative bg-navy-900 text-paper-100 overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-blueprint-dark opacity-50" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top CTA strip */}
        <div className="grid lg:grid-cols-2 gap-8 pb-12 border-b border-navy-700">
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
              Have a plot? Let&apos;s plan
              <br />
              <span className="text-amber-400">your dream home.</span>
            </h3>
            <p className="text-paper-300 mt-3 max-w-md">
              Tell us your site size, location and what you want. We&apos;ll respond with a plan and a quote within 24 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:justify-end gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-navy-900 font-semibold rounded-lg transition-colors"
            >
              Get Quote
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={BRAND.whatsappPrefilled}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-paper-300/40 hover:border-amber-400 hover:text-amber-400 rounded-lg font-semibold transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400 flex items-center justify-center text-navy-900 font-display font-bold text-sm">
                SRA
              </div>
              <div className="leading-tight">
                <div className="font-display text-paper-50 text-base font-semibold whitespace-nowrap">
                  Sri Ranganatha Associates
                </div>
              </div>
            </Link>
            <p className="text-paper-300 text-sm mt-4 max-w-xs">
              {BRAND.tagline}. Trusted by {BRAND.stats.plansSanctioned}+ Bengaluru families since {BRAND.yearFounded}.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-amber-400 hover:text-navy-900 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-amber-400 hover:text-navy-900 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-amber-400 hover:text-navy-900 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-paper-50 uppercase text-xs tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services#${s.id}`}
                    className="text-sm text-paper-300 hover:text-amber-400 transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-paper-50 uppercase text-xs tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-paper-300 hover:text-amber-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin/login"
                  className="text-sm text-paper-300/50 hover:text-amber-400 transition-colors"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-paper-50 uppercase text-xs tracking-wider mb-4">
              Visit / Call
            </h4>
            <ul className="space-y-3 text-sm text-paper-300">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  {BRAND.address.line1}
                  <br />
                  {BRAND.address.line2}, {BRAND.address.city} – {BRAND.address.pincode}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <a href={`tel:${BRAND.phone}`} className="hover:text-amber-400">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-amber-400 break-all">
                  {BRAND.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{BRAND.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-navy-700 text-xs text-paper-300/70">
          <div>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <span className="px-2 py-1 bg-navy-800 rounded">BBMP</span>
            <span className="px-2 py-1 bg-navy-800 rounded">BDA</span>
            <span className="px-2 py-1 bg-navy-800 rounded">GBA</span>
            <span className="px-2 py-1 bg-navy-800 rounded">BMRDA</span>
            <span className="px-2 py-1 bg-navy-800 rounded">Approved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
