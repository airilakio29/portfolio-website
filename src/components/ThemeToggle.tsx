import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const isLight = document.documentElement.classList.contains('light');
    setTheme(isLight ? 'light' : 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('airil_portfolio_theme', newTheme);
    
    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-mono font-bold border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer hover:border-emerald-400 hover:text-emerald-300 hover:shadow-[0_0_18px_rgba(0,255,102,0.45),inset_0_0_8px_rgba(0,255,102,0.12)] hover:-translate-y-0.5 active:translate-y-0 select-none"
      style={{
        backgroundColor: 'var(--code-bg)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-primary)',
      }}
      title={`Switch to ${theme === 'dark' ? 'Paper Terminal (Light)' : 'Phosphor CRT (Dark)'}`}
      aria-label="Toggle retro theme"
    >
      {theme === 'dark' ? (
        <>
          <Moon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="hidden sm:inline">[MODE: CRT-DARK]</span>
          <span className="sm:hidden font-bold">CRT</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span className="hidden sm:inline">[MODE: PAPER-LIGHT]</span>
          <span className="sm:hidden font-bold">PAPER</span>
        </>
      )}
    </button>
  );
};
