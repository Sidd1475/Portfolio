'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/scroll-scrub';

/**
 * Masked Multiline Heading Reveal with True Scroll-Progress Scrubbing
 * Progressively reduces the concealed region (clip-path and y-transform) in direct
 * synchronization with the visitor's scroll position.
 */
export function ScrollRevealHeadingMultiline({
  lines = [],
  className = '',
  as: Component = 'h2',
}) {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    if (isReducedMotion()) {
      lineRefs.current.forEach((el) => {
        if (el) gsap.set(el, { yPercent: 0, clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      const validElements = lineRefs.current.filter(Boolean);
      if (validElements.length === 0) return;

      // Set initial masked state
      gsap.set(validElements, {
        yPercent: 105,
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0.15,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 88%',
          end: 'top 48%',
          scrub: 0.6,
        },
      });

      validElements.forEach((el, index) => {
        const startOffset = index * 0.25;
        tl.to(
          el,
          {
            yPercent: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            ease: 'power2.out',
            duration: 0.75,
          },
          startOffset
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lines]);

  return (
    <Component ref={containerRef} className={className}>
      <span className="block w-full">
        {lines.map((line, idx) => (
          <span key={idx} className="block overflow-hidden">
            <span
              ref={(el) => (lineRefs.current[idx] = el)}
              className="block will-change-transform"
            >
              {line}
            </span>
          </span>
        ))}
      </span>
    </Component>
  );
}

/**
 * Single-line Masked Heading Reveal with True Scroll-Progress Scrubbing
 */
export function ScrollRevealHeading({
  children,
  className = '',
  as: Component = 'h2',
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    if (isReducedMotion()) {
      if (textRef.current) {
        gsap.set(textRef.current, { yPercent: 0, clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(textRef.current, {
        yPercent: 105,
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0.15,
      });

      gsap.to(textRef.current, {
        yPercent: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 88%',
          end: 'top 50%',
          scrub: 0.6,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Component ref={containerRef} className={`overflow-hidden ${className}`}>
      <span
        ref={textRef}
        className="inline-block w-full will-change-transform"
      >
        {children}
      </span>
    </Component>
  );
}

/**
 * Paragraph & Narrative Reveal with Scroll-Progress Scrubbing
 */
export function ScrollRevealParagraph({
  children,
  className = '',
}) {
  const textRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !textRef.current) return;

    if (isReducedMotion()) {
      gsap.set(textRef.current, { opacity: 1, y: 0, filter: 'blur(0px)' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(textRef.current, {
        opacity: 0.15,
        y: 18,
        filter: 'blur(3px)',
      });

      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 0.6,
        },
      });
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <p ref={textRef} className={`${className} will-change-transform`}>
      {children}
    </p>
  );
}

/**
 * Technical Badge & Eyebrow Reveal with Scroll-Progress Scrubbing
 */
export function ScrollRevealBadge({
  children,
  className = '',
}) {
  const badgeRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !badgeRef.current) return;

    if (isReducedMotion()) {
      gsap.set(badgeRef.current, { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(badgeRef.current, {
        opacity: 0.15,
        x: -14,
      });

      gsap.to(badgeRef.current, {
        opacity: 1,
        x: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: badgeRef.current,
          start: 'top 90%',
          end: 'top 65%',
          scrub: 0.6,
        },
      });
    }, badgeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={badgeRef} className={`${className} will-change-transform`}>
      {children}
    </div>
  );
}
