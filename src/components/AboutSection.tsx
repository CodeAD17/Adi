"use client";

import Image from "next/image";
import { useRef } from "react";
import { BlurFade } from "./magicui/blur-fade";
import { BentoGrid, BentoCard } from "./magicui/bento-grid";
import { Meteors } from "./magicui/meteors";
import { AnimatedBeam } from "./magicui/animated-beam";

// Stats with SVG icons instead of emojis
const stats = [
    {
        label: "Projects",
        value: "20+",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        )
    },
    {
        label: "Experience",
        value: "4+",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        label: "Technologies",
        value: "15+",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        )
    },
    {
        label: "Lines of Code",
        value: "500K+",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
        )
    },
];

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);

    return (
        <section
            id="about"
            className="relative min-h-screen bg-background py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
        >
            {/* Meteors - subtle background effect */}
            <Meteors number={6} className="opacity-30" />

            {/* Brutalist accent line */}
            <div className="absolute left-0 top-1/4 w-2 h-48 bg-accent" />

            <div ref={containerRef} className="relative max-w-6xl mx-auto">
                {/* Section Header - Brutalist style */}
                <BlurFade delay={0.1}>
                    <p className="text-subhead text-accent mb-4 font-mono">// WHO I AM</p>
                </BlurFade>
                <BlurFade delay={0.2}>
                    <h2 className="text-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-16 leading-none">
                        ABOUT<span className="text-accent">_</span>
                    </h2>
                </BlurFade>

                {/* Bento Grid Layout */}
                <BentoGrid className="mb-16">
                    {/* Profile Photo - Large Card with brutalist border */}
                    <BentoCard colSpan={1} rowSpan={2} className="p-0 overflow-hidden border-2 border-foreground/20 hover:border-accent transition-colors duration-500">
                        <BlurFade delay={0.3}>
                            <div ref={photoRef} className="relative w-full h-full min-h-[400px]">
                                <Image
                                    src="/adi-profile.jpg"
                                    alt="Adi - Developer"
                                    fill
                                    className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                                    priority
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

                                {/* Brutalist label */}
                                <div className="absolute bottom-4 left-4 px-3 py-1 bg-accent text-background text-xs font-mono font-bold">
                                    DEVELOPER
                                </div>
                            </div>
                        </BlurFade>
                    </BentoCard>

                    {/* Bio Card with brutalist style */}
                    <BentoCard colSpan={2} rowSpan={1} className="border-2 border-foreground/10 hover:border-foreground/30 transition-colors duration-500">
                        <BlurFade delay={0.4}>
                            <div ref={bioRef}>
                                <h3 className="text-display text-xl font-bold text-foreground mb-4 font-mono">
                                    {"<"} THE_STORY {"/>"}
                                </h3>
                                <p className="text-muted leading-relaxed mb-4">
                                    Full-stack developer. Systems architect. I build products that are
                                    <span className="text-foreground font-bold border-b-2 border-accent"> beautiful</span> and
                                    <span className="text-foreground font-bold border-b-2 border-accent"> bulletproof</span>.
                                </p>
                                <p className="text-muted leading-relaxed text-sm">
                                    Understand deeply → Design with intention → Build with precision.
                                </p>
                            </div>
                        </BlurFade>
                    </BentoCard>

                    {/* Philosophy Quote - Brutalist style */}
                    <BentoCard colSpan={2} rowSpan={1} className="flex items-center bg-accent/5 border-l-4 border-accent">
                        <BlurFade delay={0.5}>
                            <div className="pl-4">
                                <p className="text-2xl text-foreground font-bold mb-2">
                                    "SIMPLICITY IS THE ULTIMATE SOPHISTICATION."
                                </p>
                                <cite className="text-sm text-muted font-mono">
                                    — LEONARDO DA VINCI
                                </cite>
                            </div>
                        </BlurFade>
                    </BentoCard>
                </BentoGrid>

                {/* Animated Beam connecting photo to bio */}
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={photoRef}
                    toRef={bioRef}
                    curvature={-50}
                    pathColor="rgba(139, 30, 30, 0.2)"
                    gradientStartColor="#8B1E1E"
                    gradientStopColor="#dc2626"
                    pathWidth={2}
                />

                {/* Stats Row - Brutalist cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <BlurFade key={stat.label} delay={0.6 + index * 0.1}>
                            <div className="relative p-6 border-2 border-foreground/10 hover:border-foreground/40 bg-zinc-900/50 transition-all duration-300 group overflow-hidden">
                                {/* Hover accent bar */}
                                <div className="absolute top-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500" />

                                <div className="text-accent mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                    {stat.icon}
                                </div>
                                <p className="text-display text-3xl md:text-4xl font-bold text-foreground mb-1 font-mono">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-muted uppercase tracking-wider font-mono">
                                    {stat.label}
                                </p>
                            </div>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}
