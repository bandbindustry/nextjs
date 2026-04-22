// src/types/products.ts

// ─── Legacy static types (used by old data/products.ts) ───────────────────────
export interface Variant {
  name: string;
  slug: string;
  /** Optional short spec shown under the variant name */
  spec?: string;
}

export interface SubCategory {
  name: string;
  slug: string;
  variants?: Variant[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  /** One-line description shown on the card and Header mega menu */
  description: string;
  /** Image path */
  image: string;
  /** Flat list of sub-category/variant names */
  variants: string[];
  /** Full nested structure */
  subCategories: SubCategory[];
}

// ─── API types ────────────────────────────────────────────────────────────────

export interface ApiProductCategory {
  id: string;
  name: string;
  icon: string | null;
  description: string | null;
  is_popular: number;
}

export interface ContentSection {
  type: "content" | "image" | "link";
  // type === "content"
  content?: string;
  // type === "image"
  alt?: string;
  caption?: string;
  image?: string;
  // type === "link"
  link_text?: string;
  link_url?: string;
  link_desc?: string;
}

export interface ApiProduct {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  watt: string | null;
  price: string;
  description: string;
  content_sections: ContentSection[] | string;
  includes: string[];
  images: string[];
  is_popular: number;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keyword?: string | null;
  product_brochure_photo?: string | null;
}

export interface ApiProductDetail {
  product_details: ApiProduct;
  related_products: ApiProduct[];
}

export interface ApiProductsListData {
  current_page: number;
  data: ApiProduct[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ApiProductsResponse {
  code: number;
  status: boolean;
  message: string;
  data: ApiProductsListData | ApiProductDetail;
}

export interface ApiCategoriesResponse {
  code: number;
  status: boolean;
  message: string;
  data: ApiProductCategory[];
}

/** Parse content_sections — API sometimes returns a JSON string in related_products */
export function parseContentSections(
  raw: ContentSection[] | string,
): ContentSection[] {
  if (Array.isArray(raw)) return raw;
  try {
    return JSON.parse(raw) as ContentSection[];
  } catch {
    return [];
  }
}
