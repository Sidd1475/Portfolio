import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cpu } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full p-8 rounded-2xl glass-panel border border-white/[0.08] text-center">
        <div className="w-12 h-12 rounded-xl bg-surface-200 border border-white/10 flex items-center justify-center text-cyan-400 mx-auto mb-4">
          <Cpu className="w-6 h-6" />
        </div>
        <span className="text-xs font-mono text-cyan-300 block mb-1">ERROR // 404</span>
        <h1 className="text-2xl font-display font-bold text-white mb-2">
          Page Not Found
        </h1>
        <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-mono">
          The requested system route does not exist or has been relocated within the architecture.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono text-zinc-950 bg-white hover:bg-zinc-200 transition-colors font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
