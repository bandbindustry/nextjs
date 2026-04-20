// src/components/ui/Modal.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { FiX } from "react-icons/fi";

const EASE = [0.16, 1, 0.3, 1] as const;

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.98,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Accent image shown in the left panel (optional) */
  accentImage?: string;
  /** Accent color override — defaults to var(--color-light-accent) */
  accentColor?: string;
  /** Small eyebrow label above the title */
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  /** Max-width of the whole modal — default 860px */
  maxWidth?: number;
}

export default function Modal({
  open,
  onClose,
  accentImage,
  accentColor,
  eyebrow,
  title,
  children,
  maxWidth = 860,
}: ModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ── Keyboard & scroll-lock ── */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  /* Reset scroll position when modal opens */
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        /* Backdrop */
        <motion.div
          key="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{
            background: "rgba(0,0,0,0.48)",
            backdropFilter: "blur(4px)",
          }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Panel */}
          <motion.div
            key="modal-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full flex overflow-hidden rounded-sm"
            style={{
              maxWidth,
              height: "min(90dvh, 680px)",
              background: "var(--color-light-bg)",
              border: "1px solid var(--color-light-border)",
              boxShadow:
                "0 4px 24px oklch(0.2 0.01 80 / 0.12), 0 24px 64px oklch(0.2 0.01 80 / 0.18)",
            }}
          >
            {/* ── Left accent panel ── */}
            <div
              className="hidden sm:flex flex-col justify-between flex-shrink-0 relative overflow-hidden"
              style={{
                width: 220,
                background: accentColor
                  ? accentColor
                  : "var(--color-light-accent)",
              }}
            >
              {/* Image overlay */}
              {accentImage && (
                <img
                  src={accentImage}
                  alt=""
                  width={220}
                  height={680}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
                />
              )}

              {/* Geometric decoration */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                  className="absolute -bottom-16 -left-16 rounded-full"
                  style={{
                    width: 280,
                    height: 280,
                    background: "rgba(255,255,255,0.06)",
                  }}
                />
                <div
                  className="absolute -top-8 -right-8 rounded-full"
                  style={{
                    width: 140,
                    height: 140,
                    background: "rgba(255,255,255,0.04)",
                  }}
                />
                {/* Vertical rule */}
                <div
                  className="absolute left-8 top-12 bottom-12"
                  style={{ width: 1, background: "rgba(255,255,255,0.2)" }}
                />
              </div>

              {/* Top label */}
              <div className="relative p-6 pt-8">
                <span
                  className="font-display uppercase font-bold tracking-widest"
                  style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)" }}
                >
                  B&amp;B Industries
                </span>
              </div>

              {/* Bottom tagline */}
              <div className="relative p-6 pb-8">
                <p
                  className="font-display font-black leading-tight"
                  style={{
                    fontSize: "clamp(1.1rem,2vw,1.4rem)",
                    color: "#fff",
                  }}
                >
                  Precision.
                  <br />
                  Engineered.
                </p>
              </div>
            </div>

            {/* ── Right content panel ── */}
            <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden">
              {/* Sticky header */}
              <div
                className="flex items-start justify-between gap-4 px-6 pt-6 pb-5 shrink-0"
                style={{ borderBottom: "1px solid var(--color-light-border)" }}
              >
                <div className="flex flex-col gap-1 min-w-0">
                  {eyebrow && (
                    <span
                      className="font-display uppercase font-semibold"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        color: "var(--color-light-accent)",
                      }}
                    >
                      {eyebrow}
                    </span>
                  )}
                  <h2
                    id="modal-title"
                    className="font-display font-black leading-tight truncate"
                    style={{
                      fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
                      color: "var(--color-light-text)",
                    }}
                  >
                    {title}
                  </h2>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="flex-shrink-0 flex items-center justify-center rounded-sm transition-colors duration-150"
                  style={{
                    width: 32,
                    height: 32,
                    color: "var(--color-light-faint)",
                    background: "var(--color-light-surface)",
                    border: "1px solid var(--color-light-border)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--color-light-text)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--color-light-muted)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--color-light-faint)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--color-light-border)";
                  }}
                >
                  <FiX size={15} />
                </button>
              </div>

              {/* ── Scrollable body ── */}
              {/* data-lenis-prevent: tells Lenis to skip this element so
                  wheel / two-finger-trackpad events reach the native
                  overflow-y-auto scroll container instead of the page. */}
              <div
                ref={scrollRef}
                data-lenis-prevent
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-5"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "var(--color-light-border) transparent",
                }}
              >
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
