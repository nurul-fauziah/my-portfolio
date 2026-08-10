"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function DarkModeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = prev === null ? true : !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  // Don't render until initialized to avoid flash
  if (dark === null) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-secondary)]" />
    );
  }

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ y: -2, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        key={dark ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.div>
    </motion.button>
  );
}
