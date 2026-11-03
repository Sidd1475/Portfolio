'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Search, MessageSquare, Database, ArrowRight, Play, Clock, Sparkles } from 'lucide-react';

const sampleQueries = [
  {
    query: "How does backpropagation update weights in deep networks?",
    retrievedChunks: [
      {
        timestamp: "14:22",
        text: "The chain rule computes partial derivatives of the loss with respect to each weight matrix starting from the final layer.",
        score: "0.89 Sim"
      },
      {
        timestamp: "16:45",
        text: "Gradient descent then adjusts each parameter by moving in the negative gradient direction scaled by learning rate.",
        score: "0.84 Sim"
      }
    ],
    groundedAnswer: "Backpropagation applies the calculus chain rule in reverse from the output loss layer back through hidden layers [14:22]. Each weight matrix receives a gradient update proportional to its contribution to the final error, which gradient descent then applies to reduce the loss [16:45]."
  },
  {
    query: "What is the difference between Self-Attention and Cross-Attention?",
    retrievedChunks: [
      {
        timestamp: "28:10",
        text: "In self-attention, queries, keys, and values are all projected from the same input sequence representations.",
        score: "0.92 Sim"
      },
      {
        timestamp: "31:05",
        text: "Cross-attention uses queries from the decoder while keys and values are extracted from the encoder representations.",
        score: "0.87 Sim"
      }
    ],
    groundedAnswer: "In Self-Attention, the query, key, and value vectors all originate from the same sequence [28:10]. In contrast, Cross-Attention combines representations: the decoder produces queries that attend over keys and values derived from the encoder's output [31:05]."
  }
];

export default function YTGptVisualizer() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeStep, setActiveStep] = useState('query');

  const current = sampleQueries[selectedIdx];

  const ragSteps = [
    { num: '01', title: 'Transcript Ingestion', desc: 'YouTube Transcript API extracts timestamps & captions' },
    { num: '02', title: 'Sanitization', desc: 'Text cleaning, punctuation restoration, speaker cues' },
    { num: '03', title: 'Sliding Chunking', desc: '500-token semantic chunks with 100-token overlap' },
    { num: '04', title: 'Sentence Transformers', desc: 'Dense 384-d semantic embeddings (all-MiniLM-L6-v2)' },
    { num: '05', title: 'FAISS Index & Dedup', desc: 'Cosine similarity vector store with duplicate suppression' },
    { num: '06', title: 'Top-K Retrieval', desc: 'Queries mapped into embedding space; nearest chunks fetched' },
    { num: '07', title: 'Prompt Orchestration', desc: 'Context injection with strict grounding & timestamp format' },
    { num: '08', title: 'Gemini LLM Output', desc: 'Grounded generation with verifiable timestamp anchors' },
  ];

  return (
    <div className="w-full rounded-2xl glass-panel p-5 sm:p-7 border border-white/[0.08] shadow-2xl overflow-hidden">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              YT GPT: 8-Stage RAG Pipeline Visualizer
            </h4>
            <p className="text-xs font-mono text-zinc-400">
              YouTube Transcripts &bull; Sentence Transformers &bull; FAISS &bull; Gemini LLM
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-surface-200 border border-white/[0.06] text-xs font-mono">
          <button
            onClick={() => setActiveStep('query')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeStep === 'query'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Interactive Query
          </button>
          <button
            onClick={() => setActiveStep('flow')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeStep === 'flow'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            8-Stage Flow
          </button>
        </div>
      </div>

      {activeStep === 'query' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
          {/* Left: Query & Retrieved Vector Chunks */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-2 uppercase">
                Select Sample YouTube Video Query:
              </label>
              <div className="space-y-2">
                {sampleQueries.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIdx(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${
                      selectedIdx === idx
                        ? 'bg-cyan-950/40 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-surface-300/50 border-white/[0.06] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                    }`}
                  >
                    <Search className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${selectedIdx === idx ? 'text-cyan-400' : 'text-zinc-500'}`} />
                    <span className="leading-snug">{item.query}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FAISS Vector Retrieval Node */}
            <div className="p-3.5 rounded-xl bg-surface-300/60 border border-white/[0.06]">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-2.5">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>FAISS TOP-K RETRIEVED CHUNKS</span>
                </span>
                <span className="text-[10px] text-zinc-400">Dense Cosine Match</span>
              </div>

              <div className="space-y-2">
                {current.retrievedChunks.map((chunk, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-surface-100 border border-white/[0.05] text-xs text-zinc-300"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>[{chunk.timestamp}]</span>
                      </span>
                      <span className="text-emerald-400 text-[10px]">{chunk.score}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-zinc-300 italic">
                      &ldquo;{chunk.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Grounded LLM Response */}
          <div className="lg:col-span-6 rounded-xl bg-surface-300/70 border border-white/[0.06] p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-3 pb-2 border-b border-white/[0.06]">
                <span className="flex items-center gap-1.5 text-indigo-300">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>GEMINI SYNTHESIS WITH TIMESTAMPS</span>
                </span>
                <span className="text-[10px] text-emerald-400">Zero Hallucination</span>
              </div>

              <div className="p-4 rounded-xl bg-anthracite-900 border border-indigo-500/30 text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans shadow-inner">
                {current.groundedAnswer}
              </div>

              <div className="mt-4 p-3 rounded-lg bg-surface-200/50 border border-white/[0.05] text-[11px] font-mono text-zinc-300">
                <span className="text-cyan-300 font-semibold">Timestamp Grounding:</span> Citations like [14:22] link back to the exact video playback timestamp, allowing users to verify factual assertions directly from the source clip.
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Embedding Dimension: 384-d</span>
              <span className="text-cyan-400">Sentence Transformers</span>
            </div>
          </div>
        </div>
      ) : (
        /* 8-Stage Architecture Flow Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-6">
          {ragSteps.map((step) => (
            <div
              key={step.num}
              className="p-3.5 rounded-xl bg-surface-300/60 border border-white/[0.06] flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                  STAGE {step.num}
                </span>
                <h5 className="text-xs font-semibold text-white mb-1.5">{step.title}</h5>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/[0.08]">
        <div className="p-3 rounded-xl bg-surface-200/40 border border-white/[0.05]">
          <span className="text-[10px] font-mono text-zinc-400 block uppercase">Vector Store</span>
          <span className="text-sm font-semibold text-white">FAISS L2/Cosine</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-200/40 border border-white/[0.05]">
          <span className="text-[10px] font-mono text-zinc-400 block uppercase">Embeddings</span>
          <span className="text-sm font-semibold text-white">all-MiniLM-L6-v2</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-200/40 border border-white/[0.05]">
          <span className="text-[10px] font-mono text-zinc-400 block uppercase">LLM Synthesis</span>
          <span className="text-sm font-semibold text-white">Gemini 1.5 API</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-200/40 border border-white/[0.05]">
          <span className="text-[10px] font-mono text-zinc-400 block uppercase">Deployment</span>
          <span className="text-sm font-semibold text-white">Streamlit Web App</span>
        </div>
      </div>
    </div>
  );
}
