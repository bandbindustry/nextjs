import type { Metadata } from "next";
import {
  // Barlow_Condensed,
  DM_Sans,
  Red_Hat_Display,
  // Inter,
  // Oswald,
  // Rajdhani,
  // Syne,
} from "next/font/google";
import "./globals.css";
import CookieProvider from "@/components/ui/CookieProvider";
import GoogleAnalytics from "@/components/shared/GoogleAnalytics";
import { siteConfig } from "@/config/site";
import QueryProvider from "@/providers/QueryProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// const barlowCondensed = Barlow_Condensed({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
//   variable: "--font-display",
//   display: "swap",
// });

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

// const syne = Syne({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
//   variable: "--font-display",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: {
    default: "B and B Industries — Precision Manufacturing",
    template: "%s | B and B Industries",
  },
  description:
    "B and B Industries delivers world-class precision manufacturing, CNC machined components, and industrial machinery solutions across Gujarat and India.",
  keywords: [
    "industrial manufacturing",
    "CNC machining",
    "precision parts",
    "Gujarat manufacturer",
    "B and B Industries",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: "B and B Industries — Precision Manufacturing",
    description:
      "Precision-engineered components and industrial machinery solutions from Jamnagar, Gujarat.",
    url: siteConfig.url,
    siteName: "B and B Industries",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B and B Industries",
    description:
      "Precision manufacturing and industrial solutions from Gujarat, India.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${redHatDisplay.variable} font-body antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
        <CookieProvider />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
