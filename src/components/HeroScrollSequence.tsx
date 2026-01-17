"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 164;
const FRAME_PATH = "/pics/ezgif-frame-";

export default function HeroScrollSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const textRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const frameIndexRef = useRef({ value: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `${FRAME_PATH}${String(i).padStart(3, "0")}.jpg`;
            img.onload = () => {
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                if (loadedCount === FRAME_COUNT) {
                    imagesRef.current = images;
                    setIsLoading(false);
                    renderFrame(0);
                    setupScrollTrigger();
                    setupTextAnimation();
                }
            };
            images.push(img);
        }

        const renderFrame = (index: number) => {
            const img = imagesRef.current[Math.floor(index)];
            if (!img || !ctx) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const imgRatio = img.width / img.height;
            const canvasRatio = canvas.width / canvas.height;

            let drawWidth, drawHeight, drawX, drawY;

            if (canvasRatio > imgRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                drawX = 0;
                drawY = (canvas.height - drawHeight) / 2;
            } else {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                drawX = (canvas.width - drawWidth) / 2;
                drawY = 0;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        };

        const setupScrollTrigger = () => {
            gsap.to(frameIndexRef.current, {
                value: FRAME_COUNT - 1,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5,
                    onUpdate: (self) => {
                        const frameIndex = Math.min(
                            Math.floor(self.progress * (FRAME_COUNT - 1)),
                            FRAME_COUNT - 1
                        );
                        renderFrame(frameIndex);
                    },
                },
            });
        };

        const setupTextAnimation = () => {
            if (!textRef.current || !container) return;

            gsap.to(textRef.current, {
                opacity: 0,
                y: -50,
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "20% top",
                    scrub: true,
                },
            });
        };

        const handleResize = () => {
            if (imagesRef.current.length > 0) {
                renderFrame(frameIndexRef.current.value);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section
            ref={containerRef}
            data-section="hero"
            className="relative"
            style={{ height: "300vh" }}
        >
            {/* Loading State */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
                    <div className="text-display text-xs text-accent mb-6 font-mono tracking-widest">
                        // INITIALIZING
                    </div>
                    <div className="relative w-64">
                        <div className="h-[2px] bg-foreground/10 w-full" />
                        <div
                            className="h-[2px] bg-accent absolute top-0 left-0 transition-all duration-100"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                    <div className="mt-4 font-mono text-4xl font-bold text-foreground">
                        {String(loadProgress).padStart(3, "0")}
                        <span className="text-accent">%</span>
                    </div>
                    <div className="mt-8 text-xs text-muted font-mono">
                        LOADING ASSETS...
                    </div>
                </div>
            )}

            {/* Fixed Canvas */}
            <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Strong gradient overlays for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent opacity-70" />
                <div className="absolute inset-0 bg-black/30" />

                {/* Hero Header - Always Visible */}
                <header className="absolute top-0 left-0 right-0 z-20 px-4 md:px-6 py-4 md:py-6">
                    <nav className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link
                            href="/"
                            className="text-display text-sm md:text-base font-bold tracking-widest text-white hover:text-accent transition-colors duration-300 font-mono"
                        >
                            ADI<span className="text-accent">_</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="#about" className="text-sm text-white/70 hover:text-white transition-colors font-mono uppercase">
                                About
                            </Link>
                            <Link href="/projects" className="text-sm text-white/70 hover:text-white transition-colors font-mono uppercase">
                                Projects
                            </Link>
                            <Link href="#contact" className="text-sm text-white/70 hover:text-white transition-colors font-mono uppercase">
                                Contact
                            </Link>
                            <a
                                href="#contact"
                                className="px-5 py-2 bg-accent text-background text-sm font-bold font-mono uppercase hover:bg-accent/90 transition-colors"
                            >
                                HIRE ME
                            </a>
                        </div>
                    </nav>
                </header>

                {/* Hero Text Overlay - Better positioned */}
                <div
                    ref={textRef}
                    className="absolute inset-0 flex flex-col justify-center md:justify-end px-4 md:px-12 lg:px-24 pb-8 md:pb-24 pt-20 md:pt-0"
                >
                    <div className="max-w-6xl mx-auto w-full">
                        {/* Top label */}
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-accent text-xs font-mono mb-2 md:mb-4 tracking-widest drop-shadow-lg"
                        >
                            // DEVELOPER & ARCHITECT
                        </motion.p>

                        {/* Main name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-display text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold text-white leading-none tracking-tighter drop-shadow-2xl"
                            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
                        >
                            ADI<span className="text-accent">_</span>
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.85, duration: 0.6 }}
                            className="text-white/90 text-sm md:text-base font-mono uppercase tracking-widest mt-2 md:mt-4 drop-shadow-lg"
                        >
                            NOT YOUR ORDINARY DEVELOPER
                        </motion.p>

                        {/* Subtitle line */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="flex items-center gap-3 md:gap-4 mt-4 md:mt-6"
                        >
                            <div className="w-8 md:w-16 h-[2px] bg-accent" />
                            <p className="text-white/80 text-xs md:text-sm font-mono uppercase tracking-wider drop-shadow-md">
                                FULL STACK DEVELOPER
                            </p>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.15, duration: 0.6 }}
                            className="text-white/70 text-sm md:text-base max-w-md mt-4 md:mt-6 leading-relaxed drop-shadow-md"
                        >
                            Building digital products that are{" "}
                            <span className="text-white font-medium">beautiful</span>,{" "}
                            <span className="text-white font-medium">fast</span>, and{" "}
                            <span className="text-white font-medium">bulletproof</span>.
                        </motion.p>

                        {/* CTA Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3, duration: 0.6 }}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mt-6 md:mt-8"
                        >
                            <a
                                href="#contact"
                                className="px-6 py-3 bg-accent text-background font-mono text-sm font-bold uppercase hover:bg-accent/90 transition-colors shadow-lg"
                            >
                                GET IN TOUCH
                            </a>
                            <a
                                href="/projects"
                                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors font-mono text-sm uppercase"
                            >
                                <span>VIEW WORK</span>
                                <span className="w-6 h-[2px] bg-accent" />
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator - Hidden on mobile */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
                >
                    <span className="text-xs text-white/60 font-mono">SCROLL</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] h-8 bg-gradient-to-b from-accent to-transparent"
                    />
                </motion.div>

                {/* Corner accents - Refined */}
                <div className="absolute top-20 right-4 md:right-8 hidden md:block">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="text-right"
                    >
                        <p className="text-xs text-white/50 font-mono">BASED IN</p>
                        <p className="text-sm text-white font-mono font-bold">INDIA</p>
                    </motion.div>
                </div>

                <div className="absolute bottom-8 right-4 md:right-8 hidden md:block">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                        className="text-right"
                    >
                        <p className="text-xs text-white/50 font-mono">STATUS</p>
                        <div className="flex items-center gap-2 justify-end">
                            <span className="w-2 h-2 bg-green-500" />
                            <p className="text-sm text-white font-mono font-bold">AVAILABLE</p>
                        </div>
                    </motion.div>
                </div>

                {/* Left accent bar */}
                <div className="absolute left-0 top-1/3 w-1 h-24 md:h-32 bg-accent hidden md:block" />
            </div>
        </section>
    );
}
