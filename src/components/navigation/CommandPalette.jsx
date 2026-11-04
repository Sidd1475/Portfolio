'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Command,
  FileText,
  Layers,
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Check,
  Sparkles,
  Cpu,
  Brain,
  X,
  Compass,
} from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { getAllPublicProjects } from '@/lib/projects';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const projects = getAllPublicProjects();

  // Listen for Global Hotkey (Cmd+K / Ctrl+K) & Custom Event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Compile searchable entries
  const allItems = [
    // --- Projects ---
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      type: 'Systems & Case Studies',
      title: p.title,
      subtitle: p.subtitle,
      keywords: [...p.technologies, ...(p.categories || []), p.category],
      icon: Cpu,
      action: () => {
        setIsOpen(false);
        router.push(`/projects/${p.id}`);
      },
    })),
    {
      id: 'project-archive',
      type: 'Systems & Case Studies',
      title: 'Full Project Archive',
      subtitle: `Browse all ${projects.length} engineered research systems`,
      keywords: ['archive', 'all', 'systems', 'projects'],
      icon: Layers,
      action: () => {
        setIsOpen(false);
        router.push('/projects');
      },
    },

    // --- Navigation ---
    {
      id: 'nav-about',
      type: 'Navigation',
      title: 'About Siddharth',
      subtitle: 'Engineering narrative & architectural principles',
      keywords: ['about', 'bio', 'experience', 'values'],
      icon: Compass,
      action: () => {
        setIsOpen(false);
        router.push('/#about');
      },
    },
    {
      id: 'nav-work',
      type: 'Navigation',
      title: 'Selected Work',
      subtitle: 'Flagship production AI architectures',
      keywords: ['work', 'featured', 'portfolio', 'projects'],
      icon: Layers,
      action: () => {
        setIsOpen(false);
        router.push('/#work');
      },
    },
    {
      id: 'nav-skills',
      type: 'Navigation',
      title: 'Skills & Stack',
      subtitle: 'LangGraph, RAG, FastAPI, Scikit-learn, Next.js',
      keywords: ['skills', 'technologies', 'tools', 'stack', 'python', 'fastapi'],
      icon: Brain,
      action: () => {
        setIsOpen(false);
        router.push('/#skills');
      },
    },
    {
      id: 'nav-journey',
      type: 'Navigation',
      title: 'Academic Journey',
      subtitle: 'MAIT Computer Science (CGPA 8.98) & Samsung Campus',
      keywords: ['journey', 'education', 'mait', 'samsung', 'certifications'],
      icon: Sparkles,
      action: () => {
        setIsOpen(false);
        router.push('/#journey');
      },
    },
    {
      id: 'nav-contact',
      type: 'Navigation',
      title: 'Contact & Inquiries',
      subtitle: 'Direct messaging & communications',
      keywords: ['contact', 'email', 'message', 'hire', 'collaborate'],
      icon: Mail,
      action: () => {
        setIsOpen(false);
        router.push('/#contact');
      },
    },

    // --- Actions ---
    {
      id: 'action-resume',
      type: 'Actions & Socials',
      title: 'Download Resume (PDF)',
      subtitle: 'Verified engineering resume of Siddharth Mishra',
      keywords: ['resume', 'cv', 'download', 'pdf'],
      icon: FileText,
      action: () => {
        setIsOpen(false);
        const link = document.createElement('a');
        link.href = siteConfig.resume || '/Siddharth_Mishra_Resume.pdf';
        link.download = 'Siddharth_Mishra_Resume.pdf';
        link.click();
      },
    },
    {
      id: 'action-copy-email',
      type: 'Actions & Socials',
      title: copiedEmail ? 'Email Copied to Clipboard!' : 'Copy Email Address',
      subtitle: siteConfig.email,
      keywords: ['email', 'copy', 'mail'],
      icon: copiedEmail ? Check : Mail,
      action: () => {
        navigator.clipboard.writeText(siteConfig.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      },
    },
    {
      id: 'action-github',
      type: 'Actions & Socials',
      title: 'View GitHub Profile',
      subtitle: 'github.com/Sidd1475',
      keywords: ['github', 'code', 'repos'],
      icon: Github,
      action: () => {
        setIsOpen(false);
        window.open(siteConfig.github, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'action-linkedin',
      type: 'Actions & Socials',
      title: 'View LinkedIn Profile',
      subtitle: 'linkedin.com/in/siddharth-mishra-a5250927a',
      keywords: ['linkedin', 'profile', 'network'],
      icon: Linkedin,
      action: () => {
        setIsOpen(false);
        window.open(siteConfig.linkedin, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'action-sukoon-live',
      type: 'Actions & Socials',
      title: 'Launch Sukoon AI (Live Production)',
      subtitle: 'sukoon-ai.vercel.app',
      keywords: ['sukoon', 'live', 'app', 'vercel', 'mental health'],
      icon: ExternalLink,
      action: () => {
        setIsOpen(false);
        window.open('https://sukoon-ai.vercel.app/', '_blank', 'noopener,noreferrer');
      },
    },
  ];

  // Filter items based on user search query
  const filteredItems = allItems.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      (item.keywords && item.keywords.some((k) => k.toLowerCase().includes(q)))
    );
  });

  // Handle Keyboard Navigation within results
  const handleKeyNavigation = (e) => {
    if (filteredItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredItems[selectedIndex];
      if (selected) selected.action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
          />

          {/* Palette Dialog Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.16 }}
            className="w-full max-w-2xl rounded-2xl glass-panel bg-surface-200/95 border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden relative z-10 flex flex-col max-h-[75vh]"
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-white/[0.08] flex items-center gap-3 relative">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyNavigation}
                placeholder="Search systems, skills, case studies, or actions..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none font-sans"
              />
              {query ? (
                <button
                  onClick={() => setQuery('')}
                  className="text-zinc-400 hover:text-white p-1 rounded-md"
                  aria-label="Clear query"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="px-2 py-0.5 rounded bg-surface-100 border border-white/10 text-[10px] font-mono text-zinc-400">
                  ESC
                </kbd>
              )}
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="overflow-y-auto divide-y divide-white/[0.04] p-2 space-y-1"
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => {
                  const ItemIcon = item.icon;
                  const isSelected = selectedIndex === idx;

                  return (
                    <div
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-cyan-500/15 border border-cyan-500/30 text-white'
                          : 'hover:bg-white/[0.04] border border-transparent text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30'
                              : 'bg-surface-100 text-zinc-400 border border-white/[0.06]'
                          }`}
                        >
                          <ItemIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-semibold truncate block">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-surface-100 text-zinc-400 border border-white/[0.05] hidden sm:inline">
                              {item.type}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-zinc-400 truncate block">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {isSelected && (
                          <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-300">
                            <span>Open</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center">
                  <p className="text-xs font-mono text-zinc-400 mb-1">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-[11px] text-zinc-500 font-mono">
                    Try searching for &ldquo;LangGraph&rdquo;, &ldquo;Resume&rdquo;, or &ldquo;Sukoon&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Footer Quick Cheatsheet */}
            <div className="p-3 border-t border-white/[0.08] bg-surface-300/60 flex items-center justify-between text-[11px] font-mono text-zinc-400 px-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-100 border border-white/10 text-[10px]">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-100 border border-white/10 text-[10px]">
                    ↓
                  </kbd>{' '}
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-100 border border-white/10 text-[10px]">
                    ↵
                  </kbd>{' '}
                  Select
                </span>
              </div>
              <span className="text-cyan-300 hidden sm:inline">
                Siddharth Mishra &bull; AI Portfolio
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

