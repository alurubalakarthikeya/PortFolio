"use client";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import mePhoto from "../assets/imgs/me.png";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    href: string;
    target?: string;
    rel?: string;
    download?: string;
}

function MagneticButton({ children, className, href, target, rel, download }: MagneticButtonProps) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.a
            ref={ref}
            href={href}
            target={target}
            rel={rel}
            download={download}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ translateX: mouseX, translateY: mouseY }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.a>
    );
}

const coreStack = [
    { name: "Git", icon: "https://img.icons8.com/color/96/git.png" },
    { name: "GitHub", icon: "https://img.icons8.com/color/96/github--v1.png" },
    { name: "Figma", icon: "https://img.icons8.com/color/96/figma--v1.png" },
    { name: "Docker", icon: "https://img.icons8.com/color/96/docker.png" },
    { name: "Python", icon: "https://img.icons8.com/color/96/python--v1.png" },
    { name: "JavaScript", icon: "https://img.icons8.com/color/96/javascript--v1.png" },
    { name: "React", icon: "https://img.icons8.com/color/96/react-native.png" },
    { name: "Next.js", icon: "https://img.icons8.com/color/96/nextjs.png" },
    { name: "Tailwind CSS", icon: "https://img.icons8.com/color/96/tailwindcss.png" },
    { name: "Flutter", icon: "https://img.icons8.com/color/96/flutter.png" },
    { name: "FastAPI", icon: "https://img.icons8.com/color/96/api-settings.png" },
    { name: "SQL", icon: "https://img.icons8.com/color/96/sql.png" },
    { name: "Workflow Automation", icon: "https://img.icons8.com/color/96/data-configuration.png" },
    { name: "Prompt Engineering", icon: "https://img.icons8.com/color/96/chatgpt.png" },
    { name: "PWA", icon: "https://img.icons8.com/color/96/web.png" },
];

const journey = [
    {
        date: "May 2025 - Present",
        title: "Lead Web Developer · DSU MUNS Club",
        blurb: "Built event systems and React interfaces that scaled student applications and team output.",
    },
    {
        date: "Jun 2024 - Jul 2025",
        title: "AI Intern · Akeshya Pvt Ltd",
        blurb: "Engineered RAG-driven workflows with HuggingFace + FAISS for faster retrieval and cleaner doc intelligence.",
    },
];

const certs = [
    { name: "Certified System Administrator", issuer: "ServiceNow" },
    { name: "Certified Application Developer", issuer: "ServiceNow" },
    { name: "Responsive Web Design", issuer: "freeCodeCamp" },
    { name: "Full Stack Development", issuer: "Udemy" },
];

const loopTitles = [
    "DevOps Engineering",
    "Product Development",
    "UI/UX Systems",
    "ServiceNow Workflows",
    "Workflow Automation",
    "Enterprise UX",
    "AI + RAG Systems",
    "Full Stack Delivery",
    "Performance Driven",
    "Design-Led Building",
];

const focusAreas = [
    { label: "DevOps & Delivery", level: 80 },
    { label: "UI/UX Design", level: 92 },
    { label: "Full Stack Development", level: 79 },
    { label: "ServiceNow Workflows", level: 82 },
];

const education = [
    {
        institution: "Dayananda Sagar University",
        period: "Sep 2023 - May 2027",
        score: "8.5 CGPA",
    },
    {
        institution: "Narayana Institute",
        period: "Aug 2021 - Mar 2023",
        score: "87%",
    },
    {
        institution: "Ratnam High School",
        period: "Jun 2016 - Apr 2021",
        score: "9.8",
    },
];

const initialStats = [
    { label: "Github Repositories", value: "29" },
    { label: "Deployed Repositories", value: "10+" },
    { label: "Github Contributions", value: "2000+" },
    { label: "GitHub Stars", value: "500+" },
];

const githubUsername = "alurubalakarthikeya";


export default function About() {
    const reduceMotion = useReducedMotion();
    const [theme, setTheme] = useState('light');
    const [stats, setStats] = useState(initialStats);

    useEffect(() => {
        async function fetchGitHubStats() {
            try {
                const userRes = await fetch(`https://api.github.com/users/${githubUsername}`);
                if (!userRes.ok) return;
                const userData = await userRes.json();

                const reposRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
                let totalStars = 500;
                if (reposRes.ok) {
                    const reposData = await reposRes.json();
                    const stars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
                    if (stars > 0) totalStars = stars;
                }

                setStats([
                    { label: "Github Repositories", value: userData.public_repos?.toString() || "29" },
                    { label: "Deployed Repositories", value: "10+" },
                    { label: "Github Contributions", value: "2000+" },
                    { label: "GitHub Stars", value: totalStars.toString() + (totalStars >= 500 ? "+" : "") },
                ]);
            } catch (error) {
                console.error("Error fetching GitHub stats:", error);
            }
        }

        fetchGitHubStats();
    }, []);

    useEffect(() => {
        setTheme(document.documentElement.getAttribute('data-theme') || 'light');
        const observer = new MutationObserver(() => {
            setTheme(document.documentElement.getAttribute('data-theme') || 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="relative w-full min-h-screen pb-10 overflow-hidden">
            <div className="relative px-6 md:px-12 w-full max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-12 md:mb-14"
                >
                    <h2 className="mt-5 text-4xl sm:text-5xl md:text-7xl font-extrabold font-headline font-doto text-[var(--text-heading)] tracking-tight leading-[0.95]">
                        Building Apps, <br />
                        With Passion<span className="font-doto text-4xl sm:text-5xl md:text-7xl font-extrabold rubber-spin-dot inline-flex items-center justify-center w-[1em] h-[1em] leading-none align-middle text-[#10b981]">+</span>
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] font-medium max-w-3xl mx-auto">
                        I enjoy building products end-to-end, from thoughtful UI to reliable backend systems, with DevOps and ServiceNow shaping how I ship.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <MagneticButton
                            href="/resume.pdf"
                            download="Aluru-Bala-Karthikeya-Resume.pdf"
                            className="group relative inline-flex items-center gap-2 rounded-full border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-6 py-3 text-sm md:text-base font-extrabold tracking-[0.08em] uppercase text-[var(--site-accent)] shadow-[0_10px_24px_rgba(16,185,129,0.08)] backdrop-blur-md transition-all hover:bg-[var(--site-card-bg)] hover:shadow-[0_14px_32px_rgba(16,185,129,0.15)] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Download Resume
                                <span className="material-symbols-outlined text-[1rem]" aria-hidden="true">download</span>
                            </span>
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10b981]/10 to-transparent -translate-x-full"
                                whileHover={{ x: "200%" }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </MagneticButton>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-10"
                >
                    <motion.aside
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-5 rounded-[2.6rem] border border-[var(--site-accent)]/20 bg-[var(--site-card-bg-accent)] backdrop-blur-xl p-7 md:p-9 shadow-[0_24px_64px_rgba(0,0,0,0.2)] text-white relative overflow-hidden"
                    >
                        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#10b981]/10 blur-2xl" />
                        <div className="relative z-10 flex items-start gap-4">
                            <div className="relative w-27 h-27 rounded-2xl border border-white/30 overflow-hidden shadow-[0_14px_24px_rgba(0,0,0,0.2)] shrink-0">
                                <Image
                                    src={mePhoto}
                                    alt="Karthikeya profile"
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                    priority
                                />
                            </div>
                            <div>
                                <p className="text-sm tracking-[0.14em] uppercase text-white font-bold">Hello there, I&apos;m</p>
                                <h4 className="text-2xl font-black leading-tight mt-1 text-[var(--text-heading)]">Aluru Bala Karthikeya</h4>
                                <p className="text-sm tracking-[0.14em] uppercase text-white mt-1 font-bold">24K @LinkedIn</p>
                            </div>
                        </div>
                        <p className="relative z-10 mt-6 text-[var(--text-secondary)] text-base leading-relaxed font-medium">
                            A Pre-final year Computer Science student at Dayananda Sagar University who enjoys turning ideas into real world working products. I like to build applications that solves meaningful problems while exploring the domains of software engineering, AI systems, and product design. My approach of building products is simple: solve real problems, design unique UI experiences, and build scalable systems.
                        </p>
                        <div className="relative z-10 mt-6 flex flex-wrap gap-2.5">
                            {[
                                "DevOps",
                                "ServiceNow",
                                "AI Workflows",
                                "Frontend Systems",
                                "Product Thinking",
                            ].map((chip) => (
                                <span key={chip} className="rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.1em] uppercase border border-[#10b981]/25 bg-[#10b981]/10 text-[#10b981]">
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </motion.aside>
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7 rounded-[2.6rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl p-7 md:p-9 shadow-[0_20px_56px_rgba(16,185,129,0.05)]"
                    >
                        <p className="inline-flex px-4 py-1.5 rounded-full text-[11px] tracking-[0.16em] uppercase font-bold text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20">
                            Product Stats
                        </p>
                        <h3 className="mt-5 text-3xl md:text-5xl font-extrabold font-doto text-[var(--text-heading)] leading-[1.04]">
                            Apps with clean UI,
                            and real Use.
                        </h3>
                        <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed font-medium">
                            I always enjoy making my custom UI models by playing around rather than a static plan which makes them much better and unique.
                        </p>

                        <div className="mt-7 grid grid-cols-2 gap-3 md:gap-4">
                            {stats.map((item) => (
                                <div key={item.label} className="rounded-2xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-4 py-4 shadow-sm">
                                    <p className="text-[11px] tracking-[0.14em] uppercase text-[#10b981] font-bold">{item.label}</p>
                                    <p className="mt-1 text-xl md:text-2xl font-black text-[var(--text-card)]">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.article>
                </motion.div>

                <motion.section
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10 rounded-[2.4rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-lg p-5 md:p-7 shadow-[0_18px_45px_rgba(129,181,50,0.05)]"
                >
                    <div className="flex flex-row items-center justify-between gap-3 mb-4">
                        <div>
                            <p className="text-[11px] tracking-[0.16em] uppercase font-bold text-[#10b981]">GitHub graph</p>
                        </div>
                        <a
                            href={`https://github.com/${githubUsername}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-fit px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.1em] uppercase bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20"
                        >
                            @{githubUsername}
                        </a>
                    </div>

                    <div className="w-full">
                        <img
                            src={`https://ghchart.rshah.org/${theme === 'light' ? '10b981' : '3b82f6'}/${githubUsername}`}
                            alt={`${githubUsername} GitHub contributions graph`}
                            className="w-full h-auto rounded-2xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] p-2"
                            loading="lazy"
                        />
                    </div>
                </motion.section>

                <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden rounded-none border-y border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-2xl shadow-[0_12px_32px_rgba(0,0,0,0.2)] mb-10">
                    <motion.div
                        className="flex gap-4 w-max py-4 px-6 md:px-12"
                        animate={reduceMotion ? undefined : { x: [0, -860] }}
                        transition={reduceMotion ? undefined : { duration: 22, ease: "linear", repeat: Infinity }}
                    >
                        {[...loopTitles, ...loopTitles, ...loopTitles].map((title, index) => (
                            <span
                                key={`single-${index}`}
                                className="px-4 py-1.5 rounded-full text-xs md:text-sm tracking-[0.13em] uppercase font-extrabold bg-[#10b981]/8 text-[#10b981] border border-[#10b981]/15 whitespace-nowrap"
                            >
                                {title}
                            </span>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-10"
                >
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7 relative rounded-[2.3rem] bg-[var(--site-card-bg)] border border-[var(--site-border)] p-7 md:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-lg"
                    >
                        <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-[#10b981]/5 blur-3xl" />

                        <h3 className="text-3xl md:text-4xl font-extrabold font-doto text-[var(--text-heading)] leading-tight mb-4">About Me</h3>
                        <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-medium">
                            Beyond development, I also help professionals improve their LinkedIn presence and personal branding by helping them optimize their profiles for better visibility and opportunities.
                        </p>
                        <h4 className="text-1xl md:text-2xl font-extrabold font-doto text-[var(--text-heading)] leading-tight mt-4">Hobbies</h4>
                        <div className="relative z-10 mt-6 flex flex-wrap gap-2.5">
                            {[
                                "Drawing",
                                "Reading News",
                                "Learning New Things",
                                "Music",
                                "Wikipedia",
                                "History",
                                "Art",
                                "Psychology"
                            ].map((chip) => (
                                <span key={chip} className="rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.1em] uppercase border border-[#10b981]/20 bg-[#10b981]/10 text-[#10b981]">
                                    {chip}
                                </span>
                            ))}
                        </div>
                        <h4 className="text-1xl md:text-2xl font-extrabold font-doto text-[var(--text-heading)] leading-tight mt-6">Languages I Speak:</h4>
                        <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-medium mt-4">
                            - English (Professional proficiency) <br />
                            - Hindi (Professional proficiency) <br />
                            - Telugu (Native / Professional proficiency) <br />
                            - Kannada (Basic proficiency)
                        </p>
                    </motion.article>

                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-5 rounded-[2.3rem] bg-[var(--site-card-bg-strong)] text-white border border-[var(--site-border)] p-7 md:p-9 shadow-[0_22px_54px_rgba(0,0,0,0.15)] backdrop-blur-lg"
                    >
                        <h3 className="text-3xl font-extrabold font-doto mb-6 text-[var(--text-heading)]">Skills</h3>
                        <div className="space-y-4 mb-7">
                            {focusAreas.map((item) => (
                                <div key={item.label}>
                                    <div className="flex items-center justify-between text-sm font-semibold mb-2 text-[var(--text-secondary)]">
                                        <span>{item.label}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(20)].map((_, index) => {
                                            const filled = (index + 1) * 5 <= item.level;
                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.3, delay: index * 0.025 }}
                                                    className={`w-2.5 h-2.5 rounded-sm border ${filled
                                                        ? 'bg-[#10b981] border-[#059669]'
                                                        : 'bg-[var(--site-card-bg-strong)] border-[var(--site-border)]'
                                                        }`}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                            {coreStack.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] hover:border-[#10b981]/40 px-1.5 py-2.5 flex items-center justify-center min-h-[56px] transition-colors"
                                >
                                    <img
                                        src={skill.icon}
                                        alt={`${skill.name} icon`}
                                        loading="lazy"
                                        width={28}
                                        height={28}
                                        className="h-7 w-7 object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.article>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-4 rounded-[2.3rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-lg p-7 md:p-9 shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
                    >
                        <h3 className="text-2xl md:text-3xl font-extrabold font-doto text-[var(--text-heading)]">Currently Working</h3>
                        <p className="mt-3 text-lg text-[var(--text-secondary)] font-medium leading-relaxed">
                            • ServiceNow platform for application development, <br />• Automation of workflows, <br />• AI Systems and Intelligent Agents
                            <br />• UI/UX and Product Design
                        </p>
                    </motion.div>

                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-8 rounded-[2.3rem] bg-[var(--site-card-bg)] border border-[var(--site-border)] p-7 md:p-9 shadow-[0_18px_48px_rgba(0,0,0,0.1)] backdrop-blur-lg"
                    >
                        <h3 className="text-3xl md:text-4xl font-extrabold font-doto text-[var(--text-heading)] mb-6">Education</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {education.map((item) => (
                                <div key={item.institution} className="rounded-2xl bg-[var(--site-card-bg-strong)] border border-[var(--site-border)] px-4 py-4">
                                    <p className="text-lg font-bold text-[var(--text-card)] leading-snug">{item.institution}</p>
                                    <p className="mt-2 text-[11px] tracking-[0.08em] uppercase text-[#10b981] font-bold">{item.period}</p>
                                    <p className="mt-2 text-[var(--text-secondary)] font-semibold">Score: {item.score}</p>
                                </div>
                            ))}
                        </div>
                    </motion.article>

                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-8 rounded-[2.3rem] bg-[var(--site-card-bg)] border border-[var(--site-border)] p-7 md:p-9 shadow-[0_18px_48px_rgba(0,0,0,0.1)] backdrop-blur-lg"
                    >
                        <h3 className="text-3xl md:text-4xl font-extrabold font-doto text-[var(--text-heading)] mb-6">Experience</h3>
                        <div className="space-y-4">
                            {journey.map((item, index) => (
                                <div key={item.date} className="relative">
                                    <p className="text-xs tracking-[0.14em] uppercase text-[#10b981] font-bold">{item.date}</p>
                                    <h4 className="mt-1 text-xl font-bold text-[var(--text-card)]">{item.title}</h4>
                                    <p className="mt-2 text-[var(--text-secondary)] font-medium leading-relaxed">{item.blurb}</p>
                                    {index < journey.length - 1 ? <div className="mt-4 border-b border-[var(--site-border)]" /> : null}
                                </div>
                            ))}
                        </div>
                    </motion.article>
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-4 rounded-[2.3rem] bg-[var(--site-card-bg)] text-white border border-[var(--site-border)] p-7 md:p-9 shadow-[0_22px_55px_rgba(0,0,0,0.15)]"
                    >
                        <h3 className="text-3xl font-extrabold font-doto mb-5 text-[var(--text-heading)]">Credentials</h3>
                        <div className="space-y-4">
                            {certs.map((cert) => (
                                <div key={cert.name} className="rounded-2xl bg-[var(--site-card-bg-strong)] border border-[var(--site-border)] px-4 py-3">
                                    <p className="text-xs tracking-[0.12em] uppercase text-[#10b981] font-bold">{cert.issuer}</p>
                                    <p className="mt-1 font-bold text-[var(--text-card)] text-lg leading-tight">{cert.name}</p>
                                </div>
                            ))}
                        </div>
                    </motion.article>
                </motion.div>
            </div>

        </section>
    );
}
