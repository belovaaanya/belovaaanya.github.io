// ─────────────────────────────────────────────────────────────────────────
//  Portfolio content — EDIT HERE to swap copy, tags, links, images.
//
//  Showcase layers use raw Figma design-pixel coordinates. Each showcase is
//  rendered at its `dw × dh` design size and scaled to fit its column, so:
//    box:   [left, top, width, height]  in design px (origin top-left of showcase)
//    radius: corner radius in design px
//    crop:  inner <img> position [left%, top%, width%, height%], or null => object-fit:cover
//    depth: parallax weight 0..1 (higher = moves more / reads as closer)
// ─────────────────────────────────────────────────────────────────────────

export const bio = {
  name: "Anna Belova",
  role: "Product Designer",
  photo: "assets/bio/photo.png",
  tags: [
    { label: "CV", href: "#" },
    { label: "TG", href: "#" },
  ],
  text:
    "Product Designer and UX Analyst with 5+ years of experience specializing in " +
    "B2B enterprise ecosystems, systemic design, and customer experience. Adept at " +
    "translating complex data and Voice of Customer (VoC) into intuitive interfaces " +
    "and strategic business solutions",
};

// Placeholder copy is intentional and shared across cases (matches the wireframe).
// Swap title / description / tags / link per case here.
const PLACEHOLDER_DESC = [
  "Designed key screens for a clothing app prioritizing fast search and purchase " +
    "flows. Implemented photo and barcode search features based on competitive " +
    "benchmarking (Zara, Farfetch)",
  "Created a highly scannable, user-centered shopping experience with optimized product cards",
];

export const cases = [
  {
    id: "fast-checkout",
    title: "E-commerce Fast Checkout",
    description: PLACEHOLDER_DESC,
    tags: ["UI Concept", "Retail"],
    link: "#",
    dw: 832, dh: 620, bg: null, radius: 0,
    layers: [
      { src: "assets/fast-checkout/shot.png", box: [0, 0, 832, 620], radius: 47, crop: [-19.54, -0.04, 135.47, 100.08], depth: 0.5 },
    ],
  },
  {
    id: "health",
    title: "E-commerce Fast Checkout",
    description: PLACEHOLDER_DESC,
    tags: ["UI Concept", "Retail"],
    link: "#",
    dw: 832, dh: 601, bg: null, radius: 0,
    layers: [
      { src: "assets/health/shot.png", box: [-106, 0, 638, 539], radius: 40, crop: [0, -0.04, 154.56, 100.07], depth: 0.4 },
      { src: "assets/health/shot.png", box: [545, 0, 254, 539], radius: 20, crop: [-287.67, -5.52, 428.08, 110.72], depth: 0.7 },
    ],
  },
  {
    id: "dashboard",
    title: "E-commerce Fast Checkout",
    description: PLACEHOLDER_DESC,
    tags: ["UI Concept", "Retail"],
    link: "#",
    dw: 832, dh: 560, bg: "#ff6b48", radius: 32,
    layers: [
      { src: "assets/dashboard/shot.png", box: [0, 55, 823, 450], radius: 0, crop: null, depth: 0.5 },
    ],
  },
  {
    id: "streaming",
    title: "E-commerce Fast Checkout",
    description: PLACEHOLDER_DESC,
    tags: ["UI Concept", "Retail"],
    link: "#",
    dw: 832, dh: 662, bg: null, radius: 32,
    layers: [
      { src: "assets/streaming/base.png", box: [0, 0, 823, 450], radius: 0, crop: null, depth: 0.3 },
      { src: "assets/streaming/mockups.png", box: [-179, 0, 1195, 654], radius: 0, crop: null, depth: 0.6 },
    ],
  },
  {
    id: "coffee",
    title: "E-commerce Fast Checkout",
    description: PLACEHOLDER_DESC,
    tags: ["UI Concept", "Retail"],
    link: "#",
    dw: 832, dh: 545, bg: null, radius: 0,
    layers: [
      { src: "assets/coffee/main.png", box: [-119, 0, 642, 539], radius: 0, crop: [0, -5.31, 125.7, 110.61], depth: 0.4 },
      { src: "assets/coffee/side.png", box: [545, 0, 254, 539], radius: 20, crop: [-287.67, -5.52, 428.08, 110.72], depth: 0.7 },
    ],
  },
  {
    id: "portraits",
    title: "E-commerce Fast Checkout",
    description: PLACEHOLDER_DESC,
    tags: ["UI Concept", "Retail"],
    link: "#",
    dw: 832, dh: 545, bg: null, radius: 0,
    layers: [
      { src: "assets/portraits/p259.png", box: [285.17, -27, 262.9, 361.07], radius: 0, crop: null, depth: 0.45 },
      { src: "assets/portraits/p254.png", box: [536.81, 0.85, 304.24, 304.24], radius: 0, crop: null, depth: 0.55 },
      { src: "assets/portraits/p255.png", box: [556.41, 294.77, 284.64, 271.23], radius: 0, crop: [0, 0, 100, 104.94], depth: 0.6 },
      { src: "assets/portraits/p256.png", box: [287.23, 305.08, 269.17, 260.92], radius: 0, crop: [-4.98, -3.97, 104.98, 103.99], depth: 0.5 },
      { src: "assets/portraits/p257.png", box: [0.53, 305.08, 286.7, 260.92], radius: 0, crop: [0, -2.37, 100, 109.88], depth: 0.5 },
      { src: "assets/portraits/p258.png", box: [-17, 0.85, 304.24, 304.24], radius: 0, crop: null, depth: 0.65 },
    ],
  },
  {
    id: "crypto",
    title: "E-commerce Fast Checkout",
    description: PLACEHOLDER_DESC,
    tags: ["UI Concept", "Retail"],
    link: "#",
    dw: 830, dh: 598, bg: null, radius: 0,
    layers: [
      { src: "assets/crypto/shot.png", box: [0, 0, 830, 598], radius: 0, crop: [0, 10.84, 100, 75.97], depth: 0.5 },
    ],
  },
];
