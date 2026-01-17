"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DockProps {
    className?: string;
    children: React.ReactNode;
}

interface DockIconProps {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    label?: string;
}

export function Dock({ className, children }: DockProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-2 p-2 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-lg",
                className
            )}
        >
            {children}
        </div>
    );
}

export function DockIcon({ className, children, onClick, label }: DockIconProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={onClick}
            className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors group",
                className
            )}
            aria-label={label}
        >
            {children}
            {label && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-foreground bg-zinc-900 border border-zinc-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {label}
                </span>
            )}
        </motion.button>
    );
}
