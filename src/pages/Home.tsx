import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { RecognitionSection } from '../sections/RecognitionSection';
import { ContactSection } from '../sections/ContactSection';

export const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <RecognitionSection />
      <ContactSection />
    </div>
  );
};
