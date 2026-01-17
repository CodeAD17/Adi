"use client";

import { cn } from "@/lib/utils";

interface BentoGridProps {
    className?: string;
    children: React.ReactNode;
}

interface BentoCardProps {
    className?: string;
    children: React.ReactNode;
    colSpan?: 1 | 2 | 3;
    rowSpan?: 1 | 2;
}

export function BentoGrid({ className, children }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,_1fr)]",
                className
            )}
        >
            {children}
        </div>
    );
}

export function BentoCard({
    className,
    children,
    colSpan = 1,
    rowSpan = 1,
}: BentoCardProps) {
    const colSpanClasses = {
        1: "md:col-span-1",
        2: "md:col-span-2",
        3: "md:col-span-3",
    };

    const rowSpanClasses = {
        1: "md:row-span-1",
        2: "md:row-span-2",
    };

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80 group",
                colSpanClasses[colSpan],
                rowSpanClasses[rowSpan],
                className
            )}
        >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">{children}</div>
        </div>
    );
}
