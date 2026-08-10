"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "Nurul Fauziah";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const [typed, setTyped] = useState(0);

  // Typewriter effect
  useEffect(() => {
    if (typed >= NAME.length) return;
    const timeout = setTimeout(() => setTyped((t) => t + 1), 80);
    return () => clearTimeout(timeout);
  }, [typed]);

  // Progress bar
  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 2800;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShow(false);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        const elapsed = Date.now() - startTime;
        const targetProgress = 100 * (1 - Math.pow(1 - elapsed / totalDuration, 3));
        const jitter = (Math.random() - 0.5) * 3;
        return Math.min(prev + (targetProgress - prev) * 0.12 + jitter, 100);
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-primary)]"
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

          {/* Name - Typewriter */}
          <div className="relative z-10 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-sm uppercase tracking-[0.4em] text-[var(--text-muted)]"
            >
              Welcome
            </motion.p>

            <h1 className="mt-4 font-serif text-4xl text-[var(--text-primary)] md:text-6xl">
              {NAME.slice(0, typed)}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-0.5 inline-block h-[1em] w-[3px] translate-y-1 bg-[var(--accent)]"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: typed >= NAME.length ? 1 : 0 }}
              className="mt-3 text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]"
            >
              Fullstack Developer
            </motion.p>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 mt-12 w-48"
          >
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-[var(--border)]">
              <div
                className="h-full rounded-full bg-[var(--accent)]"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
              {Math.min(Math.round(progress), 100)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
