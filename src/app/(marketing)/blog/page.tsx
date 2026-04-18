import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { getAllPosts } from "@/services/blog.service";
import BlogList from "@/sections/blog/BlogList";
import BlogHero from "@/sections/blog/BlogHero";

export const metadata: Metadata = createMetadata({
  title: "Blog & Insights",
  description:
    "Insights on precision manufacturing, CNC machining, quality systems, and industrial components from the B and B Industries engineering team.",
  keywords: [
    "manufacturing blog India",
    "CNC machining insights",
    "industrial engineering articles",
    "precision manufacturing tips",
    "quality control manufacturing",
    "B and B Industries blog",
  ],
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <main>
      <BlogHero featured={posts[0]} />
      <BlogList posts={posts} />
    </main>
  );
}
