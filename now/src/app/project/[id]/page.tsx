"use client";

import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

const projects: Record<string, any> = {
    calgpa: {
        name: 'CalGPA',
        short: 'Academic performance tracker with GPA prediction and attendance planning.',
        badge: 'EdTech',
        description: 'CalGPA helps university students monitor academic performance through GPA estimation, subject analysis, and attendance planning. Built as a Progressive Web App for offline accessibility across devices.',
        workedOn: 'Oct 2024 – Apr 2025',
        domain: 'Education Technology',
        role: 'Full Stack Developer',
        stack: ['HTML', 'CSS', 'JavaScript', 'PWA', 'Responsive Design'],
        stats: [
            { label: 'Uptime', value: '99.9%' },
            { label: 'Platform', value: 'PWA' },
            { label: 'Access', value: 'Offline' },
            { label: 'Users', value: '500+' },
        ],
        highlights: [
            'GPA simulator with dynamic projections',
            'Course-wise breakdown cards',
            'Mobile-first, distraction-free design',
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
    zephra: {
        name: 'Zephra',
        short: 'NASA-powered air quality forecasting platform.',
        badge: 'NASA Space Apps',
        description: 'Zephra delivers real-time and short-term air quality forecasts by combining NASA TEMPO satellite observations with ground monitoring data, providing interactive visualizations and public health insights.',
        workedOn: 'Oct 2025',
        domain: 'Climate Intelligence',
        role: 'Frontend & AI Developer',
        stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'FastAPI', 'Python', 'Chart.js'],
        stats: [
            { label: 'Latency', value: '<200ms' },
            { label: 'Satellites', value: 'TEMPO' },
            { label: 'Data Pts', value: '1M+' },
            { label: 'Accuracy', value: '94%' },
        ],
        highlights: [
            'Live map overlays blending forecast signals',
            'Readable AQ metrics with confidence ranges',
            'Communicates science through calm UI patterns',
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
            { label: 'Sync', value: 'Real-time' },
            { label: 'AI', value: 'On-device' },
            { label: 'Focus', value: 'Wellness' },
            { label: 'States', value: '12+' },
        ],
        highlights: [
            'Daily mood loops with adaptive nudges',
            'Companion character reacts to engagement',
            'Unified reflection, planning, and tracking',
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
    campusnow: {
        name: 'CampusNow',
        short: 'ServiceNow-based campus management platform.',
        badge: 'Enterprise',
        description: 'A centralized campus management platform built on ServiceNow that automates academic and administrative workflows using role-based access control and enterprise process automation.',
        workedOn: 'Jul 2026 – Present',
        domain: 'Enterprise Software',
        role: 'ServiceNow Developer',
        stack: ['ServiceNow', 'ServiceNow Studio', 'ITSM', 'Access Control'],
        stats: [
            { label: 'Workflows', value: 'Auto' },
            { label: 'Security', value: 'Enterprise' },
            { label: 'Scale', value: '10K+' },
            { label: 'Uptime', value: '99.9%' },
        ],
        highlights: [
            'Automated academic workflows',
            'Role-based access control system',
            'Enterprise-grade process automation',
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
    miniminds: {
        name: 'Mini-Minds',
        short: 'Gamified learning platform for children.',
        badge: 'EdTech',
        description: 'An interactive e-learning platform that makes education engaging through mini games, reward systems, and child-friendly educational activities.',
        workedOn: '2024',
        domain: 'EdTech',
        role: 'Frontend Developer',
        stack: ['React', 'TypeScript', 'Tailwind CSS'],
        stats: [
            { label: 'Retention', value: '85%+' },
            { label: 'Games', value: 'Infinite' },
            { label: 'Age Range', value: '5-12' },
            { label: 'Modules', value: '20+' },
        ],
        highlights: [
            'Interactive mini games for learning',
            'Reward systems that encourage progress',
            'Child-friendly, accessible UI design',
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
            { label: 'Database', value: 'SQL' },
            { label: 'Auth', value: 'Secured' },
            { label: 'Speed', value: 'Fast' },
            { label: 'CRUD', value: 'Full' },
        ],
        highlights: [
            'SQL-backed inventory management',
            'Secure authentication and sessions',
            'Responsive dealership dashboard',
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
    roledoc: {
        name: 'RoleDoc',
        short: 'Persona-driven RAG document assistant.',
        badge: 'Gen AI',
        description: 'An AI document assistant that transforms uploaded PDFs, DOCX, and TXT files into conversational agents using Retrieval-Augmented Generation with customizable response personas.',
        workedOn: 'Jul 2025 – Aug 2025',
        domain: 'Artificial Intelligence',
        role: 'AI Engineer',
        stack: ['React', 'FastAPI', 'Python', 'FAISS', 'Mistral'],
        stats: [
            { label: 'Retrieval', value: '<1s' },
            { label: 'Personas', value: 'Custom' },
            { label: 'Formats', value: 'Multi' },
            { label: 'Model', value: 'Mistral' },
        ],
        highlights: [
            'Transforms documents into conversational agents',
            'Customizable response personas',
            'Multi-format document ingestion',
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
            { label: 'Accuracy', value: 'Tuned' },
            { label: 'Export', value: 'PDF' },
            { label: 'Engine', value: 'LLM' },
        ],
        highlights: [
            'Context-aware question generation',
            'LLM-powered assessment creation',
            'Export to multiple formats',
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
            { label: 'Sync', value: 'Habitica' },
            { label: 'Engine', value: 'Gamified' },
            { label: 'Platform', value: 'Desktop' },
        ],
        highlights: [
            'Streak tracking with visual analytics',
            'Habitica API integration',
            'Gamification-driven consistency',
        ],
        repoUrl: '#',
        liveUrl: '#',
    },
};

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const project = projects[id];
    const image = screenshots[id];

    if (!project) {
        return notFound();
    }

    const isMobileApp = ['aether', 'textotest', 'miniminds', 'calgpa'].includes(id);

    return (
        <div className="relative min-h-screen bg-[var(--site-bg)] overflow-hidden">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(16,185,129,0.12),transparent_70%)]" />

            {/* Back button */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-50 p-4 md:p-6"
            >
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--site-card-bg)] border border-[var(--site-border)] backdrop-blur-xl text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[#10b981] transition-colors"
                >
                    <span className="material-symbols-outlined text-[1rem] transition-transform group-hover:-translate-x-0.5">arrow_back</span>
                    Back
                </Link>
            </motion.nav>

            <main className="relative z-10 px-4 md:px-8 pb-20 max-w-6xl mx-auto">

                {/* ── Hero Section ── */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                    className="rounded-[1.8rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                >
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                        {/* Text Side */}
                        <div className="flex-1 min-w-0">
                            <span className="inline-flex px-3 py-1 rounded-full text-[10px] tracking-[0.14em] uppercase font-bold text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20">
                                {project.badge}
                            </span>
                            <h1 className="mt-4 text-4xl md:text-6xl font-black font-doto text-[var(--text-heading)] leading-[1.1]">
                                {project.name}
                            </h1>
                            <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-medium max-w-xl">
                                {project.description}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#10b981] text-white text-sm font-bold transition-transform hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(16,185,129,0.3)]"
                                >
                                    Launch
                                    <span className="material-symbols-outlined text-[1rem] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                                </a>
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] text-[var(--text-secondary)] text-sm font-bold transition-colors hover:text-white"
                                >
                                    Source Code
                                </a>
                            </div>
                        </div>

                        {/* Image Side */}
                        {image && (
                            <div className={`shrink-0 ${isMobileApp ? 'w-[160px] md:w-[200px]' : 'w-full lg:w-[45%]'}`}>
                                <div className={`relative overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.35)] ${isMobileApp ? 'rounded-[2rem] border-[6px] border-[var(--site-border)] aspect-[9/19]' : 'rounded-2xl border border-[var(--site-border)] aspect-[16/10]'}`}>
                                    <Image
                                        src={image}
                                        alt={`${project.name} interface`}
                                        fill
                                        className="object-cover object-top"
                                        priority
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* ── Game Stats HUD ── */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    className="mt-6 rounded-[1.8rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                        <h2 className="text-xs tracking-[0.16em] uppercase font-black text-[#10b981]/80">Project Telemetry</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {project.stats.map((stat: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + i * 0.08, duration: 0.35 }}
                                className="relative rounded-[1.2rem] border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] p-4 md:p-5 overflow-hidden group"
                            >
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] font-black">{stat.label}</p>
                                <p className="mt-2 text-xl md:text-2xl font-doto font-black text-white">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* ── Info Grid ── */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Meta Cards */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                        className="rounded-[1.8rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                    >
                        <h2 className="text-xs tracking-[0.16em] uppercase font-black text-[var(--text-muted)] mb-5">Project Info</h2>
                        <div className="space-y-3">
                            {[
                                { label: 'Domain', value: project.domain },
                                { label: 'Role', value: project.role },
                                { label: 'Timeline', value: project.workedOn },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-4 py-3">
                                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#10b981] font-bold">{item.label}</span>
                                    <span className="text-sm font-bold text-white">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Highlights */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        className="rounded-[1.8rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                    >
                        <h2 className="text-xs tracking-[0.16em] uppercase font-black text-[var(--text-muted)] mb-5">Highlights</h2>
                        <div className="space-y-3">
                            {project.highlights.map((item: string, i: number) => (
                                <div key={i} className="flex items-start gap-3 rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-4 py-3">
                                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
                                    <span className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                </div>

                {/* ── Tech Stack ── */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                    className="mt-6 rounded-[1.8rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                >
                    <h2 className="text-xs tracking-[0.16em] uppercase font-black text-[var(--text-muted)] mb-5">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2.5">
                        {project.stack.map((tech: string) => (
                            <span
                                key={tech}
                                className="px-4 py-2 rounded-full text-sm font-bold bg-[var(--site-card-bg-strong)] text-[#10b981] border border-[var(--site-border)] hover:bg-[#10b981]/15 hover:border-[#10b981]/40 transition-colors cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.section>

            </main>
        </div>
    );
}
