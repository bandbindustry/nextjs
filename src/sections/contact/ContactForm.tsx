"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedLine from "@/components/ui/AnimatedLine";
import { staggerContainer, fadeUp } from "@/lib/motion";
import {
  FiArrowRight,
  FiCheck,
  FiAlertCircle,
  FiChevronDown,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { COUNTRY_CODES } from "@/data/countries";
import Select from "react-select";
import { submitContactForm } from "@/services/contact.service";
import { AnimatePresence } from "framer-motion";

// ── Country options ────────────────────────────────────────────────────────────
const COUNTRY_OPTIONS = COUNTRY_CODES.map((c) => ({
  value: c.name,
  label: `${c.flag} ${c.name}`,
}));
const INDIA_OPTION =
  COUNTRY_OPTIONS.find((o) => o.value === "India") ?? COUNTRY_OPTIONS[0];

type FormState = "idle" | "submitting" | "success" | "error";

// ── react-select styles (light) ───────────────────────────────────────────────
const selectStyles = {
  control: (base: Record<string, unknown>, state: { isFocused: boolean }) => ({
    ...base,
    background: "#f9f8f6",
    border: `1px solid ${state.isFocused ? "var(--color-accent)" : "#d4d1ca"}`,
    borderRadius: "2px",
    boxShadow: "none",
    minHeight: "46px",
    fontSize: "14px",
    color: "#1a1916",
    fontFamily: "var(--font-body)",
    "&:hover": { borderColor: "var(--color-accent)" },
  }),
  menu: (base: Record<string, unknown>) => ({
    ...base,
    background: "#ffffff",
    border: "1px solid #d4d1ca",
    borderRadius: "2px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    zIndex: 9999,
  }),
  option: (
    base: Record<string, unknown>,
    state: { isSelected: boolean; isFocused: boolean },
  ) => ({
    ...base,
    background: state.isSelected || state.isFocused ? "#f7f6f2" : "transparent",
    color: "#1a1916",
    fontSize: "13px",
    cursor: "pointer",
  }),
  singleValue: (base: Record<string, unknown>) => ({
    ...base,
    color: "#1a1916",
  }),
  placeholder: (base: Record<string, unknown>) => ({
    ...base,
    color: "#9a9794",
    fontSize: "13px",
  }),
  input: (base: Record<string, unknown>) => ({ ...base, color: "#1a1916" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base: Record<string, unknown>) => ({
    ...base,
    color: "#9a9794",
    padding: "0 8px",
  }),
};

// ── Dial code picker ──────────────────────────────────────────────────────────
function DialCodePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected =
    COUNTRY_CODES.find((c) => c.code === value) ?? COUNTRY_CODES[0];

  const filtered = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search),
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 h-full text-sm rounded-sm transition-colors duration-200 whitespace-nowrap"
        style={{
          background: "#f9f8f6",
          border: "1px solid #d4d1ca",
          color: "#1a1916",
          minWidth: "90px",
          minHeight: "46px",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-accent)")
        }
        onBlur={(e) => (e.currentTarget.style.borderColor = "#d4d1ca")}
      >
        <span>{selected.flag}</span>
        <span className="text-xs" style={{ color: "#5a5855" }}>
          {selected.code}
        </span>
        <FiChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "#9a9794" }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full mt-1 z-50 w-56 rounded-sm overflow-hidden"
            style={{
              background: "#ffffff",
              border: "1px solid #d4d1ca",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            }}
          >
            <div
              className="flex items-center gap-2 px-3 py-2 sticky top-0"
              style={{
                background: "#ffffff",
                borderBottom: "1px solid #e2e0db",
              }}
            >
              <FiSearch size={12} style={{ color: "#9a9794" }} />
              <input
                autoFocus
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-xs outline-none bg-transparent"
                style={{ color: "#1a1916" }}
              />
            </div>
            <ul
              className="max-h-48 overflow-y-auto"
              style={{ scrollbarWidth: "thin" }}
            >
              {filtered.map((c, i) => (
                <li key={`${c.code}-${i}`}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(c.code);
                      setOpen(false);
                      setSearch("");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-colors duration-150 text-left"
                    style={{
                      background: c.code === value ? "#f7f6f2" : "transparent",
                      color: "#5a5855",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "#f7f6f2";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        c.code === value ? "#f7f6f2" : "transparent";
                    }}
                  >
                    <span>{c.flag}</span>
                    <span className="flex-1">{c.name}</span>
                    <span style={{ color: "#9a9794" }}>{c.code}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li
                  className="px-3 py-4 text-xs text-center"
                  style={{ color: "#9a9794" }}
                >
                  No results
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Field label ───────────────────────────────────────────────────────────────
function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      className="block text-xs font-display uppercase tracking-wider mb-2"
      style={{ color: "#1a1916" }}
    >
      {children}
      {required && (
        <span className="ml-0.5" style={{ color: "var(--color-accent)" }}>
          *
        </span>
      )}
    </label>
  );
}

// ── Form input ────────────────────────────────────────────────────────────────
function FormInput({
  type = "text",
  name,
  placeholder,
  required,
  value,
  onChange,
}: {
  type?: string;
  name: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
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

// ── Success state ─────────────────────────────────────────────────────────────
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
      <motion.div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ background: "#f0faf5", border: "1px solid #c5e8d5" }}
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.45, ease: "backOut" }}
      >
        <FiCheck size={28} style={{ color: "var(--color-accent)" }} />
      </motion.div>
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
        Thank you for reaching out. Our team will get back to you within{" "}
        <span
          className="font-semibold"
          style={{ color: "var(--color-accent)" }}
        >
          24 hours
        </span>
        .
      </p>
    </div>
  );
}

// ── Error banner ──────────────────────────────────────────────────────────────
function ErrorBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 px-4 py-3 rounded-sm mb-4"
      style={{ background: "#fff1f0", border: "1px solid #fca5a5" }}
    >
      <FiAlertCircle
        size={15}
        className="shrink-0 mt-0.5"
        style={{ color: "#dc2626" }}
      />
      <p
        className="text-xs flex-1 leading-relaxed"
        style={{ color: "#991b1b" }}
      >
        {message}
      </p>
      <button onClick={onDismiss} style={{ color: "#dc2626" }}>
        <FiX size={13} />
      </button>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ContactForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: true, margin: "-80px 0px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [dialCode, setDialCode] = useState("+91");
  const [country, setCountry] = useState(INDIA_OPTION);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    subject: "",
    message: "",
  });

  function setField(key: keyof typeof form) {
    return (v: string) => setForm((f) => ({ ...f, [key]: v }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");
    try {
      const result = await submitContactForm({
        first_name: form.firstName,
        last_name: form.lastName || undefined,
        company_name: form.company || undefined,
        email: form.email,
        phone: `${dialCode} ${form.phone}`,
        subject: form.subject || undefined,
        city_name: form.city,
        state: form.state || undefined,
        pincode: form.pincode || undefined,
        country_name: country?.value || "India",
        message: form.message || undefined,
      });
      if (result.success) {
        setFormState("success");
      } else {
        setErrorMsg(result.message || "Submission failed. Please try again.");
        setFormState("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setFormState("error");
    }
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

            <div className="space-y-1">
              {[
                { label: "Response Time", value: "< 24 Hours" },
                { label: "Free Consultation", value: "Always" },
                { label: "Custom Quotes", value: "No Obligation" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3"
                  style={{ borderBottom: "1px solid #d4d1ca" }}
                >
                  <span
                    className="text-xs uppercase tracking-wider font-display"
                    style={{ color: "#1a1916" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-semibold font-display"
                    style={{ color: "#1a1916" }}
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
                className="space-y-5 p-8 rounded-sm"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e0db",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                {/* Error banner */}
                {formState === "error" && errorMsg && (
                  <ErrorBanner
                    message={errorMsg}
                    onDismiss={() => {
                      setFormState("idle");
                      setErrorMsg("");
                    }}
                  />
                )}

                {/* First Name + Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={fadeUp}>
                    <FieldLabel required>First Name</FieldLabel>
                    <FormInput
                      name="firstName"
                      placeholder="John"
                      required
                      value={form.firstName}
                      onChange={setField("firstName")}
                    />
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <FieldLabel>Last Name</FieldLabel>
                    <FormInput
                      name="lastName"
                      placeholder="Smith"
                      value={form.lastName}
                      onChange={setField("lastName")}
                    />
                  </motion.div>
                </div>

                {/* Company + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={fadeUp}>
                    <FieldLabel>Company Name</FieldLabel>
                    <FormInput
                      name="company"
                      placeholder="Your company"
                      value={form.company}
                      onChange={setField("company")}
                    />
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <FieldLabel>Subject</FieldLabel>
                    <FormInput
                      name="subject"
                      placeholder="e.g. Laser Cutting Quote"
                      value={form.subject}
                      onChange={setField("subject")}
                    />
                  </motion.div>
                </div>

                {/* Email */}
                <motion.div variants={fadeUp}>
                  <FieldLabel required>Email Address</FieldLabel>
                  <FormInput
                    type="email"
                    name="email"
                    placeholder="john@company.com"
                    required
                    value={form.email}
                    onChange={setField("email")}
                  />
                </motion.div>

                {/* Phone */}
                <motion.div variants={fadeUp}>
                  <FieldLabel required>Phone Number</FieldLabel>
                  <div className="flex gap-2">
                    <DialCodePicker value={dialCode} onChange={setDialCode} />
                    <div className="flex-1">
                      <FormInput
                        type="tel"
                        name="phone"
                        placeholder="98765 43210"
                        required
                        value={form.phone}
                        onChange={setField("phone")}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* City + State + Pincode */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <motion.div variants={fadeUp}>
                    <FieldLabel required>City</FieldLabel>
                    <FormInput
                      name="city"
                      placeholder="Ahmedabad"
                      required
                      value={form.city}
                      onChange={setField("city")}
                    />
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <FieldLabel>State / Province</FieldLabel>
                    <FormInput
                      name="state"
                      placeholder="Gujarat"
                      value={form.state}
                      onChange={setField("state")}
                    />
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <FieldLabel>Pincode</FieldLabel>
                    <FormInput
                      name="pincode"
                      placeholder="360001"
                      value={form.pincode}
                      onChange={setField("pincode")}
                    />
                  </motion.div>
                </div>

                {/* Country */}
                <motion.div variants={fadeUp}>
                  <FieldLabel>Country</FieldLabel>
                  <Select
                    instanceId="contact-country-select"
                    options={COUNTRY_OPTIONS}
                    value={country}
                    onChange={(opt) => setCountry(opt as typeof INDIA_OPTION)}
                    styles={
                      selectStyles as Parameters<typeof Select>[0]["styles"]
                    }
                    placeholder="Select country..."
                    isSearchable
                  />
                </motion.div>

                {/* Message */}
                <motion.div variants={fadeUp}>
                  <FieldLabel>Message</FieldLabel>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Describe your project, quantities, materials, timeline..."
                    value={form.message}
                    onChange={(e) => setField("message")(e.target.value)}
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
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold font-display uppercase tracking-wider rounded-sm transition-all duration-200 disabled:opacity-60"
                    style={{
                      background: "var(--color-black)",
                      color: "#ffffff",
                    }}
                    onMouseEnter={(e) => {
                      if (formState !== "submitting")
                        (e.currentTarget as HTMLElement).style.opacity = "0.85";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                    }}
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
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
