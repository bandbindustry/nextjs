// src/sections/faq/FaqPage.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import type { FaqItem } from "@/services/faq.service";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// ── Accordion Item ──────────────────────────────────────────
function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-sm overflow-hidden"
      style={{
        border: "1px solid var(--color-light-border)",
        background: "var(--color-light-bg)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left transition-colors duration-150"
        style={{
          background: isOpen
            ? "oklch(from var(--color-light-accent) l c h / 0.04)"
            : "transparent",
        }}
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4 min-w-0">
          <span
            className="font-display font-bold shrink-0 mt-0.5"
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "var(--color-light-accent)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="font-display font-semibold text-sm leading-snug"
            style={{ color: "var(--color-light-text)" }}
          >
            {item.question}
          </span>
        </div>
        {/* Plus / Minus icon */}
        <span
          className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-150"
          style={{
            background: isOpen
              ? "var(--color-light-accent)"
              : "var(--color-light-surface)",
            border: "1px solid var(--color-light-border)",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="4.5"
              y="1"
              width="1"
              height="8"
              rx="0.5"
              fill={isOpen ? "#fff" : "var(--color-light-muted)"}
              style={{
                transformOrigin: "center",
                transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                transition: "transform 0.2s ease",
              }}
            />
            <rect
              x="1"
              y="4.5"
              width="8"
              height="1"
              rx="0.5"
              fill={isOpen ? "#fff" : "var(--color-light-muted)"}
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-6 pb-5 pt-0"
              style={{
                borderTop: "1px solid var(--color-light-border)",
              }}
            >
              <p
                className="text-sm leading-relaxed pt-4"
                style={{ color: "var(--color-light-muted)" }}
              >
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main export ────────────────────────────────────────────
export default function FaqPageLayout({ faqs }: { faqs: FaqItem[] }) {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main style={{ background: "var(--color-bg)" }}>
      {/* ── Hero ── */}
      <section
        className="relative pt-32 pb-12 overflow-hidden"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(oklch(from var(--color-text) l c h / 0.04) 1px, transparent 1px),
              linear-gradient(90deg, oklch(from var(--color-text) l c h / 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 70% 80% at 30% 50%, black 30%, transparent 100%)",
          }}
        />
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px] origin-top"
          style={{ background: "var(--color-accent)" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
        />

        <Container className="relative z-10">
          <motion.div
            ref={headRef}
            variants={stagger}
            initial="hidden"
            animate={headInView ? "visible" : "hidden"}
            className="max-w-2xl"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-3 mb-6 px-3 py-1.5 rounded-sm"
              style={{
                background: "oklch(from var(--color-accent) l c h / 0.08)",
                border: "1px solid oklch(from var(--color-accent) l c h / 0.2)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              <span
                className="font-display uppercase font-semibold"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "var(--color-accent)",
                }}
              >
                Support
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display font-black tracking-tight mb-3"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                color: "var(--color-text)",
                lineHeight: 0.95,
              }}
            >
              Frequently Asked
              <br />
              Questions
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base mb-6"
              style={{ color: "var(--color-text-muted)", maxWidth: "44ch" }}
            >
              Everything you need to know about B&amp;B Industries — our
              products, processes, and policies.
            </motion.p>

            <motion.div variants={fadeUp}>
              <span
                className="text-xs px-3 py-1.5 rounded-sm"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-faint)",
                }}
              >
                {faqs.length} question{faqs.length !== 1 ? "s" : ""}
              </span>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── Accordion ── */}
      <section className="section-pad section-light">
        <Container>
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px 0px" }}
              className="space-y-3"
            >
              {faqs.map((item, i) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </motion.div>

            {faqs.length === 0 && (
              <p
                className="text-sm text-center py-16"
                style={{ color: "var(--color-light-faint)" }}
              >
                No FAQs available at the moment.
              </p>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
