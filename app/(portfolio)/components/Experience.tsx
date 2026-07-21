"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "../lib/animations";

const experience = [
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
];

export function Experience() {
  return (
    <section className="border-t border-[#D2C4B4] py-20">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[#81A6C6]">
            Experience
          </p>
        </motion.div>

        <div className="space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="rounded-[28px] border border-[#D2C4B4] bg-[#F8F1E8] p-6 shadow-[0_10px_30px_rgba(62,52,44,0.04)]"
            >
              <p className="text-sm text-[#8A7C70]">{exp.period}</p>
              <h3 className="mt-2 font-serif text-2xl text-[#3E342C]">
                {exp.role}
              </h3>
              <p className="mt-1 text-[#6E6257]">{exp.company}</p>
              <p className="mt-4 max-w-2xl text-[#6E6257]">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
