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
  AboutCTA,
} from "@/sections/about";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "precision manufacturing excellence. Discover the story, team, values, and ISO certifications behind B and B Industries — Gujarat's trusted industrial manufacturer.",
  keywords: [
    "about B and B Industries",
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
      <AboutCTA />
    </main>
  );
}
