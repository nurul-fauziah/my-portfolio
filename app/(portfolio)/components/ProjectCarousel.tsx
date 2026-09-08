"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard, type ProjectData } from "./ProjectCard";

/**
 * Horizontal swipe carousel for projects.
 * - Cards are not full-bleed: fixed width leaves a peek of the next/prev card.
 * - Arrow buttons scroll one card at a time; swipe also works.
 * - Large soft shadow makes the active card look floating.
 */
export function ProjectCarousel({ projects }: { projects: ProjectData[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-slide]");
    const step = card ? card.offsetWidth + 24 : track.clientWidth;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-6"
      >
        {projects.map((project) => (
          <div
            key={project.slug}
            data-slide
            className="w-[85vw] flex-none snap-start sm:w-[70vw] lg:w-[540px]"
          >
            <div className="rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.45)]">
              <ProjectCard project={project} index={0} />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Previous project"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[var(--bg-card)] p-3 text-[var(--text-primary)] shadow-lg transition-colors hover:bg-[var(--accent)] hover:text-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Next project"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[var(--bg-card)] p-3 text-[var(--text-primary)] shadow-lg transition-colors hover:bg-[var(--accent)] hover:text-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}