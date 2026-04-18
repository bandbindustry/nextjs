// src/sections/legal/LegalPage.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export interface LegalPageData {
  title: string;
  subtitle: string;
  lastUpdated: string;
  /** HTML string from the API */
  content: string;
  /** h2 headings extracted for the TOC */
  headings: string[];
}

// ── TOC ────────────────────────────────────────────────────
function TableOfContents({ headings }: { headings: string[] }) {
  if (headings.length === 0) return null;
  return (
    <nav
      className="sticky top-28 p-5 rounded-sm hidden lg:block"
      style={{
        background: "var(--color-light-surface)",
        border: "1px solid var(--color-light-border)",
      }}
    >
      <p
        className="font-display uppercase font-semibold mb-4"
        style={{
          fontSize: "10px",
          letterSpacing: "0.18em",
          color: "var(--color-light-faint)",
        }}
      >
        Contents
      </p>
      <div
        className="h-px mb-4"
        style={{ background: "var(--color-light-border)" }}
      />
      <ul className="space-y-2">
        {headings.map((heading, i) => (
          <li key={i}>
            <a
              href={`#heading-${i}`}
              className="block text-xs leading-snug transition-colors duration-150 py-0.5"
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
              {heading.replace(/^\d+\.\s*/, "")}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── Main export ────────────────────────────────────────────
export default function LegalPageLayout({
  page,
  variant,
}: {
  page: LegalPageData;
  variant: "privacy" | "terms" | "payment";
}) {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });

  const otherLinks = {
    privacy: { label: "Terms of Use", href: "/terms" },
    terms: { label: "Privacy Policy", href: "/privacy" },
    payment: { label: "Privacy Policy", href: "/privacy" },
  };
  const otherPage = otherLinks[variant];

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
                Legal
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
              {page.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base mb-6"
              style={{ color: "var(--color-text-muted)", maxWidth: "44ch" }}
            >
              {page.subtitle}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4"
            >
              <span
                className="text-xs px-3 py-1.5 rounded-sm"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-faint)",
                }}
              >
                Last updated:{" "}
                <span style={{ color: "var(--color-text-muted)" }}>
                  {new Date(page.lastUpdated).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </span>
              <Link
                href={otherPage.href}
                className="text-xs transition-colors duration-150 underline underline-offset-2"
                style={{ color: "var(--color-text-faint)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--color-accent)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--color-text-faint)")
                }
              >
                View {otherPage.label} →
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── Content ── */}
      <section className="section-pad section-light">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 items-start">
            <TableOfContents headings={page.headings} />

            <div>
              <div
                className="p-6 rounded-sm"
                style={{
                  background: "var(--color-light-bg)",
                  border: "1px solid var(--color-light-border)",
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    p: ({ children }) => (
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "var(--color-light-muted)" }}
                      >
                        {children}
                      </p>
                    ),
                    h2: ({ children }) => (
                      <h2
                        className="font-display font-bold mt-8 mb-3 pb-2"
                        style={{
                          fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                          color: "var(--color-light-text)",
                          borderBottom: "1px solid var(--color-light-border)",
                        }}
                      >
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3
                        className="font-display font-semibold mt-6 mb-2"
                        style={{
                          fontSize: "0.9375rem",
                          color: "var(--color-light-text)",
                        }}
                      >
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4
                        className="font-display font-semibold mt-4 mb-1.5"
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-light-accent)",
                        }}
                      >
                        {children}
                      </h4>
                    ),
                    ul: ({ children }) => (
                      <ul
                        className="mb-4 space-y-1.5 pl-4"
                        style={{
                          color: "var(--color-light-muted)",
                          listStyleType: "disc",
                        }}
                      >
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol
                        className="mb-4 space-y-1.5 pl-4"
                        style={{
                          color: "var(--color-light-muted)",
                          listStyleType: "decimal",
                        }}
                      >
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-sm leading-relaxed">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong
                        style={{
                          color: "var(--color-light-text)",
                          fontWeight: 600,
                        }}
                      >
                        {children}
                      </strong>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="underline underline-offset-2 transition-opacity duration-150 hover:opacity-75"
                        style={{ color: "var(--color-light-accent)" }}
                      >
                        {children}
                      </a>
                    ),
                    table: ({ children }) => (
                      <div
                        className="overflow-x-auto my-5 rounded-sm"
                        style={{
                          border: "1px solid var(--color-light-border)",
                        }}
                      >
                        <table className="w-full text-xs">{children}</table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th
                        className="text-left px-4 py-2.5 font-display font-semibold uppercase"
                        style={{
                          background: "var(--color-light-surface)",
                          color: "var(--color-light-muted)",
                          borderBottom: "1px solid var(--color-light-border)",
                          fontSize: "10px",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td
                        className="px-4 py-2.5 text-xs"
                        style={{
                          color: "var(--color-light-muted)",
                          borderBottom: "1px solid var(--color-light-border)",
                        }}
                      >
                        {children}
                      </td>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote
                        className="pl-4 my-4 italic text-sm"
                        style={{
                          borderLeft: "2px solid var(--color-light-accent)",
                          color: "var(--color-light-muted)",
                        }}
                      >
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {page.content}
                </ReactMarkdown>
              </div>

              {/* Footer note */}
              <div
                className="mt-4 p-5 rounded-sm text-xs leading-relaxed"
                style={{
                  background:
                    "oklch(from var(--color-light-accent) l c h / 0.05)",
                  border:
                    "1px solid oklch(from var(--color-light-accent) l c h / 0.15)",
                  color: "var(--color-light-faint)",
                }}
              >
                Last reviewed:{" "}
                <span style={{ color: "var(--color-light-muted)" }}>
                  {new Date(page.lastUpdated).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                . Questions? Email{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="underline underline-offset-2"
                  style={{ color: "var(--color-light-accent)" }}
                >
                  {siteConfig.contact.email}
                </a>
                .
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
