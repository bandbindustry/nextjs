"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { FiArrowRight } from "react-icons/fi";
import { getProducts, getProductCategories } from "@/services/product.service";
import type { ApiProduct, ApiProductCategory } from "@/types/products";
import ProductCard from "@/sections/products/ProductCard";

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="rounded-sm overflow-hidden animate-pulse"
      style={{
        background: "var(--color-light-bg)",
        border: "1px solid var(--color-light-border)",
      }}
    >
      <div
        className="w-full"
        style={{
          aspectRatio: "16/9",
          background: "var(--color-light-surface)",
        }}
      />
      <div className="p-4 space-y-3">
        <div
          className="h-3 rounded w-1/3"
          style={{ background: "var(--color-light-surface)" }}
        />
        <div
          className="h-3 rounded w-full"
          style={{ background: "var(--color-light-surface)" }}
        />
        <div
          className="h-3 rounded w-4/5"
          style={{ background: "var(--color-light-surface)" }}
        />
      </div>
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────────
export default function ProductsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-80px 0px" });
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<ApiProductCategory[]>([]);
  const [activeCat, setActiveCat] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [cats, list] = await Promise.all([
        getProductCategories(),
        getProducts({ per_page: 24 }),
      ]);
      setCategories(cats);
      setProducts(list?.data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const displayed =
    activeCat === "all"
      ? products.slice(0, 6)
      : products.filter((p) => p.category_id === activeCat).slice(0, 6);

  return (
    <section
      className="section-light section-pad"
      style={{ borderTop: "1px solid var(--color-light-border)" }}
    >
      <Container>
        {/* ── Heading ── */}
        <motion.div
          ref={headRef}
          className="text-center mb-10"
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

        {/* ── Category filter tabs ── */}
        {!loading && categories.length > 0 && (
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <button
              onClick={() => setActiveCat("all")}
              className="px-4 py-2 rounded-sm text-xs font-display font-semibold uppercase tracking-wider transition-all duration-200"
              style={{
                background:
                  activeCat === "all"
                    ? "var(--color-light-accent)"
                    : "var(--color-light-bg)",
                border:
                  activeCat === "all"
                    ? "1px solid var(--color-light-accent)"
                    : "1px solid var(--color-light-border)",
                color:
                  activeCat === "all" ? "#fff" : "var(--color-light-muted)",
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className="px-4 py-2 rounded-sm text-xs font-display font-semibold uppercase tracking-wider transition-all duration-200"
                style={{
                  background:
                    activeCat === cat.id
                      ? "var(--color-light-accent)"
                      : "var(--color-light-bg)",
                  border:
                    activeCat === cat.id
                      ? "1px solid var(--color-light-accent)"
                      : "1px solid var(--color-light-border)",
                  color:
                    activeCat === cat.id ? "#fff" : "var(--color-light-muted)",
                }}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>
        )}

        {/* ── Grid ── */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : displayed.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
          </AnimatePresence>
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
