import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, RECOGNITIONS, SKILL_CATEGORIES } from '../data/content';

interface HistoryEntry {
  command: string;
  output: string | React.ReactNode;
}

export const InteractiveCLI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'system --status',
      output: 'AIRIL-OS v2.4 interactive shell. Type "help" to view executable commands.',
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const [cmd] = trimmed.toLowerCase().split(' ');
    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs">
            <p className="font-semibold text-emerald-400">Available commands:</p>
            <p><span className="text-amber-400">whoami</span> - Display Airil's summary & identity</p>
            <p><span className="text-amber-400">about</span> - Education, location, Dean's List, internship goals (Sept 2027)</p>
            <p><span className="text-amber-400">skills</span> - Grouped technical capabilities & stacks</p>
            <p><span className="text-amber-400">projects</span> - View featured projects (KiroKash, Terra Guard, Hotelier)</p>
            <p><span className="text-amber-400">recognition</span> - View hackathon placings & academic distinctions</p>
            <p><span className="text-amber-400">contact</span> - View direct contact channels (email, LinkedIn, GitHub)</p>
            <p><span className="text-amber-400">theme</span> - Toggle between CRT Dark and Paper Light modes</p>
            <p><span className="text-amber-400">clear</span> - Clear the terminal session log</p>
            <p><span className="text-amber-400">exit</span> - Close the CLI shell</p>
          </div>
        );
        break;

      case 'whoami':
        output = `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}\n${PERSONAL_INFO.location} | UTP Information Technology`;
        break;

      case 'about':
        output = `${PERSONAL_INFO.education.institution} (${PERSONAL_INFO.education.year})\nMajor: ${PERSONAL_INFO.education.major}\nDistinctions: ${PERSONAL_INFO.education.honors}\nGoal: ${PERSONAL_INFO.goal}`;
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-xs">
            {SKILL_CATEGORIES.map((c) => (
              <div key={c.category}>
                <span className="text-cyan-400 font-semibold">{c.category}:</span>{' '}
                <span className="text-gray-300">{c.skills.join(', ')}</span>
              </div>
            ))}
            <div className="text-amber-400 pt-1">
              Currently Learning: {PERSONAL_INFO.currentlyLearning}
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            {PROJECTS.map((p, idx) => (
              <div key={p.id}>
                <span className="text-emerald-400 font-bold">[{idx + 1}] {p.title}</span> —{' '}
                <span className="text-gray-300">{p.tagline}</span>
                <div className="text-gray-400 text-[11px]">
                  Stack: {p.tags.join(' • ')} | Repo: {p.repoUrl}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'recognition':
        output = (
          <div className="space-y-1.5 text-xs">
            {RECOGNITIONS.map((r) => (
              <div key={r.title}>
                <span className="text-amber-400 font-semibold">[{r.statusBadge}]</span>{' '}
                <span className="text-white">{r.title}</span> ({r.event})
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = 'Navigating to contact terminal section...';
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;

      case 'theme':
        const isLight = document.documentElement.classList.contains('light');
        if (isLight) {
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
          localStorage.setItem('airil_portfolio_theme', 'dark');
          output = 'Switched to phosphor CRT dark mode.';
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
          localStorage.setItem('airil_portfolio_theme', 'light');
          output = 'Switched to paper terminal light mode.';
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        setIsOpen(false);
        setInputVal('');
        return;

      default:
        output = `Command not recognized: "${rawCmd}". Type "help" for a list of available commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }]);
    setInputVal('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-mono text-xs select-none">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-cyber-interactive flex items-center gap-2 px-3.5 py-2.5 rounded-lg border shadow-2xl transition-all duration-200 hover:scale-105 hover:border-emerald-400 hover:text-emerald-300 hover:shadow-[0_0_20px_rgba(0,255,102,0.5)] focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
          style={{
            backgroundColor: 'var(--bg-panel)',
            borderColor: 'var(--accent-green)',
            color: 'var(--text-primary)',
          }}
          aria-label="Open Interactive Terminal"
        >
          <TerminalIcon className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wide">[ &gt;_ TERMINAL SHELL ]</span>
        </button>
      ) : (
        <div
          className="w-[90vw] sm:w-[480px] h-[340px] rounded-lg border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4"
          style={{
            backgroundColor: 'var(--code-bg)',
            borderColor: 'var(--accent-green)',
            boxShadow: '0 0 25px rgba(0, 255, 102, 0.25)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-3 py-2 border-b select-none"
            style={{
              backgroundColor: 'var(--bg-panel-header)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span className="font-mono text-xs font-semibold ml-1.5" style={{ color: 'var(--accent-green)' }}>
                airil@terminal:~$ (Interactive)
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 hover:shadow-[0_0_10px_rgba(244,63,94,0.4)] transition-all cursor-pointer"
              aria-label="Close Terminal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Logs */}
          <div ref={scrollRef} className="flex-1 p-3 overflow-y-auto space-y-2 select-text font-mono text-xs">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-1.5" style={{ color: 'var(--accent-cyan)' }}>
                  <span>airil@dev:~$</span>
                  <span className="text-white font-medium">{item.command}</span>
                </div>
                <div className="pl-4 border-l border-emerald-500/30 whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.output}
                </div>
              </div>
            ))}
          </div>

          {/* Prompt Input */}
          <div
            className="p-2 border-t flex items-center gap-2"
            style={{
              backgroundColor: 'var(--bg-panel)',
              borderColor: 'var(--border-color)',
            }}
          >
            <span style={{ color: 'var(--accent-green)' }}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="type 'help' for commands..."
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-gray-500"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="btn-cyber-interactive p-1.5 rounded-md border text-emerald-400 cursor-pointer"
              style={{
                backgroundColor: 'var(--code-bg)',
                borderColor: 'var(--border-color)',
              }}
              aria-label="Submit command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
