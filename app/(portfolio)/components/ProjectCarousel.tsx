"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard, type ProjectData } from "./ProjectCard";

/**
 * Center-focused horizontal carousel.
 * Shows ONE project at a time, centered. The active card is bright/full,
 * the peeked neighbors are dimmed. Arrow buttons step one card at a time.
 */
export function ProjectCarousel({ projects }: { projects: ProjectData[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const cards = Array.from(
        track.querySelectorAll<HTMLElement>("[data-slide]")
      );
      const clamped = Math.max(0, Math.min(index, projects.length - 1));
      const card = cards[clamped];
      if (!card) return;
      const target = card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2;
      track.scrollTo({ left: target, behavior: "smooth" });
      setActive(clamped);
    },
    [projects.length]
  );

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-slide]"));
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - viewportCenter);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  return (
    <div className="relative">
      {/* Track: padding centers first card; scroll left = nearest card center */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-6 px-6 sm:px-10 lg:px-16"
      >
        {projects.map((project, index) => (
          <div
            key={project.slug}
            data-slide
            className="w-[85vw] flex-none snap-center sm:w-[70vw] lg:w-[540px]"
          >
            <div
              className="transition-all duration-500"
              style={{
                opacity: index === active ? 1 : 0.35,
                transform:
                  index === active
                    ? "scale(1)"
                    : "scale(0.96)",
              }}
            >
              <div className="rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
                <ProjectCard project={project} index={index} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            aria-label={`Go to project ${index + 1}`}
            onClick={() => scrollToIndex(index)}
            className={
              index === active
                ? "h-2.5 w-6 rounded-full bg-[var(--accent)] transition-all duration-300"
                : "h-2.5 w-2.5 rounded-full bg-[var(--border)] transition-all duration-300 hover:bg-[var(--text-muted)]"
            }
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollToIndex(active - 1)}
        aria-label="Previous project"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[var(--bg-card)] p-3 text-[var(--text-primary)] shadow-lg transition-colors hover:bg-[var(--accent)] hover:text-white disabled:opacity-40"
        disabled={active === 0}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollToIndex(active + 1)}
        aria-label="Next project"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[var(--bg-card)] p-3 text-[var(--text-primary)] shadow-lg transition-colors hover:bg-[var(--accent)] hover:text-white disabled:opacity-40"
        disabled={active === projects.length - 1}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}