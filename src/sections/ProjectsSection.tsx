import React from 'react';
import { Link } from 'react-router-dom';
import { TerminalWindow } from '../components/TerminalWindow';
import { PROJECTS, type Project } from '../data/content';
import { GithubIcon } from '../components/Icons';
import { ExternalLink, ArrowRight, Trophy, Terminal, Image as ImageIcon } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 scroll-mt-28">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between font-mono text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span style={{ color: 'var(--text-muted)' }}>03.</span>
            <span className="font-bold text-white uppercase tracking-wider">FEATURED REPOSITORIES & PROJECTS</span>
          </div>
          <span className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--accent-amber)' }}>
            $ ls -t projects/ (3 matched)
          </span>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const isFlagship = project.id === 'kirokash';

  return (
    <TerminalWindow
      title={`airil@dev:~/projects/${project.slug}`}
      path=""
      badge={project.badge}
      badgeColor={isFlagship ? 'amber' : index === 1 ? 'cyan' : 'green'}
      className={`transition-all duration-200 hover:border-emerald-500/50 ${
        isFlagship ? 'border-amber-500/30' : ''
      }`}
    >
      <div className="space-y-5">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white">
                {project.title}
              </h3>
              {isFlagship && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>1ST PLACE WINNER</span>
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base font-mono mt-1 font-medium" style={{ color: 'var(--accent-green)' }}>
              {project.tagline}
            </p>
          </div>

          <div className="text-xs sm:text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
            ROLE: <span className="text-white font-medium">{project.role}</span>
          </div>
        </div>

        {/* Project Summary */}
        <p className="text-sm sm:text-base font-sans leading-relaxed text-gray-200">
          {project.summary}
        </p>

        {/* Terminal Simulation Window Mockup + Placeholder Screenshot Slot */}
        <div
          className="rounded-lg border overflow-hidden font-mono text-xs sm:text-sm"
          style={{
            backgroundColor: 'var(--code-bg)',
            borderColor: 'var(--border-color)',
          }}
        >
          {/* Mockup Terminal Bar */}
          <div
            className="px-3.5 py-2 border-b flex items-center justify-between text-xs font-semibold"
            style={{
              backgroundColor: 'var(--bg-panel-header)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-emerald-400">$</span>
              <span>{project.terminalMockup.command}</span>
            </div>
            <span className="text-amber-400 text-[11px] uppercase font-bold">LIVE REPO TEST</span>
          </div>

          {/* Simulated Logs Output */}
          <div className="p-4 space-y-1.5" style={{ color: 'var(--text-secondary)' }}>
            {project.terminalMockup.outputLines.map((line, lIdx) => (
              <div key={lIdx} className="flex items-start gap-2.5">
                <span className="text-emerald-500 select-none font-bold">&gt;&gt;</span>
                <span className="leading-snug">{line}</span>
              </div>
            ))}
          </div>

          {/* Clearly marked Screenshot Drop Slot */}
          <div
            className="mx-3.5 mb-3.5 p-3.5 rounded-md border border-dashed flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-muted)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>
                <strong className="text-gray-200">UI Screenshot Slot:</strong> Designed terminal frame active. Ready for production screenshots.
              </span>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 font-semibold whitespace-nowrap">
              FRAME READY
            </span>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded text-xs sm:text-sm font-mono border font-medium"
              style={{
                backgroundColor: 'var(--code-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons & Links */}
        {/* Action Buttons & Links - All light up on hover */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber-interactive inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold border cursor-pointer select-none"
                style={{
                  backgroundColor: 'var(--code-bg)',
                  borderColor: 'var(--accent-green)',
                  color: 'var(--accent-green)',
                }}
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-interactive inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs sm:text-sm transition-all border font-medium cursor-pointer select-none"
              style={{
                backgroundColor: 'var(--code-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
              }}
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repo</span>
            </a>
          </div>

          <Link
            to={`/projects/${project.slug}`}
            className="btn-cyber-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer shadow-md select-none group"
            style={{
              backgroundColor: 'var(--accent-green)',
              color: '#07130c',
            }}
          >
            <span>Read Case Study</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </TerminalWindow>
  );
};
