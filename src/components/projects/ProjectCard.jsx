'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github, ChevronRight, Sparkles, ExternalLink, Activity, Database, Workflow, Cpu } from 'lucide-react';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';

// Project theme configurations
const PROJECT_THEMES = {
  careerlens: {
    accent: 'violet',
    border: 'border-violet-500/20 hover:border-violet-500/50',
    glow: 'hover:shadow-[0_0_35px_rgba(139,92,246,0.15)]',
    badge: 'bg-violet-500/10 text-violet-300 border-violet-500/25',
    accentText: 'text-violet-400',
    highlightBg: 'bg-violet-500/5 border-violet-500/20 text-violet-200',
    previewBg: 'from-violet-950/40 via-surface-200/50 to-surface-300/40',
    accentRgb: [139, 92, 246],
    keyTechs: ['FastAPI', 'LangGraph', 'Gemini API', 'Next.js'],
    oneLiner: 'AI resume analysis platform that evaluates candidate competencies against job specs via an orchestrated LangGraph workflow.',
    highlight: 'Deterministic 4-stage StateGraph with concurrent resume & JD extraction.',
    previewMeta: '4-STAGE DAG // LANGGRAPH',
    nodes: ['Resume Parse', 'JD Extract', 'ATS Scoring', 'Synthesis'],
  },
  agriinsight: {
    accent: 'emerald',
    border: 'border-emerald-500/20 hover:border-emerald-500/50',
    glow: 'hover:shadow-[0_0_35px_rgba(16,185,129,0.15)]',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    accentText: 'text-emerald-400',
    highlightBg: 'bg-emerald-500/5 border-emerald-500/20 text-emerald-200',
    previewBg: 'from-emerald-950/40 via-surface-200/50 to-surface-300/40',
    accentRgb: [16, 185, 129],
    keyTechs: ['Scikit-learn', 'Random Forest', 'Python', 'Streamlit'],
    oneLiner: 'District-level agricultural crop yield forecasting and feature interpretability trained on 340,000+ national records.',
    highlight: 'Achieved Test R² ≈ 0.80 with TargetEncoder high-cardinality representation.',
    previewMeta: 'ML PIPELINE // RANDOM FOREST',
    nodes: ['Data Ingest', 'TargetEncoding', 'RF Regressor', 'SHAP Insights'],
  },
  'yt-gpt': {
    accent: 'sky',
    border: 'border-sky-500/20 hover:border-sky-500/50',
    glow: 'hover:shadow-[0_0_35px_rgba(56,189,248,0.15)]',
    badge: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
    accentText: 'text-sky-400',
    highlightBg: 'bg-sky-500/5 border-sky-500/20 text-sky-200',
    previewBg: 'from-sky-950/40 via-surface-200/50 to-surface-300/40',
    accentRgb: [56, 189, 248],
    keyTechs: ['FAISS', 'Sentence Transformers', 'Gemini API', 'Streamlit'],
    oneLiner: 'Conversational question-answering grounded in YouTube video transcripts with sub-millisecond semantic search.',
    highlight: '8-stage RAG pipeline with timestamped source citations & deduplication.',
    previewMeta: 'VECTOR RAG // FAISS DB',
    nodes: ['Ingestion', 'Chunking', 'FAISS Search', 'Gemini Synthesis'],
  },
  sukoon: {
    accent: 'teal',
    border: 'border-teal-500/20 hover:border-teal-500/50',
    glow: 'hover:shadow-[0_0_35px_rgba(20,184,166,0.15)]',
    badge: 'bg-teal-500/10 text-teal-300 border-teal-500/25',
    accentText: 'text-teal-400',
    highlightBg: 'bg-teal-500/5 border-teal-500/20 text-teal-200',
    previewBg: 'from-teal-950/40 via-surface-200/50 to-surface-300/40',
    accentRgb: [20, 184, 166],
    keyTechs: ['Next.js', 'FastAPI', 'Gemini API', 'MongoDB'],
    oneLiner: 'AI-powered mental wellness companion with real-time emotional triage and anonymous peer support.',
    highlight: 'Ghost Mode privacy protocol with deterministic real-time crisis escalation.',
    previewMeta: 'MULTIMODAL // CBT ASSISTANT',
    nodes: ['Voice/Chat', 'Safety Filter', 'Empathetic LLM', 'Ghost Mode'],
  },
};

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const theme = PROJECT_THEMES[project.id] || {
    accent: 'cyan',
    border: 'border-cyan-500/20 hover:border-cyan-500/50',
    glow: 'hover:shadow-[0_0_35px_rgba(6,182,212,0.15)]',
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    accentText: 'text-cyan-400',
    highlightBg: 'bg-cyan-500/5 border-cyan-500/20 text-cyan-200',
    previewBg: 'from-cyan-950/40 via-surface-200/50 to-surface-300/40',
    accentRgb: [34, 211, 238],
    keyTechs: project.technologies.slice(0, 4),
    oneLiner: project.tagline || project.description,
    highlight: project.metrics?.[0]?.detail || 'Production engineered AI system.',
    previewMeta: 'SYSTEM ARCHITECTURE',
    nodes: ['Input', 'Processing', 'Model', 'Output'],
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
        {/* 1. Visual Preview Header / Schematic Thumbnail */}
        <div className={`relative p-4 sm:p-5 bg-gradient-to-br ${theme.previewBg} border-b border-white/[0.06] overflow-hidden`}>
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

          {/* Top Status & Category Bar */}
          <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border ${theme.badge}`}>
              {project.category.split('&')[0].trim()}
            </span>
            {project.isFlagship && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-[10px] font-mono text-indigo-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                FLAGSHIP
              </span>
            )}
          </div>

          {/* Miniature Architectural Workflow Nodes */}
          <div className="relative z-10 my-1">
            <div className="text-[10px] font-mono text-zinc-400 tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Workflow className="w-3 h-3 text-zinc-400" />
                <span>{theme.previewMeta}</span>
              </span>
              <span className="text-[9px] text-zinc-400 group-hover:text-zinc-200 transition-colors">
                ACTIVE
              </span>
            </div>

            {/* Connected Micro Nodes */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {theme.nodes.map((node, i) => (
                <div
                  key={node}
                  className="p-1.5 rounded-md bg-surface-100/80 border border-white/[0.08] text-center"
                >
                  <span className="block text-[8px] font-mono text-zinc-400">0{i + 1}</span>
                  <span className="block text-[10px] font-mono font-medium text-zinc-200 truncate">
                    {node}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Main Content Body */}
        <div className="p-5 sm:p-6 flex flex-col gap-4">
          {/* Title & Subtitle */}
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <span className="text-[11px] font-mono text-zinc-400">{project.number}</span>
            </div>
            <p className={`text-xs font-mono font-medium tracking-wide ${theme.accentText} mt-0.5`}>
              {project.subtitle}
            </p>
          </div>

          {/* 3. One-line Impactful Description */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans line-clamp-2">
            {theme.oneLiner}
          </p>

          {/* 4. Compact Technology Badges (3-5 max) */}
          <div className="flex flex-wrap gap-1.5">
            {theme.keyTechs.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-surface-200/80 border border-white/[0.06] text-[11px] font-mono text-zinc-300 group-hover:border-white/15 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* 5. Key Highlight / Accomplishment Callout */}
          <div className={`p-2.5 rounded-xl border text-xs font-mono leading-relaxed flex items-start gap-2 ${theme.highlightBg}`}>
            <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-300" />
            <div className="text-[11px]">
              <strong className="text-white block font-semibold">Key Achievement:</strong>
              <span className="text-zinc-300">{theme.highlight}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Footer Action Links */}
      <div className="p-5 sm:p-6 pt-0 mt-2 border-t border-white/[0.06] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              title="View Source on GitHub"
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
              className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
              title="Open Live Deployment"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live App</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </Link>
          )}
        </div>

        {/* Case Study Link */}
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200 transition-all font-sans shadow-sm"
        >
          <span>Case Study</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
