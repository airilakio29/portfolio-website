import React, { useState } from 'react';
import { Mail, Check, Copy, ShieldCheck, Eye } from 'lucide-react';
import { PERSONAL_INFO } from '../data/content';

export const RevealEmail: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="p-4 sm:p-5 border rounded-lg font-mono text-sm sm:text-base transition-all"
      style={{
        backgroundColor: 'var(--code-bg)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="flex items-center gap-2 mb-2.5 text-xs sm:text-sm" style={{ color: 'var(--accent-amber)' }}>
        <ShieldCheck className="w-4 h-4 flex-shrink-0" />
        <span className="font-bold tracking-wide">SPAM PROTECTION PROTOCOL:</span>
        <span style={{ color: 'var(--text-muted)' }}>Raw address obfuscated from web crawlers</span>
      </div>

      {!isRevealed ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            <Mail className="w-4 h-4 text-emerald-400" />
            <span className="tracking-widest">airil_••••••••@utp.edu.my</span>
          </div>

          <button
            onClick={handleReveal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-mono font-bold transition-all shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer hover:bg-emerald-950/20"
            style={{
              backgroundColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          >
            <Eye className="w-4 h-4" style={{ color: 'var(--accent-green)' }} />
            <span>[ REVEAL ADDRESS ]</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-2 font-mono text-base sm:text-lg hover:underline font-bold"
            style={{ color: 'var(--accent-green)' }}
            title="Send an email directly"
          >
            <Mail className="w-4 h-4" />
            <span>{PERSONAL_INFO.email}</span>
          </a>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs sm:text-sm font-mono transition-all border font-semibold cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-panel)',
                borderColor: copied ? 'var(--accent-green)' : 'var(--border-color)',
                color: copied ? 'var(--accent-green)' : 'var(--text-primary)',
              }}
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs sm:text-sm font-mono border font-semibold"
              style={{
                backgroundColor: 'var(--border-color)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              MAILTO &rarr;
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
