"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiHome,
  FiInfo,
  FiPackage,
  FiTool,
  FiMail,
  FiHelpCircle,
  FiFileText,
  FiShield,
  FiArrowUpRight,
  FiGrid,
  FiChevronRight,
} from "react-icons/fi";
import type { ApiProduct, ApiProductCategory } from "@/types/products";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.05 },
  }),
};

const staticPages = [
  { label: "Home", href: "/", icon: FiHome, description: "Welcome to B and B Industries" },
  { label: "About Us", href: "/about", icon: FiInfo, description: "Our story, team & certifications" },
  { label: "Products", href: "/products", icon: FiPackage, description: "Full product catalog" },
  { label: "Services", href: "/service", icon: FiTool, description: "After-sales support & service" },
  { label: "Articles", href: "/blog", icon: FiFileText, description: "Industry insights & updates" },
  { label: "FAQ", href: "/faq", icon: FiHelpCircle, description: "Frequently asked questions" },
  { label: "Contact Us", href: "/contact", icon: FiMail, description: "Get in touch with us" },
];

const legalPages = [
  { label: "Privacy Policy", href: "/privacy", icon: FiShield },
  { label: "Terms of Service", href: "/terms", icon: FiFileText },
];

interface Props {
  products: ApiProduct[];
  categories: ApiProductCategory[];
}

export default function SitemapContent({ products, categories }: Props) {
  // Group products by category
  const productsByCategory: Record<string, ApiProduct[]> = {};
  for (const product of products) {
    const catName = product.category_name || "Other";
    if (!productsByCategory[catName]) productsByCategory[catName] = [];
    productsByCategory[catName].push(product);
  }

  return (
    <section className="section-light-alt">
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(3rem, 5vw, 5rem) 1.25rem",
        }}
      >
        {/* ── Main Pages ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{ marginBottom: "3.5rem" }}
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-light-muted)",
              }}
            >
              Navigation
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "var(--color-light-border)",
              }}
            />
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {staticPages.map((page, i) => {
              const Icon = page.icon;
              return (
                <motion.div key={page.href} custom={i + 1} variants={fadeUp}>
                  <Link
                    href={page.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.875rem",
                      padding: "1rem 1.25rem",
                      background: "var(--color-light-bg)",
                      border: "1px solid var(--color-light-border)",
                      borderRadius: "6px",
                      color: "var(--color-light-text)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--color-light-accent)";
                      el.style.transform = "translateY(-2px)";
                      el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--color-light-border)";
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "8px",
                        background: "var(--color-light-surface)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={17} color="var(--color-light-muted)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: "var(--color-light-text)",
                          margin: 0,
                        }}
                      >
                        {page.label}
                      </p>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-light-muted)",
                          margin: 0,
                          marginTop: "2px",
                        }}
                      >
                        {page.description}
                      </p>
                    </div>
                    <FiChevronRight size={14} color="var(--color-light-faint)" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Products by Category ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{ marginBottom: "3.5rem" }}
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-light-muted)",
              }}
            >
              Products
            </span>
            <div style={{ flex: 1, height: "1px", background: "var(--color-light-border)" }} />
            <Link
              href="/products"
              style={{
                fontSize: "0.75rem",
                color: "var(--color-light-muted)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                flexShrink: 0,
              }}
            >
              View all <FiArrowUpRight size={12} />
            </Link>
          </motion.div>

          {Object.keys(productsByCategory).length === 0 ? (
            <motion.p
              custom={1}
              variants={fadeUp}
              style={{ color: "var(--color-light-muted)", fontSize: "0.9rem" }}
            >
              No products found.
            </motion.p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {Object.entries(productsByCategory).map(([catName, catProducts], catIdx) => (
                <motion.div key={catName} custom={catIdx + 1} variants={fadeUp}>
                  {/* Category header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <FiGrid size={13} color="var(--color-light-faint)" />
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        color: "var(--color-light-text)",
                      }}
                    >
                      {catName}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--color-light-faint)",
                        background: "var(--color-light-surface)",
                        border: "1px solid var(--color-light-border)",
                        borderRadius: "20px",
                        padding: "1px 8px",
                      }}
                    >
                      {catProducts.length}
                    </span>
                  </div>

                  {/* Product grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: "0.75rem",
                    }}
                  >
                    {catProducts.map((product) => {
                      const firstImage = product.images?.[0] ?? null;
                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.625rem",
                            padding: "0.625rem 0.875rem",
                            background: "var(--color-light-bg)",
                            border: "1px solid var(--color-light-border)",
                            borderRadius: "6px",
                            color: "var(--color-light-text)",
                            textDecoration: "none",
                            fontSize: "0.8125rem",
                            transition: "all 0.18s ease",
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = "var(--color-light-accent)";
                            el.style.background = "var(--color-light-surface)";
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = "var(--color-light-border)";
                            el.style.background = "var(--color-light-bg)";
                          }}
                        >
                          {/* Thumbnail */}
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: "4px",
                              overflow: "hidden",
                              flexShrink: 0,
                              background: "var(--color-light-surface)",
                              border: "1px solid var(--color-light-border)",
                            }}
                          >
                            {firstImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={firstImage}
                                alt={product.name}
                                loading="lazy"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <FiPackage size={14} color="var(--color-light-faint)" />
                              </div>
                            )}
                          </div>
                          <span
                            style={{
                              flex: 1,
                              minWidth: 0,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              color: "var(--color-light-text)",
                              fontWeight: 500,
                            }}
                          >
                            {product.name}
                          </span>
                          <FiArrowUpRight
                            size={11}
                            style={{ flexShrink: 0, color: "var(--color-light-faint)" }}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Legal Pages ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-light-muted)",
              }}
            >
              Legal
            </span>
            <div style={{ flex: 1, height: "1px", background: "var(--color-light-border)" }} />
          </motion.div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {legalPages.map((page, i) => {
              const Icon = page.icon;
              return (
                <motion.div key={page.href} custom={i + 1} variants={fadeUp}>
                  <Link
                    href={page.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1rem",
                      background: "var(--color-light-bg)",
                      border: "1px solid var(--color-light-border)",
                      borderRadius: "6px",
                      color: "var(--color-light-muted)",
                      textDecoration: "none",
                      fontSize: "0.8125rem",
                      transition: "all 0.18s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--color-light-accent)";
                      el.style.color = "var(--color-light-text)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--color-light-border)";
                      el.style.color = "var(--color-light-muted)";
                    }}
                  >
                    <Icon size={13} />
                    {page.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
