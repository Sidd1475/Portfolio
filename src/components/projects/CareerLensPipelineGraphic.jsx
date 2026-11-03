'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/scroll-scrub';

const STAGES = [
  { id: 'input', label: 'Resume Ingestion', sub: 'PDF/DOCX Tokens', x: 40, y: 70 },
  { id: 'extract', label: 'Skill Extraction', sub: 'Entities & Exp', x: 160, y: 35 },
  { id: 'gap', label: 'Gap Analysis', sub: 'Vector Overlap', x: 280, y: 85 },
  { id: 'score', label: 'ATS Scoring', sub: 'Rubric Weighting', x: 400, y: 40 },
  { id: 'output', label: 'Synthesis', sub: 'Actionable Advice', x: 520, y: 70 },
];

export default function CareerLensPipelineGraphic() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const nodeHaloRefs = useRef([]);
  const nodeDotRefs = useRef([]);
  const nodeLabelRefs = useRef([]);
  const progressPercentRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength() || 540;

    if (isReducedMotion()) {
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });
      nodeHaloRefs.current.forEach((el) => el && gsap.set(el, { scale: 1, opacity: 1 }));
      nodeDotRefs.current.forEach((el) => el && gsap.set(el, { scale: 1, opacity: 1 }));
      nodeLabelRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1 }));
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial state for path and nodes
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      nodeHaloRefs.current.forEach((el) => {
        if (el) gsap.set(el, { scale: 0, opacity: 0, transformOrigin: 'center center' });
      });
      nodeDotRefs.current.forEach((el) => {
        if (el) gsap.set(el, { scale: 0, transformOrigin: 'center center' });
      });
      nodeLabelRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          end: 'bottom 42%',
          scrub: 0.8,
          onUpdate: (self) => {
            if (progressPercentRef.current) {
              progressPercentRef.current.innerText = `${Math.round(self.progress * 100)}%`;
            }
          },
        },
      });

      // Stage 0: Resume Ingestion node pops up at the very start
      if (nodeHaloRefs.current[0]) {
        tl.to(nodeHaloRefs.current[0], { scale: 1, opacity: 1, duration: 0.1 }, 0);
      }
      if (nodeDotRefs.current[0]) {
        tl.to(nodeDotRefs.current[0], { scale: 1, duration: 0.1 }, 0.02);
      }
      if (nodeLabelRefs.current[0]) {
        tl.to(nodeLabelRefs.current[0], { opacity: 1, duration: 0.1 }, 0.04);
      }

      // Continuous path drawing stroke-by-stroke across the DAG timeline
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 1.0,
        },
        0.05
      );

      // Staged node reveals synchronized with the drawing tip reaching each stage
      const stageTimes = [
        0.0,  // Stage 0 (x=40)
        0.26, // Stage 1 (x=160)
        0.50, // Stage 2 (x=280)
        0.74, // Stage 3 (x=400)
        0.94, // Stage 4 (x=520)
      ];

      for (let i = 1; i < STAGES.length; i++) {
        const t = stageTimes[i];
        if (nodeHaloRefs.current[i]) {
          tl.to(nodeHaloRefs.current[i], { scale: 1, opacity: 1, duration: 0.1, ease: 'back.out(1.4)' }, t);
        }
        if (nodeDotRefs.current[i]) {
          tl.to(nodeDotRefs.current[i], { scale: 1, duration: 0.08, ease: 'back.out(1.6)' }, t + 0.02);
        }
        if (nodeLabelRefs.current[i]) {
          tl.to(nodeLabelRefs.current[i], { opacity: 1, duration: 0.08 }, t + 0.03);
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full mb-6 p-4 rounded-2xl bg-surface-200/40 border border-violet-500/20 backdrop-blur-md"
    >
      <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-zinc-400">
        <span className="text-violet-300 font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          LANGGRAPH DAG WORKFLOW &bull; SCROLL-DRAWN
        </span>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 hidden sm:inline">PIPELINE RESOLUTION</span>
          <span
            ref={progressPercentRef}
            className="px-1.5 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-300 font-bold"
          >
            0%
          </span>
        </div>
      </div>

      <div className="relative w-full aspect-[580/130] overflow-hidden">
        <svg
          viewBox="0 0 580 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full select-none"
        >
          {/* Subtle Background Guide Track */}
          <path
            d="M 40 70 C 100 70, 100 35, 160 35 C 220 35, 220 85, 280 85 C 340 85, 340 40, 400 40 C 460 40, 460 70, 520 70"
            stroke="rgba(139, 92, 246, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Genuine Continuous Scroll-Drawn Foreground Path */}
          <path
            ref={pathRef}
            d="M 40 70 C 100 70, 100 35, 160 35 C 220 35, 220 85, 280 85 C 340 85, 340 40, 400 40 C 460 40, 460 70, 520 70"
            stroke="url(#violet-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="violet-gradient" x1="40" y1="35" x2="520" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.5" stopColor="#818cf8" />
              <stop offset="1" stopColor="#c084fc" />
            </linearGradient>
          </defs>

          {/* Coordinated Stage Nodes & Labels */}
          {STAGES.map((stage, idx) => (
            <g key={stage.id}>
              {/* Outer Glow Halo */}
              <circle
                ref={(el) => (nodeHaloRefs.current[idx] = el)}
                cx={stage.x}
                cy={stage.y}
                r="11"
                fill="rgba(139, 92, 246, 0.15)"
                stroke="rgba(168, 85, 247, 0.5)"
                strokeWidth="1"
              />

              {/* Central Core Dot */}
              <circle
                ref={(el) => (nodeDotRefs.current[idx] = el)}
                cx={stage.x}
                cy={stage.y}
                r="4.5"
                fill={idx === 0 ? '#38bdf8' : idx === 4 ? '#34d399' : '#a855f7'}
              />

              {/* Stage Typography Label */}
              <g ref={(el) => (nodeLabelRefs.current[idx] = el)}>
                <text
                  x={stage.x}
                  y={stage.y > 60 ? stage.y + 24 : stage.y - 18}
                  textAnchor="middle"
                  className="text-[9px] font-mono fill-zinc-300 font-medium select-none"
                >
                  {stage.label}
                </text>
                <text
                  x={stage.x}
                  y={stage.y > 60 ? stage.y + 34 : stage.y - 8}
                  textAnchor="middle"
                  className="text-[8px] font-mono fill-zinc-500 select-none"
                >
                  {stage.sub}
                </text>
              </g>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
