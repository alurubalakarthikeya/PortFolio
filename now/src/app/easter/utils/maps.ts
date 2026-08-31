import { GameLocation, GameObject, NPC, CollectibleItem } from './gameTypes';

export interface MapData {
    width: number;
    height: number;
    tileGrid: number[][];
    colorFloor: string;
    colorWall: string;
    objects: GameObject[];
    npcs: NPC[];
    collectibles: CollectibleItem[];
    doorways: {
        x: number;
        y: number;
        targetLocation: GameLocation;
        targetX: number;
        targetY: number;
    }[];
}

// Tile values:
// 0 = Dirt/ground (walkable)
// 1 = Solid wall or obstacle (brick/fence)
// 2 = Floor rug / interior floor wood (walkable)
// 3 = Cobblestone path / street (walkable)
// 4 = Grass grass (walkable)
// 5 = Water / pond (solid block, cannot pass)

const createGrid = (w: number, h: number, fill = 0): number[][] => {
    const grid: number[][] = [];
    for (let y = 0; y < h; y++) {
        const row: number[] = [];
        for (let x = 0; x < w; x++) {
            if (x === 0 || x === w - 1 || y === 0 || y === h - 1) {
                row.push(1); // solid border
            } else {
                row.push(fill);
            }
        }
        grid.push(row);
    }
    return grid;
};

// ==========================================
// 1. TOWN SQUARE (Main Outdoor Map: 40 x 40)
// ==========================================
const townGrid = createGrid(40, 40, 4); // default is grass

// Define roads (3 = Cobblestone path)
// Vertical main road down the middle x=19, 20
for (let y = 1; y < 39; y++) {
    townGrid[y][19] = 3;
    townGrid[y][20] = 3;
}
// Horizontal main road through the center y=19, 20
for (let x = 1; x < 39; x++) {
    townGrid[19][x] = 3;
    townGrid[20][x] = 3;
}

// Add water barrier (pond) in top-left quadrant (x=4..12, y=4..10)
for (let y = 4; y <= 10; y++) {
    for (let x = 4; x <= 12; x++) {
        townGrid[y][x] = 5;
    }
}
// Add bridges over water
townGrid[7][8] = 3;
townGrid[7][9] = 3;

// Place buildings in Town (represented as outer solid blocks with doorways)
// Top-Right: Engineering Lab (x=24..28, y=4..7)
for (let y = 4; y <= 7; y++) {
    for (let x = 24; x <= 28; x++) {
        townGrid[y][x] = 1;
    }
}
townGrid[7][26] = 3; // door entry point for Lab at (26, 7)

// Top-Right-Far: Library (x=32..36, y=4..7)
for (let y = 4; y <= 7; y++) {
    for (let x = 32; x <= 36; x++) {
        townGrid[y][x] = 1;
    }
}
townGrid[7][34] = 3; // door entry point at (34, 7)

// Center-Right: Café (x=24..28, y=12..15)
for (let y = 12; y <= 15; y++) {
    for (let x = 24; x <= 28; x++) {
        townGrid[y][x] = 1;
    }
}
townGrid[15][26] = 3; // door entry point for Café at (26, 15)

// Center-Right-Far: Shops (x=32..36, y=12..15)
for (let y = 12; y <= 15; y++) {
    for (let x = 32; x <= 36; x++) {
        townGrid[y][x] = 1;
    }
}
townGrid[15][34] = 3; // door entry point for Shop at (34, 15)

// Bottom-Left: Carty's Room (x=4..8, y=24..27)
for (let y = 24; y <= 27; y++) {
    for (let x = 4; x <= 8; x++) {
        townGrid[y][x] = 1;
    }
}
townGrid[27][6] = 3; // door entry point for Room at (6, 27)

// Bottom-Right: Arcade (x=24..28, y=24..27)
for (let y = 24; y <= 27; y++) {
    for (let x = 24; x <= 28; x++) {
        townGrid[y][x] = 1;
    }
}
townGrid[27][26] = 3; // door entry point for Arcade at (26, 27)

// Bottom-Right-Far: Training Area (x=32..36, y=24..27)
// Instead of separate screen, make it an open gym or building entrance
for (let y = 24; y <= 27; y++) {
    for (let x = 32; x <= 36; x++) {
        townGrid[y][x] = 1;
    }
}
townGrid[27][34] = 3; // entry point for Training Area

// West: Park entrance (goes to page-level map 'park')
// Let's place a transitional path at (1, 10) that leads to Park map, and (1, 11)
townGrid[10][1] = 3;
townGrid[11][1] = 3;

// ==========================================
// 2. CARTY'S ROOM (Interior: 20 x 15)
// ==========================================
const bedroomGrid = createGrid(20, 15, 0);
for (let y = 3; y <= 11; y++) {
    for (let x = 3; x <= 16; x++) {
        bedroomGrid[y][x] = 2; // wooden-like carpet floor
    }
}
bedroomGrid[13][10] = 0; // exit door step
bedroomGrid[1][15] = 0;  // secret doorway on wall

// ==========================================
// 3. CAFÉ (Interior: 20 x 15)
// ==========================================
const cafeGrid = createGrid(20, 15, 0);
for (let y = 2; y <= 12; y++) {
    for (let x = 2; x <= 17; x++) {
        cafeGrid[y][x] = 2; // carpet
    }
}
// Counter blocks inside Café (solid)
for (let x = 4; x <= 14; x++) {
    cafeGrid[5][x] = 1;
}
cafeGrid[13][10] = 0; // exit step

// ==========================================
// 4. ENGINEERING LAB (Interior: 20 x 15)
// ==========================================
const labGrid = createGrid(20, 15, 0);
for (let y = 2; y <= 12; y++) {
    for (let x = 2; x <= 17; x++) {
        labGrid[y][x] = 0; // dark metallic tiles
    }
}
// Columns for servers (solid)
for (let x = 4; x <= 15; x += 3) {
    labGrid[3][x] = 1;
    labGrid[4][x] = 1;
    labGrid[8][x] = 1;
    labGrid[9][x] = 1;
}
labGrid[13][10] = 0; // exit step

// ==========================================
// 5. LIBRARY (Interior: 20 x 15)
// ==========================================
const libraryGrid = createGrid(20, 15, 0);
for (let y = 2; y <= 12; y++) {
    for (let x = 2; x <= 17; x++) {
        libraryGrid[y][x] = 2;
    }
}
// Bookcase columns (solid)
for (let y = 3; y <= 9; y += 3) {
    for (let x = 3; x <= 16; x++) {
        // Leave gaps in center to walk around
        if (x !== 9 && x !== 10) {
            libraryGrid[y][x] = 1;
        }
    }
}
libraryGrid[13][10] = 0; // exit step

// ==========================================
// 6. ARCADE (Interior: 20 x 15)
// ==========================================
const arcadeGrid = createGrid(20, 15, 0);
for (let y = 2; y <= 12; y++) {
    for (let x = 2; x <= 17; x++) {
        arcadeGrid[y][x] = 0;
    }
}
// Arcade cabinet placements (solid)
arcadeGrid[3][4] = 1;
arcadeGrid[3][8] = 1;
arcadeGrid[3][12] = 1;
arcadeGrid[13][10] = 0; // exit step

// ==========================================
// 7. SHOPS (Interior: 20 x 15)
// ==========================================
const shopGrid = createGrid(20, 15, 0);
for (let y = 2; y <= 12; y++) {
    for (let x = 2; x <= 17; x++) {
        shopGrid[y][x] = 2;
    }
}
// Merchant desk (solid)
for (let x = 6; x <= 13; x++) {
    shopGrid[4][x] = 1;
}
shopGrid[13][10] = 0; // exit step

// ==========================================
// 8. PARK (Outdoor Path Map: 30 x 30)
// ==========================================
const parkGrid = createGrid(30, 30, 4); // grass
// A large lake on the left (x=2..14, y=4..24)
for (let y = 4; y <= 24; y++) {
    for (let x = 2; x <= 14; x++) {
        parkGrid[y][x] = 5; // water
    }
}
// Fisherman pier extending into the lake
for (let x = 11; x <= 16; x++) {
    parkGrid[12][x] = 3; // wooden bridge path
}
// Paths from the town entrance (right border) to the pier
for (let y = 10; y <= 14; y++) {
    parkGrid[y][28] = 3;
}
for (let x = 16; x <= 28; x++) {
    parkGrid[12][x] = 3;
}

// ==========================================
// 9. TRAINING AREA (Interior: 20 x 15)
// ==========================================
const trainingGrid = createGrid(20, 15, 0);
for (let y = 2; y <= 12; y++) {
    for (let x = 2; x <= 17; x++) {
        trainingGrid[y][x] = 0; // smooth composite floor
    }
}
// Solid gym lockers/benches
for (let x = 3; x <= 7; x++) {
    trainingGrid[2][x] = 1;
}
for (let x = 12; x <= 16; x++) {
    trainingGrid[2][x] = 1;
}
trainingGrid[13][10] = 0; // exit step

// ==========================================
// 10. SECRET AREA (Interior: 20 x 15)
// ==========================================
const secretGrid = createGrid(20, 15, 2);
for (let y = 3; y <= 11; y++) {
    for (let x = 3; x <= 16; x++) {
        secretGrid[y][x] = 2; // red carpet tiles
    }
}
secretGrid[13][10] = 0; // exit step


export const MAPS: Record<GameLocation, MapData> = {
    town: {
        width: 40,
        height: 40,
        tileGrid: townGrid,
        colorFloor: '#1e3a8a',
        colorWall: '#0f172a',
        doorways: [
            { x: 26, y: 7, targetLocation: 'lab', targetX: 10, targetY: 12 },
            { x: 34, y: 7, targetLocation: 'library', targetX: 10, targetY: 12 },
            { x: 26, y: 15, targetLocation: 'cafe', targetX: 10, targetY: 12 },
            { x: 34, y: 15, targetLocation: 'shop', targetX: 10, targetY: 12 },
            { x: 6, y: 27, targetLocation: 'bedroom', targetX: 10, targetY: 12 },
            { x: 26, y: 27, targetLocation: 'arcade', targetX: 10, targetY: 12 },
            { x: 34, y: 27, targetLocation: 'training', targetX: 10, targetY: 12 },
            { x: 1, y: 10, targetLocation: 'park', targetX: 27, targetY: 12 },
            { x: 1, y: 11, targetLocation: 'park', targetX: 27, targetY: 12 }
        ],
        objects: [
            {
                id: 'town_fountain',
                name: 'Main Town Fountain',
                sprite: 'portal',
                x: 18,
                y: 17,
                width: 32,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'The central fountain of Carty Town.',
                    'The water streams dynamically in smooth loops.',
                    'A tiny plaque reads: Curiosity builds the future.'
                ]
            },
            {
                id: 'town_signpost',
                name: 'Guide Signpost',
                sprite: 'books',
                x: 22,
                y: 19,
                width: 16,
                height: 16,
                interactable: true,
                solid: true,
                dialogue: [
                    'North: Engineering Lab and Library.',
                    'East: Cozy Cafe and Cosmetics Shop.',
                    'South: Carty Room and Retro Arcade.',
                    'West: peaceful Park grounds and Training Area.'
                ]
            }
        ],
        npcs: [
            {
                id: 'town_guide',
                name: 'Town Mayor',
                sprite: 'goblin',
                x: 21,
                y: 21,
                width: 16,
                height: 16,
                dialogue: [
                    'Welcome to Carty Town, traveler!',
                    'This is a cozy standalone simulation of Aluru Bala Karthikeya.',
                    'Explore the buildings to discover his interests and projects.',
                    'Earn coins by playing mini-games around the town, then spend them!',
                    'Try returning to your personal room to customize it with furniture.'
                ]
            },
            {
                id: 'town_walker',
                name: 'Wandering Citizen',
                sprite: 'cat',
                x: 10,
                y: 22,
                width: 16,
                height: 16,
                dialogue: [
                    'I love wandering down these cobblestone streets.',
                    'Have you checked the Café? The coffee making mini-game yields rich coins.',
                    'Also, there is a rumors of a Secret chamber hidden somewhere in the Library.'
                ]
            }
        ],
        collectibles: [
            {
                id: 'frag_town_1',
                name: 'Curiosity Spark',
                sprite: 'fragment',
                x: 37,
                y: 3,
                width: 16,
                height: 16,
                type: 'fragment',
                collected: false
            }
        ]
    },

    bedroom: {
        width: 20,
        height: 15,
        tileGrid: bedroomGrid,
        colorFloor: '#0f172a',
        colorWall: '#1e293b',
        doorways: [
            { x: 10, y: 13, targetLocation: 'town', targetX: 6, targetY: 28 },
            { x: 15, y: 1, targetLocation: 'secret', targetX: 10, targetY: 12 }
        ],
        objects: [
            {
                id: 'bed',
                name: 'Comfortable Bed',
                sprite: 'desk',
                x: 3,
                y: 3,
                width: 32,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'A neat workspace bed.',
                    'Perfect for sleeping off long debugging sessions.',
                    'Under the pillow, there is a notebook with: Focus on curiosity first.'
                ]
            },
            {
                id: 'laptop',
                name: 'Development Laptop',
                sprite: 'laptop',
                x: 8,
                y: 3,
                width: 32,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'Carty`s main workstation.',
                    'The terminal screen flickers with a compiler message:',
                    'ERROR: Missing energy source [COFFEE].',
                    'Main Quest: Brew espresso in the Cafe, then bring it here!'
                ],
                solvedDialogue: [
                    'You delivered the brewed coffee to the laptop.',
                    'Compilation successful! human.exe is executing.',
                    'The Dream portal at the Town fountain has activated!'
                ]
            },
            {
                id: 'bedroom_bookshelf',
                name: 'Illusion Bookshelf',
                sprite: 'books',
                x: 14,
                y: 1,
                width: 32,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'A tall bookshelf stacked with computational logic theories.',
                    'A cold breeze blows from behind it.',
                    'Try stepping straight through the wall or shelf on the right side!'
                ]
            }
        ],
        npcs: [
            {
                id: 'bedroom_cat',
                name: 'Cozy Cat',
                sprite: 'cat',
                x: 12,
                y: 6,
                width: 16,
                height: 16,
                dialogue: [
                    'Mew! Welcome to Carty`s room.',
                    'You can open Room Customizer from your menu [ESC] to drag furniture around.',
                    'Buy furniture from the merchant in the Shop next door!'
                ]
            }
        ],
        collectibles: []
    },

    cafe: {
        width: 20,
        height: 15,
        tileGrid: cafeGrid,
        colorFloor: '#451a03',
        colorWall: '#78350f',
        doorways: [
            { x: 10, y: 13, targetLocation: 'town', targetX: 26, targetY: 16 }
        ],
        objects: [
            {
                id: 'espresso_machine',
                name: 'Commercial Coffee Brewer',
                sprite: 'coffee',
                x: 9,
                y: 3,
                width: 32,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'A heavy chrome espresso brewer.',
                    'Interact nearby to start the Coffee Brewing Mini-game!',
                    'Match the gauges to brew the perfect double shot for coins.'
                ]
            }
        ],
        npcs: [
            {
                id: 'barista',
                name: 'Robo Barista',
                sprite: 'goblin',
                x: 6,
                y: 4,
                width: 16,
                height: 16,
                dialogue: [
                    'Welcome to the Pixel Cafe.',
                    'I serve fresh beverages to keep the compiling loops running.',
                    'You are welcome to use the coffee machine to grind and brew your own.',
                    'Get the timing right and I will reward you with extra coins!'
                ]
            }
        ],
        collectibles: [
            {
                id: 'frag_cafe_1',
                name: 'Caffeine Spark',
                sprite: 'fragment',
                x: 15,
                y: 10,
                width: 16,
                height: 16,
                type: 'fragment',
                collected: false
            }
        ]
    },

    lab: {
        width: 20,
        height: 15,
        tileGrid: labGrid,
        colorFloor: '#020617',
        colorWall: '#1e40af',
        doorways: [
            { x: 10, y: 13, targetLocation: 'town', targetX: 26, targetY: 8 }
        ],
        objects: [
            {
                id: 'terminal_control',
                name: 'Rogue Debug Terminal',
                sprite: 'server',
                x: 3,
                y: 2,
                width: 16,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'System Diagnostics monitor.',
                    'Interact here to start the Bug Hunt Mini-game!',
                    'Catch the escaping bugs of different speeds to earn coins.'
                ]
            }
        ],
        npcs: [
            {
                id: 'lab_tech',
                name: 'Lab Assistant',
                sprite: 'goblin',
                x: 14,
                y: 5,
                width: 16,
                height: 16,
                dialogue: [
                    'My compilers are flooded with runtime exceptions!',
                    'Start the Debug Terminal to begin catching them.',
                    'Different colored bugs have teleportation and acceleration patterns.',
                    'Clean the board for maximum currency points!'
                ]
            }
        ],
        collectibles: [
            {
                id: 'frag_lab_1',
                name: 'Logic Fragment',
                sprite: 'fragment',
                x: 16,
                y: 10,
                width: 16,
                height: 16,
                type: 'fragment',
                collected: false
            }
        ]
    },

    library: {
        width: 20,
        height: 15,
        tileGrid: libraryGrid,
        colorFloor: '#1c1917',
        colorWall: '#44403c',
        doorways: [
            { x: 10, y: 13, targetLocation: 'town', targetX: 34, targetY: 8 }
        ],
        objects: [
            {
                id: 'book_engineering',
                name: 'Engineering Bookcase',
                sprite: 'books',
                x: 3,
                y: 3,
                width: 32,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'Book: Engineering Practices by Carty.',
                    'Technologies of choice: React, Next.js, TypeScript, Node.js, ServiceNow.',
                    'Currently learning: Rust, WebGL, WebAssembly shader scaling.'
                ]
            },
            {
                id: 'book_personality',
                name: 'Personality Scrapbook',
                sprite: 'books',
                x: 13,
                y: 3,
                width: 32,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'Scrapbook: The Quirks of Carty.',
                    'Has exactly 37 browser tabs active at any given moment.',
                    'Writes outlines in physical notebooks rather than digital apps.'
                ]
            },
            {
                id: 'book_favorites',
                name: 'Favorites Logbook',
                sprite: 'books',
                x: 3,
                y: 9,
                width: 32,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'Logbook: Curated Staples.',
                    'Movies: Interstellar, Her, The Social Network.',
                    'Books: The Design of Everyday Things, SICP, Hackers and Painters.'
                ]
            }
        ],
        npcs: [
            {
                id: 'librarian',
                name: 'Quiet Scholar',
                sprite: 'cat',
                x: 10,
                y: 6,
                width: 16,
                height: 16,
                dialogue: [
                    'Shhh! Keep the noise down.',
                    'Inspect the bookcases to read about Carty`s preferences.',
                    'These volumes contain real information from the developer profile.'
                ]
            }
        ],
        collectibles: [
            {
                id: 'frag_lib_1',
                name: 'Education Scrap',
                sprite: 'fragment',
                x: 16,
                y: 11,
                width: 16,
                height: 16,
                type: 'fragment',
                collected: false
            }
        ]
    },

    arcade: {
        width: 20,
        height: 15,
        tileGrid: arcadeGrid,
        colorFloor: '#1e1b4b',
        colorWall: '#312e81',
        doorways: [
            { x: 10, y: 13, targetLocation: 'town', targetX: 26, targetY: 28 }
        ],
        objects: [
            {
                id: 'arcade_cabinet_1',
                name: 'Space Dodger Arcade',
                sprite: 'laptop',
                x: 4,
                y: 3,
                width: 16,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'Cabinet 1: SPACE DODGER.',
                    'Dodge falling objects and test your moving skills.',
                    'Interact close by to play and earn coins!'
                ]
            },
            {
                id: 'arcade_cabinet_2',
                name: 'Memory Match Arcade',
                sprite: 'laptop',
                x: 8,
                y: 3,
                width: 16,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'Cabinet 2: MEMORY MATCH.',
                    'Flip cards and match developer categories.',
                    'Interact close by to play!'
                ]
            },
            {
                id: 'arcade_cabinet_3',
                name: 'Reaction Test Arcade',
                sprite: 'laptop',
                x: 12,
                y: 3,
                width: 16,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'Cabinet 3: REACTION TEST.',
                    'Hit appearing targets under tight time frames.',
                    'Interact nearby to challenge your high score!'
                ]
            }
        ],
        npcs: [
            {
                id: 'arcade_npc',
                name: 'Arcade Champion',
                sprite: 'goblin',
                x: 15,
                y: 7,
                width: 16,
                height: 16,
                dialogue: [
                    'I have the top high score on the Space Dodger cabinet!',
                    'Try to beat it. The coins you collect are added directly to your player purse.',
                    'Use your ESC menu to review unlocked gamer achievements.'
                ]
            }
        ],
        collectibles: []
    },

    shop: {
        width: 20,
        height: 15,
        tileGrid: shopGrid,
        colorFloor: '#134e4a',
        colorWall: '#115e59',
        doorways: [
            { x: 10, y: 13, targetLocation: 'town', targetX: 34, targetY: 16 }
        ],
        objects: [
            {
                id: 'shop_counter',
                name: 'Registration Counter',
                sprite: 'desk',
                x: 9,
                y: 3,
                width: 32,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'Cosmetic and Furniture Exchange counter.',
                    'Purchase customized items using collected coin currency.',
                    'Talk to the Merchant NPC standing beside the desk.'
                ]
            }
        ],
        npcs: [
            {
                id: 'merchant',
                name: 'Merchant Bob',
                sprite: 'goblin',
                x: 7,
                y: 3,
                width: 16,
                height: 16,
                dialogue: [
                    'Welcome, traveler! Want to look stylish?',
                    'You can buy Custom Shirts, Pants, or Room Furniture here.',
                    'Select items from the buy menu. Spend your coins wisely!'
                ]
            }
        ],
        collectibles: []
    },

    park: {
        width: 30,
        height: 30,
        tileGrid: parkGrid,
        colorFloor: '#166534',
        colorWall: '#14532d',
        doorways: [
            { x: 29, y: 12, targetLocation: 'town', targetX: 2, targetY: 11 }
        ],
        objects: [
            {
                id: 'fishing_pier',
                name: 'Wooden Fishing Pier',
                sprite: 'desk',
                x: 11,
                y: 12,
                width: 32,
                height: 16,
                interactable: true,
                solid: false,
                dialogue: [
                    'A quiet wooden pier extending over the lake.',
                    'Step onto the pier to begin the Fishing Mini-game.',
                    'Reel in developer themed fish such as Deadline Carp or Stack Overflow Fish!'
                ]
            }
        ],
        npcs: [
            {
                id: 'old_fisherman',
                name: 'Old Angler',
                sprite: 'goblin',
                x: 18,
                y: 14,
                width: 16,
                height: 16,
                dialogue: [
                    'Nothing beats fishing in these quiet waters.',
                    'Throw your line into the ripples on the left.',
                    'Wait for the exclamation indicator, then tap space fast to reel them in!',
                    'Some species are very rare to pull up.'
                ]
            }
        ],
        collectibles: [
            {
                id: 'frag_park_1',
                name: 'Nature Fragment',
                sprite: 'fragment',
                x: 5,
                y: 27,
                width: 16,
                height: 16,
                type: 'fragment',
                collected: false
            }
        ]
    },

    training: {
        width: 20,
        height: 15,
        tileGrid: trainingGrid,
        colorFloor: '#27272a',
        colorWall: '#3f3f46',
        doorways: [
            { x: 10, y: 13, targetLocation: 'town', targetX: 34, targetY: 28 }
        ],
        objects: [
            {
                id: 'punching_bag',
                name: 'Heavy Punching Bag',
                sprite: 'server',
                x: 5,
                y: 3,
                width: 16,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'A heavy vinyl punching bag.',
                    'Interact nearby to start Gym Reaction training.',
                    'Build strength points and test your hit timings!'
                ]
            },
            {
                id: 'weight_rack',
                name: 'Dumbbell Dumbbells',
                sprite: 'desk',
                x: 13,
                y: 3,
                width: 32,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'A rack filled with heavy cast iron weights.',
                    'Provides energy for solving difficult design and database bugs.'
                ]
            }
        ],
        npcs: [
            {
                id: 'gym_coach',
                name: 'Fitness Coach',
                sprite: 'goblin',
                x: 9,
                y: 4,
                width: 16,
                height: 16,
                dialogue: [
                    'Consistency is key to clean compiling, traveler!',
                    'Practice your striking timings on the heavy bag.',
                    'Maintain a healthy rhythm to score coins for your stamina.'
                ]
            }
        ],
        collectibles: []
    },

    secret: {
        width: 20,
        height: 15,
        tileGrid: secretGrid,
        colorFloor: '#4c1d95',
        colorWall: '#5b21b6',
        doorways: [
            { x: 10, y: 13, targetLocation: 'bedroom', targetX: 14, targetY: 2 }
        ],
        objects: [
            {
                id: 'secret_terminal',
                name: 'Encrypted Crypt',
                sprite: 'server',
                x: 9,
                y: 3,
                width: 16,
                height: 32,
                interactable: true,
                solid: true,
                dialogue: [
                    'Welcome to Carty`s secret developer vault!',
                    'You found the hidden chamber.',
                    'A text file reads: Compilation bugs are just features waiting for explanation.',
                    'Search around the corners to collect the hidden gear.'
                ]
            }
        ],
        npcs: [
            {
                id: 'secret_shadow',
                name: 'Secret Phantom',
                sprite: 'cat',
                x: 5,
                y: 5,
                width: 16,
                height: 16,
                dialogue: [
                    'How did you pass through the solid classroom bookshelf?',
                    'Very clever. Take this secret fragment as a token of your curiosity.'
                ]
            }
        ],
        collectibles: [
            {
                id: 'frag_secret_1',
                name: 'Secret Fragment',
                sprite: 'fragment',
                x: 16,
                y: 4,
                width: 16,
                height: 16,
                type: 'fragment',
                collected: false
            }
        ]
    }
};
