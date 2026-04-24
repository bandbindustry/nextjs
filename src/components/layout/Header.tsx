// src/components/layout/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";
import {
  RiMenu3Line,
  RiCloseLine,
  RiArrowRightSLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import { FiArrowRight, FiTag, FiMail } from "react-icons/fi";
import Button from "../ui/Button";
import { getProductCategories, getProducts } from "@/services/product.service";
import type { ApiProductCategory } from "@/types/products";
import { useModal } from "@/context/ModalContext";
import { encryptUrlParam } from "@/utils/encryption";
import { useSettings } from "@/hooks/useSettings";

const EASE = [0.16, 1, 0.3, 1] as const;

// Pages that have a light/white background at the top
const LIGHT_BG_PATHS = ["/blog/", "/products/"];

function isLightBgPage(pathname: string) {
  return LIGHT_BG_PATHS.some((p) => pathname.startsWith(p));
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openModal } = useModal();
  const settings = useSettings();
  const salesEmail = settings.contact_sales_email;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<ApiProductCategory | null>(null);

  // ── Load categories via TanStack Query ──
  const { data: categories = [] } = useQuery({
    queryKey: ["product-categories"],
    queryFn: getProductCategories,
  });

  // Derive effective category: user hover selection OR first category
  const effectiveCategory = activeCategory ?? categories[0] ?? null;

  // ── Load products for active category via TanStack Query ──
  const { data: categoryProductsData, isFetching: productsLoading } = useQuery({
    queryKey: ["header-category-products", effectiveCategory?.id],
    queryFn: () =>
      getProducts({ category_id: effectiveCategory!.id, per_page: 6 }),
    enabled: !!effectiveCategory?.id,
  });
  const categoryProducts = categoryProductsData?.data ?? [];

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

  // Reset active category when mega opens (null → effectiveCategory falls back to categories[0])
  function handleProductsEnter() {
    setActiveCategory(null);
    openMega();
  }

  const lightPage = isLightBgPage(pathname);
  // Show a light header when on a light-bg page and not yet scrolled
  const lightHeader = lightPage && !scrolled;

  return (
    <>
      <motion.header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-300",
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
                      ? lightHeader
                        ? "text-black font-semibold"
                        : "text-[var(--color-accent)]"
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
                      ? lightHeader
                        ? "text-black font-semibold"
                        : "text-[var(--color-accent)]"
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
            {/* Sales email link */}
            {salesEmail && (
              <a
                href={`mailto:${salesEmail}`}
                className="flex items-center gap-1.5 font-display uppercase tracking-widest transition-opacity hover:opacity-70"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  color: lightHeader
                    ? "var(--color-text-muted)"
                    : "var(--color-text-muted)",
                }}
              >
                <FiMail size={12} />
                {salesEmail}
              </a>
            )}

            {/* Opens quote modal */}
            <Button variant="primary" onClick={openModal}>
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
                background: "#fff",
                borderTop: "1px solid #e5e5e5",
                borderBottom: "1px solid #e5e5e5",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
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
                      style={{ color: "#999" }}
                    >
                      Product Categories
                    </p>
                    <ul className="space-y-1">
                      {categories.map((cat, idx) => (
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
                                effectiveCategory?.id === cat.id
                                  ? "#000"
                                  : "transparent",
                              border:
                                effectiveCategory?.id === cat.id
                                  ? "1px solid #e5e5e5"
                                  : "1px solid transparent",
                            }}
                            onMouseEnter={() => setActiveCategory(cat)}
                            onClick={() => {
                              setMegaOpen(false);
                              router.push(
                                `/products?category=${encryptUrlParam(cat.id)}`,
                              );
                            }}
                          >
                            <div>
                              <p
                                className="font-display font-semibold text-sm"
                                style={{
                                  color:
                                    effectiveCategory?.id === cat.id
                                      ? "var(--color-accent)"
                                      : "#333",
                                }}
                              >
                                {cat.name}
                              </p>
                              {cat.description && (
                                <p
                                  className="text-xs mt-0.5"
                                  style={{ color: "#888" }}
                                >
                                  {cat.description}
                                </p>
                              )}
                            </div>
                            <RiArrowRightSLine
                              size={16}
                              style={{
                                color:
                                  effectiveCategory?.id === cat.id
                                    ? "var(--color-accent)"
                                    : "#bbb",
                              }}
                            />
                          </button>
                        </motion.li>
                      ))}
                    </ul>

                    <div
                      className="mt-4 pt-4"
                      style={{ borderTop: "1px solid #e5e5e5" }}
                    >
                      <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest transition-colors hover:opacity-75"
                        style={{ color: "var(--color-black)" }}
                      >
                        View All Products <FiArrowRight size={11} />
                      </Link>
                    </div>
                  </div>

                  {/* Right — category products */}
                  <div className="col-span-7">
                    <AnimatePresence mode="wait">
                      {effectiveCategory && (
                        <motion.div
                          key={effectiveCategory.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.2, ease: EASE }}
                        >
                          <p
                            className="text-[10px] font-display uppercase tracking-[0.2em] mb-3"
                            style={{ color: "#999" }}
                          >
                            {effectiveCategory.name}
                          </p>

                          {productsLoading ? (
                            <div className="grid grid-cols-3 gap-3">
                              {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="rounded-sm animate-pulse"
                                  style={{
                                    background: "#f5f5f5",
                                    aspectRatio: "4/3",
                                  }}
                                />
                              ))}
                            </div>
                          ) : categoryProducts.length === 0 ? (
                            <p
                              className="text-sm py-4"
                              style={{ color: "#999" }}
                            >
                              No products in this category.
                            </p>
                          ) : (
                            <div className="grid grid-cols-3 gap-3">
                              {categoryProducts.slice(0, 6).map((product) => (
                                <Link
                                  key={product.id}
                                  href={`/products/${product.id}`}
                                  onClick={() => setMegaOpen(false)}
                                  className="group rounded-sm overflow-hidden transition-shadow duration-200 hover:shadow-md"
                                  style={{ border: "1px solid #e5e5e5" }}
                                >
                                  <div
                                    className="relative overflow-hidden"
                                    style={{
                                      aspectRatio: "4/3",
                                      background: "#f5f5f5",
                                    }}
                                  >
                                    {product.images?.[0] ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <FiTag
                                          size={20}
                                          style={{ color: "#ccc" }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <div className="px-2.5 py-2">
                                    <p
                                      className="text-xs font-display font-semibold leading-tight line-clamp-2 transition-colors group-hover:text-[var(--color-accent)]"
                                      style={{ color: "#333" }}
                                    >
                                      {product.name}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}

                          <div
                            className="mt-4 pt-3 flex items-center justify-between"
                            style={{ borderTop: "1px solid #e5e5e5" }}
                          >
                            <Link
                              href={`/products?category=${encryptUrlParam(effectiveCategory.id)}`}
                              onClick={() => setMegaOpen(false)}
                              className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest transition-opacity hover:opacity-75"
                              style={{ color: "var(--color-accent)" }}
                            >
                              View All in {effectiveCategory.name}{" "}
                              <FiArrowRight size={11} />
                            </Link>
                            <button
                              onClick={openModal}
                              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-display uppercase tracking-widest rounded-sm transition-opacity duration-200 hover:opacity-85"
                              style={{
                                background: "var(--color-accent)",
                                color: "#fff",
                              }}
                            >
                              Get a Quote
                            </button>
                          </div>
                        </motion.div>
                      )}
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
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/products?category=${encryptUrlParam(cat.id)}`}
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
                  onClick={() => {
                    setMobileOpen(false);
                    openModal();
                  }}
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
