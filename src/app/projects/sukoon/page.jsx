import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  HeartHandshake,
  ShieldCheck,
  Activity,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  Users,
  Lock,
  ExternalLink,
  Flame,
  Brain,
} from 'lucide-react';
import { getProjectBySlug } from '@/lib/projects';
import ProjectFooterNav from '@/components/projects/ProjectFooterNav';
import SukoonVisualizer from '@/components/projects/SukoonVisualizer';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Sukoon AI Case Study — Siddharth Mishra',
  description:
    'Technical architecture, empathetic conversational AI workflows, Ghost Mode anonymous support, and full-stack mental wellness system engineering.',
};

export default function SukoonPage() {
  const project = getProjectBySlug('sukoon');
  if (!project) notFound();

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-8">
          <Link
            href="/projects"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PROJECT ARCHIVE</span>
          </Link>
          <span>/</span>
          <span className="text-zinc-400">{project.title}</span>
        </div>

        {/* Case Study Header */}
        <div className="pb-8 border-b border-white/[0.08] mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-xs font-mono text-teal-300 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>AI MENTAL WELLNESS &amp; EMOTIONAL COMPANION</span>
            </span>
            <span className="px-3 py-1 rounded-full glass-panel-subtle text-xs font-mono text-cyan-300">
              {project.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-xl font-mono text-teal-300 mb-6">
            {project.subtitle}
          </p>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl mb-8">
            {project.fullOverview}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {project.liveDemo && (
              <Link
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full text-xs font-mono text-zinc-950 bg-teal-400 hover:bg-teal-300 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-teal-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Live Application</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-950" />
              </Link>
            )}
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full text-xs font-mono text-zinc-950 bg-white hover:bg-zinc-200 transition-all flex items-center gap-2 font-semibold shadow-lg"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
              </Link>
            )}
            <Link
              href="/projects"
              className="px-5 py-2.5 rounded-full text-xs font-mono text-zinc-300 hover:text-white glass-pill hover:border-white/30 transition-all"
            >
              <span>Back to Archive</span>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {project.metrics.map((m, i) => (
            <div key={i} className="p-4 rounded-xl glass-panel border border-white/[0.08]">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase mb-1">
                {m.label}
              </span>
              <span className="text-lg font-bold text-white font-mono block mb-1">
                {m.value}
              </span>
              <span className="text-[11px] text-zinc-400">{m.detail}</span>
            </div>
          ))}
        </div>

        {/* Interactive Architecture & Safety Simulation */}
        <div className="mb-14">
          <SukoonVisualizer />
        </div>

        {/* Deep Technical Deep-Dive Sections */}
        <div className="space-y-12">
          {/* Problem Statement */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3">
              The Problem &amp; Healthcare Accessibility Gap
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-4">
              {project.problemStatement}
            </p>
          </section>

          {/* Solution Architecture */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2.5">
              <Brain className="w-5 h-5 text-teal-400" />
              <span>Full-Stack Architecture &amp; System Design</span>
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
              {project.solutionArchitecture}
            </p>

            {/* Architecture Pipeline Stages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {project.architectureStages.map((stage) => (
                <div
                  key={stage.stage}
                  className="p-4 rounded-xl bg-surface-200/50 border border-white/[0.06] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-teal-400 font-bold">
                        STAGE {stage.stage}
                      </span>
                      <span className="text-[10px] font-mono text-indigo-300 bg-surface-100 px-2 py-0.5 rounded border border-white/[0.06]">
                        {stage.tech}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1.5 font-mono">
                      {stage.name}
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Product Pillars */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-5 flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Core System Capabilities</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-200/40 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-teal-300 text-xs font-mono font-semibold mb-2">
                  <MessageSquare className="w-4 h-4 text-teal-400" />
                  <span>Empathetic Conversational Companion</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Real-time voice and text dialogue grounded in active listening and de-escalation frameworks, supporting natural colloquial expression and English/Hinglish phrasing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-200/40 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-semibold mb-2">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>Ghost Mode Community</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Anonymized peer support spaces where users can share personal reflections safely, protected by automated toxicity moderation and zero identity persistence.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-200/40 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono font-semibold mb-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Longitudinal Mood Analytics</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Interactive mood trackers and gratitude check-ins that compile emotional trends over time, helping users identify cognitive triggers and celebrate streaks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-200/40 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-mono font-semibold mb-2">
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                  <span>Crisis Safety Protocol</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Deterministic keyword screening identifies critical distress flags, immediately interrupting conversational generation to overlay 24/7 emergency hotline contacts.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Highlights */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-4">
              Implementation Highlights
            </h3>
            <div className="space-y-3">
              {project.technicalHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Engineering Trade-offs */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3">
              Engineering Trade-offs &amp; Safety Guardrails
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.engineeringTradeoff}
            </p>
          </section>

          {/* Documented Scope & Ethical Boundaries */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>Scope &amp; Ethical Boundaries</span>
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.limitations}
            </p>
          </section>

          {/* Future Roadmap */}
          <section className="p-6 rounded-2xl glass-panel-subtle border border-teal-500/20">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-300 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Future Engineering Roadmap</span>
            </div>
            <div className="space-y-3 mt-3">
              {project.futureRoadmap.map((item) => (
                <div
                  key={item.title}
                  className="p-3 rounded-lg bg-surface-200/40 border border-white/[0.05] flex items-start gap-2.5"
                >
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/20 shrink-0">
                    {item.status}
                  </span>
                  <div>
                    <h5 className="text-xs font-semibold text-white">{item.title}</h5>
                    <p className="text-[11px] text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Next/Previous Footer Navigation */}
        <ProjectFooterNav currentSlug="sukoon" />
      </div>
    </div>
  );
}

