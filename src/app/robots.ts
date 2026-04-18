import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all crawlers full access to public content
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // API routes
          "/_next/", // Next.js internals
          "/privacy", // Legal pages — no SEO value
          "/terms",
        ],
      },
      {
        // Block GPTBot (OpenAI) from training on site content
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        // Block Google-Extended (Gemini training data)
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        // Block CCBot (Common Crawl — used for AI training)
        userAgent: "CCBot",
        disallow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
