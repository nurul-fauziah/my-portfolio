"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiFigma,
  SiLaravel,
  SiPhp,
} from "react-icons/si";
import { sectionReveal } from "../lib/animations";

type SkillData = {
  name: string;
  category: string;
};

type SkillsProps = {
  skills?: SkillData[];
};

const iconMap: Record<string, React.ReactNode> = {
  React: <SiReact className="h-8 w-8" />,
  "Next.js": <SiNextdotjs className="h-8 w-8" />,
  TypeScript: <SiTypescript className="h-8 w-8" />,
  "Tailwind CSS": <SiTailwindcss className="h-8 w-8" />,
  "Node.js": <SiNodedotjs className="h-8 w-8" />,
  PostgreSQL: <SiPostgresql className="h-8 w-8" />,
  MongoDB: <SiMongodb className="h-8 w-8" />,
  Docker: <SiDocker className="h-8 w-8" />,
  Git: <SiGit className="h-8 w-8" />,
  Figma: <SiFigma className="h-8 w-8" />,
  Laravel: <SiLaravel className="h-8 w-8" />,
  PHP: <SiPhp className="h-8 w-8" />,
};

const defaultSkills: SkillData[] = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "MongoDB", category: "Backend" },
  { name: "Laravel", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "Docker", category: "Tools" },
  { name: "Git", category: "Tools" },
  { name: "Figma", category: "Tools" },
];

export function Skills({ skills = defaultSkills }: SkillsProps) {
  const categories = ["Frontend", "Backend", "Tools"];

  const grouped = categories.map((cat) => ({
    category: cat,
    items: skills.filter((s) => s.category === cat),
  }));

  return (
    <motion.section
      id="skills"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="border-t border-[#D2C4B4] py-20"
    >
      <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent)]">
            Tech Stack
          </p>
        </div>
        <div>
          <h2 className="max-w-3xl font-serif text-3xl tracking-tight text-[#3E342C] md:text-5xl">
            Tools & technologies I work with.
          </h2>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {grouped.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.15 }}
          >
            <h3 className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-[#8A7C70]">
              {group.category}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {group.items.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.15 + i * 0.05 }}
                  whileHover={{ y: -6, scale: 1.05 }}
                  className="group flex flex-col items-center gap-3 rounded-[20px] border border-[var(--border)] bg-[var(--bg-card)] p-5 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_12px_30px_rgba(129,166,198,0.15)]"
                >
                  <div className="text-[#8A7C70] transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {iconMap[skill.name] || (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D2C4B4] text-xs font-bold text-[#3E342C]">
                        {skill.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-center text-xs text-[#6E6257]">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
