// src/sections/products/ProductsGrid.tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/ui/Container";
import AnimatedLine from "@/components/ui/AnimatedLine";
import { clipUp, fadeIn } from "@/lib/motion";
import { FiArrowRight, FiSearch, FiTag, FiX } from "react-icons/fi";
import { getProducts, getProductCategories } from "@/services/product.service";
import type { ApiProduct } from "@/types/products";
import ProductCard from "./ProductCard";
import { decryptUrlParam, encryptUrlParam } from "@/utils/encryption";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
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

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProductsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px 0px" });
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Pre-select category from URL ?category= (encrypted) or ?category_id= (legacy plain)
  const urlCatParam =
    searchParams.get("category") ?? searchParams.get("category_id");
  const urlCatId = urlCatParam ? decryptUrlParam(urlCatParam) : null;
  const [activeCat, setActiveCat] = useState<string>(urlCatId ?? "all");
  const [search, setSearch] = useState("");

  /** Update both local state and URL param when category changes */
  function selectCategory(catId: string) {
    setActiveCat(catId);
    const params = new URLSearchParams(searchParams.toString());
    if (catId === "all") {
      params.delete("category");
      params.delete("category_id");
    } else {
      params.delete("category_id"); // remove legacy param
      params.set("category", encryptUrlParam(catId));
    }
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  // ── Fetch categories ──
  const { data: categories = [] } = useQuery({
    queryKey: ["product-categories"],
    queryFn: getProductCategories,
  });

  // ── Fetch all products ──
  const { data: productsData, isLoading: loading } = useQuery({
    queryKey: ["products", { per_page: 100 }],
    queryFn: () => getProducts({ per_page: 100 }),
  });
  const products: ApiProduct[] = productsData?.data ?? [];

  // Filter by category + search
  const filtered = products.filter((p) => {
    const matchCat = activeCat === "all" || p.category_id === activeCat;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category_name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const heroWords = ["Industrial", "Solutions,", "Built", "to", "Last."];

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ background: "var(--color-bg)" }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <Container className="relative z-10">
          {/* Eyebrow */}
          <motion.p
            className="eyebrow"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            Our Products
          </motion.p>

          {/* Headline — staggered word clip-up */}
          <motion.h1
            className="font-display font-bold leading-none mb-6"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {heroWords.map((word, i) => (
              <span key={i} className="inline-block mr-[0.2em] overflow-hidden">
                <motion.span
                  className="inline-block"
                  variants={clipUp}
                  style={{
                    color:
                      word === "Last."
                        ? "var(--color-accent)"
                        : "var(--color-text)",
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <AnimatedLine className="mb-6 w-20" />

          {/* Subtitle */}
          <motion.p
            className="text-lg max-w-lg leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.55 }}
          >
            From raw components to complete assemblies — explore our full
            product range built to industry standards and ready to ship across
            Gujarat and beyond.
          </motion.p>
        </Container>
      </section>

      {/* ── Products Grid ── */}
      <section
        className="section-pad"
        style={{
          background: "var(--color-light-bg)",
          borderTop: "1px solid var(--color-light-border)",
        }}
      >
        <Container>
          {/* ── Filters ── */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div
              className="relative flex-1 max-w-sm"
              style={{
                border: "1px solid var(--color-light-border)",
                borderRadius: "4px",
                background: "var(--color-light-surface)",
              }}
            >
              <FiSearch
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--color-light-faint)" }}
              />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-transparent outline-none"
                style={{
                  color: "var(--color-light-text)",
                  fontFamily: "var(--font-body)",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--color-light-faint)" }}
                >
                  <FiX size={12} />
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectCategory("all")}
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
                  onClick={() => selectCategory(cat.id)}
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
                      activeCat === cat.id
                        ? "#fff"
                        : "var(--color-light-muted)",
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* ── Results count ── */}
          {!loading && (
            <p
              className="text-xs mb-6"
              style={{ color: "var(--color-light-faint)" }}
            >
              {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
              {activeCat !== "all" &&
                ` in ${categories.find((c) => c.id === activeCat)?.name ?? ""}`}
              {search && ` matching "${search}"`}
            </p>
          )}

          {/* ── Grid ── */}
          <motion.div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
          >
            <AnimatePresence mode="wait">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : filtered.length > 0
                  ? filtered.map((product, i) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={i}
                      />
                    ))
                  : null}
            </AnimatePresence>
          </motion.div>

          {/* ── Empty state ── */}
          {!loading && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <FiTag
                size={40}
                className="mx-auto mb-4"
                style={{ color: "var(--color-light-faint)" }}
              />
              <p
                className="font-display font-semibold mb-2"
                style={{ color: "var(--color-light-text)" }}
              >
                No products found
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--color-light-muted)" }}
              >
                Try adjusting your search or category filter.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  selectCategory("all");
                }}
                className="mt-4 px-5 py-2.5 text-xs font-display font-semibold uppercase tracking-wider rounded-sm transition-all duration-200"
                style={{
                  border: "1px solid var(--color-light-accent)",
                  color: "var(--color-light-accent)",
                }}
              >
                Clear filters
              </button>
            </motion.div>
          )}

          {/* ── View all CTA ── */}
          {!loading && filtered.length > 0 && (
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
                  border: "1px solid var(--color-light-border)",
                  color: "var(--color-light-muted)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--color-light-accent)";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--color-light-accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--color-light-border)";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--color-light-muted)";
                }}
              >
                View All Products <FiArrowRight size={13} />
              </Link>
            </motion.div>
          )}
        </Container>
      </section>
    </>
  );
}
