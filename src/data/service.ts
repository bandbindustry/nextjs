// src/data/service.ts

export const serviceFeatures = [
  {
    id: "24-7-support",
    title: "24/7 Support",
    description:
      "Our team is available round-the-clock to provide uninterrupted support whenever you need it — no matter the time zone.",
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/176b262911f73a685fe6fe5d5d127a34fbb05a36.jpg",
    stat: "24/7",
    statLabel: "Availability",
    highlights: [
      "Phone, email & on-site support channels",
      "Dedicated engineer per account",
      "Holiday & weekend coverage included",
    ],
  },
  {
    id: "fast-response",
    title: "30-Minute Response",
    description:
      "We pride ourselves on responding to your queries and concerns within 30 minutes, minimising disruptions to your production schedule.",
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/e75d97cf1bd3f9c041df372d4fc99a243196788d.jpg",
    stat: "≤30 min",
    statLabel: "Response Time",
    highlights: [
      "Critical issues acknowledged in under 15 minutes",
      "Direct engineer contact — no ticket queues",
      "Remote troubleshooting begins immediately",
    ],
  },
  {
    id: "spare-parts",
    title: "Spare Parts Warehouse",
    description:
      "Our spare part warehouses guarantee local availability and fast delivery of original components, ensuring optimal and stable performance of your machinery.",
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/26a5c96afdadc4d358a410a91234249e03d71712.jpg",
    stat: "500+",
    statLabel: "Parts in Stock",
    highlights: [
      "OEM-certified original components only",
      "Same-day dispatch for in-stock parts",
      "Pan-Gujarat warehouse coverage",
    ],
  },
  {
    id: "aftersales",
    title: "Regional After-Sales Teams",
    description:
      "Our professional after-sales teams are deployed across Gujarat and beyond, safeguarding your interests and ensuring zero unresolved issues.",
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/725681968db6ccaf1ed98d4265a3e06c64567a1a.jpg",
    stat: "12+",
    statLabel: "Service Regions",
    highlights: [
      "Pre-cleared technicians for fast site access",
      "Onsite dispatch within 4 hours of diagnosis",
      "Follow-up sign-off after every resolution",
    ],
  },
];

export const serviceProcess = [
  {
    step: "01",
    title: "Raise a Request",
    description:
      "Call, email, or submit the form below. Our team logs your issue within minutes.",
  },
  {
    step: "02",
    title: "Expert Diagnosis",
    description:
      "A dedicated service engineer reviews your case and identifies the root cause.",
  },
  {
    step: "03",
    title: "On-Site or Remote Fix",
    description:
      "We resolve remotely where possible. For hardware issues, an engineer is dispatched same day.",
  },
  {
    step: "04",
    title: "Follow-Up & Sign-Off",
    description:
      "We follow up after resolution to confirm the fix holds and you're fully back in production.",
  },
];

export const serviceStats = [
  { value: "98%", label: "First-Time Fix Rate" },
  { value: "≤30 min", label: "Avg. Response Time" },
  { value: "500+", label: "Parts in Stock" },
  { value: "24/7", label: "Support Availability" },
];
