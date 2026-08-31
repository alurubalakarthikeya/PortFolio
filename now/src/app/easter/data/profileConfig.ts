export interface ProfileConfig {
    name: string;
    introduction: string;
    education: string;
    engineering: {
        technologies: string[];
        projects: { name: string; desc: string; link?: string }[];
        interests: string[];
        currentlyLearning: string[];
    };
    hobbies: string[];
    interests: string[];
    favorites: {
        music: string[];
        games: string[];
        movies: string[];
        books: string[];
        food: string[];
    };
    personality: {
        traits: string[];
        quirks: string[];
        funFacts: string[];
    };
    goals: string[];
    futurePlans: string[];
    secrets: string[];
}

export const PROFILE: ProfileConfig = {
    name: "Carty",
    introduction: "A software engineer and designer crafting interactive systems and frontends.",
    education: "Computer Science and Engineering",
    engineering: {
        technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "Python", "GraphQL", "Web Audio API"],
        projects: [
            { name: "Carty Portfolio", desc: "A customized desktop engine environment with telemetry statistics.", link: "/" },
            { name: "Coffee Synthesizer", desc: "Procedural sound effects utilizing Web Audio API wave oscillators.", link: "/easter" },
            { name: "Pixel Space", desc: "A customizable canvas physics engine built with raw grid cells.", link: "/easter" }
        ],
        interests: ["Game mechanics", "Responsive styling", "Web rendering speed", "Animation states"],
        currentlyLearning: ["Rust", "WASM integration", "Procedural asset scaling", "WebGL shaders"]
    },
    hobbies: ["Retro gaming", "Street sketching", "Curating ambient loops", "Reading technical case studies"],
    interests: ["Human computer interaction", "City layout design", "Minimalist visual systems", "History of computing"],
    favorites: {
        music: ["Warm lo-fi synth", "Synthwave instrumentals", "Ambient space soundscapes"],
        games: ["Adventure RPGs", "Resource management simulators", "Puzzle platforms"],
        movies: ["The Social Network", "Interstellar", "Her"],
        books: ["Design of Everyday Things", "Hackers and Painters", "Structure and Interpretation of Computer Programs"],
        food: ["Espresso double shot", "Dark chocolate mint", "Crisp toast with butter"]
    },
    personality: {
        traits: ["Curious builder", "Detail oriented planner", "Analytical thinker"],
        quirks: ["Keeps exactly 37 browser tabs open", "Prefers writing in physical journals over digital note apps", "Goes for long walks when compiler prints unexpected warnings"],
        funFacts: [
            "Can tell the difference between dark roast coffees by smell",
            "Drafted first website layout on the back of a math test booklet",
            "Synthesized custom 8-bit tracks purely from math functions"
        ]
    },
    goals: ["Become a core system architect", "Build open source tools that make interfaces beautiful", "Create a physical retro arcade cabinet"],
    futurePlans: ["Contribute to Next.js internals", "Learn 3D rendering algorithms", "Publish a small layout styling book"],
    secrets: [
        "You found the secret chamber inside the computer cabinet!",
        "The passcode to Aluru's private lab is hidden inside page telemetry.",
        "Did you know the compilation bug was actually a feature in disguise?"
    ]
};
