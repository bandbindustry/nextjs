import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import {
  ServiceHero,
  ServiceStats,
  ServiceFeatures,
  ServiceProcess,
  ServiceCTA,
} from "@/sections/service";
import ServiceSkills from "@/sections/service/ServiceSkills";
import ServiceTopServices from "@/sections/service/ServiceTopServices";
import ServiceOnlineService from "@/sections/service/ServiceOnlineService";

export const metadata: Metadata = createMetadata({
  title: "After-Sales Service & Support",
  description:
    "24/7 support, 30-minute response time, regional service engineers, and a fully stocked spare parts warehouse. B and B Industries backs every product we make.",
  keywords: [
    "industrial after-sales service",
    "CNC machine support India",
    "spare parts Gujarat",
    "manufacturing support 24/7",
    "machine maintenance India",
    "industrial service engineers",
    "B and B Industries service",
  ],
  path: "/service",
});

export default function ServicePage() {
  return (
    <main>
      <ServiceHero />
      {/* <ServiceStats /> */}
      {/* <ServiceSkills /> */}
      <ServiceOnlineService />
      {/* <ServiceTopServices /> */}
      <ServiceFeatures />
      <ServiceProcess />
      <ServiceCTA />
    </main>
  );
}
