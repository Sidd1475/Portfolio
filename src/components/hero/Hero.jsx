'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, ShieldCheck, Terminal, Layers, FileText } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { getAllPublicProjects } from '@/lib/projects';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/scroll-scrub';

export default function Hero() {
  const allProjects = getAllPublicProjects();
  const heroSectionRef = useRef(null);
  const heroContentRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);

  const exploreBtnRef = useRef(null);
  const connectBtnRef = useRef(null);
  const ghLinkRef = useRef(null);
  const liLinkRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  const handleBtnHover = (id, color, ref) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      triggerBackgroundHover(id, color, rect);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Static fallback for reduced motion preferences
    if (isReducedMotion()) {
      if (line1Ref.current) {
        gsap.set(line1Ref.current, { clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0, opacity: 1 });
      }
      if (line2Ref.current) {
        gsap.set(line2Ref.current, { clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0, opacity: 1 });
      }
      if (leftColRef.current) {
        gsap.set(leftColRef.current, { opacity: 1, y: 0 });
      }
      if (rightColRef.current) {
        gsap.set(rightColRef.current, { opacity: 1, y: 0 });
      }
      return;
    }

    const isMobile = window.innerWidth < 768;
    const pinDistance = isMobile ? 480 : 780;

    const ctx = gsap.context(() => {
      // Initial states for progressive reveal
      gsap.set(line1Ref.current, {
        clipPath: 'inset(0% 100% 0% 0%)',
        yPercent: 30,
        opacity: 0.15,
      });

      gsap.set(line2Ref.current, {
        clipPath: 'inset(0% 100% 0% 0%)',
        yPercent: 30,
        opacity: 0.15,
      });

      gsap.set([leftColRef.current, rightColRef.current], {
        opacity: 0,
        y: 24,
      });

      // Master scrubbed timeline bound to hero scroll distance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: `+=${pinDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${(p * 100).toFixed(1)}%`;
            }
            if (progressTextRef.current) {
              progressTextRef.current.innerText = `${Math.round(p * 100)}%`;
            }
          },
        },
      });

      // 1. Line 1 "SIDDHARTH" progressively reveals across scrub 0.0 -> 0.38
      tl.to(
        line1Ref.current,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          yPercent: 0,
          opacity: 1,
          ease: 'power2.out',
          duration: 0.38,
        },
        0.02
      );

      // 2. Line 2 "MISHRA" progressively reveals across scrub 0.18 -> 0.58
      tl.to(
        line2Ref.current,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          yPercent: 0,
          opacity: 1,
          ease: 'power2.out',
          duration: 0.40,
        },
        0.18
      );

      // 3. Left editorial column reveals across scrub 0.38 -> 0.72
      tl.to(
        leftColRef.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.34,
        },
        0.38
      );

      // 4. Right credentials card reveals across scrub 0.42 -> 0.75
      tl.to(
        rightColRef.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.33,
        },
        0.42
      );

      // 5. Seamless Dissolve into generative canvas as user completes Hero and enters About (0.86 -> 1.00)
      tl.to(
        heroContentRef.current,
        {
          opacity: 0,
          y: -40,
          ease: 'power2.in',
          duration: 0.14,
        },
        0.86
      );
    }, heroSectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroSectionRef}
      id="hero"
      className="relative min-h-screen pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-16 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle ambient lighting vignette */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-indigo-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div ref={heroContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        
        {/* Editorial Eyebrow Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              AI Engineer &bull; Software Developer
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-zinc-300">Available for Opportunities</span>
            <span className="text-zinc-600 hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline text-zinc-400">New Delhi, India</span>
          </div>
        </div>

        {/* DOMINANT OVERSIZED NAME — Continuous Scroll-Progress Masked Reveal */}
        <div className="relative mb-8 sm:mb-10 select-none">
          {/* Faint blueprint silhouette in the background anchors typography composition before scroll */}
          <div className="absolute inset-0 pointer-events-none select-none opacity-10 font-display tracking-tight text-white">
            <div className="hero-display-name">SIDDHARTH</div>
            <div className="hero-display-name mt-1 sm:mt-1.5">MISHRA</div>
          </div>

          {/* Line 1: SIDDHARTH (Continuously unclipped by scroll scrub) */}
          <div className="relative overflow-hidden">
            <h1
              ref={line1Ref}
              className="hero-display-name text-white block font-display tracking-tight will-change-transform"
            >
              SIDDHARTH
            </h1>
          </div>

          {/* Line 2: MISHRA (Continuously unclipped by scroll scrub) */}
          <div className="relative overflow-hidden mt-1 sm:mt-1.5">
            <div
              ref={line2Ref}
              className="hero-display-name text-gradient block font-display tracking-tight will-change-transform"
            >
              MISHRA
            </div>
          </div>
        </div>

        {/* Asymmetrical Editorial Composition below the Name */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-6 border-t border-white/[0.08]">
          
          {/* Left Column (7 cols): Personal Statement & CTAs */}
          <div ref={leftColRef} className="lg:col-span-7 space-y-6 will-change-transform">
            <div>
              <span className="editorial-label text-zinc-400 block mb-2">
                MISSION STATEMENT
              </span>
              <p className="text-lg sm:text-xl md:text-2xl font-display font-medium text-zinc-100 leading-snug">
                &ldquo;I build intelligent applications and full-stack systems that turn complex ideas into useful software.&rdquo;
              </p>
            </div>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl font-sans">
              Specializing in agentic LLM orchestration (LangGraph), grounded vector retrieval (RAG + FAISS), and production machine learning pipelines backed by robust software architecture.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div
                ref={exploreBtnRef}
                onMouseEnter={() => handleBtnHover('hero-explore', [34, 211, 238], exploreBtnRef)}
                onMouseLeave={clearBackgroundHover}
              >
                <Link
                  href="#work"
                  className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg shadow-white/10 hover:shadow-cyan-500/20 cursor-pointer"
                >
                  <span>Explore My Work</span>
                  <ArrowDown className="w-4 h-4" />
                </Link>
              </div>

              <div
                ref={connectBtnRef}
                onMouseEnter={() => handleBtnHover('hero-connect', [168, 85, 247], connectBtnRef)}
                onMouseLeave={clearBackgroundHover}
              >
                <Link
                  href="#contact"
                  className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium text-zinc-200 hover:text-white glass-pill hover:border-white/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                </Link>
              </div>

              {siteConfig.resume && (
                <a
                  href={siteConfig.resume}
                  download="Siddharth_Mishra_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-full text-xs font-mono text-emerald-300 hover:text-white glass-panel-subtle hover:border-emerald-500/40 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Resume (PDF)</span>
                </a>
              )}

              <Link
                href="/projects"
                className="px-4 py-3.5 rounded-full text-xs font-mono text-cyan-300 hover:text-white glass-panel-subtle hover:border-cyan-500/30 transition-all flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>All Projects ({allProjects.length})</span>
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols): Editorial Metadata & Verified Profiles */}
          <div ref={rightColRef} className="lg:col-span-5 space-y-4 will-change-transform">
            <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-white/[0.08] backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                <span className="editorial-label text-zinc-400">CREDENTIALS</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  CGPA: 8.98
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-start gap-2 text-zinc-300">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold">MAIT, Delhi</span>
                    <span className="text-zinc-500 block">B.Tech Computer Science (2023–2027)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-zinc-300 pt-2 border-t border-white/[0.05]">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-400">Core Focus: </span>
                    <span className="text-zinc-200">Agentic AI &bull; RAG &bull; ML Pipelines</span>
                  </div>
                </div>
              </div>

              {/* Verified Links */}
              <div className="pt-4 mt-4 border-t border-white/[0.06] grid grid-cols-2 gap-2 text-xs font-mono">
                <div
                  ref={ghLinkRef}
                  onMouseEnter={() => handleBtnHover('hero-gh', [226, 232, 240], ghLinkRef)}
                  onMouseLeave={clearBackgroundHover}
                >
                  <Link
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-surface-200/60 border border-white/[0.06] hover:border-white/20 text-zinc-300 hover:text-white flex items-center justify-between transition-colors group"
                  >
                    <span>GITHUB</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>

                <div
                  ref={liLinkRef}
                  onMouseEnter={() => handleBtnHover('hero-li', [139, 92, 246], liLinkRef)}
                  onMouseLeave={clearBackgroundHover}
                >
                  <Link
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-surface-200/60 border border-white/[0.06] hover:border-indigo-500/30 text-zinc-300 hover:text-indigo-300 flex items-center justify-between transition-colors group"
                  >
                    <span>LINKEDIN</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-indigo-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Restrained Hero Bottom Framing & Scroll Cue with Live Scrub Progress Meter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6 pt-4 flex items-center justify-between text-xs font-mono text-zinc-400 relative z-10 border-t border-white/[0.05]">
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="tracking-wider uppercase text-[11px] text-zinc-400">
            SCROLL TO REVEAL
          </span>
          <div className="w-20 sm:w-28 h-1 rounded-full bg-white/10 overflow-hidden hidden sm:block">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 w-0 transition-[width] duration-75"
            />
          </div>
          <span ref={progressTextRef} className="text-cyan-400 font-semibold text-[11px] hidden sm:inline">
            0%
          </span>
        </div>

        <Link
          href="#about"
          className="hover:text-white flex items-center gap-2 transition-colors cursor-pointer group"
        >
          <span className="tracking-wider uppercase text-[11px]">Scroll to Explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
