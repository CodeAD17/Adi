"use client";

import Image from "next/image";
import { useRef } from "react";
import { BlurFade } from "./magicui/blur-fade";
import { BentoGrid, BentoCard } from "./magicui/bento-grid";
import { AnimatedBeam } from "./magicui/animated-beam";
import { DotPattern } from "./magicui/dot-pattern";
import { Particles } from "./magicui/particles";
import { BorderBeam } from "./magicui/border-beam";
import { cn } from "@/lib/utils";

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
            className="relative min-h-screen bg-zinc-950 py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
        >
            {/* --- LEGENDARY BACKGROUND --- */}
            <div className="absolute inset-0 z-0">
                <DotPattern
                    cr={1}
                    className={cn(
                        "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                        "opacity-50"
                    )}
                />
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    staticity={50}
                    ease={50}
                    color="#ffffff"
                />
                {/* Background "ABOUT" Text - Massive & Hollow */}
                <div className="absolute top-20 -left-20 md:left-0 opacity-[0.03] select-none pointer-events-none overflow-hidden">
                    <span className="text-[20rem] md:text-[30rem] font-black font-mono leading-none tracking-tighter text-white whitespace-nowrap">
                        WHO_IAM
                    </span>
                </div>
            </div>

            <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
                {/* Header with Glitch-like accent */}
                <BlurFade delay={0.1}>
                    <div className="flex items-center gap-4 mb-16">
                        <div className="h-[2px] w-12 bg-accent" />
                        <h2 className="text-display text-5xl md:text-7xl font-bold text-white tracking-tight">
                            ABOUT<span className="text-accent">_</span>
                        </h2>
                    </div>
                </BlurFade>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: Profile Card (5 cols) */}
                    <div className="lg:col-span-5 relative h-[600px] lg:h-auto">
                        <BlurFade delay={0.2} className="h-full">
                            <div
                                className="relative h-full w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900/50 group"
                                ref={photoRef}
                            >
                                {/* Profile Image */}
                                <Image
                                    src="/adi-profile.jpg"
                                    alt="Adi - Developer"
                                    fill
                                    className="object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                                    priority
                                />

                                {/* Scanline Effect Overlay (CSS pattern usually, simulated here with gradient) */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />

                                {/* Border Beam - Red Accent */}
                                <BorderBeam
                                    size={300}
                                    duration={12}
                                    delay={9}
                                    colorFrom="#8B1E1E"
                                    colorTo="#dc2626"
                                    borderWidth={2}
                                />

                                {/* HUD Elements */}
                                <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] font-mono text-white/80 tracking-widest">ONLINE</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-white/40 tracking-widest">ID: ADI_001</span>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                    <h3 className="text-2xl font-bold text-white font-mono mb-1">ADI_</h3>
                                    <p className="text-accent text-sm font-mono tracking-wider">{"// SYSTEM ARCHITECT"}</p>
                                </div>
                            </div>
                        </BlurFade>
                    </div>

                    {/* RIGHT COLUMN: Bio & Stats (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">

                        {/* Bio Card - Terminal Style */}
                        <BlurFade delay={0.3}>
                            <div ref={bioRef} className="relative p-8 rounded-xl border border-white/10 bg-zinc-900/80 backdrop-blur-sm overflow-hidden">
                                {/* Terminal Header */}
                                <div className="flex items-center gap-2 mb-6 opacity-50">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                    <div className="ml-4 px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/60">
                                        user@adi:~/bio
                                    </div>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-6 font-mono">
                                    {"<"} THE_STORY {"/>"}
                                </h3>

                                <div className="space-y-4 font-mono text-sm md:text-base leading-relaxed text-zinc-400">
                                    <p>
                                        <span className="text-accent">{">"}</span> Full-stack developer. Systems architect.
                                    </p>
                                    <p>
                                        <span className="text-accent">{">"}</span> I build products that are{" "}
                                        <span className="text-white font-bold bg-white/5 px-1">beautiful</span> and{" "}
                                        <span className="text-white font-bold bg-white/5 px-1">bulletproof</span>.
                                    </p>
                                    <p className="border-l-2 border-accent pl-4 py-2 my-6 italic text-zinc-500">
                                        "Simplicity is the ultimate sophistication."
                                        <br />
                                        <span className="text-xs uppercase not-italic mt-1 block opacity-70">— Leonardo da Vinci</span>
                                    </p>
                                    <p>
                                        <span className="text-accent animate-pulse">_</span>
                                    </p>
                                </div>
                            </div>
                        </BlurFade>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <BlurFade key={stat.label} delay={0.4 + index * 0.1}>
                                    <div className="group relative p-6 rounded-xl border border-white/10 bg-zinc-900/30 hover:bg-zinc-800/50 transition-all duration-300">
                                        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110">
                                            {stat.icon}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-4xl font-bold text-white font-mono tracking-tighter">
                                                {stat.value}
                                            </span>
                                            <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest border-t border-white/5 pt-2 mt-1 inline-block w-fit">
                                                {stat.label}
                                            </span>
                                        </div>
                                    </div>
                                </BlurFade>
                            ))}
                        </div>
                    </div>

                    {/* Animated Beam connecting layout */}
                    <AnimatedBeam
                        containerRef={containerRef}
                        fromRef={photoRef}
                        toRef={bioRef}
                        curvature={-50}
                        pathColor="rgba(255, 255, 255, 0.1)"
                        gradientStartColor="#8B1E1E"
                        gradientStopColor="#dc2626"
                        pathWidth={2}
                    />
                </div>
            </div>
        </section>
    );
}
