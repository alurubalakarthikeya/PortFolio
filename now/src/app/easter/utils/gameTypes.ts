export type GameLocation = 'town' | 'bedroom' | 'cafe' | 'lab' | 'library' | 'arcade' | 'shop' | 'park' | 'training' | 'secret';

export interface GameObject {
    id: string;
    name: string;
    sprite: string;
    x: number;
    y: number;
    width: number;
    height: number;
    interactable: boolean;
    solid: boolean;
    dialogue?: string[];
    solvedDialogue?: string[];
    triggerQuestObjective?: string;
    givesItem?: string;
    requiresItem?: string;
    achievementId?: string;
    miniGame?: 'coffee' | 'bug_hunt' | 'space_dodger' | 'memory_match' | 'reaction_test' | 'fishing' | 'gym';
}

export interface NPC {
    id: string;
    name: string;
    sprite: string;
    x: number;
    y: number;
    width: number;
    height: number;
    dialogue: string[];
    questDialogue?: Record<string, string[]>;
    solvedDialogue?: string[];
    movementPattern?: 'static' | 'wander';
    wanderRange?: number;
    direction?: 'down' | 'up' | 'left' | 'right';
    flipX?: boolean;
}

export interface CollectibleItem {
    id: string;
    name: string;
    sprite: string;
    x: number;
    y: number;
    width: number;
    height: number;
    collected: boolean;
    type: 'fragment' | 'coffee' | 'key' | 'coin' | 'token';
    achievementId?: string;
}

export interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    life: number;
    maxLife: number;
    size: number;
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    status: 'inactive' | 'active' | 'completed';
    objectives: {
        id: string;
        description: string;
        completed: boolean;
    }[];
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    unlocked: boolean;
    unlockedAt?: string;
}

export type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';

export interface PlayerCustomization {
    hair: number;
    shirtColor: string;
    pantsColor: string;
}

export interface GameState {
    currentLocation: GameLocation;
    playerPos: { x: number; y: number };
    playerDir: 'down' | 'up' | 'left' | 'right';
    playerMoving: boolean;
    hp: number;
    coins: number;
    collectibles: number;
    questProgress: number;
    inventory: string[];
    quest: Quest;
    achievements: Achievement[];
    discoveredLocations: GameLocation[];
    secretFound: boolean;
    loreRead: string[];
    gameCompleted: boolean;
    showEnding: boolean;
    dialogueText: string;
    fullDialogue: string[];
    dialogueIndex: number;
    dialogueSpeaker: string;
    dialogueCharIndex: number;
    dialogueActive: boolean;
    timeOfDay: TimeOfDay;
    gameClock: number; // 0-2400 in-game clock
    customization: PlayerCustomization;
    activeMiniGame: string | null;
    fishCaught: string[];
    miniGameScores: Record<string, number>;
}
