"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { projects, type Project } from "@/data/projectsData";
import ProjectDetailModal from "./ProjectDetailModal";
import { DotPattern } from "./magicui/dot-pattern";
import { Particles } from "./magicui/particles";
import { BorderBeam } from "./magicui/border-beam";
import { cn } from "@/lib/utils";
import { BlurFade } from "./magicui/blur-fade";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsGrid() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Only show first 4 projects on home page
    const displayedProjects = projects.slice(0, 4);

    useEffect(() => {
        const section = sectionRef.current;
        const header = headerRef.current;
        const grid = gridRef.current;

        if (!section || !header || !grid) return;

        // Header animation
        gsap.fromTo(
            header,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 0.5,
                },
            }
        );

        // Cards stagger animation handled by BlurFade mostly, but keeping GSAP for scroll sync if needed
        // Replacing manual GSAP stagger with BlurFade for consistency with other sections

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative min-h-screen bg-zinc-950 py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
        >
            {/* --- LEGENDARY BACKGROUND --- */}
            <div className="absolute inset-0 z-0">
                <DotPattern
                    cr={1}
                    className={cn(
                        "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
                        "opacity-30"
                    )}
                />
                <Particles
                    className="absolute inset-0"
                    quantity={60}
                    staticity={60}
                    ease={40}
                    color="#ffffff"
                />

                {/* Background "WORK" Text - Massive & Hollow */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none overflow-hidden w-full">
                    <span className="text-[12rem] md:text-[25rem] font-black font-mono leading-none tracking-tighter text-white whitespace-nowrap block text-center">
                        WORK_
                    </span>
                </div>
            </div>

            {/* Brutalist accent */}
            <div className="absolute left-0 top-1/2 w-2 h-48 bg-accent z-10 hidden lg:block" />

            <div className="relative z-10 max-w-7xl mx-auto mb-20">
                {/* Section Header */}
                <div ref={headerRef}>
                    <BlurFade delay={0.1}>
                        <p className="text-subhead text-accent mb-4 font-mono tracking-widest">// SELECTED WORK</p>
                    </BlurFade>
                    <BlurFade delay={0.2}>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <h2 className="text-display text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-none tracking-tight">
                                PROJECTS<span className="text-accent">_</span>
                            </h2>
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors duration-300 font-mono uppercase tracking-wider"
                            >
                                <span>VIEW ALL</span>
                                <span className="w-8 h-[2px] bg-accent group-hover:w-12 transition-all duration-300" />
                            </Link>
                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* Projects Grid - Legendary */}
            <div
                ref={gridRef}
                className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {displayedProjects.map((project, index) => (
                    <BlurFade key={project.id} delay={0.3 + index * 0.1} inView>
                        <div
                            className="group cursor-pointer relative"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm hover:border-white/20 transition-all duration-500 h-full flex flex-col">

                                {/* Border Beam on Hover */}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <BorderBeam
                                        size={250}
                                        duration={10}
                                        delay={0}
                                        colorFrom="#8B1E1E"
                                        colorTo="#dc2626"
                                        borderWidth={1.5}
                                    />
                                </div>

                                {/* Project Image */}
                                <div className="relative h-64 overflow-hidden border-b border-white/5">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />

                                    {/* Number */}
                                    <div className="absolute top-4 right-4 text-6xl font-bold text-white/5 font-mono z-10 group-hover:text-white/10 transition-colors">
                                        0{index + 1}
                                    </div>

                                    {/* Status Badge */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur border border-white/10 rounded-full z-10">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] font-mono text-white/70 tracking-wider uppercase">DEPLOYED</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    {/* Top Row */}
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-mono tracking-wider rounded">
                                            {project.category}
                                        </span>
                                        <span className="text-xs text-zinc-500 font-mono flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-zinc-700" />
                                            {project.year}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-display text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-zinc-400 leading-relaxed mb-6 line-clamp-2 flex-grow">
                                        {project.shortDescription}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                                        {project.tech.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 text-[10px] uppercase text-zinc-500 border border-white/5 font-mono rounded bg-white/5"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="px-2 py-1 text-[10px] text-zinc-600 font-mono">
                                                +{project.tech.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Hover indicator */}
                                    <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-accent">
                                        <span className="text-xs font-mono uppercase tracking-widest font-bold">Details</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BlurFade>
                ))}
            </div>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
