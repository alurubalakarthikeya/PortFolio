"use client";

import { useEffect, useRef, useState } from "react";
import { playCollectSound, playHitSound, playQuestCompleteSound } from "../utils/audio";

interface GameProps {
    onClose: (coinsEarned: number, statUpdate?: any) => void;
}

// ==========================================
// 1. SPACE DODGER ARCADE CABINET
// ==========================================
export function SpaceDodger({ onClose }: GameProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem("carty_dodger_hiscore");
        if (stored) setHighScore(parseInt(stored) || 0);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let playerX = 150;
        const playerY = 200;
        const playerWidth = 20;
        const playerHeight = 20;

        let obstacles: { x: number; y: number; size: number; speed: number }[] = [];
        let frame = 0;
        let localScore = 0;
        let isFinished = false;

        // keyboard listeners
        const keys: Record<string, boolean> = {};
        const handleKeyDown = (e: KeyboardEvent) => { keys[e.key.toLowerCase()] = true; };
        const handleKeyUp = (e: KeyboardEvent) => { keys[e.key.toLowerCase()] = false; };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        const updateLoop = () => {
            if (isFinished) return;

            // Move player
            if (keys["a"] || keys["arrowleft"]) playerX = Math.max(0, playerX - 4);
            if (keys["d"] || keys["arrowright"]) playerX = Math.min(canvas.width - playerWidth, playerX + 4);

            // Spawn obstacles
            frame++;
            if (frame % 25 === 0) {
                obstacles.push({
                    x: Math.random() * (canvas.width - 20),
                    y: -20,
                    size: 15 + Math.random() * 15,
                    speed: 2 + Math.random() * 3 + (localScore * 0.05),
                });
            }

            // Update obstacles
            obstacles = obstacles.filter((obs) => {
                obs.y += obs.speed;

                // Collision check
                if (
                    playerX < obs.x + obs.size &&
                    playerX + playerWidth > obs.x &&
                    playerY < obs.y + obs.size &&
                    playerY + playerHeight > obs.y
                ) {
                    isFinished = true;
                    setGameOver(true);
                    playHitSound();

                    // Save high score
                    const currentHiscore = parseInt(localStorage.getItem("carty_dodger_hiscore") || "0");
                    if (localScore > currentHiscore) {
                        localStorage.setItem("carty_dodger_hiscore", String(localScore));
                        setHighScore(localScore);
                    }
                }
                return obs.y < canvas.height;
            });

            // Increase score
            if (frame % 10 === 0) {
                localScore += 1;
                setScore(localScore);
            }

            // Render
            ctx.fillStyle = "#1e1b4b"; // deep blue
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Render player (crisp pixel square)
            ctx.fillStyle = "#10b981"; // neon green
            ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
            ctx.strokeStyle = "#fff";
            ctx.strokeRect(playerX + 2, playerY + 2, playerWidth - 4, playerHeight - 4);

            // Render obstacles (red warning blocks)
            ctx.fillStyle = "#ef4444";
            obstacles.forEach((obs) => {
                ctx.fillRect(obs.x, obs.y, obs.size, obs.size);
                ctx.strokeStyle = "#fca5a5";
                ctx.strokeRect(obs.x + 1, obs.y + 1, obs.size - 2, obs.size - 2);
            });

            animId = requestAnimationFrame(updateLoop);
        };

        animId = requestAnimationFrame(updateLoop);

        return () => {
            isFinished = true;
            cancelAnimationFrame(animId);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const claimAndClose = () => {
        // Reward: 1 coin per 10 points
        const reward = Math.floor(score / 10);
        onClose(reward);
    };

    return (
        <div className="w-full max-w-md bg-stone-900 border-4 border-stone-700 p-4 rounded-xl flex flex-col items-center">
            <div className="font-mono text-xs text-stone-400 mb-2 uppercase tracking-widest">Arcade: Space Dodger</div>

            <div className="w-full flex justify-between font-mono text-xs text-emerald-400 mb-2 px-1">
                <span>SCORE: {score}</span>
                <span>HI-SCORE: {highScore}</span>
            </div>

            <canvas ref={canvasRef} width={300} height={240} className="border-2 border-stone-600 bg-black block" />

            <div className="w-full text-center font-mono text-[9px] text-stone-500 mt-2">
                Controls: Left/Right arrow keys or A/D keys to dodge.
            </div>

            {gameOver ? (
                <div className="mt-4 flex flex-col items-center gap-2">
                    <div className="font-mono text-red-500 text-sm font-bold uppercase tracking-wider">GAME OVER</div>
                    <div className="font-mono text-stone-300 text-xs">Coins Earned: {Math.floor(score / 10)}</div>
                    <button
                        onClick={claimAndClose}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase font-bold rounded border-2 border-emerald-800"
                    >
                        Claim Coins and Exit
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => onClose(0)}
                    className="mt-4 px-4 py-1.5 bg-stone-700 hover:bg-stone-600 text-stone-200 font-mono text-xs uppercase rounded border border-stone-600"
                >
                    Exit Cabinet
                </button>
            )}
        </div>
    );
}

// ==========================================
// 2. MEMORY MATCH ARCADE CABINET
// ==========================================
export function MemoryMatch({ onClose }: GameProps) {
    const categories = [
        "REACT", "NEXT", "TS", "CSS", "NODE", "PYTHON",
        "REACT", "NEXT", "TS", "CSS", "NODE", "PYTHON"
    ];

    const [cards, setCards] = useState<{ id: number; label: string; flipped: boolean; matched: boolean }[]>([]);
    const [flippedIds, setFlippedIds] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matchedCount, setMatchedCount] = useState(0);
    const [isWon, setIsWon] = useState(false);

    useEffect(() => {
        // Shuffle cards
        const shuffled = [...categories]
            .map((label, id) => ({ id, label, flipped: false, matched: false }))
            .sort(() => Math.random() - 0.5);
        setCards(shuffled);
    }, []);

    const handleCardClick = (clickedId: number) => {
        if (flippedIds.length >= 2) return;
        const clickedCard = cards.find(c => c.id === clickedId);
        if (!clickedCard || clickedCard.flipped || clickedCard.matched) return;

        // Flip card
        playCollectSound();
        const updatedCards = cards.map(c => c.id === clickedId ? { ...c, flipped: true } : c);
        setCards(updatedCards);

        const nextFlipped = [...flippedIds, clickedId];
        setFlippedIds(nextFlipped);

        if (nextFlipped.length === 2) {
            setMoves(prev => prev + 1);
            const [firstId, secondId] = nextFlipped;
            const card1 = cards.find(c => c.id === firstId);
            const card2 = cards.find(c => c.id === secondId);

            if (card1 && card2 && card1.label === card2.label) {
                // Match!
                setTimeout(() => {
                    setCards(prev => prev.map(c => (c.id === firstId || c.id === secondId) ? { ...c, matched: true } : c));
                    setFlippedIds([]);
                    setMatchedCount(prev => {
                        const nextMatch = prev + 1;
                        if (nextMatch === 6) {
                            setIsWon(true);
                            playQuestCompleteSound();
                        }
                        return nextMatch;
                    });
                }, 400);
            } else {
                // Mismatch - flip back
                setTimeout(() => {
                    setCards(prev => prev.map(c => (c.id === firstId || c.id === secondId) ? { ...c, flipped: false } : c));
                    setFlippedIds([]);
                }, 1000);
            }
        }
    };

    const getReward = () => {
        // Fewer moves = more coins
        if (moves <= 8) return 15;
        if (moves <= 12) return 10;
        return 5;
    };

    return (
        <div className="w-full max-w-sm bg-stone-900 border-4 border-stone-700 p-4 rounded-xl flex flex-col items-center">
            <div className="font-mono text-xs text-stone-400 mb-2 uppercase tracking-widest">Arcade: Memory Match</div>
            <div className="font-mono text-xs text-emerald-400 mb-4">MOVES: {moves} | MATCHED: {matchedCount}/6</div>

            <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
                {cards.map((card) => {
                    const showValue = card.flipped || card.matched;
                    return (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            className={`h-16 rounded font-mono text-xs font-bold border-2 transition-all flex items-center justify-center ${showValue
                                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-300"
                                    : "bg-stone-850 hover:bg-stone-800 border-stone-600 text-stone-500"
                                }`}
                        >
                            {showValue ? card.label : "[?]"}
                        </button>
                    );
                })}
            </div>

            {isWon ? (
                <div className="mt-5 flex flex-col items-center gap-2">
                    <div className="font-mono text-emerald-400 text-sm font-bold uppercase">MATCH COMPLETED</div>
                    <div className="font-mono text-stone-300 text-xs">Coins Reward: {getReward()}</div>
                    <button
                        onClick={() => onClose(getReward())}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase font-bold rounded border-2 border-emerald-800"
                    >
                        Claim Coins and Exit
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => onClose(0)}
                    className="mt-5 px-4 py-1.5 bg-stone-700 hover:bg-stone-600 text-stone-200 font-mono text-xs uppercase rounded border border-stone-600"
                >
                    Exit Cabinet
                </button>
            )}
        </div>
    );
}

// ==========================================
// 3. REACTION TEST ARCADE CABINET
// ==========================================
export function ReactionTest({ onClose }: GameProps) {
    const [activeCell, setActiveCell] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15); // 15 seconds
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        if (!gameStarted || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [gameStarted, timeLeft]);

    useEffect(() => {
        if (!gameStarted || timeLeft <= 0) {
            setActiveCell(null);
            return;
        }

        // Spawn a target at random cell
        const spawnTarget = () => {
            setActiveCell(Math.floor(Math.random() * 9));
        };

        spawnTarget();
    }, [gameStarted, score, timeLeft]);

    const handleCellClick = (cellIndex: number) => {
        if (!gameStarted || timeLeft <= 0) return;

        if (cellIndex === activeCell) {
            playCollectSound();
            setScore(prev => prev + 1);
        } else {
            playHitSound();
            setScore(prev => Math.max(0, prev - 1)); // penalty
        }
    };

    const startTest = () => {
        setScore(0);
        setTimeLeft(15);
        setGameStarted(true);
    };

    const getReward = () => Math.floor(score / 3);

    return (
        <div className="w-full max-w-sm bg-stone-900 border-4 border-stone-700 p-4 rounded-xl flex flex-col items-center">
            <div className="font-mono text-xs text-stone-400 mb-2 uppercase tracking-widest">Arcade: Reaction Test</div>

            <div className="w-full flex justify-between font-mono text-xs text-emerald-400 mb-4 px-2">
                <span>TIME: {timeLeft}s</span>
                <span>SCORE: {score}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 w-64 h-64 border-2 border-stone-750 bg-black p-3 rounded">
                {Array.from({ length: 9 }).map((_, idx) => {
                    const isActive = idx === activeCell;
                    return (
                        <button
                            key={idx}
                            onClick={() => handleCellClick(idx)}
                            className={`rounded transition-all ${isActive
                                    ? "bg-red-500 hover:bg-red-400 shadow-[0_0_12px_#ef4444]"
                                    : "bg-stone-850 hover:bg-stone-800"
                                }`}
                        />
                    );
                })}
            </div>

            {!gameStarted ? (
                <button
                    onClick={startTest}
                    className="mt-5 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase font-bold rounded border-2 border-emerald-800"
                >
                    Start Game
                </button>
            ) : timeLeft <= 0 ? (
                <div className="mt-4 flex flex-col items-center gap-2">
                    <div className="font-mono text-yellow-400 text-xs font-bold">TIME OUT</div>
                    <div className="font-mono text-stone-300 text-xs">Coins Reward: {getReward()}</div>
                    <button
                        onClick={() => onClose(getReward())}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase font-bold rounded border-2 border-emerald-800"
                    >
                        Claim Coins and Exit
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => onClose(0)}
                    className="mt-5 px-4 py-1.5 bg-stone-700 hover:bg-stone-600 text-stone-200 font-mono text-xs uppercase rounded border border-stone-600"
                >
                    Exit Cabinet
                </button>
            )}
        </div>
    );
}

// ==========================================
// 4. CAFÉ COFFEE MINI-GAME
// ==========================================
export function CoffeeBrewGame({ onClose }: GameProps) {
    const [step, setStep] = useState<"beans" | "grind" | "brew" | "serve" | "complete">("beans");
    const [selectedBeans, setSelectedBeans] = useState<string>("");
    const [sliderVal, setSliderVal] = useState(0);
    const [grindQuality, setGrindQuality] = useState("");
    const [brewQuality, setBrewQuality] = useState("");
    const directionRef = useRef(1);

    // Grind Slider animation loop
    useEffect(() => {
        if (step !== "grind" && step !== "brew") return;

        let animId: number;
        const runSlider = () => {
            setSliderVal((prev) => {
                let next = prev + directionRef.current * 2.5;
                if (next >= 100) {
                    directionRef.current = -1;
                    next = 100;
                } else if (next <= 0) {
                    directionRef.current = 1;
                    next = 0;
                }
                return next;
            });
            animId = requestAnimationFrame(runSlider);
        };

        animId = requestAnimationFrame(runSlider);
        return () => cancelAnimationFrame(animId);
    }, [step]);

    const selectBeans = (bean: string) => {
        setSelectedBeans(bean);
        playCollectSound();
        setStep("grind");
        setSliderVal(0);
    };

    const performGrind = () => {
        playHitSound();
        // Sweet spot is 45-55
        if (sliderVal >= 45 && sliderVal <= 55) {
            setGrindQuality("PERFECT");
        } else if (sliderVal >= 35 && sliderVal <= 65) {
            setGrindQuality("ACCEPTABLE");
        } else {
            setGrindQuality("POOR");
        }
        setStep("brew");
        setSliderVal(0);
    };

    const performBrew = () => {
        playHitSound();
        // Sweet spot is 60-70
        if (sliderVal >= 60 && sliderVal <= 70) {
            setBrewQuality("PERFECT");
        } else if (sliderVal >= 45 && sliderVal <= 80) {
            setBrewQuality("ACCEPTABLE");
        } else {
            setBrewQuality("POOR");
        }
        setStep("serve");
    };

    const serveCoffee = () => {
        playQuestCompleteSound();
        setStep("complete");
    };

    const getReward = () => {
        let result = 2; // base
        if (grindQuality === "PERFECT") result += 4;
        if (brewQuality === "PERFECT") result += 4;
        return result;
    };

    return (
        <div className="w-full max-w-sm bg-orange-950/90 border-4 border-amber-900 p-4 rounded-xl flex flex-col items-center text-amber-200">
            <div className="font-mono text-xs text-amber-400 mb-2 uppercase tracking-wide">CAFE COFFEE BREWER</div>

            {step === "beans" && (
                <div className="flex flex-col items-center w-full">
                    <div className="font-mono text-xs mb-3 text-center">Step 1: Choose Beans Type</div>
                    <div className="flex flex-col gap-2.5 w-full max-w-xs">
                        <button onClick={() => selectBeans("DARK_ROAST")} className="py-2 px-3 bg-stone-850 hover:bg-stone-800 text-stone-100 rounded font-mono text-xs border border-amber-800">
                            Dark Roast (Strong Taste)
                        </button>
                        <button onClick={() => selectBeans("MINT_BLENDED")} className="py-2 px-3 bg-stone-850 hover:bg-stone-800 text-stone-100 rounded font-mono text-xs border border-amber-800">
                            Mint Blended (Curious flavor)
                        </button>
                        <button onClick={() => selectBeans("DECAF_LIGHT")} className="py-2 px-3 bg-stone-850 hover:bg-stone-800 text-stone-100 rounded font-mono text-xs border border-amber-800">
                            Decaf Light (Standard)
                        </button>
                    </div>
                </div>
            )}

            {step === "grind" && (
                <div className="flex flex-col items-center w-full">
                    <div className="font-mono text-xs mb-3">Step 2: Grind Beans at Sweet Spot [50]</div>
                    <div className="w-full bg-stone-900 h-6 border-2 border-stone-600 relative overflow-hidden rounded mb-4">
                        <div className="absolute left-[45%] right-[45%] top-0 bottom-0 bg-emerald-500/40 border-l border-r border-emerald-400" />
                        <div className="absolute h-full w-1 bg-red-400 shadow-[0_0_8px_red]" style={{ left: `${sliderVal}%` }} />
                    </div>
                    <div className="font-mono text-[9px] text-amber-400 mb-4">{Math.round(sliderVal)}%</div>
                    <button
                        onClick={performGrind}
                        className="py-2 px-6 bg-amber-700 hover:bg-amber-600 text-white font-mono text-xs font-bold rounded uppercase border border-amber-900"
                    >
                        Grind Now
                    </button>
                </div>
            )}

            {step === "brew" && (
                <div className="flex flex-col items-center w-full">
                    <div className="font-mono text-xs mb-3">Step 3: Extract & Brew at Sweet Spot [65]</div>
                    <div className="w-full bg-stone-900 h-6 border-2 border-stone-600 relative overflow-hidden rounded mb-4">
                        <div className="absolute left-[60%] right-[30%] top-0 bottom-0 bg-emerald-500/40 border-l border-r border-emerald-400" />
                        <div className="absolute h-full w-1 bg-red-400 shadow-[0_0_8px_red]" style={{ left: `${sliderVal}%` }} />
                    </div>
                    <div className="font-mono text-[9px] text-amber-400 mb-4">{Math.round(sliderVal)}%</div>
                    <button
                        onClick={performBrew}
                        className="py-2 px-6 bg-amber-700 hover:bg-amber-600 text-white font-mono text-xs font-bold rounded uppercase border border-amber-900"
                    >
                        Brew Now
                    </button>
                </div>
            )}

            {step === "serve" && (
                <div className="flex flex-col items-center w-full text-center">
                    <div className="font-mono text-xs mb-4">Step 4: Espresso Finished!</div>
                    <div className="font-mono text-xs text-stone-300 space-y-1 mb-5">
                        <div>Coffee Beans: {selectedBeans.replace("_", " ")}</div>
                        <div>Grinding: <span className="font-bold text-emerald-400">{grindQuality}</span></div>
                        <div>Extraction: <span className="font-bold text-emerald-400">{brewQuality}</span></div>
                    </div>
                    <button
                        onClick={serveCoffee}
                        className="py-2 px-6 bg-amber-700 hover:bg-amber-600 text-white font-mono text-xs font-bold rounded uppercase border border-amber-900"
                    >
                        Pour and Serve
                    </button>
                </div>
            )}

            {step === "complete" && (
                <div className="flex flex-col items-center text-center">
                    <div className="font-mono text-emerald-400 text-sm font-bold uppercase mb-2">Brewing Complete</div>
                    <div className="font-mono text-stone-250 text-xs mb-4">Double-shot served successfully.</div>
                    <button
                        onClick={() => onClose(getReward(), { type: "coffee" })}
                        className="py-2 px-6 bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs font-bold rounded uppercase border-2 border-emerald-800"
                    >
                        Receive {getReward()} Coins
                    </button>
                </div>
            )}
        </div>
    );
}

// ==========================================
// 5. GYM TRAINING TIMING GAME
// ==========================================
export function GymReactionGame({ onClose }: GameProps) {
    const [reps, setReps] = useState(0);
    const [sliderVal, setSliderVal] = useState(0);
    const [active, setActive] = useState(false);
    const directionRef = useRef(1);

    useEffect(() => {
        if (!active) return;
        let animId: number;

        const tick = () => {
            setSliderVal((prev) => {
                let next = prev + directionRef.current * 4;
                if (next >= 100) {
                    directionRef.current = -1;
                    next = 100;
                } else if (next <= 0) {
                    directionRef.current = 1;
                    next = 0;
                }
                return next;
            });
            animId = requestAnimationFrame(tick);
        };

        animId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animId);
    }, [active]);

    const punchBag = () => {
        playHitSound();
        // Target zone 40-60
        if (sliderVal >= 40 && sliderVal <= 60) {
            setReps(r => r + 1);
            playCollectSound();
        } else {
            // missed rep
        }
    };

    return (
        <div className="w-full max-w-sm bg-zinc-900 border-4 border-zinc-700 p-4 rounded-xl flex flex-col items-center text-zinc-150">
            <div className="font-mono text-xs text-zinc-400 mb-2 uppercase tracking-wide">TRAINING ZONE: BOXING BAG</div>
            <div className="font-mono text-xs text-emerald-400 mb-4">REPS COMPLETED: {reps}</div>

            {active ? (
                <div className="flex flex-col items-center w-full">
                    <div className="font-mono text-[10px] text-zinc-400 mb-3">Strike when the cursor reaches safety zone [50]</div>
                    <div className="w-full bg-stone-900 h-6 border-2 border-stone-600 relative overflow-hidden rounded mb-4">
                        <div className="absolute left-[40%] right-[40%] top-0 bottom-0 bg-emerald-500/40 border-l border-r border-emerald-400" />
                        <div className="absolute h-full w-1 bg-red-400 shadow-[0_0_8px_red]" style={{ left: `${sliderVal}%` }} />
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={punchBag}
                            className="py-1.5 px-4 bg-zinc-700 hover:bg-zinc-600 border border-zinc-500 text-white font-mono text-xs rounded uppercase font-bold"
                        >
                            Punch
                        </button>
                        <button
                            onClick={() => { setActive(false); }}
                            className="py-1.5 px-4 bg-red-800 hover:bg-red-700 text-white font-mono text-xs rounded uppercase"
                        >
                            Pause
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={() => setActive(true)}
                        className="py-2 px-6 bg-zinc-700 hover:bg-zinc-600 border border-zinc-500 text-white font-mono text-xs rounded uppercase font-bold"
                    >
                        Start Training
                    </button>
                    <button
                        onClick={() => onClose(reps)}
                        className="py-1.5 px-4 bg-stone-850 hover:bg-stone-800 text-stone-200 font-mono text-xs rounded border border-stone-750 uppercase"
                    >
                        Claim {reps} Coins & Exit
                    </button>
                </div>
            )}
        </div>
    );
}

// ==========================================
// 6. PARK FISHING MINI-GAME
// ==========================================
export function FishingMiniGame({ onClose }: GameProps) {
    const [fishingState, setFishingState] = useState<"idle" | "cast" | "waiting" | "bite" | "caught">("idle");
    const [fishCaught, setFishCaught] = useState("");
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const castLine = () => {
        playHitSound();
        setFishingState("cast");
        setTimeout(() => {
            setFishingState("waiting");
            // Wait between 2 to 5 seconds for a bite
            const waitTime = 2000 + Math.random() * 3000;
            timerRef.current = setTimeout(() => {
                setFishingState("bite");
                playHitSound(); // Alert sound
            }, waitTime);
        }, 1000);
    };

    const reelIn = () => {
        if (fishingState === "bite") {
            playQuestCompleteSound();
            const catchList = [
                { name: "Deadline Carp", coins: 8 },
                { name: "Stack Overflow Fish", coins: 15 },
                { name: "Bugfish", coins: 5 },
                { name: "Coffee Bass", coins: 12 }
            ];
            // Probability weights: Bugfish (40%), Deadline Carp (30%), Coffee Bass (20%), Stack Overflow Fish (10%)
            const roll = Math.random();
            let selectedCatch = catchList[2]; // default Bugfish
            if (roll < 0.1) selectedCatch = catchList[1];
            else if (roll < 0.3) selectedCatch = catchList[3];
            else if (roll < 0.6) selectedCatch = catchList[0];

            setFishCaught(selectedCatch.name);
            setFishingState("caught");
        } else {
            // reeled too early or too late!
            if (timerRef.current) clearTimeout(timerRef.current);
            setFishingState("idle");
            playHitSound();
        }
    };

    // Auto fail bite if player doesn't reel within 1.5 seconds
    useEffect(() => {
        if (fishingState !== "bite") return;

        const timeout = setTimeout(() => {
            // Missed it!
            setFishingState("idle");
            playHitSound();
        }, 1200);

        return () => clearTimeout(timeout);
    }, [fishingState]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const getReward = () => {
        if (fishCaught === "Stack Overflow Fish") return 15;
        if (fishCaught === "Coffee Bass") return 12;
        if (fishCaught === "Deadline Carp") return 8;
        return 5;
    };

    return (
        <div className="w-full max-w-sm bg-blue-950/90 border-4 border-sky-900 p-4 rounded-xl flex flex-col items-center text-sky-200">
            <div className="font-mono text-xs text-sky-400 mb-2 uppercase tracking-wide">PARK FISHING PIER</div>

            {fishingState === "idle" && (
                <div className="flex flex-col items-center">
                    <div className="font-mono text-xs mb-4">Water ripples calmly. Cast your hook!</div>
                    <button
                        onClick={castLine}
                        className="py-2 px-6 bg-sky-700 hover:bg-sky-600 text-white font-mono text-xs font-bold rounded uppercase border border-sky-900"
                    >
                        Cast Fishing Line
                    </button>
                </div>
            )}

            {fishingState === "cast" && (
                <div className="font-mono text-xs text-center py-4 animate-pulse">
                    Casting line into the water...
                </div>
            )}

            {fishingState === "waiting" && (
                <div className="font-mono text-xs text-center py-4">
                    Waiting for bite. Keep your finger on the reel...
                </div>
            )}

            {fishingState === "bite" && (
                <div className="flex flex-col items-center">
                    <div className="font-mono text-red-400 text-sm font-bold animate-ping tracking-wider mb-4">
                        !!! BITE !!!
                    </div>
                    <button
                        onClick={reelIn}
                        className="py-2.5 px-8 bg-amber-500 hover:bg-amber-400 text-stone-900 font-mono text-xs font-bold rounded uppercase border-2 border-amber-600"
                    >
                        REEL IN NOW!
                    </button>
                </div>
            )}

            {fishingState === "caught" && (
                <div className="flex flex-col items-center text-center">
                    <div className="font-mono text-emerald-400 text-xs font-bold uppercase mb-2">GREAT CATCH</div>
                    <div className="font-mono text-sm font-bold text-white mb-4">Caught a {fishCaught}!</div>
                    <button
                        onClick={() => onClose(getReward())}
                        className="py-2 px-6 bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs font-bold rounded uppercase border-2 border-emerald-800"
                    >
                        Claim {getReward()} Coins & Exit
                    </button>
                </div>
            )}
        </div>
    );
}
