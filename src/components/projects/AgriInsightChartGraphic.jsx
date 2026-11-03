'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/scroll-scrub';

// Sampled trend points representing the Indian agricultural regression surface
const DATA_POINTS = [
  { x: 50, y: 100 },
  { x: 90, y: 92 },
  { x: 130, y: 78 },
  { x: 170, y: 84 },
  { x: 210, y: 62 },
  { x: 250, y: 55 },
  { x: 290, y: 48 }, // Optimal inference point (R² ≈ 0.80)
  { x: 330, y: 44 },
  { x: 370, y: 40 },
  { x: 410, y: 38 },
  { x: 450, y: 42 },
  { x: 490, y: 45 },
  { x: 530, y: 52 },
];

export default function AgriInsightChartGraphic() {
  const containerRef = useRef(null);
  const gridLineRefs = useRef([]);
  const curveRef = useRef(null);
  const areaClipRectRef = useRef(null);
  const pointRefs = useRef([]);
  const calloutRef = useRef(null);
  const axisLabelsRef = useRef(null);
  const progressPercentRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || !curveRef.current) return;

    const curve = curveRef.current;
    const curveLength = curve.getTotalLength() || 490;

    if (isReducedMotion()) {
      gridLineRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1 }));
      gsap.set(curve, { strokeDasharray: curveLength, strokeDashoffset: 0 });
      if (areaClipRectRef.current) gsap.set(areaClipRectRef.current, { attr: { width: 500 } });
      pointRefs.current.forEach((el) => el && gsap.set(el, { scale: 1, opacity: 1 }));
      if (calloutRef.current) gsap.set(calloutRef.current, { opacity: 1, scale: 1 });
      if (axisLabelsRef.current) gsap.set(axisLabelsRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial hidden/masked states
      gridLineRefs.current.forEach((el) => {
        if (el) gsap.set(el, { strokeDasharray: 500, strokeDashoffset: 500 });
      });

      gsap.set(curve, {
        strokeDasharray: curveLength,
        strokeDashoffset: curveLength,
      });

      if (areaClipRectRef.current) {
        gsap.set(areaClipRectRef.current, { attr: { width: 0 } });
      }

      pointRefs.current.forEach((el) => {
        if (el) gsap.set(el, { scale: 0, opacity: 0, transformOrigin: 'center center' });
      });

      if (calloutRef.current) {
        gsap.set(calloutRef.current, { opacity: 0, scale: 0.8, transformOrigin: '290px 48px' });
      }

      if (axisLabelsRef.current) {
        gsap.set(axisLabelsRef.current, { opacity: 0 });
      }

      // Master scrubbed timeline bound to container scroll progress
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

      // 1. Grid lines draw across at start (0.00 -> 0.16)
      gridLineRefs.current.forEach((el) => {
        if (el) {
          tl.to(el, { strokeDashoffset: 0, ease: 'none', duration: 0.16 }, 0);
        }
      });
      if (axisLabelsRef.current) {
        tl.to(axisLabelsRef.current, { opacity: 1, duration: 0.15 }, 0.05);
      }

      // 2. Main regression curve draws continuously left to right (0.10 -> 0.90)
      tl.to(
        curve,
        {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 0.8,
        },
        0.10
      );

      // 3. Shaded area clip rect expands simultaneously with curve draw
      if (areaClipRectRef.current) {
        tl.to(
          areaClipRectRef.current,
          {
            attr: { width: 500 },
            ease: 'none',
            duration: 0.8,
          },
          0.10
        );
      }

      // 4. Data points pop in sequentially as curve reaches their x positions
      const pointTimes = [
        0.12, 0.18, 0.25, 0.31, 0.38, 0.45, 0.52, 0.59, 0.66, 0.73, 0.80, 0.86, 0.92,
      ];

      pointRefs.current.forEach((el, idx) => {
        if (el) {
          const t = pointTimes[idx] || 0.5;
          tl.to(el, { scale: 1, opacity: 1, duration: 0.08, ease: 'back.out(1.5)' }, t);
        }
      });

      // 5. Optimal inference point callout badge resolves at t=0.54
      if (calloutRef.current) {
        tl.to(
          calloutRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.12,
            ease: 'back.out(1.4)',
          },
          0.54
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full mb-6 p-4 rounded-2xl bg-surface-200/40 border border-emerald-500/20 backdrop-blur-md"
    >
      <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-zinc-400">
        <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          RANDOM FOREST REGRESSION TREND &bull; SCROLL-DRAWN
        </span>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 hidden sm:inline">340K+ SAMPLES // TEST R² ≈ 0.80</span>
          <span
            ref={progressPercentRef}
            className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold"
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
          {/* SVG Clip Path for Dynamic Scrubbed Area Fill */}
          <defs>
            <clipPath id="agri-area-clip">
              <rect ref={areaClipRectRef} x="48" y="0" width="0" height="130" />
            </clipPath>

            <linearGradient id="emerald-line-gradient" x1="50" y1="100" x2="530" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0d9488" />
              <stop offset="0.5" stopColor="#10b981" />
              <stop offset="1" stopColor="#34d399" />
            </linearGradient>

            <linearGradient id="emerald-area-gradient" x1="0" y1="40" x2="0" y2="115" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="1" stopColor="#030307" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Subtle Grid Lines (Progressively Drawn) */}
          <line
            ref={(el) => (gridLineRefs.current[0] = el)}
            x1="40"
            y1="30"
            x2="540"
            y2="30"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <line
            ref={(el) => (gridLineRefs.current[1] = el)}
            x1="40"
            y1="65"
            x2="540"
            y2="65"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <line
            ref={(el) => (gridLineRefs.current[2] = el)}
            x1="40"
            y1="100"
            x2="540"
            y2="100"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />

          {/* Shaded Area Below Curve (Clipped by areaClipRectRef) */}
          <path
            d="M 50 100 Q 130 80, 210 65 T 370 40 T 530 52 L 530 115 L 50 115 Z"
            fill="url(#emerald-area-gradient)"
            clipPath="url(#agri-area-clip)"
          />

          {/* Main Regression Trend Curve (Genuine Scroll-Drawn Stroke) */}
          <path
            ref={curveRef}
            d="M 50 100 Q 130 80, 210 65 T 370 40 T 530 52"
            stroke="url(#emerald-line-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Sample Data Scatter Points (Revealed Sequentially as Curve Crosses) */}
          {DATA_POINTS.map((pt, idx) => (
            <circle
              key={idx}
              ref={(el) => (pointRefs.current[idx] = el)}
              cx={pt.x}
              cy={pt.y}
              r={idx === 6 ? 5 : 2.5}
              fill={idx === 6 ? '#34d399' : 'rgba(52, 211, 153, 0.65)'}
              stroke={idx === 6 ? '#10b981' : 'transparent'}
              strokeWidth={idx === 6 ? 2 : 0}
            />
          ))}

          {/* Highlighted Inference Callout (Optimal Point) */}
          <g ref={calloutRef}>
            <line x1="290" y1="48" x2="290" y2="20" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="1" strokeDasharray="2 2" />
            <rect x="250" y="8" width="80" height="16" rx="4" fill="rgba(6, 78, 59, 0.85)" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="1" />
            <text x="290" y="19" textAnchor="middle" className="text-[8px] font-mono fill-emerald-200 font-bold select-none">
              R² ≈ 0.80 FIT
            </text>
          </g>

          {/* Axis Labels */}
          <g ref={axisLabelsRef}>
            <text x="45" y="122" className="text-[8px] font-mono fill-zinc-500 select-none">Low Area / Rainfall</text>
            <text x="535" y="122" textAnchor="end" className="text-[8px] font-mono fill-zinc-500 select-none">High Area / Rainfall</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
