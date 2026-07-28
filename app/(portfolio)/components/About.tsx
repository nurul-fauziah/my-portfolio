"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "../lib/animations";

type AboutProps = {
  quote?: string;
  paragraphs?: string[];
};

export function About({
  quote = "Thoughtful design, measured details, and digital experiences that age gracefully.",
  paragraphs = [
    "I approach every project with equal attention to function and feeling. The goal is not only to make something work, but to make it feel effortless, refined, and quietly memorable.",
    "My style leans toward clean layouts, restrained motion, balanced typography, and a visual language that feels timeless rather than trendy.",
  ],
}: AboutProps) {
  return (
    <motion.section
      id="about"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
      className="grid gap-8 border-t border-[var(--border)] py-20 lg:grid-cols-[0.8fr_1.2fr]"
    >
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent)]">
          About
        </p>
      </div>

      <div className="space-y-6">
        <motion.blockquote
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="max-w-3xl font-serif text-2xl leading-tight text-[var(--text-primary)] md:text-3xl"
        >
          &ldquo;{quote}&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-3xl space-y-4 text-[var(--text-secondary)]"
        >
          {paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
