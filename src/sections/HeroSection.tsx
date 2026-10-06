import React, { useState, useEffect } from 'react';
import { TerminalWindow } from '../components/TerminalWindow';
import { PixelAvatar } from '../components/PixelAvatar';
import { PERSONAL_INFO } from '../data/content';
import { ArrowDown, ExternalLink, MapPin, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [typedHeadline, setTypedHeadline] = useState('');
  const fullHeadline = PERSONAL_INFO.title;

  // Typing animation for headline
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullHeadline.length) {
        setTypedHeadline(fullHeadline.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [fullHeadline]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="py-8 sm:py-14 scroll-mt-28">
      <TerminalWindow
        title="airil@portfolio"
        path="~"
        badge="ONLINE"
        badgeColor="green"
        className="max-w-6xl mx-auto shadow-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-1">
          {/* Left Column: Developer Identity & Key Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="pl-4 sm:pl-5 border-l-2 space-y-3" style={{ borderColor: 'var(--accent-green)' }}>
              <div className="text-xs sm:text-sm font-mono tracking-widest uppercase" style={{ color: 'var(--accent-cyan)' }}>
                SYS.IDENTITY // DEV_PROFILE
              </div>

              <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-white">
                {PERSONAL_INFO.name}
              </h1>

              <div className="text-lg sm:text-2xl font-mono font-medium flex items-center gap-2" style={{ color: 'var(--accent-green)' }}>
                <span>{typedHeadline}</span>
                <span className="w-2.5 h-6 inline-block bg-emerald-400 animate-cursor" />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Universiti Teknologi PETRONAS (IT)</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div
                className="p-3 rounded-lg border font-mono text-center transition-all duration-200 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(255,176,0,0.3)] hover:-translate-y-1 select-none cursor-default"
                style={{ backgroundColor: 'var(--code-bg)', borderColor: 'var(--border-color)' }}
              >
                <div className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--accent-amber)' }}>1 Time</div>
                <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Hackathon Winner</div>
              </div>
              <div
                className="p-3 rounded-lg border font-mono text-center transition-all duration-200 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:-translate-y-1 select-none cursor-default"
                style={{ backgroundColor: 'var(--code-bg)', borderColor: 'var(--border-color)' }}
              >
                <div className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--accent-cyan)' }}>Finalist</div>
                <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>UTM & PuO Hackathons</div>
              </div>
              <div
                className="p-3 rounded-lg border font-mono text-center transition-all duration-200 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:-translate-y-1 select-none cursor-default"
                style={{ backgroundColor: 'var(--code-bg)', borderColor: 'var(--border-color)' }}
              >
                <div className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--accent-green)' }}>2x</div>
                <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Dean's List (2026)</div>
              </div>
              <div
                className="p-3 rounded-lg border font-mono text-center transition-all duration-200 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(255,176,0,0.3)] hover:-translate-y-1 select-none cursor-default"
                style={{ backgroundColor: 'var(--code-bg)', borderColor: 'var(--border-color)' }}
              >
                <div className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--accent-amber)' }}>2x</div>
                <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Project Director</div>
              </div>
            </div>

            {/* Call to Actions - Highly interactive, glowing buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-cyber-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-lg select-none"
                style={{
                  backgroundColor: 'var(--accent-green)',
                  color: '#07130c',
                }}
              >
                <span>./VIEW_PROJECTS.SH</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="btn-cyber-interactive inline-flex items-center gap-2 px-5 py-3 rounded-lg font-mono font-bold text-xs sm:text-sm uppercase tracking-wider border cursor-pointer select-none"
                style={{
                  backgroundColor: 'var(--code-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              >
                <span>./CONTACT_ME.SH</span>
              </button>

              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber-cyan inline-flex items-center gap-2 px-4 py-3 rounded-lg font-mono text-xs sm:text-sm font-semibold transition-all border cursor-pointer select-none"
                style={{
                  backgroundColor: 'var(--code-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--accent-cyan)',
                }}
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Pixelated Animated Portrait HUD */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[340px]">
              <PixelAvatar imageSrc="/airil-avatar.png" />
            </div>
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
};
