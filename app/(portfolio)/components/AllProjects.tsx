"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "../lib/animations";
import { ProjectCard, type ProjectData } from "./ProjectCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function AllProjects({ projects }: { projects: ProjectData[] }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="relative mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="mb-14 border-b border-[var(--border)]/70 pb-4"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--accent)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-secondary)]">
              yourname
            </p>
          </div>
        </motion.header>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent)]">
            All Projects
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl tracking-tight text-[var(--text-primary)] md:text-6xl">
            A complete collection of my digital work.
          </h1>
        </motion.div>

        {/* Project Grid */}
        <div className="grid gap-6">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))
          ) : (
            <div className="rounded-[30px] border border-dashed border-[var(--border)] bg-[var(--bg-secondary)]/50 p-12 text-center">
              <p className="text-lg text-[var(--text-muted)]">
                Belum ada project.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
