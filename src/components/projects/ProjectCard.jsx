'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github, ChevronRight, ExternalLink, ArrowRight } from 'lucide-react';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';

// Ultra-glanceable project configurations: zero fluff, pure visual metrics
const PROJECT_THEMES = {
  careerlens: {
    accent: 'violet',
    border: 'border-violet-500/25 hover:border-violet-500/55',
    glow: 'hover:shadow-[0_0_35px_rgba(139,92,246,0.18)]',
    badge: 'bg-violet-500/10 text-violet-300 border-violet-500/25',
    accentText: 'text-violet-400',
    previewBg: 'from-violet-950/40 via-surface-200/50 to-surface-300/40',
    accentRgb: [139, 92, 246],
    category: 'Agentic AI',
    tagline: 'Orchestrated resume & job analysis with deterministic scoring.',
    stats: [
      { label: 'Pipeline', val: '4-Stage DAG' },
      { label: 'Orchestrator', val: 'LangGraph' },
      { label: 'State', val: 'Pydantic' },
    ],
    techs: ['LangGraph', 'FastAPI', 'Gemini API', 'Next.js'],
    flow: ['Ingest', 'Decompose', 'Score', 'Synthesize'],
  },
  agriinsight: {
    accent: 'emerald',
    border: 'border-emerald-500/25 hover:border-emerald-500/55',
    glow: 'hover:shadow-[0_0_35px_rgba(16,185,129,0.18)]',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    accentText: 'text-emerald-400',
    previewBg: 'from-emerald-950/40 via-surface-200/50 to-surface-300/40',
    accentRgb: [16, 185, 129],
    category: 'Machine Learning',
    tagline: 'District-level crop yield prediction with model interpretability.',
    stats: [
      { label: 'Accuracy', val: 'R² ≈ 0.80' },
      { label: 'Dataset', val: '340K+ Rows' },
      { label: 'Algorithm', val: 'Random Forest' },
    ],
    techs: ['Scikit-learn', 'Random Forest', 'Python', 'Streamlit'],
    flow: ['Raw Data', 'TargetEncoder', 'Ensemble', 'Feature SHAP'],
  },
  'yt-gpt': {
    accent: 'sky',
    border: 'border-sky-500/25 hover:border-sky-500/55',
    glow: 'hover:shadow-[0_0_35px_rgba(56,189,248,0.18)]',
    badge: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
    accentText: 'text-sky-400',
    previewBg: 'from-sky-950/40 via-surface-200/50 to-surface-300/40',
    accentRgb: [56, 189, 248],
    category: 'RAG & Retrieval',
    tagline: 'Timestamped YouTube Q&A grounded in video transcripts.',
    stats: [
      { label: 'Latency', val: 'Sub-ms' },
      { label: 'Vector Index', val: 'FAISS L2' },
      { label: 'Grounding', val: 'Timestamped' },
    ],
    techs: ['FAISS', 'Sentence Transformers', 'Gemini API', 'Streamlit'],
    flow: ['Transcript', 'Sliding Chunk', 'FAISS Search', 'Grounded LLM'],
  },
  sukoon: {
    accent: 'teal',
    border: 'border-teal-500/25 hover:border-teal-500/55',
    glow: 'hover:shadow-[0_0_35px_rgba(20,184,166,0.18)]',
    badge: 'bg-teal-500/10 text-teal-300 border-teal-500/25',
    accentText: 'text-teal-400',
    previewBg: 'from-teal-950/40 via-surface-200/50 to-surface-300/40',
    accentRgb: [20, 184, 166],
    category: 'Mental Wellness AI',
    tagline: 'Empathetic voice/chat companion with real-time emotional triage.',
    stats: [
      { label: 'Privacy', val: 'Ghost Mode' },
      { label: 'Safety', val: '24/7 Hotlines' },
      { label: 'Platform', val: 'Full-Stack' },
    ],
    techs: ['Next.js', 'FastAPI', 'Gemini API', 'MongoDB'],
    flow: ['Voice/Chat', 'Safety Filter', 'Empathetic LLM', 'Ghost Space'],
  },
};

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const theme = PROJECT_THEMES[project.id] || {
    accent: 'cyan',
    border: 'border-cyan-500/25 hover:border-cyan-500/55',
    glow: 'hover:shadow-[0_0_35px_rgba(6,182,212,0.18)]',
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    accentText: 'text-cyan-400',
    previewBg: 'from-cyan-950/40 via-surface-200/50 to-surface-300/40',
    accentRgb: [34, 211, 238],
    category: project.category || 'AI Engineering',
    tagline: project.tagline || project.description,
    stats: [
      { label: 'Type', val: 'Production' },
      { label: 'Status', val: 'Active' },
      { label: 'Stack', val: 'Modern' },
    ],
    techs: project.technologies.slice(0, 4),
    flow: ['Input', 'Process', 'Model', 'Output'],
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      triggerBackgroundHover(project.id, theme.accentRgb, rect);
    }
  };

  const handleMouseLeave = () => {
    clearBackgroundHover();
  };

  return (
    <article
      id={`project-${project.id}`}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group rounded-2xl glass-panel border ${theme.border} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${theme.glow} flex flex-col justify-between overflow-hidden h-full shadow-lg`}
    >
      <div>
        {/* 1. Visual Schematic Header - Glance-Based Flow */}
        <div className={`relative p-4 sm:p-5 bg-gradient-to-br ${theme.previewBg} border-b border-white/[0.06] overflow-hidden`}>
          <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

          {/* Category & Status Eyebrow */}
          <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border ${theme.badge}`}>
              {theme.category}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>PRODUCTION</span>
            </div>
          </div>

          {/* Visual Architecture Flow Diagram with Mini Arrow Links */}
          <div className="relative z-10 my-1">
            <div className="grid grid-cols-4 gap-1 items-center">
              {theme.flow.map((node, i) => (
                <div key={node} className="relative flex items-center">
                  <div className="w-full p-2 rounded-lg bg-surface-100/90 border border-white/[0.08] text-center group-hover:border-white/20 transition-colors">
                    <span className="block text-[8px] font-mono text-zinc-500 uppercase">0{i + 1}</span>
                    <span className="block text-[10px] font-mono font-semibold text-zinc-200 truncate">
                      {node}
                    </span>
                  </div>
                  {i < theme.flow.length - 1 && (
                    <ArrowRight className="w-2.5 h-2.5 text-zinc-600 absolute -right-2 z-20 pointer-events-none hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Content Body - Ultra Scannable */}
        <div className="p-5 sm:p-6 flex flex-col gap-3.5">
          {/* Project Title */}
          <div>
            <h3 className="text-2xl font-display font-bold text-white tracking-tight group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-snug mt-1">
              {theme.tagline}
            </p>
          </div>

          {/* 3. Glance-Based Metric Tiles (Numbers Over Text) */}
          <div className="grid grid-cols-3 gap-2 py-1">
            {theme.stats.map((s) => (
              <div
                key={s.label}
                className="p-2 rounded-xl bg-surface-200/50 border border-white/[0.05] text-center"
              >
                <span className="block text-xs font-mono font-bold text-white truncate">
                  {s.val}
                </span>
                <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider truncate">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* 4. Compact Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {theme.techs.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-surface-200/80 border border-white/[0.06] text-[11px] font-mono text-zinc-300 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Clean Action Links */}
      <div className="p-5 sm:p-6 pt-0 border-t border-white/[0.06] flex items-center justify-between gap-3 mt-1">
        <div className="flex items-center gap-3">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </Link>
          )}

          {project.liveDemo && (
            <Link
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
              title="Live App"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live App</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </Link>
          )}
        </div>

        {/* Case Study Pill */}
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-all shadow-sm"
        >
          <span>Case Study</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
