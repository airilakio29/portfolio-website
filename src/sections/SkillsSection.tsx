import React from 'react';
import { TerminalWindow } from '../components/TerminalWindow';
import { SKILL_CATEGORIES, PERSONAL_INFO } from '../data/content';
import { Terminal, Code2, Cloud, Cpu, Layout, BookOpen } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      case 'cloud':
        return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'layout':
        return <Layout className="w-5 h-5 text-emerald-400" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-amber-400" />;
      default:
        return <Terminal className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-12 sm:py-16 scroll-mt-28">
      <div className="w-full max-w-6xl mx-auto space-y-4">
        {/* Section Header */}
        <div className="flex items-center gap-2 font-mono text-sm sm:text-base">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span style={{ color: 'var(--text-muted)' }}>02.</span>
          <span className="font-bold text-white uppercase tracking-wider">SKILLS & TECHNOLOGIES</span>
        </div>

        <TerminalWindow
          title="airil@portfolio"
          path="~/skills"
          badge="ls -la skills/"
          badgeColor="green"
        >
          <div className="space-y-6">
            {/* Command Header */}
            <div className="flex items-center justify-between pb-3 border-b font-mono text-sm sm:text-base" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-2 font-semibold" style={{ color: 'var(--accent-green)' }}>
                <span>$ ls -la skills/ --group-directories-first</span>
              </div>
              <span className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>total {SKILL_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)} items</span>
            </div>

            {/* Grouped Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SKILL_CATEGORIES.map((cat) => (
                <div
                  key={cat.category}
                  className="p-4 sm:p-5 rounded-lg border transition-all duration-150 hover:border-emerald-500/40"
                  style={{
                    backgroundColor: 'var(--code-bg)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-3.5 font-mono text-sm sm:text-base font-bold">
                    {getCategoryIcon(cat.icon)}
                    <span className="text-white uppercase tracking-wide">{cat.category}</span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded text-xs sm:text-sm font-mono border font-medium transition-transform hover:scale-105"
                        style={{
                          backgroundColor: 'var(--bg-panel)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <span className="text-emerald-400 mr-1.5">#</span>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Currently Learning Banner */}
            <div
              className="p-4 sm:p-5 rounded-lg border font-mono text-sm sm:text-base flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
              style={{
                backgroundColor: 'rgba(255, 176, 0, 0.06)',
                borderColor: 'rgba(255, 176, 0, 0.35)',
              }}
            >
              <div className="flex items-start sm:items-center gap-3">
                <BookOpen className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-xs sm:text-sm block sm:inline sm:mr-2">
                    [CURRENTLY LEARNING]:
                  </span>
                  <span className="text-white font-medium">{PERSONAL_INFO.currentlyLearning}</span>
                </div>
              </div>

              <span className="px-3 py-1 rounded text-xs font-bold border border-amber-400/50 text-amber-300 font-mono inline-block w-fit">
                IN PROGRESS
              </span>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
};
