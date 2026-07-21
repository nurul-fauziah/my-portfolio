"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavLink } from "../lib/types";

type HeaderProps = {
  siteName?: string;
  navLinks?: NavLink[];
};

export function Header({
  siteName = "yourname",
  navLinks = [
    { label: "About", href: "#about" },
    { label: "Works", href: "#works" },
    { label: "Contact", href: "#contact" },
  ],
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 mb-14 border-b border-[#D2C4B4]/70 bg-[#F3E3D0]/70 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between py-4">
        <div>
          <motion.p
            whileHover={{ letterSpacing: "0.42em" }}
            className="text-sm uppercase tracking-[0.35em] text-[#6E6257]"
          >
            {siteName}
          </motion.p>
        </div>

        {/* Desktop nav */}
        <nav className="hidden gap-8 text-sm text-[#6E6257] md:flex">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ y: -2, color: "#81A6C6" }}
              transition={{ duration: 0.2 }}
              className="transition"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-[#6E6257] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#D2C4B4]/50 md:hidden"
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
                  className="rounded-lg px-4 py-3 text-sm text-[#6E6257] transition hover:bg-[#F3E3D0] hover:text-[#81A6C6]"
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
