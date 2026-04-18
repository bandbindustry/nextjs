"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useModal } from "@/context/ModalContext";
import Container from "@/components/ui/Container";
import { FiArrowUpRight } from "react-icons/fi";
import {
  RiBookOpenLine,
  RiUserVoiceLine,
  RiPriceTag3Line,
} from "react-icons/ri";
import { staggerContainer, fadeUp } from "@/lib/motion";

type ItemAction = "link" | "modal";

interface InsightItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  action: ItemAction;
  href?: string;
}

const items: InsightItem[] = [
  {
    id: "learn",
    icon: <RiBookOpenLine size={36} />,
    title: "Learn More",
    description:
      "Explore our full product catalogue, specs, and technical documentation.",
    href: "/products",
    action: "link",
  },
  {
    id: "expert",
    icon: <RiUserVoiceLine size={36} />,
    title: "Talk to an Expert",
    description:
      "Speak directly with our engineering team about your requirements.",
    action: "modal",
  },
  {
    id: "quote",
    icon: <RiPriceTag3Line size={36} />,
    title: "Get a Quote",
    description:
      "Tell us your project details and receive a custom quote within 24 hours.",
    href: "/contact",
    action: "link",
  },
];

export default function InsightSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, {
    once: true,
    margin: "-80px 0px",
  });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-80px 0px" });
  const { openModal } = useModal();

  // ── Desktop card ────────────────────────────────────────────────────────
  function CardInner({ item, i }: { item: InsightItem; i: number }) {
    return (
      <motion.div
        className="relative flex flex-col items-center text-center px-8 py-12 rounded-sm cursor-pointer overflow-hidden h-full"
        style={{
          background: "var(--color-light-bg)",
          border: "1px solid var(--color-light-border)",
        }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Bottom accent line */}
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] w-full"
          style={{
            background: "var(--color-light-accent)",
            scaleX: 0,
            transformOrigin: "left",
          }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Card number */}
        <span
          className="absolute top-4 left-5 font-display font-bold text-[11px] tracking-[0.2em]"
          style={{ color: "var(--color-light-faint)" }}
        >
          0{i + 1}
        </span>

        {/* Arrow */}
        <motion.span
          className="absolute top-4 right-5"
          style={{ color: "var(--color-light-accent)", opacity: 0.35 }}
          whileHover={{ x: 4, y: -4, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <FiArrowUpRight size={18} />
        </motion.span>

        {/* Icon */}
        <motion.span
          className="mb-6 flex items-center justify-center w-16 h-16 rounded-sm"
          style={{
            background: "var(--color-light-surface-2)",
            border: "1px solid var(--color-light-border)",
            color: "var(--color-light-accent)",
          }}
          whileHover={{ y: -4, scale: 1.15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {item.icon}
        </motion.span>

        {/* Title */}
        <h3
          className="font-display font-bold mb-3"
          style={{
            fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
            color: "var(--color-light-text)",
          }}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-light-muted)" }}
        >
          {item.description}
        </p>

        {/* CTA text */}
        <span
          className="mt-6 text-xs font-display uppercase tracking-widest font-semibold flex items-center gap-1.5"
          style={{ color: "var(--color-light-accent)" }}
        >
          {item.title}
          <FiArrowUpRight size={13} />
        </span>
      </motion.div>
    );
  }

  // ── Mobile row ───────────────────────────────────────────────────────────
  function MobileRow({ item }: { item: InsightItem }) {
    const inner = (
      <>
        <span
          className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
          style={{
            background: "var(--color-light-surface-2)",
            color: "var(--color-light-accent)",
          }}
        >
          {item.icon}
        </span>
        <span
          className="font-display font-semibold text-sm flex-1"
          style={{ color: "var(--color-light-text)" }}
        >
          {item.title}
        </span>
        <FiArrowUpRight
          size={16}
          style={{ color: "var(--color-light-accent)" }}
        />
      </>
    );

    const rowStyle: React.CSSProperties = {
      background: "var(--color-light-bg)",
      border: "1px solid var(--color-light-border)",
    };

    const hoverHandlers = {
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--color-light-accent)";
      },
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--color-light-border)";
      },
    };

    if (item.action === "modal") {
      return (
        <button
          key={item.id + "-mob"}
          onClick={openModal}
          className="flex items-center gap-4 px-5 py-4 rounded-sm transition-colors duration-200 w-full text-left"
          style={rowStyle}
          {...hoverHandlers}
        >
          {inner}
        </button>
      );
    }

    return (
      <Link
        key={item.id + "-mob"}
        href={item.href!}
        className="flex items-center gap-4 px-5 py-4 rounded-sm transition-colors duration-200"
        style={rowStyle}
        {...hoverHandlers}
      >
        {inner}
      </Link>
    );
  }

  return (
    <section
      className="section-light section-pad"
      style={{
        borderTop: "1px solid var(--color-light-border)",
        borderBottom: "1px solid var(--color-light-border)",
      }}
    >
      <Container>
        {/* ── Heading ── */}
        <motion.div
          ref={headingRef}
          className="text-center mb-14"
          variants={fadeUp}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
        >
          <p
            className="eyebrow mb-3"
            style={{ color: "var(--color-light-faint)" }}
          >
            In-Depth Product Knowledge
          </p>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              color: "var(--color-light-text)",
              lineHeight: 1.15,
            }}
          >
            Everything You Need to{" "}
            <span style={{ color: "var(--color-light-accent)" }}>
              Make a Decision
            </span>
          </h2>
        </motion.div>

        {/* ── Desktop Cards ── */}
        <motion.div
          ref={cardsRef}
          className="hidden md:grid grid-cols-3 gap-4 lg:gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
        >
          {items.map((item, i) =>
            item.action === "modal" ? (
              <motion.div key={item.id} variants={fadeUp}>
                <button
                  onClick={openModal}
                  className="block text-left w-full h-full"
                  tabIndex={0}
                >
                  <CardInner item={item} i={i} />
                </button>
              </motion.div>
            ) : (
              <motion.div key={item.id} variants={fadeUp}>
                <Link href={item.href!} className="block h-full" tabIndex={-1}>
                  <CardInner item={item} i={i} />
                </Link>
              </motion.div>
            ),
          )}
        </motion.div>

        {/* ── Mobile list ── */}
        <div className="md:hidden flex flex-col gap-3 mt-6">
          {items.map((item) => (
            <MobileRow key={item.id + "-mob"} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
