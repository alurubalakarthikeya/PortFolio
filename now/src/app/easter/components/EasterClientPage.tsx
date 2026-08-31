"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GameEngine from "./GameEngine";

export function EasterClientPage() {
    const router = useRouter();

    // Lock body scroll while game is active
    useEffect(() => {
        document.body.classList.add("game-active");
        return () => {
            document.body.classList.remove("game-active");
        };
    }, []);

    const handleExit = () => {
        document.body.classList.remove("game-active");
        router.push("/");
    };

    return <GameEngine onExit={handleExit} />;
}
