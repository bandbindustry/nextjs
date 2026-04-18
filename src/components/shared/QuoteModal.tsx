"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/context/ModalContext";
import { COUNTRY_CODES } from "@/data/countries";
import { FiX, FiCheck, FiChevronDown, FiSearch } from "react-icons/fi";
import { RiSendPlaneLine } from "react-icons/ri";

type FormState = "idle" | "submitting" | "success";

const MATERIALS = [
  "Mild Steel",
  "Stainless Steel",
  "Aluminum",
  "Brass",
  "Copper",
  "Titanium",
  "Cast Iron",
  "Alloy Steel",
  "Other",
];

const PROCUREMENT = [
  "Immediately",
  "Within 1 Month",
  "1–3 Months",
  "3–6 Months",
  "Just Researching",
];

const THICKNESS = [
  "< 1 mm",
  "1–3 mm",
  "3–6 mm",
  "6–10 mm",
  "10–20 mm",
  "20–50 mm",
  "> 50 mm",
];

// ── Variants ──────────────────────────────────────────────────────────────
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" as const } },
};

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.97,
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};

const formContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: "backOut" as const },
  },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: { duration: 0.14, ease: "easeIn" as const },
  },
};

// ── Shared input style ────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  background: "var(--color-surface-2)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
  fontFamily: "var(--font-body)",
};

function focusBorder(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = "var(--color-accent)";
}
function blurBorder(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = "var(--color-border)";
}

// ── Label ─────────────────────────────────────────────────────────────────
function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      className="block text-[10px] font-display uppercase tracking-[0.18em] mb-1.5"
      style={{ color: "var(--color-text-faint)" }}
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

// ── Input ─────────────────────────────────────────────────────────────────
function Input({
  type = "text",
  name,
  placeholder,
  required,
  value,
  onChange,
}: {
  type?: string;
  name: string;
  placeholder?: string;
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
      className="w-full px-3 py-2.5 text-sm rounded-sm outline-none transition-colors duration-200"
      style={inputBase}
      onFocus={focusBorder}
      onBlur={blurBorder}
    />
  );
}

// ── Select ────────────────────────────────────────────────────────────────
function Select({
  name,
  options,
  placeholder,
  required,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 text-sm rounded-sm outline-none appearance-none transition-colors duration-200 cursor-pointer"
        style={{
          ...inputBase,
          color: value ? "var(--color-text)" : "var(--color-text-faint)",
        }}
        onFocus={focusBorder}
        onBlur={blurBorder}
      >
        <option value="" disabled>
          {placeholder ?? "Select..."}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <FiChevronDown
        size={13}
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: "var(--color-text-faint)" }}
      />
    </div>
  );
}

// ── Country Picker ────────────────────────────────────────────────────────
function CountryPicker({
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

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const picker = document.getElementById("country-picker-root");
      if (picker && !picker.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const filtered = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search),
  );

  return (
    <div id="country-picker-root" className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2.5 text-sm rounded-sm transition-colors duration-200 whitespace-nowrap"
        style={{ ...inputBase, minWidth: "90px" }}
      >
        <span>{selected.flag}</span>
        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          {selected.code}
        </span>
        <FiChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--color-text-faint)" }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 top-full mt-1 z-50 w-56 rounded-sm overflow-hidden"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
            }}
          >
            {/* Search */}
            <div
              className="flex items-center gap-2 px-3 py-2 sticky top-0"
              style={{
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <FiSearch
                size={12}
                style={{ color: "var(--color-text-faint)" }}
              />
              <input
                autoFocus
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-xs outline-none bg-transparent"
                style={{ color: "var(--color-text)" }}
              />
            </div>

            {/* List */}
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
                      background:
                        c.code === value
                          ? "var(--color-surface-2)"
                          : "transparent",
                      color: "var(--color-text-muted)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--color-surface-2)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        c.code === value
                          ? "var(--color-surface-2)"
                          : "transparent";
                    }}
                  >
                    <span>{c.flag}</span>
                    <span className="flex-1">{c.name}</span>
                    <span style={{ color: "var(--color-text-faint)" }}>
                      {c.code}
                    </span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li
                  className="px-3 py-4 text-xs text-center"
                  style={{ color: "var(--color-text-faint)" }}
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

// ── Progress Bar ──────────────────────────────────────────────────────────
function ProgressBar({ form }: { form: Record<string, string> }) {
  const required = ["name", "state", "email", "phone"];
  const filled = required.filter((k) => form[k]?.trim()).length;
  const pct = Math.round((filled / required.length) * 100);

  return (
    <div
      className="flex items-center gap-3 px-6 py-2.5 shrink-0"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div
        className="flex-1 h-[3px] rounded-full overflow-hidden"
        style={{ background: "var(--color-surface-3)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--color-accent)" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span
        className="text-[10px] font-display uppercase tracking-widest shrink-0"
        style={{ color: "var(--color-text-faint)" }}
      >
        {filled}/{required.length} required
      </span>
    </div>
  );
}

// ── Success View ──────────────────────────────────────────────────────────
function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={successVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center py-16 px-8"
    >
      {/* Animated check ring */}
      <div className="relative mb-6">
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "var(--color-surface-3)",
            border: "1px solid var(--color-border)",
          }}
          animate={{ scale: [0.7, 1.05, 1] }}
          transition={{ duration: 0.55, ease: "backOut" }}
        >
          <FiCheck size={32} style={{ color: "var(--color-accent)" }} />
        </motion.div>
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "2px solid var(--color-accent)" }}
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1, delay: 0.3, repeat: 2 }}
        />
      </div>

      <h3
        className="font-display font-bold text-2xl mb-2"
        style={{ color: "var(--color-text)" }}
      >
        Request Submitted!
      </h3>
      <p
        className="text-sm max-w-xs leading-relaxed mb-2"
        style={{ color: "var(--color-text-muted)" }}
      >
        Thank you for reaching out. Our engineering team will review your
        requirements and get back to you within{" "}
        <span
          style={{ color: "var(--color-accent)" }}
          className="font-semibold"
        >
          24 hours
        </span>
        .
      </p>
      <p
        className="text-[11px] mb-8"
        style={{ color: "var(--color-text-faint)" }}
      >
        Check your inbox — a confirmation has been sent.
      </p>

      <button
        onClick={onClose}
        className="px-8 py-3 text-xs font-display font-semibold uppercase tracking-widest rounded-sm transition-colors duration-200"
        style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "var(--color-accent-hover)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "var(--color-accent)";
        }}
      >
        Close
      </button>
    </motion.div>
  );
}

// ── Main Modal ────────────────────────────────────────────────────────────
export default function QuoteModal() {
  const { isOpen, closeModal } = useModal();

  const [formState, setFormState] = useState<FormState>("idle");
  const [countryCode, setCountryCode] = useState("+91");
  const [form, setForm] = useState({
    name: "",
    company: "",
    state: "",
    email: "",
    phone: "",
    material: "",
    thickness: "",
    procurement: "",
    message: "",
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setFormState("idle");
        setForm({
          name: "",
          company: "",
          state: "",
          email: "",
          phone: "",
          material: "",
          thickness: "",
          procurement: "",
          message: "",
        });
      }, 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  function setField(key: keyof typeof form) {
    return (v: string) => setForm((f) => ({ ...f, [key]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("success");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="quote-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <motion.div
            key="quote-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-sm overflow-hidden"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.75)",
            }}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-6 py-4 shrink-0"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center gap-4">
                {/* Accent dot */}
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: "var(--color-accent)" }}
                />
                <div>
                  <p
                    className="text-[10px] font-display uppercase tracking-[0.2em] mb-0.5"
                    style={{ color: "var(--color-text-faint)" }}
                  >
                    Free Consultation
                  </p>
                  <h2
                    className="font-display font-bold text-lg"
                    style={{ color: "var(--color-text)" }}
                  >
                    Talk to an Expert / Get a Quote
                  </h2>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="p-2 rounded-sm transition-all duration-200"
                style={{ color: "var(--color-text-faint)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--color-text)";
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--color-surface-2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--color-text-faint)";
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }}
                aria-label="Close modal"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* ── Progress bar (only shown during form) ── */}
            {formState !== "success" && <ProgressBar form={form} />}

            {/* ── Body ── */}
            <div className="overflow-y-auto flex-1 px-6 py-5">
              {formState === "success" ? (
                <SuccessView onClose={closeModal} />
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  variants={formContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Row 1 — Name + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div variants={fieldVariants}>
                      <Label required>Full Name</Label>
                      <Input
                        name="name"
                        placeholder="John Smith"
                        required
                        value={form.name}
                        onChange={setField("name")}
                      />
                    </motion.div>
                    <motion.div variants={fieldVariants}>
                      <Label>Company</Label>
                      <Input
                        name="company"
                        placeholder="Your company"
                        value={form.company}
                        onChange={setField("company")}
                      />
                    </motion.div>
                  </div>

                  {/* Row 2 — State + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div variants={fieldVariants}>
                      <Label required>State / Province</Label>
                      <Input
                        name="state"
                        placeholder="Gujarat"
                        required
                        value={form.state}
                        onChange={setField("state")}
                      />
                    </motion.div>
                    <motion.div variants={fieldVariants}>
                      <Label required>Email Address</Label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="you@company.com"
                        required
                        value={form.email}
                        onChange={setField("email")}
                      />
                    </motion.div>
                  </div>

                  {/* Row 3 — Phone */}
                  <motion.div variants={fieldVariants}>
                    <Label required>Phone Number</Label>
                    <div className="flex gap-2">
                      <CountryPicker
                        value={countryCode}
                        onChange={setCountryCode}
                      />
                      <div className="flex-1">
                        <Input
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

                  {/* Row 4 — Material + Thickness */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div variants={fieldVariants}>
                      <Label>Cutting Material</Label>
                      <Select
                        name="material"
                        options={MATERIALS}
                        placeholder="Select material"
                        value={form.material}
                        onChange={setField("material")}
                      />
                    </motion.div>
                    <motion.div variants={fieldVariants}>
                      <Label>Cutting Thickness</Label>
                      <Select
                        name="thickness"
                        options={THICKNESS}
                        placeholder="Select thickness"
                        value={form.thickness}
                        onChange={setField("thickness")}
                      />
                    </motion.div>
                  </div>

                  {/* Row 5 — Procurement chips */}
                  <motion.div variants={fieldVariants}>
                    <Label>When is Your Procurement?</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {PROCUREMENT.map((p) => {
                        const active = form.procurement === p;
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() =>
                              setField("procurement")(active ? "" : p)
                            }
                            className="px-3 py-1.5 text-[11px] font-display uppercase tracking-wider rounded-sm transition-all duration-150"
                            style={{
                              border: `1px solid ${active ? "var(--color-accent)" : "var(--color-border)"}`,
                              background: active
                                ? "var(--color-surface-3)"
                                : "transparent",
                              color: active
                                ? "var(--color-accent)"
                                : "var(--color-accent)",
                            }}
                          >
                            {p}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Row 6 — Message */}
                  <motion.div variants={fieldVariants}>
                    <Label>Message</Label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Describe your project, requirements, or questions..."
                      value={form.message}
                      onChange={(e) => setField("message")(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm rounded-sm resize-none outline-none transition-colors duration-200"
                      style={inputBase}
                      onFocus={focusBorder}
                      onBlur={blurBorder}
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fieldVariants} className="pt-1 pb-1">
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 text-sm font-display font-semibold uppercase tracking-widest rounded-sm transition-all duration-200 disabled:opacity-60"
                      style={{
                        background: "var(--color-accent)",
                        color: "var(--color-bg)",
                      }}
                      onMouseEnter={(e) => {
                        if (formState !== "submitting")
                          (e.currentTarget as HTMLElement).style.background =
                            "var(--color-accent-hover)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "var(--color-accent)";
                      }}
                    >
                      {formState === "submitting" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <RiSendPlaneLine size={16} />
                          Submit Request
                        </>
                      )}
                    </button>

                    <p
                      className="text-[10px] text-center mt-3"
                      style={{ color: "var(--color-text-faint)" }}
                    >
                      We respect your privacy. No spam, ever.
                    </p>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
