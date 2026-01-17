"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
    className?: string;
    containerRef: React.RefObject<HTMLElement | null>;
    fromRef: React.RefObject<HTMLElement | null>;
    toRef: React.RefObject<HTMLElement | null>;
    curvature?: number;
    reverse?: boolean;
    duration?: number;
    delay?: number;
    pathColor?: string;
    pathWidth?: number;
    pathOpacity?: number;
    gradientStartColor?: string;
    gradientStopColor?: string;
    startXOffset?: number;
    startYOffset?: number;
    endXOffset?: number;
    endYOffset?: number;
}

export function AnimatedBeam({
    className,
    containerRef,
    fromRef,
    toRef,
    curvature = 0,
    reverse = false,
    duration = Math.random() * 3 + 4,
    delay = 0,
    pathColor = "gray",
    pathWidth = 2,
    pathOpacity = 0.2,
    gradientStartColor = "#ffaa40",
    gradientStopColor = "#9c40ff",
    startXOffset = 0,
    startYOffset = 0,
    endXOffset = 0,
    endYOffset = 0,
}: AnimatedBeamProps) {
    const pathRef = useRef<SVGPathElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const id = `beam-${Math.random().toString(36).substring(7)}`;

    useEffect(() => {
        const updatePath = () => {
            if (!containerRef.current || !fromRef.current || !toRef.current || !svgRef.current)
                return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const fromRect = fromRef.current.getBoundingClientRect();
            const toRect = toRef.current.getBoundingClientRect();

            const startX = fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
            const startY = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
            const endX = toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
            const endY = toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

            const controlY = startY - curvature;
            const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;

            if (pathRef.current) {
                pathRef.current.setAttribute("d", d);
            }
        };

        updatePath();

        const resizeObserver = new ResizeObserver(updatePath);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

    return (
        <svg
            ref={svgRef}
            fill="none"
            className={cn("pointer-events-none absolute left-0 top-0 h-full w-full", className)}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient
                    id={id}
                    gradientUnits="userSpaceOnUse"
                    x1="0%"
                    x2="0%"
                    y1={reverse ? "100%" : "0%"}
                    y2={reverse ? "0%" : "100%"}
                >
                    <stop stopColor={gradientStartColor} stopOpacity="0" offset="0%">
                        <animate
                            attributeName="offset"
                            values={reverse ? "1;0" : "0;1"}
                            dur={`${duration}s`}
                            begin={`${delay}s`}
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop stopColor={gradientStartColor} offset="10%">
                        <animate
                            attributeName="offset"
                            values={reverse ? "1.1;0.1" : "0.1;1.1"}
                            dur={`${duration}s`}
                            begin={`${delay}s`}
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop stopColor={gradientStopColor} offset="33%">
                        <animate
                            attributeName="offset"
                            values={reverse ? "1.33;0.33" : "0.33;1.33"}
                            dur={`${duration}s`}
                            begin={`${delay}s`}
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop stopColor={gradientStopColor} stopOpacity="0" offset="100%">
                        <animate
                            attributeName="offset"
                            values={reverse ? "2;1" : "1;2"}
                            dur={`${duration}s`}
                            begin={`${delay}s`}
                            repeatCount="indefinite"
                        />
                    </stop>
                </linearGradient>
            </defs>
            <path
                ref={pathRef}
                d=""
                stroke={pathColor}
                strokeWidth={pathWidth}
                strokeOpacity={pathOpacity}
                strokeLinecap="round"
            />
            <path
                ref={pathRef}
                d=""
                stroke={`url(#${id})`}
                strokeWidth={pathWidth}
                strokeOpacity="1"
                strokeLinecap="round"
            />
        </svg>
    );
}
