// Retro Pixel-Art Sprite Matrices
// Renders pixel patterns directly to HTML Canvas 2D contexts.
// Color mapping:
// '.' = Transparent
// 'H' = Hair (Brown: #6A3810)
// 'S' = Skin (Light peach: #FCD0A1)
// 'C' = Clothes (Teal/Emerald: #10B981)
// 'P' = Pants (Navy: #0F172A)
// 'B' = Boots (Grey: #475569)
// 'G' = Code Goblin Screen/Body (Green: #22C55E)
// 'O' = Cat (Orange: #F97316)
// 'W' = White/Screen (#FFFFFF)
// 'E' = Eye (Blue: #3B82F6)
// 'K' = Coffee mug (Brown/Cream: #A16207/#F5F5F4)
// 'X' = Bug (Red: #EF4444)
// 'Y' = Gold Yellow (Collectible fragment: #F59E0B)
// 'D' = Wood brown (Desk/Books: #854D0E)
// 'V' = Server LED (Blue/Red: #3B82F6/#EF4444)
// 'Z' = Dream Portal (Purple: #8B5CF6)

type PixelColor = string;
export const ColorPalette: Record<string, string> = {
    '.': 'transparent',
    'H': '#6A3810',
    'S': '#FCD0A1',
    'C': '#10B981',
    'P': '#0F172A',
    'B': '#475569',
    'G': '#22C55E',
    'O': '#F59E0B',
    'W': '#FFFFFF',
    'E': '#3B82F6',
    'K': '#A16207',
    'w': '#F5F5F4',
    'X': '#EF4444',
    'Y': '#FBBF24',
    'D': '#854D0E',
    'V': '#3B82F6',
    'r': '#EF4444',
    'Z': '#8B5CF6',
    'z': '#A78BFA',
    'A': '#64748B', // Server gray
    'a': '#94A3B8', // Light server gray
    'd': '#B45309', // Light wood
    'g': '#15803D', // Dark green goblin
};

export const SPRITES: Record<string, string[]> = {
    // Player Down Idle
    'player_down_idle': [
        '....HHHHHH......',
        '...HHHHHHHH.....',
        '...HHSSSSHH.....',
        '...HSSSSSSHH....',
        '...HSEESEEHH....',
        '...HSSSSSSHH....',
        '....SSSSSS......',
        '....CCCCCC......',
        '...CCCCCCCC.....',
        '...CCCCCCCC.....',
        '...CCCCCCCC.....',
        '...CCPPPPCC.....',
        '....PPPPPP......',
        '....PPPPPP......',
        '....BB..BB......',
        '....BB..BB......'
    ],
    // Player Down Walk 1
    'player_down_walk1': [
        '....HHHHHH......',
        '...HHHHHHHH.....',
        '...HHSSSSHH.....',
        '...HSSSSSSHH....',
        '...HSEESEEHH....',
        '...HSSSSSSHH....',
        '....SSSSSS......',
        '....CCCCCC......',
        '...CCCCCCCC.....',
        '...CCCCCCCC.....',
        '....CCCCCC......',
        '...CCPPPPCC.....',
        '....PPPPPP......',
        '....PPP.PP......',
        '....BB...B......',
        '....BB..........'
    ],
    // Player Down Walk 2
    'player_down_walk2': [
        '....HHHHHH......',
        '...HHHHHHHH.....',
        '...HHSSSSHH.....',
        '...HSSSSSSHH....',
        '...HSEESEEHH....',
        '...HSSSSSSHH....',
        '....SSSSSS......',
        '....CCCCCC......',
        '...CCCCCCCC.....',
        '...CCCCCCCC.....',
        '....CCCCCC......',
        '...CCPPPPCC.....',
        '....PPPPPP......',
        '....PP.PPP......',
        '.....B..BB......',
        '........BB......'
    ],
    // Player Up Idle
    'player_up_idle': [
        '....HHHHHH......',
        '...HHHHHHHH.....',
        '...HHHHHHHH.....',
        '...HHHHHHHH.....',
        '...HHHHHHHH.....',
        '...HHHHHHHH.....',
        '....HHHHHH......',
        '....CCCCCC......',
        '...CCCCCCCC.....',
        '...CCCCCCCC.....',
        '...CCCCCCCC.....',
        '...CCPPPPCC.....',
        '....PPPPPP......',
        '....PPPPPP......',
        '....BB..BB......',
        '....BB..BB......'
    ],
    // Player Up Walk 1
    'player_up_walk1': [
        '....HHHHHH......',
        '...HHHHHHHH.....',
        '...HHHHHHHH.....',
        '...HHHHHHHH.....',
        '...HHHHHHHH.....',
        '...HHHHHHHH.....',
        '....HHHHHH......',
        '....CCCCCC......',
        '...CCCCCCCC.....',
        '...CCCCCCCC.....',
        '....CCCCCC......',
        '...CCPPPPCC.....',
        '....PPPPPP......',
        '....PPP.PP......',
        '....BB...B......',
        '....BB..........'
    ],
    // Player Up Walk 2
    'player_up_walk2': [
        '....HHHHHH......',
        '...HHHHHHHH.....',
        '...HHHHHHHH.....',
        '...HHHHHHHH.....',
        '...HHHHHHHH.....',
        '...HHHHHHHH.....',
        '....HHHHHH......',
        '....CCCCCC......',
        '...CCCCCCCC.....',
        '...CCCCCCCC.....',
        '....CCCCCC......',
        '...CCPPPPCC.....',
        '....PPPPPP......',
        '....PP.PPP......',
        '.....B..BB......',
        '........BB......'
    ],
    // Player Left Idle
    'player_left_idle': [
        '.....HHHHH......',
        '....HHHHHHH.....',
        '....HHHSSSH.....',
        '....HHSSSSSS....',
        '....HESSSSS.....',
        '....HHSSSSSS....',
        '.....SSSSS......',
        '.....CCCCCC.....',
        '....CCCCCCC.....',
        '....CCCCCCC.....',
        '....CCCCCCC.....',
        '.....PPPPCC.....',
        '.....PPPPP......',
        '.....PPPPP......',
        '.....BB.BB......',
        '.....BB.BB......'
    ],
    // Player Left Walk 1
    'player_left_walk1': [
        '.....HHHHH......',
        '....HHHHHHH.....',
        '....HHHSSSH.....',
        '....HHSSSSSS....',
        '....HESSSSS.....',
        '....HHSSSSSS....',
        '.....SSSSS......',
        '.....CCCCCC.....',
        '....CCCCCCC.....',
        '....CCCCCCC.....',
        '.....CCCCCC.....',
        '.....PPPPPC.....',
        '.....PPPP.......',
        '.....PPP........',
        '.....BB.........',
        '....BBB.........'
    ],
    // Player Left Walk 2
    'player_left_walk2': [
        '.....HHHHH......',
        '....HHHHHHH.....',
        '....HHHSSSH.....',
        '....HHSSSSSS....',
        '....HESSSSS.....',
        '....HHSSSSSS....',
        '.....SSSSS......',
        '.....CCCCCC.....',
        '....CCCCCCC.....',
        '....CCCCCCC.....',
        '.....CCCCCC.....',
        '.....PPPPPP.....',
        '......PPPP......',
        '......PPP.......',
        '......BB........',
        '.....BBB........'
    ],
    // Player Right Idle
    'player_right_idle': [
        '......HHHHH.....',
        '.....HHHHHHH....',
        '.....HSSSHHH....',
        '....SSSSSSHH....',
        '.....SSSSSEH....',
        '....SSSSSSHH....',
        '......SSSSS.....',
        '.....CCCCCC.....',
        '.....CCCCCCC....',
        '.....CCCCCCC....',
        '.....CCCCCCC....',
        '.....CCPPPP.....',
        '......PPPPP.....',
        '......PPPPP.....',
        '......BB.BB.....',
        '......BB.BB.....'
    ],
    // Player Right Walk 1
    'player_right_walk1': [
        '......HHHHH.....',
        '.....HHHHHHH....',
        '.....HSSSHHH....',
        '....SSSSSSHH....',
        '.....SSSSSEH....',
        '....SSSSSSHH....',
        '......SSSSS.....',
        '.....CCCCCC.....',
        '.....CCCCCCC....',
        '.....CCCCCCC....',
        '.....CCCCCC.....',
        '....CPPPPP......',
        '.......PPPP.....',
        '........PPP.....',
        '.........BB.....',
        '........BBB.....'
    ],
    // Player Right Walk 2
    'player_right_walk2': [
        '......HHHHH.....',
        '.....HHHHHHH....',
        '.....HSSSHHH....',
        '....SSSSSSHH....',
        '.....SSSSSEH....',
        '....SSSSSSHH....',
        '......SSSSS.....',
        '.....CCCCCC.....',
        '.....CCCCCCC....',
        '.....CCCCCCC....',
        '.....CCCCCC.....',
        '.....PPPPPP.....',
        '......PPPP......',
        '.......PPP......',
        '........BB......',
        '........BBB.....'
    ],
    // Code Goblin NPC
    'goblin': [
        '.....gggggg.....',
        '....gggggggg....',
        '....ggGggGgg....',
        '....gWWgWWgg....',
        '....gXggXggg....',
        '....gggggggg....',
        '....gggggggg....',
        '.....gggggg.....',
        '.....CCCCCC.....',
        '....CCCCCCCC....',
        '....CCCCCCCC....',
        '.....CCCCCC.....',
        '....PPPPPPPP....',
        '....PP.PP.PP....',
        '....BB.BB.BB....',
        '....BB.BB.BB....'
    ],
    // Tech Cat NPC (Orange Cat)
    'cat': [
        '................',
        '................',
        '....O..O........',
        '....OOOO........',
        '....OOOO........',
        '...OWOWO........',
        '...OOOOO........',
        '....OOOOOOOO....',
        '....OOOOOOOOO...',
        '....OOOOOOOOOO..',
        '....OOOOOOOOOO..',
        '.....OOOOOOOOO..',
        '.....O.O...O.O..',
        '.....O.O...O.O..',
        '....OO.OO.OO.OO.',
        '................'
    ],
    // Coffee Cup Item
    'coffee': [
        '................',
        '......WWWW......',
        '.....WwwwwW.....',
        '.....WwwwwW..W..',
        '.....WwwwwW.W...',
        '.....WwwwwWWW...',
        '......WwwwW.....',
        '......WwwwW.....',
        '.......WWW......',
        '....KKKKKKKK....',
        '................',
        '......KKKK......',
        '.....KKKKKK.....',
        '................',
        '................',
        '................'
    ],
    // Collectible (Gear / Tech Fragment)
    'fragment': [
        '......YY......',
        '....YYYYYY....',
        '..YYWWYYYYYY..',
        '..YYYYWWYYYY..',
        'YYYYYYYYYYYYYY',
        'YYYYWWWWYYYYYY',
        'YYYYWWWWYYYYYY',
        'YYYYYYYYYYYYYY',
        '..YYYYWWYYYY..',
        '..YYYYYYYYYY..',
        '....YYYYYY....',
        '......YY......',
        '..............',
        '..............',
        '..............',
        '..............'
    ],
    // Laptop (Large object)
    'laptop': [
        '................',
        '..WWWWWWWWWWWW..',
        '.WccccccccccwwW.',
        '.WcWWWWWWWWcwwW.',
        '.WcWEEEEEWwcwwW.',
        '.WcWEWWWWEWcwwW.',
        '.WcWEEEEEWwcwwW.',
        '.WcWWWWWWWWcwwW.',
        '.WccccccccccwwW.',
        '..WWWWWWWWWWWW..',
        'AAAAAAAAAAAAAAAA',
        'AAAAAAAAAAAAAAAA',
        'AAAAAAAAAAAAAAAA',
        '.A............A.',
        '................',
        '................'
    ],
    // Bug Enemy (Red Crawly Bug)
    'bug': [
        '................',
        '......XX........',
        '....X..XX.......',
        '....XXXXXX......',
        '....XXXXXX......',
        '....XXXXXX......',
        '....XXXXXX......',
        '...XXXXXXXX.....',
        '..XX.XX.XX.XX...',
        '..X..X..X...X...',
        '................',
        '................',
        '................',
        '................',
        '................',
        '................'
    ],
    // Server Rack (Tall obstacle)
    'server': [
        'AAAAAAAAAAAAAAAA',
        'AaAaAaAaAaAaAaAa',
        'A..............A',
        'A..VV.....rr...A',
        'A.WWWW...WWWW..A',
        'A.WWWW...WWWW..A',
        'A..............A',
        'A..rr.....VV...A',
        'A.WWWW...WWWW..A',
        'A.WWWW...WWWW..A',
        'A..............A',
        'A..VV.....VV...A',
        'A.WWWW...WWWW..A',
        'A..............A',
        'AAAAAAAAAAAAAAAA',
        'AAAAAAAAAAAAAAAA'
    ],
    // Dream portal (Animated Portal)
    'portal': [
        '....ZZZZZZZZ....',
        '...ZZzzzzzzZZ...',
        '..ZZzzZZZZzzZZ..',
        '.ZZzzZZZZZZzzZZ.',
        '.ZzzZZZZZZZZzzZ.',
        'ZzzZZ......ZZzzZ',
        'ZzzZZ......ZZzzZ',
        'ZzzZZ......ZZzzZ',
        'ZzzZZ......ZZzzZ',
        'ZzzZZ......ZZzzZ',
        '.ZzzZZZZZZZZzzZ.',
        '.ZZzzZZZZZZzzZZ.',
        '..ZZzzZZZZzzZZ..',
        '...ZZzzzzzzZZ...',
        '....ZZZZZZZZ....',
        '................'
    ],
    // Simple Box/Table
    'desk': [
        '................',
        '..DDDDDDDDDDDD..',
        '.DDDDDDDDDDDDDD.',
        '.DDDDDDDDDDDDDD.',
        '.DD.DDDDDDDD.DD.',
        '.DD.D......D.DD.',
        '.DD.D......D.DD.',
        '.DD.D......D.DD.',
        '.DD.D......D.DD.',
        '.DD.D......D.DD.',
        '.DD.D......D.DD.',
        '.DD.D......D.DD.',
        '................',
        '................',
        '................',
        '................'
    ],
    // Books stack
    'books': [
        '................',
        '......XXXX......',
        '.....XWWWWX.....',
        '.....XWWWWX.....',
        '....YYYYYYYY....',
        '...YWWWWWWWWY...',
        '...YWWWWWWWWY...',
        '..CCCCCCCCCC..',
        '.CWWWWWWWWWWwC.',
        '.CWWWWWWWWWWwC.',
        '..CCCCCCCCCC..',
        '................',
        '................',
        '................',
        '................',
        '................'
    ]
};

// Main function to draw a sprite on a canvas 2D context
export function drawPixelSprite(
    ctx: CanvasRenderingContext2D,
    spriteName: keyof typeof SPRITES | string,
    destX: number,
    destY: number,
    width: number,
    height: number,
    flipX: boolean = false
) {
    const pixelMap = SPRITES[spriteName];
    if (!pixelMap) return;

    const rows = pixelMap.length;
    const cols = pixelMap[0].length;

    const pixelW = width / cols;
    const pixelH = height / rows;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const char = pixelMap[r][c];
            if (char === '.') continue; // transparent

            const color = ColorPalette[char];
            if (!color) continue;

            ctx.fillStyle = color;

            // Calculate column index with optional horizontal flip
            const colIdx = flipX ? cols - 1 - c : c;

            // Draw pixel-thin rectangles (using Math.ceil where needed to eliminate gaps between pixels)
            ctx.fillRect(
                Math.floor(destX + colIdx * pixelW),
                Math.floor(destY + r * pixelH),
                Math.ceil(pixelW),
                Math.ceil(pixelH)
            );
        }
    }
}
