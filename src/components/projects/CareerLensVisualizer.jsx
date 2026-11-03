'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Cpu, BarChart3, CheckCircle2, ArrowRight, Layers, Sparkles } from 'lucide-react';

const stages = [
  {
    id: 'resume_parser',
    title: '01: Resume Parser',
    icon: FileText,
    badge: 'LangChain PyPDF',
    description: 'Decomposes unstructured PDF/DOCX resumes into clean technical tokens, structured work history, and verified core competencies.',
    output: {
      candidate: "Senior AI Applicant",
      extractedSkills: ["Python", "FastAPI", "LangGraph", "Docker", "FAISS"],
      experienceYears: 3.5,
      education: "B.Tech Computer Science"
    }
  },
  {
    id: 'job_analyze',
    title: '02: Job Analyzer',
    icon: Cpu,
    badge: 'Gemini Schema Gen',
    description: 'Parallel branch parsing target job descriptions into mandatory prerequisites, preferred frameworks, and domain competencies.',
    output: {
      targetRole: "AI / ML Systems Engineer",
      mandatorySkills: ["Python", "LangChain/LangGraph", "FastAPI", "Vector DBs"],
      niceToHave: ["Docker", "Kubernetes", "Next.js"],
      minimumExp: 2
    }
  },
  {
    id: 'calculate_score',
    title: '03: Calculate Score',
    icon: BarChart3,
    badge: 'Deterministic Fan-In',
    description: 'Merges state from stages 01 and 02 to compute semantic overlap, skill-gap vectors, and categorical alignment percentages.',
    output: {
      matchPercentage: "88%",
      competencyAlignment: "High",
      missingCompetencies: ["Distributed Tracing", "Kubernetes"],
      strongMatches: ["Python (100%)", "LangGraph (100%)", "FastAPI (100%)"]
    }
  },
  {
    id: 'feedback',
    title: '04: Feedback Synthesis',
    icon: Sparkles,
    badge: 'Context-Aware Synthesis',
    description: 'Translates scoring vectors into personalized bullet-point feedback, highlighting high-impact resume improvements and missing keywords.',
    output: {
      actionableTips: [
        "Quantify LangGraph orchestration latency reduction in project bullets.",
        "Add explicit mention of distributed tracing or LangSmith telemetry.",
        "Highlight containerization workflow in FastAPI microservice deployment."
      ],
      synthesisVerdict: "Strong Candidate Match"
    }
  }
];

export default function CareerLensVisualizer() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="w-full rounded-2xl glass-panel p-5 sm:p-7 border border-white/[0.08] shadow-2xl overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              LangGraph StateGraph Architecture
            </h4>
            <p className="text-xs font-mono text-zinc-400">
              4-Stage Directed Acyclic Graph (DAG) Pipeline
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-400/90 font-medium">PARALLEL FAN-IN COMPILED</span>
        </div>
      </div>

      {/* DAG Workflow Nodes Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-5">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = activeStage === index;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(index)}
              className={`p-3 rounded-xl border text-left transition-all relative ${
                isActive
                  ? 'bg-indigo-950/40 border-indigo-500/50 text-white shadow-lg shadow-indigo-500/10'
                  : 'bg-surface-200/50 border-white/[0.06] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`} />
                <span className="text-[10px] font-mono text-zinc-400">{stage.badge}</span>
              </div>
              <div className="text-xs font-semibold tracking-tight">{stage.title}</div>
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-cyan-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic Stage Details & State Inspection */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 rounded-xl bg-surface-300/70 border border-white/[0.06]"
        >
          {/* Explanation */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono text-indigo-300 mb-2">
                ACTIVE NODE // {stages[activeStage].id}
              </div>
              <h5 className="text-base font-semibold text-white mb-2">
                {stages[activeStage].title}
              </h5>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                {stages[activeStage].description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Next Node: {activeStage < 3 ? stages[activeStage + 1].id : 'END'}</span>
              <button
                onClick={() => setActiveStage((prev) => (prev + 1) % stages.length)}
                className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <span>Step Forward</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive State / Schema Payload */}
          <div className="lg:col-span-6 rounded-lg bg-anthracite-900/90 border border-white/[0.08] p-3.5 font-mono text-xs overflow-x-auto">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-[10px] text-zinc-400">
              <span className="flex items-center gap-1 text-cyan-300">
                <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                <span>STATE_STORE // Pydantic TypedDict</span>
              </span>
              <span>JSON Payload</span>
            </div>
            <pre className="text-zinc-300 leading-relaxed text-[11px]">
              {JSON.stringify(stages[activeStage].output, null, 2)}
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Flagship Product Summary Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-white/[0.08]">
        <div className="p-3 rounded-xl bg-surface-200/40 border border-white/[0.05]">
          <span className="text-[10px] font-mono text-zinc-400 block uppercase">Orchestration</span>
          <span className="text-sm font-semibold text-white">4-Stage LangGraph</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-200/40 border border-white/[0.05]">
          <span className="text-[10px] font-mono text-zinc-400 block uppercase">API Framework</span>
          <span className="text-sm font-semibold text-white">FastAPI Asynchronous</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-200/40 border border-white/[0.05]">
          <span className="text-[10px] font-mono text-zinc-400 block uppercase">LLM Engine</span>
          <span className="text-sm font-semibold text-white">Google Gemini API</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-200/40 border border-white/[0.05]">
          <span className="text-[10px] font-mono text-zinc-400 block uppercase">Frontend UI</span>
          <span className="text-sm font-semibold text-white">Next.js App Router</span>
        </div>
      </div>
    </div>
  );
}
