"use client";

import {
  SmoothScroll,
  HeroScrollSequence,
  PowerPauseOverlay,
  Header,
  FloatingDock,
  AboutSection,
  ProjectsGrid,
  SkillsSection,
  ExperienceSection,
  ContactSection,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Minimal top-left name (visible during hero) */}
      <div className="fixed top-6 left-6 z-40">
        <span className="text-display text-sm font-bold tracking-widest text-foreground/60 hover:text-foreground transition-colors duration-300">
          ADI
        </span>
      </div>

      {/* Floating Header (appears after hero) */}
      <Header />

      {/* Floating Dock (macOS style navigation) */}
      <FloatingDock />

      <main className="relative">
        {/* Hero with frame sequence */}
        <div className="relative">
          <HeroScrollSequence />
          <PowerPauseOverlay />
        </div>

        {/* About section */}
        <AboutSection />

        {/* Projects section */}
        <ProjectsGrid />

        {/* Skills section */}
        <SkillsSection />

        {/* Experience section */}
        <ExperienceSection />

        {/* Contact section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
