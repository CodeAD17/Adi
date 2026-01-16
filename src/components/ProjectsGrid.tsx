"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "APEX SYSTEMS",
        description:
            "End-to-end restaurant management platform. Orders, inventory, analytics — all controlled from one interface.",
        tech: ["Next.js", "Firebase", "React Native"],
        year: "2025",
        link: "#",
    },
    {
        title: "FINAI",
        description:
            "AI-powered personal finance tracker with automated expense categorization and intelligent budgeting.",
        tech: ["React Native", "Expo", "AI/ML"],
        year: "2025",
        link: "#",
    },
    {
        title: "NEURAL GRID",
        description:
            "Distributed computing framework for machine learning workloads across edge devices.",
        tech: ["Python", "CUDA", "Kubernetes"],
        year: "2024",
        link: "#",
    },
    {
        title: "VELOCITY",
        description:
            "Real-time performance monitoring dashboard for high-frequency trading systems.",
        tech: ["TypeScript", "WebSocket", "D3.js"],
        year: "2024",
        link: "#",
    },
];

export default function ProjectsGrid() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

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
            {/* Section Header */}
            <div ref={headerRef} className="max-w-6xl mx-auto mb-20">
                <p className="text-subhead text-muted mb-4">SELECTED WORK</p>
                <h2 className="text-display text-3xl md:text-4xl font-bold text-foreground">
                    PROJECTS
                </h2>
            </div>

            {/* Projects Grid */}
            <div
                ref={gridRef}
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
