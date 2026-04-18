"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedLine from "@/components/ui/AnimatedLine";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import Button from "@/components/ui/Button";

const services = [
  "Precision Components",
  "Industrial Machinery",
  "Custom Fabrication",
  "Assembly Solutions",
  "Quality Tools",
  "Spare Parts",
  "Other",
];

type FormState = "idle" | "submitting" | "success";

export default function ContactForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: true, margin: "-80px 0px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [selected, setSelected] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("success");
  }

  return (
    <section
      className="section-pad"
      style={{
        background: "var(--color-light-bg, #f7f6f2)",
        borderTop: "1px solid var(--color-light-border, #e2e0db)",
        borderBottom: "1px solid var(--color-light-border, #e2e0db)",
      }}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* ── Left — intro ── */}
          <AnimatedSection direction="left" className="lg:col-span-4">
            <span className="eyebrow">Send a Message</span>
            <h2
              className="font-display font-bold leading-tight mb-4"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                color: "#1a1916",
              }}
            >
              Tell Us About Your Project
            </h2>
            <AnimatedLine className="mb-6 w-12" />
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "#5a5855" }}
            >
              Fill in the form and our team will review your requirements and
              respond with a detailed quote within one business day.
            </p>

            {/* Quick stats */}
            <div className="space-y-1">
              {[
                { label: "Response Time", value: "< 24 Hours" },
                { label: "Free Consultation", value: "Always" },
                { label: "Custom Quotes", value: "No Obligation" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3"
                  style={{ borderBottom: "1px solid var(--color-black)" }}
                >
                  <span
                    className="text-xs uppercase tracking-wider font-display"
                    style={{ color: " var(--color-black)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-semibold font-display"
                    style={{ color: " var(--color-black)" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* ── Right — form ── */}
          <motion.div
            ref={formRef}
            className="lg:col-span-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {formState === "success" ? (
              <SuccessState />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-8 rounded-sm"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e0db",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                {/* Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={fadeUp}>
                    <FieldLabel>Full Name *</FieldLabel>
                    <FormInput
                      type="text"
                      name="name"
                      placeholder="John Smith"
                      required
                    />
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <FieldLabel>Company</FieldLabel>
                    <FormInput
                      type="text"
                      name="company"
                      placeholder="Your company name"
                    />
                  </motion.div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={fadeUp}>
                    <FieldLabel>Email Address *</FieldLabel>
                    <FormInput
                      type="email"
                      name="email"
                      placeholder="john@company.com"
                      required
                    />
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <FieldLabel>Phone Number</FieldLabel>
                    <FormInput
                      type="tel"
                      name="phone"
                      placeholder="+91 00000 00000"
                    />
                  </motion.div>
                </div>

                {/* Service chips */}
                <motion.div variants={fadeUp}>
                  <FieldLabel>Service Required</FieldLabel>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelected(s)}
                        className="px-4 py-2 text-xs font-display uppercase tracking-wider rounded-sm transition-all duration-200"
                        style={{
                          border: `1px solid ${selected === s ? "var(--color-black)" : "#d4d1ca"}`,
                          background:
                            selected === s ? "rgba(0,0,0,0.04)" : "transparent",
                          color:
                            selected === s ? "var(--color-black)" : "#7a7773",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="service" value={selected} />
                </motion.div>

                {/* Message */}
                <motion.div variants={fadeUp}>
                  <FieldLabel>Project Details *</FieldLabel>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Describe your project, quantities, materials, timeline..."
                    required
                    className="w-full px-4 py-3 text-sm rounded-sm resize-none transition-all duration-200 outline-none"
                    style={{
                      background: "#f9f8f6",
                      border: "1px solid #d4d1ca",
                      color: "#1a1916",
                      fontFamily: "var(--font-body)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "var(--color-accent)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "#d4d1ca")
                    }
                  />
                </motion.div>

                {/* Submit */}
                <motion.div variants={fadeUp}>
                  <Button
                    // type="submit"
                    // disabled={formState === "submitting"}
                    className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold font-display uppercase tracking-wider rounded-sm transition-all duration-200 disabled:opacity-60"
                    // style={{
                    //   background: "var(--color-accent)",
                    //   color: "#ffffff",
                    // }}
                    theme="light"
                  >
                    {formState === "submitting" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FiArrowRight size={15} />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="block text-xs font-display uppercase tracking-wider mb-2"
      style={{ color: "var(--color-black)" }}
    >
      {children}
    </label>
  );
}

function FormInput({
  type,
  name,
  placeholder,
  required,
}: {
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 text-sm rounded-sm transition-all duration-200 outline-none"
      style={{
        background: "#f9f8f6",
        border: "1px solid #d4d1ca",
        color: "#1a1916",
        fontFamily: "var(--font-body)",
      }}
      onFocus={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-accent)")
      }
      onBlur={(e) => (e.currentTarget.style.borderColor = "#d4d1ca")}
    />
  );
}

function SuccessState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 text-center rounded-sm"
      style={{
        background: "#ffffff",
        border: "1px solid #e2e0db",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{
          background: "#f0faf5",
          border: "1px solid #c5e8d5",
        }}
      >
        <FiCheck size={28} style={{ color: "var(--color-black)" }} />
      </div>
      <h3
        className="font-display font-bold text-2xl mb-3"
        style={{ color: "#1a1916" }}
      >
        Message Sent!
      </h3>
      <p
        className="text-sm max-w-xs leading-relaxed"
        style={{ color: "#5a5855" }}
      >
        Thank you for reaching out. Our team will get back to you within 24
        hours.
      </p>
    </div>
  );
}
