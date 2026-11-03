'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import CareerLensVisualizer from './CareerLensVisualizer';
import AgriInsightVisualizer from './AgriInsightVisualizer';
import YTGptVisualizer from './YTGptVisualizer';
import CareerLensPipelineGraphic from './CareerLensPipelineGraphic';
import AgriInsightChartGraphic from './AgriInsightChartGraphic';
import YTGptRetrievalGraphic from './YTGptRetrievalGraphic';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';

// Project specific accent configurations
const PROJECT_THEMES = {
  careerlens: {
    badge: 'border-violet-500/30 text-violet-300 bg-violet-500/10',
    panelGlow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.14)] border-violet-500/20 hover:border-violet-500/40',
    accentRgb: [168, 85, 247],
    glowGradient: 'from-violet-500/5 via-transparent to-transparent',
    accentText: 'text-violet-400',
    accentBorder: 'border-violet-500/30',
  },
  agriinsight: {
    badge: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
    panelGlow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.14)] border-emerald-500/20 hover:border-emerald-500/40',
    accentRgb: [16, 185, 129],
    glowGradient: 'from-emerald-500/5 via-transparent to-transparent',
    accentText: 'text-emerald-400',
    accentBorder: 'border-emerald-500/30',
  },
  'yt-gpt': {
    badge: 'border-sky-500/30 text-sky-300 bg-sky-500/10',
    panelGlow: 'hover:shadow-[0_0_40px_rgba(56,189,248,0.14)] border-sky-500/20 hover:border-sky-500/40',
    accentRgb: [56, 189, 248],
    glowGradient: 'from-sky-500/5 via-transparent to-transparent',
    accentText: 'text-sky-400',
    accentBorder: 'border-sky-500/30',
  },
};

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const theme = PROJECT_THEMES[project.id] || {
    badge: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
    panelGlow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.12)] border-white/[0.08] hover:border-white/20',
    accentRgb: [99, 102, 241],
    glowGradient: 'from-cyan-500/5 via-transparent to-transparent',
    accentText: 'text-cyan-400',
    accentBorder: 'border-white/10',
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
      className="scroll-mt-28 py-10 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Translucent Glassmorphic Project Panel */}
        <div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`group relative rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl bg-surface-100/50 border transition-all duration-500 hover:-translate-y-1 ${theme.panelGlow} overflow-hidden shadow-2xl`}
        >
          {/* Subtle Project Color Reflection Gradient */}
          <div
            className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${theme.glowGradient} pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
          />

          {/* Editorial Card Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${theme.badge}`}>
                {project.category}
              </span>
              {project.isFlagship && (
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-300 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  FLAGSHIP SYSTEM
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-300 hover:text-white glass-panel-subtle hover:border-white/20 transition-all cursor-pointer"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              </Link>
              <Link
                href={`/projects/${project.id}`}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200 transition-all shadow-sm cursor-pointer"
              >
                <span>Case Study</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Two-Column Editorial Showcase */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Narrative, Self-Drawing Graphic & Stack */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h3
                  className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold text-white tracking-tight leading-[1.08] mb-2"
                >
                  {project.title}
                </h3>
                <p className={`text-xs font-mono mb-4 tracking-wide ${theme.accentText}`}>
                  {project.subtitle}
                </p>

                {/* Self-Drawing Technical Architecture Graphic */}
                {project.id === 'careerlens' && <CareerLensPipelineGraphic />}
                {project.id === 'agriinsight' && <AgriInsightChartGraphic />}
                {project.id === 'yt-gpt' && <YTGptRetrievalGraphic />}

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
                  {project.description}
                </p>

                {/* Technical Contributions */}
                <div className="mb-6 space-y-2">
                  <h4 className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                    Key Technical Contributions:
                  </h4>
                  {project.technicalHighlights.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${theme.accentText}`} />
                      <span className="leading-normal">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Stack Badges */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <h4 className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-2">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-surface-200/60 border border-white/[0.06] text-xs font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-white/[0.06]">
                {project.metrics.slice(0, 2).map((metric, i) => (
                  <div key={i} className="p-3 rounded-xl bg-surface-300/40 border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-zinc-400 block">{metric.label}</span>
                    <span className="text-base font-bold font-display text-white">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Hands-on Architecture Visualizer */}
            <div className="lg:col-span-7">
              {project.id === 'careerlens' && <CareerLensVisualizer />}
              {project.id === 'agriinsight' && <AgriInsightVisualizer />}
              {project.id === 'yt-gpt' && <YTGptVisualizer />}
            </div>

          </div>

        </div>

      </div>
    </article>
  );
}
