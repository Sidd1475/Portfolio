'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, ArrowUpRight, Cpu } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-surface-300/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          
          {/* Identity */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-surface-100 border border-white/10 flex items-center justify-center text-cyan-400">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-semibold tracking-wider text-white">
                {siteConfig.name.toUpperCase()}
              </span>
            </div>
            <p className="text-xs font-mono text-zinc-400">
              AI Engineer &bull; Generative AI &bull; Agentic Workflows
            </p>
          </div>

          {/* Direct Verified Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-zinc-400">
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </Link>
            <Link
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </Link>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
            >
              <span>Email</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </Link>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1 rounded-full glass-pill hover:border-white/30 text-white transition-all ml-2"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Integrity */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} Siddharth Mishra. Built with Next.js App Router, Three.js &amp; Tailwind.
          </div>
          <div className="text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Documented &amp; Grounded via Authorized Resume</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
