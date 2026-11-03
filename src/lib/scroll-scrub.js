'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Check if the user has requested reduced motion in their system preferences
 */
export function isReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Common fluid scrub parameter:
 * - 0.6 to 0.8 provides a silky, responsive lag that eliminates stuttering while staying deterministic.
 * - true provides instantaneous 1:1 lock.
 */
export const DEFAULT_SCRUB = 0.6;

/**
 * Re-export GSAP & ScrollTrigger for uniform use across components
 */
export { gsap, ScrollTrigger };
