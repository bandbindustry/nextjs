// src/types/blog.ts

// ─── UI Types (used by components) ───────────────────────────────────────────

export interface BlogMeta {
  title: string;
  description: string;
  keywords: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date string — "2024-03-15"
  author: string;
  category: string;
  coverImage: string;
  readingTime: string; // e.g. "5 min read"
  meta: BlogMeta;
  content: string; // HTML string
  tags?: string[];
}

// ─── API Types (raw responses from the encrypted API) ────────────────────────

export interface BlogFilters {
  search?: string;
  category_id?: number;
  page?: number;
  per_page?: number;
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
}

// Content section types returned by blogView
export interface ContentSectionText {
  type: "content";
  content: string;
}

export interface ContentSectionImage {
  type: "image";
  alt?: string;
  caption?: string;
  image: string; // filename only — prepend uploads base URL
}

export interface ContentSectionLink {
  type: "link";
  link_text?: string;
  link_url?: string;
  link_desc?: string;
}

export type ContentSection =
  | ContentSectionText
  | ContentSectionImage
  | ContentSectionLink;

export interface ApiBlog {
  id: string;
  category_id: string;
  category_name: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  read_time?: string | null;
  author?: string;
  author_email?: string | null;
  publish_date?: string;
  tags?: string[];
  content_sections?: ContentSection[];
  icon?: string; // full URL
  featured_image_alt?: string | null;
  featured?: string;
  meta_title?: string | null;
  meta_keywords?: string | null;
  meta_description?: string | null;
}

export interface PaginatedBlogs {
  current_page: number;
  data: ApiBlog[];
  first_page_url?: string;
  last_page?: number;
  last_page_url?: string;
  next_page_url?: string | null;
  per_page: number;
  prev_page_url?: string | null;
  total: number;
}

export interface ApiResponse<T> {
  code?: number;
  status: boolean;
  message: string;
  data: T;
  error_code?: number;
}

export type BlogCategoriesResponse = ApiResponse<ApiCategory[]>;
export type BlogsResponse = ApiResponse<PaginatedBlogs>;
export type BlogViewResponse = ApiResponse<ApiBlog>;
