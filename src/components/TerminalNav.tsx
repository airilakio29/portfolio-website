import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Menu, X, ChevronRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavItem {
  name: string;
  href: string;
  cmd: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'About', href: '#about', cmd: 'cat about.txt' },
  { name: 'Skills', href: '#skills', cmd: 'ls skills/' },
  { name: 'Projects', href: '#projects', cmd: 'ls projects/' },
  { name: 'Recognition', href: '#recognition', cmd: 'git log' },
  { name: 'Contact', href: '#contact', cmd: 'cat contact.txt' },
];

export const TerminalNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isClickingRef = useRef<boolean>(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickingRef.current) return;

        // Pick the entry with the highest intersection ratio
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-15% 0px -40% 0px',
        threshold: [0.15, 0.35, 0.6],
      }
    );

    const sectionIds = ['hero', 'about', 'skills', 'projects', 'recognition', 'contact'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const sectionName = href.replace('#', '');
    
    // Immediately illuminate the active box for the clicked button
    setActiveSection(sectionName);
    isClickingRef.current = true;
    setTimeout(() => {
      isClickingRef.current = false;
    }, 900);

    if (isHomePage) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200"
      style={{
        backgroundColor: 'rgba(10, 14, 13, 0.92)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand / Terminal Prompt */}
        <Link
          to="/"
          className="flex items-center gap-3 font-mono text-base sm:text-xl font-bold group select-none"
          title="Airil Asyraff Zulkifli Portfolio"
        >
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center border transition-transform group-hover:scale-105 shadow-md"
            style={{
              backgroundColor: 'var(--code-bg)',
              borderColor: 'var(--accent-green)',
            }}
          >
            <Terminal className="w-5 h-5" style={{ color: 'var(--accent-green)' }} />
          </div>
          <div className="flex items-center gap-1.5">
            <span style={{ color: 'var(--text-primary)' }}>airil</span>
            <span style={{ color: 'var(--accent-green)' }}>@</span>
            <span style={{ color: 'var(--accent-cyan)' }}>dev:~$</span>
          </div>
        </Link>

        {/* Desktop Navigation Links - All buttons already visible and light up on hover */}
        <nav className="hidden lg:flex items-center gap-2.5 font-mono text-xs sm:text-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = isHomePage && activeSection === item.href.replace('#', '');
            const targetUrl = isHomePage ? item.href : `/${item.href}`;

            return (
              <a
                key={item.name}
                href={targetUrl}
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }
                }}
                className={`px-3.5 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 font-bold cursor-pointer select-none border ${
                  isActive
                    ? 'shadow-[0_0_16px_rgba(0,255,102,0.45),inset_0_0_8px_rgba(0,255,102,0.15)] -translate-y-0.5'
                    : 'hover:border-emerald-400 hover:text-emerald-300 hover:shadow-[0_0_16px_rgba(0,255,102,0.4),inset_0_0_6px_rgba(0,255,102,0.1)] hover:-translate-y-0.5 active:translate-y-0'
                }`}
                style={{
                  color: isActive ? 'var(--accent-green)' : 'var(--text-primary)',
                  backgroundColor: 'var(--code-bg)',
                  borderColor: isActive ? 'var(--accent-green)' : 'var(--border-color)',
                }}
              >
                <span className="text-xs font-bold" style={{ color: isActive ? 'var(--accent-green)' : 'var(--accent-green)' }}>
                  {isActive ? '>>' : '>'}
                </span>
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Status Badge, Theme Toggle & Mobile Trigger */}
        <div className="flex items-center gap-3.5">
          {/* Availability Beacon */}
          <div className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs sm:text-sm font-mono font-bold transition-all hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(0,255,102,0.25)] select-none"
            style={{
              backgroundColor: 'var(--code-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400">STATUS:</span>
            <span>OPEN FOR INTERNSHIP</span>
          </div>

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer transition-all duration-200 hover:border-emerald-400 hover:shadow-[0_0_14px_rgba(0,255,102,0.4)] hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--code-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Terminal Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-b px-5 py-5 font-mono text-sm space-y-2.5 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2"
          style={{
            backgroundColor: 'var(--bg-panel)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="text-xs pb-2 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
            <span>$ SELECT ROUTE / COMMAND</span>
            <span className="text-emerald-400 font-bold">READY</span>
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive = isHomePage && activeSection === item.href.replace('#', '');
            const targetUrl = isHomePage ? item.href : `/${item.href}`;
            return (
              <a
                key={item.name}
                href={targetUrl}
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    handleNavClick(item.href);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
                className="flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-150 border hover:border-emerald-400 hover:shadow-[0_0_14px_rgba(0,255,102,0.35)]"
                style={{
                  color: isActive ? 'var(--accent-green)' : 'var(--text-primary)',
                  backgroundColor: 'var(--code-bg)',
                  borderColor: isActive ? 'var(--accent-green)' : 'var(--border-color)',
                }}
              >
                <div className="flex items-center gap-2.5 font-bold">
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                  <span>{item.name}</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono" style={{ color: 'var(--text-muted)' }}>
                  {item.cmd}
                </span>
              </a>
            );
          })}

          <div className="pt-3 border-t mt-3 flex items-center justify-between text-xs" style={{ borderColor: 'var(--border-color)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Airil Asyraff Zulkifli</span>
            <span style={{ color: 'var(--accent-amber)' }}>UTP IT '29</span>
          </div>
        </div>
      )}
    </header>
  );
};
