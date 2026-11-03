'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CHAPTER_RANGES, journeyScrollState } from '@/lib/scroll-journey';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/scroll-scrub';

const CHAPTER_LABELS = [
  { id: 'hero', label: 'IDENTITY', href: '#hero' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'work', label: 'WORK', href: '#work' },
  { id: 'skills', label: 'SKILLS', href: '#skills' },
  { id: 'journey', label: 'JOURNEY', href: '#journey' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
];

export default function ContinuousScrollRail() {
  const railRef = useRef(null);
  const fillLineRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !fillLineRef.current) return;

    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Bind rail fill line height directly to overall window scroll progress
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          if (fillLineRef.current) {
            fillLineRef.current.style.height = `${(p * 100).toFixed(1)}%`;
          }

          // Determine active chapter waypoint
          for (let i = 0; i < CHAPTER_RANGES.length; i++) {
            if (p >= CHAPTER_RANGES[i].start && p <= CHAPTER_RANGES[i].end) {
              setActiveIdx(i);
              break;
            } else if (p > CHAPTER_RANGES[CHAPTER_RANGES.length - 1].start) {
              setActiveIdx(CHAPTER_RANGES.length - 1);
            }
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <aside
      aria-label="Scroll Journey Navigation"
      className="hidden 2xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none pointer-events-auto"
    >
      {/* Background Vertical Guide Track */}
      <div className="relative w-px h-72 bg-white/[0.08]">
        {/* Dynamic Scrubbed Active Fill Line */}
        <div
          ref={fillLineRef}
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-violet-500 transition-[height] duration-75 shadow-[0_0_8px_#22d3ee]"
          style={{ height: '0%' }}
        />

        {/* 6 Waypoint Nodes Distributed Along the Rail */}
        <div className="absolute inset-0 flex flex-col justify-between items-center -my-1 pointer-events-none">
          {CHAPTER_LABELS.map((ch, idx) => {
            const isActive = idx === activeIdx;
            const isPassed = idx < activeIdx;

            return (
              <a
                key={ch.id}
                href={ch.href}
                className="group pointer-events-auto relative flex items-center"
              >
                {/* Node Dot */}
                <div
                  className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                    isActive
                      ? 'bg-cyan-400 border-white shadow-[0_0_10px_#22d3ee] scale-125'
                      : isPassed
                      ? 'bg-indigo-500 border-indigo-400/80 scale-100'
                      : 'bg-zinc-800 border-zinc-700 scale-75 group-hover:scale-100 group-hover:border-zinc-500'
                  }`}
                />

                {/* Waypoint Label Hover & Active Readout */}
                <span
                  className={`absolute left-5 text-[9px] font-mono tracking-widest whitespace-nowrap px-2 py-0.5 rounded transition-all duration-300 ${
                    isActive
                      ? 'opacity-100 translate-x-0 text-cyan-300 bg-surface-200/90 border border-cyan-500/30'
                      : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-zinc-400 bg-surface-200/80'
                  }`}
                >
                  {ch.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
