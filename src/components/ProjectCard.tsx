"use client";

import { useRef } from "react";

interface Project {
    title: string;
    description: string;
    tech: string[];
    year: string;
    link?: string;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={cardRef}
            className="group relative bg-zinc-900/50 rounded-xl p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-zinc-900/70"
            style={{
                animationDelay: `${index * 100}ms`,
            }}
        >
            {/* Subtle border */}
            <div className="absolute inset-0 rounded-xl border border-zinc-800/50 transition-colors duration-500 group-hover:border-zinc-700/50" />

            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <h3 className="text-display text-lg font-bold text-foreground tracking-tight">
                        {project.title}
                    </h3>
                    <span className="text-xs text-muted">{project.year}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed mb-6">
                    {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                        <span
                            key={i}
                            className="text-xs text-zinc-500 px-2 py-1 bg-zinc-800/50 rounded"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Link arrow */}
                {project.link && (
                    <div className="absolute bottom-8 right-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <svg
                            className="w-5 h-5 text-muted"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7 17L17 7M17 7H7M17 7v10"
                            />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
}
