'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Cpu, Layers, FileText } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { getAllPublicProjects } from '@/lib/projects';

const navItems = [
  { name: 'About', href: '/#about' },
  { name: 'Work', href: '/#work' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Journey', href: '/#journey' },
  { name: 'Contact', href: '/#contact' },
  { name: 'Archive', href: '/projects' },
];

export default function Navbar() {
  const allProjects = getAllPublicProjects();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full transition-colors"
          aria-label="Siddharth Mishra Homepage"
        >
          <div className="w-8 h-8 rounded-lg bg-surface-100 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:border-indigo-500/50 transition-colors">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wider text-zinc-100 group-hover:text-white transition-colors">
              SIDDHARTH MISHRA
            </span>
            <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
              AI ENGINEER
            </span>
          </div>
        </Link>

        {/* Center Pill Nav (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full glass-pill shadow-2xl">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
                item.name === 'Archive'
                  ? 'text-cyan-300 hover:text-white hover:bg-cyan-500/10'
                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Action & GitHub Link */}
        <div className="hidden sm:flex items-center gap-2.5">
          {siteConfig.resume && (
            <a
              href={siteConfig.resume}
              download="Siddharth_Mishra_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-emerald-300 hover:text-white glass-panel-subtle hover:border-emerald-500/40 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Resume</span>
            </a>
          )}
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-300 hover:text-white glass-panel-subtle hover:border-white/20 transition-all"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </Link>
          <Link
            href="/#contact"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200 transition-colors shadow-sm"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full glass-pill text-zinc-300 hover:text-white"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-4 top-20 p-5 rounded-2xl glass-pill bg-surface-200/95 border border-white/10 shadow-2xl z-50 flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm text-zinc-200 hover:text-cyan-400 hover:bg-white/[0.04] rounded-lg transition-colors font-medium flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  {item.name === 'Archive' && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {allProjects.length} Systems
                    </span>
                  )}
                </Link>
              ))}
              {siteConfig.resume && (
                <a
                  href={siteConfig.resume}
                  download="Siddharth_Mishra_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm text-emerald-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors font-medium flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Download Resume (PDF)</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                </a>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 text-xs font-mono text-zinc-300 hover:text-white rounded-lg bg-surface-100"
              >
                <span>github.com/Sidd1475</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200"
              >
                Let&apos;s connect
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
