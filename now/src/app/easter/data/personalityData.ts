export interface Technology {
    name: string;
    category: string;
    description: string;
}

export interface Project {
    name: string;
    desc: string;
    tech: string[];
}

export interface Hobby {
    name: string;
    description: string;
    details: string;
}

export interface PlayerProfile {
    name: string;
    role: string;
    bio: string;
    mbti: string;
    favorites: { label: string; value: string }[];
    quickFacts: string[];
    technologies: Technology[];
    projects: Project[];
    hobbies: Hobby[];
    careerGoals: string[];
    funFacts: string[];
}

export const playerProfile: PlayerProfile = {
    name: "Carty (Karthikeya)",
    role: "Lead Web Developer & Student",
    bio: "I started building things because apparently using existing things wasn't complicated enough. I study at Dayananda Sagar University, write clean interfaces, and get excited about details.",
    mbti: "INTJ-ish (with a builder streak)",
    favorites: [
        { label: "MBTI", value: "INTJ-ish, but with a builder streak" },
        { label: "Fav movies", value: "The Social Network, Interstellar, Her" },
        { label: "Fav songs", value: "Night drives, lo-fi sets, warm synths" },
        { label: "Weekend reset", value: "A quiet playlist, sketchpad, long walk" }
    ],
    quickFacts: [
        "Coffee over soda",
        "Notebook over notes app",
        "Cloudy evening walks",
        "Soft synths",
        "Clean interfaces",
        "Curiosity first"
    ],
    technologies: [
        { name: "React / Next.js", category: "Frontend", description: "Where design meets execution. Love components and state." },
        { name: "TypeScript", category: "Languages", description: "Because compiler errors are better than runtime surprises." },
        { name: "JavaScript", category: "Languages", description: "A chosen path of chaotic building and performance polishing." },
        { name: "Tailwind CSS", category: "Styling", description: "Utility classes that make layouts fast and fluid." },
        { name: "Python", category: "Backend/AI", description: "For scripting, fast hacking, and building logic engines." },
        { name: "ServiceNow", category: "Enterprise", description: "Workflows and digital transformations that matter." }
    ],
    projects: [
        { name: "CampusNow", desc: "A tailored portal enabling student applications and fast communication.", tech: ["React", "CSS"] },
        { name: "Zephra", desc: "A minimal workspace focused on high-performance task management.", tech: ["Next.js", "TS"] },
        { name: "Aether", desc: "A clean dashboard compiling real-time developer metrics.", tech: ["React", "API"] }
    ],
    hobbies: [
        { name: "Drawing", description: "Digital sketches & character study", details: "Sketching helps me map ideas visually before coding." },
        { name: "Music Production", description: "Ambient loops & soft synths", details: "I produce lo-fi patterns for late night coding sessions." },
        { name: "Street Photography", description: "Capturing city walks", details: "Observing geometry, people, and daily life in urban environments." }
    ],
    careerGoals: [
        "Build interfaces that feel like natural extensions of human thought.",
        "Master low-level system designs and client state architectures.",
        "Contribute to tools that empower creative developers globally."
    ],
    funFacts: [
        "I have probably created 53 unfinished side projects.",
        "I believe a cloudy evening walk solves 62% of debugger problems.",
        "I use paper notebooks for task lists and wireframes. Yes, physical paper."
    ]
};
