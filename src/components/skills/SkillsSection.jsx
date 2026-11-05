'use client';

import React from 'react';
import { skillGroups } from '@/lib/skills';
import {
  ScrollRevealBadge,
  ScrollRevealHeadingMultiline,
  ScrollRevealParagraph,
} from '@/components/ui/ScrollReveal';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';
import { Brain, Server, Layout, Database, Terminal, Cpu } from 'lucide-react';

const ICON_MAP = {
  Brain,
  Server,
  Layout,
  Database,
  Terminal,
};

const GROUP_THEMES = {
  'ai-ml': {
    color: [139, 92, 246],
    border: 'border-violet-500/20 hover:border-violet-500/50',
    iconColor: 'text-violet-400',
    badgeGlow: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    dotColor: 'bg-violet-400',
  },
  backend: {
    color: [16, 185, 129],
    border: 'border-emerald-500/20 hover:border-emerald-500/50',
    iconColor: 'text-emerald-400',
    badgeGlow: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    dotColor: 'bg-emerald-400',
  },
  frontend: {
    color: [99, 102, 241],
    border: 'border-indigo-500/20 hover:border-indigo-500/50',
    iconColor: 'text-indigo-400',
    badgeGlow: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    dotColor: 'bg-indigo-400',
  },
  databases: {
    color: [56, 189, 248],
    border: 'border-sky-500/20 hover:border-sky-500/50',
    iconColor: 'text-sky-400',
    badgeGlow: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    dotColor: 'bg-sky-400',
  },
  'tools-devops': {
    color: [245, 158, 11],
    border: 'border-amber-500/20 hover:border-amber-500/50',
    iconColor: 'text-amber-400',
    badgeGlow: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    dotColor: 'bg-amber-400',
  },
};

export default function SkillsSection() {
  const handleSkillHover = (skillName, groupId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const theme = GROUP_THEMES[groupId] || { color: [34, 211, 238] };
    triggerBackgroundHover(`skill-${skillName}`, theme.color, rect);
  };

  return (
    <section id="skills" className="scroll-mt-28 relative py-16 lg:py-24 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Clean and Concise */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08] mb-12">
          <div className="max-w-2xl">
            <ScrollRevealBadge className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>TECHNICAL ARSENAL</span>
            </ScrollRevealBadge>
            <ScrollRevealHeadingMultiline
              lines={['Skills organized for impact.', 'Built for production.']}
              className="section-statement text-white mb-2"
            />
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-sm md:text-right">
            Categorized across core competencies. 100% verified in codebase projects and active production pipelines.
          </p>
        </div>

        {/* Glanceable 5-Category Skill Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {skillGroups.map((group) => {
            const Icon = ICON_MAP[group.icon] || Cpu;
            const theme = GROUP_THEMES[group.id] || GROUP_THEMES['ai-ml'];

            return (
              <div
                key={group.id}
                className={`p-5 sm:p-6 rounded-2xl glass-panel border ${theme.border} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg bg-surface-200/80 border border-white/10 ${theme.iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-semibold text-white tracking-tight">
                        {group.category}
                      </h3>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${theme.badgeGlow}`}>
                      {group.skills.length}
                    </span>
                  </div>

                  {/* Compact Skill Badges */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        onMouseEnter={(e) => handleSkillHover(skill, group.id, e)}
                        onMouseLeave={clearBackgroundHover}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono text-zinc-300 bg-surface-200/60 border border-white/[0.06] hover:border-white/30 hover:bg-surface-100 hover:text-white transition-all cursor-default select-none flex items-center gap-1.5"
                      >
                        <span className={`w-1 h-1 rounded-full ${theme.dotColor}`} />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
