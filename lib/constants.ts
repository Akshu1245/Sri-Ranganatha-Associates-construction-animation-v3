// Centralized constants — single source of truth across the site

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
    happyClients: 1000,
    servicesOffered: 12,
  },
};

export const SERVICES = [
  {
    id: "building-plans",
    title: "Building Plans",
    shortDesc: "Architectural CAD floor plans for residential & commercial sites.",
    longDesc:
      "CAD floor plans drawn for 30×40 plots, 40×60 plots, independent houses, and multi-floor apartments. Includes room dimensions, section drawings, and schedule of openings.",
    icon: "Compass",
    bullets: [
      "Residential floor plans",
      "Commercial layout plans",
      "Vastu working plans",
      "Full floor plan + elevation + section drawings",
    ],
    color: "navy",
  },
  {
    id: "online-sanction",
    title: "Online Sanction Plans",
    shortDesc: "BBMP, BDA, GBA & BMRDA approval filing.",
    longDesc:
      "We prepare AutoDCR-compliant drawing files, compile required land documents, and file plan sanction applications with BBMP, BDA, GBA, and BMRDA authorities.",
    icon: "Stamp",
    bullets: [
      "BBMP online sanction filing",
      "BDA layout plan approvals",
      "GBA plan sanction process",
      "BMRDA regional authority approval",
    ],
    color: "amber",
  },
  {
    id: "3d-elevations",
    title: "3D Elevations",
    shortDesc: "High-resolution 3D exterior rendering models.",
    longDesc:
      "Architectural 3D elevation drawings showing exterior finish materials, paint schemes, balcony details, lighting, and facade proportions before building.",
    icon: "Box",
    bullets: [
      "Front, side, and rear 3D elevation views",
      "Material and color palette options",
      "Day and night lighting views",
      "High-resolution 4K image output",
    ],
    color: "navy",
  },
  {
    id: "structure",
    title: "Structure Details",
    shortDesc: "Structural reinforcement drawings complying with IS 456.",
    longDesc:
      "Beam, column, footing, plinth, and roof slab structural reinforcement drawings prepared according to Indian Standard structural guidelines (IS 456).",
    icon: "Layers",
    bullets: [
      "Footing and foundation layout details",
      "Column and beam reinforcement schedule",
      "Slab steel detailing drawings",
      "Staircase and lintel structural drawings",
    ],
    color: "amber",
  },
  {
    id: "estimations",
    title: "Estimations & BOQ",
    shortDesc: "Itemized cost estimates and rate analysis for bank loans.",
    longDesc:
      "Detailed bill of quantities (BOQ) and rate analysis prepared for bank home loan approvals and contractor budget verification.",
    icon: "Calculator",
    bullets: [
      "Bank home loan estimation reports",
      "Itemized material cost estimates",
      "Quantity survey & BOQ preparation",
      "Rate analysis based on standard PWD/DSR rates",
    ],
    color: "navy",
  },
  {
    id: "valuation",
    title: "Valuation Reports",
    shortDesc: "Signed valuation certificates for banks & legal purposes.",
    longDesc:
      "Official valuation certificates issued by approved valuers for property purchase, home loans, mortgage verification, and legal documentation.",
    icon: "FileText",
    bullets: [
      "Bank home loan valuation reports",
      "Stage-wise construction valuation",
      "Mortgage and property valuation",
      "Court and legal property valuation",
    ],
    color: "amber",
  },
  {
    id: "consultancy",
    title: "Civil & Construction Consultancy",
    shortDesc: "Site inspection, billing verification, and technical audits.",
    longDesc:
      "On-site engineering inspection, structural safety assessment, contractor billing verification, and quality checking for ongoing construction.",
    icon: "Briefcase",
    bullets: [
      "Site inspection and quality supervision",
      "Contractor bill checking and verification",
      "Structural safety audit reports",
      "Material quality testing advice",
    ],
    color: "navy",
  },
  {
    id: "vastu",
    title: "Vastu Consultancy",
    shortDesc: "Vastu-aligned architectural layouts.",
    longDesc:
      "Floor plans designed following traditional Vastu guidelines for main entry orientation, kitchen placement, master bedroom location, and pooja space.",
    icon: "Compass",
    bullets: [
      "Plot direction and entry analysis",
      "Vastu-compliant room placements",
      "Remedial layout guidance for existing buildings",
      "Pooja room and water tank positioning",
    ],
    color: "amber",
  },
  {
    id: "layout",
    title: "Layout Formations",
    shortDesc: "Land sub-division and layout approval drawings.",
    longDesc:
      "Topographical survey, plot demarcation, road width planning, and BDA/DC conversion layout drawings for property sub-division.",
    icon: "Map",
    bullets: [
      "Topographical land survey",
      "Sub-division layout plans with roads & parks",
      "BDA and DC conversion layout drawings",
      "On-site boundary plot demarcation",
    ],
    color: "navy",
  },
  {
    id: "blueprint-bar",
    title: "Blueprint for Bar & Restaurants",
    shortDesc: "Commercial kitchen and dining layout plans.",
    longDesc:
      "Specialized floor plans for commercial kitchens, dining areas, bars, and cloud kitchens detailing exhaust lines, plumbing, and FSSAI compliance requirements.",
    icon: "Utensils",
    bullets: [
      "Commercial kitchen working layout",
      "Seating and service flow planning",
      "FSSAI and fire safety layout requirements",
      "Bar and counter layout details",
    ],
    color: "amber",
  },
  {
    id: "interior-layouts",
    title: "Interior & Space Planning",
    shortDesc: "2D & 3D internal furniture and electrical layout plans.",
    longDesc:
      "Internal space planning drawings showing furniture placement, electrical switch points, plumbing fixture locations, and ceiling lighting layouts.",
    icon: "Home",
    bullets: [
      "2D furniture layout positioning",
      "Electrical switch and socket point plans",
      "Plumbing fixture layout details",
      "False ceiling lighting layout",
    ],
    color: "navy",
  },
  {
    id: "renovation-plans",
    title: "Renovation & Floor Addition",
    shortDesc: "Structural checking & sanction for building extensions.",
    longDesc:
      "Structural load calculations and sanction drawings for adding additional floors (G+1, G+2, G+3) or renovating existing structures.",
    icon: "Wrench",
    bullets: [
      "Floor addition drawings (G+1 to G+4)",
      "Structural stability check for old buildings",
      "BBMP/BDA extension sanction filing",
      "Column and foundation load assessment",
    ],
    color: "amber",
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Initial Plot Review",
    desc: "Share your plot measurements, site location in Bengaluru, and building requirements with our engineers.",
  },
  {
    n: "02",
    title: "Site Inspection",
    desc: "Our team inspects the site, checks road width and setbacks, and verifies local civic building regulations.",
  },
  {
    n: "03",
    title: "Floor Plans & 3D Renders",
    desc: "We draft CAD floor plans, Vastu layouts, structural details, and 3D exterior elevation drawings.",
  },
  {
    n: "04",
    title: "Sanction Application Filing",
    desc: "We submit the AutoDCR file and required land documents to BBMP, BDA, or BMRDA for plan approval.",
  },
  {
    n: "05",
    title: "Construction Support",
    desc: "We provide structural reinforcement drawings, bank valuation reports, and site inspection support during building.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Ramesh K.",
    place: "Bilekahalli, Bengaluru",
    text: "Got our 30×40 building plan drafted and BBMP sanction processed in 6 weeks. M Ravikumar inspected our plot before drawing. The 3D elevation matched the actual construction.",
    rating: 5,
  },
  {
    name: "Anitha S.",
    place: "Anekal, Bengaluru",
    text: "Clear guidance on BDA layout rules and Vastu floor plans. The drawing set was complete with all room measurements and setbacks.",
    rating: 5,
  },
  {
    name: "Mohammed F.",
    place: "Halasru, Bengaluru",
    text: "Our bank estimation report for SBI was issued promptly with accurate quantity calculations. Structural drawings were clear for the site contractor.",
    rating: 5,
  },
  {
    name: "Priya N.",
    place: "Electronic City, Bengaluru",
    text: "Complete service covering Vastu floor plan, 3D elevation, and BDA plan sanction submission. Professional civil engineering team.",
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

export const DEFAULT_PORTFOLIO = [
  {
    id: "p-001",
    title: "Modern Residential Elevation",
    category: "Residential",
    type: "3D Elevation",
    location: "Halasru, Bengaluru",
    year: 2024,
    image: "/portfolio/elevations/elevation-residential-modern.jpg",
    tags: ["3D Elevation", "Vastu", "G+3"],
    description:
      "Modern residential 3D elevation drawing for a 30×40 G+3 plot in Halasru with balcony and glass facade details.",
  },
  {
    id: "p-002",
    title: "Villa Exterior Elevation",
    category: "Residential",
    type: "3D Elevation",
    location: "Anekal, Bengaluru",
    year: 2024,
    image: "/portfolio/elevations/elevation-villa-wood.jpg",
    tags: ["Villa", "3D Elevation", "Stone Cladding"],
    description:
      "G+2 villa elevation featuring stone cladding on stairwell section and top pergola design.",
  },
  {
    id: "p-003",
    title: "G+3 Apartment Elevation",
    category: "Residential",
    type: "3D Elevation",
    location: "Electronic City, Bengaluru",
    year: 2023,
    image: "/portfolio/elevations/elevation-apartment-brown.jpg",
    tags: ["Apartment", "G+3", "Stilt Parking"],
    description:
      "3D exterior elevation for a G+3 apartment block with ground floor stilt parking and balcony railings.",
  },
  {
    id: "p-004",
    title: "Commercial Building Elevation",
    category: "Commercial",
    type: "3D Elevation",
    location: "Halasru, Bengaluru",
    year: 2023,
    image: "/portfolio/elevations/elevation-commercial-glass.jpg",
    tags: ["Commercial", "Office", "Glass Facade"],
    description:
      "G+3 commercial complex elevation with structural glass facade for office floors and ground retail shops.",
  },
  {
    id: "p-005",
    title: "Hotel Facade Elevation",
    category: "Commercial",
    type: "3D Elevation",
    location: "Bengaluru",
    year: 2024,
    image: "/portfolio/elevations/elevation-chefinn-resort.jpg",
    tags: ["Hotel", "Resort", "Signage Facade"],
    description:
      "Commercial hospitality facade drawing with vertical ACP signage and exterior lighting placement.",
  },
  {
    id: "p-006",
    title: "Residential Elevation with Balcony",
    category: "Residential",
    type: "3D Elevation",
    location: "Bilekahalli, Bengaluru",
    year: 2023,
    image: "/portfolio/elevations/elevation-residential-balcony.jpg",
    tags: ["G+2", "Balcony", "Residential"],
    description:
      "G+2 residential house elevation with front balcony projections and tile roof overhang.",
  },
  {
    id: "p-007",
    title: "Stone Finish Residential Elevation",
    category: "Residential",
    type: "3D Elevation",
    location: "Anekal, Bengaluru",
    year: 2024,
    image: "/portfolio/elevations/elevation-residential-stone.jpg",
    tags: ["Stone Finish", "G+3", "Residential"],
    description:
      "G+3 residential elevation rendering featuring exterior stone finish panels and window frames.",
  },
  {
    id: "p-008",
    title: "BBMP Sanction Plan Set",
    category: "Sanction Plan",
    type: "Sanction Drawing",
    location: "Halasru, Bengaluru",
    year: 2024,
    image: "/portfolio/elevations/elevation-01-plan.jpg",
    tags: ["Sanction Drawing", "Floor Plan", "CAD Schedule"],
    description:
      "BBMP sanction drawing set showing ground, first, second floor plans, site plan, section, and schedule of joinery.",
  },
  {
    id: "p-009",
    title: "Building Plan Portfolio Poster",
    category: "Brand",
    type: "Portfolio Set",
    location: "Halasru, Bengaluru",
    year: 2024,
    image: "/portfolio/flyer-brand.jpg",
    tags: ["Civil Engineering", "Portfolio", "Drawings"],
    description:
      "Sri Ranganatha Associates civil engineering drawings and 3D elevation portfolio presentation set.",
  },
];

export const SAMPLE_FILES = [
  {
    id: "f-001",
    title: "BBMP Sanction Plan Set (PDF)",
    type: "Sanction Plan",
    format: "PDF",
    size: "294 KB",
    file: "/portfolio/sanction-plans/sample-sanction-plan.pdf",
    thumbnail: "/portfolio/elevations/elevation-01-plan.jpg",
  },
  {
    id: "f-002",
    title: "Architectural Working Plan 1 (PDF)",
    type: "Working Plan",
    format: "PDF",
    size: "32 KB",
    file: "/portfolio/working-plans/sample-working-plan.pdf",
    thumbnail: "/portfolio/elevations/elevation-residential-modern.jpg",
  },
  {
    id: "f-003",
    title: "Architectural Working Plan 2 (PDF)",
    type: "Working Plan",
    format: "PDF",
    size: "44 KB",
    file: "/portfolio/working-plans/sample-working-plan-2.pdf",
    thumbnail: "/portfolio/elevations/elevation-villa-wood.jpg",
  },
  {
    id: "f-004",
    title: "Architectural Working Plan 3 (PDF)",
    type: "Working Plan",
    format: "PDF",
    size: "274 KB",
    file: "/portfolio/working-plans/sample-working-plan-3.pdf",
    thumbnail: "/portfolio/elevations/elevation-apartment-brown.jpg",
  },
  {
    id: "f-005",
    title: "Structural Reinforcement Details (PDF)",
    type: "Structure Details",
    format: "PDF",
    size: "692 KB",
    file: "/portfolio/structure-details/sample-structure-details.pdf",
    thumbnail: "/portfolio/elevations/elevation-commercial-glass.jpg",
  },
];
