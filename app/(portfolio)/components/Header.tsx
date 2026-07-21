"use client";

import { motion } from "framer-motion";

export function Header() {
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
            yourname
          </motion.p>
        </div>

        <nav className="hidden gap-8 text-sm text-[#6E6257] md:flex">
          {["About", "Works", "Contact"].map((label) => (
            <motion.a
              key={label}
              href={`#${label.toLowerCase()}`}
              whileHover={{ y: -2, color: "#81A6C6" }}
              transition={{ duration: 0.2 }}
              className="transition"
            >
              {label}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
