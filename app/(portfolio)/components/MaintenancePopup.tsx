"use client";

import { motion, AnimatePresence } from "framer-motion";

export function MaintenancePopup({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-4 w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/10">
              <svg
                className="h-8 w-8 text-[var(--accent)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                />
              </svg>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-2xl text-[var(--text-primary)]">
              Under Maintenance
            </h2>

            {/* Message */}
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              This site is currently being updated. We&apos;ll be back online
              soon. Thank you for your patience.
            </p>

            {/* Decorative line */}
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

            {/* Status text */}
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Coming back soon
            </p>

            {/* Close button */}
            <button
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-primary)] px-6 py-2.5 text-sm text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Continue to site
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
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
