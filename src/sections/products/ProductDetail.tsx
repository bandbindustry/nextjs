// src/sections/products/ProductDetail.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Container from "@/components/ui/Container";
import { getProductById } from "@/services/product.service";
import type { ApiProductDetail, ContentSection } from "@/types/products";
import { parseContentSections } from "@/types/products";
import { useModal } from "@/context/ModalContext";
import ProductCard from "./ProductCard";
import {
  FiArrowLeft,
  FiArrowRight,
  FiZap,
  FiTag,
  FiCheck,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiExternalLink,
  FiFileText,
} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-sm"
        style={{
          background: "rgba(255,255,255,0.1)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <FiX size={16} />
      </button>
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-sm text-xs font-display uppercase tracking-widest"
        style={{
          background: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.7)",
        }}
      >
        {current + 1} / {images.length}
      </div>
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-sm"
          style={{
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <FiChevronLeft size={18} />
        </button>
      )}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="max-w-5xl max-h-[85vh] mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[current]}
          alt={`Image ${current + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-sm"
        />
      </motion.div>
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-sm"
          style={{
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <FiChevronRight size={18} />
        </button>
      )}
    </motion.div>
  );
}

// ─── Content section renderer ─────────────────────────────────────────────────
function ContentSectionRenderer({ section }: { section: ContentSection }) {
  if (section.type === "content" && section.content) {
    return (
      <div className="blog-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {section.content}
        </ReactMarkdown>
      </div>
    );
  }
  if (section.type === "image" && section.image) {
    const src = section.image.startsWith("http")
      ? section.image
      : `http://adminpanel.bandbindustry.com/uploads/product/${section.image}`;
    return (
      <figure className="my-6">
        <div
          className="rounded-sm overflow-hidden"
          style={{ border: "1px solid var(--color-light-border)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={section.alt ?? ""}
            loading="lazy"
            className="w-full object-contain"
            style={{ maxHeight: 480, display: "block", background: "#f8f8f8" }}
          />
        </div>
        {section.caption && (
          <figcaption
            className="text-xs mt-2.5 text-center italic"
            style={{ color: "var(--color-light-faint)" }}
          >
            {section.caption}
          </figcaption>
        )}
      </figure>
    );
  }
  if (section.type === "link" && section.link_url) {
    return (
      <div
        className="flex items-start gap-4 px-5 py-4 rounded-sm my-4"
        style={{
          background: `oklch(from var(--color-light-accent) l c h / 0.05)`,
          border: `1px solid oklch(from var(--color-light-accent) l c h / 0.18)`,
          borderLeft: `3px solid var(--color-light-accent)`,
        }}
      >
        <FiExternalLink
          size={15}
          className="shrink-0 mt-0.5"
          style={{ color: "var(--color-light-accent)" }}
        />
        <div className="flex-1 min-w-0">
          {section.link_desc && (
            <p
              className="text-xs mb-2 leading-relaxed"
              style={{ color: "var(--color-light-muted)" }}
            >
              {section.link_desc}
            </p>
          )}
          <a
            href={section.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-display font-semibold transition-opacity hover:opacity-70"
            style={{ color: "var(--color-light-accent)" }}
          >
            {section.link_text ?? section.link_url}
            <FiExternalLink size={11} />
          </a>
        </div>
      </div>
    );
  }
  return null;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div
        className="h-6 w-32 rounded mb-8"
        style={{ background: "var(--color-light-surface)" }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div
          className="rounded-sm"
          style={{
            aspectRatio: "4/3",
            background: "var(--color-light-surface)",
          }}
        />
        <div className="space-y-4">
          <div
            className="h-4 w-1/3 rounded"
            style={{ background: "var(--color-light-surface)" }}
          />
          <div
            className="h-8 w-3/4 rounded"
            style={{ background: "var(--color-light-surface)" }}
          />
          <div
            className="h-4 w-full rounded"
            style={{ background: "var(--color-light-surface)" }}
          />
          <div
            className="h-4 w-5/6 rounded"
            style={{ background: "var(--color-light-surface)" }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProductDetail({ id }: { id: string }) {
  const { openModal } = useModal();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  // ── Fetch product detail via TanStack Query ──
  const { data: detail, isLoading: loading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

  const product = detail?.product_details ?? null;
  const related = detail?.related_products ?? [];
  const images = product?.images ?? [];
  const contentSections = product
    ? parseContentSections(product.content_sections)
    : [];

  const priceNum = product ? parseFloat(product.price) : NaN;
  // Only show price if it's a valid positive number
  const formattedPrice =
    isNaN(priceNum) || priceNum <= 0
      ? null
      : new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(priceNum);

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Back nav ── */}
      <div
        className="pt-28 pb-4"
        style={{ background: "var(--color-light-bg)" }}
      >
        <Container>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest transition-opacity hover:opacity-60"
            style={{ color: "var(--color-light-muted)" }}
          >
            <FiArrowLeft size={12} /> All Products
          </Link>
        </Container>
      </div>

      {/* ── Detail body ── */}
      <section
        className="section-pad pt-0"
        style={{ background: "var(--color-light-bg)" }}
      >
        <Container>
          {loading ? (
            <ProductDetailSkeleton />
          ) : !product ? (
            <div className="text-center py-20">
              <p
                className="font-display font-semibold"
                style={{ color: "var(--color-light-text)" }}
              >
                Product not found.
              </p>
              <Link
                href="/products"
                className="mt-4 inline-flex items-center gap-2 text-sm"
                style={{ color: "var(--color-light-accent)" }}
              >
                <FiArrowLeft size={12} /> Back to products
              </Link>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {/* ── Top grid: images + info ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14 lg:items-start">
                {/* ── Image slider — sticky on desktop ── */}
                <div className="flex flex-col gap-3 lg:sticky lg:top-24">
                  {images.length > 0 ? (
                    <>
                      {/* Main swiper */}
                      <div
                        className="relative rounded-sm overflow-hidden"
                        style={{
                          border: "1px solid var(--color-light-border)",
                        }}
                      >
                        <Swiper
                          modules={[Navigation, Pagination, Thumbs]}
                          thumbs={{
                            swiper:
                              thumbsSwiper && !thumbsSwiper.destroyed
                                ? thumbsSwiper
                                : null,
                          }}
                          navigation={{
                            prevEl: ".swiper-btn-prev",
                            nextEl: ".swiper-btn-next",
                          }}
                          pagination={{ clickable: true }}
                          loop={images.length > 1}
                          className="w-full"
                          style={{ aspectRatio: "4/3" }}
                        >
                          {images.map((img, i) => (
                            <SwiperSlide key={i}>
                              <div
                                className="relative w-full h-full cursor-zoom-in"
                                style={{ aspectRatio: "4/3" }}
                                onClick={() => setLightboxIndex(i)}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={img}
                                  alt={`${product.name} — image ${i + 1}`}
                                  loading={i === 0 ? "eager" : "lazy"}
                                  className="w-full h-full object-contain"
                                  style={{ background: "#f8f8f8" }}
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        {images.length > 1 && (
                          <>
                            <button
                              className="swiper-btn-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-sm"
                              style={{
                                background: "rgba(255,255,255,0.9)",
                                border: "1px solid var(--color-light-border)",
                                color: "var(--color-light-text)",
                              }}
                            >
                              <FiChevronLeft size={16} />
                            </button>
                            <button
                              className="swiper-btn-next absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-sm"
                              style={{
                                background: "rgba(255,255,255,0.9)",
                                border: "1px solid var(--color-light-border)",
                                color: "var(--color-light-text)",
                              }}
                            >
                              <FiChevronRight size={16} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setLightboxIndex(0)}
                          className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-sm"
                          style={{
                            background: "rgba(255,255,255,0.9)",
                            border: "1px solid var(--color-light-border)",
                            color: "var(--color-light-text)",
                          }}
                        >
                          <FiMaximize2 size={13} />
                        </button>
                      </div>

                      {/* Thumbnails — fixed 72×72 px per slide, left-aligned */}
                      {images.length > 1 && (
                        <Swiper
                          modules={[FreeMode, Thumbs]}
                          onSwiper={setThumbsSwiper}
                          spaceBetween={6}
                          slidesPerView="auto"
                          freeMode
                          watchSlidesProgress
                          className="w-full"
                        >
                          {images.map((img, i) => (
                            <SwiperSlide
                              key={i}
                              className="cursor-pointer"
                              style={{ width: "72px", flexShrink: 0 }}
                            >
                              <div
                                className="rounded-sm overflow-hidden"
                                style={{
                                  width: "72px",
                                  height: "72px",
                                  border: "1px solid var(--color-light-border)",
                                  background: "#f8f8f8",
                                }}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={img}
                                  alt={`Thumb ${i + 1}`}
                                  loading="lazy"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      )}
                    </>
                  ) : (
                    <div
                      className="w-full rounded-sm flex items-center justify-center"
                      style={{
                        aspectRatio: "4/3",
                        background: "var(--color-light-surface)",
                        border: "1px solid var(--color-light-border)",
                      }}
                    >
                      <FiTag
                        size={48}
                        style={{ color: "var(--color-light-faint)" }}
                      />
                    </div>
                  )}
                </div>

                {/* ── Product info ── */}
                <div className="flex flex-col gap-5">
                  {/* Category + popular */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2.5 py-1 rounded-sm text-[10px] font-display uppercase tracking-wider"
                      style={{
                        background: "var(--color-light-surface)",
                        border: "1px solid var(--color-light-border)",
                        color: "var(--color-light-muted)",
                      }}
                    >
                      {product.category_name}
                    </span>
                    {product.is_popular === 1 && (
                      <span
                        className="flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] font-display uppercase tracking-wider"
                        style={{
                          background: "var(--color-light-accent)",
                          color: "#fff",
                        }}
                      >
                        <FiZap size={9} /> Popular
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h2
                    className="font-display font-bold leading-tight"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                      color: "var(--color-light-text)",
                    }}
                  >
                    {product.name}
                  </h2>

                  {/* Watt + price */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {product.watt && (
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-display uppercase tracking-wider"
                        style={{
                          background: "var(--color-light-surface)",
                          border: "1px solid var(--color-light-border)",
                          color: "var(--color-light-muted)",
                        }}
                      >
                        <FiZap size={11} />
                        {product.watt}
                      </span>
                    )}
                    {formattedPrice && (
                      <span
                        className="font-display font-bold text-xl"
                        style={{ color: "var(--color-light-accent)" }}
                      >
                        {formattedPrice}
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      height: 1,
                      background: "var(--color-light-border)",
                    }}
                  />

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: "var(--color-light-muted)" }}
                  >
                    {product.description}
                  </p>

                  {/* Includes */}
                  {product.includes && product.includes.length > 0 && (
                    <div>
                      <p
                        className="text-[10px] font-display uppercase tracking-[0.2em] mb-3"
                        style={{ color: "var(--color-light-faint)" }}
                      >
                        Includes
                      </p>
                      <ul className="flex flex-col gap-2">
                        {product.includes.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <FiCheck
                              size={13}
                              className="shrink-0 mt-0.5"
                              style={{ color: "var(--color-light-accent)" }}
                            />
                            <span
                              className="text-sm leading-relaxed"
                              style={{ color: "var(--color-light-muted)" }}
                            >
                              {inc}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA buttons */}
                  <div className="flex gap-3 flex-wrap mt-auto pt-2">
                    <button
                      onClick={openModal}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm text-sm font-display font-semibold uppercase tracking-wider transition-opacity duration-200 hover:opacity-85"
                      style={{
                        background: "var(--color-light-accent)",
                        color: "#fff",
                        minWidth: 160,
                      }}
                    >
                      Get a Quote <FiArrowRight size={13} />
                    </button>
                    {product.product_brochure_photo && (
                      <a
                        href={product.product_brochure_photo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm text-sm font-display font-semibold uppercase tracking-wider transition-all duration-200"
                        style={{
                          border: "1px solid var(--color-light-accent)",
                          color: "var(--color-light-accent)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background =
                            "var(--color-light-accent)";
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background =
                            "transparent";
                          (e.currentTarget as HTMLElement).style.color =
                            "var(--color-light-accent)";
                        }}
                      >
                        <FiFileText size={13} /> View Brochure
                      </a>
                    )}
                    <Link
                      href="/products"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm text-sm font-display font-semibold uppercase tracking-wider transition-all duration-200"
                      style={{
                        border: "1px solid var(--color-light-border)",
                        color: "var(--color-light-muted)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "var(--color-light-accent)";
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--color-light-accent)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "var(--color-light-border)";
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--color-light-muted)";
                      }}
                    >
                      <FiArrowLeft size={13} /> All Products
                    </Link>
                  </div>
                </div>
              </div>

              {/* ── Content sections ── */}
              {contentSections.length > 0 && (
                <div className="mb-14 ">
                  <div
                    className="flex items-center gap-3 mb-6"
                    style={{
                      borderBottom: "1px solid var(--color-light-border)",
                      paddingBottom: "1rem",
                    }}
                  >
                    <h2
                      className="font-display font-bold"
                      style={{
                        fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                        color: "var(--color-light-text)",
                      }}
                    >
                      Product Details
                    </h2>
                  </div>
                  <div className="space-y-2">
                    {contentSections.map((section, i) => (
                      <ContentSectionRenderer key={i} section={section} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Related products ── */}
              {related.length > 0 && (
                <div>
                  <div
                    className="flex items-center gap-3 mb-6"
                    style={{
                      borderBottom: "1px solid var(--color-light-border)",
                      paddingBottom: "1rem",
                    }}
                  >
                    <h2
                      className="font-display font-bold"
                      style={{
                        fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                        color: "var(--color-light-text)",
                      }}
                    >
                      Related Products
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {related.map((rp, i) => (
                      <ProductCard key={rp.id} product={rp} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </Container>
      </section>
    </>
  );
}
