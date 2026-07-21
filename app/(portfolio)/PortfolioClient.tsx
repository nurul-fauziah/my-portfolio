"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export type ProjectData = {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  image?: string;
  projectUrl?: string;
  githubUrl?: string;
};

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

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type SimpleButtonProps = {
  variant?: "default" | "outline";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

function SimpleButton({
  variant = "default",
  className = "",
  children,
  onClick,
}: SimpleButtonProps) {
  const baseClass =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-[0.08em] transition duration-300";
  const variantClass =
    variant === "outline"
      ? "border border-[#D2C4B4] bg-transparent text-[#3E342C] hover:bg-[#AACDDC]/20"
      : "bg-[#81A6C6] text-white hover:bg-[#7096B5]";

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClass} ${variantClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[30px] border border-[#D2C4B4] bg-[#F8F1E8]/90 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

function BackgroundBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 30, -10, 0],
          y: [0, 40, 10, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#81A6C6]/18 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -20, 25, 0],
          y: [0, -30, 15, 0],
          scale: [1, 1.04, 0.94, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-80 h-80 w-80 rounded-full bg-[#AACDDC]/22 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 10, -20, 0],
          y: [0, 30, -10, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-[#D2C4B4]/20 blur-3xl"
      />
    </div>
  );
}

function AnimatedProjectCard({
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

export default function PortfolioClient({
  projects,
}: {
  projects: ProjectData[];
}) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.7]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F3E3D0] text-[#3E342C] selection:bg-[#81A6C6] selection:text-white">
      <BackgroundBlobs />

      <div className="relative mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-0 z-50 mb-14 border-b border-[#D2C4B4]/70 bg-[#F3E3D0]/70 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between py-4">
            <div>
              <motion.p
                whileHover={{ letterSpacing: "0.42em" }}
                className="text-sm uppercase tracking-[0.35em] text-[#6E6257]"
              >
                yourname
              </motion.p>
            </div>

            <nav className="hidden gap-8 text-sm text-[#6E6257] md:flex">
              {["About", "Works", "Contact"].map((label) => (
                <motion.a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  whileHover={{ y: -2, color: "#81A6C6" }}
                  transition={{ duration: 0.2 }}
                  className="transition"
                >
                  {label}
                </motion.a>
              ))}
            </nav>
          </div>
        </motion.header>

        <motion.section
          style={{ y: heroY, opacity: heroOpacity }}
          className="grid gap-10 pb-24 pt-6 lg:grid-cols-[1.35fr_0.85fr] lg:items-end"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.p
                variants={item}
                className="text-xs uppercase tracking-[0.4em] text-[#81A6C6]"
              >
                Personal Portfolio
              </motion.p>

              <motion.h1
                variants={item}
                className="max-w-5xl font-serif text-5xl leading-[1] tracking-tight text-[#3E342C] md:text-7xl lg:text-8xl"
              >
                Elegant digital experiences with timeless character.
              </motion.h1>
            </div>

            <motion.p
              variants={item}
              className="max-w-2xl text-base leading-8 text-[#6E6257] md:text-lg"
            >
              I build websites and digital products that feel polished, calm,
              and intentional—blending modern development with a refined visual
              sensibility.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
              <SimpleButton>
                View Projects <ArrowUpRight className="ml-2 h-4 w-4" />
              </SimpleButton>
              <SimpleButton variant="outline">Download Resume</SimpleButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Card className="shadow-[0_20px_60px_rgba(62,52,44,0.08)]">
                <CardContent className="space-y-5 p-6">
                  <div className="flex items-center justify-between text-sm text-[#8A7C70]">
                    <span>Verified Profile</span>
                    <span>Available Worldwide</span>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-[#81A6C6]">
                      Location
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-[#3E342C]">
                      <MapPin className="h-4 w-4 text-[#81A6C6]" />
                      <span>Indonesia</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-[#81A6C6]">
                      Focus
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "Web Development",
                        "UI/UX Design",
                        "Portfolio Sites",
                        "Landing Pages",
                      ].map((focusItem) => (
                        <motion.span
                          key={focusItem}
                          whileHover={{ y: -2 }}
                          className="rounded-full border border-[#D2C4B4] bg-[#F3E3D0] px-3 py-1 text-sm text-[#6E6257]"
                        >
                          {focusItem}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          id="about"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          className="grid gap-8 border-t border-[#D2C4B4] py-20 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#81A6C6]">
              About
            </p>
          </div>

          <div className="space-y-6">
            <motion.blockquote
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
              className="max-w-3xl font-serif text-2xl leading-tight text-[#3E342C] md:text-3xl"
            >
              &ldquo;Thoughtful design, measured details, and digital experiences
              that age gracefully.&rdquo;
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-3xl space-y-4 text-[#6E6257]"
            >
              <p>
                I approach every project with equal attention to function and
                feeling. The goal is not only to make something work, but to
                make it feel effortless, refined, and quietly memorable.
              </p>
              <p>
                My style leans toward clean layouts, restrained motion, balanced
                typography, and a visual language that feels timeless rather
                than trendy.
              </p>
            </motion.div>
          </div>
        </motion.section>

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
                A curated collection of digital work shaped with clarity and
                restraint.
              </h2>
            </motion.div>
          </div>

          <div className="grid gap-6">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <AnimatedProjectCard
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

        <section id="contact" className="border-t border-[#D2C4B4] py-20">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-sm uppercase tracking-[0.35em] text-[#81A6C6]">
                Contact
              </p>
            </motion.div>

            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-serif text-3xl tracking-tight text-[#3E342C] md:text-5xl">
                  Let&apos;s build something with substance and style.
                </h2>
                <p className="mt-4 max-w-2xl text-[#6E6257]">
                  Whether it&apos;s a personal portfolio, a product site, or a
                  polished digital presence for your brand, I&apos;m open to
                  creating work that feels thoughtful and lasting.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    icon: <Mail className="mb-3 h-5 w-5 text-[#81A6C6]" />,
                    label: "Email",
                    value: "your@email.com",
                    href: "mailto:your@email.com",
                  },
                  {
                    icon: (
                      <FaLinkedin className="mb-3 h-5 w-5 text-[#81A6C6]" />
                    ),
                    label: "LinkedIn",
                    value: "linkedin.com/in/yourname",
                    href: "https://linkedin.com/in/yourname",
                  },
                  {
                    icon: (
                      <FaGithub className="mb-3 h-5 w-5 text-[#81A6C6]" />
                    ),
                    label: "GitHub",
                    value: "github.com/yourname",
                    href: "https://github.com/yourname",
                  },
                  {
                    icon: <MapPin className="mb-3 h-5 w-5 text-[#81A6C6]" />,
                    label: "Base",
                    value: "Indonesia · Remote Friendly",
                    href: "",
                  },
                ].map((contact, index) =>
                  contact.href ? (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      target={
                        contact.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        contact.href.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                      className="rounded-[24px] border border-[#D2C4B4] bg-[#F8F1E8] p-5 transition hover:bg-[#EFE4D7]"
                    >
                      {contact.icon}
                      <p className="text-sm text-[#8A7C70]">{contact.label}</p>
                      <p className="mt-1 text-lg text-[#3E342C]">
                        {contact.value}
                      </p>
                    </motion.a>
                  ) : (
                    <motion.div
                      key={contact.label}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                      className="rounded-[24px] border border-[#D2C4B4] bg-[#F8F1E8] p-5"
                    >
                      {contact.icon}
                      <p className="text-sm text-[#8A7C70]">{contact.label}</p>
                      <p className="mt-1 text-lg text-[#3E342C]">
                        {contact.value}
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-t border-[#D2C4B4] py-8 text-sm text-[#8A7C70]"
        >
          &copy; 2026 Your Name. All rights reserved.
        </motion.footer>
      </div>
    </main>
  );
}
