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
  const setCurrentFrame = useStore(state => state.setCurrentFrame);
  const setActiveSection = useStore(state => state.setActiveSection);
  
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

    // Find the closest loaded frame if the user scrolls too fast
    let closestFrame = frameIndex;
    while (closestFrame >= 0 && (!imagesRef.current[closestFrame] || !imagesRef.current[closestFrame].complete)) {
      closestFrame--;
    }
    
    const img = imagesRef.current[closestFrame];
    if (img && img.complete) {
      // Cover logic
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      // MAX SMOOTH OPTIMIZATION: JPEGs are fully opaque. 
      // Removing ctx.clearRect() skips an entire GPU erase pass and doubles draw speed!
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // 1. HIGH-PERFORMANCE BATCH ASSET MANAGER
    const preloadAll = async () => {
      const BATCH_SIZE = 40; // Max concurrent connections to avoid crashing Next.js
      let loadedCount = 0;
      
      const loadBatch = async (start: number, end: number) => {
        const promises = [];
        for (let i = start; i < end && i < TOTAL_FRAMES; i++) {
          promises.push(new Promise<void>((resolve) => {
            const img = new Image();
            img.src = getImagePath(i);
            img.onload = async () => {
              try {
                // Decode image off the main thread to prevent Canvas render stutters
                await img.decode();
              } catch (e) {
                // Ignore decode errors
              }
              imagesRef.current[i] = img;
              loadedCount++;
              // Update preloader progress across all frames
              if (!loaded) {
                setLoadingProgress(Math.min(Math.round((loadedCount / TOTAL_FRAMES) * 100), 100));
              }
              // If user is currently looking at this frame, render it
              if (i === scrollObject.current.frame) {
                renderFrame(i);
              }
              resolve();
            };
            img.onerror = () => {
              loadedCount++;
              resolve();
            };
          }));
        }
        await Promise.all(promises);
      };

      // Initial Phase: Buffer ALL frames to guarantee 100% stutter-free scrolling
      const startTime = Date.now();
      for (let i = 0; i < TOTAL_FRAMES; i += BATCH_SIZE) {
        await loadBatch(i, i + BATCH_SIZE);
      }
      
      // Luxury delay: Guarantee minimum 2.5s loading screen for the boot sequence aesthetic
      const elapsed = Date.now() - startTime;
      if (elapsed < 2500) {
        await new Promise(resolve => setTimeout(resolve, 2500 - elapsed));
      }
      
      renderFrame(0);
      setLoaded(true);
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

    // MAX SMOOTH OPTIMIZATION: Native hardware-synced RAF instead of GSAP ticker
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 3. GSAP TIMELINE (Canvas Sandwich)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // IMPORTANT: Removed scrub: 1 to prevent double-smoothing with Lenis
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
        // Optimized Resolution: Locked to DPR 1 to prevent 4K rendering lag
        const dpr = 1; 
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
        
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
        }
        
        renderFrame(scrollObject.current.frame);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      lenis.destroy();
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [mounted, getImagePath, renderFrame, setCurrentFrame, setActiveSection]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${(SECTIONS.length * 200)}vh` }}>
      {/* PHASE 1: PRE-LOADER */}
      <AnimatePresence>
        {!loaded && (
          <motion.div 
            exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[200] bg-[#050508] flex flex-col items-center justify-center pointer-events-auto"
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
      <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none z-0 bg-[#050508]">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover opacity-100 transition-opacity duration-1000" 
          style={{ 
            imageRendering: 'auto',
            transform: 'translateZ(0)',
            willChange: 'transform'
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
