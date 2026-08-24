"use client";
import { useEffect, useState, type MouseEvent } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import aetherShot from '../assets/imgs/aether.jpeg';
import calgpaShot from '../assets/imgs/calgpa.jpeg';
import zephraShot from '../assets/imgs/zephra.jpeg';
import minimindsShot from '../assets/imgs/miniminds.jpeg';
import carsioShot from '../assets/imgs/cario.jpeg';
import roledocShot from '../assets/imgs/roledoc.jpeg';
import textotestShot from '../assets/imgs/textotest.jpeg';

type PhoneMockupProps = {
  screenshotSrc?: string | StaticImageData;
  alt: string;
  accentClassName: string;
  topVisibleImageOnly?: boolean;
  imageClassName?: string;
  topGapPx?: number;
  frameClassName?: string;
  mockupColor?: 'default' | 'white' | 'greenish';
};

type ProjectKey = 'calgpa' | 'zephra' | 'aether' | 'campusnow' | 'miniminds' | 'carsio' | 'roledoc' | 'textotest' | 'cardone';

type BracketButtonProps = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  expanded: boolean;
  className?: string;
  iconClassName?: string;
};

type ProjectMeta = {
  name: string;
  short: string;
  badge: string;
  logoIcon: string;
  logoTone: string;
  accentClassName: string;
  description: string;
  workedOn: string;
  domain: string;
  role: string;
  stack: string[];
  repoUrl: string;
  liveUrl: string;
};

type ProjectRating = {
  count: number;
  average: number;
  starCounts: number[];
};

const groupedDesktopRows: ProjectKey[][] = [
  ['aether', 'calgpa', 'zephra'],
  ['campusnow', 'miniminds', 'carsio', 'roledoc'],
  ['textotest', 'cardone'],
];

function createEmptyRatings(): Record<ProjectKey, ProjectRating> {
  return {
    calgpa: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    zephra: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    aether: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    campusnow: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    miniminds: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    carsio: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    roledoc: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    textotest: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    cardone: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
  };
}

function BracketButton({ onClick, label, expanded, className = '', iconClassName = '' }: BracketButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-3 right-3 z-20 h-8 w-8 rounded-xl border border-[#10b981]/70 bg-[#10b981] text-white backdrop-blur-md shadow-[0_10px_24px_rgba(16,185,129,0.20)] inline-flex items-center justify-center transition-colors hover:bg-[#059669] ${className}`}
    >
      <span className={`material-symbols-outlined block text-[0.9rem] leading-none ${iconClassName}`} aria-hidden="true">{expanded ? 'expand_less' : 'expand_more'}</span>
    </button>
  );
}

function PhoneMockup({ screenshotSrc, alt, accentClassName, topVisibleImageOnly = false, imageClassName = '', topGapPx = 0, frameClassName = '', mockupColor = 'default' }: PhoneMockupProps) {
  let bgColor = 'bg-[var(--site-card-bg-strong)]';
  let borderClass = '';
  if (mockupColor === 'white') {
    bgColor = 'bg-white';
    borderClass = 'border-[5px] border-[#f3f4f6] shadow-xl';
  } else if (mockupColor === 'greenish') {
    bgColor = 'bg-[#ecfdf5]';
    borderClass = 'border-[5px] border-[#a7f3d0] shadow-xl';
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${bgColor} ${borderClass} rounded-[2.1rem] ${frameClassName}`}>
      {screenshotSrc ? (
        topVisibleImageOnly ? (
          <div className="h-full w-full flex flex-col">
            <div className="relative h-[90%] w-full overflow-hidden">
              <Image src={screenshotSrc} alt={alt} fill className={`object-cover object-top ${imageClassName}`} sizes="(max-width: 768px) 90vw, 370px" />
            </div>
            <div className="h-[10%] w-full bg-gradient-to-b from-[var(--site-card-bg-strong)]/28 to-[var(--site-card-bg-strong)]/55" />
          </div>
        ) : (
          <>
            <Image src={screenshotSrc} alt={alt} fill className={`object-cover ${imageClassName}`} sizes="(max-width: 768px) 90vw, 370px" />
            {topGapPx > 0 ? <div className="absolute inset-x-0 top-0 z-10 bg-[var(--site-card-bg-strong)]/40" style={{ height: `${topGapPx}px` }} /> : null}
          </>
        )
      ) : (
        <div className={`h-full w-full ${accentClassName} p-3 text-white`}>
          <div className="h-full w-full rounded-[1.35rem] bg-white/18 backdrop-blur-[1px] border border-white/30 p-3 flex flex-col gap-2.5">
            <div className="h-4 w-2/3 rounded-full bg-white/70" />
            <div className="h-16 rounded-xl bg-white/80" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 rounded-lg bg-white/70" />
              <div className="h-10 rounded-lg bg-white/55" />
            </div>
            <div className="h-3 w-5/6 rounded-full bg-white/70" />
            <div className="h-3 w-4/6 rounded-full bg-white/55" />
            <div className="mt-auto grid grid-cols-3 gap-2">
              <div className="h-8 rounded-lg bg-white/80" />
              <div className="h-8 rounded-lg bg-white/60" />
              <div className="h-8 rounded-lg bg-white/70" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default function ProjectGrid() {
  const [activeProject, setActiveProject] = useState<ProjectKey | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [ratings, setRatings] = useState<Record<ProjectKey, ProjectRating>>(createEmptyRatings);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Record<ProjectKey, boolean>>(() => ({
    calgpa: false,
    zephra: false,
    aether: true,
    campusnow: true,
    miniminds: false,
    carsio: false,
    roledoc: false,
    textotest: false,
    cardone: false,
  }));
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeProject]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const syncDesktop = () => setIsDesktop(media.matches);
    syncDesktop();

    media.addEventListener('change', syncDesktop);
    return () => media.removeEventListener('change', syncDesktop);
  }, []);

  useEffect(() => {
    let stopped = false;

    const fetchRatings = async () => {
      try {
        const response = await fetch('/api/project-ratings', { cache: 'no-store' });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { ratings?: Partial<Record<ProjectKey, ProjectRating>> };
        if (!stopped && data.ratings) {
          setRatings((prev) => ({ ...prev, ...data.ratings }));
        }
      } catch {
        // Ignore transient network errors.
      }
    };

    fetchRatings();

    return () => {
      stopped = true;
    };
  }, []);

  const submitRating = async (projectKey: ProjectKey, stars: number) => {
    if (isSubmittingRating) {
      return;
    }

    setIsSubmittingRating(true);
    try {
      const response = await fetch('/api/project-ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectKey, stars }),
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { ratings?: Partial<Record<ProjectKey, ProjectRating>> };
      if (data.ratings) {
        setRatings((prev) => ({ ...prev, ...data.ratings }));
      }
    } catch {
      // Ignore submit errors to keep popup interactions smooth.
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const renderRatingSummary = (projectKey: ProjectKey, compact = false) => {
    const stats = ratings[projectKey] ?? { count: 0, average: 0, starCounts: [0, 0, 0, 0] };
    const filledStars = Math.round(stats.average);

    return (
      <div className={`mt-2 flex items-center gap-2 ${compact ? 'text-[11px]' : 'text-sm'}`}>
        <span className="inline-flex gap-[2px] text-[#10b981]">
          {[0, 1, 2, 3].map((star) => (
            <span key={star}>{star < filledStars ? '★' : '☆'}</span>
          ))}
        </span>
        <span className="font-semibold text-[var(--text-secondary)]">
          {stats.count > 0 ? `${stats.average.toFixed(1)} (${stats.count})` : 'No ratings yet'}
        </span>
      </div>
    );
  };

  const renderProjectDetails = (projectKey: ProjectKey, dense = false) => {
    const project = popupProjects[projectKey];
    const stackPreview = project.stack.slice(0, dense ? 3 : 4);

    return (
      <div className={`mt-3 ${dense ? 'space-y-3' : 'space-y-4'}`}>
        <p className={`${dense ? 'text-[0.9rem]' : 'text-sm md:text-[0.98rem]'} leading-relaxed text-[var(--text-secondary)] font-medium ${dense ? 'line-clamp-2' : 'line-clamp-3'}`}>
          {project.description}
        </p>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-3 py-2">
            <p className="text-[9px] tracking-[0.12em] uppercase text-[#10b981] font-bold">Domain</p>
            <p className="mt-0.5 text-[11px] md:text-xs font-bold text-[var(--text-card)] line-clamp-1">{project.domain}</p>
          </div>
          <div className="rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-3 py-2">
            <p className="text-[9px] tracking-[0.12em] uppercase text-[#10b981] font-bold">Role</p>
            <p className="mt-0.5 text-[11px] md:text-xs font-bold text-[var(--text-card)] line-clamp-1">{project.role}</p>
          </div>
          <div className="rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-3 py-2">
            <p className="text-[9px] tracking-[0.12em] uppercase text-[#10b981] font-bold">When</p>
            <p className="mt-0.5 text-[11px] md:text-xs font-bold text-[var(--text-card)] line-clamp-1">{project.workedOn}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {stackPreview.map((tech) => (
            <span key={tech} className="px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-[var(--site-card-bg-strong)] text-[#10b981] border border-[var(--site-border)]">
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // ServiceNow leaf green rating choices
  const ratingChoices = [
    { stars: 1, label: 'Poor', className: 'border-[#34d399]/70 bg-[#34d399] text-white' },
    { stars: 2, label: 'Fair', className: 'border-[#10b981]/70 bg-[#10b981] text-white' },
    { stars: 3, label: 'Good', className: 'border-[#059669]/80 bg-[#059669] text-white' },
    { stars: 4, label: 'Great', className: 'border-[#047857]/85 bg-[#047857] text-white' },
  ] as const;

  const screenshots: Record<ProjectKey, StaticImageData> = {
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

  const popupProjects: Record<ProjectKey, ProjectMeta> = {
    calgpa: {
      name: 'CalGPA',
      short: 'Academic performance tracker with GPA prediction and attendance planning.',
      badge: 'EdTech • Progressive Web App',
      logoIcon: 'school',
      logoTone: 'text-[#10b981]',
      accentClassName: 'bg-gradient-to-b from-[#10b981] to-[#059669]',
      description:
        'CalGPA helps university students monitor academic performance through GPA estimation, subject analysis, and attendance planning. Built as a Progressive Web App for offline accessibility across devices.',
      workedOn: 'Oct 2024 – Apr 2025',
      domain: 'Education Technology',
      role: 'Full Stack Developer',
      stack: [
        'HTML',
        'CSS',
        'JavaScript',
        'PWA',
        'Responsive Design'
      ],
      repoUrl: 'YOUR_REPO',
      liveUrl: 'YOUR_LIVE_URL',
    },

    zephra: {
      name: 'Zephra',
      short: 'NASA-powered air quality forecasting platform.',
      badge: 'NASA Space Apps 2025',
      logoIcon: 'air',
      logoTone: 'text-[#10b981]',
      accentClassName: 'bg-gradient-to-b from-[#10b981] to-[#047857]',
      description:
        'Zephra delivers real-time and short-term air quality forecasts by combining NASA TEMPO satellite observations with ground monitoring data, providing interactive visualizations and public health insights.',
      workedOn: 'Oct 2025',
      domain: 'Climate Intelligence',
      role: 'Frontend & AI Developer',
      stack: [
        'React',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'FastAPI',
        'Python',
        'Chart.js',
        'NASA APIs'
      ],
      repoUrl: 'YOUR_REPO',
      liveUrl: 'YOUR_DOMAIN',
    },

    aether: {
      name: 'Aether',
      short: 'AI virtual pet powered by journaling and emotional analytics.',
      badge: 'AI Companion',
      logoIcon: 'auto_awesome',
      logoTone: 'text-[#10b981]',
      accentClassName: 'bg-gradient-to-b from-[#10b981] to-[#047857]',
      description:
        'A virtual pet ecosystem that combines journaling, habit tracking, emotional analytics, and autonomous AI behaviour to create a personalized self-improvement companion.',
      workedOn: 'Mar 2026 – Present',
      domain: 'Artificial Intelligence',
      role: 'Mobile App Developer',
      stack: [
        'Flutter',
        'Dart',
        'AI',
        'Behavior Analytics'
      ],
      repoUrl: 'YOUR_REPO',
      liveUrl: 'YOUR_LIVE_URL',
    },

    campusnow: {
      name: 'CampusNow',
      short: 'ServiceNow-based campus management platform.',
      badge: 'Enterprise Workflow',
      logoIcon: 'domain',
      logoTone: 'text-[#10b981]',
      accentClassName: 'bg-gradient-to-b from-[#10b981] to-[#047857]',
      description:
        'A centralized campus management platform built on ServiceNow that automates academic and administrative workflows using role-based access control and enterprise process automation.',
      workedOn: 'Jul 2026 – Present',
      domain: 'Enterprise Software',
      role: 'ServiceNow Developer',
      stack: [
        'ServiceNow',
        'ServiceNow Studio',
        'ITSM',
        'Access Control'
      ],
      repoUrl: 'YOUR_REPO',
      liveUrl: 'YOUR_LIVE_URL',
    },

    miniminds: {
      name: 'Mini-Minds',
      short: 'Gamified learning platform for children.',
      badge: 'Educational Platform',
      logoIcon: 'toys',
      logoTone: 'text-[#10b981]',
      accentClassName: 'bg-gradient-to-b from-[#10b981] to-[#059669]',
      description:
        'An interactive e-learning platform that makes education engaging through mini games, reward systems, and child-friendly educational activities.',
      workedOn: '2024',
      domain: 'EdTech',
      role: 'Frontend Developer',
      stack: [
        'React',
        'TypeScript',
        'Tailwind CSS'
      ],
      repoUrl: 'YOUR_REPO',
      liveUrl: 'YOUR_LIVE_URL',
    },

    carsio: {
      name: 'Cars.IO',
      short: 'Full-stack car inventory management system.',
      badge: 'Full Stack',
      logoIcon: 'directions_car',
      logoTone: 'text-[#10b981]',
      accentClassName: 'bg-gradient-to-b from-[#10b981] to-[#059669]',
      description:
        'A full-stack inventory management platform for dealerships featuring authentication, SQL-backed inventory management, profile management, and secure session handling.',
      workedOn: 'May 2025',
      domain: 'Inventory Management',
      role: 'Full Stack Developer',
      stack: [
        'HTML',
        'CSS',
        'JavaScript',
        'Node.js',
        'Express',
        'SQL'
      ],
      repoUrl: 'YOUR_REPO',
      liveUrl: 'YOUR_LIVE_URL',
    },

    roledoc: {
      name: 'RoleDoc',
      short: 'Persona-driven RAG document assistant.',
      badge: 'Generative AI',
      logoIcon: 'description',
      logoTone: 'text-[#10b981]',
      accentClassName: 'bg-gradient-to-b from-[#10b981] to-[#047857]',
      description:
        'An AI document assistant that transforms uploaded PDFs, DOCX, and TXT files into conversational agents using Retrieval-Augmented Generation with customizable response personas.',
      workedOn: 'Jul 2025 – Aug 2025',
      domain: 'Artificial Intelligence',
      role: 'AI Engineer',
      stack: [
        'React',
        'FastAPI',
        'Python',
        'FAISS',
        'Transformers',
        'Mistral'
      ],
      repoUrl: 'YOUR_REPO',
      liveUrl: 'YOUR_LIVE_URL',
    },

    textotest: {
      name: 'TexToTest',
      short: 'AI-powered contextual MCQ generation platform.',
      badge: 'AI Education',
      logoIcon: 'quiz',
      logoTone: 'text-[#10b981]',
      accentClassName: 'bg-gradient-to-b from-[#34d399] to-[#10b981]',
      description:
        'Generates context-aware multiple-choice questions from learning material using large language models, helping students practice and educators create assessments faster.',
      workedOn: '2026',
      domain: 'Educational AI',
      role: 'AI Product Developer',
      stack: [
        'Next.js',
        'TypeScript',
        'LLMs',
        'Prompt Engineering'
      ],
      repoUrl: 'YOUR_REPO',
      liveUrl: 'YOUR_LIVE_URL',
    },

    cardone: {
      name: 'HabitO',
      short: 'Gamified habit tracker with streak analytics.',
      badge: 'Productivity',
      logoIcon: 'psychiatry',
      logoTone: 'text-[#10b981]',
      accentClassName: 'bg-gradient-to-b from-[#34d399] to-[#059669]',
      description:
        'A habit tracking application featuring streaks, progress visualization, gamification, and Habitica integration to encourage long-term consistency.',
      workedOn: 'Apr 2025 – May 2025',
      domain: 'Productivity',
      role: 'Full Stack Developer',
      stack: [
        'Electron',
        'Spring Boot',
        'JavaScript',
        'SQL',
        'Habitica API'
      ],
      repoUrl: 'YOUR_REPO',
      liveUrl: 'YOUR_LIVE_URL',
    },
  };

  const toggleExpand = (projectKey: ProjectKey, event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setExpandedCards((prev) => {
      const nextState = !prev[projectKey];
      const next = { ...prev };
      const desktopGroup = groupedDesktopRows.find((group) => group.includes(projectKey));

      if (isDesktop && desktopGroup) {
        for (const key of desktopGroup) {
          next[key] = nextState;
        }
        return next;
      }

      next[projectKey] = nextState;
      return next;
    });
  };

  const renderCompactCard = (projectKey: ProjectKey, className = '', delay = 0) => {
    const project = popupProjects[projectKey];

    return (
      <motion.div
        id={projectKey}
        key={`${projectKey}-compact`}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.93, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-24px' }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay }}
        className={`relative h-full min-h-[176px] rounded-[1.7rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-lg px-4 py-4 md:px-5 md:py-4 flex items-center gap-3 shadow-[0_18px_45px_rgba(0,0,0,0.15)] cursor-pointer ${className}`}
        onClick={() => window.location.href = `/project/${projectKey}`}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            window.location.href = `/project/${projectKey}`;
          }
        }}
      >
        <div className="min-w-0 pr-9 flex-1">
          <p className="truncate text-sm md:text-base font-black font-doto text-[var(--text-card)]">{project.name}</p>
          <p className="truncate text-xs md:text-sm text-[var(--text-muted)] font-medium">{project.short}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#10b981]">{project.domain}</span>
            <span className="rounded-full border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-secondary)]">{project.workedOn}</span>
          </div>
        </div>
        <BracketButton
          onClick={(event) => toggleExpand(projectKey, event)}
          label={`Expand ${project.name} card`}
          expanded={expandedCards[projectKey]}
        />
      </motion.div>
    );
  };

  const renderVerticalCard = (projectKey: ProjectKey, className = '', delay = 0) => {
    const project = popupProjects[projectKey];
    const hasBottomMockup = projectKey === 'zephra' || projectKey === 'miniminds';

    return (
      <motion.div
        id={projectKey}
        key={`${projectKey}-vertical`}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.93, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-24px' }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay }}
        className={`relative h-full min-h-[380px] rounded-[1.7rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-lg p-5 md:p-6 flex flex-col gap-4 shadow-[0_18px_45px_rgba(0,0,0,0.15)] cursor-pointer overflow-hidden ${className}`}
        onClick={() => window.location.href = `/project/${projectKey}`}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            window.location.href = `/project/${projectKey}`;
          }
        }}
      >
        <div className="flex items-start justify-between gap-3 relative z-10">
          <BracketButton
            onClick={(event) => toggleExpand(projectKey, event)}
            label={`Expand ${project.name} card`}
            expanded={expandedCards[projectKey]}
          />
        </div>

        <div className={`flex-1 flex flex-col relative z-10 ${hasBottomMockup ? 'justify-start md:pb-[40%]' : 'justify-center'}`}>
          <p className="inline-flex w-fit text-[#10b981] font-bold text-[10px] tracking-[0.14em] uppercase bg-[#10b981]/10 px-3 py-1.5 rounded-full mb-3">
            {project.badge}
          </p>
          <h3 className="text-2xl md:text-3xl font-black font-doto text-[var(--text-heading)] leading-tight">{project.name}</h3>
          <p className="mt-2 text-sm md:text-base text-[var(--text-secondary)] font-medium leading-relaxed line-clamp-3">{project.short}</p>
          {renderProjectDetails(projectKey, true)}
        </div>

        <div className="text-white relative z-10">{renderRatingSummary(projectKey)}</div>

        {hasBottomMockup && (
          <div className="hidden md:block absolute -bottom-[15%] left-1/2 -translate-x-1/2 w-[65%] h-[60%] z-0 max-w-[240px]">
            <PhoneMockup
              mockupColor="greenish"
              screenshotSrc={screenshots[projectKey]}
              alt={`${project.name} preview`}
              accentClassName={project.accentClassName}
              topVisibleImageOnly
              frameClassName="rounded-[1.4rem]"
            />
          </div>
        )}
      </motion.div>
    );
  };

  const renderLandscapeCard = (projectKey: ProjectKey, className = '', delay = 0) => {
    const project = popupProjects[projectKey];
    const isAether = projectKey === 'aether';
    const isTextoTest = projectKey === 'textotest';
    const showMockup = isAether || isTextoTest;

    return (
      <motion.div
        id={projectKey}
        key={`${projectKey}-landscape`}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 22 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-36px' }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay }}
        className={`relative h-full min-h-[320px] overflow-hidden rounded-[2.35rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-lg p-5 md:p-6 shadow-[0_22px_54px_rgba(0,0,0,0.2)] cursor-pointer ${className}`}
        onClick={() => window.location.href = `/project/${projectKey}`}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            window.location.href = `/project/${projectKey}`;
          }
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.08),_transparent_32%)]" />

        <div className={`relative grid h-full grid-cols-1 gap-4 md:items-center ${showMockup ? (isAether ? 'md:grid-cols-[0.95fr_1.05fr]' : 'md:grid-cols-[1.05fr_0.95fr]') : 'md:grid-cols-1'}`}>
          <div className={`flex h-full flex-col ${isAether ? 'order-2 md:order-2' : 'order-1'}`}>
            <div className="flex items-start justify-between gap-3">
              <BracketButton
                onClick={(event) => toggleExpand(projectKey, event)}
                label={`Toggle ${project.name} card`}
                expanded={expandedCards[projectKey]}
              />
            </div>

            <p className="mt-4 inline-flex w-fit text-[#10b981] font-bold text-[10px] tracking-[0.14em] uppercase bg-[#10b981]/10 px-4 py-1.5 rounded-full">
              {project.badge}
            </p>
            <h3 className="mt-3 text-3xl md:text-4xl font-black font-doto text-[var(--text-heading)] leading-tight">{project.name}</h3>
            <p className="mt-2 max-w-xl text-sm md:text-base text-[var(--text-secondary)] font-medium leading-relaxed">{project.short}</p>
            {renderProjectDetails(projectKey)}

            <div className="mt-auto pt-4 text-white">{renderRatingSummary(projectKey)}</div>
          </div>

          {showMockup ? (
            <div className={`relative flex items-center justify-center ${isAether ? 'order-1 md:order-1' : 'order-2'}`}>
              <div className={`w-[140px] md:w-[170px] h-[280px] md:h-[340px] relative transition-transform hover:rotate-0 duration-500 ${isAether ? 'rotate-[-4deg]' : 'rotate-[4deg]'}`}>
                <PhoneMockup
                  mockupColor="white"
                  screenshotSrc={screenshots[projectKey] || undefined}
                  alt={`${project.name} preview`}
                  accentClassName={project.accentClassName}
                  topVisibleImageOnly
                  frameClassName="rounded-[1.4rem]"
                />
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    );
  };

  const selectedProject = activeProject ? popupProjects[activeProject] : null;
  const selectedScreenshot = activeProject ? screenshots[activeProject] : undefined;

  return (
    <section id="projects" className="px-6 md:px-12 w-full max-w-7xl mx-auto scroll-mt-28">
      <div className="text-center mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-headline font-doto text-[var(--text-heading)] mb-6">
          Projects Made<span className="font-doto text-4xl sm:text-5xl md:text-7xl font-extrabold rubber-spin-dot inline-flex items-center justify-center w-[1em] h-[1em] leading-none align-middle text-[#10b981]">+</span>
        </h2>
        <p className="text-xl text-[var(--text-secondary)] font-medium">Real projects I built to solve real problems, with design and engineering working together.</p>
      </div>

      {/* ── Desktop magazine grid ── */}
      <div className="hidden md:grid gap-5 auto-rows-[minmax(176px,auto)]" style={{
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
      }}>
        {/* Row 1: Small + Large Feature */}
        <div className="col-span-1 row-span-1">
          {renderCompactCard('calgpa', 'min-h-[176px]', 0.08)}
        </div>
        <div className="col-span-2 row-span-2">
          {renderLandscapeCard('aether', 'min-h-[380px]', 0)}
        </div>

        {/* Row 2: Tall + Medium + Tall */}
        <div className="col-span-1 row-span-2">
          {renderVerticalCard('zephra', 'min-h-[380px]', 0.14)}
        </div>
        <div className="col-span-1 row-span-1">
          {renderVerticalCard('campusnow', 'min-h-[240px]', 0.1)}
        </div>
        <div className="col-span-1 row-span-2">
          {renderVerticalCard('miniminds', 'min-h-[380px]', 0.06)}
        </div>

        {/* Row 3: Large Feature + Small */}
        <div className="col-span-2 row-span-1">
          {renderLandscapeCard('textotest', 'min-h-[240px]', 0.04)}
        </div>
        <div className="col-span-1 row-span-1">
          {renderCompactCard('carsio', 'min-h-[176px]', 0.12)}
        </div>

        {/* Row 4: Small + Small + Small */}
        <div className="col-span-1 row-span-1">
          {renderCompactCard('roledoc', 'min-h-[176px]', 0.18)}
        </div>
        <div className="col-span-1 row-span-1">
          {renderCompactCard('cardone', 'min-h-[176px]', 0.12)}
        </div>
      </div>

      {/* ── Tablet 2-column adaptive grid ── */}
      <div className="hidden md:hidden lg:hidden grid gap-5 auto-rows-[minmax(176px,auto)]" style={{
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
      }}>
        {/* Row 1: Small + Large Feature */}
        <div className="col-span-1 row-span-1">
          {renderCompactCard('calgpa', 'min-h-[176px]', 0.08)}
        </div>
        <div className="col-span-1 row-span-2">
          {renderLandscapeCard('aether', 'min-h-[380px]', 0)}
        </div>

        {/* Row 2: Tall + Medium */}
        <div className="col-span-1 row-span-2">
          {renderVerticalCard('zephra', 'min-h-[380px]', 0.14)}
        </div>
        <div className="col-span-1 row-span-1">
          {renderLandscapeCard('campusnow', 'min-h-[240px]', 0.1)}
        </div>

        {/* Row 3: Tall + Small */}
        <div className="col-span-1 row-span-2">
          {renderVerticalCard('miniminds', 'min-h-[380px]', 0.06)}
        </div>
        <div className="col-span-1 row-span-1">
          {renderCompactCard('carsio', 'min-h-[176px]', 0.12)}
        </div>

        {/* Row 4: Large Feature + Small */}
        <div className="col-span-1 row-span-1">
          {renderLandscapeCard('textotest', 'min-h-[240px]', 0.04)}
        </div>
        <div className="col-span-1 row-span-1">
          {renderCompactCard('roledoc', 'min-h-[176px]', 0.18)}
        </div>

        {/* Row 5: Small + Small */}
        <div className="col-span-1 row-span-1">
          {renderCompactCard('cardone', 'min-h-[176px]', 0.12)}
        </div>
      </div>

      {/* ── Mobile list ── */}
      <div className="space-y-4 md:hidden">
        {(['aether', 'calgpa', 'zephra', 'miniminds', 'carsio', 'roledoc', 'campusnow', 'textotest', 'cardone'] as ProjectKey[]).map((projectKey, i) => {
          if (projectKey === 'aether' || projectKey === 'textotest' || projectKey === 'zephra' || projectKey === 'miniminds' || projectKey === 'campusnow') {
            return renderVerticalCard(projectKey, 'min-h-[340px]', i * 0.06);
          }

          return renderCompactCard(projectKey, '', i * 0.06);
        })}
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-[var(--site-overlay)] backdrop-blur-[2px] px-2 pb-24 pt-20 md:px-8 md:pb-8 md:pt-24"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.99 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="relative h-full w-full md:mx-auto md:h-[82vh] md:max-w-6xl overflow-hidden rounded-[2rem] border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] backdrop-blur-md shadow-[0_24px_58px_rgba(0,0,0,0.35)]"
            >
              <div className="pointer-events-none absolute -top-20 right-6 h-36 w-36 rounded-full bg-[#10b981]/5 blur-3xl" />
              <div className="h-full overflow-y-auto p-4 md:p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="pr-2">
                    <p className="text-[10px] tracking-[0.16em] uppercase text-[#10b981] font-bold">Project Spotlight</p>
                    <h3 className="mt-1 text-2xl md:text-3xl font-black font-doto text-[var(--text-heading)] leading-tight">{selectedProject.name}</h3>
                    <p className="mt-2 text-sm md:text-[15px] text-[var(--text-secondary)] max-w-3xl leading-relaxed">{selectedProject.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveProject(null)}
                    className="h-10 w-10 rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] text-[var(--text-secondary)] hover:bg-[var(--site-card-bg)] transition-colors shrink-0 inline-flex items-center justify-center cursor-pointer"
                    aria-label="Close popup"
                  >
                    <span className="material-symbols-outlined text-[1.15rem] leading-none">close</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 md:gap-5">
                  <div className="rounded-[1.25rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-sm p-4 shadow-[0_10px_22px_rgba(0,0,0,0.2)]">
                    <div className="mx-auto relative overflow-hidden aspect-[9/19] w-[68%] sm:w-[46%] lg:w-full max-w-[210px] rounded-[1.45rem] border-[7px] border-[var(--site-border)] shadow-[0_18px_30px_rgba(0,0,0,0.3)] bg-[var(--site-card-bg-strong)]">
                      <PhoneMockup
                        screenshotSrc={selectedScreenshot}
                        alt={`${selectedProject.name} popup preview`}
                        accentClassName="bg-gradient-to-b from-[#34d399] to-[#059669]"
                        frameClassName="rounded-none"
                      />
                    </div>
                  </div>

                  <div className="rounded-[1.25rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-sm p-4 md:p-5 shadow-[0_10px_22px_rgba(0,0,0,0.2)]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      <div className="rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-3 py-2">
                        <p className="text-[10px] tracking-[0.12em] uppercase text-[#10b981] font-bold">Domain</p>
                        <p className="mt-0.5 text-sm font-bold text-[var(--text-card)]">{selectedProject.domain}</p>
                      </div>
                      <div className="rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-3 py-2">
                        <p className="text-[10px] tracking-[0.12em] uppercase text-[#10b981] font-bold">Community Rating</p>
                        {activeProject ? renderRatingSummary(activeProject, true) : null}
                      </div>
                      <div className="rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-3 py-2">
                        <p className="text-[10px] tracking-[0.12em] uppercase text-[#10b981] font-bold">Project Year</p>
                        <p className="mt-0.5 text-sm font-bold text-[var(--text-card)]">{selectedProject.workedOn}</p>
                      </div>
                      <div className="rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-3 py-2">
                        <p className="text-[10px] tracking-[0.12em] uppercase text-[#10b981] font-bold">Role</p>
                        <p className="mt-0.5 text-sm font-bold text-[var(--text-card)] line-clamp-2">{selectedProject.role}</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] p-3">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-[#10b981] font-bold">Rate This Project</p>
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {ratingChoices.map((entry) => (
                          <button
                            key={entry.stars}
                            type="button"
                            onClick={() => activeProject && submitRating(activeProject, entry.stars)}
                            disabled={isSubmittingRating}
                            className={`rounded-full border px-3 py-2 text-xs font-bold tracking-wide transition-all hover:-translate-y-0.5 disabled:opacity-65 cursor-pointer ${entry.className}`}
                            aria-label={`Rate ${entry.stars} stars`}
                          >
                            {entry.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <h4 className="mt-4 text-[11px] tracking-[0.14em] uppercase font-bold font-doto text-[var(--text-secondary)]">Tech Stack</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 rounded-full text-sm font-medium bg-[var(--site-card-bg-strong)] text-[#10b981] border border-[var(--site-border)]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={selectedProject.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-4 py-3 text-center font-semibold text-[var(--text-secondary)] hover:bg-[var(--site-card-bg)] transition-colors"
                      >
                        Open Repository
                      </a>
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl border border-[var(--site-border)] bg-[var(--site-accent)] text-white px-4 py-3 text-center font-semibold hover:bg-[var(--site-accent-hover)] transition-colors"
                      >
                        Open Live App
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
