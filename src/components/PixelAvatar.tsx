import React, { useEffect, useRef, useState } from 'react';

interface PixelAvatarProps {
  imageSrc?: string;
  className?: string;
}

export const PixelAvatar: React.FC<PixelAvatarProps> = ({
  imageSrc = '/airil-avatar.png',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const pixelSize = 4; // block size in px

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    let animationFrameId: number;
    let frameCount = 0;
    let trackY1 = 0;
    let glitchTimer = 0;
    let glitchActive = false;
    let glitchXOffset = 0;
    let glitchRow = 0;

    img.onerror = () => {
      setHasError(true);
    };

    img.onload = () => {
      setLoaded(true);

      const targetWidth = 320;
      const targetHeight = 380;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      const pxW = Math.max(1, Math.floor(targetWidth / pixelSize));
      const pxH = Math.max(1, Math.floor(targetHeight / pixelSize));
      offCanvas.width = pxW;
      offCanvas.height = pxH;

      const sWidth = img.width || 1;
      const sHeight = img.height || 1;
      const tgtAspect = targetWidth / targetHeight;

      // Center Airil's face accurately in the viewfinder
      const cropW = Math.min(sWidth, Math.max(260, sWidth * 0.70));
      const cropH = cropW / tgtAspect;
      const faceCenterX = sWidth * 0.69;
      const faceCenterY = sHeight * 0.39;

      const startX = Math.max(0, Math.min(sWidth - cropW, faceCenterX - cropW / 2));
      const startY = Math.max(0, Math.min(sHeight - cropH, faceCenterY - cropH / 2));
      const drawW = cropW;
      const drawH = cropH;

      const animate = () => {
        try {
          if (!canvasRef.current) return;
          frameCount++;

          // Draw cropped original image onto low-resolution canvas
          offCtx.clearRect(0, 0, pxW, pxH);
          offCtx.drawImage(img, startX, startY, drawW, drawH, 0, 0, pxW, pxH);

          const imgData = offCtx.getImageData(0, 0, pxW, pxH);
          const data = imgData.data;

          // Occasional subtle glitch trigger every ~160 frames
          glitchTimer++;
          if (glitchTimer % 160 === 0 && Math.random() > 0.45) {
            glitchActive = true;
            glitchXOffset = (Math.random() - 0.5) * 6;
            glitchRow = Math.floor(Math.random() * pxH);
          } else if (glitchTimer % 160 > 7) {
            glitchActive = false;
          }

          // Animation time variable for smooth color flow
          const t = frameCount * 0.035;

          // Process each pixel through the animated cyber blue + multi-color shader
          for (let y = 0; y < pxH; y++) {
            const waveY = Math.sin(t * 0.8 + y * 0.08);
            for (let x = 0; x < pxW; x++) {
              const idx = (y * pxW + x) * 4;
              const rawR = data[idx];
              const rawG = data[idx + 1];
              const rawB = data[idx + 2];

              // Calculate perceived luminance (0 to 1)
              const lum = (0.299 * rawR + 0.587 * rawG + 0.114 * rawB) / 255;

              // High-contrast S-curve to make glasses, facial contours & smile pop like retro pixel art
              const contrastL = Math.max(0, Math.min(1, (lum - 0.44) * 1.55 + 0.5));

              // 2x2 Bayer ordered dither matrix to give authentic retro arcade pixel quantization
              const bayerOffset = ((x % 2) ^ (y % 2)) ? 0.035 : -0.035;
              const ditheredL = Math.max(0, Math.min(1, contrastL + bayerOffset));

              // Spatial wave combining X and Y coordinates with time
              const wave = Math.sin(t + x * 0.07 + y * 0.05);

              let r = 0;
              let g = 0;
              let b = 0;

              // Multi-color palette mapping with animated electric blue foundation
              if (ditheredL < 0.22) {
                // Tier 0: Deep Midnight Navy / Void Obsidian (rich darks for hair, pupils & glasses frames)
                r = 6 + Math.round(4 * Math.sin(t));
                g = 14 + Math.round(6 * Math.cos(t));
                b = 38 + Math.round(14 * Math.sin(t + wave));
              } else if (ditheredL < 0.44) {
                // Tier 1: Deep Electric Cobalt & Violet Shimmer (jawline, folds, hair shadows)
                r = 24 + Math.round(20 * Math.max(0, Math.sin(t + wave)));
                g = 52 + Math.round(28 * Math.cos(t * 0.9));
                b = 168 + Math.round(36 * Math.sin(t * 1.1));
              } else if (ditheredL < 0.68) {
                // Tier 2: Vivid Electric Blue & Neon Cyan with animated chromatic shifts
                // Pulses between brilliant ocean blue, neon cyan, and subtle emerald-mint accents
                r = 28 + Math.round(35 * Math.max(0, Math.sin(t + waveY)));
                g = 135 + Math.round(45 * Math.sin(t + 1.2 + wave * 0.5));
                b = 228 + Math.round(27 * Math.cos(t));
              } else if (ditheredL < 0.88) {
                // Tier 3: Glowing Aqua-Cyan with holographic Amber / Gold accents on highlights
                // Creates vibrant multi-color cyber contrast similar to retro synth graphics
                r = 75 + Math.round(75 * Math.max(0, Math.cos(t + wave))); // warm amber glint
                g = 210 + Math.round(38 * Math.sin(t + 0.8));             // neon cyan & mint
                b = 240 + Math.round(15 * Math.cos(t + 1.5));            // ice blue
              } else {
                // Tier 4: Specular Highlights (Starlight Ice-White with faint prismatic sheen)
                r = 225 + Math.round(28 * Math.sin(t));
                g = 246 + Math.round(9 * Math.cos(t));
                b = 255;
              }

              // Subtle pixel shimmer / noise twinkle
              if (Math.random() < 0.006) {
                const noise = (Math.random() - 0.5) * 20;
                r = Math.min(255, Math.max(0, r + noise));
                g = Math.min(255, Math.max(0, g + noise));
                b = Math.min(255, Math.max(0, b + noise));
              }

              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
            }
          }

          offCtx.putImageData(imgData, 0, 0);

          // Draw upscale back to main canvas with crisp non-blurred pixel blocks
          ctx.imageSmoothingEnabled = false;
          ctx.clearRect(0, 0, targetWidth, targetHeight);

          if (glitchActive) {
            const sliceH = 14;
            ctx.drawImage(offCanvas, 0, 0, pxW, pxH, glitchXOffset, 0, targetWidth, targetHeight);
            ctx.drawImage(
              offCanvas,
              0, glitchRow, pxW, sliceH,
              -glitchXOffset * 2, glitchRow * pixelSize, targetWidth, sliceH * pixelSize
            );
          } else {
            ctx.drawImage(offCanvas, 0, 0, pxW, pxH, 0, 0, targetWidth, targetHeight);
          }

          // Draw dual animated horizontal surveillance tracking bars (as seen in retro CAM_01 feeds)
          trackY1 = (trackY1 + 1.1) % targetHeight;
          const trackY2 = (trackY1 + targetHeight * 0.5) % targetHeight;

          // First tracking bar (cyan neon glow)
          const grad1 = ctx.createLinearGradient(0, trackY1 - 22, 0, trackY1 + 22);
          grad1.addColorStop(0, 'rgba(0, 240, 255, 0)');
          grad1.addColorStop(0.5, 'rgba(0, 240, 255, 0.16)');
          grad1.addColorStop(1, 'rgba(0, 240, 255, 0)');
          ctx.fillStyle = grad1;
          ctx.fillRect(0, trackY1 - 22, targetWidth, 44);

          // Second tracking bar (electric blue/violet secondary wave)
          const grad2 = ctx.createLinearGradient(0, trackY2 - 16, 0, trackY2 + 16);
          grad2.addColorStop(0, 'rgba(56, 189, 248, 0)');
          grad2.addColorStop(0.5, 'rgba(56, 189, 248, 0.10)');
          grad2.addColorStop(1, 'rgba(56, 189, 248, 0)');
          ctx.fillStyle = grad2;
          ctx.fillRect(0, trackY2 - 16, targetWidth, 32);

          // Crisp horizontal CRT raster lines
          ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
          for (let lineY = 0; lineY < targetHeight; lineY += pixelSize) {
            ctx.fillRect(0, lineY, targetWidth, 1);
          }

          animationFrameId = requestAnimationFrame(animate);
        } catch (e) {
          console.warn('PixelAvatar rendering caught exception:', e);
        }
      };

      animate();
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [imageSrc, pixelSize]);

  return (
    <div
      className={`relative rounded-xl overflow-hidden border font-mono select-none group ${className}`}
      style={{
        backgroundColor: '#0a0e0d',
        borderColor: 'var(--border-color)',
        boxShadow: '0 0 25px rgba(0, 255, 102, 0.12)',
      }}
    >
      {/* Retro Surveillance / Camera Bar Header */}
      <div
        className="px-3.5 py-2 border-b flex items-center justify-between text-xs font-mono font-bold"
        style={{
          backgroundColor: 'var(--bg-panel-header)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
          <span className="w-2 h-2 rounded-full bg-rose-500 inline-block -ml-3.5" />
          <span className="text-rose-400 font-extrabold tracking-widest text-[11px]">REC</span>
          <span className="text-gray-300">CAM_01 // FEED</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-xs">SYS.ID // AIRIL</span>
        </div>
      </div>

      {/* Target Reticles (Corner Brackets) */}
      <div className="absolute top-9 left-2.5 w-4 h-4 border-t-2 border-l-2 border-emerald-400/80 pointer-events-none z-20" />
      <div className="absolute top-9 right-2.5 w-4 h-4 border-t-2 border-r-2 border-emerald-400/80 pointer-events-none z-20" />
      <div className="absolute bottom-9 left-2.5 w-4 h-4 border-b-2 border-l-2 border-emerald-400/80 pointer-events-none z-20" />
      <div className="absolute bottom-9 right-2.5 w-4 h-4 border-b-2 border-r-2 border-emerald-400/80 pointer-events-none z-20" />

      {/* Crosshair Target Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 opacity-35">
        <div className="w-10 h-10 border border-emerald-400/50 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        </div>
      </div>

      {/* Canvas Pixel Display */}
      <div className="relative flex items-center justify-center w-full min-h-[340px] sm:min-h-[380px] bg-black/70">
        <canvas
          ref={canvasRef}
          className={`w-full h-auto max-w-[320px] aspect-[4/5] object-cover block mx-auto transition-transform duration-300 group-hover:scale-[1.02] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Fallback image before canvas loads or if error */}
        {(!loaded || hasError) && (
          <img
            src={imageSrc}
            alt="Airil Asyraff Zulkifli"
            className="w-full h-auto max-w-[320px] aspect-[4/5] object-cover object-[75%_38%] block mx-auto absolute inset-0 m-auto scale-105"
            style={{
              imageRendering: 'pixelated',
              filter: 'contrast(140%) brightness(95%) hue-rotate(190deg)',
            }}
          />
        )}
      </div>

      {/* Bottom Camera Metadata Footer */}
      <div
        className="px-3.5 py-1.5 border-t flex items-center justify-between text-[11px] font-mono text-gray-300"
        style={{
          backgroundColor: 'var(--bg-panel-header)',
          borderColor: 'var(--border-color)',
        }}
      >
        <span className="text-cyan-400 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>CYBER-BLUE // MULTI</span>
        </span>
        <span className="text-amber-400">AIRIL ASYRAFF</span>
        <span className="text-emerald-400">RES: 80x95_PX</span>
      </div>
    </div>
  );
};
