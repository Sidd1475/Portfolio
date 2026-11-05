'use client';

import React from 'react';
import { Workflow, ShieldCheck, Layers, Cpu, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';
import {
  ScrollRevealHeadingMultiline,
  ScrollRevealBadge,
} from '@/components/ui/ScrollReveal';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';

const SPEC_ICONS = {
  Workflow,
  ShieldCheck,
  Cpu,
  Layers,
};

export default function AboutSection() {
  const handleCardHover = (title, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerBackgroundHover(`about-${title}`, [139, 92, 246], rect);
  };

  return (
    <section id="about" className="scroll-mt-28 relative py-16 lg:py-24 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <ScrollRevealBadge className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>PROFILE &amp; PHILOSOPHY</span>
          </ScrollRevealBadge>

          <ScrollRevealHeadingMultiline
            lines={['Curious by nature.', 'Driven to engineer.']}
            className="section-statement text-white mb-3"
          />

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
            {siteConfig.about.intro}
          </p>
        </div>

        {/* 2-Column Content Layout: Concise Intro + Technical Specializations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: 2 Concise Paragraphs & Specialization Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3.5 text-sm sm:text-base text-zinc-300 leading-relaxed">
              {siteConfig.about.description.map((paragraph, index) => (
                <p key={index} className="text-sm sm:text-base text-zinc-300">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Credentials / Status Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-mono text-zinc-400">
              <span className="px-3 py-1 rounded-full bg-surface-200/80 border border-white/10 text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>MAIT, Delhi &bull; B.Tech CSE</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-semibold">
                CGPA: 8.98 / 10
              </span>
              <Link
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full glass-panel-subtle text-cyan-300 hover:text-white hover:border-cyan-500/40 transition-colors flex items-center gap-1"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400" />
              </Link>
            </div>

            {/* Technical Specializations Grid */}
            <div className="pt-4 border-t border-white/[0.06]">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Technical Interests &amp; Specializations</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {siteConfig.about.specializations.map((spec) => {
                  const Icon = SPEC_ICONS[spec.icon] || Workflow;
                  return (
                    <div
                      key={spec.title}
                      onMouseEnter={(e) => handleCardHover(spec.title, e)}
                      onMouseLeave={clearBackgroundHover}
                      className="p-3.5 rounded-xl bg-surface-200/50 border border-white/[0.06] hover:border-cyan-500/30 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1">
                        <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{spec.title}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug font-sans">
                        {spec.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Principles Cards */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="p-3.5 rounded-xl glass-panel-subtle border border-white/[0.08] backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
                <span>ENGINEERING PHILOSOPHY</span>
                <span className="text-cyan-300 font-medium">Production-Grade AI</span>
              </div>
              <div className="w-full bg-surface-100 h-1 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 h-full w-full rounded-full" />
              </div>
            </div>

            {siteConfig.about.coreValues.map((value, i) => {
              const icons = [Workflow, ShieldCheck, Layers];
              const IconComponent = icons[i] || Workflow;
              return (
                <div
                  key={value.title}
                  onMouseEnter={(e) => handleCardHover(value.title, e)}
                  onMouseLeave={clearBackgroundHover}
                  className="p-4 rounded-xl glass-panel border border-white/[0.07] hover:border-violet-500/40 hover:bg-surface-100/60 transition-all duration-200 backdrop-blur-xl group hover:-translate-y-0.5 hover:shadow-lg cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-200 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0 group-hover:text-violet-300 transition-colors">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white mb-0.5 group-hover:text-violet-200 transition-colors">
                        {value.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        {value.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
