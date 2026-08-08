// Centralized constants — single source of truth across the site
// Edit anything here and the entire site updates.

export const BRAND = {
  name: "Sri Ranganatha Associates",
  shortName: "SRA",
  tagline: "Registered Civil Engineers, Architects, Approved Valuers & Contractors",
  yearFounded: 2006,
  experienceYears: new Date().getFullYear() - 2006,
  phone: "+91 9448537346",
  phoneRaw: "919448537346",
  email: "mrkravi2006@gmail.com",
  whatsapp: "https://wa.me/919448537346",
  whatsappPrefilled:
    "https://wa.me/919448537346?text=Hi%2C%20I%20need%20help%20with%20a%20building%20plan%20in%20Bengaluru.",
  address: {
    line1: "No.129/7, Cauvery Complex, 1st Floor",
    line2: "Opp. Metro Railway Station, Halasru",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560008",
    country: "IN",
  },
  hours: "Mon – Sat, 9:00 AM – 6:00 PM",
  stats: {
    plansSanctioned: 500,
    yearsExperience: 20,
    happyClients: 750,
    servicesOffered: 12,
  },
};

export const SERVICES = [
  {
    id: "building-plans",
    title: "Building Plans",
    shortDesc: "Residential & commercial plans designed for real life.",
    longDesc:
      "From a 30×40 site to a 5-floor apartment block — full architectural plans drawn in CAD, with elevation, section, schedule of openings and joinery. Ready for sanction or construction.",
    icon: "Compass",
    bullets: [
      "Residential floor plans",
      "Commercial floor plans",
      "Vasthu / Vastu working plans",
      "Floor plans + elevation + section set",
    ],
    color: "navy",
  },
  {
    id: "online-sanction",
    title: "Online Sanction Plans",
    shortDesc: "BBMP • BDA • GBA • BMRDA approvals handled end-to-end.",
    longDesc:
      "We file your building plan with the relevant civic authority and shepherd it through plan scrutiny, objections, and final sanction. You don't stand in any queue.",
    icon: "Stamp",
    bullets: [
      "BBMP online sanction (Bangalore)",
      "BDA approval (BDA layouts)",
      "GBA (Greater Bangalore Authority)",
      "BMRDA (Metropolitan Region)",
    ],
    color: "amber",
  },
  {
    id: "3d-elevations",
    title: "3D Elevations",
    shortDesc: "Photo-real renders so you see your home before construction.",
    longDesc:
      "High-resolution 3D elevation views of your building — what your neighbours will see, what you will live with. 4K stills, day + night views, multiple angles.",
    icon: "Box",
    bullets: [
      "Front / side / rear 3D views",
      "Material & colour options",
      "Day + night renders",
      "4K high-resolution output",
    ],
    color: "navy",
  },
  {
    id: "structure",
    title: "Structure Details",
    shortDesc: "Reinforcement drawings built for seismic zone-2 Karnataka.",
    longDesc:
      "Beam-column-slab reinforcement details drawn to IS 456:2000. Every footing, plinth beam, column, lintel and roof slab documented for the site engineer.",
    icon: "Layers",
    bullets: [
      "Foundation & footing details",
      "Column & beam schedule",
      "Slab reinforcement drawings",
      "Staircase & sun-shade details",
    ],
    color: "amber",
  },
  {
    id: "estimations",
    title: "Estimations",
    shortDesc: "Bank-loan & construction estimates that pass scrutiny.",
    longDesc:
      "Detailed quantity take-off + rate analysis. We prepare the estimate banks accept for home-loan disbursement and contractors accept for tender.",
    icon: "Calculator",
    bullets: [
      "Bank loan estimations",
      "Construction cost estimates",
      "Material quantity take-off",
      "Rate analysis (DSR-based)",
    ],
    color: "navy",
  },
  {
    id: "valuation",
    title: "Valuation Reports",
    shortDesc: "Bank-accepted property valuation for loans & legal.",
    longDesc:
      "Independent property valuation report for home loans, mortgage, insurance and legal cases. Issued as a stamped, signed report accepted by all major banks.",
    icon: "FileText",
    bullets: [
      "Bank home-loan valuation",
      "Mortgage valuation",
      "Insurance valuation",
      "Court / legal valuation",
    ],
    color: "amber",
  },
  {
    id: "consultancy",
    title: "Civil & Construction Consultancy",
    shortDesc: "Expert advice on civil works and on-site construction.",
    longDesc:
      "Site supervision, contractor vetting, billing certification, structural audit. Independent consultancy for any stage of your project.",
    icon: "Briefcase",
    bullets: [
      "Civil works consultancy",
      "Construction consultancy",
      "Site supervision",
      "Contractor billing certification",
    ],
    color: "navy",
  },
  {
    id: "vastu",
    title: "Vastu Consultancy",
    shortDesc: "Vastu-compliant plans without compromising modern design.",
    longDesc:
      "Working plans designed to be Vastu-compliant by default — entrance, kitchen, master bedroom and pooja room positioned for prosperity.",
    icon: "Compass",
    bullets: [
      "Plot orientation analysis",
      "Vastu-compliant layouts",
      "Remedial Vastu for existing homes",
      "Pooja room placement",
    ],
    color: "amber",
  },
  {
    id: "layout",
    title: "Layout Formations",
    shortDesc: "Sub-division and BDA-approved layout plans.",
    longDesc:
      "From a parent site to a BDA-approved layout with roads, parks, CA sites, and individual plots — full survey, demarcation, and approval.",
    icon: "Map",
    bullets: [
      "Topographical survey",
      "Layout planning with roads",
      "BDA/DC conversion assistance",
      "Plot demarcation on site",
    ],
    color: "navy",
  },
  {
    id: "blueprint-bar",
    title: "Blueprint for Bar & Restaurants",
    shortDesc: "FSSAI-aware plans for F&B businesses.",
    longDesc:
      "Specialty blueprint service for restaurants, bars, cafés and cloud kitchens — covering kitchen flow, exhaust, FSSAI layout, seating, bar, and licence plans.",
    icon: "Utensils",
    bullets: [
      "Commercial kitchen layout",
      "Bar & dining flow plan",
      "FSSAI-compliant design",
      "Fire & exit compliance",
    ],
    color: "amber",
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Tell us about your plot",
    desc: "Call, WhatsApp, or fill the enquiry form. Share your plot size, location, and what you want to build.",
  },
  {
    n: "02",
    title: "Free site consultation",
    desc: "We visit your site (in Bengaluru), understand the constraints, and recommend the right plan type.",
  },
  {
    n: "03",
    title: "Working plan + 3D elevation",
    desc: "We deliver a Vastu-compliant floor plan, 3D elevation views, and structural drawings — usually within 7–10 days.",
  },
  {
    n: "04",
    title: "Sanction plan submission",
    desc: "We file the plan with BBMP / BDA / GBA / BMRDA and handle all objections until the sanction comes through.",
  },
  {
    n: "05",
    title: "Construction support",
    desc: "Optional site supervision, contractor selection, and on-call engineering support until handover.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Ramesh K.",
    place: "Bilekahalli, Bengaluru",
    text: "Got my 30×40 site planned and BBMP sanction in under 6 weeks. Ravi sir personally visited the site twice. The 3D elevation is exactly what was built.",
    rating: 5,
  },
  {
    name: "Anitha S.",
    place: "Anekal",
    text: "We compared three consultants — Sri Ranganatha Associates was the only one who explained the BBMP process upfront. No hidden charges. Vastu compliant as promised.",
    rating: 5,
  },
  {
    name: "Mohammed F.",
    place: "Halasru",
    text: "Bank loan estimation cleared in one shot by SBI officer. The structural drawings were so detailed my contractor said it was the best set he'd seen in years.",
    rating: 5,
  },
  {
    name: "Priya N.",
    place: "Electronic City",
    text: "Vastu-correct plan, beautiful 3D elevation, and BDA approval — all from one place. My mother is happy, my husband is happy, I am happy.",
    rating: 5,
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Default portfolio items — these are shipped with the site.
// Admin can add/remove/reorder from /admin dashboard.
export const DEFAULT_PORTFOLIO = [
  {
    id: "p-001",
    title: "Modern Residential Elevation",
    category: "Residential",
    type: "3D Elevation",
    location: "Bengaluru",
    year: 2024,
    image: "/portfolio/elevations/elevation-residential-modern.jpg",
    tags: ["3D Elevation", "Vastu", "G+3"],
    description:
      "Modern residential elevation for a 30×40 G+3 plot, Halasru. Glass-and-wood facade with corner windows.",
  },
  {
    id: "p-002",
    title: "Villa with Wood Cladding",
    category: "Residential",
    type: "3D Elevation",
    location: "Anekal",
    year: 2024,
    image: "/portfolio/elevations/elevation-villa-wood.jpg",
    tags: ["Villa", "3D Elevation", "Stone"],
    description:
      "G+2 villa with stone cladding on the stairwell facade. Modern minimal aesthetic with diagonal pergola.",
  },
  {
    id: "p-003",
    title: "Apartment Block — Brown Facade",
    category: "Residential",
    type: "3D Elevation",
    location: "Electronic City",
    year: 2023,
    image: "/portfolio/elevations/elevation-apartment-brown.jpg",
    tags: ["Apartment", "G+3", "Stilt Parking"],
    description:
      "G+3 apartment block with stilt parking, 8 units. Brown-and-cream facade with balcony planters.",
  },
  {
    id: "p-004",
    title: "Commercial Glass-Front Building",
    category: "Commercial",
    type: "3D Elevation",
    location: "Bengaluru",
    year: 2023,
    image: "/portfolio/elevations/elevation-commercial-glass.jpg",
    tags: ["Commercial", "Office", "Glass Facade"],
    description:
      "G+3 commercial complex with full-height glass facade. Office space above, retail below.",
  },
  {
    id: "p-005",
    title: "Cheffinn Resort — Hospitality",
    category: "Commercial",
    type: "3D Elevation",
    location: "Bengaluru",
    year: 2024,
    image: "/portfolio/elevations/elevation-chefinn-resort.jpg",
    tags: ["Hotel", "Resort", "Branded Facade"],
    description:
      "Branded hotel facade — vertical Cheffinn Resort signage in illuminated ACP letters.",
  },
  {
    id: "p-006",
    title: "Residential Elevation with Balcony",
    category: "Residential",
    type: "3D Elevation",
    location: "Bilekahalli",
    year: 2023,
    image: "/portfolio/elevations/elevation-residential-balcony.jpg",
    tags: ["G+2", "Balcony", "Modern"],
    description:
      "G+2 residential elevation with prominent balconies, red-tile roof and side planters.",
  },
  {
    id: "p-007",
    title: "Stone-Clad Residential Tower",
    category: "Residential",
    type: "3D Elevation",
    location: "Anekal",
    year: 2024,
    image: "/portfolio/elevations/elevation-residential-stone.jpg",
    tags: ["Stone Cladding", "G+3", "Modern"],
    description:
      "G+3 residential block with brown-and-cream stone cladding. Projecting bay windows on each floor.",
  },
  {
    id: "p-008",
    title: "Sanction Plan Set — Working Drawings",
    category: "Working Plan",
    type: "Working Drawing",
    location: "Bengaluru",
    year: 2024,
    image: "/portfolio/elevations/elevation-01-plan.jpg",
    tags: ["Sanction Drawing", "Floor Plan", "Schedule"],
    description:
      "Complete sanction plan set: ground, first, second, terrace floor plans + elevation + section + schedule of joinery.",
  },
  {
    id: "p-009",
    title: "Brand Marketing Piece",
    category: "Brand",
    type: "Marketing",
    location: "Halasru",
    year: 2024,
    image: "/portfolio/flyer-brand.jpg",
    tags: ["Brand", "Marketing", "Print"],
    description:
      "Sri Ranganatha Associates brand marketing collateral — residential elevation + plan composition.",
  },
];

export const SAMPLE_FILES = [
  {
    id: "f-001",
    title: "Sanction Plan — Sample Set",
    type: "Sanction Plan",
    format: "PDF",
    size: "294 KB",
    file: "/portfolio/sanction-plans/sample-sanction-plan.pdf",
    thumbnail: "/portfolio/elevations/elevation-01-plan.jpg",
  },
  {
    id: "f-002",
    title: "Working Plan — Sample 1",
    type: "Working Plan",
    format: "PDF",
    size: "32 KB",
    file: "/portfolio/working-plans/sample-working-plan.pdf",
    thumbnail: "/portfolio/elevations/elevation-residential-modern.jpg",
  },
  {
    id: "f-003",
    title: "Working Plan — Sample 2",
    type: "Working Plan",
    format: "PDF",
    size: "44 KB",
    file: "/portfolio/working-plans/sample-working-plan-2.pdf",
    thumbnail: "/portfolio/elevations/elevation-villa-wood.jpg",
  },
  {
    id: "f-004",
    title: "Working Plan — Sample 3",
    type: "Working Plan",
    format: "PDF",
    size: "274 KB",
    file: "/portfolio/working-plans/sample-working-plan-3.pdf",
    thumbnail: "/portfolio/elevations/elevation-apartment-brown.jpg",
  },
  {
    id: "f-005",
    title: "Structure Details — Sample",
    type: "Structure Details",
    format: "PDF",
    size: "692 KB",
    file: "/portfolio/structure-details/sample-structure-details.pdf",
    thumbnail: "/portfolio/elevations/elevation-commercial-glass.jpg",
  },
];
