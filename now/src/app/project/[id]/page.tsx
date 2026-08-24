"use client";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Define the static images inline to keep self-contained without breaking ProjectGrid
import aetherShot from '../../assets/imgs/aether.jpeg';
import calgpaShot from '../../assets/imgs/calgpa.jpeg';
import zephraShot from '../../assets/imgs/zephra.jpeg';
import minimindsShot from '../../assets/imgs/miniminds.jpeg';
import carsioShot from '../../assets/imgs/cario.jpeg';
import roledocShot from '../../assets/imgs/roledoc.jpeg';
import textotestShot from '../../assets/imgs/textotest.jpeg';

const screenshots: Record<string, any> = {
    calgpa: calgpaShot,
    zephra: zephraShot,
    aether: aetherShot,
    campusnow: calgpaShot,
    miniminds: minimindsShot,
    carsio: carsioShot,
    roledoc: roledocShot,
    textotest: textotestShot,
    cardone: calgpaShot,
};

const popupProjects: Record<string, any> = {
    calgpa: {
        name: 'CalGPA',
        short: 'Academic performance tracker with GPA prediction and attendance planning.',
        badge: 'EdTech • Progressive Web App',
        description: 'CalGPA helps university students monitor academic performance through GPA estimation, subject analysis, and attendance planning. Built as a Progressive Web App for offline accessibility across devices.',
        workedOn: 'Oct 2024 – Apr 2025',
        domain: 'Education Technology',
        role: 'Full Stack Developer',
        stack: ['HTML', 'CSS', 'JavaScript', 'PWA', 'Responsive Design'],
        stats: [
            { label: 'Uptime', value: '99.9%' },
            { label: 'Platform', value: 'PWA/Web' },
            { label: 'Access', value: 'Offline-First' },
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
    zephra: {
        name: 'Zephra',
        short: 'NASA-powered air quality forecasting platform.',
        badge: 'NASA Space Apps 2025',
        description: 'Zephra delivers real-time and short-term air quality forecasts by combining NASA TEMPO satellite observations with ground monitoring data, providing interactive visualizations and public health insights.',
        workedOn: 'Oct 2025',
        domain: 'Climate Intelligence',
        role: 'Frontend & AI Developer',
        stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'FastAPI', 'Python', 'Chart.js'],
        stats: [
            { label: 'Latency', value: '< 200ms' },
            { label: 'Satellites', value: 'TEMPO & GOES' },
            { label: 'Data Points', value: '1M+' },
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
    aether: {
        name: 'Aether',
        short: 'AI virtual pet powered by journaling and emotional analytics.',
        badge: 'AI Companion',
        description: 'A virtual pet ecosystem that combines journaling, habit tracking, emotional analytics, and autonomous AI behaviour to create a personalized self-improvement companion.',
        workedOn: 'Mar 2026 – Present',
        domain: 'Artificial Intelligence',
        role: 'Mobile App Developer',
        stack: ['Flutter', 'Dart', 'AI', 'Behavior Analytics'],
        stats: [
            { label: 'State Sync', value: 'Real-time' },
            { label: 'AI Model', value: 'On-device / Cloud' },
            { label: 'Focus', value: 'Mental Health' },
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
    campusnow: {
        name: 'CampusNow',
        short: 'ServiceNow-based campus management platform.',
        badge: 'Enterprise Workflow',
        description: 'A centralized campus management platform built on ServiceNow that automates academic and administrative workflows using role-based access control and enterprise process automation.',
        workedOn: 'Jul 2026 – Present',
        domain: 'Enterprise Software',
        role: 'ServiceNow Developer',
        stack: ['ServiceNow', 'ServiceNow Studio', 'ITSM', 'Access Control'],
        stats: [
            { label: 'Workflows', value: 'Automated' },
            { label: 'Security', value: 'Enterprise Grade' },
            { label: 'Scale', value: '10K+ Users' },
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
    miniminds: {
        name: 'Mini-Minds',
        short: 'Gamified learning platform for children.',
        badge: 'Educational Platform',
        description: 'An interactive e-learning platform that makes education engaging through mini games, reward systems, and child-friendly educational activities.',
        workedOn: '2024',
        domain: 'EdTech',
        role: 'Frontend Developer',
        stack: ['React', 'TypeScript', 'Tailwind CSS'],
        stats: [
            { label: 'Retention', value: '85%+' },
            { label: 'Activities', value: 'Infinite' },
            { label: 'Target Age', value: '5-12' },
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
    carsio: {
        name: 'Cars.IO',
        short: 'Full-stack car inventory management system.',
        badge: 'Full Stack',
        description: 'A full-stack inventory management platform for dealerships featuring authentication, SQL-backed inventory management, profile management, and secure session handling.',
        workedOn: 'May 2025',
        domain: 'Inventory Management',
        role: 'Full Stack Developer',
        stack: ['HTML', 'CSS', 'Node.js', 'Express', 'SQL'],
        stats: [
            { label: 'Database', value: 'Relational' },
            { label: 'Security', value: 'Secured Sessions' },
            { label: 'Speed', value: 'Optimized' },
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
    roledoc: {
        name: 'RoleDoc',
        short: 'Persona-driven RAG document assistant.',
        badge: 'Generative AI',
        description: 'An AI document assistant that transforms uploaded PDFs, DOCX, and TXT files into conversational agents using Retrieval-Augmented Generation with customizable response personas.',
        workedOn: 'Jul 2025 – Aug 2025',
        domain: 'Artificial Intelligence',
        role: 'AI Engineer',
        stack: ['React', 'FastAPI', 'Python', 'FAISS', 'Mistral'],
        stats: [
            { label: 'Retrieval', value: 'Sub-second' },
            { label: 'Personas', value: 'Customizable' },
            { label: 'Ingestion', value: 'Multi-Format' },
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
    textotest: {
        name: 'TexToTest',
        short: 'AI-powered contextual MCQ generation platform.',
        badge: 'AI Education',
        description: 'Generates context-aware multiple-choice questions from learning material using large language models, helping students practice and educators create assessments faster.',
        workedOn: '2026',
        domain: 'Educational AI',
        role: 'AI Product Developer',
        stack: ['Next.js', 'TypeScript', 'LLMs', 'Prompt Engineering'],
        stats: [
            { label: 'Generation', value: 'Dynamic' },
            { label: 'Accuracy', value: 'LLM Tuned' },
            { label: 'Exports', value: 'PDF / Text' },
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
    cardone: {
        name: 'HabitO',
        short: 'Gamified habit tracker with streak analytics.',
        badge: 'Productivity',
        description: 'A habit tracking application featuring streaks, progress visualization, gamification, and Habitica integration to encourage long-term consistency.',
        workedOn: 'Apr 2025 – May 2025',
        domain: 'Productivity',
        role: 'Full Stack Developer',
        stack: ['Electron', 'Spring Boot', 'SQL', 'Habitica API'],
        stats: [
            { label: 'Streaks', value: 'Tracked' },
            { label: 'Integration', value: 'Habitica' },
            { label: 'Engine', value: 'Gamified' },
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
};

export default function ProjectPage({ params }: { params: { id: string } }) {
    const project = popupProjects[params.id];
    const image = screenshots[params.id];

    if (!project) {
        return notFound();
    }

    // Certain apps are mobile apps and best showcased in a phone layout
    const isMobileApp = ['aether', 'textotest', 'miniminds', 'calgpa'].includes(params.id);

    return (
        <div className="relative min-h-screen bg-[var(--site-bg)] selection:bg-[#10b981]/30 selection:text-[#10b981]">
            <div className="absolute inset-x-0 top-0 h-screen w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))] mix-blend-screen pointer-events-none" />

            {/* Navigation */}
            <nav className="fixed top-0 inset-x-0 z-50 p-6 flex justify-between items-center backdrop-blur-sm bg-gradient-to-b from-[var(--site-bg)] to-transparent">
                <Link
                    href="/"
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--site-card-bg-strong)] border border-[var(--site-border)] shadow-lg backdrop-blur-xl text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-white transition-all"
                >
                    <span className="material-symbols-outlined text-[1.1rem] transition-transform group-hover:-translate-x-1">arrow_back</span>
                    Home
                </Link>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col xl:flex-row gap-16 xl:gap-24 items-center xl:items-start">

                {/* Left Column: Typography & Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full xl:w-[45%] flex flex-col mt-4 md:mt-12"
                >
                    <div className="inline-flex w-fit px-4 py-1.5 rounded-full text-[10px] md:text-sm tracking-[0.16em] uppercase font-bold text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                        {project.badge}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black font-doto text-[var(--text-heading)] leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">
                        {project.name}
                    </h1>

                    <p className="mt-8 text-xl md:text-2xl font-medium text-white/90 leading-snug">
                        {project.short}
                    </p>

                    <p className="mt-6 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-medium">
                        {project.description}
                    </p>

                    <div className="mt-12 grid grid-cols-2 gap-4">
                        <div className="rounded-[1.4rem] p-5 border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
                            <p className="text-[10px] tracking-[0.14em] uppercase text-[#10b981] font-bold">Domain</p>
                            <p className="mt-1 text-base md:text-lg font-bold text-white">{project.domain}</p>
                        </div>
                        <div className="rounded-[1.4rem] p-5 border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
                            <p className="text-[10px] tracking-[0.14em] uppercase text-[#10b981] font-bold">Role</p>
                            <p className="mt-1 text-base md:text-lg font-bold text-white">{project.role}</p>
                        </div>
                        <div className="rounded-[1.4rem] p-5 border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
                            <p className="text-[10px] tracking-[0.14em] uppercase text-[#10b981] font-bold">Timeline</p>
                            <p className="mt-1 text-base md:text-lg font-bold text-white">{project.workedOn}</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-xs tracking-[0.15em] uppercase text-white/50 font-bold mb-4">Core Technologies</h3>
                        <div className="flex flex-wrap gap-2.5">
                            {project.stack.map((tech: string) => (
                                <span key={tech} className="px-4 py-2 rounded-xl text-sm font-bold bg-white/5 text-white border border-white/10 backdrop-blur-md hover:bg-[#10b981]/20 hover:border-[#10b981]/50 transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Project Game Stats Segment */}
                    {project.stats && (
                        <div className="mt-12 bg-[#081b3a]/40 border border-[#10b981]/10 rounded-[1.4rem] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_12px_24px_rgba(0,0,0,0.2)]">
                            <h3 className="text-xs tracking-[0.15em] uppercase text-[#10b981]/80 font-bold mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                                Project Telemetry
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
                                {project.stats.map((stat: any, index: number) => (
                                    <div key={index} className="flex flex-col pt-4 sm:pt-0 sm:px-4 first:pt-0 first:pl-0">
                                        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-black">{stat.label}</p>
                                        <p className="mt-1 text-lg font-doto font-black text-white">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-14 flex flex-col sm:flex-row gap-4">
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-black font-extrabold flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 shadow-[0_16px_32px_rgba(255,255,255,0.15)] hover:shadow-[0_20px_40px_rgba(255,255,255,0.25)]"
                        >
                            Launch App
                            <span className="material-symbols-outlined text-[1.2rem] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </a>
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] text-white font-extrabold flex items-center justify-center gap-3 transition-colors hover:bg-white/10"
                        >
                            Source Code
                        </a>
                    </div>
                </motion.div>

                {/* Right Column: Visual Showcase */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    className="w-full xl:w-[55%] flex justify-center xl:justify-end items-center relative"
                >
                    {/* Abstract glows behind the image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,rgba(0,0,0,0)_60%)] blur-2xl z-0 pointer-events-none" />

                    {image ? (
                        <div className={`relative z-10 w-full max-w-2xl ${isMobileApp ? 'max-w-sm' : ''}`}>
                            <div className={`w-full overflow-hidden ${isMobileApp ? 'rounded-[3rem] border-[12px] border-white/5 bg-black drop-shadow-2xl shadow-[inset_0_4px_12px_rgba(255,255,255,0.1)] px-1 pt-1 pb-1 aspect-[9/19]' : 'rounded-3xl border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.4)] aspect-[16/10] bg-zinc-900'}`}>
                                {isMobileApp && (
                                    <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                                        <div className="w-1/3 h-5 bg-black rounded-b-xl" />
                                    </div>
                                )}
                                <Image
                                    src={image}
                                    alt={`${project.name} interface`}
                                    fill
                                    className="object-cover object-top rounded-[2.5rem] md:rounded-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="relative z-10 w-full max-w-xl aspect-video rounded-3xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] flex items-center justify-center">
                            <p className="text-white/40 font-bold tracking-widest uppercase">No Image Available</p>
                        </div>
                    )}
                </motion.div>
            </main>

        </div>
    );
}
