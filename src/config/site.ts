const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bandbindustries.com";

export const siteConfig = {
  name: "B and B Industries",
  tagline: "Precision. Power. Performance.",
  description:
    "B and B Industries delivers world-class industrial manufacturing solutions, precision parts, and cutting-edge machinery.",
  url: SITE_URL,
  contact: {
    email: "info@bandbindustries.com",
    phone: "+91 00000 00000",
    whatsapp: "919000000000",
    address: "Jamnagar, Gujarat, India",
  },
  location: "",
  social: {
    linkedin: "https://www.linkedin.com/company/b-and-b-industries",
    youtube: "https://www.youtube.com/@bandbindustries",
    instagram: "https://www.instagram.com/bandbindustries",
    // whatsapp is built from contact.whatsapp — no separate field needed
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/service" },
  { label: "Articles", href: "/blog" },

  { label: "Contact", href: "/contact" },
];
