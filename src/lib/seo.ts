import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

// ─── Default keywords shared across all pages ───────────────────────────────
const BASE_KEYWORDS = [
  "B and B Industries",
  "industrial manufacturing",
  "precision engineering",
  "CNC machining",
  "Gujarat manufacturer",
  "Jamnagar",
  "precision parts India",
];

// ─── Types ───────────────────────────────────────────────────────────────────
export interface PageSeoProps {
  /** Page title — will be formatted as "Title | B and B Industries" */
  title: string;
  /** Page-specific meta description (max ~160 chars) */
  description: string;
  /** Additional keywords merged with base keywords */
  keywords?: string[];
  /** URL path, e.g. "/about" — used for canonical URL */
  path?: string;
  /** Absolute URL to OG image (1200×630). Falls back to site default. */
  ogImage?: string;
  /** Set true for legal/utility pages to prevent indexing */
  noIndex?: boolean;
}

export interface ArticleSeoProps extends PageSeoProps {
  publishedAt: string;
  author: string;
  /** Absolute URL to article cover image */
  coverImage?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Build a full Next.js `Metadata` object for a standard page.
 *
 * @example
 * export const metadata = createMetadata({
 *   title: "About Us",
 *   description: "25+ years of precision manufacturing...",
 *   path: "/about",
 * });
 */
export function createMetadata({
  title,
  description,
  keywords = [],
  path = "",
  ogImage,
  noIndex = false,
}: PageSeoProps): Metadata {
  const canonicalUrl = `${siteConfig.url}${path}`;
  const image = ogImage ?? `${siteConfig.url}/og-image.png`;

  return {
    title,
    description,
    keywords: [...BASE_KEYWORDS, ...keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} — ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

/**
 * Build a full Next.js `Metadata` object for a blog article page.
 *
 * @example
 * export const metadata = createArticleMetadata({
 *   title: post.meta.title,
 *   description: post.meta.description,
 *   path: `/blog/${post.slug}`,
 *   publishedAt: post.publishedAt,
 *   author: post.author,
 *   coverImage: post.coverImage,
 * });
 */
export function createArticleMetadata({
  title,
  description,
  keywords = [],
  path = "",
  publishedAt,
  author,
  coverImage,
  noIndex = false,
}: ArticleSeoProps): Metadata {
  const canonicalUrl = `${siteConfig.url}${path}`;
  const image = coverImage ?? `${siteConfig.url}/logo/B&BLogo.png`;

  return {
    title,
    description,
    keywords: [...BASE_KEYWORDS, ...keywords],
    authors: [{ name: author }],
    creator: author,
    publisher: siteConfig.name,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "article",
      publishedTime: publishedAt,
      authors: [author],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
