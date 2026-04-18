// src/components/sections/products/SubCategoryRow.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import type { SubCategory } from "@/types/products";

interface Props {
  sub: SubCategory;
  catSlug: string;
}

export default function SubCategoryRow({ sub, catSlug }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-sm overflow-hidden"
      style={{ border: "1px solid var(--color-border)" }}
    >
      {/* ── Header button ── */}
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-150"
        style={{
          background: open
            ? "var(--color-surface-3)"
            : "var(--color-surface-2)",
        }}
      >
        <span
          className="text-sm font-display font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          {sub.name}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <FiChevronDown
            size={14}
            style={{ color: "var(--color-accent)" }}
          />
        </motion.div>
      </button>

      {/* ── Variants ── */}
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
              className="flex flex-col"
              style={{
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-surface)",
              }}
            >
              {sub.variants.map((v, i) => (
                <Link
                  key={v.slug}
                  href={`/products/${catSlug}/${sub.slug}/${v.slug}`}
                  className="group flex items-start justify-between px-5 py-2.5 transition-colors duration-150"
                  style={{
                    borderTop:
                      i === 0 ? "none" : "1px solid var(--color-border)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--color-surface-2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                  }}
                >
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {v.name}
                    </span>
                    {v.spec && (
                      <span
                        className="font-display uppercase"
                        style={{
                          fontSize: "9px",
                          letterSpacing: "0.12em",
                          color: "var(--color-text-faint)",
                        }}
                      >
                        {v.spec}
                      </span>
                    )}
                  </div>
                  <FiArrowRight
                    size={11}
                    className="mt-0.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150 shrink-0"
                    style={{ color: "var(--color-accent)" }}
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
