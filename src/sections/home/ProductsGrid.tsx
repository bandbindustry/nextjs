"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";

// ─── Data ─────────────────────────────────────────────────────────────────────
type Variant = { name: string; slug: string };
type SubCategory = { name: string; slug: string; variants?: Variant[] };
type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subCategories: SubCategory[];
};

const categories: Category[] = [
  {
    id: "1",
    name: "Precision Components",
    slug: "precision-components",
    description:
      "High-tolerance machined parts for critical industrial applications.",
    image: "https://picsum.photos/seed/precision/600/400",
    subCategories: [
      {
        name: "Turned Components",
        slug: "turned-components",
        variants: [
          { name: "SS Grade", slug: "ss-grade" },
          { name: "MS Grade", slug: "ms-grade" },
          { name: "Brass Grade", slug: "brass-grade" },
        ],
      },
      {
        name: "Milled Components",
        slug: "milled-components",
        variants: [
          { name: "Flat Milled", slug: "flat-milled" },
          { name: "Profile Milled", slug: "profile-milled" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Industrial Machinery",
    slug: "industrial-machinery",
    description:
      "Heavy-duty equipment engineered for continuous production lines.",
    image: "https://picsum.photos/seed/machinery/600/400",
    subCategories: [
      {
        name: "Hydraulic Press",
        slug: "hydraulic-press",
        variants: [
          { name: "50 Ton", slug: "50-ton" },
          { name: "100 Ton", slug: "100-ton" },
          { name: "200 Ton", slug: "200-ton" },
        ],
      },
      {
        name: "Pneumatic Systems",
        slug: "pneumatic-systems",
        variants: [
          { name: "Single Acting", slug: "single-acting" },
          { name: "Double Acting", slug: "double-acting" },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Custom Fabrication",
    slug: "custom-fabrication",
    description:
      "Bespoke metal and alloy fabrication built to exact client specifications.",
    image: "https://picsum.photos/seed/fabrication/600/400",
    subCategories: [
      {
        name: "Sheet Metal Work",
        slug: "sheet-metal",
        variants: [
          { name: "Laser Cut", slug: "laser-cut" },
          { name: "Plasma Cut", slug: "plasma-cut" },
          { name: "Waterjet Cut", slug: "waterjet-cut" },
        ],
      },
      {
        name: "Structural Fabrication",
        slug: "structural-fabrication",
        variants: [
          { name: "MS Structures", slug: "ms-structures" },
          { name: "SS Structures", slug: "ss-structures" },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Assembly Solutions",
    slug: "assembly-solutions",
    description:
      "End-to-end sub-assembly and full product integration services.",
    image: "https://picsum.photos/seed/assembly/600/400",
    subCategories: [
      {
        name: "Mechanical Assembly",
        slug: "mechanical-assembly",
        variants: [
          { name: "Sub Assembly", slug: "sub-assembly" },
          { name: "Full Assembly", slug: "full-assembly" },
        ],
      },
      {
        name: "Electro-Mechanical",
        slug: "electro-mechanical",
        variants: [
          { name: "Panel Wiring", slug: "panel-wiring" },
          { name: "Sensor Integration", slug: "sensor-integration" },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "Quality Tools & Jigs",
    slug: "quality-tools",
    description:
      "Precision tooling, gauges, and jigs for manufacturing workflows.",
    image: "https://picsum.photos/seed/tools/600/400",
    subCategories: [
      {
        name: "Inspection Gauges",
        slug: "inspection-gauges",
        variants: [
          { name: "Go / No-Go", slug: "go-no-go" },
          { name: "Thread Gauges", slug: "thread-gauges" },
        ],
      },
      {
        name: "Fixture & Jigs",
        slug: "fixture-jigs",
        variants: [
          { name: "Drill Jigs", slug: "drill-jigs" },
          { name: "Welding Fixtures", slug: "welding-fixtures" },
        ],
      },
    ],
  },
];

// ─── Variant chip row ─────────────────────────────────────────────────────────
function SubCategoryRow({
  sub,
  catSlug,
}: {
  sub: SubCategory;
  catSlug: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="overflow-hidden rounded-sm"
      style={{ border: "1px solid var(--color-light-border)" }}
    >
      {/* Sub header */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200 group"
        style={{
          background: open
            ? "var(--color-light-surface-2)"
            : "var(--color-light-surface)",
        }}
        onMouseEnter={(e) => {
          if (!open)
            (e.currentTarget as HTMLElement).style.background =
              "var(--color-light-surface-2)";
        }}
        onMouseLeave={(e) => {
          if (!open)
            (e.currentTarget as HTMLElement).style.background =
              "var(--color-light-surface)";
        }}
      >
        <span
          className="text-sm font-display font-semibold"
          style={{ color: "var(--color-light-text)" }}
        >
          {sub.name}
        </span>
        <div className="flex items-center gap-2">
          {sub.variants && (
            <span
              className="text-[10px] font-display uppercase tracking-widest"
              style={{ color: "var(--color-light-faint)" }}
            >
              {sub.variants.length} variants
            </span>
          )}
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <FiChevronDown
              size={13}
              style={{ color: "var(--color-light-accent)" }}
            />
          </motion.div>
        </div>
      </button>

      {/* Variant chips */}
      <AnimatePresence initial={false}>
        {open && sub.variants && (
          <motion.div
            key="variants"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="flex flex-wrap gap-2 p-3"
              style={{
                borderTop: "1px solid var(--color-light-border)",
                background: "var(--color-light-bg)",
              }}
            >
              {sub.variants.map((v) => (
                <Link
                  key={v.slug}
                  href={`/products/${catSlug}/${sub.slug}/${v.slug}`}
                  className="group/chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-display font-semibold uppercase tracking-wider transition-all duration-200"
                  style={{
                    border: "1px solid var(--color-light-border)",
                    color: "var(--color-light-muted)",
                    background: "var(--color-light-surface)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--color-light-accent)";
                    el.style.color = "var(--color-light-accent)";
                    el.style.background = "var(--color-light-bg)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--color-light-border)";
                    el.style.color = "var(--color-light-muted)";
                    el.style.background = "var(--color-light-surface)";
                  }}
                >
                  {v.name}
                  <FiArrowRight
                    size={10}
                    className="-translate-x-0.5 group-hover/chip:translate-x-0 transition-transform duration-200"
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Product card ─────────────────────────────────────────────────────────────
function ProductCard({ cat, index }: { cat: Category; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col rounded-sm overflow-hidden"
      style={{
        background: "var(--color-light-bg)",
        border: "1px solid var(--color-light-border)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 32px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.06)";
      }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cat.image}
          alt={cat.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />

        {/* Dark gradient over image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
          }}
        />

        {/* Index badge */}
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-sm"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
          }}
        >
          <span
            className="font-display font-bold text-white"
            style={{ fontSize: "10px", letterSpacing: "0.18em" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Subcategory count badge */}
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded-sm"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
          }}
        >
          <span
            className="font-display uppercase text-white"
            style={{ fontSize: "10px", letterSpacing: "0.15em" }}
          >
            {cat.subCategories.length} types
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3
            className="font-display font-bold text-white leading-tight mb-1"
            style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)" }}
          >
            {cat.name}
          </h3>
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            {cat.description}
          </p>
        </div>
      </div>

      {/* ── Subcategory list ── */}
      <div
        className="flex flex-col gap-2 p-4 flex-1"
        style={{ background: "var(--color-light-surface)" }}
      >
        {/* Section label */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className="h-px flex-1"
            style={{ background: "var(--color-light-border)" }}
          />
          <span
            className="text-[9px] font-display uppercase tracking-[0.2em]"
            style={{ color: "var(--color-light-faint)" }}
          >
            Categories
          </span>
          <span
            className="h-px flex-1"
            style={{ background: "var(--color-light-border)" }}
          />
        </div>

        {cat.subCategories
          .slice(0, expanded ? cat.subCategories.length : 2)
          .map((sub) => (
            <SubCategoryRow key={sub.slug} sub={sub} catSlug={cat.slug} />
          ))}

        {cat.subCategories.length > 2 && (
          <button
            onClick={() => setExpanded((p) => !p)}
            className="self-start text-[11px] font-display font-semibold uppercase tracking-wider flex items-center gap-1 mt-0.5 transition-opacity duration-150 hover:opacity-60"
            style={{ color: "var(--color-light-accent)" }}
          >
            {expanded ? "Show less" : `+${cat.subCategories.length - 2} more`}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronDown size={11} />
            </motion.div>
          </button>
        )}
      </div>

      {/* ── Footer CTA ── */}
      <Link
        href={`/products/${cat.slug}`}
        className="group/link flex items-center justify-between px-4 py-3.5 transition-all duration-200"
        style={{
          borderTop: "1px solid var(--color-light-border)",
          background: "var(--color-light-bg)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "var(--color-light-accent)";
          el.style.borderTopColor = "var(--color-light-accent)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "var(--color-light-bg)";
          el.style.borderTopColor = "var(--color-light-border)";
        }}
      >
        <span
          className="text-xs font-display font-bold uppercase tracking-widest transition-colors duration-200 group-hover/link:text-white"
          style={{ color: "var(--color-light-accent)" }}
        >
          View All Variants
        </span>
        <FiArrowRight
          size={13}
          className="-translate-x-1 group-hover/link:translate-x-0 transition-all duration-200 group-hover/link:text-white"
          style={{ color: "var(--color-light-accent)" }}
        />
      </Link>
    </motion.div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────────
export default function ProductsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-80px 0px" });
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });

  return (
    <section
      className="section-light section-pad"
      style={{ borderTop: "1px solid var(--color-light-border)" }}
    >
      <Container>
        {/* ── Heading ── */}
        <motion.div
          ref={headRef}
          className="text-center mb-14"
          variants={staggerContainer}
          initial="hidden"
          animate={headInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span
                className="h-px w-8"
                style={{ background: "var(--color-light-accent)" }}
              />
              <span
                className="font-display font-semibold uppercase tracking-[0.2em]"
                style={{
                  fontSize: "0.7rem",
                  color: "var(--color-light-faint)",
                }}
              >
                Our Products
              </span>
              <span
                className="h-px w-8"
                style={{ background: "var(--color-light-accent)" }}
              />
            </div>

            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "var(--color-light-text)",
              }}
            >
              Industrial Solutions for Every Need
            </h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            <motion.div
              className="mx-auto rounded-full mb-5"
              style={{
                height: "3px",
                background: "var(--color-light-accent)",
                width: 0,
              }}
              animate={headInView ? { width: "64px" } : { width: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "var(--color-light-muted)" }}
            >
              From raw components to complete assemblies — explore our full
              product range built to industry standards and ready to ship.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {categories.map((cat, i) => (
            <ProductCard key={cat.id} cat={cat} index={i} />
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          className="text-center mt-12"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold font-display uppercase tracking-wider rounded-sm transition-all duration-200 hover:gap-3"
            style={{
              border: "1px solid var(--color-light-border)",
              color: "var(--color-light-muted)",
              background: "var(--color-light-bg)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-light-accent)";
              el.style.color = "var(--color-light-accent)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-light-border)";
              el.style.color = "var(--color-light-muted)";
            }}
          >
            View All Products <FiArrowRight size={13} />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
