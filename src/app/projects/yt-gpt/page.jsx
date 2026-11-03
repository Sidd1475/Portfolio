import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github, Database, Clock, Sliders, AlertCircle, Sparkles } from 'lucide-react';
import { getProjectBySlug } from '@/lib/projects';
import YTGptVisualizer from '@/components/projects/YTGptVisualizer';
import ProjectFooterNav from '@/components/projects/ProjectFooterNav';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'YT GPT Case Study — Siddharth Mishra',
  description: '8-stage retrieval-augmented generation architecture, FAISS vector search, and timestamp grounding in YT GPT.',
};

export default function YTGptPage() {
  const project = getProjectBySlug('yt-gpt');
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
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              GENERATIVE AI CASE STUDY
            </span>
            <span className="px-3 py-1 rounded-full glass-panel-subtle text-xs font-mono text-indigo-300">
              {project.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-xl font-mono text-cyan-300 mb-6">
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
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Interactive 8-Stage RAG Pipeline Visualizer</span>
          </h2>
          <YTGptVisualizer />
        </div>

        {/* Deep Technical Deep-Dive Sections */}
        <div className="space-y-12">
          
          {/* 8-Stage RAG Breakdown */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2.5">
              <Database className="w-5 h-5 text-cyan-400" />
              <span>The 8-Stage Retrieval-Augmented Generation Pipeline</span>
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              To guarantee factual answers free of hallucinations, the pipeline divides transcript processing and conversational synthesis into eight modular phases:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {project.architectureStages.map((stage) => (
                <div
                  key={stage.stage}
                  className="p-4 rounded-xl bg-surface-200/50 border border-white/[0.06] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-cyan-400 font-bold">
                        STAGE {stage.stage}
                      </span>
                      <span className="text-[10px] font-mono text-indigo-300 bg-surface-100 px-2 py-0.5 rounded border border-white/[0.06]">
                        {stage.tech}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1.5">
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

          {/* Timestamp Anchors & Hallucination Elimination */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-indigo-400" />
              <span>Timestamp Grounding &amp; Verifiable Citations</span>
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Traditional conversational search often outputs summaries without evidence. In YT GPT, every ingested sentence retains a temporal index <code className="text-cyan-300 font-mono text-xs">start_time</code>. When Gemini synthesizes the answer, the prompt enforces inline citations (e.g., <code className="text-zinc-200 font-mono">[14:22]</code>) that link directly back to the video timeline.
            </p>
            <div className="p-4 rounded-xl bg-surface-300/80 border border-white/[0.06] text-xs text-zinc-300 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>Duplicate Chunk Suppression</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Repetitive sponsor messages or repeated transcript phrases are deduplicated via cosine threshold checks before vector insertion, optimizing FAISS memory and LLM prompt context space.
              </p>
            </div>
          </section>

          {/* Important Engineering Decisions & Trade-offs */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <span>Important Engineering Decision &amp; Trade-off</span>
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.engineeringTradeoff}
            </p>
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

          {/* Planned Future Work */}
          <section className="p-6 rounded-2xl glass-panel-subtle border border-cyan-500/20">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" />
              <span>Future Engineering Roadmap (Planned / In-Progress)</span>
            </div>
            <div className="space-y-3 mt-3">
              {project.futureRoadmap.map((item) => (
                <div key={item.title} className="p-3 rounded-lg bg-surface-200/40 border border-white/[0.05] flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shrink-0">
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
        <ProjectFooterNav currentSlug="yt-gpt" />

      </div>
    </div>
  );
}
