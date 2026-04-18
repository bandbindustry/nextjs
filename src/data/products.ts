// src/data/products.ts
// B & B Industries — product catalogue
// To add a product: add a new object to `categories`.
// To add a variant: add to the `variants` array inside the matching subCategory.

import type { Category } from "@/types/products";

export const productCategories: Category[] = [
  // ─── 1. Precision Components ────────────────────────────────────────────────
  {
    id: "precision-components",
    name: "Precision Components",
    slug: "precision-components",
    description:
      "High-tolerance machined parts manufactured to micron-level accuracy for critical industrial applications.",
    image: "https://picsum.photos/seed/precision-cnc/600/400",
    variants: ["Turned Components", "Milled Components", "Ground Components"],
    subCategories: [
      {
        name: "Turned Components",
        slug: "turned-components",
        variants: [
          {
            name: "SS Grade",
            slug: "ss-grade",
            spec: "Stainless Steel 304/316",
          },
          { name: "MS Grade", slug: "ms-grade", spec: "Mild Steel EN8/EN9" },
          {
            name: "Brass Grade",
            slug: "brass-grade",
            spec: "Free Cutting Brass",
          },
          { name: "Aluminium", slug: "aluminium", spec: "Al 6061 / 7075" },
        ],
      },
      {
        name: "Milled Components",
        slug: "milled-components",
        variants: [
          { name: "Flat Milled", slug: "flat-milled" },
          { name: "Profile Milled", slug: "profile-milled" },
          { name: "3D Contour", slug: "3d-contour" },
        ],
      },
      {
        name: "Ground Components",
        slug: "ground-components",
        variants: [
          { name: "Cylindrical Ground", slug: "cylindrical-ground" },
          { name: "Surface Ground", slug: "surface-ground" },
        ],
      },
    ],
  },

  // ─── 2. Industrial Machinery ─────────────────────────────────────────────────
  {
    id: "industrial-machinery",
    name: "Industrial Machinery",
    slug: "industrial-machinery",
    description:
      "Heavy-duty equipment engineered for continuous-cycle production and high-volume manufacturing.",
    image: "https://picsum.photos/seed/industrial-machine/600/400",
    variants: ["Hydraulic Press", "Pneumatic Systems", "Power Press"],
    subCategories: [
      {
        name: "Hydraulic Press",
        slug: "hydraulic-press",
        variants: [
          { name: "50 Ton", slug: "50-ton", spec: "C-Frame, 50T capacity" },
          { name: "100 Ton", slug: "100-ton", spec: "H-Frame, 100T capacity" },
          { name: "200 Ton", slug: "200-ton", spec: "H-Frame, 200T capacity" },
          { name: "400 Ton", slug: "400-ton", spec: "Custom bed, 400T" },
        ],
      },
      {
        name: "Pneumatic Systems",
        slug: "pneumatic-systems",
        variants: [
          { name: "Single Acting Cylinder", slug: "single-acting" },
          { name: "Double Acting Cylinder", slug: "double-acting" },
          { name: "Rotary Actuator", slug: "rotary-actuator" },
        ],
      },
      {
        name: "Power Press",
        slug: "power-press",
        variants: [
          { name: "10 Ton Mechanical", slug: "10-ton-mechanical" },
          { name: "25 Ton Mechanical", slug: "25-ton-mechanical" },
        ],
      },
    ],
  },

  // ─── 3. Custom Fabrication ────────────────────────────────────────────────────
  {
    id: "custom-fabrication",
    name: "Custom Fabrication",
    slug: "custom-fabrication",
    description:
      "Bespoke metal and alloy fabrication built to exact client drawings and specifications.",
    image: "https://picsum.photos/seed/metal-fabrication/600/400",
    variants: ["Sheet Metal Work", "Structural Fabrication"],
    subCategories: [
      {
        name: "Sheet Metal Work",
        slug: "sheet-metal",
        variants: [
          {
            name: "Laser Cut Sheets",
            slug: "laser-cut",
            spec: "Up to 20mm MS / 12mm SS",
          },
          { name: "Plasma Cut", slug: "plasma-cut", spec: "Up to 50mm MS" },
          {
            name: "Waterjet Cut",
            slug: "waterjet-cut",
            spec: "Non-heat sensitive parts",
          },
          { name: "Punching & Bending", slug: "punching-bending" },
        ],
      },
      {
        name: "Structural Fabrication",
        slug: "structural-fabrication",
        variants: [
          { name: "MS Structures", slug: "ms-structures" },
          { name: "SS Structures", slug: "ss-structures" },
          { name: "Aluminium Structures", slug: "al-structures" },
          { name: "Skid / Base Frames", slug: "skid-base-frames" },
        ],
      },
    ],
  },

  // ─── 4. Assembly Solutions ────────────────────────────────────────────────────
  {
    id: "assembly-solutions",
    name: "Assembly Solutions",
    slug: "assembly-solutions",
    description:
      "End-to-end sub-assembly and complete product integration with in-process quality checks.",
    image: "https://picsum.photos/seed/assembly-line/600/400",
    variants: ["Mechanical Assembly", "Electro-Mechanical"],
    subCategories: [
      {
        name: "Mechanical Assembly",
        slug: "mechanical-assembly",
        variants: [
          { name: "Sub Assembly", slug: "sub-assembly" },
          { name: "Full Assembly", slug: "full-assembly" },
          { name: "Gear Box Assembly", slug: "gear-box-assembly" },
        ],
      },
      {
        name: "Electro-Mechanical",
        slug: "electro-mechanical",
        variants: [
          { name: "Control Panel Wiring", slug: "panel-wiring" },
          { name: "Sensor Integration", slug: "sensor-integration" },
          { name: "PLC Integration", slug: "plc-integration" },
        ],
      },
    ],
  },

  // ─── 5. Quality Tools & Jigs ──────────────────────────────────────────────────
  {
    id: "quality-tools",
    name: "Quality Tools & Jigs",
    slug: "quality-tools",
    description:
      "Precision tooling, inspection gauges, and custom jigs for streamlined manufacturing workflows.",
    image: "https://picsum.photos/seed/precision-tools/600/400",
    variants: ["Inspection Gauges", "Fixture & Jigs", "Cutting Tools"],
    subCategories: [
      {
        name: "Inspection Gauges",
        slug: "inspection-gauges",
        variants: [
          { name: "Go / No-Go Gauge", slug: "go-no-go" },
          { name: "Thread Gauges", slug: "thread-gauges" },
          { name: "Ring Gauges", slug: "ring-gauges" },
          { name: "Plug Gauges", slug: "plug-gauges" },
        ],
      },
      {
        name: "Fixture & Jigs",
        slug: "fixture-jigs",
        variants: [
          { name: "Drill Jigs", slug: "drill-jigs" },
          { name: "Welding Fixtures", slug: "welding-fixtures" },
          { name: "CMM Fixtures", slug: "cmm-fixtures" },
        ],
      },
      {
        name: "Cutting Tools",
        slug: "cutting-tools",
        variants: [
          { name: "Form Tools", slug: "form-tools" },
          { name: "Special Drills", slug: "special-drills" },
          { name: "Reamers", slug: "reamers" },
        ],
      },
    ],
  },
];

/** Utility: find a single category by slug */
export function getCategoryBySlug(slug: string): Category | undefined {
  return productCategories.find((c) => c.slug === slug);
}

/** Utility: find a subCategory within a category by slug */
export function getSubCategoryBySlug(catSlug: string, subSlug: string) {
  const cat = getCategoryBySlug(catSlug);
  return cat?.subCategories.find((s) => s.slug === subSlug);
}
