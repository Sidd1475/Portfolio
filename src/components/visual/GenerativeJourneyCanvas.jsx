'use client';

import React, { useRef, useEffect, useState } from 'react';
import { journeyScrollState, CHAPTER_RANGES } from '@/lib/scroll-journey';
import {
  backgroundInteractionState,
  triggerBackgroundRipple,
} from '@/lib/background-interaction';

/**
 * Color palettes for each stage of the visual journey
 */
const STAGE_PALETTES = [
  // Stage A: Hero — Open Field (Expansive, subtle slate & electric indigo)
  {
    primary: [99, 102, 241],     // #6366f1 indigo
    secondary: [34, 211, 238],   // #22d3ee cyan
    accent: [148, 163, 184],     // #94a3b8 slate
    glow: 'rgba(99, 102, 241, 0.08)',
    glowPos: { x: 0.75, y: 0.35 },
  },
  // Stage B: About — Emerging Structure (Deep violet & structured cyan)
  {
    primary: [139, 92, 246],    // #8b5cf6 violet
    secondary: [99, 102, 241],   // #6366f1 indigo
    accent: [56, 189, 248],     // #38bdf8 sky
    glow: 'rgba(139, 92, 246, 0.09)',
    glowPos: { x: 0.35, y: 0.45 },
  },
  // Stage C: CareerLens — Connected Reasoning (Electric purple & high-tech indigo)
  {
    primary: [168, 85, 247],    // #a855f7 purple
    secondary: [99, 102, 241],   // #6366f1 indigo
    accent: [6, 182, 212],      // #06b6d4 cyan
    glow: 'rgba(168, 85, 247, 0.10)',
    glowPos: { x: 0.70, y: 0.50 },
  },
  // Stage D: AgriInsight — Patterns in Data (Emerald & predictive teal)
  {
    primary: [16, 185, 129],    // #10b981 emerald
    secondary: [20, 184, 166],   // #14b8a6 teal
    accent: [52, 211, 153],     // #34d399 light emerald
    glow: 'rgba(16, 185, 129, 0.09)',
    glowPos: { x: 0.45, y: 0.55 },
  },
  // Stage E: YT GPT — Retrieval & Context (Muted amber & electric azure)
  {
    primary: [245, 158, 11],    // #f59e0b amber
    secondary: [56, 189, 248],   // #38bdf8 azure
    accent: [251, 191, 36],     // #fbbf24 light amber
    glow: 'rgba(245, 158, 11, 0.08)',
    glowPos: { x: 0.65, y: 0.45 },
  },
  // Stage F: Contact — Resolution (Moonlight silver & twilight indigo)
  {
    primary: [226, 232, 240],   // #e2e8f0 silver
    secondary: [99, 102, 241],   // #6366f1 indigo
    accent: [165, 180, 252],    // #a5b4fc soft lavender
    glow: 'rgba(99, 102, 241, 0.07)',
    glowPos: { x: 0.50, y: 0.55 },
  },
];

// Linear interpolation helper
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Color interpolation helper
function interpolateColor(colorA, colorB, t) {
  return [
    Math.round(lerp(colorA[0], colorB[0], t)),
    Math.round(lerp(colorA[1], colorB[1], t)),
    Math.round(lerp(colorA[2], colorB[2], t)),
  ];
}

export default function GenerativeJourneyCanvas() {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const [telemetry, setTelemetry] = useState({ name: 'Open Field', stage: 'Stage A', percent: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const motionHandler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionHandler);

    let animationFrameId = null;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Number of procedural contour lines
    const CONTOUR_COUNT = 18;
    // Sparse data trace pulses traveling along the curves
    const TRACE_COUNT = 32;

    // Initialize deterministic data traces
    const traces = [];
    for (let i = 0; i < TRACE_COUNT; i++) {
      traces.push({
        contourIndex: i % CONTOUR_COUNT,
        progress: (i / TRACE_COUNT),
        speed: 0.0004 + (i % 5) * 0.00015,
        size: 1.5 + (i % 3) * 0.8,
        pulseOffset: Math.random() * Math.PI * 2,
        currentX: 0,
        currentY: 0,
      });
    }

    // Pointer and Hover smoothing variables
    let smoothedPointerX = -1000;
    let smoothedPointerY = -1000;
    let hoverInfluence = 0;
    let hoveredColor = [99, 102, 241];
    let hoverTargetX = 0;
    let hoverTargetY = 0;

    // Pointer listeners on window
    const handlePointerMove = (e) => {
      backgroundInteractionState.pointer.x = e.clientX;
      backgroundInteractionState.pointer.y = e.clientY;
      backgroundInteractionState.pointer.active = true;
    };

    const handlePointerLeave = () => {
      backgroundInteractionState.pointer.active = false;
    };

    const handleClick = (e) => {
      // Trigger a subtle, non-intrusive ripple
      triggerBackgroundRipple(e.clientX, e.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // Resize handler
    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Smooth scroll progress interpolation
    let currentP = journeyScrollState.targetProgress;
    let startTime = performance.now();

    // Main render loop
    const render = (now) => {
      const t = (now - startTime) * 0.001;

      // 1. Smoothly interpolate current scroll progress towards target
      const targetP = journeyScrollState.targetProgress;
      currentP = lerp(currentP, targetP, 0.075);
      const p = Math.max(0, Math.min(1, currentP));

      // 2. Smoothly interpolate cursor pointer position
      const ptr = backgroundInteractionState.pointer;
      if (ptr.active) {
        smoothedPointerX = lerp(smoothedPointerX, ptr.x, 0.1);
        smoothedPointerY = lerp(smoothedPointerY, ptr.y, 0.1);
      } else {
        // Slowly drift offscreen when inactive
        smoothedPointerX = lerp(smoothedPointerX, -1000, 0.04);
        smoothedPointerY = lerp(smoothedPointerY, -1000, 0.04);
      }

      // 3. Smoothly interpolate UI hover influence
      const hover = backgroundInteractionState.hoverTarget;
      if (hover.active) {
        hoverInfluence = lerp(hoverInfluence, 1.0, 0.08);
        hoveredColor = interpolateColor(hoveredColor, hover.color, 0.1);
        hoverTargetX = lerp(hoverTargetX, hover.x, 0.08);
        hoverTargetY = lerp(hoverTargetY, hover.y, 0.08);
      } else {
        hoverInfluence = lerp(hoverInfluence, 0.0, 0.05);
      }

      // Clear previous frame
      ctx.clearRect(0, 0, width, height);

      // 4. Determine active stage & fractional transition (0 to 5)
      const stageSpan = 1 / (STAGE_PALETTES.length - 1);
      const stageIdx = Math.min(Math.floor(p / stageSpan), STAGE_PALETTES.length - 2);
      const stageFrac = (p - stageIdx * stageSpan) / stageSpan;
      const smoothBlend = (1 - Math.cos(stageFrac * Math.PI)) * 0.5;

      const palA = STAGE_PALETTES[stageIdx];
      const palB = STAGE_PALETTES[stageIdx + 1];

      // Base stage colors
      let curPrimary = interpolateColor(palA.primary, palB.primary, smoothBlend);
      let curSecondary = interpolateColor(palA.secondary, palB.secondary, smoothBlend);
      let curAccent = interpolateColor(palA.accent, palB.accent, smoothBlend);

      // Blend in UI hover accent if element is hovered
      if (hoverInfluence > 0.01) {
        curPrimary = interpolateColor(curPrimary, hoveredColor, hoverInfluence * 0.45);
        curAccent = interpolateColor(curAccent, hoveredColor, hoverInfluence * 0.65);
      }

      // 5. Update atmospheric glow position via direct DOM update
      if (glowRef.current) {
        let glowX = lerp(palA.glowPos.x, palB.glowPos.x, smoothBlend) * 100;
        let glowY = lerp(palA.glowPos.y, palB.glowPos.y, smoothBlend) * 100;

        if (hoverInfluence > 0.05 && width > 0 && height > 0) {
          const targetGlowX = (hoverTargetX / width) * 100;
          const targetGlowY = (hoverTargetY / height) * 100;
          glowX = lerp(glowX, targetGlowX, hoverInfluence * 0.6);
          glowY = lerp(glowY, targetGlowY, hoverInfluence * 0.6);
        }

        glowRef.current.style.background = `radial-gradient(circle 540px at ${glowX}% ${glowY}%, rgba(${curPrimary.join(',')}, ${0.11 + hoverInfluence * 0.05}), rgba(${curSecondary.join(',')}, 0.04) 60%, transparent 100%)`;
      }

      // If user prefers reduced motion, render stable baseline contour horizon
      if (mediaQuery.matches) {
        renderStaticContours(ctx, width, height, curPrimary, curSecondary);
        return;
      }

      // Track points along each contour for drawing data traces & cursor connections
      const contourSamplePoints = [];

      // 6. UPDATE AND RENDER CLICK RIPPLES
      const activeRipples = backgroundInteractionState.ripples;
      for (let rIdx = activeRipples.length - 1; rIdx >= 0; rIdx--) {
        const rip = activeRipples[rIdx];
        rip.radius += rip.speed;
        rip.alpha *= 0.96;

        if (rip.alpha < 0.02 || rip.radius > rip.maxRadius) {
          activeRipples.splice(rIdx, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${curAccent.join(',')}, ${rip.alpha * 0.4})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 7. PROCEDURAL GENERATIVE CONTOURS WITH CURSOR & RIPPLE INTERACTION
      // -------------------------------------------------------------
      for (let i = 0; i < CONTOUR_COUNT; i++) {
        const normIdx = i / (CONTOUR_COUNT - 1); // 0 to 1
        const linePoints = [];

        // Base vertical baseline evolves meaningfully with scroll
        let baseY = height * (0.25 + normIdx * 0.65);

        // Stage A: Hero asymmetry
        const heroSpread = (1 - Math.min(p / 0.18, 1));
        baseY += heroSpread * height * (0.12 + (1 - normIdx) * 0.15);

        // Stage C: Convergence towards pipeline tiers (CareerLens)
        if (p >= 0.28 && p <= 0.58) {
          const cWeight = Math.sin(((p - 0.28) / 0.30) * Math.PI);
          const tier = (i % 4) / 3;
          const targetTierY = height * (0.35 + tier * 0.32);
          baseY = lerp(baseY, targetTierY, cWeight * 0.65);
        }

        // Stage D: Statistical distribution curve (AgriInsight)
        if (p >= 0.48 && p <= 0.76) {
          const dWeight = Math.sin(((p - 0.48) / 0.28) * Math.PI);
          const gaussianCenter = height * 0.58;
          baseY = lerp(baseY, gaussianCenter + (normIdx - 0.5) * height * 0.35, dWeight * 0.55);
        }

        // Stage E: Retrieval funnel convergence (YT GPT)
        if (p >= 0.68 && p <= 0.90) {
          const eWeight = Math.sin(((p - 0.68) / 0.22) * Math.PI);
          const clusterId = i % 3;
          const clusterY = height * (0.32 + clusterId * 0.22);
          baseY = lerp(baseY, clusterY, eWeight * 0.5);
        }

        // Stage F: Flattening into peaceful horizons (Contact)
        if (p >= 0.86) {
          const fWeight = (p - 0.86) / 0.14;
          baseY = lerp(baseY, height * (0.30 + normIdx * 0.55), fWeight);
        }

        // Horizontal stepping
        const steps = 48;
        const dx = width / steps;

        ctx.beginPath();

        for (let j = 0; j <= steps; j++) {
          const x = j * dx;
          const nx = x / width;

          // Wave amplitude and frequency parameters driven by scroll progress
          let amp = 24 + normIdx * 18;
          let freq1 = 2.2 + normIdx * 0.8;
          let freq2 = 4.2;

          // Stage B (About)
          const structWeight = Math.sin(Math.min(Math.max((p - 0.12) / 0.25, 0), 1) * Math.PI);
          amp = lerp(amp, 16 + (i % 3) * 8, structWeight * 0.7);
          freq1 = lerp(freq1, 5.5, structWeight * 0.6);

          // Stage C (CareerLens)
          if (p >= 0.30 && p <= 0.58) {
            const cW = Math.sin(((p - 0.30) / 0.28) * Math.PI);
            const gate1 = Math.exp(-Math.pow((nx - 0.22) * 10, 2)) * 35;
            const gate2 = Math.exp(-Math.pow((nx - 0.44) * 10, 2)) * -30;
            const gate3 = Math.exp(-Math.pow((nx - 0.66) * 10, 2)) * 28;
            const gate4 = Math.exp(-Math.pow((nx - 0.86) * 10, 2)) * -25;
            amp += (gate1 + gate2 + gate3 + gate4) * cW;
          }

          // Stage D (AgriInsight)
          if (p >= 0.50 && p <= 0.74) {
            const dW = Math.sin(((p - 0.50) / 0.24) * Math.PI);
            const bell = Math.exp(-Math.pow((nx - 0.52) * 4, 2)) * 65 * Math.sin(normIdx * Math.PI);
            amp = lerp(amp, 18, dW * 0.5);
            baseY -= bell * dW * 0.7;
          }

          // Stage E (YT GPT)
          if (p >= 0.70 && p <= 0.88) {
            const eW = Math.sin(((p - 0.70) / 0.18) * Math.PI);
            const funnel = Math.sin(nx * Math.PI * 3 + p * 4) * (1 - nx) * 35;
            amp += funnel * eW;
          }

          // Stage F (Contact)
          if (p >= 0.88) {
            const fW = (p - 0.88) / 0.12;
            amp = lerp(amp, 6, fW);
          }

          // Living breath
          const breath = Math.sin(t * 0.4 + normIdx * 3 + nx * 2) * 5;

          // Compute raw Y coordinate
          const wave = Math.sin(nx * freq1 + p * 2.5) * Math.cos(nx * freq2 - p * 1.8) * amp;
          let y = baseY + wave + breath;

          // -----------------------------------------------------------
          // CURSOR DEFLECTION INTERACTION (Subtle, responsive elasticity)
          // -----------------------------------------------------------
          if (smoothedPointerX > -500) {
            const distToCursor = Math.hypot(x - smoothedPointerX, y - smoothedPointerY);
            const cursorRadius = 150;
            if (distToCursor < cursorRadius) {
              const falloff = Math.exp(-Math.pow(distToCursor / (cursorRadius * 0.55), 2));
              // Gentle downward/upward elastic push away from cursor
              const pushSign = y > smoothedPointerY ? 1 : -1;
              const deflection = pushSign * falloff * 24;
              y += deflection;
            }
          }

          // -----------------------------------------------------------
          // CLICK RIPPLE PERTURBATION
          // -----------------------------------------------------------
          for (let r = 0; r < activeRipples.length; r++) {
            const rip = activeRipples[r];
            const distToRipple = Math.hypot(x - rip.x, y - rip.y);
            const ringDist = Math.abs(distToRipple - rip.radius);
            if (ringDist < 45) {
              const ripWave = Math.sin((ringDist / 45) * Math.PI) * (rip.alpha * 12);
              y += (y > rip.y ? 1 : -1) * ripWave;
            }
          }

          linePoints.push({ x, y });

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        contourSamplePoints.push(linePoints);

        // Stroke styling: dynamic alpha and gradient across width
        let alphaBase = 0.08 + (normIdx % 3 === 0 ? 0.12 : 0.06);
        if (hoverInfluence > 0.05) {
          alphaBase += hoverInfluence * 0.04;
        }
        const stageAlphaFactor = p > 0.85 ? lerp(1, 0.7, (p - 0.85) / 0.15) : 1;
        const lineAlpha = alphaBase * stageAlphaFactor;

        const strokeGrad = ctx.createLinearGradient(0, 0, width, 0);
        strokeGrad.addColorStop(0.0, `rgba(${curPrimary.join(',')}, ${lineAlpha * 0.4})`);
        strokeGrad.addColorStop(0.3, `rgba(${curSecondary.join(',')}, ${lineAlpha * 1.2})`);
        strokeGrad.addColorStop(0.7, `rgba(${curPrimary.join(',')}, ${lineAlpha})`);
        strokeGrad.addColorStop(1.0, `rgba(${curAccent.join(',')}, ${lineAlpha * 0.3})`);

        ctx.strokeStyle = strokeGrad;
        ctx.lineWidth = normIdx % 4 === 0 ? 1.25 : 0.75;
        ctx.stroke();

        // Stage B & C: Structural ticks
        if (p >= 0.15 && p <= 0.60 && i % 3 === 0) {
          const structAlpha = Math.sin(((p - 0.15) / 0.45) * Math.PI) * 0.22;
          ctx.strokeStyle = `rgba(${curSecondary.join(',')}, ${structAlpha})`;
          ctx.lineWidth = 0.6;

          for (let k = 4; k < linePoints.length; k += 8) {
            const pt = linePoints[k];
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y - 3);
            ctx.lineTo(pt.x, pt.y + 3);
            ctx.stroke();

            if (k === 20 && i === 6) {
              ctx.beginPath();
              ctx.moveTo(pt.x - 4, pt.y);
              ctx.lineTo(pt.x + 4, pt.y);
              ctx.stroke();
            }
          }
        }
      }

      // -------------------------------------------------------------
      // 8. SPARSE DATA TRACE PULSES & CURSOR PROXIMITY CHORDS
      // -------------------------------------------------------------
      const nearbyTracePoints = [];

      for (let tIdx = 0; tIdx < traces.length; tIdx++) {
        const trace = traces[tIdx];
        const contour = contourSamplePoints[trace.contourIndex];
        if (!contour || contour.length < 2) continue;

        // Advance trace
        const velBoost = Math.abs(journeyScrollState.velocity) * 0.002;
        trace.progress = (trace.progress + trace.speed + velBoost) % 1.0;

        const exactIdx = trace.progress * (contour.length - 1);
        const idxFloor = Math.floor(exactIdx);
        const idxCeil = Math.min(idxFloor + 1, contour.length - 1);
        const frac = exactIdx - idxFloor;

        const pA = contour[idxFloor];
        const pB = contour[idxCeil];
        const px = lerp(pA.x, pB.x, frac);
        const py = lerp(pA.y, pB.y, frac);

        trace.currentX = px;
        trace.currentY = py;

        const pulse = 1 + Math.sin(t * 3 + trace.pulseOffset) * 0.25;
        let traceAlpha = 0.45 + Math.sin(t * 2 + trace.pulseOffset) * 0.25;

        // Proximity to cursor check
        if (smoothedPointerX > -500) {
          const distToCursor = Math.hypot(px - smoothedPointerX, py - smoothedPointerY);
          if (distToCursor < 140) {
            nearbyTracePoints.push({ x: px, y: py, dist: distToCursor });
            traceAlpha = Math.min(1.0, traceAlpha + (1 - distToCursor / 140) * 0.4);
          }
        }

        // Draw glowing point
        ctx.beginPath();
        ctx.arc(px, py, trace.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${curAccent.join(',')}, ${traceAlpha})`;
        ctx.fill();

        // Subtle forward trajectory trail
        const trailLen = 14 + velBoost * 300;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px - trailLen, py);
        ctx.strokeStyle = `rgba(${curPrimary.join(',')}, ${traceAlpha * 0.35})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 9. CURSOR TEMPORARY CONNECTION CHORDS (Reference inspiration)
      // Delicate hairline filaments connecting traces near the cursor
      // -------------------------------------------------------------
      if (nearbyTracePoints.length > 0 && smoothedPointerX > -500) {
        for (let a = 0; a < nearbyTracePoints.length; a++) {
          const ptA = nearbyTracePoints[a];
          // Connect to cursor
          const alphaA = (1 - ptA.dist / 140) * 0.35;
          ctx.beginPath();
          ctx.moveTo(ptA.x, ptA.y);
          ctx.lineTo(smoothedPointerX, smoothedPointerY);
          ctx.strokeStyle = `rgba(${curAccent.join(',')}, ${alphaA})`;
          ctx.lineWidth = 0.55;
          ctx.stroke();

          // Connect to other nearby trace points
          for (let b = a + 1; b < nearbyTracePoints.length; b++) {
            const ptB = nearbyTracePoints[b];
            const interDist = Math.hypot(ptA.x - ptB.x, ptA.y - ptB.y);
            if (interDist < 110) {
              const chordAlpha = (1 - interDist / 110) * 0.28;
              ctx.beginPath();
              ctx.moveTo(ptA.x, ptA.y);
              ctx.lineTo(ptB.x, ptB.y);
              ctx.strokeStyle = `rgba(${curSecondary.join(',')}, ${chordAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        // Tiny cursor anchor point
        ctx.beginPath();
        ctx.arc(smoothedPointerX, smoothedPointerY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${curAccent.join(',')}, 0.6)`;
        ctx.fill();
      }

      // -------------------------------------------------------------
      // 10. RETRIEVAL PATHWAY BEAM (Stage E: YT GPT)
      // -------------------------------------------------------------
      if (p >= 0.68 && p <= 0.88) {
        const beamAlpha = Math.sin(((p - 0.68) / 0.20) * Math.PI) * 0.35;
        const qX = width * 0.22;
        const qY = height * 0.48;
        const targetX = width * 0.72;
        const targetY = height * 0.38;

        const beamGrad = ctx.createLinearGradient(qX, qY, targetX, targetY);
        beamGrad.addColorStop(0.0, `rgba(245, 158, 11, ${beamAlpha * 1.5})`);
        beamGrad.addColorStop(0.5, `rgba(56, 189, 248, ${beamAlpha})`);
        beamGrad.addColorStop(1.0, `rgba(255, 255, 255, ${beamAlpha * 0.2})`);

        ctx.beginPath();
        ctx.moveTo(qX, qY);
        ctx.quadraticCurveTo((qX + targetX) * 0.5, (qY + targetY) * 0.5 - 40, targetX, targetY);
        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Continue animation loop
      animationFrameId = requestAnimationFrame(render);
    };

    // Static fallback for reduced motion
    const renderStaticContours = (context, w, h, prim, sec) => {
      context.clearRect(0, 0, w, h);
      for (let i = 0; i < 8; i++) {
        const y = h * (0.3 + (i / 7) * 0.5);
        context.beginPath();
        context.moveTo(0, y);
        context.bezierCurveTo(w * 0.3, y - 20, w * 0.7, y + 20, w, y);
        context.strokeStyle = `rgba(${prim.join(',')}, 0.10)`;
        context.lineWidth = 0.8;
        context.stroke();
      }
    };

    // Visibility API handling: pause rendering when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        startTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Start loop
    animationFrameId = requestAnimationFrame(render);

    // Telemetry ticker update (200ms throttle to prevent React re-renders)
    const telemetryInterval = setInterval(() => {
      const idx = journeyScrollState.activeChapter;
      const ch = CHAPTER_RANGES[idx] || CHAPTER_RANGES[0];
      const percent = Math.round(journeyScrollState.targetProgress * 100);
      setTelemetry({
        name: ch.name,
        stage: `Stage ${String.fromCharCode(65 + idx)}`,
        percent,
      });
    }, 200);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibility);
      mediaQuery.removeEventListener('change', motionHandler);
      clearInterval(telemetryInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-[#030307]">
      {/* 
        Layer 1: Atmospheric Volumetric Glow 
        Directly driven by scroll progress & element hover target without causing React re-renders
      */}
      <div
        ref={glowRef}
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 500px at 75% 35%, rgba(99, 102, 241, 0.12), transparent 70%)',
        }}
      />

      {/* 
        Layer 2: Generative Canvas 2D Surface 
        Renders razor-sharp procedural contours, harmonic waveforms, data traces, and cursor chords
      */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 
        Layer 3: Subtle Editorial Vignette 
        Guarantees high contrast and readable text across all viewports
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030307]/70 via-transparent to-[#030307]/80 pointer-events-none" />

      {/* 
        Layer 4: Real-Time HUD Journey Telemetry
        Shows current stage, conceptual focus, and percentage progress
      */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-20 items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel-subtle border border-white/[0.08] text-[10px] font-mono text-zinc-400 select-none shadow-2xl backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-zinc-400 uppercase tracking-widest">{telemetry.stage}:</span>
        <span className="text-zinc-200 tracking-wider uppercase font-medium">{telemetry.name}</span>
        <span className="text-zinc-600">&bull;</span>
        <span className="text-cyan-400 font-bold">{telemetry.percent}%</span>
      </div>
    </div>
  );
}
