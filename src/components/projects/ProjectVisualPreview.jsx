'use client';

import React from 'react';
import { 
  Workflow, 
  Cpu, 
  BarChart3, 
  Sparkles, 
  TrendingUp, 
  Search, 
  Clock, 
  Video, 
  FileText,
  ShieldCheck,
  CheckCircle2,
  Database
} from 'lucide-react';

export default function ProjectVisualPreview({ projectId }) {
  switch (projectId) {
    case 'careerlens':
      return <CareerLensVisual />;
    case 'agriinsight':
      return <AgriInsightVisual />;
    case 'yt-gpt':
      return <YTGptVisual />;
    default:
      return <GenericVisual projectId={projectId} />;
  }
}

/**
 * CareerLens Visual Preview
 * 4-Stage StateGraph DAG with animated pulse beam, schema validator, and ATS match metric
 */
function CareerLensVisual() {
  return (
    <div className="relative w-full h-44 sm:h-52 bg-gradient-to-br from-violet-950/40 via-surface-200/80 to-surface-300/60 p-4 flex flex-col justify-between overflow-hidden border-b border-white/[0.08] select-none">
      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-violet-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-violet-600/25 transition-all duration-500" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300">
          <Workflow className="w-3 h-3 text-violet-400" />
          <span className="font-semibold tracking-wider">LANGGRAPH DAG</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 text-[10px]">
          <ShieldCheck className="w-3 h-3" />
          <span>STRICT PYDANTIC</span>
        </div>
      </div>

      {/* Center 4-Stage StateGraph Visual Pipeline */}
      <div className="relative z-10 my-auto py-1">
        <div className="relative flex items-center justify-between">
          {/* Connecting SVG Path with Travelling Energy Beam */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <line
              x1="12%"
              y1="50%"
              x2="88%"
              y2="50%"
              stroke="rgba(139, 92, 246, 0.25)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <line
              x1="12%"
              y1="50%"
              x2="88%"
              y2="50%"
              stroke="rgba(196, 181, 253, 0.7)"
              strokeWidth="2"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </svg>

          {/* Node 1: Ingest */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-lg bg-surface-100/90 border border-violet-500/30 flex items-center justify-center text-violet-300 shadow-sm group-hover:border-violet-400 transition-colors">
              <FileText className="w-4 h-4" />
            </div>
            <span className="mt-1 text-[9px] font-mono text-zinc-400">Parse</span>
          </div>

          {/* Node 2: Decompose */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-lg bg-surface-100/90 border border-violet-500/30 flex items-center justify-center text-violet-300 shadow-sm group-hover:border-violet-400 transition-colors">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="mt-1 text-[9px] font-mono text-zinc-400">Decompose</span>
          </div>

          {/* Node 3: Score Engine */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-lg bg-surface-100/90 border border-violet-500/30 flex items-center justify-center text-violet-300 shadow-sm group-hover:border-violet-400 transition-colors">
              <BarChart3 className="w-4 h-4" />
            </div>
            <span className="mt-1 text-[9px] font-mono text-zinc-400">Score</span>
          </div>

          {/* Node 4: Synthesize */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-lg bg-surface-100/90 border border-violet-500/30 flex items-center justify-center text-violet-300 shadow-sm group-hover:border-violet-400 transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="mt-1 text-[9px] font-mono text-zinc-400">Synthesize</span>
          </div>
        </div>
      </div>

      {/* Bottom Live Metrics Strip */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono border-t border-white/[0.05] pt-2">
        <span className="text-zinc-400">ATS Match Analysis:</span>
        <span className="text-violet-300 font-bold bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
          88% Competency Overlap
        </span>
      </div>
    </div>
  );
}

/**
 * AgriInsight Visual Preview
 * Regression surface curve, scatter points, optimal fit marker (R² ≈ 0.80), and record volume
 */
function AgriInsightVisual() {
  return (
    <div className="relative w-full h-44 sm:h-52 bg-gradient-to-br from-emerald-950/40 via-surface-200/80 to-surface-300/60 p-4 flex flex-col justify-between overflow-hidden border-b border-white/[0.08] select-none">
      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-600/25 transition-all duration-500" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          <span className="font-semibold tracking-wider">RANDOM FOREST ML</span>
        </div>
        <div className="text-[10px] text-zinc-400 font-mono bg-surface-100/90 px-2 py-0.5 rounded border border-white/[0.06]">
          340K+ Records
        </div>
      </div>

      {/* Center SVG Regression Curve with Scatter Plot */}
      <div className="relative z-10 my-auto w-full h-20 flex items-center justify-center">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
          <defs>
            <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.35)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.0)" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="10" y1="20" x2="290" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1="10" y1="50" x2="290" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

          {/* Area fill */}
          <path
            d="M 15 65 Q 70 58, 120 40 T 210 25 T 285 30 L 285 75 L 15 75 Z"
            fill="url(#emeraldGradient)"
          />

          {/* Regression Curve */}
          <path
            d="M 15 65 Q 70 58, 120 40 T 210 25 T 285 30"
            fill="none"
            stroke="rgb(16, 185, 129)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Scatter Points */}
          <circle cx="45" cy="62" r="2.5" fill="rgba(16, 185, 129, 0.6)" />
          <circle cx="85" cy="54" r="2" fill="rgba(16, 185, 129, 0.5)" />
          <circle cx="110" cy="42" r="3" fill="rgba(16, 185, 129, 0.7)" />
          <circle cx="150" cy="38" r="2" fill="rgba(16, 185, 129, 0.5)" />
          <circle cx="180" cy="30" r="2.5" fill="rgba(16, 185, 129, 0.6)" />
          <circle cx="250" cy="28" r="2" fill="rgba(16, 185, 129, 0.5)" />
          <circle cx="275" cy="32" r="2.5" fill="rgba(16, 185, 129, 0.6)" />

          {/* Optimal Prediction Highlight Node */}
          <circle cx="210" cy="25" r="5" fill="rgb(52, 211, 153)" className="animate-pulse" />
          <circle cx="210" cy="25" r="9" fill="none" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Bottom Live Metrics Strip */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono border-t border-white/[0.05] pt-2">
        <span className="text-zinc-400">TargetEncoder District Fit:</span>
        <span className="text-emerald-300 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Test R² ≈ 0.80
        </span>
      </div>
    </div>
  );
}

/**
 * YT GPT Visual Preview
 * Audio waveform, interactive video timeline, FAISS vector search match, and timestamp pins
 */
function YTGptVisual() {
  return (
    <div className="relative w-full h-44 sm:h-52 bg-gradient-to-br from-sky-950/40 via-surface-200/80 to-surface-300/60 p-4 flex flex-col justify-between overflow-hidden border-b border-white/[0.08] select-none">
      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-sky-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-600/25 transition-all duration-500" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-300">
          <Search className="w-3 h-3 text-sky-400" />
          <span className="font-semibold tracking-wider">FAISS VECTOR RAG</span>
        </div>
        <div className="flex items-center gap-1 text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20 text-[10px]">
          <Clock className="w-3 h-3" />
          <span>TIMESTAMPED</span>
        </div>
      </div>

      {/* Center Simulated Video Audio Waveform & Timestamp Markers */}
      <div className="relative z-10 my-auto py-1">
        {/* Equalizer Waveform Bars */}
        <div className="flex items-end justify-center gap-1.5 h-10 mb-2">
          {[35, 60, 45, 80, 55, 95, 70, 85, 40, 65, 90, 50, 75, 45, 85, 60, 30].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                i === 5 || i === 10
                  ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]'
                  : 'bg-sky-500/30'
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Video Scrubber Line with Clickable-style Timestamp Badges */}
        <div className="relative w-full h-1.5 bg-surface-100 rounded-full overflow-visible border border-white/[0.08]">
          <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-sky-500/60 rounded-full" />
          {/* Timestamp Pin 1 */}
          <div className="absolute left-[30%] -top-3 -translate-x-1/2 flex flex-col items-center">
            <span className="px-1.5 py-0.2 rounded bg-surface-100 border border-sky-500/30 text-[8px] font-mono text-zinc-300">
              02:14
            </span>
          </div>
          {/* Timestamp Pin 2 (Retrieved) */}
          <div className="absolute left-[65%] -top-3 -translate-x-1/2 flex flex-col items-center">
            <span className="px-1.5 py-0.2 rounded bg-sky-500 text-zinc-950 font-bold text-[8px] font-mono shadow-sm">
              08:45
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Live Metrics Strip */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono border-t border-white/[0.05] pt-2">
        <span className="text-zinc-400">FAISS Similarity Match:</span>
        <span className="text-sky-300 font-bold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
          Cosine Sim 0.94
        </span>
      </div>
    </div>
  );
}

/**
 * Generic / Sukoon Visual Preview Fallback
 */
function GenericVisual({ projectId }) {
  const isSukoon = projectId === 'sukoon';

  return (
    <div className="relative w-full h-44 sm:h-52 bg-gradient-to-br from-teal-950/40 via-surface-200/80 to-surface-300/60 p-4 flex flex-col justify-between overflow-hidden border-b border-white/[0.08] select-none">
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-300">
          <Sparkles className="w-3 h-3 text-teal-400" />
          <span className="font-semibold tracking-wider">
            {isSukoon ? 'WELLNESS AI' : 'FULL STACK'}
          </span>
        </div>
        <div className="text-[10px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20 font-mono">
          {isSukoon ? 'GHOST MODE' : 'PRODUCTION'}
        </div>
      </div>

      <div className="relative z-10 my-auto flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 shadow-[0_0_30px_rgba(20,184,166,0.2)]">
          <Workflow className="w-8 h-8" />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono border-t border-white/[0.05] pt-2">
        <span className="text-zinc-400">Architecture:</span>
        <span className="text-teal-300 font-bold">FastAPI + Next.js</span>
      </div>
    </div>
  );
}
