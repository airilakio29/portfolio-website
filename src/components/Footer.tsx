import React from 'react';
import { PERSONAL_INFO } from '../data/content';
import { ArrowUp, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="border-t py-8 mt-16 font-mono text-xs"
      style={{
        backgroundColor: 'var(--code-bg)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Prompt Exit */}
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--accent-green)' }}>airil@portfolio:~$</span>
            <span className="text-white font-semibold">exit 0</span>
            <span className="text-emerald-400 animate-cursor">_</span>
          </div>

          {/* Jump to Top Button */}
          <button
            onClick={scrollToTop}
            className="btn-cyber-interactive flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs cursor-pointer select-none"
            style={{
              backgroundColor: 'var(--bg-panel)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
            }}
          >
            <span>[ RETURN TO TOP ]</span>
            <ArrowUp className="w-3 h-3 text-emerald-400" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t text-[11px]" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Designed & Built with React, TypeScript & Tailwind CSS.
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Deployed on Vercel Edge • Zero 3D bloat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
