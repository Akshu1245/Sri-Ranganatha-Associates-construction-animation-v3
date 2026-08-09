const CREDENTIALS = [
  "BBMP Approved",
  "BDA Approved",
  "GBA Approved",
  "BMRDA Approved",
  "Village Panchayat Approved",
  "Vastu Certified",
  "Bank-Empanelled Valuers",
  "IS 456 Structural Standards",
];

export default function TrustMarquee() {
  return (
    <div className="relative bg-navy-900 border-y border-navy-700/60 py-3.5 overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-navy-900 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-navy-900 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="flex w-max animate-scroll-x gap-10 hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-10 flex-shrink-0" aria-hidden={copy === 1}>
            {CREDENTIALS.map((item, i) => (
              <div
                key={`${copy}-${i}`}
                className="flex items-center gap-2.5 text-paper-200 text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
