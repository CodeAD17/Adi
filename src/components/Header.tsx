"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "#contact" },
];

export default function Header() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Show header after scrolling past hero section
        const heroSection = document.querySelector('[data-section="hero"]');
        if (!heroSection) return;

        ScrollTrigger.create({
            trigger: heroSection,
            start: "bottom top+=100",
            onEnter: () => setIsVisible(true),
            onLeaveBack: () => setIsVisible(false),
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
                >
                    <nav className="max-w-6xl mx-auto flex items-center justify-between bg-zinc-900/90 backdrop-blur-xl border-2 border-foreground/10 px-4 md:px-6 py-3">
                        {/* Logo - Brutalist */}
                        <Link
                            href="/"
                            className="text-display text-sm font-bold tracking-widest text-foreground hover:text-accent transition-colors duration-300 font-mono"
                        >
                            ADI<span className="text-accent">_</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-muted hover:text-foreground transition-colors duration-300 font-mono uppercase tracking-wider"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* CTA Button - Brutalist */}
                        <Link
                            href="#contact"
                            className="hidden md:block px-5 py-2 text-sm font-bold text-background bg-accent hover:bg-accent/90 transition-colors duration-300 font-mono uppercase"
                        >
                            HIRE ME
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-foreground"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </nav>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="md:hidden mt-2 mx-auto max-w-6xl bg-zinc-900/95 backdrop-blur-xl border-2 border-foreground/10 p-4"
                            >
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block py-3 text-sm text-muted hover:text-foreground transition-colors duration-300 font-mono uppercase"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    href="#contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block mt-2 py-3 text-center text-sm font-bold text-background bg-accent font-mono uppercase"
                                >
                                    HIRE ME
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.header>
            )}
        </AnimatePresence>
    );
}
