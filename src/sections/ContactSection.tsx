import React, { useState } from 'react';
import { TerminalWindow } from '../components/TerminalWindow';
import { PERSONAL_INFO } from '../data/content';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { Terminal, Mail, Copy, Check, ExternalLink, MapPin, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 scroll-mt-28">
      <div className="w-full max-w-6xl mx-auto space-y-4">
        {/* Section Header */}
        <div className="flex items-center gap-2 font-mono text-sm sm:text-base">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span style={{ color: 'var(--text-muted)' }}>05.</span>
          <span className="font-bold text-white uppercase tracking-wider">CONTACT & CONNECT</span>
        </div>

        <TerminalWindow
          title="airil@portfolio"
          path="~/contact"
          badge="READY"
          badgeColor="green"
        >
          <div className="space-y-6">
            {/* Header intro */}
            <div className="border-b pb-3 font-mono text-sm sm:text-base flex flex-col sm:flex-row sm:items-center justify-between gap-2" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-2 font-bold" style={{ color: 'var(--accent-green)' }}>
                <span>$ cat contact_details.txt</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono" style={{ color: 'var(--accent-cyan)' }}>
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <p className="text-base sm:text-lg font-sans text-gray-200 leading-relaxed">
              I am currently seeking internship opportunities starting September 2027 in Full Stack Software Development and Cloud Architecture. Feel free to connect directly through any of the channels below:
            </p>

            {/* Clickable Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono">
              {/* Email Card (Clickable) */}
              <div
                className="p-5 rounded-xl border flex flex-col justify-between space-y-4 transition-all hover:border-emerald-500/60"
                style={{
                  backgroundColor: 'var(--code-bg)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                      PRIMARY
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">Email Address</h4>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs sm:text-sm text-emerald-400 hover:underline break-all block font-semibold"
                    title="Click to send email"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="btn-cyber-primary flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold cursor-pointer select-none"
                    style={{
                      backgroundColor: 'var(--accent-green)',
                      color: '#07130c',
                    }}
                  >
                    <span>Send Email</span>
                    <Send className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="btn-cyber-interactive px-3.5 py-2.5 rounded-lg border text-xs font-bold cursor-pointer select-none"
                    style={{
                      backgroundColor: 'var(--bg-panel)',
                      borderColor: copied ? 'var(--accent-green)' : 'var(--border-color)',
                      color: copied ? 'var(--accent-green)' : 'var(--text-primary)',
                      boxShadow: copied ? '0 0 14px rgba(0,255,102,0.4)' : 'none',
                    }}
                    title="Copy email to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* LinkedIn Card (Clickable) */}
              <div
                className="p-5 rounded-xl border flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1 hover:border-[#0a66c2] hover:shadow-[0_0_20px_rgba(10,102,194,0.25)]"
                style={{
                  backgroundColor: 'var(--code-bg)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#0a66c2]/10 border border-[#0a66c2]/30 text-[#38bdf8]">
                      <LinkedinIcon className="w-5 h-5 text-[#0a66c2]" />
                    </div>
                    <span className="text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider">
                      NETWORK
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">LinkedIn</h4>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Airil Asyraff Zulkifli
                  </p>
                </div>

                <div className="pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <a
                    href={PERSONAL_INFO.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyber-cyan w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold border cursor-pointer select-none"
                    style={{
                      backgroundColor: 'var(--bg-panel)',
                      borderColor: '#0a66c2',
                      color: '#38bdf8',
                    }}
                  >
                    <span>Visit LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* GitHub Card (Clickable) */}
              <div
                className="p-5 rounded-xl border flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(0,255,102,0.2)]"
                style={{
                  backgroundColor: 'var(--code-bg)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-500/10 border border-gray-500/30 text-white">
                      <GithubIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      CODEBASE
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">GitHub</h4>
                  <p className="text-xs sm:text-sm text-gray-300">
                    @airilakio29
                  </p>
                </div>

                <div className="pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <a
                    href={PERSONAL_INFO.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyber-interactive w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold border cursor-pointer select-none"
                    style={{
                      backgroundColor: 'var(--bg-panel)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span>Explore Repos</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick status summary footer */}
            <div
              className="p-4 rounded-lg border font-mono text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
              style={{
                backgroundColor: 'var(--bg-panel-header)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
              }}
            >
              <div>
                <span className="font-bold text-white">Availability:</span> Open to Full Stack, Software Engineering & Cloud internships starting September 2027.
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-xs font-bold px-3 py-1.5 rounded border border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/30"
              >
                airil_25009515@utp.edu.my &rarr;
              </a>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
};
