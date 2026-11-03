'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Chapter ranges mapped across the full homepage journey (0.0 to 1.0)
 * 0: Hero — Enter the Intelligence Field [0.00 - 0.16]
 * 1: About — Information Becomes Structure [0.16 - 0.35]
 * 2: CareerLens — Orchestration & Reasoning [0.35 - 0.54]
 * 3: AgriInsight — Data & Prediction [0.54 - 0.72]
 * 4: YT GPT — Semantic Retrieval & Context [0.72 - 0.88]
 * 5: Synthesis & Connection [0.88 - 1.00]
 */
export const CHAPTER_RANGES = [
  { id: 'hero', name: 'Open Field', stage: 'Stage A', start: 0.00, end: 0.16 },
  { id: 'about', name: 'Emerging Structure', stage: 'Stage B', start: 0.16, end: 0.35 },
  { id: 'careerlens', name: 'Connected Reasoning', stage: 'Stage C', start: 0.35, end: 0.54 },
  { id: 'agriinsight', name: 'Patterns in Data', stage: 'Stage D', start: 0.54, end: 0.72 },
  { id: 'yt-gpt', name: 'Retrieval & Context', stage: 'Stage E', start: 0.72, end: 0.88 },
  { id: 'contact', name: 'Resolution', stage: 'Stage F', start: 0.88, end: 1.00 },
];

/**
 * Singleton state for the 3D canvas render loop to access without triggering React re-renders
 */
export const journeyScrollState = {
  progress: 0,
  targetProgress: 0,
  velocity: 0,
  activeChapter: 0,
  chapterProgress: 0,
};

/**
 * Custom hook to attach GSAP ScrollTrigger to the homepage container
 */
export function useScrollJourney(containerRef) {
  const triggerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fallback native scroll listener for immediate responsiveness
    const handleNativeScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const raw = Math.min(Math.max(scrollY / docHeight, 0), 1);
        journeyScrollState.targetProgress = raw;
      }
    };

    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    handleNativeScroll();

    // GSAP ScrollTrigger for scrubbed timeline precision and anchor synchronization
    const ctx = gsap.context(() => {
      const targetElement = containerRef?.current || document.body;

      triggerRef.current = ScrollTrigger.create({
        trigger: targetElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          journeyScrollState.targetProgress = self.progress;
          journeyScrollState.velocity = self.getVelocity() / 1000;

          // Determine active chapter and normalized progress within chapter
          const p = self.progress;
          let chapterIdx = 0;
          for (let i = 0; i < CHAPTER_RANGES.length; i++) {
            if (p >= CHAPTER_RANGES[i].start && p <= CHAPTER_RANGES[i].end) {
              chapterIdx = i;
              break;
            } else if (p > CHAPTER_RANGES[CHAPTER_RANGES.length - 1].start) {
              chapterIdx = CHAPTER_RANGES.length - 1;
            }
          }

          const ch = CHAPTER_RANGES[chapterIdx];
          const span = ch.end - ch.start;
          journeyScrollState.activeChapter = chapterIdx;
          journeyScrollState.chapterProgress = span > 0 ? (p - ch.start) / span : 0;
        },
      });

      // Recalculate ScrollTrigger on window resize or dynamic content shifts
      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      ctx.revert();
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [containerRef]);

  return journeyScrollState;
}
