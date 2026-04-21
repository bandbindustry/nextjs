"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "@/hooks/useSettings";
import {
  FiMessageCircle,
  FiMail,
  FiArrowUp,
  FiX,
  FiPhone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";

// ── Types ──────────────────────────────────────────────────
type ActionType = "chat" | "email" | "whatsapp" | "inquiry" | "top";

interface WidgetItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  action: ActionType;
  href?: string;
  accentColor?: string;
}

export default function FloatingWidget() {
  const settings = useSettings();
  const [visible, setVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const ITEMS: WidgetItem[] = useMemo(
    () => [
      {
        id: "chat",
        icon: <FiMessageCircle size={18} />,
        label: "Talk",
        action: "chat",
        accentColor: "var(--color-accent)",
      },
      {
        id: "email",
        icon: <FiMail size={18} />,
        label: "Email",
        action: "email",
        href: `mailto:${settings.contact_email}`,
        accentColor: "var(--color-accent)",
      },
      {
        id: "whatsapp",
        icon: <FaWhatsapp size={18} />,
        label: "WhatsApp",
        action: "whatsapp",
        href: `https://wa.me/${settings.whatsapp_phone_number || "919000000000"}`,
        accentColor: "#22c55e",
      },
      {
        id: "inquiry",
        icon: <RiSendPlaneLine size={18} />,
        label: "Inquiry",
        action: "inquiry",
        href: "/contact",
        accentColor: "var(--color-accent)",
      },
    ],
    [settings.contact_email, settings.whatsapp_phone_number],
  );

  // ── Scroll detection ──
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 100);
      setShowTop(y > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {/* ── Main floating column ── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed bottom-6 right-4 z-50 flex flex-col items-center gap-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── 4 action items ── */}
            {ITEMS.map((item, i) => {
              const isHovered = hoveredId === item.id;
              const isChat = item.action === "chat";
              const isChatActive = isChat && chatOpen;

              const baseStyle: React.CSSProperties = {
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: "pointer",
                background: isChatActive
                  ? item.accentColor
                  : isHovered
                    ? "var(--color-surface-3)"
                    : "var(--color-surface-2)",
                border: `1px solid ${
                  isHovered || isChatActive
                    ? (item.accentColor ?? "var(--color-accent)")
                    : "var(--color-border)"
                }`,
                color:
                  isHovered || isChatActive
                    ? (item.accentColor ?? "var(--color-accent)")
                    : "var(--color-text-muted)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                transition: "background 0.2s, border-color 0.2s, color 0.2s",
              };

              const tooltip = (
                <span
                  className="absolute right-full mr-3 px-2.5 py-1 text-[10px] font-display uppercase tracking-wider rounded-sm whitespace-nowrap pointer-events-none"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateX(0)" : "translateX(6px)",
                    transition: "opacity 0.2s, transform 0.2s",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  {item.label}
                </span>
              );

              // Chat — button
              if (isChat) {
                return (
                  <motion.button
                    key={item.id}
                    style={baseStyle}
                    onClick={() => setChatOpen((v) => !v)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    aria-label={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.07,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ x: -5, scale: 1.08 }}
                  >
                    {tooltip}
                    {isChatActive ? (
                      <FiX size={17} color="white" />
                    ) : (
                      <span
                        style={{
                          color: isHovered
                            ? item.accentColor
                            : "var(--color-text-muted)",
                        }}
                      >
                        {item.icon}
                      </span>
                    )}
                    {/* Green live dot */}
                    <span
                      className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full border border-[var(--color-surface-2)]"
                      style={{ background: "#22c55e" }}
                    />
                  </motion.button>
                );
              }

              // Email / WhatsApp / Inquiry — links
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.07,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ x: -5, scale: 1.08 }}
                >
                  <Link
                    href={item.href!}
                    style={baseStyle}
                    target={item.action === "whatsapp" ? "_blank" : undefined}
                    rel={
                      item.action === "whatsapp"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    aria-label={item.label}
                  >
                    {tooltip}
                    <span
                      style={{
                        color: isHovered
                          ? (item.accentColor ?? "var(--color-accent)")
                          : "var(--color-text-muted)",
                        transition: "color 0.2s",
                      }}
                    >
                      {item.icon}
                    </span>
                  </Link>
                </motion.div>
              );
            })}

            {/* ── Divider ── */}
            <div
              className="w-5 my-0.5"
              style={{ height: "1px", background: "var(--color-border)" }}
            />

            {/* ── Back to top ── */}
            <AnimatePresence>
              {showTop && (
                <motion.button
                  onClick={scrollToTop}
                  aria-label="Back to top"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--color-surface-2)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-muted)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                    cursor: "pointer",
                  }}
                  initial={{ opacity: 0, y: 12, scale: 0.75 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.75 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                >
                  <FiArrowUp size={17} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat popup ── */}
      <AnimatePresence>
        {chatOpen && (
          <ChatPopup
            onClose={() => setChatOpen(false)}
            phone={settings.contact_phone_number}
            email={settings.contact_email}
            whatsapp={settings.whatsapp_phone_number || "919000000000"}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Chat Popup ─────────────────────────────────────────────
function ChatPopup({
  onClose,
  phone,
  email,
  whatsapp,
}: {
  onClose: () => void;
  phone: string;
  email: string;
  whatsapp: string;
}) {
  const links = [
    {
      icon: <FaWhatsapp size={15} color="white" />,
      iconBg: "#22c55e",
      label: "WhatsApp",
      sub: "Chat with us now",
      href: `https://wa.me/${whatsapp}`,
      target: "_blank" as const,
      hoverColor: "#22c55e",
    },
    {
      icon: <FiPhone size={14} style={{ color: "var(--color-accent)" }} />,
      iconBg: "var(--color-surface-3)",
      label: "Call Us",
      sub: phone,
      href: `tel:${phone}`,
      target: undefined,
      hoverColor: "var(--color-accent)",
    },
    {
      icon: <FiMail size={14} style={{ color: "var(--color-accent)" }} />,
      iconBg: "var(--color-surface-3)",
      label: "Email",
      sub: email,
      href: `mailto:${email}`,
      target: undefined,
      hoverColor: "var(--color-accent)",
    },
  ];

  return (
    <motion.div
      className="fixed bottom-6 right-16 z-50 w-72 rounded-lg overflow-hidden"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
      }}
      initial={{ opacity: 0, y: 16, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.93 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <FiMessageCircle size={15} color="white" />
          </div>
          <div>
            <p className="text-xs font-display font-bold text-white leading-tight">
              B & B Industries
            </p>
            <p className="text-[10px] text-white/70 mt-0.5">
              We reply within 24 hours
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <FiX size={14} color="white" />
        </button>
      </div>

      {/* Links */}
      <div className="p-3 flex flex-col gap-2">
        {links.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            target={c.target}
            rel={c.target === "_blank" ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors duration-200"
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = c.hoverColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--color-border)";
            }}
          >
            <span
              className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
              style={{ background: c.iconBg }}
            >
              {c.icon}
            </span>
            <div className="min-w-0">
              <p
                className="text-xs font-semibold font-display"
                style={{ color: "var(--color-text)" }}
              >
                {c.label}
              </p>
              <p
                className="text-[10px] truncate"
                style={{ color: "var(--color-text-faint)" }}
              >
                {c.sub}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: "#22c55e" }}
        />
        <p
          className="text-[10px] font-display uppercase tracking-wider"
          style={{ color: "var(--color-text-faint)" }}
        >
          Online · Replies in ~1 hour
        </p>
      </div>
    </motion.div>
  );
}
