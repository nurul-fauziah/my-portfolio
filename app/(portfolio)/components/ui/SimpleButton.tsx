"use client";

import React from "react";
import { motion } from "framer-motion";

type SimpleButtonProps = {
  variant?: "default" | "outline";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
};

export function SimpleButton({
  variant = "default",
  className = "",
  children,
  onClick,
  href,
}: SimpleButtonProps) {
  const baseClass =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-[0.08em] transition-all duration-300";
  const variantClass =
    variant === "outline"
      ? "border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 hover:text-[var(--accent-light)] dark:hover:border-[var(--accent)]/30 dark:hover:bg-[var(--accent)]/10"
      : "bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] text-white shadow-[0_4px_20px_rgba(129,166,198,0.35)] hover:shadow-[0_8px_30px_rgba(129,166,198,0.5)] hover:brightness-110";

  const combinedClass = `${baseClass} ${variantClass} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={combinedClass}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={combinedClass}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
