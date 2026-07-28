"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { container, item } from "../lib/animations";
import { Card, CardContent } from "./ui/Card";
import { SimpleButton } from "./ui/SimpleButton";

type HeroProps = {
  subtitle?: string;
  title?: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
  profileBadge?: string;
  availabilityBadge?: string;
  location?: string;
  focusAreas?: string[];
};

export function Hero({
  subtitle = "Personal Portfolio",
  title = "Elegant digital experiences with timeless character.",
  description = "I build websites and digital products that feel polished, calm, and intentional—blending modern development with a refined visual sensibility.",
  primaryCta = "View Projects",
  secondaryCta = "Download Resume",
  profileBadge = "Verified Profile",
  availabilityBadge = "Available Worldwide",
  location = "Indonesia",
  focusAreas = ["Web Development", "UI/UX Design", "Portfolio Sites", "Landing Pages"],
}: HeroProps) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.7]);

  return (
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
            className="text-xs uppercase tracking-[0.4em] text-[var(--accent)]"
          >
            {subtitle}
          </motion.p>

          <motion.h1
            variants={item}
            className="max-w-5xl font-serif text-5xl leading-[1] tracking-tight text-[var(--text-primary)] md:text-7xl lg:text-8xl"
          >
            {title}
          </motion.h1>
        </div>

        <motion.p
          variants={item}
          className="max-w-2xl text-base leading-8 text-[var(--text-secondary)] md:text-lg"
        >
          {description}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
          <SimpleButton href="#projects">
            {primaryCta} <ArrowUpRight className="ml-2 h-4 w-4" />
          </SimpleButton>
          <SimpleButton variant="outline" href="#contact">
            {secondaryCta}
          </SimpleButton>
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
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Card className="shadow-[0_20px_60px_rgba(62,52,44,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <CardContent className="space-y-5 p-6">
              <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
                <span>{profileBadge}</span>
                <span>{availabilityBadge}</span>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">
                  Location
                </p>
                <div className="mt-2 flex items-center gap-2 text-[var(--text-primary)]">
                  <MapPin className="h-4 w-4 text-[var(--accent)]" />
                  <span>{location}</span>
                </div>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">
                  Focus
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {focusAreas.map((focusItem) => (
                    <motion.span
                      key={focusItem}
                      whileHover={{ y: -2 }}
                      className="rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1 text-sm text-[var(--text-secondary)]"
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
  );
}
