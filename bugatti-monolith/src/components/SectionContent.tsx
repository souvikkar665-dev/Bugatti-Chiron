'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Link from 'next/link';

const CONTENT = {
  HOME: {
    number: "01",
    title: "Chiron",
    tagline: "The Monolith",
    description: "A manifestation of pure engineering prowess. 1,500 horses bound in a carbon-fiber shell, designed to transcend the limits of physics.",
    specs: ["1,500 HP", "1,600 NM", "420 KM/H"]
  },
  VISION: {
    number: "02",
    title: "Optical",
    tagline: "8-Eye LED Optics",
    description: "Four eyes on each side, scanning the horizon with surgical precision. Spectral blue LEDs designed for 300+ KM/H visibility.",
    specs: ["2.5 KM RANGE", "SPECTRAL BLUE", "SIGNATURE C-LINE"]
  },
  FRICTION: {
    number: "03",
    title: "Kinetic",
    tagline: "G-Force Contact",
    description: "Michelin Pilot Sport Cup 2. The only thing connecting 2 tons of precision engineering to the asphalt. Tested for aerospace stress.",
    specs: ["355/25 R21", "Z-RATED", "5000 NM GRIP"]
  },
  POWER: {
    number: "04",
    title: "Atomic",
    tagline: "W16 Quad-Turbo",
    description: "8.0 Liters. 16 Cylinders. 4 Turbos. A symphony of internal combustion, firing in a sequence that feels like the birth of a star.",
    specs: ["8.0 LITERS", "4 TURBOS", "1-12-5-8 FIRING"]
  }
};

export const SectionContent: React.FC = () => {
  const { activeSection } = useStore();
  
  const contentKey = activeSection === 'TRANSITION_1' ? 'HOME' :
                     activeSection === 'VISION' ? 'VISION' :
                     activeSection === 'TRANSITION_2' ? 'VISION' :
                     activeSection === 'FRICTION' ? 'FRICTION' :
                     activeSection === 'POWER' ? 'POWER' : activeSection;

  const data = CONTENT[contentKey as keyof typeof CONTENT];

  if (!data || activeSection.includes('TRANSITION')) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-between px-16 md:px-32">
      
      {/* Left Column: Number & Title */}
      <div className="flex flex-col gap-4">
        <motion.div
          key={`${contentKey}-num`}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="font-playfair italic text-[15vw] leading-none -ml-4"
        >
          {data.number}
        </motion.div>
        
        <motion.div
          key={`${contentKey}-title`}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col -mt-12"
        >
          <h1 className="font-playfair italic font-bold text-8xl md:text-9xl text-white tracking-tighter">
            {data.title}
          </h1>
          <div className="h-[2px] w-24 bg-blue-600 mt-4" />
        </motion.div>
      </div>

      {/* Right Column: Description & Specs */}
      <div className="max-w-md flex flex-col gap-12 mt-32">
        <motion.div
          key={`${contentKey}-desc`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <h2 className="font-jetbrains text-[9px] text-blue-500 mb-4 tracking-[0.6em] uppercase">
            // {data.tagline}
          </h2>
          <p className="font-playfair text-xl text-white/70 leading-relaxed italic">
            {data.description}
          </p>
        </motion.div>

        <div className="flex flex-col gap-12 mt-12">
          <div className="flex flex-col gap-6">
            {data.specs.map((spec, i) => (
              <motion.div
                key={`${contentKey}-spec-${i}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + (i * 0.1) }}
                className="flex items-center gap-6"
              >
                <div className="w-8 h-[1px] bg-white/20" />
                <div className="font-jetbrains text-[10px] text-white tracking-[0.2em]">
                  {spec}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link href="/engineering" className="pointer-events-auto border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-all duration-500 text-[8px] font-bold tracking-[0.4em] uppercase inline-block">
              Explore Engineering
            </Link>
          </motion.div>
        </div>
      </div>

    </div>
  );
};
