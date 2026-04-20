// src/app/(marketing)/products/[id]/page.tsx
import type { Metadata } from "next";
import { getProductById } from "@/services/product.service";
import ProductDetail from "@/sections/products/ProductDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const detail = await getProductById(id);
  const product = detail?.product_details;

  if (!product) {
    return {
      title: "Product Not Found | B & B Industries",
      description: "The requested product could not be found.",
    };
  }

  const firstImage = product.images?.[0];

  return {
    title: `${product.name} | B & B Industries`,
    description:
      product.description?.slice(0, 160) ??
      `${product.name} — B & B Industries`,
    openGraph: {
      title: `${product.name} | B & B Industries`,
      description: product.description?.slice(0, 160) ?? "",
      images: firstImage ? [{ url: firstImage, alt: product.name }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  return <ProductDetail id={id} />;
}
