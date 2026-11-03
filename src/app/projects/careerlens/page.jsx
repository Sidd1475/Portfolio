import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github, CheckCircle2, Workflow, Server, Cpu, AlertCircle, Layers, Sliders } from 'lucide-react';
import { getProjectBySlug } from '@/lib/projects';
import CareerLensVisualizer from '@/components/projects/CareerLensVisualizer';
import ProjectFooterNav from '@/components/projects/ProjectFooterNav';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'CareerLens Case Study — Siddharth Mishra',
  description: 'Technical architecture, LangGraph orchestration, and FastAPI backend engineering of CareerLens AI Resume Analysis Platform.',
};

export default function CareerLensPage() {
  const project = getProjectBySlug('careerlens');
  if (!project) notFound();

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-8">
          <Link href="/projects" className="hover:text-white transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PROJECT ARCHIVE</span>
          </Link>
          <span>/</span>
          <span className="text-zinc-400">{project.title}</span>
        </div>

        {/* Case Study Header */}
        <div className="pb-8 border-b border-white/[0.08] mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-300">
              FLAGSHIP CASE STUDY
            </span>
            <span className="px-3 py-1 rounded-full glass-panel-subtle text-xs font-mono text-cyan-300">
              {project.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-xl font-mono text-indigo-300 mb-6">
            {project.subtitle}
          </p>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl mb-8">
            {project.fullOverview}
          </p>

          <div className="flex flex-wrap items-center gap-4">
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
            <Link
              href="/#work"
              className="px-5 py-2.5 rounded-full text-xs font-mono text-zinc-300 hover:text-white glass-pill hover:border-white/30 transition-all"
            >
              <span>View Homepage Summary</span>
            </Link>
          </div>
        </div>

        {/* Architecture Visualizer Interactive Embed */}
        <div className="mb-14">
          <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Workflow className="w-4 h-4 text-cyan-400" />
            <span>Interactive StateGraph Orchestration Visualizer</span>
          </h2>
          <CareerLensVisualizer />
        </div>

        {/* Deep Technical Deep-Dive Sections */}
        <div className="space-y-12">
          
          {/* Problem Statement */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3">
              The Engineering Problem
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-4">
              {project.problemStatement}
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              When documents are evaluated through monolithic prompts, intermediate steps cannot be debugged or traced. Token contexts get polluted with redundant formatting, resulting in hallucinations, missed prerequisites, and inconsistent evaluation criteria.
            </p>
          </section>

          {/* LangGraph Architecture Breakdown */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>4-Stage LangGraph Orchestration Flow</span>
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              The system defines a <code className="text-cyan-300 font-mono text-xs">CareerState</code> schema compiled into an asynchronous directed acyclic graph:
            </p>

            <div className="space-y-4">
              {project.architectureStages.map((stage) => (
                <div
                  key={stage.stage}
                  className="p-4 rounded-xl bg-surface-200/50 border border-white/[0.06] flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-surface-100 border border-white/[0.08]">
                      STAGE {stage.stage}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1 font-mono">
                        {stage.name}
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-300 shrink-0 sm:self-center">
                    {stage.tech}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Backend & FastAPI Implementation Details */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2.5">
              <Server className="w-5 h-5 text-indigo-400" />
              <span>FastAPI Backend &amp; Data Layer</span>
            </h3>
            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              <p>
                The backend service is engineered using <strong>FastAPI</strong> with non-blocking asynchronous execution handlers. Key backend architectural patterns:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Typed Pydantic Contracts:</strong> Strict typing for resume upload payloads, token limit configurations, and structured score outputs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Session State Persistence:</strong> MongoDB storage for user resume histories, generated analysis snapshots, and comparison benchmarks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Containerized Portability:</strong> Dockerized backend service with reverse proxy configuration ready for zero-downtime deployment.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Important Engineering Decisions & Trade-offs */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <span>Important Engineering Decision &amp; Trade-off</span>
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              {project.engineeringTradeoff}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-surface-200/50 border border-white/[0.06]">
                <h4 className="text-xs font-mono text-cyan-300 uppercase tracking-wide mb-1.5">
                  Decoupled Parallel Execution
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Refactored LangGraph to execute <code className="text-white">resume_parser</code> and <code className="text-white">job_analyze</code> concurrently via parallel branches before fanning in, halving perceived request latency.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-200/50 border border-white/[0.06]">
                <h4 className="text-xs font-mono text-cyan-300 uppercase tracking-wide mb-1.5">
                  Guaranteed Schema Validation
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Bound Gemini output parsers to immutable Pydantic validation schemas with fallback retries, preventing schema drift across graph transitions.
                </p>
              </div>
            </div>
          </section>

          {/* Documented Challenges & Limitations */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>Challenges &amp; Limitations</span>
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.limitations}
            </p>
          </section>

          {/* Planned Future Work (Explicitly in-progress/planned) */}
          <section className="p-6 rounded-2xl glass-panel-subtle border border-indigo-500/20">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" />
              <span>Future Engineering Roadmap (Planned / In-Progress)</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Features actively planned or in experimentation, explicitly distinct from currently deployed functionality:
            </p>
            <div className="space-y-3">
              {project.futureRoadmap.map((item) => (
                <div key={item.title} className="p-3 rounded-lg bg-surface-200/40 border border-white/[0.05] flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shrink-0">
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
        <ProjectFooterNav currentSlug="careerlens" />

      </div>
    </div>
  );
}
