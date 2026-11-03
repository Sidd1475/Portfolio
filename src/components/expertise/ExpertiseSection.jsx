'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Server, Database, Wrench, Code2 } from 'lucide-react';
import { skillGroups } from '@/lib/skills';
import {
  ScrollRevealHeading,
  ScrollRevealBadge,
  ScrollRevealParagraph,
} from '@/components/ui/ScrollReveal';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';

export default function ExpertiseSection() {
  const [activeTab, setActiveTab] = useState(skillGroups[0].id);

  const activeGroup = skillGroups.find((g) => g.id === activeTab) || skillGroups[0];

  const categoryIcons = {
    'ai-ml': Cpu,
    'backend-engineering': Server,
    'data-infrastructure': Database,
    'developer-tools': Wrench,
    'core-languages': Code2,
  };

  const handleSkillHover = (name, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerBackgroundHover(`skill-${name}`, [34, 211, 238], rect);
  };

  return (
    <section id="expertise" className="relative py-20 lg:py-28 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Progressive Reveals */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <ScrollRevealBadge className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-subtle text-xs font-mono text-cyan-300 mb-3 border border-white/[0.08] backdrop-blur-md">
              <Cpu className="w-3.5 h-3.5" />
              <span>TECHNICAL REPOSITORY</span>
            </ScrollRevealBadge>
            <ScrollRevealHeading className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              The tools behind <span className="text-gradient">the systems.</span>
            </ScrollRevealHeading>
          </div>
          <ScrollRevealParagraph className="max-w-md text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed">
            Organized by functional engineering layer—grounded strictly in tools, libraries, and languages used in my verified resume and projects.
          </ScrollRevealParagraph>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-white/[0.08] mb-8">
          {skillGroups.map((group) => {
            const Icon = categoryIcons[group.id] || Cpu;
            const isActive = activeTab === group.id;
            return (
              <button
                key={group.id}
                onClick={() => setActiveTab(group.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-zinc-950 font-semibold shadow-lg'
                    : 'glass-panel-subtle text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-950' : 'text-cyan-400'}`} />
                <span>{group.category}</span>
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl glass-panel-subtle border border-white/[0.06] backdrop-blur-md">
          <div>
            <span className="text-xs font-mono text-cyan-300 block mb-0.5">
              DOMAIN FOCUS // {activeGroup.category.toUpperCase()}
            </span>
            <p className="text-xs sm:text-sm text-zinc-300">
              {activeGroup.description}
            </p>
          </div>
          <div className="text-[11px] font-mono text-zinc-400">
            {activeGroup.skills.length} Documented Technologies
          </div>
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {activeGroup.skills.map((skill) => (
              <div
                key={skill.name}
                onMouseEnter={(e) => handleSkillHover(skill.name, e)}
                onMouseLeave={clearBackgroundHover}
                className="p-4 rounded-xl glass-panel border border-white/[0.06] hover:border-cyan-500/40 hover:bg-surface-100/60 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl group hover:-translate-y-0.5 hover:shadow-xl cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="text-sm font-semibold text-white tracking-wide group-hover:text-cyan-100 transition-colors">
                      {skill.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-200 border border-white/[0.08] text-cyan-300">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                    {skill.description}
                  </p>
                </div>

                {skill.associatedProjects && skill.associatedProjects.length > 0 && (
                  <div className="pt-2.5 border-t border-white/[0.05] flex items-center gap-1.5 flex-wrap text-[10px] font-mono text-zinc-400">
                    <span className="text-zinc-500">Project:</span>
                    {skill.associatedProjects.map((pName) => (
                      <span
                        key={pName}
                        className="px-1.5 py-0.5 rounded bg-surface-100 text-indigo-300 border border-indigo-500/20"
                      >
                        {pName}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
