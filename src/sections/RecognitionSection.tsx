import React from 'react';
import { TerminalWindow } from '../components/TerminalWindow';
import { RECOGNITIONS } from '../data/content';
import { GitBranch, Terminal, Calendar } from 'lucide-react';

export const RecognitionSection: React.FC = () => {
  return (
    <section id="recognition" className="py-12 sm:py-16 scroll-mt-28">
      <div className="w-full max-w-6xl mx-auto space-y-4">
        {/* Section Header */}
        <div className="flex items-center gap-2 font-mono text-sm sm:text-base">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span style={{ color: 'var(--text-muted)' }}>04.</span>
          <span className="font-bold text-white uppercase tracking-wider">RECOGNITION & TRACK RECORD</span>
        </div>

        <TerminalWindow
          title="airil@portfolio"
          path="~/recognition"
          badge="git log --graph"
          badgeColor="amber"
        >
          <div className="space-y-6">
            {/* Git Command Header */}
            <div className="flex items-center justify-between pb-3 border-b font-mono text-sm sm:text-base" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-2 font-semibold" style={{ color: 'var(--accent-amber)' }}>
                <GitBranch className="w-4 h-4" />
                <span>$ git log --graph --pretty=format:"%h %d %s (%cr)"</span>
              </div>
              <span className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>HEAD -&gt; main</span>
            </div>

            {/* Git Log Timeline Entries */}
            <div className="space-y-6 relative pl-5 sm:pl-7 border-l-2 ml-2 sm:ml-3" style={{ borderColor: 'var(--border-color)' }}>
              {RECOGNITIONS.map((rec, index) => {
                const isChampion = rec.category === 'Hackathon Win';

                return (
                  <div key={rec.title} className="relative group">
                    {/* Git Commit Node */}
                    <div
                      className="absolute -left-[27px] sm:-left-[35px] top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-125"
                      style={{
                        backgroundColor: isChampion ? 'var(--accent-amber)' : 'var(--bg-panel)',
                        borderColor: isChampion ? '#ffffff' : 'var(--accent-green)',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
                    </div>

                    <div
                      className="p-4 sm:p-5 rounded-lg border font-mono transition-all duration-150 hover:border-emerald-500/40"
                      style={{
                        backgroundColor: 'var(--code-bg)',
                        borderColor: 'var(--border-color)',
                      }}
                    >
                      {/* Commit Meta Line */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-amber-400">commit c{index + 1}a8{index * 3 + 2}f</span>
                          <span className="px-2.5 py-0.5 rounded text-[11px] uppercase font-bold border tracking-wider"
                            style={{
                              backgroundColor: isChampion ? 'rgba(255, 176, 0, 0.15)' : 'rgba(0, 255, 102, 0.1)',
                              borderColor: isChampion ? 'rgba(255, 176, 0, 0.4)' : 'rgba(0, 255, 102, 0.3)',
                              color: isChampion ? 'var(--accent-amber)' : 'var(--accent-green)',
                            }}
                          >
                            {rec.statusBadge}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{rec.year}</span>
                        </div>
                      </div>

                      {/* Title & Event */}
                      <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                        {rec.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-mono mb-2.5" style={{ color: 'var(--accent-cyan)' }}>
                        @{rec.event}
                      </p>

                      {/* Narrative */}
                      <p className="text-sm sm:text-base font-sans leading-relaxed text-gray-200">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Git Log summary commit footer */}
            <div
              className="p-3.5 rounded-lg border font-mono text-xs sm:text-sm text-center"
              style={{
                backgroundColor: 'var(--bg-panel-header)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
              }}
            >
              <span>5 commits verified • 1 Time Hackathon Champion • Finalist @ Google GDG UTM & PuO • 2x Project Director • 2x Dean's List (2026)</span>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
};
