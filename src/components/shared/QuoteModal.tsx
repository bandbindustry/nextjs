// src/sections/quote/QuoteModal.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/context/ModalContext";
import { COUNTRY_CODES } from "@/data/countries";
import {
  FiX,
  FiCheck,
  FiChevronDown,
  FiSearch,
  FiAlertCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiMessageSquare,
  FiBriefcase,
  FiTag,
} from "react-icons/fi";
import { RiSendPlaneLine } from "react-icons/ri";
import Select from "react-select";
import { submitContactForm } from "@/services/contact.service";
import Modal from "@/components/ui/Modal";
import { useRef } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type FormState = "idle" | "submitting" | "success" | "error";

// ── Data ──────────────────────────────────────────────────────────────────────
const COUNTRY_OPTIONS = COUNTRY_CODES.map((c) => ({
  value: c.name,
  label: `${c.flag} ${c.name}`,
}));
const INDIA_OPTION =
  COUNTRY_OPTIONS.find((o) => o.value === "India") ?? COUNTRY_OPTIONS[0];

// ── Motion variants ───────────────────────────────────────────────────────────
const formV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.032, delayChildren: 0.06 } },
};

const rowV = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const dropdownV = {
  hidden: { opacity: 0, y: -4, scale: 0.975 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.16, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.975,
    transition: { duration: 0.1, ease: "easeIn" as const },
  },
};

const successV = {
  hidden: { opacity: 0, scale: 0.88, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.48, ease: "backOut" as const },
  },
};

// ── Label ─────────────────────────────────────────────────────────────────────
function Label({
  children,
  required,
  icon,
}: {
  children: React.ReactNode;
  required?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <label
      className="flex items-center gap-1.5 text-[10px] font-display uppercase tracking-[0.16em] mb-1.5"
      style={{ color: "var(--color-light-faint)" }}
    >
      {icon && (
        <span style={{ color: "var(--color-light-accent)", opacity: 0.8 }}>
          {icon}
        </span>
      )}
      {children}
      {required && (
        <span style={{ color: "var(--color-light-accent)" }}>*</span>
      )}
    </label>
  );
}

// ── Input ─────────────────────────────────────────────────────────────────────
function Input({
  type = "text",
  name,
  placeholder,
  required,
  value,
  onChange,
  autoComplete,
}: {
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full px-3 py-2.5 text-sm outline-none transition-all duration-150 rounded-sm"
      style={{
        background: focused
          ? "var(--color-light-bg)"
          : "var(--color-light-surface)",
        border: focused
          ? "1px solid var(--color-light-accent)"
          : "1px solid var(--color-light-border)",
        color: "var(--color-light-text)",
        fontFamily: "var(--font-body)",
      }}
    />
  );
}

// ── Textarea ──────────────────────────────────────────────────────────────────
function Textarea({
  name,
  placeholder,
  rows = 3,
  value,
  onChange,
}: {
  name: string;
  placeholder?: string;
  rows?: number;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <textarea
      name={name}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full px-3 py-2.5 text-sm resize-none outline-none transition-all duration-150 rounded-sm"
      style={{
        background: focused
          ? "var(--color-light-bg)"
          : "var(--color-light-surface)",
        border: focused
          ? "1px solid var(--color-light-accent)"
          : "1px solid var(--color-light-border)",
        color: "var(--color-light-text)",
        fontFamily: "var(--font-body)",
      }}
    />
  );
}

// ── Dial Code Picker ──────────────────────────────────────────────────────────
function DialCodePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected =
    COUNTRY_CODES.find((c) => c.code === value) ?? COUNTRY_CODES[0];

  useEffect(() => {
    if (!open) return;
    const fn = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  const filtered = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search),
  );

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex items-center gap-1.5 px-3 h-full text-sm whitespace-nowrap transition-all duration-150 rounded-sm"
        style={{
          minWidth: "86px",
          background: focused
            ? "var(--color-light-bg)"
            : "var(--color-light-surface)",
          border: focused
            ? "1px solid var(--color-light-accent)"
            : "1px solid var(--color-light-border)",
          color: "var(--color-light-text)",
          fontFamily: "var(--font-body)",
        }}
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="text-xs" style={{ color: "var(--color-light-muted)" }}>
          {selected.code}
        </span>
        <FiChevronDown
          size={10}
          className={`ml-auto transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--color-light-faint)" }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownV}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 top-full mt-1 z-[300] w-52 overflow-hidden rounded-sm"
            style={{
              background: "var(--color-light-bg)",
              border: "1px solid var(--color-light-border)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <div
              className="flex items-center gap-2 px-3 py-2.5 sticky top-0"
              style={{
                background: "var(--color-light-bg)",
                borderBottom: "1px solid var(--color-light-border)",
              }}
            >
              <FiSearch
                size={11}
                style={{ color: "var(--color-light-faint)" }}
              />
              <input
                autoFocus
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-xs outline-none bg-transparent"
                style={{ color: "var(--color-light-text)" }}
              />
            </div>
            <ul
              className="max-h-44 overflow-y-auto"
              style={{ scrollbarWidth: "none" } as React.CSSProperties}
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
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition-colors duration-100"
                    style={{
                      background:
                        c.code === value
                          ? "var(--color-light-surface)"
                          : "transparent",
                      color: "var(--color-light-muted)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--color-light-surface)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        c.code === value
                          ? "var(--color-light-surface)"
                          : "transparent";
                    }}
                  >
                    <span>{c.flag}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span style={{ color: "var(--color-light-faint)" }}>
                      {c.code}
                    </span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li
                  className="px-3 py-4 text-xs text-center"
                  style={{ color: "var(--color-light-faint)" }}
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

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ form }: { form: Record<string, string> }) {
  const required = ["firstName", "email", "phone", "city"];
  const filled = required.filter((k) => form[k]?.trim()).length;
  const pct = Math.round((filled / required.length) * 100);

  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="flex-1 h-[2px] rounded-full overflow-hidden"
        style={{ background: "var(--color-light-surface)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--color-light-accent)" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span
        className="text-[10px] font-display uppercase tracking-widest shrink-0 tabular-nums"
        style={{ color: "var(--color-light-faint)" }}
      >
        {filled}/{required.length} required
      </span>
    </div>
  );
}

// ── Section divider ───────────────────────────────────────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pt-1 pb-0.5">
      <div
        className="flex-1 h-px"
        style={{ background: "var(--color-light-border)" }}
      />
      <span
        className="text-[9px] font-display uppercase tracking-[0.2em] shrink-0"
        style={{ color: "var(--color-light-faint)" }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: "var(--color-light-border)" }}
      />
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
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 px-4 py-3 rounded-sm mb-4"
      style={{ background: "#fff1f0", border: "1px solid #fca5a5" }}
    >
      <FiAlertCircle
        size={14}
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
        <FiX size={12} />
      </button>
    </motion.div>
  );
}

// ── react-select styles ───────────────────────────────────────────────────────
const selectStyles = {
  control: (b: Record<string, unknown>, s: { isFocused: boolean }) => ({
    ...b,
    background: s.isFocused
      ? "var(--color-light-bg)"
      : "var(--color-light-surface)",
    border: `1px solid ${s.isFocused ? "var(--color-light-accent)" : "var(--color-light-border)"}`,
    borderRadius: "4px",
    boxShadow: "none",
    minHeight: "40px",
    fontSize: "13px",
    color: "var(--color-light-text)",
    fontFamily: "var(--font-body)",
    transition: "border-color 150ms, background 150ms",
    "&:hover": { borderColor: "var(--color-light-accent)" },
  }),
  menu: (b: Record<string, unknown>) => ({
    ...b,
    background: "var(--color-light-bg)",
    border: "1px solid var(--color-light-border)",
    borderRadius: "4px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    zIndex: 9999,
  }),
  option: (
    b: Record<string, unknown>,
    s: { isSelected: boolean; isFocused: boolean },
  ) => ({
    ...b,
    background:
      s.isSelected || s.isFocused
        ? "var(--color-light-surface)"
        : "transparent",
    color: "var(--color-light-text)",
    fontSize: "13px",
    cursor: "pointer",
  }),
  singleValue: (b: Record<string, unknown>) => ({
    ...b,
    color: "var(--color-light-text)",
  }),
  placeholder: (b: Record<string, unknown>) => ({
    ...b,
    color: "var(--color-light-faint)",
    fontSize: "13px",
  }),
  input: (b: Record<string, unknown>) => ({
    ...b,
    color: "var(--color-light-text)",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (b: Record<string, unknown>) => ({
    ...b,
    color: "var(--color-light-faint)",
    padding: "0 8px",
  }),
  menuPortal: (b: Record<string, unknown>) => ({ ...b, zIndex: 9999 }),
};

// ── Success view ──────────────────────────────────────────────────────────────
function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={successV}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center py-12 px-4"
    >
      <div className="relative mb-6">
        <motion.div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 72,
            height: 72,
            background: `oklch(from var(--color-light-accent) l c h / 0.08)`,
            border: `1.5px solid oklch(from var(--color-light-accent) l c h / 0.3)`,
          }}
          animate={{ scale: [0.7, 1.06, 1] }}
          transition={{ duration: 0.5, ease: "backOut" }}
        >
          <FiCheck size={28} style={{ color: "var(--color-light-accent)" }} />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: "2px solid var(--color-light-accent)" }}
          animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
          transition={{ duration: 1, delay: 0.3, repeat: 2 }}
        />
      </div>

      <h3
        className="font-display font-bold text-xl mb-2"
        style={{ color: "var(--color-light-text)" }}
      >
        Request Submitted!
      </h3>
      <p
        className="text-sm leading-relaxed mb-1.5 max-w-[26ch]"
        style={{ color: "var(--color-light-muted)" }}
      >
        Our engineering team will review and respond within{" "}
        <span
          className="font-semibold"
          style={{ color: "var(--color-light-accent)" }}
        >
          24 hours
        </span>
        .
      </p>
      <p
        className="text-[11px] mb-8"
        style={{ color: "var(--color-light-faint)" }}
      >
        A confirmation has been sent to your inbox.
      </p>
      <button
        onClick={onClose}
        className="px-8 py-3 text-xs font-display font-semibold uppercase tracking-widest rounded-sm transition-opacity duration-200 hover:opacity-85 active:opacity-75"
        style={{
          background: "var(--color-light-accent)",
          color: "#fff",
        }}
      >
        Done
      </button>
    </motion.div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────
export default function QuoteModal() {
  const { isOpen, closeModal } = useModal();

  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [dialCode, setDialCode] = useState("+91");
  const [country, setCountry] = useState(INDIA_OPTION);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    subject: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    message: "",
  });

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setFormState("idle");
        setErrorMsg("");
        setDialCode("+91");
        setCountry(INDIA_OPTION);
        setForm({
          firstName: "",
          lastName: "",
          company: "",
          subject: "",
          email: "",
          phone: "",
          city: "",
          state: "",
          message: "",
        });
      }, 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const setField = (key: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    const result = await submitContactForm({
      first_name: form.firstName,
      last_name: form.lastName || undefined,
      company_name: form.company || undefined,
      email: form.email,
      country_code: dialCode,
      phone: form.phone,
      subject: form.subject || undefined,
      city_name: form.city,
      state: form.state || undefined,
      country_name: country?.value || "India",
      message: form.message || undefined,
    });

    if (result.success) {
      setFormState("success");
    } else {
      setErrorMsg(result.message || "Submission failed. Please try again.");
      setFormState("error");
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      eyebrow="Free Consultation"
      title="Talk to an Expert / Get a Quote"
      accentImage="https://picsum.photos/seed/industrial-steel/400/680"
      maxWidth={860}
    >
      <AnimatePresence mode="wait">
        {formState === "success" ? (
          <SuccessView key="success" onClose={closeModal} />
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            variants={formV}
            initial="hidden"
            animate="visible"
            className="space-y-3.5"
          >
            {/* Progress bar */}
            <ProgressBar form={form} />

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

            {/* ── Personal info ── */}
            <SectionDivider label="Personal Info" />

            <motion.div variants={rowV} className="grid grid-cols-2 gap-3">
              <div>
                <Label required icon={<FiUser size={9} />}>
                  First Name
                </Label>
                <Input
                  name="firstName"
                  placeholder="John"
                  required
                  value={form.firstName}
                  onChange={setField("firstName")}
                  autoComplete="given-name"
                />
              </div>
              <div>
                <Label icon={<FiUser size={9} />}>Last Name</Label>
                <Input
                  name="lastName"
                  placeholder="Smith"
                  value={form.lastName}
                  onChange={setField("lastName")}
                  autoComplete="family-name"
                />
              </div>
            </motion.div>

            <motion.div variants={rowV} className="grid grid-cols-2 gap-3">
              <div>
                <Label icon={<FiBriefcase size={9} />}>Company</Label>
                <Input
                  name="company"
                  placeholder="Your company"
                  value={form.company}
                  onChange={setField("company")}
                  autoComplete="organization"
                />
              </div>
              <div>
                <Label icon={<FiTag size={9} />}>Subject</Label>
                <Input
                  name="subject"
                  placeholder="e.g. Laser Cut Quote"
                  value={form.subject}
                  onChange={setField("subject")}
                />
              </div>
            </motion.div>

            {/* ── Contact ── */}
            <SectionDivider label="Contact" />

            <motion.div variants={rowV}>
              <Label required icon={<FiMail size={9} />}>
                Email Address
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="you@company.com"
                required
                value={form.email}
                onChange={setField("email")}
                autoComplete="email"
              />
            </motion.div>

            <motion.div variants={rowV}>
              <Label required icon={<FiPhone size={9} />}>
                Phone Number
              </Label>
              <div className="flex gap-2 items-stretch">
                <DialCodePicker value={dialCode} onChange={setDialCode} />
                <div className="flex-1">
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="98765 43210"
                    required
                    value={form.phone}
                    onChange={setField("phone")}
                    autoComplete="tel-national"
                  />
                </div>
              </div>
            </motion.div>

            {/* ── Location ── */}
            <SectionDivider label="Location" />

            <motion.div variants={rowV} className="grid grid-cols-2 gap-3">
              <div>
                <Label required icon={<FiMapPin size={9} />}>
                  City
                </Label>
                <Input
                  name="city"
                  placeholder="Ahmedabad"
                  required
                  value={form.city}
                  onChange={setField("city")}
                  autoComplete="address-level2"
                />
              </div>
              <div>
                <Label icon={<FiMapPin size={9} />}>State</Label>
                <Input
                  name="state"
                  placeholder="Gujarat"
                  value={form.state}
                  onChange={setField("state")}
                  autoComplete="address-level1"
                />
              </div>
            </motion.div>

            <motion.div variants={rowV}>
              <Label icon={<FiMapPin size={9} />}>Country</Label>
              <Select
                instanceId="qm-country"
                options={COUNTRY_OPTIONS}
                value={country}
                onChange={(opt) => setCountry(opt as typeof INDIA_OPTION)}
                styles={selectStyles as Parameters<typeof Select>[0]["styles"]}
                placeholder="Select country…"
                isSearchable
                menuPortalTarget={
                  typeof document !== "undefined" ? document.body : null
                }
                menuPosition="fixed"
              />
            </motion.div>

            {/* ── Message ── */}
            <SectionDivider label="Your Message" />

            <motion.div variants={rowV}>
              <Label icon={<FiMessageSquare size={9} />}>Message</Label>
              <Textarea
                name="message"
                placeholder="Describe your project, material specs, quantity, or any questions…"
                rows={3}
                value={form.message}
                onChange={setField("message")}
              />
            </motion.div>

            {/* ── Submit ── */}
            <motion.div variants={rowV} className="pt-2 pb-1">
              <p
                className="text-[10px] text-center mb-3"
                style={{ color: "var(--color-light-faint)" }}
              >
                We respect your privacy — no spam, ever.
              </p>
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 text-[13px] font-display font-semibold uppercase tracking-widest rounded-sm transition-opacity duration-200 disabled:opacity-60 hover:opacity-85 active:opacity-75"
                style={{
                  background: "var(--color-light-accent)",
                  color: "#fff",
                }}
              >
                {formState === "submitting" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <RiSendPlaneLine size={15} />
                    Submit Request
                  </>
                )}
              </button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </Modal>
  );
}
