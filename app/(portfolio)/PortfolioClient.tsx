"use client";

import { useState } from "react";
import React from "react";
import { BackgroundBlobs } from "./components/BackgroundBlobs";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Stats } from "./components/Stats";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { ScrollProgress } from "./components/ScrollProgress";
import { CursorGlow } from "./components/CursorGlow";
import type { ProjectData, ExperienceData, SiteSettingsData } from "./lib/types";

export type { ProjectData };

type PortfolioClientProps = {
  projects: ProjectData[];
  experiences: ExperienceData[];
  siteSettings: SiteSettingsData;
};

export default function PortfolioClient({
  projects,
  experiences,
  siteSettings,
}: PortfolioClientProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <ScrollProgress />
      <CursorGlow />

      <main className="relative min-h-screen overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#81A6C6] selection:text-white">
        <BackgroundBlobs />

        <div className="relative mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-12">
          <Header
            siteName={siteSettings.siteName}
            navLinks={siteSettings.navLinks}
          />
          <Hero
            subtitle={siteSettings.heroSubtitle}
            title={siteSettings.heroTitle}
            description={siteSettings.heroDescription}
            primaryCta={siteSettings.heroPrimaryCta}
            secondaryCta={siteSettings.heroSecondaryCta}
            profileBadge={siteSettings.profileBadge}
            availabilityBadge={siteSettings.availabilityBadge}
            location={siteSettings.location}
            focusAreas={siteSettings.focusAreas}
          />
          <About
            quote={siteSettings.aboutQuote}
            paragraphs={siteSettings.aboutParagraphs}
          />
          <Stats />
          <Experience items={experiences} />
          <Skills />
          <Projects projects={projects} heading={siteSettings.worksHeading} />
          <Contact
            heading={siteSettings.contactHeading}
            description={siteSettings.contactDescription}
            email={siteSettings.email}
            linkedin={siteSettings.linkedin}
            github={siteSettings.github}
            location={siteSettings.contactLocation}
          />
          <Footer
            copyrightName={siteSettings.copyrightName}
            email={siteSettings.email}
            linkedin={siteSettings.linkedin}
            github={siteSettings.github}
          />
        </div>
      </main>
    </>
  );
}
