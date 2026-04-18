"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/config/site";
import { productCategories } from "@/data/products";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUpRight,
  FiArrowRight,
} from "react-icons/fi";
import {
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const EASE = [0.16, 1, 0.3, 1] as const;

const socialLinks = [
  {
    icon: <FaLinkedinIn size={14} />,
    href: siteConfig.social.linkedin,
    label: "LinkedIn",
  },
  {
    icon: <FaYoutube size={14} />,
    href: siteConfig.social.youtube,
    label: "YouTube",
  },
  {
    icon: <FaInstagram size={14} />,
    href: siteConfig.social.instagram,
    label: "Instagram",
  },
  {
    icon: <FaWhatsapp size={14} />,
    href: `https://wa.me/${siteConfig.contact.whatsapp ?? "919000000000"}`,
    label: "WhatsApp",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h4
        className="font-display font-semibold uppercase tracking-[0.18em]"
        style={{
          fontSize: "10px",
          color: "var(--color-text)",
        }}
      >
        {children}
      </h4>
      <div
        className="mt-2 h-px w-5"
        style={{ background: "var(--color-accent)" }}
      />
    </div>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <footer
      ref={ref}
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      {/* ── Top CTA strip ── */}
      <div
        style={{
          background: "var(--color-accent)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Container>
          <div className="flex items-center justify-between gap-4 py-4 flex-wrap">
            <p
              className="font-display font-semibold text-sm"
              style={{ color: "var(--color-bg)" }}
            >
              Need a quote? We respond within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-sm font-display font-semibold uppercase tracking-widest text-xs transition-opacity duration-150 hover:opacity-80 shrink-0"
              style={{
                background: "var(--color-bg)",
                color: "var(--color-text)",
              }}
            >
              Get a Quote <FiArrowRight size={11} />
            </Link>
          </div>
        </Container>
      </div>

      {/* ── Main footer grid ── */}
      <Container className="py-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        >
          {/* ── Col 1: Brand ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-sm overflow-hidden flex items-center justify-center shrink-0"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Image
                  src="/logo/B&BLogo.png"
                  alt={siteConfig.name}
                  width={28}
                  height={28}
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-display font-bold text-sm tracking-wide"
                  style={{ color: "var(--color-text)" }}
                >
                  B &amp; B
                </span>
                <span
                  className="font-display uppercase"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    color: "var(--color-text-faint)",
                  }}
                >
                  Industries
                </span>
              </div>
            </Link>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)", maxWidth: "28ch" }}
            >
              {siteConfig.description}
            </p>

            {/* Social icons */}
            <div className="flex gap-2 mt-1">
              {socialLinks.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-faint)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--color-accent)";
                    el.style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--color-border)";
                    el.style.color = "var(--color-text-faint)";
                  }}
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* ── Col 2: Quick Links ── */}
          <motion.div variants={fadeUp}>
            <ColHeading>Quick Links</ColHeading>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-xs transition-colors duration-150"
                    style={{ color: "var(--color-text-muted)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "var(--color-accent)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "var(--color-text-muted)")
                    }
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: "var(--color-text-faint)" }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 3: Products ── */}
          <motion.div variants={fadeUp}>
            <ColHeading>Products</ColHeading>
            <ul className="space-y-3">
              {productCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products/${cat.id}`}
                    className="flex items-center gap-2 text-xs leading-snug transition-colors duration-150"
                    style={{ color: "var(--color-text-muted)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "var(--color-accent)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "var(--color-text-muted)")
                    }
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: "var(--color-text-faint)" }}
                    />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 4: Contact ── */}
          <motion.div variants={fadeUp}>
            <ColHeading>Contact</ColHeading>
            <ul className="space-y-4">
              {[
                {
                  icon: <FiMapPin size={13} />,
                  href: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address)}`,
                  label: siteConfig.contact.address,
                  external: true,
                },
                {
                  icon: <FiPhone size={13} />,
                  href: `tel:${siteConfig.contact.phone}`,
                  label: siteConfig.contact.phone,
                },
                {
                  icon: <FiMail size={13} />,
                  href: `mailto:${siteConfig.contact.email}`,
                  label: siteConfig.contact.email,
                },
                {
                  icon: <FaWhatsapp size={13} />,
                  href: `https://wa.me/${siteConfig.contact.whatsapp ?? "919000000000"}`,
                  label: "Chat on WhatsApp",
                  external: true,
                  accent: true,
                },
              ].map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-2.5 text-xs leading-snug transition-colors duration-150"
                    style={{
                      color: c.accent
                        ? "var(--color-accent)"
                        : "var(--color-text-muted)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "var(--color-text)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = c.accent
                        ? "var(--color-accent)"
                        : "var(--color-text-muted)")
                    }
                  >
                    <span
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {c.icon}
                    </span>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── Tagline divider ── */}
        <motion.div
          className="mt-14 pt-8 flex items-center justify-between gap-4 flex-wrap"
          style={{ borderTop: "1px solid var(--color-border)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
        >
          <p
            className="font-display font-black uppercase tracking-widest"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
              color: "var(--color-text-faint)",
            }}
          >
            {siteConfig.tagline}
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest transition-colors duration-150 shrink-0"
            style={{ color: "var(--color-text-faint)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "var(--color-accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "var(--color-text-faint)")
            }
          >
            Our Story <FiArrowUpRight size={11} />
          </Link>
        </motion.div>
      </Container>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid var(--color-border)" }}>
        <Container className="py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: "var(--color-text-faint)" }}>
              © {new Date().getFullYear()}{" "}
              <span style={{ color: "var(--color-text-muted)" }}>
                {siteConfig.name}
              </span>
              . All rights reserved.
            </p>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-xs transition-colors duration-150"
                  style={{ color: "var(--color-text-faint)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--color-text-muted)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--color-text-faint)")
                  }
                >
                  {label}
                </Link>
              ))}

              <p
                className="text-xs"
                style={{ color: "var(--color-text-faint)" }}
              >
                Designed &amp; Developed by{" "}
                <Link
                  href="https://www.vrushikvisavadiya.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold font-display transition-opacity duration-150 hover:opacity-75"
                  style={{ color: "var(--color-accent)" }}
                >
                  Vrushik Visavadiya
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
