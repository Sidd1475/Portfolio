import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github, BarChart, Database, Sliders, AlertCircle, ShieldCheck } from 'lucide-react';
import { getProjectBySlug } from '@/lib/projects';
import AgriInsightVisualizer from '@/components/projects/AgriInsightVisualizer';
import ProjectFooterNav from '@/components/projects/ProjectFooterNav';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'AgriInsight Case Study — Siddharth Mishra',
  description: 'Machine learning architecture, ColumnTransformer pipeline, and explainable AI in AgriInsight Crop Yield Intelligence System.',
};

export default function AgriInsightPage() {
  const project = getProjectBySlug('agriinsight');
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
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
              MACHINE LEARNING CASE STUDY
            </span>
            <span className="px-3 py-1 rounded-full glass-panel-subtle text-xs font-mono text-cyan-300">
              {project.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-xl font-mono text-emerald-300 mb-6">
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
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Interactive Prediction &amp; Feature Weight Engine</span>
          </h2>
          <AgriInsightVisualizer />
        </div>

        {/* Deep Technical Deep-Dive Sections */}
        <div className="space-y-12">
          
          {/* Dataset & Scale */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2.5">
              <Database className="w-5 h-5 text-emerald-400" />
              <span>Dataset Scale &amp; Problem Framing</span>
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-4">
              Trained on <strong>340,000+ national agricultural records</strong>, the problem is formulated to predict <strong>crop yield per hectare</strong> rather than raw total production. This normalizes for land area usage and directly answers the question most critical to agricultural planners: how productive is each unit of cultivable land given specific regional and climatic parameters?
            </p>
          </section>

          {/* ColumnTransformer Pipeline Design */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2.5">
              <BarChart className="w-5 h-5 text-cyan-400" />
              <span>Preprocessing Architecture &amp; TargetEncoding</span>
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Handling high-cardinality geographic features is a primary challenge in tabular ML. One-hot encoding hundreds of Indian districts would expand feature dimensionality into tens of thousands of sparse columns, degrading tree splits and inflating model serialization sizes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
              <div className="p-3.5 rounded-xl bg-surface-200/50 border border-white/[0.06]">
                <span className="text-xs font-mono text-emerald-300 block mb-1">TargetEncoder</span>
                <p className="text-xs text-zinc-400">Encodes hundreds of districts based on conditional target mean, preserving regional microclimate patterns without sparse bloat.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-200/50 border border-white/[0.06]">
                <span className="text-xs font-mono text-cyan-300 block mb-1">StandardScaler</span>
                <p className="text-xs text-zinc-400">Scales continuous numeric features (Cultivation Area, Year marker) to zero mean and unit variance.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-200/50 border border-white/[0.06]">
                <span className="text-xs font-mono text-indigo-300 block mb-1">OneHotEncoder</span>
                <p className="text-xs text-zinc-400">Applied strictly to low-cardinality categorical attributes: Crop identity, Season, and State.</p>
              </div>
            </div>
          </section>

          {/* Important Engineering Decisions & Trade-offs */}
          <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08]">
            <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <span>Important Engineering Decision &amp; Trade-off</span>
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              {project.engineeringTradeoff}
            </p>
            <div className="p-4 rounded-xl bg-surface-300/80 border border-emerald-500/30 text-xs text-zinc-300 leading-relaxed">
              <span className="text-emerald-300 font-semibold block mb-1">Verified Production Metric:</span>
              The deployed production pipeline is constrained to a compact <strong>~24.5 MB artifact</strong> (<code className="text-zinc-200 font-mono">models/final_model.pkl</code>) delivering a generalizable <strong>Test R² ≈ 0.80</strong> on unseen district records without memory degradation.
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

          {/* Planned Future Work (Clearly In-Progress / Planned) */}
          <section className="p-6 rounded-2xl glass-panel-subtle border border-emerald-500/20">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" />
              <span>Future Engineering Roadmap (Planned / In-Progress)</span>
            </div>
            <div className="space-y-3 mt-3">
              {project.futureRoadmap.map((item) => (
                <div key={item.title} className="p-3 rounded-lg bg-surface-200/40 border border-white/[0.05] flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shrink-0">
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
        <ProjectFooterNav currentSlug="agriinsight" />

      </div>
    </div>
  );
}
