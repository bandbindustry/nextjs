const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bandbindustries.com";

export const siteConfig = {
  name: "B and B Industries",
  tagline: "Precision in every cut",
  description:
    "B and B Industries delivers world-class industrial manufacturing solutions, precision parts, and cutting-edge machinery.",
  url: SITE_URL,
  contact: {
    email: "info@bandbindustries.com",
    phone: "+91 695326623",
    whatsapp: "91695326623",
    address:
      "Ploat No.13, Rajpath Industrials Area, Pal Pipaliya Village, B/h Shaper (Veraval), Ta. Lodhika, Dist. Rajkot - 360311",
  },
  location: "",
  social: {
    facebook: "https://www.facebook.com/share/1CLzugLECJ/",
    youtube: "https://www.youtube.com/@bbindustries-1",
    instagram: "https://www.instagram.com/bandb_industry",

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
