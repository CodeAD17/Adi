"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface DotMapProps {
    className?: string;
    dotSize?: number;
    dotSpacing?: number;
    highlightedDots?: { lat: number; lng: number }[];
}

export function DottedMap({
    className,
    dotSize = 0.8,
    dotSpacing = 4,
    highlightedDots = [
        { lat: 28.6139, lng: 77.209 }, // Delhi
        { lat: 19.076, lng: 72.8777 }, // Mumbai
        { lat: 51.5074, lng: -0.1278 }, // London
        { lat: 40.7128, lng: -74.006 }, // New York
        { lat: 35.6762, lng: 139.6503 }, // Tokyo
        { lat: 1.3521, lng: 103.8198 }, // Singapore
    ],
}: DotMapProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

    // Convert lat/lng to canvas coordinates (simple mercator projection)
    const toCanvasCoords = (lat: number, lng: number): { x: number; y: number } => {
        const x = ((lng + 180) / 360) * dimensions.width;
        const y = ((90 - lat) / 180) * dimensions.height;
        return { x, y };
    };

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = dimensions.width * dpr;
        canvas.height = dimensions.height * dpr;
        ctx.scale(dpr, dpr);

        // Clear canvas
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);

        // Draw dot grid (world map pattern)
        ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
        for (let x = 0; x < dimensions.width; x += dotSpacing) {
            for (let y = 0; y < dimensions.height; y += dotSpacing) {
                // Add some variation to simulate continents (simplified)
                const noise =
                    Math.sin(x * 0.03) * Math.cos(y * 0.02) +
                    Math.sin(x * 0.01 + y * 0.01) * 0.5;
                if (noise > 0.3) {
                    ctx.beginPath();
                    ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        // Draw highlighted dots (connection points)
        highlightedDots.forEach((dot, index) => {
            const { x, y } = toCanvasCoords(dot.lat, dot.lng);

            // Outer glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
            gradient.addColorStop(0, "rgba(139, 30, 30, 0.3)");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();

            // Inner dot
            ctx.fillStyle = "#8B1E1E";
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();

            // Pulse animation via CSS class will be added
        });
    }, [dimensions, dotSize, dotSpacing, highlightedDots]);

    return (
        <div ref={containerRef} className={cn("relative w-full h-full", className)}>
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{
                    width: dimensions.width,
                    height: dimensions.height,
                }}
            />
            {/* Animated pulsing dots overlay */}
            {highlightedDots.map((dot, index) => {
                const { x, y } = toCanvasCoords(dot.lat, dot.lng);
                return (
                    <div
                        key={index}
                        className="absolute w-2 h-2 rounded-full animate-pulse"
                        style={{
                            left: x - 4,
                            top: y - 4,
                            background: "radial-gradient(circle, #8B1E1E 0%, transparent 70%)",
                            animationDelay: `${index * 0.3}s`,
                        }}
                    />
                );
            })}
        </div>
    );
}
