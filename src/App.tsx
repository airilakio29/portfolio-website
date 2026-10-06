import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TerminalNav } from './components/TerminalNav';
import { Footer } from './components/Footer';
import { InteractiveCLI } from './components/InteractiveCLI';
import { DigitalNumbersBackground } from './components/DigitalNumbersBackground';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/CaseStudy';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen flex flex-col font-mono selection:bg-emerald-400 selection:text-black">
        {/* Live Digital Numbers Ambient Wallpaper */}
        <DigitalNumbersBackground />

        {/* Subtle CRT Scanline Filter Layer */}
        <div className="crt-overlay fixed inset-0 z-30 pointer-events-none opacity-40" />

        {/* Terminal Top Navigation */}
        <TerminalNav />

        {/* Main Content Area */}
        <main className="flex-1 w-full relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<CaseStudy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Terminal Interactive Shell Easter Egg */}
        <InteractiveCLI />

        {/* Terminal Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
