import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { getAdjacentProjects } from '@/lib/projects';

export default function ProjectFooterNav({ currentSlug }) {
  const { prev, next } = getAdjacentProjects(currentSlug);

  return (
    <div className="pt-12 mt-16 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
      {prev ? (
        <Link
          href={`/projects/${prev.slug || prev.id}`}
          className="flex items-center gap-3 p-4 rounded-xl glass-panel-subtle hover:border-white/20 transition-all group w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:-translate-x-1 transition-transform" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-zinc-400 block uppercase">Previous System</span>
            <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
              {prev.title}
            </span>
          </div>
        </Link>
      ) : <div />}

      <Link
        href="/projects"
        className="px-4 py-2 rounded-full glass-pill text-xs font-mono text-zinc-300 hover:text-white hover:border-cyan-500/30 transition-all flex items-center gap-1.5"
      >
        <Layers className="w-3.5 h-3.5 text-cyan-400" />
        <span>All Archive Systems</span>
      </Link>

      {next ? (
        <Link
          href={`/projects/${next.slug || next.id}`}
          className="flex items-center justify-end gap-3 p-4 rounded-xl glass-panel-subtle hover:border-white/20 transition-all group w-full sm:w-auto text-right"
        >
          <div>
            <span className="text-[10px] font-mono text-zinc-400 block uppercase">Next System</span>
            <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
              {next.title}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : <div />}
    </div>
  );
}
