// src/components/sections/products/ProductCard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import SubCategoryRow from "./SubCategoryRow";
import type { Category } from "@/types/products";

// fadeUp variant — expects parent to be a staggerContainer
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};
const VISIBLE_LIMIT = 2;

interface Props {
  cat: Category;
}

export default function ProductCard({ cat }: Props) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = cat.subCategories.length > VISIBLE_LIMIT;
  const visibleSubs = cat.subCategories.slice(
    0,
    expanded ? cat.subCategories.length : VISIBLE_LIMIT,
  );

  return (
    <motion.article
      variants={fadeUp}
      className="rounded-sm overflow-hidden flex flex-col h-full"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* ── Image ── */}
      <div
        className="relative overflow-hidden shrink-0"
        style={{ aspectRatio: "16 / 9" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cat.image}
          alt={`${cat.name} — B & B Industries`}
          width={600}
          height={338}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
          }}
        />

        {/* Category title over image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-3">
          <p
            className="font-display uppercase mb-1"
            style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "var(--color-accent)",
            }}
          >
            B &amp; B Industries
          </p>
          <h3
            className="font-display font-bold leading-snug"
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              color: "white",
            }}
          >
            {cat.name}
          </h3>
          <p
            className="text-xs mt-1 leading-relaxed line-clamp-2"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {cat.description}
          </p>
        </div>
      </div>

      {/* ── Sub-categories ── */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        {visibleSubs.map((sub) => (
          <SubCategoryRow key={sub.slug} sub={sub} catSlug={cat.slug} />
        ))}

        {hasMore && (
          <button
            onClick={() => setExpanded((p) => !p)}
            className="flex items-center gap-1.5 mt-1 transition-opacity duration-150 hover:opacity-70"
            style={{ color: "var(--color-accent)" }}
          >
            <span
              className="font-display font-semibold uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.15em" }}
            >
              {expanded
                ? "Show less"
                : `+${cat.subCategories.length - VISIBLE_LIMIT} more categories`}
            </span>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <FiChevronDown size={11} />
            </motion.div>
          </button>
        )}
      </div>

      {/* ── Footer — view all ── */}
      <Link
        href={`/products/${cat.slug}`}
        className="group flex items-center justify-between px-4 py-3 shrink-0 transition-colors duration-200"
        style={{ borderTop: "1px solid var(--color-border)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "var(--color-surface-2)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
        }}
      >
        <span
          className="font-display font-semibold uppercase"
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "var(--color-accent)",
          }}
        >
          Explore {cat.name}
        </span>
        <FiArrowRight
          size={12}
          className="-translate-x-1 group-hover:translate-x-0.5 transition-transform duration-200"
          style={{ color: "var(--color-accent)" }}
        />
      </Link>
    </motion.article>
  );
}
