'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpRight, Github, ChevronRight, Layers, Sparkles, X, AlertCircle, Globe } from 'lucide-react';
import { getAllPublicProjects, getAllCategories } from '@/lib/projects';

export default function ProjectArchiveView() {
  const allProjects = useMemo(() => getAllPublicProjects(), []);
  const allCategories = useMemo(() => ['All Systems', ...getAllCategories()], []);

  const [selectedCategory, setSelectedCategory] = useState('All Systems');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects by category and text search
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All Systems' ||
        (project.categories && project.categories.includes(selectedCategory)) ||
        project.category === selectedCategory;

      // Text search match
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesText =
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query)) ||
        project.tagline.toLowerCase().includes(query);

      return matchesCategory && matchesText;
    });
  }, [allProjects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search Bar & Category Filter Controls */}
      <div className="p-4 sm:p-6 rounded-2xl glass-panel border border-white/[0.08] flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Search Input Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by technology, framework, architecture, or domain..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-200 border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dynamic Counter Indicator */}
        <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-zinc-400 px-3 py-2 rounded-xl bg-surface-300/60 border border-white/[0.06]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>
            SHOWING <strong className="text-white">{filteredProjects.length}</strong> OF{' '}
            <strong className="text-white">{allProjects.length}</strong> SYSTEMS
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {allCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                isActive
                  ? 'bg-white text-zinc-950 font-semibold shadow-md'
                  : 'glass-panel-subtle text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects List / Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`p-6 sm:p-7 rounded-2xl glass-panel border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between glow-box ${
                  project.id === 'careerlens'
                    ? 'border-violet-500/20 hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]'
                    : project.id === 'agriinsight'
                    ? 'border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]'
                    : project.id === 'yt-gpt'
                    ? 'border-sky-500/20 hover:border-sky-500/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]'
                    : project.id === 'brain-tumor-detection'
                    ? 'border-rose-500/20 hover:border-rose-500/40 hover:shadow-[0_0_30px_rgba(244,63,94,0.12)]'
                    : project.id === 'sukoon'
                    ? 'border-teal-500/20 hover:border-teal-500/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.12)]'
                    : 'border-white/[0.08] hover:border-white/20'
                }`}
              >
                <div>
                  {/* Top Card Bar */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      {project.isFlagship && (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-mono text-indigo-300 font-semibold">
                          FLAGSHIP
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full glass-panel-subtle text-[10px] font-mono text-cyan-300">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-indigo-300 mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Metrics preview */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-surface-200/50 border border-white/[0.05]"
                      >
                        <span className="text-[10px] font-mono text-zinc-400 block truncate">
                          {m.label}
                        </span>
                        <span className="text-xs font-bold text-white font-mono">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-surface-200 border border-white/[0.06] text-[10px] font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
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
                        className="flex items-center gap-1.5 text-xs font-mono text-teal-300 hover:text-teal-200 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live App</span>
                        <ArrowUpRight className="w-3 h-3 text-teal-400" />
                      </Link>
                    )}
                  </div>
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200 transition-all shadow-sm"
                  >
                    <span>Inspect Case Study</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Empty Search/Filter State */
        <div className="p-12 rounded-3xl glass-panel border border-white/[0.08] text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center text-cyan-400 mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-display font-bold text-white mb-2">
            No matching projects found
          </h4>
          <p className="text-xs text-zinc-400 font-mono mb-6 leading-relaxed">
            No projects matched category &ldquo;{selectedCategory}&rdquo; with query &ldquo;
            {searchQuery}&rdquo;. Try resetting the filters or searching for terms like FastAPI, LangGraph, or Scikit-learn.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All Systems');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-full text-xs font-mono text-zinc-950 bg-white hover:bg-zinc-200 transition-colors font-semibold"
          >
            Reset Search Filters
          </button>
        </div>
      )}
    </div>
  );
}
