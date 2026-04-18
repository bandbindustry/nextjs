import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import ContactHero from "@/sections/contact/HeroSection";
import ContactForm from "@/sections/contact/ContactForm";
import ContactInfo from "@/sections/contact/ContactInfo";

export const metadata: Metadata = createMetadata({
  title: "Contact Us",
  description:
    "Get in touch with B and B Industries for custom quotes, product inquiries, or after-sales support. Located in Jamnagar, Gujarat — serving clients across India and globally.",
  keywords: [
    "contact B and B Industries",
    "industrial manufacturer contact",
    "get a quote Gujarat",
    "CNC machining inquiry",
    "manufacturing support India",
    "Jamnagar factory contact",
  ],
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ContactInfo />
    </>
  );
}
