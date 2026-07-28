"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 800; // 0.8s — fast splash

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShow(false);
            setTimeout(onComplete, 300);
          }, 100);
          return 100;
        }

        const elapsed = Date.now() - startTime;
        const targetProgress = 100 * (1 - Math.pow(1 - elapsed / totalDuration, 3));
        const jitter = (Math.random() - 0.5) * 6;
        return Math.min(prev + (targetProgress - prev) * 0.15 + jitter, 100);
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F3E3D0]"
        >
          {/* Background blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ x: [0, 30, -10, 0], y: [0, 40, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[var(--accent)]/20 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -20, 25, 0], y: [0, -30, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-80 h-80 w-80 rounded-full bg-[var(--accent-light)]/25 blur-3xl"
            />
          </div>

          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-sm uppercase text-[var(--accent)]"
            >
              Welcome
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-4 font-serif text-4xl text-[#3E342C] md:text-6xl"
            >
              Nurul Fauziah
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-2 flex items-center justify-center gap-1"
            >
              {["Fullstack", "Developer"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.2 }}
                  className="text-sm uppercase tracking-[0.3em] text-[#6E6257]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 mt-12 w-48"
          >
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#D2C4B4]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-3 text-center text-xs text-[#8A7C70]"
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
