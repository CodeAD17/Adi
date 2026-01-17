"use client";

import { useRef } from "react";
import { BlurFade } from "./magicui/blur-fade";
import { AnimatedBeam } from "./magicui/animated-beam";

const experiences = [
    {
        company: "Startup Co.",
        role: "Full Stack Developer",
        period: "2024 - Present",
        description:
            "Leading development of core product features and architecting scalable solutions.",
        highlights: [
            "Reduced page load time by 60%",
            "Built real-time collaboration features",
            "Mentored 3 junior developers",
        ],
    },
    {
        company: "Tech Agency",
        role: "Software Engineer",
        period: "2022 - 2024",
        description:
            "Delivered 10+ client projects spanning web, mobile, and cloud infrastructure.",
        highlights: [
            "Led microservices migration",
            "Implemented CI/CD pipelines",
            "Developed custom CMS platform",
        ],
    },
    {
        company: "Freelance",
        role: "Independent Developer",
        period: "2021 - 2022",
        description:
            "Built products for early-stage startups and established businesses.",
        highlights: [
            "Shipped 5 MVPs to production",
            "Specialized in React Native",
            "100% client satisfaction",
        ],
    },
];

export default function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

    return (
        <section className="relative bg-background py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
            {/* Brutalist accent */}
            <div className="absolute right-0 top-1/3 w-2 h-64 bg-accent" />

            <div ref={containerRef} className="relative max-w-6xl mx-auto">
                {/* Section Header - Brutalist */}
                <BlurFade delay={0.1}>
                    <p className="text-subhead text-accent mb-4 font-mono">// WHERE I'VE BEEN</p>
                </BlurFade>
                <BlurFade delay={0.2}>
                    <h2 className="text-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-20 leading-none">
                        EXPERIENCE<span className="text-accent">_</span>
                    </h2>
                </BlurFade>

                {/* Experience Cards - Brutalist Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {experiences.map((exp, index) => (
                        <BlurFade key={exp.company} delay={0.3 + index * 0.15}>
                            <div
                                ref={(el) => { nodeRefs.current[index] = el; }}
                                className="relative group h-full"
                            >
                                {/* Card with brutalist border */}
                                <div className="relative h-full p-8 bg-zinc-900/30 border-2 border-foreground/10 hover:border-accent transition-all duration-500 overflow-hidden">
                                    {/* Top accent bar on hover */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                                    {/* Number indicator */}
                                    <div className="absolute top-4 right-4 text-6xl font-bold text-foreground/5 font-mono">
                                        0{index + 1}
                                    </div>

                                    {/* Period badge */}
                                    <div className="inline-block px-3 py-1 mb-4 bg-accent/10 border border-accent/30 text-accent text-xs font-mono">
                                        {exp.period}
                                    </div>

                                    {/* Role */}
                                    <h3 className="text-display text-xl font-bold text-foreground mb-2">
                                        {exp.role}
                                    </h3>

                                    {/* Company */}
                                    <p className="text-sm text-muted mb-4 font-mono">
                                        @ {exp.company}
                                    </p>

                                    {/* Description */}
                                    <p className="text-muted text-sm leading-relaxed mb-6">
                                        {exp.description}
                                    </p>

                                    {/* Highlights with brutalist bullets */}
                                    <ul className="space-y-2">
                                        {exp.highlights.map((highlight, i) => (
                                            <li
                                                key={highlight}
                                                className="text-xs text-muted flex items-start gap-3"
                                            >
                                                <span className="w-4 h-[2px] bg-accent mt-2 shrink-0" />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </BlurFade>
                    ))}
                </div>

                {/* Animated Beams connecting cards */}
                {nodeRefs.current.length >= 2 && nodeRefs.current[0] && nodeRefs.current[1] && (
                    <AnimatedBeam
                        containerRef={containerRef}
                        fromRef={{ current: nodeRefs.current[0] }}
                        toRef={{ current: nodeRefs.current[1] }}
                        curvature={50}
                        pathColor="rgba(139, 30, 30, 0.1)"
                        gradientStartColor="#8B1E1E"
                        gradientStopColor="#dc2626"
                        pathWidth={1}
                    />
                )}

                {/* Career progress bar */}
                <BlurFade delay={0.8}>
                    <div className="mt-16 relative">
                        <div className="h-[2px] bg-foreground/10 w-full" />
                        <div className="h-[2px] bg-accent w-2/3 absolute top-0 left-0" />
                        <div className="flex justify-between mt-4 text-xs text-muted font-mono">
                            <span>2021</span>
                            <span className="text-accent font-bold">PRESENT</span>
                        </div>
                    </div>
                </BlurFade>
            </div>
        </section>
    );
}
