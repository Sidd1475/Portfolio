'use client';

import React, { useEffect, useRef } from 'react';
import { skillGroups } from '@/lib/skills';
import {
  ScrollRevealBadge,
  ScrollRevealHeadingMultiline,
  ScrollRevealParagraph,
} from '@/components/ui/ScrollReveal';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/scroll-scrub';

const GROUP_COLORS = {
  'ai-ml-data': [139, 92, 246],          // Violet
  'programming-languages': [34, 211, 238], // Cyan
  'web-fullstack': [99, 102, 241],        // Indigo
  'tools-deployment': [16, 185, 129],     // Emerald
};

function SkillGroupRow({ group, groupIdx, handleSkillHover }) {
  const rowRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !rowRef.current) return;

    if (isReducedMotion()) {
      gsap.set(rowRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(rowRef.current, {
        opacity: 0.15,
        y: 28,
      });

      gsap.to(rowRef.current, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rowRef.current,
          start: 'top 88%',
          end: 'top 58%',
          scrub: 0.6,
        },
      });
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start group will-change-transform"
    >
      {/* Left Column: Category Title & Functional Summary */}
      <div className="lg:col-span-5 space-y-3">
        <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
          {group.category}
        </h3>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans max-w-md">
          {group.description}
        </p>
      </div>

      {/* Right Column: Clean Rows of Compact Technology Pills */}
      <div className="lg:col-span-7">
        <div className="flex flex-wrap gap-2.5">
          {group.skills.map((skill) => (
            <div
              key={skill}
              onMouseEnter={(e) => handleSkillHover(skill, group.id, e)}
              onMouseLeave={clearBackgroundHover}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono text-zinc-300 bg-surface-200/70 border border-white/[0.08] hover:border-cyan-500/50 hover:bg-surface-100 hover:text-white transition-all duration-200 cursor-default select-none shadow-sm hover:shadow-cyan-500/10 flex items-center gap-2 group/skill"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover/skill:bg-cyan-400 transition-colors" />
              <span>{skill}</span>
            </div>
          ))}
        </div>

        {/* Subtle Sub-count */}
        <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>{group.skills.length} VERIFIED CAPABILITIES</span>
          <span className="text-zinc-600">PRODUCTION TESTED</span>
        </div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const handleSkillHover = (skillName, groupId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const color = GROUP_COLORS[groupId] || [34, 211, 238];
    triggerBackgroundHover(`skill-${skillName}`, color, rect);
  };

  return (
    <section id="skills" className="scroll-mt-28 relative py-20 lg:py-28 border-t border-white/[0.08]">
      {/* Anchor for legacy or external #expertise links */}
      <div id="expertise" className="absolute -top-28 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <ScrollRevealBadge className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>TECHNICAL EXPERTISE</span>
          </ScrollRevealBadge>

          <ScrollRevealHeadingMultiline
            lines={['The skills behind', 'what I build.']}
            className="section-statement text-white mb-6"
          />

          <ScrollRevealParagraph className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans max-w-xl">
            A resume-grounded inventory of machine learning systems, core programming languages, web architecture, and production engineering tools.
          </ScrollRevealParagraph>
        </div>

        {/* Editorial Skills List: 4 Groups with Fine Dividers & Generous Whitespace */}
        <div className="space-y-0 divide-y divide-white/[0.08]">
          {skillGroups.map((group, groupIdx) => (
            <SkillGroupRow
              key={group.id}
              group={group}
              groupIdx={groupIdx}
              handleSkillHover={handleSkillHover}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
