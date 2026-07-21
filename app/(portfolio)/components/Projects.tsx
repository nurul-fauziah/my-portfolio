"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "../lib/animations";
import { ProjectCard, type ProjectData } from "./ProjectCard";

export function Projects({ projects, heading }: { projects: ProjectData[]; heading?: string }) {
  return (
    <section id="works" className="border-t border-[#D2C4B4] py-20">
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[#81A6C6]">
            Selected Works
          </p>
        </motion.div>

        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="max-w-3xl font-serif text-3xl tracking-tight text-[#3E342C] md:text-5xl">
            {heading || 'A curated collection of digital work shaped with clarity and restraint.'}
          </h2>
        </motion.div>
      </div>

      <div className="grid gap-6">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))
        ) : (
          <div className="rounded-[30px] border border-dashed border-[#D2C4B4] bg-[#F8F1E8]/50 p-12 text-center">
            <p className="text-lg text-[#8A7C70]">
              Belum ada project. Tambahkan project pertama melalui{" "}
              <a
                href="/admin"
                className="text-[#81A6C6] underline hover:text-[#7096B5]"
              >
                Admin Panel
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
