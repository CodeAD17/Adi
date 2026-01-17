"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { projects, type Project } from "@/data/projectsData";
import ProjectDetailModal from "./ProjectDetailModal";

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

        // Cards stagger animation
        const cards = grid.querySelectorAll(":scope > div");
        gsap.fromTo(
            cards,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: grid,
                    start: "top 85%",
                    end: "top 40%",
                    scrub: 0.5,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen bg-background py-32 px-6 md:px-12 lg:px-24"
        >
            {/* Brutalist accent */}
            <div className="absolute left-0 top-1/2 w-2 h-48 bg-accent" />

            {/* Section Header */}
            <div ref={headerRef} className="max-w-6xl mx-auto mb-20">
                <p className="text-subhead text-accent mb-4 font-mono">// SELECTED WORK</p>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <h2 className="text-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-none">
                        PROJECTS<span className="text-accent">_</span>
                    </h2>
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors duration-300 font-mono uppercase"
                    >
                        <span>VIEW ALL</span>
                        <span className="w-8 h-[2px] bg-accent group-hover:w-12 transition-all duration-300" />
                    </Link>
                </div>
            </div>

            {/* Projects Grid - Brutalist */}
            <div
                ref={gridRef}
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {displayedProjects.map((project, index) => (
                    <div
                        key={project.id}
                        className="group cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                    >
                        <div className="relative overflow-hidden border-2 border-foreground/10 hover:border-accent transition-all duration-500">
                            {/* Project Image */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

                                {/* Number */}
                                <div className="absolute top-4 right-4 text-4xl font-bold text-foreground/10 font-mono">
                                    0{index + 1}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 bg-zinc-900/50">
                                {/* Top Row */}
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 bg-accent/10 border border-accent/30 text-accent text-xs font-mono">
                                        {project.category}
                                    </span>
                                    <span className="text-xs text-muted font-mono">
                                        {project.year}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                                    {project.shortDescription}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-xs text-muted border border-foreground/10 font-mono"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.tech.length > 3 && (
                                        <span className="px-2 py-1 text-xs text-muted font-mono">
                                            +{project.tech.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Hover indicator */}
                                <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="w-8 h-[2px] bg-accent" />
                                    <span className="text-xs text-accent font-mono uppercase">Details</span>
                                </div>
                            </div>
                        </div>
                    </div>
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
