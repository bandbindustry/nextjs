/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

const tabs = [
  { label: "Installation", count: 4 },
  { label: "Maintenance", count: 4 },
  { label: "Manual Book", count: 4 },
];

export default function ServiceSkills() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      className="section-pad section-light"
      style={{ borderTop: "1px solid var(--color-light-border)" }}
    >
      <Container>
        <motion.div
          ref={ref}
          className="flex flex-col md:flex-row gap-0 overflow-hidden rounded-sm"
          style={{ border: "1px solid var(--color-light-border)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Image */}
          <div
            className="shrink-0 md:w-[300px] overflow-hidden"
            style={{ minHeight: "280px" }}
          >
            <img
              src="https://picsum.photos/seed/bnb-service-skills/600/500"
              alt="Service Skills"
              width={600}
              height={500}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div
            className="flex-1 flex flex-col justify-center p-10 lg:p-14"
            style={{ background: "var(--color-light-bg)" }}
          >
            <h2
              className="font-display font-bold mb-3"
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                color: "var(--color-light-text)",
              }}
            >
              Learn B &amp; B Industries Skills
            </h2>

            <p
              className="text-sm leading-relaxed mb-7"
              style={{
                color: "var(--color-light-muted)",
                maxWidth: "52ch",
              }}
            >
              Get up and running with your machinery quickly and efficiently.
              Here you&apos;ll find a variety of resources to help you develop
              and maintain your operational skills.
            </p>

            {/* Tab buttons */}
            <div className="flex flex-wrap gap-3">
              {tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActive(i)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-display font-semibold transition-all duration-200"
                  style={{
                    border: `1.5px solid ${
                      active === i
                        ? "var(--color-light-accent)"
                        : "var(--color-light-border)"
                    }`,
                    background:
                      active === i
                        ? "var(--color-light-accent)"
                        : "transparent",
                    color: active === i ? "white" : "var(--color-light-text)",
                  }}
                >
                  {tab.label}
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background:
                        active === i
                          ? "rgba(255,255,255,0.2)"
                          : "var(--color-light-surface)",
                      color:
                        active === i ? "white" : "var(--color-light-muted)",
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
