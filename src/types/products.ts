// src/types/products.ts

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
  /** Image path — swap picsum seed with real asset later */
  image: string;
  /**
   * Flat list of sub-category/variant names.
   * Used by Header mega menu bullet list.
   * Keep in sync with subCategories names.
   */
  variants: string[];
  /** Full nested structure — used by ProductsGrid & ProductCard accordion */
  subCategories: SubCategory[];
}
