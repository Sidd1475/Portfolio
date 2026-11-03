'use client';

import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';
import {
  ScrollRevealHeading,
  ScrollRevealHeadingMultiline,
  ScrollRevealBadge,
  ScrollRevealParagraph,
} from '@/components/ui/ScrollReveal';
import { triggerBackgroundHover, clearBackgroundHover } from '@/lib/background-interaction';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('idle');

  const handleLinkHover = (id, color, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerBackgroundHover(id, color, rect);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Direct mailto generation for authentic, transparent communication without mock backends
    setFormStatus('preparing');
    const mailtoSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name} via Portfolio`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    setTimeout(() => {
      window.location.href = `mailto:${siteConfig.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
      setFormStatus('ready');
    }, 400);
  };

  return (
    <section id="contact" className="scroll-mt-28 relative py-24 border-t border-white/[0.08] overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-indigo-900/15 via-cyan-900/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Call to Action with Progressive Text Reveal */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollRevealBadge className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>LET&apos;S CONNECT</span>
            </ScrollRevealBadge>

            <ScrollRevealHeadingMultiline
              lines={['Have something', 'worth building?']}
              className="section-statement text-white mb-5"
            />

            <ScrollRevealParagraph className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-lg">
              I&apos;m interested in conversations around AI engineering, Generative AI, machine learning, and building useful software systems.
            </ScrollRevealParagraph>

            {/* Direct Connect Buttons */}
            <div className="pt-4 space-y-3">
              <Link
                href={`mailto:${siteConfig.email}`}
                onMouseEnter={(e) => handleLinkHover('contact-mail', [34, 211, 238], e)}
                onMouseLeave={clearBackgroundHover}
                className="flex items-center justify-between p-4 rounded-xl glass-panel border border-white/[0.08] hover:border-cyan-500/40 text-zinc-200 hover:text-white transition-all group glow-box backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-200 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-400 block uppercase">Direct Email</span>
                    <span className="text-sm font-semibold">{siteConfig.email}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
              </Link>

              <Link
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => handleLinkHover('contact-linkedin', [139, 92, 246], e)}
                onMouseLeave={clearBackgroundHover}
                className="flex items-center justify-between p-4 rounded-xl glass-panel border border-white/[0.08] hover:border-indigo-500/40 text-zinc-200 hover:text-white transition-all group glow-box backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-200 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-400 block uppercase">LinkedIn Network</span>
                    <span className="text-sm font-semibold">linkedin.com/in/siddharth-mishra-a5250927a</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
              </Link>

              <Link
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => handleLinkHover('contact-github', [226, 232, 240], e)}
                onMouseLeave={clearBackgroundHover}
                className="flex items-center justify-between p-4 rounded-xl glass-panel border border-white/[0.08] hover:border-white/30 text-zinc-200 hover:text-white transition-all group glow-box backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-200 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:scale-105 transition-transform">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-400 block uppercase">GitHub Repositories</span>
                    <span className="text-sm font-semibold">github.com/Sidd1475</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Right Column: Direct Messaging Form with Glassmorphic Panel */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08] relative backdrop-blur-xl shadow-2xl">
              <h3 className="text-xl font-display font-semibold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-zinc-400 font-mono mb-6">
                All inquiries open a pre-filled client draft addressed directly to siddharth140705@gmail.com.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-zinc-300 mb-1.5">
                      YOUR NAME *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-200/80 border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-zinc-300 mb-1.5">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-200/80 border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-zinc-300 mb-1.5">
                    SUBJECT OR DOMAIN
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="AI Engineering, Architecture Discussion..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-200/80 border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-zinc-300 mb-1.5">
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, engineering question, or inquiry..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-200/80 border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'preparing'}
                  className="w-full py-3.5 px-6 rounded-xl font-medium text-sm text-zinc-950 bg-white hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {formStatus === 'preparing' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                      Preparing Email Client...
                    </span>
                  ) : formStatus === 'ready' ? (
                    <span className="flex items-center gap-2 text-emerald-900 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      Client Dispatched!
                    </span>
                  ) : (
                    <>
                      <span>Open Pre-filled Email</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
