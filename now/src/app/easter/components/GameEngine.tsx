"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PROFILE } from "../data/profileConfig";
import {
    GameState, GameLocation, GameObject, NPC, Particle,
    Quest, Achievement, TimeOfDay
} from "../utils/gameTypes";
import { MAPS } from "../utils/maps";
import { drawPixelSprite, ColorPalette } from "../utils/sprites";
import {
    playStepSound, playDialogueBlip, playCollectSound,
    playHitSound, playAchievementSound, playQuestCompleteSound,
    setMuted, getMuted
} from "../utils/audio";
import {
    SpaceDodger, MemoryMatch, ReactionTest,
    CoffeeBrewGame, FishingMiniGame, GymReactionGame
} from "./MiniGames";

const TILE = 16;
const CANVAS_W = 480;
const CANVAS_H = 320;

const DEFAULT_QUEST: Quest = {
    id: "lost_memory",
    title: "The Lost Memory",
    description: "Memory fragments have been scattered across the town. Find them all.",
    status: "active",
    objectives: [
        { id: "visit_cafe", description: "Visit the Cafe", completed: false },
        { id: "visit_lab", description: "Visit the Engineering Lab", completed: false },
        { id: "brew_coffee", description: "Brew coffee at the Cafe machine", completed: false },
        { id: "catch_fish", description: "Catch a fish at the Park pier", completed: false },
        { id: "find_secret", description: "Find the Secret Area", completed: false }
    ]
};

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
    { id: "first_steps", title: "First Steps", description: "Entered the town for the first time.", unlocked: false },
    { id: "explorer", title: "Explorer", description: "Visited every location in town.", unlocked: false },
    { id: "nosy_visitor", title: "Nosy Visitor", description: "Discovered the hidden secret area.", unlocked: false },
    { id: "caffeine_rush", title: "Caffeine Rush", description: "Brewed a perfect cup of coffee.", unlocked: false },
    { id: "gamer", title: "Gamer", description: "Played every arcade mini-game.", unlocked: false },
    { id: "fisherman", title: "Fisherman", description: "Caught 5 different fish.", unlocked: false },
    { id: "lore_master", title: "Lore Master", description: "Discovered 10 personal facts.", unlocked: false },
    { id: "treasure_hunter", title: "Treasure Hunter", description: "Collected all fragments.", unlocked: false },
    { id: "completionist", title: "Completionist", description: "Completed all quests and achievements.", unlocked: false },
    { id: "coin_collector", title: "Coin Collector", description: "Accumulated 100 coins.", unlocked: false }
];

const ALL_LOCATIONS: GameLocation[] = ['town', 'bedroom', 'cafe', 'lab', 'library', 'arcade', 'shop', 'park', 'training', 'secret'];

const initState = (): GameState => ({
    currentLocation: "town",
    playerPos: { x: 320, y: 320 },
    playerDir: "down",
    playerMoving: false,
    hp: 100,
    coins: 0,
    collectibles: 0,
    questProgress: 0,
    inventory: [],
    quest: DEFAULT_QUEST,
    achievements: DEFAULT_ACHIEVEMENTS,
    discoveredLocations: ["town"],
    secretFound: false,
    loreRead: [],
    gameCompleted: false,
    showEnding: false,
    dialogueText: "",
    fullDialogue: [],
    dialogueIndex: 0,
    dialogueSpeaker: "",
    dialogueCharIndex: 0,
    dialogueActive: false,
    timeOfDay: "day",
    gameClock: 1200,
    customization: { hair: 0, shirtColor: "#10b981", pantsColor: "#1e293b" },
    activeMiniGame: null,
    fishCaught: [],
    miniGameScores: {}
});

export default function GameEngine({ onExit }: { onExit: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [screen, setScreen] = useState<"title" | "playing" | "menu" | "map">("title");
    const [gameState, setGameState] = useState<GameState>(initState());
    const [soundMuted, setSoundMuted] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ w: CANVAS_W, h: CANVAS_H });

    const stateRef = useRef<GameState | null>(null);
    stateRef.current = gameState;
    const keysRef = useRef<Record<string, boolean>>({});
    const particlesRef = useRef<Particle[]>([]);
    const cameraRef = useRef({ x: 0, y: 0 });
    const frameCountRef = useRef(0);

    // Responsive canvas sizing
    useEffect(() => {
        const resize = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const aspect = CANVAS_W / CANVAS_H;
            let w = vw;
            let h = vw / aspect;
            if (h > vh) { h = vh; w = vh * aspect; }
            setCanvasSize({ w: Math.floor(w), h: Math.floor(h) });
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    // Load saved state
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const m = localStorage.getItem("carty_game_muted");
            if (m !== null) { const v = m === "true"; setSoundMuted(v); setMuted(v); }
            const s = localStorage.getItem("carty_game_save_v2");
            if (s) {
                const p = JSON.parse(s);
                setGameState(prev => ({ ...prev, ...p, dialogueActive: false, activeMiniGame: null }));
            }
        } catch { }
    }, []);

    const saveProgress = useCallback((data: Partial<GameState>) => {
        if (typeof window === "undefined" || !stateRef.current) return;
        try {
            const n = { ...stateRef.current, ...data };
            const sd = {
                coins: n.coins, collectibles: n.collectibles, questProgress: n.questProgress,
                inventory: n.inventory, quest: n.quest, achievements: n.achievements,
                discoveredLocations: n.discoveredLocations, secretFound: n.secretFound,
                loreRead: n.loreRead, gameCompleted: n.gameCompleted, fishCaught: n.fishCaught,
                miniGameScores: n.miniGameScores, customization: n.customization,
                currentLocation: n.currentLocation, playerPos: n.playerPos
            };
            localStorage.setItem("carty_game_save_v2", JSON.stringify(sd));
        } catch { }
    }, []);

    const toggleMute = () => {
        const v = !soundMuted;
        setSoundMuted(v); setMuted(v);
        localStorage.setItem("carty_game_muted", v ? "true" : "false");
    };

    const unlockAchievement = useCallback((id: string) => {
        if (!stateRef.current) return;
        const was = stateRef.current.achievements.find(a => a.id === id);
        if (was?.unlocked) return;
        playAchievementSound();
        spawnParticles(240, 160, "#F59E0B", 25);
        setGameState(prev => {
            const achs = prev.achievements.map(a => a.id === id ? { ...a, unlocked: true, unlockedAt: new Date().toLocaleTimeString() } : a);
            const next = { ...prev, achievements: achs };
            saveProgress(next);
            return next;
        });
    }, [saveProgress]);

    const spawnParticles = (x: number, y: number, color: string, count = 10) => {
        for (let i = 0; i < count; i++) {
            particlesRef.current.push({
                x, y, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4 - 1,
                color, life: 0, maxLife: 30 + Math.random() * 20, size: 2 + Math.random() * 3
            });
        }
    };

    const triggerDialogue = useCallback((speaker: string, lines: string[]) => {
        if (!lines.length) return;
        playDialogueBlip();
        setGameState(prev => ({
            ...prev, dialogueActive: true, dialogueSpeaker: speaker,
            fullDialogue: lines, dialogueIndex: 0, dialogueText: "", dialogueCharIndex: 0
        }));
    }, []);

    const advanceDialogue = useCallback(() => {
        const s = stateRef.current;
        if (!s || !s.dialogueActive) return;
        if (s.dialogueCharIndex < s.fullDialogue[s.dialogueIndex].length) {
            setGameState(prev => ({
                ...prev, dialogueText: prev.fullDialogue[prev.dialogueIndex],
                dialogueCharIndex: prev.fullDialogue[prev.dialogueIndex].length
            }));
            playDialogueBlip();
            return;
        }
        if (s.dialogueIndex < s.fullDialogue.length - 1) {
            playDialogueBlip();
            setGameState(prev => ({ ...prev, dialogueIndex: prev.dialogueIndex + 1, dialogueText: "", dialogueCharIndex: 0 }));
        } else {
            setGameState(prev => ({ ...prev, dialogueActive: false }));
        }
    }, []);

    // Handle interaction
    const handleInteract = useCallback(() => {
        const s = stateRef.current;
        if (!s || s.dialogueActive) return;
        const map = MAPS[s.currentLocation];
        const px = s.playerPos.x + 8;
        const py = s.playerPos.y + 8;

        // Check objects
        for (const obj of map.objects) {
            const ox = obj.x * TILE + obj.width / 2;
            const oy = obj.y * TILE + obj.height / 2;
            if (Math.hypot(px - ox, py - oy) < 28) {
                // Track lore
                if (!s.loreRead.includes(obj.id)) {
                    const nl = [...s.loreRead, obj.id];
                    if (nl.length >= 10) unlockAchievement("lore_master");
                    setGameState(prev => { const n = { ...prev, loreRead: nl }; saveProgress(n); return n; });
                }
                // Mini-game trigger
                if (obj.miniGame) {
                    setGameState(prev => ({ ...prev, activeMiniGame: obj.miniGame! }));
                    return;
                }
                triggerDialogue(obj.name, obj.dialogue || ["..."]);
                return;
            }
        }
        // Check NPCs
        for (const npc of map.npcs) {
            const nx = npc.x * TILE + npc.width / 2;
            const ny = npc.y * TILE + npc.height / 2;
            if (Math.hypot(px - nx, py - ny) < 28) {
                triggerDialogue(npc.name, npc.dialogue);
                return;
            }
        }
    }, [triggerDialogue, unlockAchievement, saveProgress]);

    // Keyboard handler
    useEffect(() => {
        const kd = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) e.preventDefault();
            keysRef.current[e.key.toLowerCase()] = true;
            if (screen !== "playing") return;
            const s = stateRef.current;
            if (e.key.toLowerCase() === "e" || e.key === "Enter" || e.key === " ") {
                if (s?.dialogueActive) advanceDialogue(); else handleInteract();
            }
            if (e.key === "Escape") setScreen(prev => prev === "menu" ? "playing" : "menu");
            if (e.key.toLowerCase() === "m") setScreen(prev => prev === "map" ? "playing" : "map");
        };
        const ku = (e: KeyboardEvent) => { keysRef.current[e.key.toLowerCase()] = false; };
        window.addEventListener("keydown", kd);
        window.addEventListener("keyup", ku);
        return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
    }, [screen, advanceDialogue, handleInteract]);

    // Discovery tracking
    useEffect(() => {
        const s = stateRef.current;
        if (!s) return;
        const loc = s.currentLocation;
        if (!s.discoveredLocations.includes(loc)) {
            const dl = [...s.discoveredLocations, loc];
            if (dl.length >= ALL_LOCATIONS.length - 1) unlockAchievement("explorer");
            if (loc === "secret") unlockAchievement("nosy_visitor");
            setGameState(prev => { const n = { ...prev, discoveredLocations: dl }; saveProgress(n); return n; });
        }
    }, [gameState.currentLocation, unlockAchievement, saveProgress]);

    // Mini-game close handler
    const handleMiniGameClose = useCallback((earned: number, extra?: any) => {
        setGameState(prev => {
            const n = { ...prev, activeMiniGame: null, coins: prev.coins + earned };
            if (n.coins >= 100) unlockAchievement("coin_collector");
            saveProgress(n);
            return n;
        });
        if (earned > 0) playCollectSound();
    }, [unlockAchievement, saveProgress]);

    // Main game loop
    useEffect(() => {
        if (screen !== "playing" || gameState.activeMiniGame) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let stepTimer = 0;

        const loop = () => {
            const s = stateRef.current;
            if (!s) { animId = requestAnimationFrame(loop); return; }
            frameCountRef.current++;

            const map = MAPS[s.currentLocation];
            const mapPxW = map.width * TILE;
            const mapPxH = map.height * TILE;
            const speed = 1.8;
            let dx = 0, dy = 0;

            if (!s.dialogueActive) {
                if (keysRef.current["w"] || keysRef.current["arrowup"]) { dy = -speed; s.playerDir = "up"; }
                else if (keysRef.current["s"] || keysRef.current["arrowdown"]) { dy = speed; s.playerDir = "down"; }
                if (keysRef.current["a"] || keysRef.current["arrowleft"]) { dx = -speed; s.playerDir = "left"; }
                else if (keysRef.current["d"] || keysRef.current["arrowright"]) { dx = speed; s.playerDir = "right"; }
            }

            const isMoving = dx !== 0 || dy !== 0;
            let nx = s.playerPos.x, ny = s.playerPos.y;

            if (isMoving) {
                const colW = 10, colH = 10, oX = 3, oY = 6;
                const check = (cx: number, cy: number) => {
                    if (cx < 0 || cx + colW > mapPxW - 2 || cy < 0 || cy + colH > mapPxH - 2) return true;
                    const gL = Math.floor((cx + oX) / TILE), gR = Math.floor((cx + oX + colW) / TILE);
                    const gT = Math.floor((cy + oY) / TILE), gB = Math.floor((cy + oY + colH) / TILE);
                    for (let r = gT; r <= gB; r++) {
                        for (let c = gL; c <= gR; c++) {
                            if (r >= 0 && r < map.height && c >= 0 && c < map.width) {
                                const t = map.tileGrid[r][c];
                                if (t === 1 || t === 5) return true;
                            }
                        }
                    }
                    for (const obj of map.objects) {
                        if (!obj.solid) continue;
                        const ox = obj.x * TILE, oy = obj.y * TILE;
                        if (cx + oX < ox + obj.width && cx + oX + colW > ox && cy + oY < oy + obj.height && cy + oY + colH > oy) return true;
                    }
                    return false;
                };
                if (!check(s.playerPos.x + dx, s.playerPos.y)) nx = s.playerPos.x + dx;
                if (!check(s.playerPos.x, s.playerPos.y + dy)) ny = s.playerPos.y + dy;
                stepTimer++;
                if (stepTimer >= 18) { playStepSound(); stepTimer = 0; }
            } else { stepTimer = 0; }

            // Doorways
            const ptx = Math.floor((nx + 8) / TILE), pty = Math.floor((ny + 8) / TILE);
            let nextLoc: GameLocation | null = null, ntx = 0, nty = 0;
            for (const d of map.doorways) {
                if (d.x === ptx && d.y === pty) { nextLoc = d.targetLocation; ntx = d.targetX * TILE; nty = d.targetY * TILE; break; }
            }
            if (nextLoc) {
                spawnParticles(nx + 8, ny + 8, "#3B82F6", 15);
                setGameState(prev => {
                    const n = { ...prev, currentLocation: nextLoc!, playerPos: { x: ntx, y: nty } };
                    saveProgress(n); return n;
                });
                animId = requestAnimationFrame(loop); return;
            }

            // Collectibles
            const items = map.collectibles;
            for (let i = 0; i < items.length; i++) {
                if (!items[i].collected && Math.hypot((nx + 8) - (items[i].x * TILE + 8), (ny + 8) - (items[i].y * TILE + 8)) < 14) {
                    items[i] = { ...items[i], collected: true };
                    MAPS[s.currentLocation].collectibles = [...items];
                    playCollectSound();
                    spawnParticles(items[i].x * TILE + 8, items[i].y * TILE + 8, "#FBBF24", 20);
                    setGameState(prev => {
                        const n = { ...prev, collectibles: prev.collectibles + 1 };
                        if (n.collectibles >= 5) unlockAchievement("treasure_hunter");
                        saveProgress(n); return n;
                    });
                    triggerDialogue("Fragment Found", ["+1 Memory Fragment: " + items[i].name, "A piece of Carty's personality has been recovered."]);
                    break;
                }
            }

            // Update position
            if (nx !== s.playerPos.x || ny !== s.playerPos.y || isMoving !== s.playerMoving) {
                setGameState(prev => ({ ...prev, playerPos: { x: nx, y: ny }, playerDir: s.playerDir, playerMoving: isMoving }));
            }

            // Clock: advance every 120 frames (2s at 60fps = 1 game hour)
            if (frameCountRef.current % 120 === 0) {
                setGameState(prev => {
                    let c = prev.gameClock + 100;
                    if (c >= 2400) c = 0;
                    let td: TimeOfDay = "day";
                    if (c < 600) td = "night"; else if (c < 1000) td = "morning"; else if (c < 1800) td = "day"; else td = "evening";
                    return { ...prev, gameClock: c, timeOfDay: td };
                });
            }

            // === RENDER ===
            // Camera smoothing
            const targetCamX = nx + 8 - CANVAS_W / 2;
            const targetCamY = ny + 8 - CANVAS_H / 2;
            const camX = cameraRef.current.x += (targetCamX - cameraRef.current.x) * 0.08;
            const camY = cameraRef.current.y += (targetCamY - cameraRef.current.y) * 0.08;
            const clampedCX = Math.max(0, Math.min(camX, mapPxW - CANVAS_W));
            const clampedCY = Math.max(0, Math.min(camY, mapPxH - CANVAS_H));

            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.fillStyle = map.colorFloor;
            ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
            ctx.restore();

            ctx.save();
            ctx.translate(-clampedCX, -clampedCY);

            // Draw tiles
            const startCol = Math.max(0, Math.floor(clampedCX / TILE));
            const endCol = Math.min(map.width, Math.ceil((clampedCX + CANVAS_W) / TILE) + 1);
            const startRow = Math.max(0, Math.floor(clampedCY / TILE));
            const endRow = Math.min(map.height, Math.ceil((clampedCY + CANVAS_H) / TILE) + 1);

            for (let r = startRow; r < endRow; r++) {
                for (let c = startCol; c < endCol; c++) {
                    const t = map.tileGrid[r][c];
                    const tx = c * TILE, ty = r * TILE;
                    if (t === 0) { ctx.fillStyle = map.colorFloor; ctx.fillRect(tx, ty, TILE, TILE); }
                    else if (t === 1) {
                        ctx.fillStyle = map.colorWall; ctx.fillRect(tx, ty, TILE, TILE);
                        ctx.strokeStyle = "rgba(0,0,0,0.2)"; ctx.strokeRect(tx + 0.5, ty + 0.5, TILE - 1, TILE - 1);
                    }
                    else if (t === 2) {
                        ctx.fillStyle = "#334155"; ctx.fillRect(tx, ty, TILE, TILE);
                        ctx.fillStyle = "rgba(255,255,255,0.04)";
                        ctx.fillRect(tx + 2, ty + 2, 4, 4); ctx.fillRect(tx + 10, ty + 10, 4, 4);
                    }
                    else if (t === 3) {
                        ctx.fillStyle = "#64748b"; ctx.fillRect(tx, ty, TILE, TILE);
                        ctx.strokeStyle = "rgba(0,0,0,0.15)"; ctx.strokeRect(tx + 1, ty + 1, TILE - 2, TILE - 2);
                    }
                    else if (t === 4) {
                        ctx.fillStyle = "#166534"; ctx.fillRect(tx, ty, TILE, TILE);
                        if ((r + c) % 3 === 0) { ctx.fillStyle = "#15803d"; ctx.fillRect(tx + 4, ty + 4, 2, 2); }
                    }
                    else if (t === 5) {
                        const waveOff = Math.sin(frameCountRef.current * 0.04 + c * 0.5 + r * 0.3) * 15;
                        ctx.fillStyle = `rgb(${30 + waveOff}, ${100 + waveOff}, ${200 + waveOff})`;
                        ctx.fillRect(tx, ty, TILE, TILE);
                    }
                }
            }

            // Draw objects
            for (const obj of map.objects) {
                const ox = obj.x * TILE, oy = obj.y * TILE;
                if (obj.sprite === "coffee") { ctx.fillStyle = "#92400e"; ctx.fillRect(ox + 4, oy + 4, 24, 24); ctx.fillStyle = "#fbbf24"; ctx.fillRect(ox + 8, oy + 2, 16, 4); }
                else if (obj.sprite === "server") { ctx.fillStyle = "#1e3a8a"; ctx.fillRect(ox, oy, 16, 32); ctx.fillStyle = "#3b82f6"; for (let i = 0; i < 4; i++) ctx.fillRect(ox + 3, oy + 4 + i * 7, 10, 3); }
                else if (obj.sprite === "laptop") { ctx.fillStyle = "#334155"; ctx.fillRect(ox + 2, oy + 4, 28, 20); ctx.fillStyle = "#10b981"; ctx.fillRect(ox + 4, oy + 6, 24, 14); }
                else if (obj.sprite === "books") { ctx.fillStyle = "#78350f"; ctx.fillRect(ox, oy, 32, 32); ctx.fillStyle = "#f59e0b"; for (let i = 0; i < 5; i++) ctx.fillRect(ox + 2 + i * 6, oy + 2, 4, 28); }
                else if (obj.sprite === "desk") { ctx.fillStyle = "#44403c"; ctx.fillRect(ox, oy + 8, 32, 24); ctx.fillStyle = "#78716c"; ctx.fillRect(ox + 2, oy, 28, 10); }
                else if (obj.sprite === "portal") {
                    const pulse = Math.sin(frameCountRef.current * 0.06) * 30;
                    ctx.fillStyle = `rgb(${100 + pulse}, ${50}, ${200 + pulse})`; ctx.fillRect(ox + 4, oy + 2, 24, 28);
                    ctx.fillStyle = `rgba(168, 85, 247, ${0.4 + Math.sin(frameCountRef.current * 0.08) * 0.3})`; ctx.fillRect(ox + 8, oy + 6, 16, 20);
                }
                else { ctx.fillStyle = "#475569"; ctx.fillRect(ox, oy, obj.width, obj.height); }
            }

            // Draw collectibles
            for (const item of map.collectibles) {
                if (item.collected) continue;
                const ix = item.x * TILE, iy = item.y * TILE;
                const bob = Math.sin(frameCountRef.current * 0.08 + item.x) * 3;
                ctx.fillStyle = "#fbbf24";
                ctx.fillRect(ix + 3, iy + 3 + bob, 10, 10);
                ctx.fillStyle = "#f59e0b";
                ctx.fillRect(ix + 5, iy + 5 + bob, 6, 6);
            }

            // Draw NPCs
            for (const npc of map.npcs) {
                const npx = npc.x * TILE, npy = npc.y * TILE;
                if (npc.sprite === "cat") {
                    ctx.fillStyle = "#f97316"; ctx.fillRect(npx + 2, npy + 4, 12, 8);
                    ctx.fillRect(npx + 2, npy + 2, 4, 3); ctx.fillRect(npx + 10, npy + 2, 4, 3);
                    ctx.fillStyle = "#000"; ctx.fillRect(npx + 4, npy + 6, 2, 2); ctx.fillRect(npx + 10, npy + 6, 2, 2);
                } else {
                    ctx.fillStyle = "#a78bfa"; ctx.fillRect(npx + 2, npy + 2, 12, 12);
                    ctx.fillStyle = "#7c3aed"; ctx.fillRect(npx + 4, npy + 4, 3, 3); ctx.fillRect(npx + 9, npy + 4, 3, 3);
                    ctx.fillStyle = "#c4b5fd"; ctx.fillRect(npx + 5, npy + 9, 6, 2);
                }
            }

            // Draw player
            const animFrame = isMoving ? Math.floor(frameCountRef.current / 8) % 4 : 0;
            const ppx = nx, ppy = ny;
            // Body
            ctx.fillStyle = s.customization.shirtColor;
            ctx.fillRect(ppx + 3, ppy + 4, 10, 8);
            // Head
            ctx.fillStyle = "#fbbf24";
            ctx.fillRect(ppx + 4, ppy, 8, 6);
            // Eyes
            const eyeOff = s.playerDir === "left" ? -1 : s.playerDir === "right" ? 1 : 0;
            ctx.fillStyle = "#000";
            ctx.fillRect(ppx + 5 + eyeOff, ppy + 2, 2, 2);
            ctx.fillRect(ppx + 9 + eyeOff, ppy + 2, 2, 2);
            // Legs
            ctx.fillStyle = s.customization.pantsColor;
            const legOff = isMoving ? (animFrame % 2 === 0 ? 1 : -1) : 0;
            ctx.fillRect(ppx + 4, ppy + 12, 3, 4 + legOff);
            ctx.fillRect(ppx + 9, ppy + 12, 3, 4 - legOff);

            // Particles
            particlesRef.current = particlesRef.current.filter(p => {
                p.x += p.vx; p.y += p.vy; p.life++;
                if (p.life >= p.maxLife) return false;
                const alpha = 1 - p.life / p.maxLife;
                ctx.globalAlpha = alpha;
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
                ctx.globalAlpha = 1;
                return true;
            });

            ctx.restore();

            // Day/night tint overlay
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            if (s.timeOfDay === "night") { ctx.fillStyle = "rgba(10, 20, 60, 0.45)"; ctx.fillRect(0, 0, CANVAS_W, CANVAS_H); }
            else if (s.timeOfDay === "evening") { ctx.fillStyle = "rgba(80, 40, 10, 0.2)"; ctx.fillRect(0, 0, CANVAS_W, CANVAS_H); }
            else if (s.timeOfDay === "morning") { ctx.fillStyle = "rgba(255, 220, 100, 0.08)"; ctx.fillRect(0, 0, CANVAS_W, CANVAS_H); }
            ctx.restore();

            // HUD
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.font = "bold 10px monospace";
            // Top-left: location
            ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(4, 4, 120, 20);
            ctx.fillStyle = "#10b981"; ctx.fillText(s.currentLocation.toUpperCase(), 8, 17);
            // Top-right: coins + fragments
            ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(CANVAS_W - 130, 4, 126, 20);
            ctx.fillStyle = "#fbbf24"; ctx.fillText("COINS:" + s.coins, CANVAS_W - 126, 17);
            ctx.fillStyle = "#a78bfa"; ctx.fillText("FRAGS:" + s.collectibles + "/5", CANVAS_W - 64, 17);
            // Clock
            const clockStr = s.timeOfDay.toUpperCase();
            ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(CANVAS_W / 2 - 30, 4, 60, 14);
            ctx.fillStyle = "#e2e8f0"; ctx.font = "8px monospace"; ctx.fillText(clockStr, CANVAS_W / 2 - 18, 14);
            ctx.restore();

            // Mini-map (bottom-right corner)
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            const mmW = 80, mmH = 80;
            const mmX = CANVAS_W - mmW - 6, mmY = CANVAS_H - mmH - 6;
            ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(mmX - 1, mmY - 1, mmW + 2, mmH + 2);
            ctx.strokeStyle = "#475569"; ctx.strokeRect(mmX - 1, mmY - 1, mmW + 2, mmH + 2);
            const scaleX = mmW / mapPxW, scaleY = mmH / mapPxH;
            // Draw minimap tiles (simplified)
            for (let r = 0; r < map.height; r += 2) {
                for (let c = 0; c < map.width; c += 2) {
                    const t = map.tileGrid[r][c];
                    if (t === 1) ctx.fillStyle = "#475569";
                    else if (t === 5) ctx.fillStyle = "#2563eb";
                    else if (t === 3) ctx.fillStyle = "#64748b";
                    else if (t === 4) ctx.fillStyle = "#166534";
                    else ctx.fillStyle = "#1e293b";
                    ctx.fillRect(mmX + c * TILE * scaleX, mmY + r * TILE * scaleY, Math.max(1, 2 * TILE * scaleX), Math.max(1, 2 * TILE * scaleY));
                }
            }
            // Player dot on minimap
            ctx.fillStyle = "#ef4444";
            ctx.fillRect(mmX + nx * scaleX - 1, mmY + ny * scaleY - 1, 3, 3);
            ctx.restore();

            // Dialogue box
            if (s.dialogueActive) {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                const dbY = CANVAS_H - 70;
                ctx.fillStyle = "rgba(8, 27, 58, 0.92)"; ctx.fillRect(10, dbY, CANVAS_W - 20, 60);
                ctx.strokeStyle = "#10b981"; ctx.lineWidth = 2; ctx.strokeRect(10, dbY, CANVAS_W - 20, 60);
                ctx.font = "bold 9px monospace"; ctx.fillStyle = "#10b981"; ctx.fillText(s.dialogueSpeaker, 18, dbY + 14);
                ctx.font = "10px monospace"; ctx.fillStyle = "#e2e8f0";
                const txt = s.dialogueText;
                // Word wrap
                const maxCharsPerLine = Math.floor((CANVAS_W - 40) / 6);
                const words = txt.split(" ");
                let line = "", lineY = dbY + 28;
                for (const word of words) {
                    if ((line + " " + word).length > maxCharsPerLine) {
                        ctx.fillText(line, 18, lineY); lineY += 13; line = word;
                    } else { line = line ? line + " " + word : word; }
                }
                ctx.fillText(line, 18, lineY);
                ctx.font = "8px monospace"; ctx.fillStyle = "#94a3b8";
                ctx.fillText("[E/SPACE] continue", CANVAS_W - 130, dbY + 52);
                ctx.restore();

                // Typewriter effect
                if (s.dialogueCharIndex < s.fullDialogue[s.dialogueIndex].length) {
                    setGameState(prev => ({
                        ...prev,
                        dialogueCharIndex: Math.min(prev.dialogueCharIndex + 1, prev.fullDialogue[prev.dialogueIndex].length),
                        dialogueText: prev.fullDialogue[prev.dialogueIndex].substring(0, prev.dialogueCharIndex + 1)
                    }));
                }
            }

            // Interaction indicator
            if (!s.dialogueActive) {
                const px2 = s.playerPos.x + 8, py2 = s.playerPos.y + 8;
                let nearObj = false;
                for (const obj of map.objects) {
                    if (Math.hypot(px2 - (obj.x * TILE + obj.width / 2), py2 - (obj.y * TILE + obj.height / 2)) < 28) { nearObj = true; break; }
                }
                if (!nearObj) {
                    for (const npc of map.npcs) {
                        if (Math.hypot(px2 - (npc.x * TILE + npc.width / 2), py2 - (npc.y * TILE + npc.height / 2)) < 28) { nearObj = true; break; }
                    }
                }
                if (nearObj) {
                    ctx.save();
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.fillStyle = "rgba(0,0,0,0.7)"; ctx.fillRect(CANVAS_W / 2 - 20, CANVAS_H - 24, 40, 16);
                    ctx.strokeStyle = "#10b981"; ctx.strokeRect(CANVAS_W / 2 - 20, CANVAS_H - 24, 40, 16);
                    ctx.font = "bold 8px monospace"; ctx.fillStyle = "#10b981"; ctx.fillText("[E]", CANVAS_W / 2 - 8, CANVAS_H - 13);
                    ctx.restore();
                }
            }

            animId = requestAnimationFrame(loop);
        };

        animId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animId);
    }, [screen, gameState.activeMiniGame, gameState.currentLocation, saveProgress, triggerDialogue, unlockAchievement]);

    // Handle new game / continue
    const startGame = (isNew: boolean) => {
        if (isNew) {
            localStorage.removeItem("carty_game_save_v2");
            setGameState(initState());
        }
        unlockAchievement("first_steps");
        setScreen("playing");
    };

    // Mobile controls
    const mobileMove = (dir: string) => { keysRef.current = {}; keysRef.current[dir] = true; };
    const mobileStop = () => { keysRef.current = {}; };

    // ========== RENDER ==========
    if (gameState.activeMiniGame) {
        const mg = gameState.activeMiniGame;
        return (
            <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
                {mg === "space_dodger" && <SpaceDodger onClose={handleMiniGameClose} />}
                {mg === "memory_match" && <MemoryMatch onClose={handleMiniGameClose} />}
                {mg === "reaction_test" && <ReactionTest onClose={handleMiniGameClose} />}
                {mg === "coffee" && <CoffeeBrewGame onClose={handleMiniGameClose} />}
                {mg === "fishing" && <FishingMiniGame onClose={handleMiniGameClose} />}
                {mg === "gym" && <GymReactionGame onClose={handleMiniGameClose} />}
            </div>
        );
    }

    // Title Screen
    if (screen === "title") {
        return (
            <div className="fixed inset-0 z-[9999] bg-[#040f24] flex flex-col items-center justify-center gap-6 select-none"
                style={{ imageRendering: "pixelated" }}>
                <div className="text-center">
                    <h1 className="text-2xl md:text-4xl font-mono font-black text-[#10b981] tracking-widest uppercase mb-2">
                        Carty&apos;s Little World
                    </h1>
                    <p className="text-xs md:text-sm font-mono text-slate-400 max-w-sm mx-auto">
                        A tiny world about a slightly complicated human.
                    </p>
                </div>
                <div className="flex flex-col gap-3 mt-4 w-48">
                    <button onClick={() => startGame(false)}
                        className="py-2.5 bg-[#10b981] hover:bg-[#059669] text-[#040f24] font-mono text-sm font-black uppercase tracking-wider rounded border-2 border-[#059669] shadow-[0_4px_0_#047857] active:translate-y-0.5 active:shadow-[0_2px_0_#047857]">
                        CONTINUE
                    </button>
                    <button onClick={() => startGame(true)}
                        className="py-2.5 bg-[#1e293b] hover:bg-[#334155] text-slate-200 font-mono text-sm font-bold uppercase tracking-wider rounded border-2 border-slate-600 shadow-[0_4px_0_#0f172a] active:translate-y-0.5 active:shadow-[0_2px_0_#0f172a]">
                        NEW GAME
                    </button>
                </div>
                <p className="text-[9px] font-mono text-slate-600 mt-8">WASD to move | E to interact | ESC for menu | M for map</p>
            </div>
        );
    }

    // Menu Screen
    if (screen === "menu") {
        const achs = gameState.achievements;
        return (
            <div className="fixed inset-0 z-[9999] bg-[#040f24]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4 select-none p-4">
                <h2 className="font-mono text-lg text-[#10b981] font-black uppercase tracking-widest">MENU</h2>
                <div className="w-full max-w-sm bg-[#0f172a] border-2 border-slate-700 rounded-lg p-4 max-h-[60vh] overflow-y-auto">
                    <p className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-3">Achievements ({achs.filter(a => a.unlocked).length}/{achs.length})</p>
                    <div className="space-y-2">
                        {achs.map(a => (
                            <div key={a.id} className={`flex items-center gap-3 p-2 rounded border ${a.unlocked ? "border-emerald-800 bg-emerald-950/40" : "border-slate-800 bg-slate-900/50 opacity-50"}`}>
                                <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${a.unlocked ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-600"}`}>
                                    {a.unlocked ? "*" : "?"}
                                </div>
                                <div>
                                    <div className="font-mono text-[10px] font-bold text-slate-200">{a.title}</div>
                                    <div className="font-mono text-[8px] text-slate-500">{a.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 border-t border-slate-800 pt-3">
                        <p className="font-mono text-xs text-slate-400 mb-2">Stats</p>
                        <div className="font-mono text-[10px] text-slate-300 space-y-1">
                            <div>Coins: {gameState.coins}</div>
                            <div>Fragments: {gameState.collectibles}/5</div>
                            <div>Locations: {gameState.discoveredLocations.length}/{ALL_LOCATIONS.length}</div>
                            <div>Lore Items: {gameState.loreRead.length}</div>
                            <div>Fish Caught: {gameState.fishCaught.length}</div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 mt-2">
                    <button onClick={() => setScreen("playing")} className="px-5 py-2 bg-[#10b981] hover:bg-[#059669] text-[#040f24] font-mono text-xs font-bold uppercase rounded border-2 border-[#059669]">Resume</button>
                    <button onClick={toggleMute} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs uppercase rounded border border-slate-600">
                        Sound: {soundMuted ? "OFF" : "ON"}
                    </button>
                    <button onClick={onExit} className="px-4 py-2 bg-red-900 hover:bg-red-800 text-red-200 font-mono text-xs uppercase rounded border border-red-700">Exit Game</button>
                </div>
            </div>
        );
    }

    // Map Screen
    if (screen === "map") {
        return (
            <div className="fixed inset-0 z-[9999] bg-[#040f24]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4 select-none p-4">
                <h2 className="font-mono text-lg text-[#10b981] font-black uppercase tracking-widest">WORLD MAP</h2>
                <div className="grid grid-cols-3 gap-2 max-w-xs">
                    {ALL_LOCATIONS.filter(l => l !== "secret").map(loc => {
                        const discovered = gameState.discoveredLocations.includes(loc);
                        const isCurrent = gameState.currentLocation === loc;
                        return (
                            <div key={loc} className={`p-3 rounded border font-mono text-[10px] text-center uppercase tracking-wider ${isCurrent ? "border-emerald-500 bg-emerald-950/60 text-emerald-300" :
                                    discovered ? "border-slate-600 bg-slate-900/60 text-slate-300" :
                                        "border-slate-800 bg-slate-950 text-slate-700"
                                }`}>
                                {discovered ? loc : "???"}
                                {isCurrent && <div className="text-[8px] text-emerald-400 mt-0.5">[HERE]</div>}
                            </div>
                        );
                    })}
                </div>
                <button onClick={() => setScreen("playing")} className="mt-4 px-5 py-2 bg-[#10b981] hover:bg-[#059669] text-[#040f24] font-mono text-xs font-bold uppercase rounded border-2 border-[#059669]">Close Map</button>
            </div>
        );
    }

    // Playing Screen
    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-black flex items-center justify-center select-none"
            style={{ touchAction: "none" }}>
            <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H}
                style={{ width: canvasSize.w, height: canvasSize.h, imageRendering: "pixelated" }}
                className="block" />

            {/* Mobile Controls */}
            <div className="md:hidden fixed bottom-4 left-4 flex flex-col items-center gap-1 z-[10000]">
                <button onTouchStart={() => mobileMove("arrowup")} onTouchEnd={mobileStop} className="w-12 h-12 bg-slate-800/80 rounded border border-slate-600 text-slate-300 font-mono text-xs font-bold active:bg-slate-700">W</button>
                <div className="flex gap-1">
                    <button onTouchStart={() => mobileMove("arrowleft")} onTouchEnd={mobileStop} className="w-12 h-12 bg-slate-800/80 rounded border border-slate-600 text-slate-300 font-mono text-xs font-bold active:bg-slate-700">A</button>
                    <button onTouchStart={() => mobileMove("arrowdown")} onTouchEnd={mobileStop} className="w-12 h-12 bg-slate-800/80 rounded border border-slate-600 text-slate-300 font-mono text-xs font-bold active:bg-slate-700">S</button>
                    <button onTouchStart={() => mobileMove("arrowright")} onTouchEnd={mobileStop} className="w-12 h-12 bg-slate-800/80 rounded border border-slate-600 text-slate-300 font-mono text-xs font-bold active:bg-slate-700">D</button>
                </div>
            </div>
            <div className="md:hidden fixed bottom-4 right-4 flex flex-col gap-2 z-[10000]">
                <button onClick={() => { if (gameState.dialogueActive) advanceDialogue(); else handleInteract(); }}
                    className="w-14 h-14 rounded-full bg-emerald-700/80 border-2 border-emerald-500 text-white font-mono text-xs font-bold active:bg-emerald-600">ACT</button>
                <button onClick={() => setScreen("menu")}
                    className="w-14 h-10 rounded bg-slate-800/80 border border-slate-600 text-slate-300 font-mono text-[9px] font-bold active:bg-slate-700">MENU</button>
            </div>
        </div>
    );
}
