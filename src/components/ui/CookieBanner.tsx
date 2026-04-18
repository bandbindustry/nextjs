// src/components/ui/CookieBanner.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CookiePreferences } from "@/hooks/useCookieConsent";
import { FiX, FiChevronDown, FiShield } from "react-icons/fi";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  visible: boolean;
  onAcceptAll: () => void;
  onDeclineAll: () => void;
  onSaveCustom: (prefs: Omit<CookiePreferences, "necessary">) => void;
}

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (val: boolean) => void;
}

function ToggleRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: ToggleRowProps) {
  return (
    <div
      className="flex items-start justify-between gap-4 py-3"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div>
        <p
          className="font-display font-semibold text-sm mb-0.5"
          style={{ color: "var(--color-text)" }}
        >
          {label}
          {disabled && (
            <span
              className="ml-2 px-1.5 py-0.5 rounded-sm text-[9px] uppercase tracking-widest"
              style={{
                background: "oklch(from var(--color-accent) l c h / 0.1)",
                color: "var(--color-accent)",
              }}
            >
              Always On
            </span>
          )}
        </p>
        <p
          className="text-xs leading-relaxed"
          style={{ color: "var(--color-text-faint)", maxWidth: "36ch" }}
        >
          {description}
        </p>
      </div>

      {/* Toggle */}
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className="shrink-0 relative w-10 h-6 rounded-full transition-colors duration-200 focus-visible:outline-2"
        style={{
          background: checked
            ? "var(--color-accent)" // white when on
            : "var(--color-surface-3)", // ← was surface-dynamic, use surface-3
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.7 : 1,
        }}
        aria-label={`Toggle ${label}`}
      >
        <motion.span
          className="absolute top-1 w-4 h-4 rounded-full"
          style={{
            background: checked ? "var(--color-bg)" : "var(--color-text-muted)",
          }} // ← was "white"
          animate={{ left: checked ? "calc(100% - 1.25rem)" : "0.25rem" }}
          transition={{ duration: 0.2, ease: EASE }}
        />
      </button>
    </div>
  );
}

export default function CookieBanner({
  visible,
  onAcceptAll,
  onDeclineAll,
  onSaveCustom,
}: Props) {
  const [showCustom, setShowCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop — subtle */}
          <motion.div
            className="fixed inset-0 z-40 pointer-events-none"
            style={{ background: "oklch(0 0 0 / 0.3)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Banner */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Cookie preferences"
            className="fixed bottom-0 left-0 right-0 z-50 md:bottom-5 md:left-auto md:right-5 md:max-w-[420px]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div
              className="rounded-t-sm md:rounded-sm overflow-hidden"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "0 12px 40px oklch(0 0 0 / 0.18)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <div className="flex items-center gap-2">
                  <FiShield
                    size={14}
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span
                    className="font-display font-bold text-sm"
                    style={{ color: "var(--color-text)" }}
                  >
                    Cookie Preferences
                  </span>
                </div>
                <button
                  onClick={onDeclineAll}
                  className="w-7 h-7 flex items-center justify-center rounded-sm transition-colors duration-150"
                  style={{ color: "var(--color-text-faint)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-text)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-faint)")
                  }
                  aria-label="Close and decline"
                >
                  <FiX size={14} />
                </button>
              </div>

              {/* Body */}
              <div className="px-5 py-4">
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  We use cookies to improve your experience, analyse traffic,
                  and personalise content. You can manage your preferences
                  below.{" "}
                  <a
                    href="/privacy"
                    className="underline underline-offset-2 transition-colors duration-150"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Privacy Policy
                  </a>
                </p>

                {/* Customise toggle */}
                <button
                  onClick={() => setShowCustom((p) => !p)}
                  className="flex items-center gap-2 text-xs mb-2 transition-colors duration-150"
                  style={{ color: "var(--color-text-faint)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-faint)")
                  }
                >
                  <motion.span
                    animate={{ rotate: showCustom ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex"
                  >
                    <FiChevronDown size={13} />
                  </motion.span>
                  Manage individual cookies
                </button>

                {/* Custom toggles */}
                <AnimatePresence>
                  {showCustom && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1 pb-2">
                        <ToggleRow
                          label="Necessary"
                          description="Required for the site to function. Cannot be disabled."
                          checked={true}
                          disabled={true}
                          onChange={() => {}}
                        />
                        <ToggleRow
                          label="Analytics"
                          description="Help us understand how visitors interact with the site."
                          checked={analytics}
                          onChange={setAnalytics}
                        />
                        <ToggleRow
                          label="Marketing"
                          description="Used to show relevant ads and track campaign performance."
                          checked={marketing}
                          onChange={setMarketing}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 px-5 pb-5">
                {showCustom ? (
                  <>
                    <button
                      onClick={() => onSaveCustom({ analytics, marketing })}
                      className="flex-1 py-2.5 rounded-sm font-display font-semibold uppercase transition-opacity duration-150 hover:opacity-85"
                      style={{
                        background: "var(--color-accent)",
                        color: "var(--color-bg)",
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                      }}
                    >
                      Save Preferences
                    </button>
                    <button
                      onClick={onDeclineAll}
                      className="flex-1 py-2.5 rounded-sm font-display font-semibold uppercase transition-colors duration-150"
                      style={{
                        background: "var(--color-surface-2)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-muted)",
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-accent)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-border)")
                      }
                    >
                      Decline All
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={onAcceptAll}
                      className="flex-1 py-2.5 rounded-sm font-display font-semibold uppercase transition-opacity duration-150 hover:opacity-85"
                      style={{
                        background: "var(--color-accent)",

                        color: "var(--color-bg)",
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                      }}
                    >
                      Accept All
                    </button>
                    <button
                      onClick={onDeclineAll}
                      className="flex-1 py-2.5 rounded-sm font-display font-semibold uppercase transition-colors duration-150"
                      style={{
                        background: "var(--color-surface-2)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-muted)",
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-accent)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-border)")
                      }
                    >
                      Decline All
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
