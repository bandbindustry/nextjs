// src/components/layout/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/config/site";
import { productCategories } from "@/data/products";
import { cn } from "@/utils/cn";
import {
  RiMenu3Line,
  RiCloseLine,
  RiArrowRightSLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import { FiArrowRight } from "react-icons/fi";
import Button from "../ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

// Pages that have a light/white background at the top
const LIGHT_BG_PATHS = ["/blog/"];

function isLightBgPage(pathname: string) {
  return LIGHT_BG_PATHS.some((p) => pathname.startsWith(p));
}

export default function Header() {
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(productCategories[0]);

  // ── Scroll detection ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Close everything on route change ──
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileCatsOpen(false);
  }, [pathname]);

  // ── Cleanup timer ──
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // ── Mega menu hover handlers ──
  function openMega() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }

  function closeMega() {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  }

  // Reset active product when mega opens
  function handleProductsEnter() {
    setActiveProduct(productCategories[0]);
    openMega();
  }

  const lightPage = isLightBgPage(pathname);
  // Show a light header when on a light-bg page and not yet scrolled
  const lightHeader = lightPage && !scrolled;

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "border-b py-3" : "py-5",
          !scrolled && lightHeader ? "border-b" : "",
        )}
        style={
          scrolled
            ? {
                background: "rgba(10,10,10,0.96)",
                backdropFilter: "blur(12px)",
                borderColor: "var(--color-border)",
              }
            : lightHeader
              ? {
                  background: "rgba(255,255,255,0.97)",
                  backdropFilter: "blur(12px)",
                  borderColor: "#e5e5e5",
                }
              : {}
        }
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      >
        <Container className="flex items-center justify-between">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-16 h-10 rounded-sm overflow-hidden flex items-center justify-center">
              <Image
                src="/logo/B&BLogo.png"
                alt={siteConfig.name}
                width={56}
                height={56}
                className={cn(
                  "object-contain brightness-0",
                  lightHeader ? "" : "invert",
                )}
                priority
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isProducts = link.label === "Products";
              const isActive = isProducts
                ? pathname.startsWith("/products")
                : pathname === link.href;

              return isProducts ? (
                <button
                  key={link.href}
                  onMouseEnter={handleProductsEnter}
                  onMouseLeave={closeMega}
                  onClick={() => setMegaOpen((v) => !v)}
                  className={cn(
                    "relative px-4 py-2 text-xs font-display uppercase tracking-widest transition-colors duration-200 flex items-center gap-1 cursor-pointer",
                    isActive || megaOpen
                      ? "text-[var(--color-accent)]"
                      : lightHeader
                        ? "text-neutral-600 hover:text-black"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                  )}
                >
                  {link.label}
                  <motion.span
                    animate={{ rotate: megaOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <RiArrowDownSLine size={14} />
                  </motion.span>
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-xs font-display uppercase tracking-widest transition-colors duration-200",
                    isActive
                      ? "text-[var(--color-accent)]"
                      : lightHeader
                        ? "text-neutral-600 hover:text-black"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            {/* No href — opens modal only */}
            <Button variant="primary" onClick={() => {}}>
              Get a Quote <FiArrowRight size={12} />
            </Button>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: lightHeader ? "#000" : "var(--color-text)" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {mobileOpen ? (
                  <RiCloseLine size={22} />
                ) : (
                  <RiMenu3Line size={22} />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </Container>

        {/* ── Invisible hover bridge ── */}
        {megaOpen && (
          <div
            className="absolute left-0 right-0 h-3"
            style={{ top: "calc(100% - 4px)", zIndex: 1 }}
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          />
        )}

        {/* ── Mega Menu ── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              className="hidden md:block absolute top-full left-0 right-0"
              style={{
                background: "var(--color-surface)",
                borderTop: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)",
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <Container className="py-8">
                <div className="grid grid-cols-12 gap-8">
                  {/* Left — category list */}
                  <div className="col-span-5">
                    <p
                      className="text-[10px] font-display uppercase tracking-[0.2em] mb-4"
                      style={{ color: "var(--color-text-faint)" }}
                    >
                      Product Categories
                    </p>
                    <ul className="space-y-1">
                      {productCategories.map((cat, idx) => (
                        <motion.li
                          key={cat.id}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.05 + idx * 0.04,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                        >
                          <button
                            className="w-full text-left px-3 py-2.5 rounded-sm flex items-center justify-between transition-all duration-150 cursor-pointer"
                            style={{
                              background:
                                activeProduct.id === cat.id
                                  ? "var(--color-surface-2)"
                                  : "transparent",
                              border:
                                activeProduct.id === cat.id
                                  ? "1px solid var(--color-border)"
                                  : "1px solid transparent",
                            }}
                            onMouseEnter={() => setActiveProduct(cat)}
                          >
                            <div>
                              <p
                                className="font-display font-semibold text-sm"
                                style={{
                                  color:
                                    activeProduct.id === cat.id
                                      ? "var(--color-accent)"
                                      : "var(--color-text-muted)",
                                }}
                              >
                                {cat.name}
                              </p>
                              <p
                                className="text-xs mt-0.5"
                                style={{ color: "var(--color-text-faint)" }}
                              >
                                {cat.description}
                              </p>
                            </div>
                            <RiArrowRightSLine
                              size={16}
                              style={{
                                color:
                                  activeProduct.id === cat.id
                                    ? "var(--color-accent)"
                                    : "var(--color-text-faint)",
                              }}
                            />
                          </button>
                        </motion.li>
                      ))}
                    </ul>

                    <div
                      className="mt-4 pt-4"
                      style={{ borderTop: "1px solid var(--color-border)" }}
                    >
                      <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest transition-colors hover:opacity-75"
                        style={{ color: "var(--color-accent)" }}
                      >
                        View All Products <FiArrowRight size={11} />
                      </Link>
                    </div>
                  </div>

                  {/* Right — active product preview */}
                  <div className="col-span-7">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeProduct.id}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: EASE }}
                      >
                        <div className="grid grid-cols-5 gap-4">
                          {/* Image */}
                          <div
                            className="col-span-3 aspect-[16/10] rounded-sm overflow-hidden relative"
                            style={{
                              background: "var(--color-surface-2)",
                              border: "1px solid var(--color-border)",
                            }}
                          >
                            <Image
                              src={`https://picsum.photos/seed/${activeProduct.id}/600/400`}
                              alt={activeProduct.name}
                              fill
                              className="object-cover opacity-70"
                              sizes="400px"
                            />
                            <div
                              className="absolute bottom-0 left-0 right-0 px-4 py-3"
                              style={{
                                background:
                                  "linear-gradient(transparent, rgba(10,10,10,0.9))",
                              }}
                            >
                              <p
                                className="font-display font-bold text-base"
                                style={{ color: "var(--color-text)" }}
                              >
                                {activeProduct.name}
                              </p>
                            </div>
                          </div>

                          {/* Variants */}
                          <div className="col-span-2 flex flex-col justify-between">
                            <div>
                              <p
                                className="text-[10px] font-display uppercase tracking-[0.2em] mb-3"
                                style={{ color: "var(--color-text-faint)" }}
                              >
                                Variants
                              </p>
                              <ul className="space-y-2.5">
                                {activeProduct.variants.map((variant) => (
                                  <li key={variant}>
                                    <Link
                                      href={`/products/${activeProduct.id}`}
                                      className="flex items-center gap-2 text-xs transition-colors duration-150"
                                      style={{
                                        color: "var(--color-text-muted)",
                                      }}
                                      onMouseEnter={(e) =>
                                        ((
                                          e.currentTarget as HTMLElement
                                        ).style.color = "var(--color-text)")
                                      }
                                      onMouseLeave={(e) =>
                                        ((
                                          e.currentTarget as HTMLElement
                                        ).style.color =
                                          "var(--color-text-muted)")
                                      }
                                    >
                                      <span
                                        className="w-1 h-1 rounded-full shrink-0"
                                        style={{
                                          background: "var(--color-accent)",
                                        }}
                                      />
                                      {variant}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <Link
                              href={`/products/${activeProduct.id}`}
                              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-display uppercase tracking-widest rounded-sm transition-all duration-200 mt-4"
                              style={{
                                border: "1px solid var(--color-border)",
                                color: "var(--color-text-muted)",
                              }}
                              onMouseEnter={(e) => {
                                (
                                  e.currentTarget as HTMLElement
                                ).style.borderColor = "var(--color-accent)";
                                (e.currentTarget as HTMLElement).style.color =
                                  "var(--color-accent)";
                              }}
                              onMouseLeave={(e) => {
                                (
                                  e.currentTarget as HTMLElement
                                ).style.borderColor = "var(--color-border)";
                                (e.currentTarget as HTMLElement).style.color =
                                  "var(--color-text-muted)";
                              }}
                            >
                              Explore <FiArrowRight size={11} />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden pt-20 overflow-y-auto"
            style={{ background: "var(--color-bg)" }}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div
              className="px-4 pb-8 pt-6"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              {/* Nav links — skip "Products" (handled separately below) */}
              <nav className="flex flex-col gap-1">
                {navLinks
                  .filter((l) => l.label !== "Products")
                  .map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "px-4 py-3 text-sm font-display uppercase tracking-widest rounded-sm transition-colors",
                        pathname === link.href
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-text-muted)]",
                      )}
                      style={{ borderBottom: "1px solid var(--color-border)" }}
                    >
                      {link.label}
                    </Link>
                  ))}
              </nav>

              {/* Products accordion */}
              <div className="mt-1">
                <button
                  onClick={() => setMobileCatsOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-display uppercase tracking-widest transition-colors"
                  style={{
                    borderBottom: "1px solid var(--color-border)",
                    color: pathname.startsWith("/products")
                      ? "var(--color-accent)"
                      : "var(--color-text-muted)",
                  }}
                >
                  Products
                  <motion.span
                    animate={{ rotate: mobileCatsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <RiArrowDownSLine size={16} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileCatsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="py-3 grid grid-cols-2 gap-2 px-1">
                        {productCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/products/${cat.id}`}
                            onClick={() => setMobileOpen(false)}
                            className="p-3 rounded-sm text-xs font-display transition-all duration-150"
                            style={{
                              background: "var(--color-surface)",
                              border: "1px solid var(--color-border)",
                              color: "var(--color-text-muted)",
                            }}
                            onMouseEnter={(e) =>
                              ((
                                e.currentTarget as HTMLElement
                              ).style.borderColor = "var(--color-accent)")
                            }
                            onMouseLeave={(e) =>
                              ((
                                e.currentTarget as HTMLElement
                              ).style.borderColor = "var(--color-border)")
                            }
                          >
                            {cat.name}
                          </Link>
                        ))}

                        <Link
                          href="/products"
                          onClick={() => setMobileOpen(false)}
                          className="col-span-2 p-3 rounded-sm text-xs font-display uppercase tracking-widest text-center transition-all duration-150"
                          style={{
                            border: "1px solid var(--color-accent)",
                            color: "var(--color-accent)",
                          }}
                        >
                          View All Products
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile CTA */}
              <div className="mt-6">
                <Button
                  variant="primary"
                  className="w-full justify-center py-4"
                  onClick={() => setMobileOpen(false)}
                >
                  Get a Quote <FiArrowRight size={13} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
