"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard, type ProjectData } from "./ProjectCard";

/**
 * Circular project viewer.
 * - Shows ONLY the active card (one at a time, no neighbors visible).
 * - Arrows + swipe (framer drag) step one card; wraps around forever,
 *   so there is never an end (loops like a ring).
 */
export function ProjectCarousel({ projects }: { projects: ProjectData[] }) {
  const [active, setActive] = useState(0);

  const total = projects.length;
  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  const current = projects[active];

  return (
    <div className="relative">
      {/* Stage: only the active card is rendered and visible */}
      <div className="relative h-[400px] sm:h-[440px] overflow-hidden py-4">
        <AnimatePresence>
          {current && (
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) next();
                else if (info.offset.x > 60) prev();
              }}
              className="absolute inset-x-0 top-1/2 w-full -translate-y-1/2 mx-auto max-w-xl"
            >
              <div className="rounded-[30px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.45)]">
                <ProjectCard project={current} index={active} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            aria-label={`Go to project ${index + 1}`}
            onClick={() => setActive(index)}
            className={
              index === active
                ? "h-2.5 w-6 rounded-full bg-[var(--accent)] transition-all duration-300"
                : "h-2.5 w-2.5 rounded-full bg-[var(--border)] transition-all duration-300 hover:bg-[var(--text-muted)]"
            }
          />
        ))}
      </div>

      {/* Circular arrows — never disabled, wrap around */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous project"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[var(--bg-card)] p-3 text-[var(--text-primary)] shadow-lg transition-colors hover:bg-[var(--accent)] hover:text-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next project"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[var(--bg-card)] p-3 text-[var(--text-primary)] shadow-lg transition-colors hover:bg-[var(--accent)] hover:text-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}