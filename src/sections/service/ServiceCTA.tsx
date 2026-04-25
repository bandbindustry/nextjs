"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { FiPhone, FiMail, FiArrowRight } from "react-icons/fi";
import { useSettings } from "@/hooks/useSettings";
import { siteConfig } from "@/config/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function ServiceCTA() {
  const settings = useSettings();
  const phone = settings.contact_phone_number || siteConfig.contact.phone;
  const email = settings.contact_email || siteConfig.contact.email;
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* ── Left ── */}
          <div>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-4"
            >
              <span
                className="h-px w-8 shrink-0"
                style={{
                  background: "var(--color-light-accent)",
                  opacity: 0.4,
                }}
              />
              <span
                className="eyebrow"
                style={{ margin: 0, color: "var(--color-light-faint)" }}
              >
                Get Support
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display font-bold leading-tight mb-4"
              style={{
                fontSize: "clamp(1.9rem, 3.5vw, 3rem)",
                color: "var(--color-light-text)",
              }}
            >
              Need Help?
              <br />
              <span style={{ color: "var(--color-light-accent)" }}>
                We&apos;re Already Ready.
              </span>
            </motion.h2>

            <motion.div
              className="rounded-full mb-6"
              style={{
                height: "3px",
                background: "var(--color-light-accent)",
                width: 0,
              }}
              animate={inView ? { width: "64px" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            />

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed mb-8"
              style={{
                color: "var(--color-light-muted)",
                maxWidth: "44ch",
              }}
            >
              Whether you need emergency on-site support, a spare part, or just
              have a technical question — reach out and our team will respond
              within 30 minutes.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button href="/contact" variant="primary" theme="light">
                Raise a Service Request <FiArrowRight size={13} />
              </Button>
              {/* <Button href="/products" variant="outline" theme="light">
                Browse Spare Parts
              </Button> */}
            </motion.div>
          </div>

          {/* ── Right — contact cards ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            {[
              {
                icon: <FiPhone size={18} />,
                label: "Call Us",
                value: phone,
                sub: "Available 24 hours, 7 days a week",
                href: `tel:${phone}`,
              },
              {
                icon: <FiMail size={18} />,
                label: "Email Support",
                value: email,
                sub: "Response within 30 minutes",
                href: `mailto:${email}`,
              },
            ].map((contact) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                className="flex items-start gap-4 p-5 rounded-sm relative overflow-hidden group"
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

                {/* Icon box */}
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                  style={{
                    background: `oklch(from var(--color-light-accent) l c h / 0.08)`,
                    border: "1px solid var(--color-light-border)",
                    color: "var(--color-light-accent)",
                  }}
                >
                  {contact.icon}
                </div>

                {/* Text */}
                <div>
                  <p
                    className="font-display uppercase mb-0.5"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      color: "var(--color-light-faint)",
                    }}
                  >
                    {contact.label}
                  </p>
                  <p
                    className="font-display font-bold text-base transition-colors duration-150"
                    style={{ color: "var(--color-light-text)" }}
                  >
                    {contact.value}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--color-light-faint)" }}
                  >
                    {contact.sub}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
