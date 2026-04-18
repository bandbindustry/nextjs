/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import type { BlogPost } from "@/types/blog";
import Link from "next/link";
import { FiArrowRight, FiClock } from "react-icons/fi";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE },
  },
};

export default function BlogHero({
  featured,
}: {
  featured: BlogPost | undefined;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayO = useTransform(scrollYProgress, [0, 0.6], [0.5, 0.78]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  if (!featured) return null;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[88vh] flex items-end overflow-hidden"
      style={{ background: "var(--color-light-bg)" }}
    >
      {/* ── Parallax image ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: imageY }}
      >
        <img
          src={featured.coverImage}
          alt={featured.title}
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      {/* ── Overlays ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,1)", opacity: overlayO }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%)",
        }}
      />

      {/* ── Fine grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Left accent rule ── */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] origin-top"
        style={{ background: "var(--color-light-accent)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
      />

      {/* ── Content ── */}
      <Container className="relative z-10 pb-16 pt-40">
        <motion.div style={{ y: contentY }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className=""
          >
            {/* Eyebrow row */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-6"
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--color-light-accent)" }}
                />
                <span
                  className="font-display uppercase font-semibold"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                  }}
                >
                  Featured Article
                </span>
              </div>

              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="font-display uppercase font-semibold"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {featured.category}
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-black leading-[1.0] mb-5 tracking-tight"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                color: "white",
              }}
            >
              {featured.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.6)", maxWidth: "52ch" }}
            >
              {featured.excerpt}
            </motion.p>

            {/* Meta + CTA row */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-5"
            >
              {/* Author + date */}
              {/* <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-xs"
                  style={{
                    background: "var(--color-light-accent)",
                    color: "white",
                  }}
                >
                  {featured.author.charAt(0)}
                </div>
                <div>
                  <p
                    className="font-display font-semibold text-xs"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {featured.author}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {new Date(featured.publishedAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div> */}

              {/* Reading time */}
              <div
                className="flex items-center gap-1.5"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <FiClock size={12} />
                <span className="text-xs">{featured.readingTime}</span>
              </div>

              {/* CTA */}
              <Link
                href={`/blog/${featured.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-display font-semibold uppercase tracking-widest text-xs transition-opacity duration-150 hover:opacity-85 ml-auto sm:ml-0"
                style={{
                  background: "var(--color-light-accent)",
                  color: "white",
                }}
              >
                Read Article
                <FiArrowRight size={12} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
