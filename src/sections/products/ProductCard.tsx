// src/sections/products/ProductCard.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiTag, FiZap } from "react-icons/fi";
import { useModal } from "@/context/ModalContext";
import type { ApiProduct } from "@/types/products";

const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

interface Props {
  product: ApiProduct;
  index: number;
}

export default function ProductCard({ product, index }: Props) {
  const { openModal } = useModal();
  const firstImage = product.images?.[0] ?? null;

  return (
    <motion.article
      variants={fadeUp}
      className="group flex flex-col rounded-sm overflow-hidden h-full"
      style={{
        background: "var(--color-light-bg)",
        border: "1px solid var(--color-light-border)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* ── Image ── */}
      <Link
        href={`/products/${product.id}`}
        className="relative overflow-hidden block shrink-0"
        style={{ aspectRatio: "16/9" }}
      >
        {firstImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={firstImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "var(--color-light-surface)" }}
          >
            <FiTag size={36} style={{ color: "var(--color-light-faint)" }} />
          </div>
        )}

        {/* Gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)",
          }}
        />

        {/* Index badge */}
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-sm"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
        >
          <span
            className="font-display font-bold text-white"
            style={{ fontSize: "10px", letterSpacing: "0.18em" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Popular badge */}
        {product.is_popular === 1 && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-sm"
            style={{ background: "var(--color-light-accent)" }}
          >
            <FiZap size={9} color="#fff" />
            <span
              className="font-display uppercase text-white"
              style={{ fontSize: "9px", letterSpacing: "0.15em" }}
            >
              Popular
            </span>
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p
            className="font-display uppercase mb-0.5"
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {product.category_name}
          </p>
          <h3
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)" }}
          >
            {product.name}
          </h3>
        </div>
      </Link>

      {/* ── Body — description only ── */}
      <div
        className="flex flex-col p-4 flex-1"
        style={{ background: "var(--color-light-surface)" }}
      >
        <p
          className="text-xs leading-relaxed line-clamp-3"
          style={{ color: "var(--color-light-muted)" }}
        >
          {product.description}
        </p>
      </div>

      {/* ── Footer ── */}
      <div
        className="grid grid-cols-2 shrink-0"
        style={{ borderTop: "1px solid var(--color-light-border)" }}
      >
        <Link
          href={`/products/${product.id}`}
          className="group/link flex items-center justify-center gap-1.5 px-4 py-3 transition-all duration-200 text-xs font-display font-semibold uppercase tracking-wider"
          style={{
            borderRight: "1px solid var(--color-light-border)",
            color: "var(--color-light-muted)",
            background: "var(--color-light-bg)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--color-light-surface)";
            el.style.color = "var(--color-light-text)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--color-light-bg)";
            el.style.color = "var(--color-light-muted)";
          }}
        >
          Details
          <FiArrowRight
            size={11}
            className="-translate-x-0.5 group-hover/link:translate-x-0 transition-transform duration-200"
          />
        </Link>
        <button
          onClick={openModal}
          className="flex items-center justify-center gap-1.5 px-4 py-3 transition-all duration-200 text-xs font-display font-semibold uppercase tracking-wider"
          style={{
            color: "var(--color-light-accent)",
            background: "var(--color-light-bg)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--color-light-accent)";
            el.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--color-light-bg)";
            el.style.color = "var(--color-light-accent)";
          }}
        >
          Get Quote
        </button>
      </div>
    </motion.article>
  );
}
