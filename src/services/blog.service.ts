// src/services/blog.service.ts
import api, { isTestEnv } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";
import type {
  BlogCategoriesResponse,
  BlogsResponse,
  BlogViewResponse,
  BlogFilters,
  ApiBlog,
  BlogPost,
  ContentSection,
} from "@/types/blog";

// ─── Constants ────────────────────────────────────────────────────────────────

const UPLOADS_BASE = "http://adminpanel.bandbindustry.com/uploads/blogs/";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function tryDecrypt(data: unknown): unknown {
  if (isTestEnv) return data;
  if (typeof data === "string" && data.includes(":")) {
    return decryptData(data);
  }
  return data;
}

/**
 * Estimate reading time from HTML/plain-text content (~200 wpm).
 */
function estimateReadingTime(html: string): string {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/**
 * Convert content_sections array into a single HTML string.
 */
function sectionsToHtml(sections: ContentSection[]): string {
  return sections
    .map((section) => {
      if (section.type === "content") {
        return section.content ?? "";
      }
      if (section.type === "image") {
        const src = section.image?.startsWith("http")
          ? section.image
          : `${UPLOADS_BASE}${section.image}`;
        const alt = section.alt ?? "";
        const caption = section.caption
          ? `<figcaption>${section.caption}</figcaption>`
          : "";
        return `<figure><img src="${src}" alt="${alt}" />${caption}</figure>`;
      }
      if (section.type === "link") {
        const href = section.link_url ?? "#";
        const text = section.link_text ?? href;
        const desc = section.link_desc ? `<p>${section.link_desc}</p>` : "";
        return `${desc}<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      }
      return "";
    })
    .join("\n");
}

/**
 * Map a raw API blog object to the UI BlogPost shape.
 */
export function mapApiBlogToPost(blog: ApiBlog): BlogPost {
  // Build HTML content: prefer top-level content, fall back to sections
  const sectionsHtml =
    blog.content_sections && blog.content_sections.length > 0
      ? sectionsToHtml(blog.content_sections)
      : "";
  const content = blog.content
    ? blog.content + (sectionsHtml ? `\n${sectionsHtml}` : "")
    : sectionsHtml;

  const readingTime = blog.read_time ?? estimateReadingTime(content);

  const keywords = blog.meta_keywords
    ? blog.meta_keywords.split(",").map((k) => k.trim())
    : [];

  return {
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt ?? "",
    publishedAt: blog.publish_date ?? new Date().toISOString(),
    author: blog.author ?? "B and B Industries",
    category: blog.category_name ?? "General",
    coverImage: blog.icon ?? "/images/blog-placeholder.jpg",
    readingTime,
    tags: blog.tags ?? [],
    meta: {
      title: blog.meta_title ?? blog.title,
      description: blog.meta_description ?? blog.excerpt ?? "",
      keywords,
    },
    content,
  };
}

// ─── Raw API calls ────────────────────────────────────────────────────────────

export async function getBlogCategories(): Promise<BlogCategoriesResponse> {
  try {
    const response = await api.get(endpoints.BLOG_CATEGORIES);
    return tryDecrypt(response.data) as BlogCategoriesResponse;
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    throw error;
  }
}

export async function getBlogs(
  filters: BlogFilters = {},
): Promise<BlogsResponse> {
  try {
    const response = await api.post(endpoints.BLOGS, filters);
    return tryDecrypt(response.data) as BlogsResponse;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogViewResponse> {
  try {
    const response = await api.post(endpoints.BLOG_VIEW, { slug });
    const res = tryDecrypt(response.data) as BlogViewResponse;
    return res;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}

// ─── Convenience wrappers returning mapped BlogPost objects ───────────────────

export async function getAllPosts(
  filters: BlogFilters = {},
): Promise<BlogPost[]> {
  const res = await getBlogs(filters);
  if (!res.status) return [];
  return (res.data?.data ?? []).map(mapApiBlogToPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await getBlogBySlug(slug);
    if (!res.status || !res.data) return null;
    return mapApiBlogToPost(res.data);
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const res = await getBlogs({ per_page: 100 });
    if (!res.status) return [];
    return (res.data?.data ?? []).map((b) => b.slug);
  } catch {
    return [];
  }
}

export async function getRelatedPosts(
  slug: string,
  limit = 2,
): Promise<BlogPost[]> {
  try {
    const current = await getPostBySlug(slug);
    if (!current) return [];

    const res = await getBlogs({ per_page: 20 });
    if (!res.status) return [];

    return (res.data?.data ?? [])
      .filter((b) => b.slug !== slug && b.category_name === current.category)
      .slice(0, limit)
      .map(mapApiBlogToPost);
  } catch {
    return [];
  }
}
