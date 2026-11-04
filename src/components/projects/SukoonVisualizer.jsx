'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartHandshake,
  ShieldCheck,
  Brain,
  Activity,
  Sparkles,
  ArrowRight,
  Flame,
  MessageSquare,
  Lock,
  CheckCircle2,
  AlertCircle,
  Volume2,
} from 'lucide-react';

const scenarios = [
  {
    id: 'burnout',
    title: 'Workplace Burnout & Fatigue',
    icon: Flame,
    userPrompt: "I've been working 14 hours a day for two weeks straight. I feel completely depleted, irritable, and paralyzed by upcoming deadlines.",
    stages: [
      {
        num: '01',
        title: 'Multimodal Ingestion',
        icon: Volume2,
        badge: 'Web Speech & NLP',
        metrics: [
          { label: 'Emotion Valence', val: '-0.78 (Distress)' },
          { label: 'Cognitive State', val: 'Overwhelm & Depletion' },
          { label: 'Speech Pacing', val: 'Rapid / Labored' },
        ],
        details: 'Parses conversational dialogue, extracting semantic urgency and acoustic fatigue markers while preserving user privacy.',
      },
      {
        num: '02',
        title: 'Crisis Guardrail Screen',
        icon: ShieldCheck,
        badge: 'Deterministic Safety Filter',
        metrics: [
          { label: 'Distress Severity', val: 'Moderate (Non-Acute)' },
          { label: 'Self-Harm Flags', val: 'None Detected (Safe)' },
          { label: 'Hotline Escalation', val: 'Standby / Monitored' },
        ],
        details: 'Deterministic regex screening validates that input does not violate clinical safety policies. No emergency intervention required.',
      },
      {
        num: '03',
        title: 'Empathetic CBT Synthesis',
        icon: Brain,
        badge: 'Gemini Conditioned Prompt',
        metrics: [
          { label: 'Framework', val: 'Cognitive Defusion' },
          { label: 'Tone Delivery', val: 'Warm, Grounding, Compassionate' },
          { label: 'Actionable Cue', val: 'Physiological Sigh (2 mins)' },
        ],
        details: 'Generates de-escalating, non-judgmental guidance: "It makes complete sense that you feel drained. You have been carrying a heavy cognitive load. Let\'s pause together for two minutes before tackling the next step."',
      },
      {
        num: '04',
        title: 'Longitudinal Wellness Insights',
        icon: Activity,
        badge: 'Encrypted MongoDB State',
        metrics: [
          { label: 'Mood Logged', val: 'Exhausted → Calming' },
          { label: 'Resilience Streak', val: '14 Days Logged 🔥' },
          { label: 'Recommended Habit', val: 'Hydration & Sleep Boundary' },
        ],
        details: 'Updates encrypted longitudinal mood trends, calculates wellness streaks, and schedules a gentle check-in prompt for tomorrow.',
      },
    ],
  },
  {
    id: 'imposter',
    title: 'Imposter Syndrome & Doubt',
    icon: Lock,
    userPrompt: "Everyone in my team seems so confident and capable. I feel like a fraud and I'm terrified that one mistake will expose me.",
    stages: [
      {
        num: '01',
        title: 'Multimodal Ingestion',
        icon: Volume2,
        badge: 'Web Speech & NLP',
        metrics: [
          { label: 'Emotion Valence', val: '-0.65 (Apprehensive)' },
          { label: 'Cognitive State', val: 'Catastrophizing & Fear' },
          { label: 'Primary Trigger', val: 'Social Comparison' },
        ],
        details: 'Identifies cognitive distortion markers: mind reading, catastrophizing, and discounted positive achievements.',
      },
      {
        num: '02',
        title: 'Crisis Guardrail Screen',
        icon: ShieldCheck,
        badge: 'Deterministic Safety Filter',
        metrics: [
          { label: 'Distress Severity', val: 'Mild / Situational' },
          { label: 'Safety Heuristics', val: 'Clean Verification' },
          { label: 'Ghost Mode', val: 'Anonymous Space Available' },
        ],
        details: 'Scans text against self-harm vectors. Passes safety triage and offers the option to view shared peer stories in Ghost Mode.',
      },
      {
        num: '03',
        title: 'Empathetic CBT Synthesis',
        icon: Brain,
        badge: 'Gemini Conditioned Prompt',
        metrics: [
          { label: 'Framework', val: 'Evidence Re-examination' },
          { label: 'Tone Delivery', val: 'Objective & Reassuring' },
          { label: 'Actionable Cue', val: 'Fact vs. Feeling Inventory' },
        ],
        details: 'Delivers reflective reframing: "Feeling like an outsider doesn\'t mean you don\'t belong. What is one concrete challenge you solved this week that you were proud of?"',
      },
      {
        num: '04',
        title: 'Longitudinal Wellness Insights',
        icon: Activity,
        badge: 'Encrypted MongoDB State',
        metrics: [
          { label: 'Mood Logged', val: 'Apprehensive → Centered' },
          { label: 'Journal Entry', val: 'Accomplishment Inventory' },
          { label: 'Ghost Mode Peers', val: '43 Engineers Shared Similar' },
        ],
        details: 'Encodes journal reflection into encrypted personal storage and surfaces anonymized community peer validation.',
      },
    ],
  },
  {
    id: 'insomnia',
    title: 'Late-Night Spiral & Insomnia',
    icon: Sparkles,
    userPrompt: "It's 2:30 AM and my brain won't shut off. I keep replaying conversations from three years ago and worrying about tomorrow.",
    stages: [
      {
        num: '01',
        title: 'Multimodal Ingestion',
        icon: Volume2,
        badge: 'Web Speech & NLP',
        metrics: [
          { label: 'Time Window', val: '02:30 AM (Circadian Disruption)' },
          { label: 'Cognitive State', val: 'Nocturnal Rumination' },
          { label: 'Emotion Valence', val: '-0.70 (Agitated)' },
        ],
        details: 'Recognizes nocturnal rumination loops with heightened emotional vulnerability and circadian disruption markers.',
      },
      {
        num: '02',
        title: 'Crisis Guardrail Screen',
        icon: ShieldCheck,
        badge: 'Deterministic Safety Filter',
        metrics: [
          { label: 'Vulnerability Index', val: 'Elevated (Late Night)' },
          { label: 'Safety Heuristics', val: 'Verified Safe' },
          { label: 'Mode Selected', val: 'Whisper / Dim Interface' },
        ],
        details: 'Evaluates nocturnal vulnerability indicators. Switches UI to dim low-stimulation visual feedback with gentle audio pacing.',
      },
      {
        num: '03',
        title: 'Empathetic CBT Synthesis',
        icon: Brain,
        badge: 'Gemini Conditioned Prompt',
        metrics: [
          { label: 'Framework', val: '4-7-8 Parasympathetic Reset' },
          { label: 'Tone Delivery', val: 'Minimalist & Soothing' },
          { label: 'Actionable Cue', val: 'Cognitive Shuffle / Body Scan' },
        ],
        details: 'Provides ambient sleep-inducing guidance: "Your mind is trying to solve tomorrow\'s problems with tonight\'s exhausted energy. You don\'t have to solve anything right now. Let\'s do a 60-second breathing rhythm."',
      },
      {
        num: '04',
        title: 'Longitudinal Wellness Insights',
        icon: Activity,
        badge: 'Encrypted MongoDB State',
        metrics: [
          { label: 'Sleep Hygiene Log', val: 'Late-Night Check-in' },
          { label: 'Session Duration', val: '3m 45s (Quick De-escalation)' },
          { label: 'Outcome Marker', val: 'HRV Stabilization Suggested' },
        ],
        details: 'Records late-night session metadata, minimizes notifications until morning, and flags positive restorative sleep hygiene tips.',
      },
    ],
  },
];

export default function SukoonVisualizer() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  const currentScenario = scenarios[scenarioIdx];
  const currentStage = currentScenario.stages[activeStage];

  return (
    <div className="w-full rounded-2xl glass-panel p-5 sm:p-7 border border-teal-500/20 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Sukoon Emotional Triage &amp; Guardrail Pipeline
            </h4>
            <p className="text-xs font-mono text-zinc-400">
              Interactive 4-Stage Multimodal Safety &amp; Synthesis Simulator
            </p>
          </div>
        </div>

        {/* Live Simulation Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-[11px] font-mono text-teal-300">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>SIMULATED PIPELINE</span>
        </div>
      </div>

      {/* Scenario Selector Pills */}
      <div className="pt-5 pb-4">
        <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2.5">
          Select Clinical Simulation Scenario:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {scenarios.map((sc, idx) => {
            const Icon = sc.icon;
            const isSelected = scenarioIdx === idx;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  setScenarioIdx(idx);
                  setActiveStage(0);
                }}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-teal-500/15 border-teal-500/40 text-white shadow-lg shadow-teal-500/10'
                    : 'bg-surface-200/40 border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-teal-400' : 'text-zinc-500'}`} />
                <span className="text-xs font-semibold truncate">{sc.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulated User Input Bubble */}
      <div className="p-4 rounded-xl bg-surface-200/70 border border-white/[0.06] mb-5">
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
          <span>User Input Transcript</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-200 font-sans italic leading-relaxed">
          &ldquo;{currentScenario.userPrompt}&rdquo;
        </p>
      </div>

      {/* Pipeline Stage Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {currentScenario.stages.map((stg, idx) => {
          const StageIcon = stg.icon;
          const isActive = activeStage === idx;
          return (
            <button
              key={stg.num}
              onClick={() => setActiveStage(idx)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                isActive
                  ? 'bg-teal-500/20 border-teal-500/50 shadow-md shadow-teal-500/10'
                  : 'bg-surface-200/40 border-white/[0.06] hover:border-white/20 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-teal-300' : 'text-zinc-500'}`}>
                  STAGE {stg.num}
                </span>
                <StageIcon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-zinc-500'}`} />
              </div>
              <span className="text-xs font-medium text-white truncate block">
                {stg.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Inspection Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${scenarioIdx}-${activeStage}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-5 sm:p-6 rounded-2xl bg-surface-200/80 border border-white/[0.08]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold">
                STAGE {currentStage.num}
              </span>
              <h5 className="text-base font-semibold text-white font-display">
                {currentStage.title}
              </h5>
            </div>
            <span className="px-2 py-0.5 rounded glass-panel-subtle text-[11px] font-mono text-zinc-300 border border-white/[0.08]">
              {currentStage.badge}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
            {currentStage.details}
          </p>

          {/* Extracted Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentStage.metrics.map((m, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-surface-100 border border-white/[0.06] flex flex-col justify-between"
              >
                <span className="text-[10px] font-mono text-zinc-400 uppercase mb-1">
                  {m.label}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white font-mono">
                  {m.val}
                </span>
              </div>
            ))}
          </div>

          {/* Stepper Navigation Footer */}
          <div className="pt-5 mt-5 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-400">
              Pipeline Stage {activeStage + 1} of {currentScenario.stages.length}
            </span>
            <div className="flex items-center gap-2">
              {activeStage > 0 && (
                <button
                  onClick={() => setActiveStage(activeStage - 1)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white glass-panel-subtle"
                >
                  Previous Stage
                </button>
              )}
              {activeStage < currentScenario.stages.length - 1 ? (
                <button
                  onClick={() => setActiveStage(activeStage + 1)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-zinc-950 bg-teal-400 hover:bg-teal-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveStage(0)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-zinc-950 bg-white hover:bg-zinc-200 font-semibold transition-colors"
                >
                  Restart Simulation
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
