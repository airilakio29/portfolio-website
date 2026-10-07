import React from 'react';
import { TerminalWindow } from '../components/TerminalWindow';
import { PERSONAL_INFO } from '../data/content';
import { GraduationCap, MapPin, Target, Terminal, Shield } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-16 scroll-mt-28">
      <div className="w-full max-w-6xl mx-auto space-y-4">
        {/* Section Header */}
        <div className="flex items-center gap-2 font-mono text-sm sm:text-base">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span style={{ color: 'var(--text-muted)' }}>01.</span>
          <span className="font-bold text-white uppercase tracking-wider">ABOUT THE DEVELOPER</span>
        </div>

        <TerminalWindow
          title="airil@portfolio"
          path="~/bio"
          badge="cat about.txt"
          badgeColor="cyan"
        >
          <div className="space-y-6">
            {/* Command execute simulation */}
            <div className="flex items-center gap-2 font-mono text-sm sm:text-base pb-3 border-b" style={{ borderColor: 'var(--border-color)', color: 'var(--accent-cyan)' }}>
              <span>$ cat about.txt | head -n 30</span>
            </div>

            {/* Narrative text */}
            <p className="text-base sm:text-lg leading-relaxed text-gray-200 font-sans">
              {PERSONAL_INFO.bio}
            </p>

            {/* Key Fact Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 font-mono text-sm sm:text-base">
              <div
                className="p-4 sm:p-5 rounded-lg border space-y-2.5"
                style={{ backgroundColor: 'var(--code-bg)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold" style={{ color: 'var(--accent-green)' }}>
                  <GraduationCap className="w-5 h-5 flex-shrink-0" />
                  <span>EDUCATION & ACADEMICS</span>
                </div>
                <div className="space-y-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <p className="font-bold text-white text-base">{PERSONAL_INFO.education.institution}</p>
                  <p>Degree: Bachelor of {PERSONAL_INFO.education.major}</p>
                  <p>Standing: {PERSONAL_INFO.education.year} (Graduation: {PERSONAL_INFO.education.expectedGraduation})</p>
                  <p className="text-amber-400 font-semibold">{PERSONAL_INFO.education.honors}</p>
                </div>
              </div>

              <div
                className="p-4 sm:p-5 rounded-lg border space-y-2.5"
                style={{ backgroundColor: 'var(--code-bg)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold" style={{ color: 'var(--accent-amber)' }}>
                  <Target className="w-5 h-5 flex-shrink-0" />
                  <span>PRIMARY OBJECTIVE</span>
                </div>
                <div className="space-y-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <p className="font-bold text-white text-base">Internship Placement (September 2027)</p>
                  <p>{PERSONAL_INFO.goal}</p>
                  <div className="pt-2 flex items-center gap-2 text-sm" style={{ color: 'var(--accent-cyan)' }}>
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>Based in: {PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal verification footer note */}
            <div
              className="p-3.5 sm:p-4 rounded-lg border text-xs sm:text-sm font-mono flex items-start gap-3"
              style={{ backgroundColor: 'var(--bg-panel-header)', borderColor: 'var(--border-color)' }}
            >
              <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div style={{ color: 'var(--text-secondary)' }}>
                <span className="font-bold text-white">INTEGRITY POLICY:</span> Every milestone, hackathon metric, and code repository listed here corresponds to real, verified work under github.com/airilakio29. No unearned claims or unearned badges.
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
};
