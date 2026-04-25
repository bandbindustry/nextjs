// src/sections/products/ProductCard.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiTag, FiZap } from "react-icons/fi";
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
      className="group relative flex flex-col rounded-sm overflow-hidden h-full"
      style={{
        background: "var(--color-light-bg)",
        border: "1px solid var(--color-light-border)",
      }}
    >
      {/* ── Image block ── */}
      <Link
        href={`/products/${product.id}`}
        className="relative overflow-hidden block shrink-0"
        // style={{ aspectRatio: "3/4" }}
        style={{ aspectRatio: "4/3" }}
        tabIndex={-1}
      >
        {firstImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={firstImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "var(--color-light-surface)" }}
          >
            <FiTag size={32} style={{ color: "var(--color-light-faint)" }} />
          </div>
        )}

        {/* Scrim — stronger at bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Large watermark index — visible on hover */}
        <span
          className="absolute top-0 right-0 font-display font-black select-none pointer-events-none leading-none opacity-0 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
          style={{
            fontSize: "6.5rem",
            color: "rgba(255,255,255,0.1)",
            lineHeight: 1,
            padding: "8px 12px 0 0",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Popular badge */}
        {product.is_popular === 1 && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-sm"
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

        {/* Text overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p
            className="font-display uppercase mb-1"
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {product.category_name}
          </p>
          <h3
            className="font-display font-bold text-white leading-snug"
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)" }}
          >
            {product.name}
          </h3>
        </div>
      </Link>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-4">
        <p
          className="text-xs leading-relaxed line-clamp-3 flex-1"
          style={{ color: "var(--color-light-muted)" }}
        >
          {product.description}
        </p>

        {/* Action row */}
        <div className="flex items-center gap-2 mt-auto">
          {/* Get Quote — primary */}
          <button
            onClick={openModal}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-sm font-display font-semibold uppercase transition-opacity duration-150 hover:opacity-85"
            style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              background: "var(--color-light-accent)",
              color: "#fff",
            }}
          >
            Get Quote
          </button>

          {/* Details — ghost square */}
          <Link
            href={`/products/${product.id}`}
            aria-label={`View details for ${product.name}`}
            className="flex items-center justify-center rounded-sm transition-colors duration-150"
            style={{
              width: 36,
              height: 36,
              border: "1px solid var(--color-light-border)",
              color: "var(--color-light-muted)",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-light-text)";
              el.style.color = "var(--color-light-text)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-light-border)";
              el.style.color = "var(--color-light-muted)";
            }}
          >
            <FiArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
