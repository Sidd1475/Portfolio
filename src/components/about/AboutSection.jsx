'use client';

import React from 'react';
import { Terminal, Workflow, ShieldCheck, Layers, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';
import {
  ScrollRevealHeading,
  ScrollRevealHeadingMultiline,
  ScrollRevealParagraph,
  ScrollRevealBadge,
} from '@/components/ui/ScrollReveal';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';

export default function AboutSection() {
  const handleCardHover = (title, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerBackgroundHover(`about-${title}`, [139, 92, 246], rect);
  };

  return (
    <section id="about" className="scroll-mt-28 relative py-20 lg:py-28 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <ScrollRevealBadge className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>ABOUT ME</span>
          </ScrollRevealBadge>

          <ScrollRevealHeadingMultiline
            lines={['Curious by nature.', 'Driven to build.']}
            className="section-statement text-white mb-5"
          />

          <ScrollRevealParagraph className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            A concise introduction to my interest in AI engineering, intelligent systems, and practical software development.
          </ScrollRevealParagraph>
        </div>

        {/* Narrative & Architectural Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Personal Narrative with Progressive Text Reveal */}
          <div className="lg:col-span-6 space-y-5 text-zinc-300 text-base leading-relaxed">
            {siteConfig.about.description.map((paragraph, index) => (
              <ScrollRevealParagraph key={index} delay={0.15 + index * 0.1} className="text-sm sm:text-base text-zinc-300">
                {paragraph}
              </ScrollRevealParagraph>
            ))}

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>MAIT &bull; 8.98 CGPA</span>
              </span>
              <span>&bull;</span>
              <span>Delhi, India</span>
              <span>&bull;</span>
              <Link
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 flex items-center gap-1 transition-colors text-cyan-300"
              >
                <span>Verified LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Principles Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-xl glass-panel-subtle border border-white/[0.08] mb-4 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
                <span>SYSTEM MATURITY MODEL</span>
                <span className="text-cyan-300 font-medium">Full-Lifecycle Focus</span>
              </div>
              <div className="w-full bg-surface-100 h-1.5 rounded-full overflow-hidden">
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
                  className="p-5 rounded-2xl glass-panel border border-white/[0.07] hover:border-violet-500/40 hover:bg-surface-100/60 transition-all duration-300 backdrop-blur-xl group hover:-translate-y-0.5 hover:shadow-xl shadow-black/40 cursor-default"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-surface-200 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0 group-hover:text-violet-300 transition-colors">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-violet-200 transition-colors">
                        {value.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
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
