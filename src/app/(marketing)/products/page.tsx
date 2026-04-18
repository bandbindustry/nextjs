import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { ProductsGrid } from "@/sections/products";

export const metadata: Metadata = createMetadata({
  title: "Products",
  description:
    "Explore B and B Industries' full range of precision-engineered components, CNC machined parts, industrial machinery, custom fabrication, and assembly solutions.",
  keywords: [
    "precision components India",
    "CNC machined parts Gujarat",
    "industrial machinery manufacturer",
    "custom fabrication Jamnagar",
    "assembly solutions India",
    "precision tools manufacturer",
    "industrial products Gujarat",
  ],
  path: "/products",
});

export default function ProductsPage() {
  return (
    <main>
      <ProductsGrid />
    </main>
  );
}
