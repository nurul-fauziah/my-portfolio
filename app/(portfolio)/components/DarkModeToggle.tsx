"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ y: -2, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#D2C4B4] bg-[#F8F1E8] text-[#6E6257] transition hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-[#3a3a3a] dark:bg-[#1a1a1a] dark:text-[#ccc] dark:hover:border-[var(--accent)]"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: dark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.div>
    </motion.button>
  );
}
