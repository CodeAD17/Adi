"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projectsData";
import { BorderBeam } from "./magicui/border-beam";

interface ProjectDetailModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectDetailModal({
    project,
    isOpen,
    onClose,
}: ProjectDetailModalProps) {
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-4 md:inset-8 lg:inset-12 bg-zinc-950 border-2 border-foreground/10 z-50 overflow-hidden flex flex-col"
                    >
                        {/* Close Button - Brutalist */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-3 bg-accent text-background hover:bg-accent/80 transition-colors duration-200 z-10 font-mono text-sm font-bold"
                            aria-label="Close modal"
                        >
                            ESC
                        </button>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Hero Image */}
                            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover grayscale-[30%]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

                                {/* Title overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 bg-accent text-background text-xs font-mono font-bold">
                                            {project.category}
                                        </span>
                                        <span className="text-xs text-muted font-mono">
                                            {project.year}
                                        </span>
                                    </div>
                                    <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                                        {project.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-6 md:p-10 lg:p-16">
                                <div className="max-w-4xl">
                                    {/* Description */}
                                    <p className="text-lg text-muted leading-relaxed mb-12">
                                        {project.fullDescription}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="mb-12">
                                        <h3 className="text-sm text-accent uppercase tracking-wider mb-4 font-mono">
                                            // TECHNOLOGIES
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-4 py-2 text-sm text-foreground bg-zinc-900 border-2 border-foreground/10 font-mono"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-12">
                                        <h3 className="text-sm text-accent uppercase tracking-wider mb-4 font-mono">
                                            // KEY FEATURES
                                        </h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {project.features.map((feature, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-4 text-muted"
                                                >
                                                    <span className="w-6 h-[2px] bg-accent mt-3 shrink-0" />
                                                    <span className="text-sm leading-relaxed">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Links */}
                                    <div className="flex flex-wrap gap-4">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-background bg-accent hover:bg-accent/90 transition-colors duration-300 font-mono uppercase overflow-hidden"
                                            >
                                                <BorderBeam
                                                    size={80}
                                                    duration={8}
                                                    colorFrom="#ffffff"
                                                    colorTo="#ffffff"
                                                />
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                    />
                                                </svg>
                                                LIVE DEMO
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-foreground border-2 border-foreground/30 hover:border-foreground hover:bg-foreground/5 transition-all duration-300 font-mono uppercase"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                VIEW SOURCE
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
