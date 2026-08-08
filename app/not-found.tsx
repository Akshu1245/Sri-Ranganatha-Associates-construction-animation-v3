import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-20 bg-paper-100 overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden="true" />

      <div className="relative max-w-2xl mx-auto px-4 text-center">
        <div className="font-display text-9xl font-bold text-navy-700 leading-none">
          4<span className="text-amber-400">0</span>4
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy-700 mt-4">
          Plot not found.
        </h1>
        <p className="text-ink-700 text-lg mt-3 max-w-md mx-auto">
          The page you&apos;re looking for has either been moved or doesn&apos;t exist. Let&apos;s get you back to the foundation.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg"
          >
            <Home className="w-4 h-4" />
            Back to home
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white font-semibold rounded-lg"
          >
            <Search className="w-4 h-4" />
            Browse portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
