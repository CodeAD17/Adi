"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextPhase {
    text: string;
    startPercent: number;
    peakPercent: number;
    endPercent: number;
}

const textPhases: TextPhase[] = [
    {
        text: "ADI",
        startPercent: 5,
        peakPercent: 15,
        endPercent: 30,
    },
    {
        text: "BUILDS SYSTEMS",
        startPercent: 30,
        peakPercent: 45,
        endPercent: 60,
    },
    {
        text: "NOT NOISE",
        startPercent: 60,
        peakPercent: 75,
        endPercent: 92,
    },
];

export default function PowerPauseOverlay() {
    const [activePhaseIndex, setActivePhaseIndex] = useState<number | null>(null);
    const [phaseProgress, setPhaseProgress] = useState(0);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // Wait for hero section to exist
        const initScrollTrigger = () => {
            const heroSection = document.querySelector('[data-section="hero"]');
            if (!heroSection) {
                setTimeout(initScrollTrigger, 100);
                return;
            }

            // Single ScrollTrigger for tracking progress
            ScrollTrigger.create({
                trigger: heroSection,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
                onUpdate: (self) => {
                    const progress = self.progress * 100; // 0-100

                    // Hide scroll indicator after initial scroll
                    if (progress > 5) {
                        setShowScrollIndicator(false);
                    } else {
                        setShowScrollIndicator(true);
                    }

                    // Determine which phase is active
                    let newActiveIndex: number | null = null;
                    let newProgress = 0;

                    textPhases.forEach((phase, index) => {
                        if (progress >= phase.startPercent && progress <= phase.endPercent) {
                            newActiveIndex = index;

                            // Calculate phase progress (0 to 1 for fade in, 1 to 0 for fade out)
                            if (progress < phase.peakPercent) {
                                newProgress = (progress - phase.startPercent) / (phase.peakPercent - phase.startPercent);
                            } else {
                                newProgress = 1 - (progress - phase.peakPercent) / (phase.endPercent - phase.peakPercent);
                            }
                        }
                    });

                    setActivePhaseIndex(newActiveIndex);
                    setPhaseProgress(Math.max(0, Math.min(1, newProgress)));
                },
            });
        };

        initScrollTrigger();

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    // Don't render until mounted to avoid SSR issues
    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-20">
            {/* Text overlays with Framer Motion */}
            <AnimatePresence mode="wait">
                {activePhaseIndex !== null && (
                    <motion.div
                        key={activePhaseIndex}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{
                            opacity: phaseProgress,
                            y: 40 * (1 - phaseProgress)
                        }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <motion.h1
                            className={`text-display text-hero text-foreground ${textPhases[activePhaseIndex].text === "ADI"
                                    ? "tracking-[0.3em]"
                                    : "tracking-tight"
                                }`}
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {textPhases[activePhaseIndex].text}
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll indicator with Framer Motion */}
            <AnimatePresence>
                {showScrollIndicator && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="text-xs text-muted tracking-widest uppercase">
                            Scroll
                        </span>
                        <motion.div
                            className="w-[1px] h-8 bg-muted/40 relative overflow-hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-foreground/60"
                                animate={{
                                    y: ["-100%", "100%", "-100%"]
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeInOut",
                                    repeat: Infinity
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
