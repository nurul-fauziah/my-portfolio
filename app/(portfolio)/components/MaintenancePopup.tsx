"use client";

import { AnimatePresence, motion } from "framer-motion";

interface MaintenancePopupProps {
  show: boolean;
  onClose: () => void;
}

export function MaintenancePopup({
  show,
  onClose,
}: MaintenancePopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="maintenance-title"
            aria-describedby="maintenance-description"
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close maintenance notice"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors duration-200 hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)]"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>

            {/* Icon */}
            <div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/10"
              aria-hidden="true"
            >
              <svg
                className="h-8 w-8 text-[var(--accent)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.7 6.3a4.5 4.5 0 0 0-5.9 5.9L4.2 16.8a2.1 2.1 0 0 0 3 3l4.6-4.6a4.5 4.5 0 0 0 5.9-5.9l-2.4 2.4-2.4-2.4 2.4-2.4Z"
                />
              </svg>
            </div>

            {/* Heading */}
            <h2
              id="maintenance-title"
              className="font-serif text-2xl text-[var(--text-primary)]"
            >
              A Little Update
            </h2>

            {/* Message */}
            <p
              id="maintenance-description"
              className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]"
            >
              This portfolio is currently getting a few improvements
              behind the scenes. Some features may be temporarily
              unavailable.
            </p>

            {/* Decorative divider */}
            <div
              className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
              aria-hidden="true"
            />

            {/* Status */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                aria-hidden="true"
              />
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Still under construction
              </p>
            </div>

            {/* Continue */}
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-primary)] px-6 py-2.5 text-sm text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)]"
            >
              Continue exploring
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
              </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}