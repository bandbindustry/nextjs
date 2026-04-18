import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getAllSlugs,
  getRelatedPosts,
} from "@/services/blog.service";
import { createArticleMetadata } from "@/lib/seo";
import BlogDetail from "@/sections/blog/BlogDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return createArticleMetadata({
    title: post.meta.title,
    description: post.meta.description,
    keywords: post.meta.keywords ?? [],
    path: `/blog/${slug}`,
    publishedAt: post.publishedAt,
    author: post.author,
    coverImage: post.coverImage,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug);

  return (
    <main>
      <BlogDetail post={post} related={related} />
    </main>
  );
}
