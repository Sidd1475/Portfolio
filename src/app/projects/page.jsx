import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, Sparkles } from 'lucide-react';
import ProjectArchiveView from '@/components/archive/ProjectArchiveView';

export const metadata = {
  title: 'Project Archive — Siddharth Mishra | AI Engineer',
  description: 'Structured index of AI engineering systems, machine learning models, retrieval-augmented generation pipelines, and full-stack software built by Siddharth Mishra.',
};

export default function ProjectsArchivePage() {
  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO HOMEPAGE</span>
        </Link>

        {/* Archive Page Header */}
        <div className="pb-8 border-b border-white/[0.08] mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-subtle text-xs font-mono text-cyan-300 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>CENTRALIZED SYSTEM REGISTRY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight mb-4">
            Engineered Systems &amp; <span className="text-gradient">Research Archive.</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
            A structured repository of machine learning models, retrieval-augmented generation pipelines, agentic state graphs, and full-stack applications. Every project includes verified architecture stages, technologies, and implementation trade-offs.
          </p>
        </div>

        {/* Project Archive Interactive View */}
        <ProjectArchiveView />

      </div>
    </div>
  );
}
