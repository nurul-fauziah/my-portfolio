"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import type { ProjectData } from "../lib/types";

export function ProjectDetail({ project }: { project: ProjectData }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="relative mx-auto max-w-5xl px-6 py-8 md:px-10 lg:px-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="mb-14 border-b border-[var(--border)]/70 pb-4"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/projects"
              className="flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--accent)]"
            >
              <ArrowLeft className="h-4 w-4" />
              All Projects
            </Link>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-secondary)]">
              yourname
            </p>
          </div>
        </motion.header>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent)]">
            {project.tag}
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight text-[var(--text-primary)] md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1 text-sm text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.projectUrl && (
              <motion.a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--bg-secondary)]"
              >
                <FaGithub className="h-4 w-4" />
                Source Code
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Main Image */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 overflow-hidden rounded-[24px] border border-[var(--border)]"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full object-cover"
            />
          </motion.div>
        )}

        {/* Content */}
        {project.content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="prose prose-lg prose-neutral dark:prose-invert mb-16 max-w-none"
          >
            {/* Rich text content renders here - Payload handles this */}
            <div dangerouslySetInnerHTML={{ __html: String(project.content) }} />
          </motion.div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="mb-8 font-serif text-2xl text-[var(--text-primary)]">
              Gallery
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {project.gallery.map((item, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-[20px] border border-[var(--border)]"
                >
                  <img
                    src={item.image}
                    alt={item.caption || `Screenshot ${i + 1}`}
                    className="w-full object-cover"
                  />
                  {item.caption && (
                    <p className="border-t border-[var(--border)] bg-[var(--bg-card)] p-4 text-sm text-[var(--text-muted)]">
                      {item.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-[var(--border)] py-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--accent)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Projects
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
