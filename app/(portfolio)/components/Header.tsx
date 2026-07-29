"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavLink } from "../lib/types";
import { DarkModeToggle } from "./DarkModeToggle";

type HeaderProps = {
  siteName?: string;
  navLinks?: NavLink[];
};

export function Header({
  siteName = "yourname",
  navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 mb-14 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-[var(--border)]/40 bg-[var(--bg-primary)]/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          : "border-[var(--border)]/70 bg-[var(--bg-primary)]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-12">
        <div>
          <motion.p
            whileHover={{ letterSpacing: "0.42em" }}
            className="text-sm uppercase tracking-[0.35em] text-[var(--text-secondary)]"
          >
            {siteName}
          </motion.p>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm text-[var(--text-secondary)] md:flex">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ y: -2, color: "var(--accent)" }}
              transition={{ duration: 0.2 }}
              className="transition"
            >
              {link.label}
            </motion.a>
          ))}
          <DarkModeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <DarkModeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[var(--text-secondary)]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--border)]/50 md:hidden"
          >
            <div className="flex flex-col gap-1 py-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-lg px-4 py-3 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)]"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
