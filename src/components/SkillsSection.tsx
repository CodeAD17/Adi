"use client";

import { BlurFade } from "./magicui/blur-fade";
import { Marquee } from "./magicui/marquee";
import { MagicCard } from "./magicui/magic-card";
import { DotPattern } from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";

// Extended tech stack with icons (simulated with text for now, but scalable)
const techStack = [
    { name: "React", category: "Frontend", color: "#61DAFB" },
    { name: "Next.js", category: "Frontend", color: "#000000" },
    { name: "TypeScript", category: "Frontend", color: "#3178C6" },
    { name: "Tailwind", category: "Frontend", color: "#06B6D4" },
    { name: "Framer Motion", category: "Frontend", color: "#0055FF" },
    { name: "Three.js", category: "Frontend", color: "#FFFFFF" },
    { name: "Node.js", category: "Backend", color: "#339933" },
    { name: "Python", category: "Backend", color: "#3776AB" },
    { name: "Go", category: "Backend", color: "#00ADD8" },
    { name: "FastAPI", category: "Backend", color: "#009688" },
    { name: "GraphQL", category: "Backend", color: "#E10098" },
    { name: "PostgreSQL", category: "Backend", color: "#336791" },
    { name: "AWS", category: "Cloud", color: "#FF9900" },
    { name: "Docker", category: "Cloud", color: "#2496ED" },
    { name: "Kubernetes", category: "Cloud", color: "#326CE5" },
    { name: "OpenAI", category: "AI", color: "#412991" },
    { name: "TensorFlow", category: "AI", color: "#FF6F00" },
    { name: "Figma", category: "Tools", color: "#F24E1E" },
    { name: "Git", category: "Tools", color: "#F05032" },
];

const SkillBadge = ({ name, color }: { name: string; color: string }) => (
    <div className="relative group flex items-center gap-3 px-6 py-4 bg-zinc-900/40 border border-white/5 rounded-xl transition-all duration-300 hover:border-white/20 hover:bg-zinc-800/60 overflow-hidden cursor-crosshair">
        {/* Glow effect on hover */}
        <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{ background: `radial-gradient(100px circle at center, ${color}, transparent)` }}
        />

        <div className="relative flex items-center gap-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-zinc-300 font-mono text-sm tracking-wider uppercase group-hover:text-white transition-colors">{name}</span>
        </div>
    </div>
);

export default function SkillsSection() {
    return (
        <section id="skills" className="relative bg-zinc-950 py-32 overflow-hidden">
            {/* --- LEGENDARY BACKGROUND --- */}
            <div className="absolute inset-0 z-0">
                <DotPattern
                    cr={1}
                    className={cn(
                        "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                        "opacity-30"
                    )}
                />
                <div className="absolute bottom-0 right-0 opacity-[0.03] select-none pointer-events-none">
                    <span className="text-[15rem] md:text-[25rem] font-black font-mono leading-none tracking-tighter text-white whitespace-nowrap">
                        STACK_
                    </span>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Header */}
                <BlurFade delay={0.1}>
                    <div className="flex flex-col mb-20">
                        <p className="text-accent font-mono text-sm tracking-widest mb-4">
                            {"// TECHNOLOGIES"}
                        </p>
                        <h2 className="text-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight">
                            TECH <span className="text-zinc-700">ARSENAL</span><span className="text-accent">_</span>
                        </h2>
                    </div>
                </BlurFade>

                {/* Main Marquee - Tilted and Fast */}
                <div className="relative mb-24 -mx-24 md:-mx-48 transform -rotate-2 origin-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 z-20 pointer-events-none" />

                    <BlurFade delay={0.3}>
                        <Marquee pauseOnHover className="[--duration:40s] [--gap:2rem] py-4">
                            {techStack.map((tech) => (
                                <SkillBadge key={tech.name} name={tech.name} color={tech.color} />
                            ))}
                        </Marquee>
                    </BlurFade>

                    <BlurFade delay={0.4}>
                        <Marquee pauseOnHover reverse className="[--duration:35s] [--gap:2rem] py-4">
                            {techStack.map((tech) => (
                                <SkillBadge key={tech.name} name={tech.name} color={tech.color} />
                            ))}
                        </Marquee>
                    </BlurFade>
                </div>

                {/* Categorized Grid - Precision View */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Frontend Card */}
                    <BlurFade delay={0.5}>
                        <MagicCard className="h-full flex flex-col justify-between border-white/5 bg-zinc-900/20" gradientColor="#8B1E1E">
                            <div>
                                <h3 className="text-xl font-bold text-white font-mono mb-6 flex items-center gap-2">
                                    <span className="text-accent">01.</span> FRONTEND
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.filter(t => t.category === "Frontend").map(t => (
                                        <span key={t.name} className="px-3 py-1 bg-white/5 text-zinc-400 text-xs font-mono rounded border border-white/5">
                                            {t.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/5 text-xs text-zinc-500 font-mono flex justify-between">
                                <span>RENDER_ENGINE</span>
                                <span>v16.1.3</span>
                            </div>
                        </MagicCard>
                    </BlurFade>

                    {/* Backend Card */}
                    <BlurFade delay={0.6}>
                        <MagicCard className="h-full flex flex-col justify-between border-white/5 bg-zinc-900/20" gradientColor="#8B1E1E">
                            <div>
                                <h3 className="text-xl font-bold text-white font-mono mb-6 flex items-center gap-2">
                                    <span className="text-accent">02.</span> BACKEND
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.filter(t => t.category === "Backend").map(t => (
                                        <span key={t.name} className="px-3 py-1 bg-white/5 text-zinc-400 text-xs font-mono rounded border border-white/5">
                                            {t.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/5 text-xs text-zinc-500 font-mono flex justify-between">
                                <span>API_GATEWAY</span>
                                <span>CONNECTED</span>
                            </div>
                        </MagicCard>
                    </BlurFade>

                    {/* Infrastructure Card */}
                    <BlurFade delay={0.7}>
                        <MagicCard className="h-full flex flex-col justify-between border-white/5 bg-zinc-900/20" gradientColor="#8B1E1E">
                            <div>
                                <h3 className="text-xl font-bold text-white font-mono mb-6 flex items-center gap-2">
                                    <span className="text-accent">03.</span> INFRA & AI
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.filter(t => ["Cloud", "AI"].includes(t.category)).map(t => (
                                        <span key={t.name} className="px-3 py-1 bg-white/5 text-zinc-400 text-xs font-mono rounded border border-white/5">
                                            {t.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/5 text-xs text-zinc-500 font-mono flex justify-between">
                                <span>SYSTEM_STATUS</span>
                                <span className="text-green-500">OPERATIONAL</span>
                            </div>
                        </MagicCard>
                    </BlurFade>
                </div>
            </div>
        </section>
    );
}
