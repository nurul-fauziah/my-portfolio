"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { sectionReveal } from "../lib/animations";
import { ProjectCard, type ProjectData } from "./ProjectCard";
import Link from "next/link";

const defaultProjects: ProjectData[] = [
  {
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    tag: 'Featured Case Study',
    description: 'A full-stack e-commerce solution with real-time inventory management, secure payment processing, and an intuitive admin dashboard.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Stripe'],
    featured: true,
  },
  {
    title: 'Task Management App',
    slug: 'task-management-app',
    tag: 'Web Application',
    description: 'Collaborative project management tool with drag-and-drop boards, real-time updates, and team analytics.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'Redis'],
    featured: true,
  },
  {
    title: 'AI Content Generator',
    slug: 'ai-content-generator',
    tag: 'AI / Machine Learning',
    description: 'An AI-powered content creation platform that generates blog posts, social media content, and marketing copy.',
    tech: ['Python', 'FastAPI', 'OpenAI', 'React', 'PostgreSQL'],
    featured: true,
  },
];

export function Projects({
  projects,
  heading,
  limit = 3,
}: {
  projects: ProjectData[];
  heading?: string;
  limit?: number;
}) {
  const displayed = projects.length > 0 ? projects.slice(0, limit) : defaultProjects;
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
        {displayed.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
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
