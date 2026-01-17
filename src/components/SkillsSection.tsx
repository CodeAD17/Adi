"use client";

import { BlurFade } from "./magicui/blur-fade";
import { Marquee } from "./magicui/marquee";

// Extended tech stack
const techStack = [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Framer Motion", category: "Frontend" },
    { name: "Three.js", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "Go", category: "Backend" },
    { name: "FastAPI", category: "Backend" },
    { name: "GraphQL", category: "Backend" },
    { name: "PostgreSQL", category: "Backend" },
    { name: "AWS", category: "Cloud" },
    { name: "Firebase", category: "Cloud" },
    { name: "Docker", category: "Cloud" },
    { name: "Kubernetes", category: "Cloud" },
    { name: "Vercel", category: "Cloud" },
    { name: "Redis", category: "Cloud" },
    { name: "OpenAI", category: "AI" },
    { name: "TensorFlow", category: "AI" },
    { name: "LangChain", category: "AI" },
    { name: "Git", category: "Tools" },
    { name: "Figma", category: "Tools" },
    { name: "Linux", category: "Tools" },
];

const SkillBadge = ({ name }: { name: string }) => (
    <div className="flex items-center gap-2 px-5 py-3 bg-zinc-900/50 border-2 border-foreground/10 hover:border-accent hover:bg-accent/5 transition-all duration-300 font-mono text-sm">
        <span className="w-2 h-2 bg-accent" />
        <span className="text-foreground">{name}</span>
    </div>
);

export default function SkillsSection() {
    return (
        <section className="relative bg-background py-32 overflow-hidden">
            {/* Brutalist accents */}
            <div className="absolute left-0 top-1/4 w-2 h-48 bg-accent" />

            <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Section Header - Brutalist */}
                <BlurFade delay={0.1}>
                    <p className="text-subhead text-accent mb-4 font-mono">// WHAT I USE</p>
                </BlurFade>
                <BlurFade delay={0.2}>
                    <h2 className="text-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-none">
                        TECH STACK<span className="text-accent">_</span>
                    </h2>
                </BlurFade>
                <BlurFade delay={0.3}>
                    <p className="text-muted max-w-2xl mb-16 font-mono text-sm">
                        MODERN TOOLS AND TECHNOLOGIES FOR PRODUCTION-READY PRODUCTS AT SCALE.
                    </p>
                </BlurFade>
            </div>

            {/* Marquees */}
            <div className="space-y-4 mb-16">
                <BlurFade delay={0.4}>
                    <Marquee pauseOnHover className="[--duration:60s] [--gap:1rem]">
                        {techStack.slice(0, 12).map((tech) => (
                            <SkillBadge key={tech.name} name={tech.name} />
                        ))}
                    </Marquee>
                </BlurFade>

                <BlurFade delay={0.5}>
                    <Marquee pauseOnHover reverse className="[--duration:55s] [--gap:1rem]">
                        {techStack.slice(12).map((tech) => (
                            <SkillBadge key={tech.name} name={tech.name} />
                        ))}
                    </Marquee>
                </BlurFade>
            </div>

            {/* Category indicators */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
                <BlurFade delay={0.6}>
                    <div className="flex flex-wrap gap-8 text-xs text-muted font-mono uppercase tracking-wider">
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-[2px] bg-accent" />
                            FRONTEND
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-[2px] bg-accent" />
                            BACKEND
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-[2px] bg-accent" />
                            CLOUD
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-[2px] bg-accent" />
                            AI/ML
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-[2px] bg-accent" />
                            TOOLS
                        </span>
                    </div>
                </BlurFade>
            </div>
        </section>
    );
}
