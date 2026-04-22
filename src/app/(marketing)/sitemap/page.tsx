import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { getProducts, getProductCategories } from "@/services/product.service";
import SitemapHero from "@/sections/sitemap/SitemapHero";
import SitemapContent from "@/sections/sitemap/SitemapContent";

export const metadata: Metadata = createMetadata({
  title: "Sitemap",
  description:
    "Browse the complete sitemap for B and B Industries — including all product pages, services, articles, and support resources.",
  keywords: [
    "B and B Industries sitemap",
    "site map industrial manufacturer",
    "all pages B and B",
    "manufacturing website index",
  ],
  path: "/sitemap",
});

export default async function SitemapPage() {
  // Fetch all products (up to 200) and categories server-side for the sitemap
  const [productsData, categories] = await Promise.all([
    getProducts({ per_page: 200 }),
    getProductCategories(),
  ]);

  const products = productsData?.data ?? [];

  return (
    <main>
      <SitemapHero />
      <SitemapContent products={products} categories={categories} />
    </main>
  );
}
