// src/data/blogs.ts
// ✏️ Edit content here only — no component changes needed.
// Slugs are pre-generated via slugify() for consistency.

import type { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    slug: "precision-cnc-machining-tolerances",
    title: "Understanding Precision CNC Machining Tolerances",
    excerpt:
      "Tolerances define the quality of every machined part. Learn how we achieve micron-level accuracy across high-volume production runs.",
    publishedAt: "2024-03-15",
    author: "D. M. Shah",
    category: "Manufacturing",
    coverImage: "https://picsum.photos/seed/cnc-machining/1200/630",
    readingTime: "6 min read",
    meta: {
      title: "Precision CNC Machining Tolerances — B & B Industries",
      description:
        "Learn how B & B Industries achieves micron-level CNC machining tolerances across high-volume production runs in Surat, Gujarat.",
      keywords: [
        "CNC machining",
        "precision tolerances",
        "manufacturing",
        "B & B Industries",
        "Gujarat",
      ],
    },
    content: `
## What Are Machining Tolerances?

Tolerances define the permissible range of variation in a part's dimensions. A tolerance of ±0.01 mm means the final part can be 0.01 mm larger or smaller than the nominal dimension — and still be acceptable.

At B & B Industries, we routinely hold tolerances as tight as **±0.005 mm** on turned components, thanks to our modern CNC turning centres and in-process measurement protocols.

---

## Why Tolerances Matter

Loose tolerances lead to:

- Poor fit in assemblies
- Premature wear and part failure
- Increased rejection rates
- Higher warranty costs for OEMs

Tight tolerances, maintained consistently, ensure your sub-assemblies work first time, every time.

---

## How We Achieve Tight Tolerances

### 1. Machine Selection

Not all CNC machines are equal. Our **Fanuc-controlled turning centres** maintain positioning accuracy of ±0.002 mm across the full stroke.

### 2. Tooling & Inserts

We use **coated carbide inserts** with consistent geometry. Worn inserts are replaced at fixed intervals — not when they fail.

### 3. In-Process Gauging

Our operators measure every 10th part during a run using calibrated digital micrometers and CMM spot-checks for critical dimensions.

### 4. Temperature Control

Thermal expansion causes dimensional drift. Our facility maintains shop-floor temperature within **±2°C** to minimise this effect.

---

## Tolerance Grades Reference

| Grade | Typical Tolerance | Common Application |
|-------|------------------|--------------------|
| IT6   | ±0.013 mm        | Precision bearings |
| IT7   | ±0.021 mm        | General engineering fits |
| IT8   | ±0.033 mm        | Light machinery |
| IT11  | ±0.130 mm        | Sheet metal, castings |

---

## Conclusion

Tolerances aren't just numbers on a drawing — they're the difference between a part that works and one that doesn't. If your current supplier is struggling to hit your spec, [get in touch with our team](/contact) for a no-obligation review.
    `.trim(),
  },

  {
    slug: "iso-9001-quality-management-manufacturing",
    title: "How ISO 9001 Shapes Our Quality Management System",
    excerpt:
      "ISO 9001 is more than a certificate on the wall. Here's how our QMS drives every process from raw material to finished part.",
    publishedAt: "2024-05-20",
    author: "R. B. Patel",
    category: "Quality",
    coverImage: "https://picsum.photos/seed/iso-quality/1200/630",
    readingTime: "5 min read",
    meta: {
      title: "ISO 9001 Quality Management in Manufacturing — B & B Industries",
      description:
        "Discover how B & B Industries uses ISO 9001:2015 to drive consistent quality across every stage of precision manufacturing.",
      keywords: [
        "ISO 9001",
        "quality management",
        "QMS",
        "manufacturing quality",
        "B & B Industries",
      ],
    },
    content: `
## What Is ISO 9001:2015?

ISO 9001:2015 is the international standard for Quality Management Systems. It provides a framework for organisations to consistently deliver products that meet customer and regulatory requirements.

B & B Industries has been ISO 9001 certified since 2008, and upgraded to the 2015 revision in 2017.

---

## The 7 Principles We Follow

1. **Customer focus** — every process starts with understanding what the customer needs
2. **Leadership** — quality is set at the top and cascaded through every shift
3. **Engagement of people** — our operators are trained to identify and report non-conformances
4. **Process approach** — we map, measure, and improve every production process
5. **Improvement** — we run quarterly CAPA (Corrective and Preventive Action) reviews
6. **Evidence-based decisions** — rejection rates, rework %, and delivery KPIs are reviewed weekly
7. **Relationship management** — our supplier qualification process ensures incoming material quality

---

## Our QMS in Practice

### Incoming Inspection

Every batch of raw material is inspected against our material specification before it enters the store:

- Dimensional check on 10% of bar stock
- Material certificate verification
- Hardness spot-check on alloy steels

### In-Process Inspection

- First-off approval before every production run
- Patrol inspection every 30 minutes on critical features
- 100% inspection on safety-critical components

### Final Inspection

All finished parts are inspected against the customer drawing before despatch:

- Visual inspection for surface defects
- Dimensional report on all critical dimensions
- CMM report for complex profiles

---

## What This Means for You

When you source from B & B Industries, you get:

- Traceable inspection records for every batch
- First-time pass rates consistently above **98.5%**
- A supplier who proactively communicates if a non-conformance is found — not after you've fitted the parts

[Request our quality documentation →](/contact)
    `.trim(),
  },

  {
    slug: "industrial-fasteners-guide-selection",
    title: "A Practical Guide to Industrial Fastener Selection",
    excerpt:
      "Choosing the wrong fastener can cause catastrophic assembly failures. Here's a structured approach to getting it right every time.",
    publishedAt: "2024-07-08",
    author: "B. K. Patel",
    category: "Products",
    coverImage: "https://picsum.photos/seed/fasteners-guide/1200/630",
    readingTime: "7 min read",
    meta: {
      title: "Industrial Fastener Selection Guide — B & B Industries",
      description:
        "A practical guide to selecting the right industrial fasteners for your application — material, grade, coating, and torque considerations.",
      keywords: [
        "industrial fasteners",
        "fastener selection",
        "bolts and nuts",
        "manufacturing components",
        "B & B Industries Gujarat",
      ],
    },
    content: `
## Why Fastener Selection Matters

A fastener is one of the cheapest components in any assembly — yet fastener failure is one of the most common causes of field returns and warranty claims. Getting the selection right at the design stage costs nothing. Getting it wrong costs everything.

---

## Step 1 — Define the Load Type

| Load Type | Recommended Fastener |
|-----------|---------------------|
| Pure tensile | High-tensile bolt (Grade 8.8 or 10.9) |
| Shear | Close-tolerance bolt or dowel pin |
| Vibration | Prevailing torque nut or thread-locking compound |
| Cyclic fatigue | Fine-thread, high-tensile with controlled torque |

---

## Step 2 — Choose the Material

### Carbon Steel
Most common. Good strength, easy to source. Must be plated or coated for corrosion resistance.

- **Grade 4.6** — light-duty, non-critical applications
- **Grade 8.8** — general engineering standard
- **Grade 10.9** — high-stress assemblies

### Stainless Steel (A2 / A4)
- **A2 (304)** — indoor or mildly corrosive environments
- **A4 (316)** — marine, chemical, or food-grade environments
- Lower strength than carbon steel — do not substitute Grade 8.8 with A2 without recalculating

### Alloy Steel
Used where both high strength and toughness are required — typically aerospace and heavy engineering.

---

## Step 3 — Select the Coating

| Coating | Corrosion Protection | Temperature Limit |
|---------|---------------------|------------------|
| Zinc plated | Moderate (200–500 hr salt spray) | 120°C |
| Hot-dip galvanised | High (1000+ hr) | 200°C |
| Dacromet | Very high (1000+ hr, no hydrogen embrittlement) | 300°C |
| Plain (uncoated) | None | 400°C+ |

> ⚠️ Hydrogen embrittlement risk: electroplated high-tensile fasteners (Grade 10.9+) must be baked post-plating. Dacromet eliminates this risk entirely.

---

## Step 4 — Calculate the Correct Torque

Never guess torque values. Use the formula:

**T = K × d × F**

Where:
- **T** = tightening torque (Nm)
- **K** = nut factor (typically 0.2 for dry steel, 0.15 for lubricated)
- **d** = nominal bolt diameter (m)
- **F** = target clamp force (N)

---

## B & B Industries Fastener Range

We supply a full range of precision fasteners including:

- Hex bolts and nuts (M4–M48)
- Socket head cap screws
- Studs and threaded rods
- Precision dowel pins
- Non-standard turned fasteners to drawing

[Browse our products →](/products) or [request a quote →](/contact)
    `.trim(),
  },
];
