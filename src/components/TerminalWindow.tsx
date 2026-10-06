import React from 'react';

interface TerminalWindowProps {
  title?: string;
  path?: string;
  children: React.ReactNode;
  className?: string;
  badge?: string;
  badgeColor?: 'green' | 'amber' | 'cyan';
  actions?: React.ReactNode;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = 'airil@portfolio',
  path = '~',
  children,
  className = '',
  badge,
  badgeColor = 'green',
  actions,
}) => {
  const badgeStyles = {
    green: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/25',
    amber: 'border-amber-500/40 text-amber-400 bg-amber-950/25',
    cyan: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/25',
  };

  return (
    <div
      className={`border rounded-xl overflow-hidden shadow-2xl transition-all duration-200 ${className}`}
      style={{
        backgroundColor: 'var(--bg-panel)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Window Chrome Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b font-mono select-none"
        style={{
          backgroundColor: 'var(--bg-panel-header)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="flex items-center gap-2.5">
          {/* Retro Window Control Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500/80 inline-block border border-rose-600/50" />
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80 inline-block border border-amber-600/50" />
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/50" />
          </div>
          
          <div className="ml-2.5 font-mono text-xs sm:text-sm font-semibold truncate flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent-green)' }}>{title}</span>
            <span>:</span>
            <span style={{ color: 'var(--accent-cyan)' }}>{path}</span>
            <span style={{ color: 'var(--accent-amber)' }}>$</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {badge && (
            <span className={`text-[11px] sm:text-xs uppercase font-mono px-2.5 py-0.5 rounded border tracking-wide font-bold ${badgeStyles[badgeColor]}`}>
              {badge}
            </span>
          )}
          {actions}
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="p-5 sm:p-7 font-mono text-sm sm:text-base leading-relaxed relative">
        {children}
      </div>
    </div>
  );
};
