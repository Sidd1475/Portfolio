'use client';

import React from 'react';
import { GraduationCap, Award, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import {
  ScrollRevealHeading,
  ScrollRevealHeadingMultiline,
  ScrollRevealBadge,
  ScrollRevealParagraph,
} from '@/components/ui/ScrollReveal';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';

export default function JourneySection() {
  const handleCardHover = (id, color, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerBackgroundHover(id, color, rect);
  };

  return (
    <section id="journey" className="scroll-mt-28 relative py-20 lg:py-28 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <ScrollRevealBadge className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>MY JOURNEY</span>
          </ScrollRevealBadge>

          <ScrollRevealHeadingMultiline
            lines={['Learning the foundations.', 'Building beyond them.']}
            className="section-statement text-white mb-5"
          />

          <ScrollRevealParagraph className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            Rigorous Computer Science foundation at MAIT, verified industry certifications from Samsung Innovation Campus, and university student leadership.
          </ScrollRevealParagraph>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education (Academic Foundation) */}
          <div className="lg:col-span-7">
            <div
              onMouseEnter={(e) => handleCardHover('education', [34, 211, 238], e)}
              onMouseLeave={clearBackgroundHover}
              className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/40 relative overflow-hidden backdrop-blur-xl transition-all duration-300 hover:shadow-2xl shadow-cyan-500/5 group"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300 font-medium">
                  {siteConfig.education.duration}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  CGPA: {siteConfig.education.cgpa}
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-cyan-100 transition-colors">
                {siteConfig.education.institution}
              </h3>
              <p className="text-sm font-mono text-indigo-400 mb-6">
                {siteConfig.education.degree}
              </p>

              <div className="pt-5 border-t border-white/[0.07]">
                <h4 className="text-xs font-mono text-zinc-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Relevant Academic Coursework</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {siteConfig.education.coursework.map((course) => (
                    <div
                      key={course}
                      className="p-2.5 rounded-lg bg-surface-200/50 border border-white/[0.05] text-xs font-mono text-zinc-300 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Certifications & Leadership */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Leadership Card */}
            <div
              onMouseEnter={(e) => handleCardHover('leadership', [168, 85, 247], e)}
              onMouseLeave={clearBackgroundHover}
              className="p-6 rounded-2xl glass-panel border border-white/[0.08] hover:border-violet-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-xl shadow-violet-500/5"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Leadership Experience</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-1">
                {siteConfig.leadership.role}
              </h4>
              <p className="text-xs font-mono text-cyan-300 mb-3">
                {siteConfig.leadership.organization}
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {siteConfig.leadership.description}
              </p>
            </div>

            {/* Certifications List */}
            <div
              onMouseEnter={(e) => handleCardHover('credentials', [99, 102, 241], e)}
              onMouseLeave={clearBackgroundHover}
              className="p-6 rounded-2xl glass-panel border border-white/[0.08] hover:border-white/20 backdrop-blur-xl transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Verified Credentials</span>
              </div>
              
              <div className="space-y-4">
                {siteConfig.certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="pb-3 border-b border-white/[0.06] last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h5 className="text-xs sm:text-sm font-semibold text-white">
                        {cert.title}
                      </h5>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-indigo-300 mb-1.5">
                      <span>{cert.issuer}</span>
                      <span>&bull;</span>
                      <span className="text-zinc-400">{cert.period}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {cert.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
