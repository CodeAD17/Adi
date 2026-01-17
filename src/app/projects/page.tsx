"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects, categories, type Project } from "@/data/projectsData";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Meteors } from "@/components/magicui/meteors";
import ProjectDetailModal from "@/components/ProjectDetailModal";

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects =
        activeCategory === "All"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <main className="min-h-screen bg-background">
            {/* Meteors background */}
            <Meteors number={10} className="opacity-20" />

            {/* Brutalist accents */}
            <div className="fixed left-0 top-1/4 w-2 h-64 bg-accent z-10" />
            <div className="fixed right-0 bottom-1/4 w-2 h-48 bg-accent z-10" />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
                <nav className="max-w-6xl mx-auto flex items-center justify-between bg-zinc-900/80 backdrop-blur-xl border-2 border-foreground/10 px-6 py-3">
                    <Link
                        href="/"
                        className="text-display text-sm font-bold tracking-widest text-foreground hover:text-accent transition-colors duration-300 font-mono"
                    >
                        ADI<span className="text-accent">_</span>
                    </Link>
                    <Link
                        href="/"
                        className="text-sm text-muted hover:text-foreground transition-colors duration-300 font-mono uppercase flex items-center gap-2"
                    >
                        <span className="w-4 h-[2px] bg-accent" />
                        BACK HOME
                    </Link>
                </nav>
            </header>

            {/* Content */}
            <div className="relative pt-32 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header - Brutalist */}
                    <BlurFade delay={0.1}>
                        <p className="text-subhead text-accent mb-4 font-mono">// ALL WORK</p>
                    </BlurFade>
                    <BlurFade delay={0.2}>
                        <h1 className="text-display text-5xl md:text-6xl lg:text-8xl font-bold text-foreground mb-8 leading-none">
                            PROJECTS<span className="text-accent">_</span>
                        </h1>
                    </BlurFade>

                    {/* Category Filter - Brutalist Pills */}
                    <BlurFade delay={0.3}>
                        <div className="flex flex-wrap gap-2 mb-16">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 text-xs uppercase tracking-wider font-mono border-2 transition-all duration-300 ${activeCategory === category
                                            ? "bg-accent text-background border-accent"
                                            : "text-muted border-foreground/10 hover:border-foreground/40 hover:text-foreground"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </BlurFade>

                    {/* Projects Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredProjects.map((project, index) => (
                            <BlurFade key={project.id} delay={0.4 + index * 0.05}>
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="relative overflow-hidden border-2 border-foreground/10 hover:border-accent transition-all duration-500 h-full">
                                        {/* Image */}
                                        <div className="relative h-40 overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

                                            {/* Year badge */}
                                            <div className="absolute top-3 right-3 px-2 py-1 bg-zinc-950/80 text-xs text-muted font-mono">
                                                {project.year}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 bg-zinc-900/30">
                                            <span className="inline-block px-2 py-1 mb-3 bg-accent/10 border border-accent/30 text-accent text-xs font-mono">
                                                {project.category}
                                            </span>

                                            <h2 className="text-display text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                                                {project.title}
                                            </h2>

                                            <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                                                {project.shortDescription}
                                            </p>

                                            {/* Tech */}
                                            <div className="flex flex-wrap gap-1">
                                                {project.tech.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-0.5 text-xs text-muted/70 font-mono"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Hover line */}
                                            <div className="mt-4 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                        </div>
                                    </div>
                                </motion.div>
                            </BlurFade>
                        ))}
                    </motion.div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-muted font-mono">
                                // NO PROJECTS FOUND
                            </p>
                        </div>
                    )}

                    {/* Stats */}
                    <BlurFade delay={0.8}>
                        <div className="mt-20 flex items-center justify-center gap-8 text-sm text-muted font-mono">
                            <span>TOTAL: {projects.length}</span>
                            <span className="w-[2px] h-4 bg-foreground/20" />
                            <span>SHOWING: {filteredProjects.length}</span>
                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </main>
    );
}
