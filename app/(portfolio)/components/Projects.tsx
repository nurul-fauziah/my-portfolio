"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { sectionReveal } from "../lib/animations";
import { ProjectCard, type ProjectData } from "./ProjectCard";
import Link from "next/link";

export function Projects({
  projects,
  heading,
  limit = 3,
}: {
  projects: ProjectData[];
  heading?: string;
  limit?: number;
}) {
  const displayed = projects.slice(0, limit);
  const hasMore = projects.length > limit;

  return (
    <section id="projects" className="border-t border-[var(--border)] py-20">
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent)]">
            Selected Projects
          </p>
        </motion.div>

        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="max-w-3xl font-serif text-3xl tracking-tight text-[var(--text-primary)] md:text-5xl">
            {heading || "A curated collection of digital work shaped with clarity and restraint."}
          </h2>
        </motion.div>
      </div>

      <div className="grid gap-6">
        {displayed.length > 0 ? (
          displayed.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))
        ) : (
          <div className="rounded-[30px] border border-dashed border-[var(--border)] bg-[var(--bg-secondary)]/50 p-12 text-center">
            <p className="text-lg text-[var(--text-muted)]">
              Belum ada project. Tambahkan project pertama melalui{" "}
              <a
                href="/admin"
                className="text-[var(--accent)] underline hover:text-[#7096B5]"
              >
                Admin Panel
              </a>
              .
            </p>
          </div>
        )}
      </div>

      {/* View All button */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Link href="/projects">
            <motion.span
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-8 py-3.5 text-sm font-medium tracking-[0.08em] text-[var(--text-primary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              View All Projects
              <ArrowUpRight className="h-4 w-4" />
            </motion.span>
          </Link>
          <p className="mt-3 text-xs text-[var(--text-muted)]">
            Showing {displayed.length} of {projects.length} projects
          </p>
        </motion.div>
      )}
    </section>
  );
}
