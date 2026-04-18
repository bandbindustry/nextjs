// src/components/sections/products/ProductsGrid.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import ProductCard from "./ProductCard";
import { FiArrowRight } from "react-icons/fi";
import { productCategories } from "@/data/products";

// ─── Motion variants ──────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProductsGrid() {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      className="section-pad"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <Container>
        {/* ── Section heading ── */}
        <motion.div
          ref={headRef}
          className="text-center mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate={headInView ? "visible" : "hidden"}
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span
              className="h-px w-8 shrink-0"
              style={{ background: "var(--color-accent)" }}
            />
            <span className="eyebrow" style={{ margin: 0 }}>
              Our Products
            </span>
            <span
              className="h-px w-8 shrink-0"
              style={{ background: "var(--color-accent)" }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "var(--color-text)",
            }}
          >
            Industrial Solutions for Every Need
          </motion.h2>

          {/* Animated accent underline */}
          <motion.div
            className="mx-auto rounded-full mb-5"
            style={{
              height: "3px",
              background: "var(--color-accent)",
              width: 0,
            }}
            animate={headInView ? { width: "64px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          />

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-base max-w-xl mx-auto"
            style={{ color: "var(--color-text-muted)" }}
          >
            From raw components to complete assemblies — explore our full
            product range built to industry standards and ready to ship across
            Gujarat and beyond.
          </motion.p>
        </motion.div>

        {/* ── Products grid ── */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {productCategories.map((cat) => (
            <ProductCard key={cat.id} cat={cat} />
          ))}
        </motion.div>

        {/* ── View all CTA ── */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm font-display font-semibold uppercase tracking-wider text-sm transition-all duration-200 hover:gap-3"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--color-accent)";
              (e.currentTarget as HTMLElement).style.color =
                "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--color-border)";
              (e.currentTarget as HTMLElement).style.color =
                "var(--color-text-muted)";
            }}
          >
            View All Products <FiArrowRight size={13} />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
