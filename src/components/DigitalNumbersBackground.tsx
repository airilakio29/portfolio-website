import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  text: string;
  opacity: number;
  maxOpacity: number;
  targetOpacity: number;
  fadeSpeed: number;
  colorType: 'green' | 'amber' | 'cyan';
  fontSize: number;
  changeTimer: number;
}

const NUMBER_POOL = [
  '0', '1', '01', '10', '101', '010', '1101', '0010',
  '0x29', '0x4A', '0xFF', '200', '404', '8080', '5173',
  '256', '1024', '127.0', '192.168', '::1', '29', '42',
  '10101', '01110', '0011', '1110', '99', '88'
];

export const DigitalNumbersBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return () => window.removeEventListener('resize', handleResize);
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      // Scale count for large numbers so screen is well covered
      const count = Math.min(65, Math.max(28, Math.floor((width * height) / 22000)));
      particles = [];

      for (let i = 0; i < count; i++) {
        const isDark = document.documentElement.classList.contains('dark');
        // Clear, bold opacity: 0.18 - 0.32 in dark, 0.12 - 0.22 in light
        const maxOp = isDark ? 0.18 + Math.random() * 0.15 : 0.12 + Math.random() * 0.10;
        const colorRand = Math.random();
        const colorType = colorRand > 0.8 ? 'amber' : colorRand > 0.65 ? 'cyan' : 'green';

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          text: NUMBER_POOL[Math.floor(Math.random() * NUMBER_POOL.length)],
          opacity: Math.random() * maxOp,
          maxOpacity: maxOp,
          targetOpacity: Math.random() > 0.35 ? maxOp : 0,
          fadeSpeed: 0.0006 + Math.random() * 0.0008,
          colorType,
          // BIGGER FONT SIZE: 42px to 84px!
          fontSize: 42 + Math.floor(Math.random() * 42),
          changeTimer: Math.floor(Math.random() * 300),
        });
      }
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains('light');

      particles.forEach((p) => {
        // Active fade in / out oscillation (slow, calm pace)
        if (p.opacity < p.targetOpacity) {
          p.opacity += p.fadeSpeed;
          if (p.opacity >= p.targetOpacity) {
            p.targetOpacity = 0; // trigger fade out
          }
        } else {
          p.opacity -= p.fadeSpeed;
          if (p.opacity <= 0.01) {
            // Re-spawn with new position and number
            p.opacity = 0;
            p.x = Math.random() * width;
            p.y = Math.random() * height;
            p.text = NUMBER_POOL[Math.floor(Math.random() * NUMBER_POOL.length)];
            const maxOp = isLight ? 0.12 + Math.random() * 0.10 : 0.18 + Math.random() * 0.15;
            p.maxOpacity = maxOp;
            p.targetOpacity = maxOp;
            p.fadeSpeed = 0.0006 + Math.random() * 0.0008;
          }
        }

        // Slow random digit change while active (~5-10 seconds)
        p.changeTimer++;
        if (p.changeTimer > 300 + Math.random() * 300) {
          p.text = NUMBER_POOL[Math.floor(Math.random() * NUMBER_POOL.length)];
          p.changeTimer = 0;
        }

        // Color resolution
        let fill = '';
        if (isLight) {
          fill = p.colorType === 'amber'
            ? `rgba(180, 83, 9, ${p.opacity})`
            : p.colorType === 'cyan'
            ? `rgba(2, 132, 199, ${p.opacity})`
            : `rgba(4, 120, 87, ${p.opacity})`;
        } else {
          fill = p.colorType === 'amber'
            ? `rgba(255, 176, 0, ${p.opacity})`
            : p.colorType === 'cyan'
            ? `rgba(0, 240, 255, ${p.opacity})`
            : `rgba(0, 255, 102, ${p.opacity})`;
        }

        ctx.font = `700 ${p.fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = fill;
        ctx.fillText(p.text, p.x, p.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
