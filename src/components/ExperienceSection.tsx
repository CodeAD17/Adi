"use client";

import { useRef } from "react";
import { BlurFade } from "./magicui/blur-fade";
import { AnimatedBeam } from "./magicui/animated-beam";
import { DotPattern } from "./magicui/dot-pattern";
import { Particles } from "./magicui/particles";
import { BorderBeam } from "./magicui/border-beam";
import { cn } from "@/lib/utils";

const experiences = [
    {
        company: "Startup Co.",
        role: "Full Stack Developer",
        period: "2024 - Present",
        status: "ACTIVE",
        description:
            "Leading development of core product features and architecting scalable solutions.",
        highlights: [
            "Reduced page load time by 60%",
            "Built real-time collaboration features",
            "Mentored 3 junior developers",
        ],
        tags: ["Next.js", "AWS", "Socket.io", "Redis"]
    },
    {
        company: "Tech Agency",
        role: "Software Engineer",
        period: "2022 - 2024",
        status: "COMPLETED",
        description:
            "Delivered 10+ client projects spanning web, mobile, and cloud infrastructure.",
        highlights: [
            "Led microservices migration",
            "Implemented CI/CD pipelines",
            "Developed custom CMS platform",
        ],
        tags: ["React", "Express", "Docker", "PostgreSQL"]
    },
    {
        company: "Freelance",
        role: "Independent Developer",
        period: "2021 - 2022",
        status: "COMPLETED",
        description:
            "Built products for early-stage startups and established businesses.",
        highlights: [
            "Shipped 5 MVPs to production",
            "Specialized in React Native",
            "100% client satisfaction",
        ],
        tags: ["React Native", "Firebase", "Stripe"]
    },
    // Adding a dummy past role to fill the grid if needed, or keeping it strictly real.
    // Keeping real data is better for portfolio integrity.
];

export default function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

    return (
        <section id="experience" className="relative bg-zinc-950 py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
            {/* --- LEGENDARY BACKGROUND --- */}
            <div className="absolute inset-0 z-0">
                <DotPattern
                    cr={1}
                    className={cn(
                        "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                        "opacity-40"
                    )}
                />
                <Particles
                    className="absolute inset-0"
                    quantity={80}
                    staticity={60}
                    ease={40}
                    color="#ffffff"
                />
                {/* Background "WORK" Text - Massive & Hollow */}
                <div className="absolute bottom-20 left-0 opacity-[0.03] select-none pointer-events-none overflow-hidden">
                    <span className="text-[20rem] md:text-[30rem] font-black font-mono leading-none tracking-tighter text-white whitespace-nowrap">
                        WORK_
                    </span>
                </div>
            </div>

            <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <BlurFade delay={0.1}>
                    <div className="flex flex-col mb-20">
                        <p className="text-accent font-mono text-sm tracking-widest mb-4">
                            {"// CAREER TIMELINE"}
                        </p>
                        <h2 className="text-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight">
                            EXPERIENCE<span className="text-accent">_</span>
                        </h2>
                    </div>
                </BlurFade>

                {/* Experience Cards - Cyberpunk Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Animated Beams connector lines (visual only, simplified) */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent hidden lg:block -z-10" />

                    {experiences.map((exp, index) => (
                        <BlurFade key={exp.company} delay={0.3 + index * 0.15}>
                            <div
                                ref={(el) => { nodeRefs.current[index] = el; }}
                                className="relative group h-full flex flex-col"
                            >
                                {/* Connector Dot (Desktop) */}
                                <div className="absolute -top-[1.2rem] left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-950 border-2 border-zinc-800 rounded-full z-20 hidden lg:block group-hover:border-accent transition-colors duration-500">
                                    <div className="absolute inset-0.5 bg-zinc-800 rounded-full group-hover:bg-accent transition-colors duration-500" />
                                </div>

                                <div className={cn(
                                    "relative flex-1 flex flex-col p-8 bg-zinc-900/40 backdrop-blur-sm border transition-all duration-500 overflow-hidden rounded-xl",
                                    exp.status === "ACTIVE"
                                        ? "border-accent/50 bg-accent/5 shadow-[0_0_30px_-10px_rgba(139,30,30,0.3)]"
                                        : "border-white/5 hover:border-white/20 hover:bg-zinc-800/40"
                                )}>

                                    {/* Active Job Laser Border */}
                                    {exp.status === "ACTIVE" && (
                                        <BorderBeam
                                            size={300}
                                            duration={15}
                                            delay={0}
                                            colorFrom="#8B1E1E"
                                            colorTo="#dc2626"
                                            borderWidth={1.5}
                                        />
                                    )}

                                    {/* Top Metadata Row */}
                                    <div className="flex justify-between items-start mb-6 font-mono text-xs">
                                        <div className="flex flex-col">
                                            <span className="text-zinc-500 mb-1">PERIOD</span>
                                            <span className="text-white font-bold tracking-wider">{exp.period}</span>
                                        </div>
                                        <div className={cn(
                                            "px-2 py-1 rounded border tracking-wider",
                                            exp.status === "ACTIVE"
                                                ? "bg-red-500/10 border-red-500/50 text-red-400 animate-pulse"
                                                : "bg-zinc-800 border-zinc-700 text-zinc-500"
                                        )}>
                                            {exp.status}
                                        </div>
                                    </div>

                                    {/* Role & Company */}
                                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-accent transition-colors duration-300">
                                        {exp.role}
                                    </h3>
                                    <p className="text-sm font-mono text-zinc-400 mb-6">
                                        @ {exp.company}
                                    </p>

                                    {/* Description */}
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                                        {exp.description}
                                    </p>

                                    {/* Tech Tags */}
                                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                                        {exp.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 text-[10px] uppercase font-mono bg-white/5 text-zinc-400 rounded hover:bg-white/10 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Corner Decorations */}
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-zinc-950 rotate-45 border-l border-white/10" />
                                </div>
                            </div>
                        </BlurFade>
                    ))}
                </div>

                {/* Animated Beams connections */}
                {nodeRefs.current.length >= 2 && nodeRefs.current[0] && nodeRefs.current[1] && (
                    <div className="hidden lg:block absolute inset-0 pointer-events-none">
                        <AnimatedBeam
                            containerRef={containerRef}
                            fromRef={{ current: nodeRefs.current[0] }}
                            toRef={{ current: nodeRefs.current[1] }}
                            curvature={-20}
                            startYOffset={10}
                            endYOffset={10}
                            pathColor="rgba(255, 255, 255, 0.05)"
                            gradientStartColor="#8B1E1E"
                            gradientStopColor="#dc2626"
                            pathWidth={1}
                        />
                        {nodeRefs.current[2] && (
                            <AnimatedBeam
                                containerRef={containerRef}
                                fromRef={{ current: nodeRefs.current[1] }}
                                toRef={{ current: nodeRefs.current[2] }}
                                curvature={20}
                                startYOffset={-10}
                                endYOffset={-10}
                                pathColor="rgba(255, 255, 255, 0.05)"
                                gradientStartColor="#8B1E1E"
                                gradientStopColor="#dc2626"
                                pathWidth={1}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Bottom Timeline Indicator */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mt-24">
                <BlurFade delay={0.8}>
                    <div className="relative h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-2/3 bg-gradient-to-r from-accent via-red-900 to-transparent" />
                    </div>
                    <div className="flex justify-between mt-2 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                        <span>Initiation: 2021</span>
                        <span>Current Status: ACTIVE</span>
                    </div>
                </BlurFade>
            </div>

        </section>
    );
}
