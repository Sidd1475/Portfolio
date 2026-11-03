'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Layers, FolderGit2 } from 'lucide-react';
import { getFeaturedProjects, getAllPublicProjects } from '@/lib/projects';
import ProjectCard from './ProjectCard';
import {
  ScrollRevealHeading,
  ScrollRevealHeadingMultiline,
  ScrollRevealBadge,
  ScrollRevealParagraph,
} from '@/components/ui/ScrollReveal';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';

export default function ProjectsSection() {
  const featured = getFeaturedProjects();
  const allProjects = getAllPublicProjects();
  const bannerRef = useRef(null);

  const handleBannerHover = () => {
    if (bannerRef.current) {
      const rect = bannerRef.current.getBoundingClientRect();
      triggerBackgroundHover('archive-banner', [99, 102, 241], rect);
    }
  };

  return (
    <section id="work" className="scroll-mt-28 relative pt-20 lg:pt-28 pb-16">
      {/* Section Eyebrow & Editorial Title with Progressive Reveals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <ScrollRevealBadge className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>SELECTED WORK</span>
            </ScrollRevealBadge>
            <ScrollRevealHeadingMultiline
              lines={['Ideas are interesting.', 'Building is better.']}
              className="section-statement text-white mb-4"
            />
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 max-w-md">
            <ScrollRevealParagraph className="text-sm text-zinc-400 font-sans leading-relaxed md:text-right">
              A selection of applications that demonstrate my approach to AI engineering, machine learning, and full-stack development.
            </ScrollRevealParagraph>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-white transition-colors cursor-pointer group"
            >
              <span>View Full Archive ({allProjects.length} Projects)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Projects List */}
      <div className="space-y-6 sm:space-y-8">
        {featured.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Prominent Explore All Projects CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div
          ref={bannerRef}
          onMouseEnter={handleBannerHover}
          onMouseLeave={clearBackgroundHover}
          className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/[0.08] hover:border-indigo-500/40 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl shadow-indigo-500/10 group"
        >
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>PROJECT ARCHIVE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              Explore the Complete Project Archive
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-mono">
              Browse all {allProjects.length} systems including Deep Learning MRI classification, AI-driven mental wellness companions, and full-stack intelligent architectures.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/projects"
              className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg shadow-white/10 hover:shadow-cyan-500/20 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Explore all projects ({allProjects.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Ambient background glow inside the banner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-radial from-indigo-600/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
