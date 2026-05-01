'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/store/useStore';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: 'HOME', folder: 'Bugatti Chiron Main', frames: 240 },
  { id: 'TRANSITION_1', folder: 'Bugatti Chiron Main to Headlight', frames: 240 },
  { id: 'VISION', folder: 'Bugatti Chiron Headlight', frames: 240 },
  { id: 'TRANSITION_2', folder: 'Bugatti Chiron Headlight to Tyre', frames: 240 },
  { id: 'FRICTION', folder: 'Bugatti Chiron Tyre', frames: 240 },
  { id: 'POWER', folder: 'Bugatti Chiron Tyre to Engine', frames: 240 },
];

export const TOTAL_FRAMES = SECTIONS.reduce((acc, s) => acc + s.frames, 0);

export const ScrollytellingEngine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCurrentFrame, setActiveSection } = useStore();
  
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // High-performance image buffer
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollObject = useRef({ frame: 0 });

  const getImagePath = useCallback((globalFrame: number) => {
    let accumulated = 0;
    for (const section of SECTIONS) {
      if (globalFrame < accumulated + section.frames) {
        const localFrame = (globalFrame - accumulated) + 1;
        const frameStr = localFrame.toString().padStart(3, '0');
        return `/assets/sequences/${section.folder}/ezgif-frame-${frameStr}.jpg`;
      }
      accumulated += section.frames;
    }
    return '';
  }, []);

  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (img && img.complete) {
      // Cover logic
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // 1. ASYNC ASSET MANAGER (The F5 Fix)
    const preloadAll = async () => {
      const promises = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        promises.push(new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.src = getImagePath(i);
          img.onload = () => {
            imagesRef.current[i] = img;
            setLoadingProgress(Math.min(Math.round(((imagesRef.current.filter(Boolean).length) / TOTAL_FRAMES) * 100), 100));
            resolve(img);
          };
          img.onerror = () => resolve(img); // Graceful failure
        }));
      }
      await Promise.all(promises);
      
      // Initialize first render
      renderFrame(0);
      setTimeout(() => setLoaded(true), 800);
    };

    preloadAll();

    // 2. SMOOTH SCROLLING (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 3. GSAP TIMELINE (Canvas Sandwich)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const frame = Math.floor(self.progress * (TOTAL_FRAMES - 1));
          if (frame !== scrollObject.current.frame) {
            scrollObject.current.frame = frame;
            renderFrame(frame);
            setCurrentFrame(frame);

            // Update active section
            let accumulated = 0;
            for (const section of SECTIONS) {
              if (frame < accumulated + section.frames) {
                setActiveSection(section.id);
                break;
              }
              accumulated += section.frames;
            }
          }
        }
      }
    });

    const handleResize = () => {
      if (canvasRef.current) {
        // Optimized Resolution: 2x max to prevent scroll lag
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
        
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'medium';
        }
        
        renderFrame(scrollObject.current.frame);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // 4. SERVICE WORKER REGISTRATION
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed: ', err));
      });
    }

    return () => {
      lenis.destroy();
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(lenis.raf);
    };
  }, [mounted, getImagePath, renderFrame, setCurrentFrame, setActiveSection]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${(SECTIONS.length * 200)}vh` }}>
      {/* PHASE 1: PRE-LOADER */}
      <AnimatePresence>
        {!loaded && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-obsidian flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <h1 className="font-playfair italic text-6xl text-white mb-4 tracking-tighter">Bugatti Chiron</h1>
              <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden mb-4">
                <motion.div 
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%' }}
                  animate={{ x: `${loadingProgress - 100}%` }}
                />
              </div>
              <div className="font-jetbrains text-[10px] tracking-[0.5em] text-white/40 uppercase">
                Molsheim Monolith • {loadingProgress}%
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 2: CANVAS SANDWICH (Layer Z-0) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none z-0 bg-obsidian">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover opacity-100 transition-opacity duration-1000" 
          style={{ 
            imageRendering: 'auto', 
            filter: 'contrast(1.2) brightness(1.1) saturate(1.05) drop-shadow(0 0 20px rgba(0,0,0,0.5))' 
          }}
        />
      </div>

      {/* PHASE 3: SCROLL TRIGGERS (Layer Z-10) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {SECTIONS.map((section) => (
          <div key={section.id} className="h-[200vh] w-full" />
        ))}
      </div>
    </div>
  );
};
