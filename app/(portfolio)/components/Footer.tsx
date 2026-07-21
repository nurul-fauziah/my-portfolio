"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="border-t border-[#D2C4B4] py-8 text-sm text-[#8A7C70]"
    >
      &copy; 2026 Your Name. All rights reserved.
    </motion.footer>
  );
}
