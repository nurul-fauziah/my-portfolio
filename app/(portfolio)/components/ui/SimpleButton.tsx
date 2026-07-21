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
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-[0.08em] transition duration-300";
  const variantClass =
    variant === "outline"
      ? "border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:bg-[#AACDDC]/20 dark:hover:bg-[#81A6C6]/10"
      : "bg-[#81A6C6] text-white hover:bg-[#7096B5]";

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
