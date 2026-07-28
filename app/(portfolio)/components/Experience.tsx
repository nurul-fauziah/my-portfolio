"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "../lib/animations";
import type { ExperienceData } from "../lib/types";

type ExperienceProps = {
  items?: ExperienceData[];
};

export function Experience({
  items = [
    {
      period: "2025 — Present",
      role: "Frontend / Full-Stack Developer",
      company: "Your Company",
      description:
        "Building scalable web experiences with a focus on smooth interaction, maintainable architecture, and premium visual quality.",
    },
    {
      period: "2024 — 2025",
      role: "Frontend Developer",
      company: "Creative Studio",
      description:
        "Designed and developed visually refined interfaces with attention to responsiveness, performance, and smooth user interaction.",
    },
  ],
}: ExperienceProps) {
  return (
    <section className="border-t border-[var(--border)] py-20">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent)]">
            Experience
          </p>
        </motion.div>

        <div className="space-y-6">
          {items.map((exp, index) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="rounded-[28px] border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[0_10px_30px_rgba(62,52,44,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
            >
              <p className="text-sm text-[var(--text-muted)]">{exp.period}</p>
              <h3 className="mt-2 font-serif text-2xl text-[var(--text-primary)]">
                {exp.role}
              </h3>
              <p className="mt-1 text-[var(--text-secondary)]">{exp.company}</p>
              <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
