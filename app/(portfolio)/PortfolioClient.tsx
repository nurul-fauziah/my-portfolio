"use client";

import React from "react";
import { BackgroundBlobs } from "./components/BackgroundBlobs";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import type { ProjectData } from "./components/ProjectCard";

export type { ProjectData };

export default function PortfolioClient({
  projects,
}: {
  projects: ProjectData[];
}) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F3E3D0] text-[#3E342C] selection:bg-[#81A6C6] selection:text-white">
      <BackgroundBlobs />

      <div className="relative mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-12">
        <Header />
        <Hero />
        <About />
        <Experience />
        <Projects projects={projects} />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
