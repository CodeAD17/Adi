"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects, categories, type Project } from "@/data/projectsData";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Particles } from "@/components/magicui/particles";
import { BorderBeam } from "@/components/magicui/border-beam";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects =
        activeCategory === "All"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <main className="min-h-screen bg-zinc-950 relative overflow-hidden">
            {/* --- LEGENDARY BACKGROUND --- */}
            <div className="fixed inset-0 z-0">
                <DotPattern
                    cr={1}
                    className={cn(
                        "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
                        "opacity-30"
                    )}
                />
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    staticity={50}
                    ease={50}
                    color="#ffffff"
                />
                {/* Background "PROJECTS" Text - Massive & Hollow */}
                <div className="absolute top-40 right-0 opacity-[0.03] select-none pointer-events-none overflow-hidden">
                    <span className="text-[10rem] md:text-[20rem] font-black font-mono leading-none tracking-tighter text-white whitespace-nowrap">
                        BUILD_
                    </span>
                </div>
            </div>

            {/* Brutalist accents */}
            <div className="fixed left-0 top-1/4 w-1 h-32 bg-accent/50 z-10" />
            <div className="fixed right-0 bottom-1/4 w-1 h-32 bg-accent/50 z-10" />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-6 py-4">
                <nav className="max-w-7xl mx-auto flex items-center justify-between bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl">
                    <Link
                        href="/"
                        className="text-display text-sm font-bold tracking-widest text-white hover:text-accent transition-colors duration-300 font-mono"
                    >
                        ADI<span className="text-accent">_</span>
                    </Link>
                    <Link
                        href="/"
                        className="text-xs text-zinc-400 hover:text-white transition-colors duration-300 font-mono uppercase flex items-center gap-2 group"
                    >
                        <span className="w-4 h-[2px] bg-accent group-hover:w-6 transition-all" />
                        BACK HOME
                    </Link>
                </nav>
            </header>

            {/* Content */}
            <div className="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header - Legendary */}
                    <div className="mb-16">
                        <BlurFade delay={0.1}>
                            <p className="text-subhead text-accent mb-4 font-mono tracking-widest">// ARCHIVE</p>
                        </BlurFade>
                        <BlurFade delay={0.2}>
                            <h1 className="text-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-none tracking-tight">
                                ALL PROJECTS<span className="text-accent">_</span>
                            </h1>
                        </BlurFade>
                    </div>

                    {/* Category Filter - Cyberpunk Tabs */}
                    <BlurFade delay={0.3}>
                        <div className="flex flex-wrap gap-2 mb-16 p-1 bg-zinc-900/50 backdrop-blur border border-white/5 rounded-lg w-fit">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={cn(
                                        "px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all duration-300 rounded",
                                        activeCategory === category
                                            ? "bg-accent text-background font-bold shadow-[0_0_15px_-3px_rgba(220,38,38,0.5)]"
                                            : "text-zinc-500 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </BlurFade>

                    {/* Projects Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProjects.map((project, index) => (
                            <BlurFade key={project.id} delay={0.4 + index * 0.05}>
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="group cursor-pointer h-full"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm hover:border-white/20 transition-all duration-500 h-full flex flex-col">

                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden border-b border-white/5">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />

                                            {/* Year badge */}
                                            <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 text-[10px] text-zinc-400 font-mono border border-white/10 rounded">
                                                {project.year}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow relative">
                                            {/* Glow effect on hover */}
                                            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                            <span className="inline-block px-2 py-1 mb-3 w-fit bg-accent/10 border border-accent/20 text-accent text-[10px] font-mono tracking-wider rounded">
                                                {project.category}
                                            </span>

                                            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                                                {project.title}
                                            </h2>

                                            <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-3 flex-grow">
                                                {project.shortDescription}
                                            </p>

                                            {/* Tech */}
                                            <div className="flex flex-wrap gap-1 pt-4 border-t border-white/5">
                                                {project.tech.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-1 text-[10px] uppercase text-zinc-500 bg-white/5 rounded"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech.length > 3 && (
                                                    <span className="px-2 py-1 text-[10px] text-zinc-600">
                                                        +{project.tech.length - 3}
                                                    </span>
                                                )}
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
                        <div className="text-center py-24 border border-white/10 rounded-xl bg-zinc-900/20 dashed">
                            <p className="text-zinc-500 font-mono text-xl mb-4">
                                // NO PROJECTS FOUND
                            </p>
                            <button
                                onClick={() => setActiveCategory("All")}
                                className="text-accent text-sm hover:underline"
                            >
                                RESET FILTERS
                            </button>
                        </div>
                    )}

                    {/* Stats */}
                    <BlurFade delay={0.8}>
                        <div className="mt-20 flex items-center justify-center gap-8 text-xs text-zinc-600 font-mono tracking-widest uppercase">
                            <span>TOTAL DATABASE: {projects.length}</span>
                            <span className="w-[1px] h-4 bg-zinc-800" />
                            <span>FILTERED: {filteredProjects.length}</span>
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
