"use client";

import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedLine from "@/components/ui/AnimatedLine";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { siteConfig } from "@/config/site";

const info = [
  {
    icon: FiMapPin,
    label: "Address",
    value: siteConfig.contact.address,
    sub: "Gujarat, India",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: siteConfig.contact.phone,
    sub: "Mon–Sat, 9am–6pm IST",
  },
  {
    icon: FiMail,
    label: "Email",
    value: siteConfig.contact.email,
    sub: "We reply within 24 hours",
  },
  {
    icon: FiClock,
    label: "Working Hours",
    value: "Mon – Sat",
    sub: "9:00 AM – 6:00 PM IST",
  },
];

export default function ContactInfo() {
  return (
    <section className="section-pad" style={{ background: "var(--color-bg)" }}>
      <Container>
        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {info.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.1} direction="up">
              <div
                className="p-6 rounded-sm h-full"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center mb-4"
                  style={{
                    background: "var(--color-surface-2)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <item.icon
                    size={16}
                    style={{ color: "var(--color-accent)" }}
                  />
                </div>
                <p
                  className="text-xs font-display uppercase tracking-widest mb-2"
                  style={{ color: "var(--color-text-faint)" }}
                >
                  {item.label}
                </p>
                <p
                  className="font-semibold text-sm mb-1"
                  style={{ color: "var(--color-text)" }}
                >
                  {item.value}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-faint)" }}
                >
                  {item.sub}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedLine className="mb-16" />

        {/* Map placeholder */}
        <AnimatedSection direction="up">
          <div
            className="w-full rounded-sm overflow-hidden flex items-center justify-center"
            style={{
              height: "400px",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* 
              Replace with Google Maps embed:
              <iframe
                src="https://maps.google.com/maps?q=Jamnagar,Gujarat&output=embed"
                width="100%"
                height="400"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
              />
              The filter makes Google Maps match your dark theme.
            */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.15049961975!2d72.5797426!3d23.0202434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1775578196569!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              // referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* <div className="text-center">
              <FiMapPin
                size={32}
                className="mx-auto mb-3"
                style={{ color: "var(--color-text-faint)" }}
              />
              <p
                className="font-display text-sm uppercase tracking-wider"
                style={{ color: "var(--color-text-faint)" }}
              >
                Map Embed — Jamnagar, Gujarat
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--color-text-faint)" }}
              >
                Replace with Google Maps iframe
              </p>
            </div> */}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
