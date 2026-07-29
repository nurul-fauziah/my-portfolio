"use client";

import { motion } from "framer-motion";

export function BackgroundBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 30, -10, 0],
          y: [0, 40, 10, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[var(--accent)]/18 blur-3xl dark:bg-[var(--accent)]/8"
      />
      <motion.div
        animate={{
          x: [0, -20, 25, 0],
          y: [0, -30, 15, 0],
          scale: [1, 1.04, 0.94, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-80 h-80 w-80 rounded-full bg-[var(--accent-light)]/22 blur-3xl dark:bg-[var(--accent-light)]/8"
      />
      <motion.div
        animate={{
          x: [0, 10, -20, 0],
          y: [0, 30, -10, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-[var(--border)]/20 blur-3xl dark:bg-[var(--border)]/8"
      />
    </div>
  );
}
