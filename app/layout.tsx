import type { Metadata, Viewport } from "next";
import { BRAND } from "@/lib/constants";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} | Civil Engineers, Architects & Approved Valuers | Bengaluru`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Sri Ranganatha Associates — Registered Civil Engineers, Architects, Approved Valuers & Contractors in Halasru, Bengaluru. Building plans, BBMP/BDA/GBA/BMRDA online sanction, 3D elevations, structure details, valuations, Vastu consultancy.",
  keywords: [
    "BBMP building plan approval Bangalore",
    "Building plan sanction BBMP online",
    "Vastu house plan Halasru",
    "3D elevation design Bangalore",
    "Bank loan estimation civil engineer",
    "Valuation report property Bangalore",
    "Bar restaurant blueprint Bangalore",
    "Civil engineer Halasru",
    "BDA approval consultant",
    "BMRDA plan sanction",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  metadataBase: new URL("https://sriranganathaassociates.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sriranganathaassociates.in",
    siteName: BRAND.name,
    title: `${BRAND.name} | Civil Engineers, Architects & Approved Valuers | Bengaluru`,
    description:
      "Building plans, BBMP/BDA online sanction, 3D elevations, valuations & Vastu consultancy. Trusted by 500+ Bengaluru families.",
    images: [
      {
        url: "/portfolio/elevations/elevation-residential-modern.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Ranganatha Associates — 3D Elevation Design Bengaluru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    description: "Building plans • Sanction • 3D Elevation • Valuation • Bengaluru",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#1B3A6B",
  width: "device-width",
  initialScale: 1,
};

// LocalBusiness JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://sriranganathaassociates.in",
  name: BRAND.name,
  image:
    "https://sriranganathaassociates.in/portfolio/elevations/elevation-residential-modern.jpg",
  description:
    "Registered Civil Engineers, Architects, Approved Valuers & Contractors in Bengaluru. Building plans, BBMP/BDA/GBA/BMRDA online sanction, 3D elevations, structure details, valuations, Vastu consultancy.",
  telephone: BRAND.phone,
  email: BRAND.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${BRAND.address.line1}, ${BRAND.address.line2}`,
    addressLocality: BRAND.address.city,
    addressRegion: BRAND.address.state,
    postalCode: BRAND.address.pincode,
    addressCountry: BRAND.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9784,
    longitude: 77.6408,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "₹₹",
  areaServed: "Bengaluru",
  serviceType: [
    "Building Plans",
    "Online Sanction Plans (BBMP/BDA/GBA/BMRDA)",
    "3D Elevations",
    "Structure Details",
    "Estimations",
    "Valuation Reports",
    "Civil Consultancy",
    "Vastu Consultancy",
    "Layout Formations",
  ],
};

import { getLocalBusinessSchema, getFAQSchema } from "@/lib/structured-data";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema()) }}
        />
      </head>
      <body className="bg-paper-100 text-ink-900 font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
