'use client';

import React from 'react';
import { GraduationCap, Award, Users, BookOpen, CheckCircle2, Cpu, Sparkles, Trophy } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import {
  ScrollRevealBadge,
  ScrollRevealHeadingMultiline,
} from '@/components/ui/ScrollReveal';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';

const ACHIEVEMENTS = [
  {
    number: '8.98',
    suffix: '/ 10',
    title: 'Academic CGPA',
    subtitle: 'MAIT Delhi',
    detail: 'Consistent academic distinction across foundational Computer Science & Engineering.',
    icon: Trophy,
    color: 'text-emerald-400',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    bg: 'bg-emerald-500/5',
  },
  {
    number: 'AI',
    suffix: 'Certified',
    title: 'Samsung Innovation Campus',
    subtitle: 'Dec 2025 – Mar 2026',
    detail: 'Rigorous certification covering advanced neural architectures and real-world ML deployment.',
    icon: Cpu,
    color: 'text-cyan-400',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    bg: 'bg-cyan-500/5',
  },
  {
    number: '99',
    suffix: 'Hours',
    title: 'Data Science & DL Bootcamp',
    subtitle: 'Udemy Certified (Feb 2026)',
    detail: 'Comprehensive mastery in predictive modeling, deep learning architectures, and NLP pipelines.',
    icon: Award,
    color: 'text-violet-400',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    bg: 'bg-violet-500/5',
  },
  {
    number: '340K+',
    suffix: 'Records',
    title: 'High-Scale ML Pipeline',
    subtitle: 'AgriInsight System',
    detail: 'Trained and regularized Random Forest model achieving Test R² ≈ 0.80 yield prediction accuracy.',
    icon: Sparkles,
    color: 'text-amber-400',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    bg: 'bg-amber-500/5',
  },
];

export default function JourneySection() {
  const handleCardHover = (id, color, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerBackgroundHover(id, color, rect);
  };

  return (
    <section id="journey" className="scroll-mt-28 relative py-16 lg:py-24 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08] mb-12">
          <div className="max-w-2xl">
            <ScrollRevealBadge className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>ACADEMICS &amp; EXPERIENCE</span>
            </ScrollRevealBadge>
            <ScrollRevealHeadingMultiline
              lines={['Foundations in theory.', 'Proven in execution.']}
              className="section-statement text-white mb-2"
            />
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-sm md:text-right">
            Verified academic performance at MAIT, industry AI credentials, and collegiate leadership.
          </p>
        </div>

        {/* 1. Measurable Achievements Grid (Numbers & Compact Cards) */}
        <div className="mb-10">
          <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Key Accomplishments &amp; Verified Certifications</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`p-4 rounded-xl glass-panel border ${item.border} ${item.bg} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold font-display text-white">{item.number}</span>
                        <span className={`text-xs font-mono font-semibold ${item.color}`}>{item.suffix}</span>
                      </span>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <h4 className="text-xs font-bold text-white font-mono mb-0.5 truncate">
                      {item.title}
                    </h4>
                    <p className="text-[10px] font-mono text-zinc-400 mb-2">
                      {item.subtitle}
                    </p>
                    <p className="text-[11px] text-zinc-300 leading-snug font-sans">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Education & Leadership Experience (2-Column Structured Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Education: Structured & Minimal */}
          <div className="lg:col-span-6">
            <div
              onMouseEnter={(e) => handleCardHover('education', [34, 211, 238], e)}
              onMouseLeave={clearBackgroundHover}
              className="p-5 sm:p-6 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.06] mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider font-semibold">
                      Education
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 font-bold">
                    CGPA: {siteConfig.education.cgpa}
                  </span>
                </div>

                <h4 className="text-lg font-display font-bold text-white mb-0.5">
                  {siteConfig.education.institution}
                </h4>
                <p className="text-xs font-mono text-cyan-300 mb-1">
                  {siteConfig.education.degree}
                </p>
                <p className="text-[11px] font-mono text-zinc-400 mb-4">
                  {siteConfig.education.duration} &bull; Delhi, India
                </p>

                {/* Core Coursework Badges */}
                <div className="pt-3 border-t border-white/[0.05]">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Core Computer Science Coursework:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {siteConfig.education.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 rounded-md bg-surface-200/60 border border-white/[0.06] text-xs font-mono text-zinc-300"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership Experience: Concise Outcome-Focused Bullets */}
          <div className="lg:col-span-6">
            <div
              onMouseEnter={(e) => handleCardHover('leadership', [168, 85, 247], e)}
              onMouseLeave={clearBackgroundHover}
              className="p-5 sm:p-6 rounded-2xl glass-panel border border-white/[0.08] hover:border-violet-500/40 backdrop-blur-xl transition-all duration-300 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.06] mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider font-semibold">
                      Leadership Experience
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-300">
                    Elected Role
                  </span>
                </div>

                <h4 className="text-lg font-display font-bold text-white mb-0.5">
                  {siteConfig.leadership.role}
                </h4>
                <p className="text-xs font-mono text-indigo-300 mb-4">
                  {siteConfig.leadership.organization}
                </p>

                {/* Measurable Responsibilities Bullets */}
                <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed font-sans pt-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                    <span>Directed campus-wide technology initiatives, community outreach programs, and cross-institutional collaborative events.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                    <span>Coordinated cross-functional student teams, operational logistics, and event planning across two premier college chapters.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                    <span>Championed undergraduate digital literacy and skill-building workshops for practical software tools.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
