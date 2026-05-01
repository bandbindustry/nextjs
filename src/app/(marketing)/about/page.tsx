import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import {
  AboutHero,
  AboutStats,
  AboutStory,
  AboutTimeline,
  AboutValues,
  AboutCertifications,
  AboutTeam,
  AboutAfterSales,
  AboutCTA,
} from "@/sections/about";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "precision manufacturing excellence. Discover the story, team, values, and ISO certifications behind B&B Industries — Gujarat's trusted industrial manufacturer.",
  keywords: [
    "about B&B Industries",
    "manufacturing company Gujarat",
    "ISO certified manufacturer India",
    "precision engineering team",
    "industrial manufacturer Jamnagar",
    "CNC machining company history",
  ],
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      {/* <AboutStats /> */}
      <AboutStory />
      {/* <AboutTimeline /> */}
      <AboutValues />
      {/* <AboutCertifications /> */}
      {/* <AboutTeam /> */}
      <AboutAfterSales />
      <AboutCTA />
    </main>
  );
}
