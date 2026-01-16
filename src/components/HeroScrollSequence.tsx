"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 164;
const FRAME_PATH = "/pics/ezgif-frame-";

// Preload images and return array
const preloadImages = (): Promise<HTMLImageElement[]> => {
    return new Promise((resolve) => {
        const images: HTMLImageElement[] = [];
        let loaded = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `${FRAME_PATH}${String(i).padStart(3, "0")}.jpg`;
            img.onload = () => {
                loaded++;
                if (loaded === FRAME_COUNT) {
                    resolve(images);
                }
            };
            img.onerror = () => {
                loaded++;
                if (loaded === FRAME_COUNT) {
                    resolve(images);
                }
            };
            images.push(img);
        }
    });
};

export default function HeroScrollSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const frameIndexRef = useRef({ value: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Track loading progress
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
                }
            };
            images.push(img);
        }

        const renderFrame = (index: number) => {
            const img = imagesRef.current[Math.floor(index)];
            if (!img || !ctx) return;

            // Set canvas size to match window
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Calculate scaling to cover the canvas (like background-size: cover)
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

        // Handle resize
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
                    <div className="text-display text-subhead text-muted mb-4">
                        LOADING
                    </div>
                    <div className="w-48 h-[2px] bg-zinc-800 overflow-hidden">
                        <div
                            className="h-full bg-foreground transition-all duration-100"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                    <div className="text-xs text-muted mt-2">{loadProgress}%</div>
                </div>
            )}

            {/* Fixed Canvas */}
            <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-30" />
            </div>
        </section>
    );
}
