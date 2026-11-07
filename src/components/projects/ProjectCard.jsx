'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github, ExternalLink, Eye, ChevronRight } from 'lucide-react';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';
import ProjectVisualPreview from './ProjectVisualPreview';

// Ultra-clean card themes for visual hierarchy & lighting
const PROJECT_THEMES = {
  careerlens: {
    accent: 'violet',
    border: 'border-violet-500/25 hover:border-violet-500/60',
    glow: 'hover:shadow-[0_0_35px_rgba(139,92,246,0.18)]',
    badge: 'bg-violet-500/10 text-violet-300 border-violet-500/25',
    accentRgb: [139, 92, 246],
    category: 'Agentic AI',
    shortDescription: 'AI resume evaluation platform that extracts candidate competencies and scores against job specs via an orchestrated LangGraph workflow.',
    techs: ['LangGraph', 'FastAPI', 'Gemini API', 'Next.js'],
  },
  agriinsight: {
    accent: 'emerald',
    border: 'border-emerald-500/25 hover:border-emerald-500/60',
    glow: 'hover:shadow-[0_0_35px_rgba(16,185,129,0.18)]',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    accentRgb: [16, 185, 129],
    category: 'Machine Learning',
    shortDescription: 'District-level crop yield prediction system and feature interpretability trained on 340,000+ national agricultural records.',
    techs: ['Random Forest', 'Scikit-learn', 'Python', 'Streamlit'],
  },
  'yt-gpt': {
    accent: 'sky',
    border: 'border-sky-500/25 hover:border-sky-500/60',
    glow: 'hover:shadow-[0_0_35px_rgba(56,189,248,0.18)]',
    badge: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
    accentRgb: [56, 189, 248],
    category: 'RAG & Retrieval',
    shortDescription: 'Conversational Q&A application grounded in video transcripts using FAISS vector search and verifiable timestamped citations.',
    techs: ['FAISS', 'Sentence Transformers', 'Gemini API', 'Streamlit'],
  },
  sukoon: {
    accent: 'teal',
    border: 'border-teal-500/25 hover:border-teal-500/60',
    glow: 'hover:shadow-[0_0_35px_rgba(20,184,166,0.18)]',
    badge: 'bg-teal-500/10 text-teal-300 border-teal-500/25',
    accentRgb: [20, 184, 166],
    category: 'Wellness AI',
    shortDescription: 'Empathetic conversational mental wellness companion with real-time emotional triage and anonymous Ghost Mode spaces.',
    techs: ['Next.js', 'FastAPI', 'Gemini API', 'MongoDB'],
  },
};

export default function ProjectCard({ project, index, onOpenDetails }) {
  const cardRef = useRef(null);
  const theme = PROJECT_THEMES[project.id] || {
    accent: 'cyan',
    border: 'border-cyan-500/25 hover:border-cyan-500/60',
    glow: 'hover:shadow-[0_0_35px_rgba(6,182,212,0.18)]',
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    accentRgb: [34, 211, 238],
    category: project.category || 'AI Engineering',
    shortDescription: project.tagline || project.description,
    techs: project.technologies.slice(0, 4),
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

  const handleCardClick = (e) => {
    // If clicked on an external link or button, don't trigger card modal
    if (e.target.closest('a') || e.target.closest('button[data-action]')) return;
    if (onOpenDetails) {
      onOpenDetails(project);
    }
  };

  return (
    <article
      id={`project-${project.id}`}
      ref={cardRef}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group rounded-3xl glass-panel border ${theme.border} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${theme.glow} flex flex-col justify-between overflow-hidden h-full shadow-lg cursor-pointer`}
    >
      <div>
        {/* 1. Large Project Visual Preview Thumbnail */}
        <div className="relative group-hover:opacity-95 transition-opacity">
          <ProjectVisualPreview projectId={project.id} />
          
          {/* Subtle Category Pill in Thumbnail */}
          <div className="absolute top-3 left-3 z-20 pointer-events-none">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border backdrop-blur-md ${theme.badge}`}>
              {theme.category}
            </span>
          </div>
        </div>

        {/* 2. Project Card Content with Ample Whitespace */}
        <div className="p-6 sm:p-7 flex flex-col gap-3">
          {/* Primary Heading */}
          <div>
            <h3 className="text-2xl font-display font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              <span>{project.title}</span>
              <span className="text-xs font-mono text-zinc-500 font-normal">
                0{index + 1}
              </span>
            </h3>

            {/* Concise 1-2 sentence description */}
            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mt-2">
              {theme.shortDescription}
            </p>
          </div>

          {/* 3. Compact Technology Tags (3-4 badges) */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {theme.techs.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-surface-200/90 border border-white/[0.08] text-[11px] font-mono text-zinc-300 group-hover:border-white/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Minimal Action Links & View Details Interaction */}
      <div className="p-6 sm:p-7 pt-0 border-t border-white/[0.06] flex items-center justify-between gap-3 mt-2">
        {/* Subtle GitHub & Live Indicators */}
        <div className="flex items-center gap-3">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Code</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </Link>
          )}

          {project.liveDemo && (
            <Link
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
              title="Live App"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live App</span>
              <ArrowUpRight className="w-3 h-3 text-emerald-500" />
            </Link>
          )}
        </div>

        {/* Small "View Details" Interaction Pill */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenDetails) onOpenDetails(project);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-all shadow-sm group-hover:shadow-md cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-zinc-900" />
          <span>View Details</span>
        </button>
      </div>
    </article>
  );
}
