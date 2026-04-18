"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import { FiMonitor, FiFileText, FiMail, FiPhoneCall } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const onlineServices = [
  {
    icon: FiMonitor,
    title: "Remote Diagnostics Portal",
    subtitle: "Machine Health Dashboard",
    href: "#",
  },
  {
    icon: FiFileText,
    title: "B & B Service Hub",
    subtitle: "Integrated Machine IoT Platform",
    href: "#",
  },
  {
    icon: FiMail,
    title: "service@bnbindustries.in",
    subtitle: "Answers for Your Needs",
    href: "mailto:service@bnbindustries.in",
  },
  {
    icon: FiPhoneCall,
    title: "Instant Messaging",
    subtitle: "+91 98765 43210",
    href: "tel:+919876543210",
  },
];

export default function ServiceOnlineService() {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      className="section-pad section-light"
      style={{ borderTop: "1px solid var(--color-light-border)" }}
    >
      <Container>
        {/* Heading */}
        <motion.div
          ref={headRef}
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
              color: "var(--color-light-accent)",
            }}
          >
            B &amp; B Online Service
          </h2>
          <motion.div
            className="mx-auto rounded-full mt-4"
            style={{
              height: "3px",
              background: "var(--color-light-accent)",
              width: 0,
            }}
            animate={headInView ? { width: "48px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          />
        </motion.div>

        {/* 2×2 grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={stagger}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {onlineServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.a
                key={svc.title}
                href={svc.href}
                variants={fadeUp}
                className="group flex items-center gap-6 p-8 rounded-sm relative overflow-hidden"
                style={{
                  background: "var(--color-light-bg)",
                  border: "1px solid var(--color-light-border)",
                  textDecoration: "none",
                }}
                whileHover={{
                  borderColor: "var(--color-light-accent)",
                  x: 3,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                  style={{ background: "var(--color-light-accent)" }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />

                {/* Icon */}
                <div
                  className="shrink-0 w-14 h-14 flex items-center justify-center rounded-sm"
                  style={{
                    border: "1.5px solid var(--color-light-border)",
                    background: "var(--color-light-surface)",
                    color: "var(--color-light-text)",
                  }}
                >
                  <Icon size={26} strokeWidth={1.25} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-display font-semibold mb-1 truncate"
                    style={{
                      fontSize: "1rem",
                      color: "var(--color-light-text)",
                    }}
                  >
                    {svc.title}
                  </p>
                  <p
                    className="text-xs mb-3"
                    style={{ color: "var(--color-light-muted)" }}
                  >
                    {svc.subtitle}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-display uppercase tracking-widest"
                    style={{ color: "var(--color-light-accent)" }}
                  >
                    Learn More
                    <FiArrowRight size={12} />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
