"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "../lib/animations";
import { Card, CardContent } from "./ui/Card";
import type { ProjectData } from "../lib/types";

export type { ProjectData };

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) {
  return (
    <motion.div
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08 }}
      whileHover="hover"
      className="group"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
          },
          hover: {
            y: -6,
            transition: {
              duration: 0.35,
              ease: "easeOut",
            },
          },
        }}
      >
        <Card className="overflow-hidden shadow-[0_18px_40px_rgba(62,52,44,0.06)] transition-shadow duration-300 group-hover:shadow-[0_24px_60px_rgba(62,52,44,0.10)]">
          <CardContent className="grid gap-6 p-0 md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[260px] overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <>
                  <motion.div
                    variants={{
                      hover: { scale: 1.05, x: 10, y: -4 },
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-br from-[#81A6C6] via-[#AACDDC] to-[#F3E3D0]"
                  />
                  <motion.div
                    animate={{
                      rotate: [0, 8, -4, 0],
                      scale: [1, 1.04, 0.98, 1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl"
                  />
                  <motion.div
                    animate={{
                      x: [0, 18, -8, 0],
                      y: [0, -12, 8, 0],
                    }}
                    transition={{
                      duration: 9,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-6 left-6 h-24 w-24 rounded-full border border-white/30 bg-white/10 backdrop-blur-md"
                  />
                </>
              )}
            </div>

            <div className="flex flex-col justify-between p-8">
              <div>
                <motion.p
                  variants={{
                    hover: { x: 4 },
                  }}
                  className="text-sm uppercase tracking-[0.28em] text-[#81A6C6]"
                >
                  {project.tag}
                </motion.p>
                <h3 className="mt-3 font-serif text-3xl text-[#3E342C]">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-xl leading-7 text-[#6E6257]">
                  {project.description}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -2 }}
                    className="rounded-full border border-[#D2C4B4] bg-[#F3E3D0] px-3 py-1 text-sm text-[#6E6257]"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
