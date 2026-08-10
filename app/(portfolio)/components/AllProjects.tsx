"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "../lib/animations";
import { ProjectCard, type ProjectData } from "./ProjectCard";
import { ArrowLeft } from "lucide-react";
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
  {
    title: 'Portfolio Website',
    slug: 'portfolio-website',
    tag: 'Personal Website',
    description: 'A modern, responsive portfolio website with dark mode support and smooth animations.',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'PayloadCMS'],
    featured: true,
  },
  {
    title: 'Real-time Chat App',
    slug: 'realtime-chat-app',
    tag: 'Web Application',
    description: 'Instant messaging application with end-to-end encryption, file sharing, and group chat functionality.',
    tech: ['React', 'Socket.IO', 'Express', 'MongoDB', 'Redis'],
    featured: true,
  },
];

export function AllProjects({ projects }: { projects: ProjectData[] }) {
  const displayProjects = projects.length > 0 ? projects : defaultProjects;
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
          {displayProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
