"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import type { BlogPost } from "@/types/blog";
import { FiArrowRight, FiClock } from "react-icons/fi";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function PostCard({ post }: { post: BlogPost }) {
  return (
    <motion.article variants={fadeUp} className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col h-full rounded-sm overflow-hidden relative"
        style={{
          background: "var(--color-light-bg)",
          border: "1px solid var(--color-light-border)",
          textDecoration: "none",
        }}
      >
        {/* Top accent line on hover */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] z-10 origin-left"
          style={{ background: "var(--color-light-accent)" }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
        />

        {/* Cover */}
        <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <img
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={630}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          {/* Category + reading time */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="font-display uppercase font-semibold px-2.5 py-1 rounded-sm"
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
            <div
              className="flex items-center gap-1"
              style={{ color: "var(--color-light-faint)" }}
            >
              <FiClock size={11} />
              <span style={{ fontSize: "11px" }}>{post.readingTime}</span>
            </div>
          </div>

          <h2
            className="font-display font-bold mb-2 leading-snug transition-colors duration-200"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
              color: "var(--color-light-text)",
            }}
          >
            {post.title}
          </h2>

          <p
            className="text-sm leading-relaxed flex-1 mb-4"
            style={{ color: "var(--color-light-muted)" }}
          >
            {post.excerpt}
          </p>

          {/* Footer */}
          <div
            className="flex items-center justify-between pt-4"
            style={{ borderTop: "1px solid var(--color-light-border)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center font-display font-bold shrink-0"
                style={{
                  background: `oklch(from var(--color-light-accent) l c h / 0.1)`,
                  color: "var(--color-light-accent)",
                  fontSize: "9px",
                }}
              >
                {post.author.charAt(0)}
              </div>
              <span
                style={{ fontSize: "11px", color: "var(--color-light-faint)" }}
              >
                {post.author}
              </span>
            </div>

            <div
              className="flex items-center gap-1 transition-colors duration-200"
              style={{ color: "var(--color-light-accent)" }}
            >
              <span style={{ fontSize: "11px" }}>Read</span>
              <FiArrowRight size={11} />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      className="section-pad section-light"
      style={{ borderTop: "1px solid var(--color-light-border)" }}
    >
      <Container>
        {/* Heading */}
        <motion.div
          ref={headRef}
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="h-px w-8 shrink-0"
              style={{
                background: "var(--color-light-accent)",
                opacity: 0.4,
              }}
            />
            <span
              className="eyebrow"
              style={{ margin: 0, color: "var(--color-light-faint)" }}
            >
              Insights
            </span>
          </div>

          <h1
            className="font-display font-bold"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "var(--color-light-text)",
            }}
          >
            From the{" "}
            <span style={{ color: "var(--color-light-accent)" }}>Workshop</span>
          </h1>

          <motion.div
            className="rounded-full mt-4 mb-4"
            style={{
              height: "3px",
              background: "var(--color-light-accent)",
              width: 0,
            }}
            animate={headInView ? { width: "48px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          />

          <p
            className="text-base"
            style={{
              color: "var(--color-light-muted)",
              maxWidth: "48ch",
            }}
          >
            Technical insights, product guides, and manufacturing best practices
            from our engineering team.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={stagger}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
