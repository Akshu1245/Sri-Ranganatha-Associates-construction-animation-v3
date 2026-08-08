import { Suspense } from "react";
import ContactForm from "@/components/sections/ContactForm";

export const metadata = {
  title: "Contact — Get a Quote",
  description:
    "Get in touch with Sri Ranganatha Associates for a consultation on building plans, BBMP/BDA sanction, 3D elevations, structure details, and valuations in Bengaluru.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-paper-100 overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden="true" />
        <div className="absolute inset-0 bg-blueprint-radial" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold mb-3">
            Contact us
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-navy-700 leading-[1.05]">
            Let&apos;s talk
            <br />
            <span className="text-amber-500">about your project.</span>
          </h1>
          <p className="mt-6 text-lg text-ink-700 max-w-2xl">
            One form. One phone call. One step closer to your home or commercial building.
            We&apos;ll respond within 2 working hours.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-16 lg:py-20 bg-paper-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-ink-500">Loading form…</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
