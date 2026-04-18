"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import type { BlogPost } from "@/types/blog";
import {
  FiArrowLeft,
  FiClock,
  FiUser,
  FiCalendar,
  FiArrowRight,
  FiTag,
} from "react-icons/fi";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

interface Props {
  post: BlogPost;
  related: BlogPost[];
}

export default function BlogDetail({ post, related }: Props) {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative pt-32 pb-0 overflow-hidden"
        style={{ background: "var(--color-light-bg)" }}
      >
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Back link */}
            <motion.div variants={fadeUp} className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
                style={{ color: "var(--color-light-faint)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--color-light-accent)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--color-light-faint)")
                }
              >
                <FiArrowLeft size={13} />
                Back to Blog
              </Link>
            </motion.div>

            {/* Category badge */}
            <motion.div variants={fadeUp} className="mb-4">
              <span
                className="inline-flex items-center font-display uppercase font-semibold px-3 py-1.5 rounded-sm"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  background: `oklch(from var(--color-light-accent) l c h / 0.08)`,
                  color: "var(--color-light-accent)",
                  border: `1px solid oklch(from var(--color-light-accent) l c h / 0.2)`,
                }}
              >
                {post.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-black leading-tight mb-6"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                color: "var(--color-light-text)",
              }}
            >
              {post.title}
            </motion.h1>

            {/* Meta row */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-5 pb-8"
              style={{ borderBottom: "1px solid var(--color-light-border)" }}
            >
              {[
                { icon: <FiUser size={13} />, label: post.author },
                {
                  icon: <FiCalendar size={13} />,
                  label: new Date(post.publishedAt).toLocaleDateString(
                    "en-IN",
                    { day: "numeric", month: "long", year: "numeric" },
                  ),
                },
                { icon: <FiClock size={13} />, label: post.readingTime },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-sm"
                  style={{ color: "var(--color-light-muted)" }}
                >
                  <span style={{ color: "var(--color-light-accent)" }}>
                    {icon}
                  </span>
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </Container>

        {/* Cover image */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          <Container>
            <div
              className="rounded-sm overflow-hidden"
              style={{
                aspectRatio: "16/7",
                border: "1px solid var(--color-light-border)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={630}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </Container>
        </motion.div>
      </section>

      {/* ── Content ── */}
      <section
        className="section-pad section-light"
        style={{ borderTop: "1px solid var(--color-light-border)" }}
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-12 items-start">
            {/* ── HTML body ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div
                  className="flex flex-wrap items-center gap-2 mt-10 pt-8"
                  style={{ borderTop: "1px solid var(--color-light-border)" }}
                >
                  <FiTag
                    size={13}
                    style={{ color: "var(--color-light-faint)" }}
                  />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-sm text-xs font-display font-medium"
                      style={{
                        background: `oklch(from var(--color-light-accent) l c h / 0.07)`,
                        color: "var(--color-light-accent)",
                        border: `1px solid oklch(from var(--color-light-accent) l c h / 0.18)`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* ── Sidebar ── */}
            <motion.aside
              className="lg:sticky lg:top-28 flex flex-col gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            >
              {/* Author card */}
              <div
                className="p-5 rounded-sm"
                style={{
                  background: "var(--color-light-surface)",
                  border: "1px solid var(--color-light-border)",
                }}
              >
                <p
                  className="font-display uppercase font-semibold mb-3"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    color: "var(--color-light-faint)",
                  }}
                >
                  Written by
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-sm"
                    style={{
                      background: `oklch(from var(--color-light-accent) l c h / 0.1)`,
                      color: "var(--color-light-accent)",
                    }}
                  >
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p
                      className="font-display font-bold text-sm"
                      style={{ color: "var(--color-light-text)" }}
                    >
                      {post.author}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--color-light-faint)" }}
                    >
                      B &amp; B Industries
                    </p>
                  </div>
                </div>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div
                  className="p-5 rounded-sm"
                  style={{
                    background: "var(--color-light-surface)",
                    border: "1px solid var(--color-light-border)",
                  }}
                >
                  <p
                    className="font-display uppercase font-semibold mb-4"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      color: "var(--color-light-faint)",
                    }}
                  >
                    Related Posts
                  </p>

                  <div
                    className="flex flex-col divide-y"
                    style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}
                  >
                    {related.map((r, i) => (
                      <Link
                        key={r.slug}
                        href={`/blog/${r.slug}`}
                        className="group flex flex-col gap-1 transition-opacity duration-150 hover:opacity-75"
                        style={{
                          padding: i === 0 ? "0 0 14px" : "14px 0",
                          borderColor: "var(--color-light-border)",
                        }}
                      >
                        <span
                          className="text-sm font-display font-semibold leading-snug transition-colors duration-150 group-hover:text-[var(--color-light-accent)]"
                          style={{ color: "var(--color-light-text)" }}
                        >
                          {r.title}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <FiClock
                            size={10}
                            style={{ color: "var(--color-light-faint)" }}
                          />
                          <span
                            className="text-xs"
                            style={{ color: "var(--color-light-faint)" }}
                          >
                            {r.readingTime}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA card */}
              <div
                className="p-5 rounded-sm overflow-hidden relative"
                style={{
                  background: "var(--color-light-accent)",
                }}
              >
                {/* Watermark */}
                <span
                  className="absolute right-3 bottom-2 font-display font-black select-none pointer-events-none leading-none"
                  style={{
                    fontSize: "4.5rem",
                    color: "rgba(0,0,0,0.07)",
                  }}
                >
                  RFQ
                </span>

                <div className="relative z-10">
                  <p
                    className="font-display font-black text-sm mb-1.5 leading-tight"
                    style={{ color: "#fff" }}
                  >
                    Need a precision component?
                  </p>
                  <p
                    className="text-xs leading-relaxed mb-4"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Our team responds within 24 hours with a detailed quote.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 w-full justify-center py-2.5 rounded-sm font-display font-semibold uppercase tracking-widest transition-opacity duration-150 hover:opacity-85"
                    style={{
                      background: "var(--color-light-bg)",
                      color: "var(--color-light-text)",
                      fontSize: "11px",
                    }}
                  >
                    Get a Quote <FiArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>
        </Container>
      </section>
    </>
  );
}
