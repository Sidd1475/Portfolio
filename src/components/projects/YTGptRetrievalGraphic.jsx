'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/scroll-scrub';

export default function YTGptRetrievalGraphic() {
  const containerRef = useRef(null);
  const chunkRefs = useRef([]);
  const beam1Ref = useRef(null);
  const faissCircleRef = useRef(null);
  const faissContentRef = useRef(null);
  const queryBoxRef = useRef(null);
  const queryArrowRef = useRef(null);
  const matchedDotRef = useRef(null);
  const beam2Ref = useRef(null);
  const llmEngineRef = useRef(null);
  const citationBadgeRef = useRef(null);
  const progressPercentRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || !beam1Ref.current || !beam2Ref.current) return;

    const beam1 = beam1Ref.current;
    const beam2 = beam2Ref.current;
    const beam1Len = beam1.getTotalLength() || 80;
    const beam2Len = beam2.getTotalLength() || 110;
    const faissCircum = 202; // 2 * pi * 32

    if (isReducedMotion()) {
      chunkRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1, x: 0 }));
      gsap.set(beam1, { strokeDasharray: beam1Len, strokeDashoffset: 0 });
      if (faissCircleRef.current) gsap.set(faissCircleRef.current, { strokeDashoffset: 0 });
      if (faissContentRef.current) gsap.set(faissContentRef.current, { opacity: 1 });
      if (queryBoxRef.current) gsap.set(queryBoxRef.current, { opacity: 1, y: 0 });
      if (queryArrowRef.current) gsap.set(queryArrowRef.current, { opacity: 1 });
      if (matchedDotRef.current) gsap.set(matchedDotRef.current, { scale: 1 });
      gsap.set(beam2, { strokeDasharray: beam2Len, strokeDashoffset: 0 });
      if (llmEngineRef.current) gsap.set(llmEngineRef.current, { opacity: 1 });
      if (citationBadgeRef.current) gsap.set(citationBadgeRef.current, { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial hidden/masked states
      chunkRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, x: -16 });
      });

      gsap.set(beam1, {
        strokeDasharray: beam1Len,
        strokeDashoffset: beam1Len,
      });

      if (faissCircleRef.current) {
        gsap.set(faissCircleRef.current, {
          strokeDasharray: faissCircum,
          strokeDashoffset: faissCircum,
        });
      }

      if (faissContentRef.current) {
        gsap.set(faissContentRef.current, { opacity: 0, scale: 0.85, transformOrigin: '230px 66px' });
      }

      if (queryBoxRef.current) {
        gsap.set(queryBoxRef.current, { opacity: 0, y: -12 });
      }

      if (queryArrowRef.current) {
        gsap.set(queryArrowRef.current, { strokeDasharray: 20, strokeDashoffset: 20 });
      }

      if (matchedDotRef.current) {
        gsap.set(matchedDotRef.current, { scale: 0, transformOrigin: '245px 62px' });
      }

      gsap.set(beam2, {
        strokeDasharray: beam2Len,
        strokeDashoffset: beam2Len,
      });

      if (llmEngineRef.current) {
        gsap.set(llmEngineRef.current, { opacity: 0, x: 16 });
      }

      if (citationBadgeRef.current) {
        gsap.set(citationBadgeRef.current, { opacity: 0, y: 8 });
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

      // 1. Transcript chunks slide in sequentially (0.00 -> 0.22)
      chunkRefs.current.forEach((el, idx) => {
        if (el) {
          tl.to(el, { opacity: 1, x: 0, duration: 0.1, ease: 'power2.out' }, idx * 0.06);
        }
      });

      // 2. Beam 1 draws from Chunk 2 to FAISS (0.20 -> 0.38)
      tl.to(
        beam1,
        {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 0.18,
        },
        0.20
      );

      // 3. FAISS circular vector space boundary draws and content populates (0.35 -> 0.54)
      if (faissCircleRef.current) {
        tl.to(
          faissCircleRef.current,
          {
            strokeDashoffset: 0,
            ease: 'none',
            duration: 0.18,
          },
          0.35
        );
      }
      if (faissContentRef.current) {
        tl.to(
          faissContentRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.14,
            ease: 'back.out(1.4)',
          },
          0.44
        );
      }

      // 4. User Query Vector drops down from top into FAISS (0.48 -> 0.62)
      if (queryBoxRef.current) {
        tl.to(
          queryBoxRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.12,
            ease: 'power2.out',
          },
          0.48
        );
      }
      if (queryArrowRef.current) {
        tl.to(
          queryArrowRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.1,
          },
          0.52
        );
      }
      if (matchedDotRef.current) {
        tl.to(
          matchedDotRef.current,
          {
            scale: 1.4,
            duration: 0.1,
            ease: 'back.out(2)',
          },
          0.56
        );
      }

      // 5. Retrieval pathway beam draws across to LLM Synthesis Engine (0.60 -> 0.80)
      tl.to(
        beam2,
        {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 0.20,
        },
        0.60
      );

      // 6. LLM Context Synthesis engine card forms and citation badge resolves (0.76 -> 1.00)
      if (llmEngineRef.current) {
        tl.to(
          llmEngineRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.16,
            ease: 'power2.out',
          },
          0.76
        );
      }
      if (citationBadgeRef.current) {
        tl.to(
          citationBadgeRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.12,
            ease: 'back.out(1.5)',
          },
          0.88
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full mb-6 p-4 rounded-2xl bg-surface-200/40 border border-sky-500/20 backdrop-blur-md"
    >
      <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-zinc-400">
        <span className="text-sky-300 font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          RAG RETRIEVAL &amp; SYNTHESIS PIPELINE &bull; SCROLL-DRAWN
        </span>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 hidden sm:inline">FAISS COSINE SEARCH // TOP-K CHUNKS</span>
          <span
            ref={progressPercentRef}
            className="px-1.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-300 font-bold"
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
          {/* Stage 1: Video Transcript Chunks */}
          <g>
            <g ref={(el) => (chunkRefs.current[0] = el)}>
              <rect x="30" y="25" width="80" height="22" rx="4" fill="rgba(30, 41, 59, 0.7)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />
              <text x="70" y="39" textAnchor="middle" className="text-[8px] font-mono fill-zinc-300 select-none">Chunk 01 [01:24]</text>
            </g>

            <g ref={(el) => (chunkRefs.current[1] = el)}>
              <rect x="30" y="55" width="80" height="22" rx="4" fill="rgba(14, 165, 233, 0.15)" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1" />
              <text x="70" y="69" textAnchor="middle" className="text-[8px] font-mono fill-sky-200 font-bold select-none">Chunk 02 [03:10] ★</text>
            </g>

            <g ref={(el) => (chunkRefs.current[2] = el)}>
              <rect x="30" y="85" width="80" height="22" rx="4" fill="rgba(30, 41, 59, 0.7)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />
              <text x="70" y="99" textAnchor="middle" className="text-[8px] font-mono fill-zinc-300 select-none">Chunk 03 [07:45]</text>
            </g>
          </g>

          {/* Path from Chunks to FAISS Embeddings (Scroll-Drawn) */}
          <path
            ref={beam1Ref}
            d="M 110 66 L 190 66"
            stroke="url(#sky-beam-1)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Stage 2: FAISS Vector Space */}
          <g>
            <circle
              ref={faissCircleRef}
              cx="230"
              cy="66"
              r="32"
              fill="rgba(15, 23, 42, 0.85)"
              stroke="rgba(56, 189, 248, 0.6)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <g ref={faissContentRef}>
              <text x="230" y="58" textAnchor="middle" className="text-[8px] font-mono fill-sky-300 font-bold select-none">FAISS</text>
              <text x="230" y="68" textAnchor="middle" className="text-[7px] font-mono fill-zinc-400 select-none">VECTOR DB</text>
              <text x="230" y="78" textAnchor="middle" className="text-[7px] font-mono fill-zinc-500 select-none">all-MiniLM</text>

              {/* Embedded points inside cluster */}
              <circle cx="215" cy="55" r="2" fill="#38bdf8" />
              <circle cx="225" cy="78" r="2" fill="#38bdf8" />
              <circle cx="240" cy="72" r="2" fill="#38bdf8" />
            </g>
            {/* Matched target point (amber) */}
            <circle ref={matchedDotRef} cx="245" cy="62" r="3.5" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1" />
          </g>

          {/* User Query Injection from Top */}
          <g>
            <g ref={queryBoxRef}>
              <rect x="185" y="6" width="90" height="18" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="rgba(245, 158, 11, 0.6)" strokeWidth="1" />
              <text x="230" y="18" textAnchor="middle" className="text-[8px] font-mono fill-amber-300 font-medium select-none">User Query Vector</text>
            </g>
            <path
              ref={queryArrowRef}
              d="M 230 24 L 230 34"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          </g>

          {/* Retrieval Pathway Beam to Synthesis Core (Scroll-Drawn) */}
          <path
            ref={beam2Ref}
            d="M 262 66 C 300 66, 330 66, 370 66"
            stroke="url(#amber-sky-beam)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Stage 3: LLM Context Synthesis (Gemini API) */}
          <g ref={llmEngineRef}>
            <rect x="370" y="32" width="170" height="68" rx="6" fill="rgba(15, 23, 42, 0.95)" stroke="rgba(245, 158, 11, 0.45)" strokeWidth="1" />
            <text x="382" y="48" className="text-[8px] font-mono fill-amber-300 font-bold select-none">LLM Synthesis Engine</text>
            <text x="382" y="62" className="text-[7.5px] font-mono fill-zinc-300 select-none">&quot;Backpropagation updates weights...</text>
            <text x="382" y="74" className="text-[7.5px] font-mono fill-zinc-300 select-none">via gradient descent.&quot;</text>
            
            <g ref={citationBadgeRef}>
              <rect x="382" y="80" width="78" height="14" rx="3" fill="rgba(56, 189, 248, 0.25)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1" />
              <text x="421" y="90" textAnchor="middle" className="text-[7px] font-mono fill-sky-200 font-semibold select-none">▶ Citation [03:10]</text>
            </g>
          </g>

          {/* Gradients */}
          <defs>
            <linearGradient id="sky-beam-1" x1="110" y1="66" x2="190" y2="66" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="amber-sky-beam" x1="262" y1="66" x2="370" y2="66" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f59e0b" />
              <stop offset="0.5" stopColor="#38bdf8" />
              <stop offset="1" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
