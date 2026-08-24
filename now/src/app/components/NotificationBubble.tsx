"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import pixelMe from "../assets/imgs/pixel_me.png";
import { AnimatePresence, motion } from "framer-motion";

export default function NotificationBubble() {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        // Only show on the home page
        if (pathname !== "/") {
            setShow(false);
            return;
        }

        let timeoutId: NodeJS.Timeout;

        // Show initial welcome after a brief delay
        timeoutId = setTimeout(() => {
            setMessage("Welcome to my digital space");
            setShow(true);
            setTimeout(() => setShow(false), 4500);
        }, 1500);

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const scrollPercent = scrollY / (docHeight - winHeight);

            if (scrollPercent > 0.3 && scrollPercent < 0.5 && message !== "Pro tip: Everything is glassmorphic.") {
                setMessage("Pro tip: Everything is glassmorphic.");
                setShow(true);
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => setShow(false), 4500);
            } else if (scrollPercent >= 0.5 && scrollPercent < 0.7 && message !== "I leverage automation for quality.") {
                setMessage("I leverage automation for quality.");
                setShow(true);
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => setShow(false), 4500);
            } else if (scrollPercent > 0.8 && message !== "Let's build something epic together.") {
                setMessage("Let's build something epic together.");
                setShow(true);
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => setShow(false), 4500);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [message, pathname]);

    if (pathname !== "/") return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(4px)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[999] flex items-center gap-2 bg-[var(--site-surface)]/80 border border-[var(--site-border)] backdrop-blur-xl px-3 py-2 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-pointer"
                    onClick={() => setShow(false)}
                >
                    <div className="relative w-7 h-7 rounded-full border border-white/10 overflow-hidden bg-[var(--site-card-bg-strong)] shrink-0">
                        <Image
                            src={pixelMe}
                            alt="Me"
                            fill
                            className="object-cover"
                            sizes="28px"
                        />
                    </div>
                    <p className="text-xs font-semibold text-[var(--text-secondary)] tracking-wide pr-1">
                        {message}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
