"use client";

import { cn } from "@/lib/utils";

interface MeteorsProps {
    number?: number;
    className?: string;
}

export function Meteors({ number = 20, className }: MeteorsProps) {
    const meteors = new Array(number).fill(true);

    return (
        <>
            {meteors.map((_, idx) => (
                <span
                    key={idx}
                    className={cn(
                        "animate-meteor absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-foreground/50 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
                        "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-foreground/50 before:to-transparent",
                        className
                    )}
                    style={{
                        top: Math.random() * 100 + "%",
                        left: Math.random() * 100 + "%",
                        animationDelay: Math.random() * 1 + 0.2 + "s",
                        animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
                    }}
                />
            ))}
        </>
    );
}
