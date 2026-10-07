import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../data/content';
import { TerminalWindow } from '../components/TerminalWindow';
import { GithubIcon } from '../components/Icons';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Trophy,
  CheckCircle,
  AlertCircle,
  Layers,
  Sparkles,
  Calendar,
  User,
  Image as ImageIcon,
  Cpu,
} from 'lucide-react';

export const CaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[currentIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (project) {
      document.title = `${project.title} Case Study | Airil Asyraff Zulkifli`;
    }
  }, [slug, project]);

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 font-mono text-center space-y-4">
        <div className="text-rose-400 text-3xl font-bold">ERROR 404: REPOSITORY NOT FOUND</div>
        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
          The requested project case study "{slug}" does not exist in memory.
        </p>
        <Link
          to="/"
          className="btn-cyber-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm border font-bold select-none cursor-pointer"
          style={{
            backgroundColor: 'var(--accent-green)',
            color: '#05110a',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO ROOT DIRECTORY</span>
        </Link>
      </div>
    );
  }

  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 font-mono">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between text-sm sm:text-base pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <Link
          to="/#projects"
          className="btn-cyber-interactive inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border font-semibold select-none cursor-pointer"
          style={{
            backgroundColor: 'var(--code-bg)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-secondary)',
          }}
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>cd ../ (Back to Terminal Overview)</span>
        </Link>

        <span className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--accent-cyan)' }}>
          PROJECT {currentIndex + 1} OF {PROJECTS.length}
        </span>
      </div>

      {/* Hero Window */}
      <TerminalWindow
        title={`case_study_${project.slug}.md`}
        path={`~/projects/${project.slug}`}
        badge={project.badge}
        badgeColor={project.id === 'kirokash' ? 'amber' : 'green'}
      >
        <div className="space-y-6">
          {/* Header & Badges */}
          <div className="space-y-2.5 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                {project.title}
              </h1>

              {project.id === 'kirokash' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs sm:text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>1ST PLACE HACKATHON WINNER</span>
                </span>
              )}

              {project.id === 'terra-guard' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs sm:text-sm font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>HACKATHON FINALIST</span>
                </span>
              )}
            </div>

            <p className="text-base sm:text-xl font-medium" style={{ color: 'var(--accent-green)' }}>
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-5 pt-2 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Timeline: {project.period}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                <span>Role: {project.role}</span>
              </div>
            </div>
          </div>

          {/* Quick External Links - All light up on hover */}
          <div className="flex flex-wrap gap-3.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold border cursor-pointer select-none"
                style={{
                  backgroundColor: 'var(--accent-green)',
                  borderColor: 'var(--accent-green)',
                  color: '#06130b',
                }}
              >
                <span>Launch Live Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-interactive inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border cursor-pointer select-none"
              style={{
                backgroundColor: 'var(--code-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              <GithubIcon className="w-4 h-4" />
              <span>Inspect Source Repository</span>
            </a>
          </div>

          {/* Technology Badges */}
          <div className="space-y-2 pt-2">
            <span className="text-xs sm:text-sm uppercase font-bold block" style={{ color: 'var(--text-secondary)' }}>
              Engineered With:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded text-xs sm:text-sm border font-medium"
                  style={{
                    backgroundColor: 'var(--code-bg)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TerminalWindow>

      {/* Screenshot & Visual Showcase */}
      {project.previewImage ? (
        <div
          className="rounded-xl border overflow-hidden font-mono shadow-xl relative group"
          style={{
            backgroundColor: 'var(--code-bg)',
            borderColor: 'var(--border-color)',
          }}
        >
          {/* Terminal / Browser Chrome Header */}
          <div
            className="px-4 py-2.5 border-b flex items-center justify-between text-xs"
            style={{
              backgroundColor: 'var(--bg-panel-header)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-gray-300 font-semibold text-xs truncate max-w-xs sm:max-w-md">
                Production Capture // {project.title} Interface
              </span>
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Launch Live Web</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Screenshot Display Frame */}
          <div className="relative aspect-[16/9] sm:aspect-[2.05/1] w-full overflow-hidden bg-black/90 flex items-center justify-center">
            <img
              src={project.previewImage}
              alt={project.previewAlt || `${project.title} Production Interface`}
              className="w-full h-full object-contain sm:object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-4 sm:p-5">
              <div>
                <span className="inline-block px-2.5 py-1 rounded text-xs font-bold border border-emerald-500/40 text-emerald-300 bg-emerald-950/80 mb-1.5 font-mono">
                  ● VERIFIED LIVE SCREENSHOT
                </span>
                <p className="text-xs sm:text-sm text-gray-300 font-sans hidden sm:block">
                  {project.previewAlt}
                </p>
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-interactive inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold border cursor-pointer select-none text-black bg-emerald-400 hover:bg-emerald-300 border-emerald-400"
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="rounded-xl border p-6 sm:p-8 font-mono text-center space-y-3.5"
          style={{
            backgroundColor: 'var(--code-bg)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center border border-dashed border-emerald-500/50">
            <ImageIcon className="w-7 h-7 text-emerald-400" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-base font-bold text-white uppercase tracking-wider">
              UI Showcase & Screenshot Slot
            </h4>
            <p className="text-sm font-sans max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              High-fidelity designed mockup frame active. Drop high-resolution application screenshots into this container when ready for live visual demos.
            </p>
          </div>
          <div className="inline-block px-3.5 py-1.5 rounded text-xs font-bold border border-emerald-500/40 text-emerald-400 bg-emerald-950/25">
            STATUS: RESERVED FOR PRODUCTION MEDIA
          </div>
        </div>
      )}

      {/* Section 1: The Problem & The Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="p-5 sm:p-6 rounded-xl border space-y-3"
          style={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--accent-amber)' }}>
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>01. THE PROBLEM</span>
          </div>
          <p className="text-sm sm:text-base font-sans leading-relaxed text-gray-200">
            {project.problem}
          </p>
        </div>

        <div
          className="p-5 sm:p-6 rounded-xl border space-y-3"
          style={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--accent-green)' }}>
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>02. EXECUTIVE OVERVIEW</span>
          </div>
          <p className="text-sm sm:text-base font-sans leading-relaxed text-gray-200">
            {project.overview}
          </p>
        </div>
      </div>

      {/* Section 2: Architecture & Evolutionary Journey */}
      <div
        className="p-6 sm:p-8 rounded-xl border space-y-4"
        style={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-2 text-sm sm:text-base font-bold" style={{ color: 'var(--accent-cyan)' }}>
          <Layers className="w-5 h-5 flex-shrink-0" />
          <span>03. ARCHITECTURAL FOUNDATION & SYSTEM EVOLUTION</span>
        </div>

        <div className="space-y-3.5 pt-1">
          {project.architectureDetails.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm sm:text-base">
              <span className="text-emerald-400 font-bold select-none">&gt;&gt;</span>
              <span className="font-sans leading-relaxed text-gray-200">{detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Key Features Matrix */}
      <div
        className="p-6 sm:p-8 rounded-xl border space-y-4"
        style={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-2 text-sm sm:text-base font-bold" style={{ color: 'var(--accent-green)' }}>
          <Cpu className="w-5 h-5 flex-shrink-0" />
          <span>04. KEY FEATURE IMPLEMENTATIONS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {project.keyFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border space-y-1.5"
              style={{ backgroundColor: 'var(--code-bg)', borderColor: 'var(--border-color)' }}
            >
              <h4 className="text-sm font-mono font-bold text-white">
                [{idx + 1}] {feat.title}
              </h4>
              <p className="text-sm font-sans text-gray-300 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Engineering Challenges & Learnings */}
      <div
        className="p-6 sm:p-8 rounded-xl border space-y-4"
        style={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-2 text-sm sm:text-base font-bold" style={{ color: 'var(--accent-amber)' }}>
          <Layers className="w-5 h-5 flex-shrink-0" />
          <span>05. CHALLENGES & KEY LEARNINGS</span>
        </div>

        <div className="space-y-4 pt-1">
          {project.challengesAndLearnings.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2">
                <span className="text-amber-400"># CHALLENGE_{idx + 1}:</span>
                <span>{item.title}</span>
              </div>
              <p className="text-sm sm:text-base font-sans text-gray-200 leading-relaxed pl-4 border-l-2 border-amber-500/40">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Real Outcomes & Milestones */}
      <div
        className="p-6 sm:p-8 rounded-xl border space-y-4"
        style={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-2 text-sm sm:text-base font-bold" style={{ color: 'var(--accent-green)' }}>
          <Trophy className="w-5 h-5 flex-shrink-0" />
          <span>06. VERIFIED OUTCOMES & IMPACT</span>
        </div>

        <div className="space-y-3 pt-1">
          {project.outcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm sm:text-base">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="font-sans text-gray-200 leading-relaxed">{outcome}</span>
            </div>
          ))}
        </div>

        {project.futureMilestones && (
          <div className="pt-4 border-t mt-4 space-y-2.5" style={{ borderColor: 'var(--border-color)' }}>
            <span className="text-xs sm:text-sm uppercase font-bold block" style={{ color: 'var(--accent-cyan)' }}>
              Next Architectural Horizons:
            </span>
            <div className="space-y-2">
              {project.futureMilestones.map((m, idx) => (
                <div key={idx} className="text-xs sm:text-sm text-gray-300 flex items-center gap-2 font-mono">
                  <span className="text-cyan-400">[-]</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Previous / Next Project Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.slug}`}
            className="btn-cyber-interactive flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs sm:text-sm font-mono cursor-pointer select-none"
            style={{
              backgroundColor: 'var(--code-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <span className="text-[11px] block" style={{ color: 'var(--text-muted)' }}>PREVIOUS PROJECT</span>
              <span className="font-bold">{prevProject.title}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            to={`/projects/${nextProject.slug}`}
            className="btn-cyber-interactive flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs sm:text-sm font-mono cursor-pointer select-none"
            style={{
              backgroundColor: 'var(--code-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          >
            <div className="text-right">
              <span className="text-[11px] block" style={{ color: 'var(--text-muted)' }}>NEXT PROJECT</span>
              <span className="font-bold">{nextProject.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
};
