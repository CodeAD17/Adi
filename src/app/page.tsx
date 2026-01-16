"use client";

import {
  SmoothScroll,
  HeroScrollSequence,
  PowerPauseOverlay,
  ProjectsGrid,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Minimal top-left name */}
      <header className="fixed top-6 left-6 z-50">
        <span className="text-display text-sm font-bold tracking-widest text-foreground/60 hover:text-foreground transition-colors duration-300">
          ADI
        </span>
      </header>

      <main className="relative">
        {/* Hero with frame sequence */}
        <div className="relative">
          <HeroScrollSequence />
          <PowerPauseOverlay />
        </div>

        {/* Projects section */}
        <ProjectsGrid />

        {/* Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
