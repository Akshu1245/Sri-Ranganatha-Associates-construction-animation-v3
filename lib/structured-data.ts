import { BRAND } from "./constants";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://sriranganathaassociates.in",
    name: BRAND.name,
    image: "https://sriranganathaassociates.in/portfolio/elevations/elevation-residential-modern.jpg",
    description:
      "Registered Civil Engineers, Architects, Approved Valuers & Contractors in Halasru, Bengaluru. Building plans, BBMP AutoDCR sanction filing, BDA/GBA/BMRDA approvals, 3D elevations, structural details, bank valuations, and Vastu consultancy.",
    telephone: BRAND.phone,
    email: BRAND.email,
    url: "https://sriranganathaassociates.in",
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
    areaServed: [
      "Halasru",
      "Indiranagar",
      "Bilekahalli",
      "Anekal",
      "Electronic City",
      "Whitefield",
      "Bengaluru",
    ],
    serviceType: [
      "Architectural CAD Building Plans",
      "BBMP Online Sanction Filing (AutoDCR)",
      "BDA Layout Plan Approval",
      "3D Exterior Elevations",
      "IS 456 Structural Detailing",
      "Bank Home Loan Valuation Reports",
      "Itemized Cost Estimations (BOQ)",
      "Civil Construction Supervision",
      "Vastu Floor Plan Consultancy",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does BBMP online plan sanction take in Bengaluru?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BBMP online plan sanction (Trust / AutoDCR process) typically takes between 4 to 6 weeks depending on site dimensions, setback verifications, and document completeness.",
        },
      },
      {
        "@type": "Question",
        name: "Are your property valuation reports accepted by SBI and major PSU banks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Issued by approved empanelled valuers, our valuation certificates are accepted by State Bank of India (SBI), Canara Bank, HDFC, ICICI, and major financial institutions.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide structural drawings complying with IS 456 standards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All structural drawings — including footings, plinth beams, column schedules, and slab reinforcement — are drawn according to Indian Standard IS 456:2000 guidelines.",
        },
      },
      {
        "@type": "Question",
        name: "Can I visit your office in Halasru to review sample floor plans and 3D elevations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our office is located on the 1st Floor of Cauvery Complex, directly opposite the Halasru Metro Station. You can visit Monday to Saturday, 9:00 AM to 6:00 PM.",
        },
      },
    ],
  };
}
