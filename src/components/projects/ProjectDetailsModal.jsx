'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Github, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  Workflow, 
  Cpu, 
  Server, 
  ShieldAlert,
  Layers,
  Sparkles
} from 'lucide-react';

export default function ProjectDetailsModal({ project, isOpen, onClose }) {
  // Handle Escape key and body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[88vh] rounded-3xl glass-panel bg-surface-200/95 border border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden z-10 text-left"
          >
            {/* Header */}
            <div className="p-6 sm:p-7 border-b border-white/[0.08] relative">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-300">
                    {project.category}
                  </span>
                  <span className="text-zinc-500 text-xs font-mono">•</span>
                  <span className="text-xs font-mono text-zinc-400">
                    SYSTEM #{project.number || '01'}
                  </span>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm font-sans text-indigo-300 mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Scrollable Modal Body */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 text-sm">
              
              {/* 1. Quick Metrics Grid */}
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                    <span>System Specifications</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {project.metrics.map((m, idx) => (
                      <div 
                        key={idx} 
                        className="p-3 rounded-xl bg-surface-100/80 border border-white/[0.06] flex flex-col justify-between"
                      >
                        <span className="text-[10px] font-mono text-zinc-400 uppercase truncate">
                          {m.label}
                        </span>
                        <span className="text-xs sm:text-sm font-mono font-bold text-white mt-1 truncate">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Problem Statement */}
              {project.problemStatement && (
                <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
                  <h3 className="text-xs font-mono text-indigo-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Problem Statement &amp; Purpose</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {/* 3. Technical Architecture Stages */}
              {project.architectureStages && project.architectureStages.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Architecture Stages</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.architectureStages.map((stage) => (
                      <div 
                        key={stage.stage}
                        className="p-3.5 rounded-xl bg-surface-100/60 border border-white/[0.06] flex flex-col justify-between gap-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-cyan-400 font-bold">
                            STAGE {stage.stage}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400 truncate bg-surface-200 px-1.5 py-0.5 rounded border border-white/5">
                            {stage.tech}
                          </span>
                        </div>
                        <h4 className="text-xs font-display font-semibold text-white">
                          {stage.name}
                        </h4>
                        <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Engineering Highlights & Contributions */}
              {project.technicalHighlights && project.technicalHighlights.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Key Engineering Highlights</span>
                  </h3>
                  <ul className="space-y-2">
                    {project.technicalHighlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs font-sans text-zinc-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 5. Technologies Used */}
              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Technologies &amp; Libraries
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-surface-100 border border-white/10 text-xs font-mono text-zinc-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Footer Action Links */}
            <div className="p-5 sm:p-6 border-t border-white/[0.08] bg-surface-300/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-surface-100 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Repo</span>
                  </Link>
                )}

                {project.liveDemo && (
                  <Link
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-300 hover:text-emerald-200 bg-emerald-500/10 border border-emerald-500/30 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live App</span>
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/projects/${project.id}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-all shadow-md shadow-white/10"
                >
                  <span>Full Case Study Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
