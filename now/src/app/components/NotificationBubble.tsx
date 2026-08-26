"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import pixelMe from "../assets/imgs/pixel_me.png";
import { AnimatePresence, motion } from "framer-motion";

const pageMessages: Record<string, string[]> = {
    "/": [
        "Hello, Welcome !!",
        "Toggle the theme",
        "There's a secret page, can you find it?"
    ],
    "/about": [
        "Check out my GitHub stats below",
        "My experience section has details",
        "Scroll down for education info",
        "What's that???",
        "ServiceNow role please...",
    ],
    "/work": [
        "Click any card for full details",
        "Each project has its own page",
        "Star ratings on projects module is under dev...",
        "Easter is waiting for you",
    ],
    "/contact": [
        "Drop me a message anytime",
        "Connect with me on socials",
        "There's a secret page, did you find it?"
    ],
};

const projectMessages = [
    "Scroll down for the tech stack",
    "Check out the project telemetry",
    "Hit Launch to try it live",
];

export default function NotificationBubble() {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [shown, setShown] = useState<Set<string>>(new Set());
    const pathname = usePathname();

    useEffect(() => {
        // Reset on route change
        const timeoutId = setTimeout(() => {
            let msgs: string[];

            if (pathname.startsWith("/project/")) {
                msgs = projectMessages;
            } else {
                msgs = pageMessages[pathname] || [];
            }

            // Pick a message NOT yet shown
            const unseen = msgs.filter((m) => !shown.has(m));
            if (unseen.length === 0) return;

            const pick = unseen[Math.floor(Math.random() * unseen.length)];
            setMessage(pick);
            setShown((prev) => new Set(prev).add(pick));
            setShow(true);

            // Play notification sound
            const audio = new Audio("/music/notification-sound.mp3");
            audio.volume = 0.3;
            audio.play().catch(() => {});

            setTimeout(() => setShow(false), 4500);
        }, 1800);

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(4px)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-32 md:bottom-16 right-4 md:right-8 z-[999] flex items-center gap-2.5 bg-[var(--site-card-bg)] border border-[var(--site-border)] backdrop-blur-xl px-3.5 py-2 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.15)] cursor-pointer"
                    onClick={() => setShow(false)}
                >
                    <div className="relative w-7 h-7 rounded-full border border-[var(--site-border)] overflow-hidden bg-[var(--site-card-bg-strong)] shrink-0">
                        <Image
                            src={pixelMe}
                            alt="Me"
                            fill
                            className="object-cover"
                            sizes="28px"
                        />
                    </div>
                    <p className="text-xs font-semibold text-[var(--text-heading)] tracking-wide pr-1">
                        {message}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
